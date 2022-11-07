/**
 * 绘制3d图
 * @param pieData 总数据
 * @param internalDiameterRatio:透明的空心占比
 * @param distance 视角到主体的距离
 * @param alpha 旋转角度
 * @param pieHeight 立体的高度
 * @param opacity 饼或者环的透明度
 */
// import deepClone from 'lodash/cloneDeep'
 const getPie3D = (pieData, internalDiameterRatio, distance, alpha, pieHeight, opacity = 1) => {
  const series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  let legendData = []
  let legendBfb = []
  const k = 1 - internalDiameterRatio
  let _pieData = JSON.parse(JSON.stringify(pieData))
  _pieData.sort((a, b) => {
    return b.value - a.value
  })
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < _pieData.length; i++) {
    sumValue += _pieData[i].value
    const seriesItem = {
      name:
          typeof _pieData[i].name === 'undefined'
            ? `series${i}`
            : _pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: _pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      },
      center: ['10%', '50%']
    }
    if (typeof _pieData[i].itemStyle !== 'undefined') {
      const itemStyle = {}
      itemStyle.color =
          typeof _pieData[i].itemStyle.color !== 'undefined'
            ? _pieData[i].itemStyle.color
            : opacity
      itemStyle.opacity =
          typeof _pieData[i].itemStyle.opacity !== 'undefined'
            ? _pieData[i].itemStyle.opacity
            : opacity
      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }
 
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  legendData = []
  legendBfb = []
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      30
    )
    startValue = endValue
    const bfb = fomatFloat(series[i].pieData.value / sumValue, 4)
    legendData.push({
      name: series[i].name,
      value: bfb
    })
    legendBfb.push({
      name: series[i].name,
      value: bfb
    })
  }
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    legend: {
      show: false,
      data: legendData,
      orient: 'vertical',
      left: 10,
      top: 10,
      itemGap: 10,
      textStyle: {
        color: '#A1E2FF'
      },
      icon: 'circle',
      formatter: function (param) {
        const item = legendBfb.filter(item => item.name === param)[0]
        const bfs = fomatFloat(item.value * 100, 2) + '%'
        return `${item.name}  ${bfs}`
      }
    },
    labelLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    label: {
      show: true,
      position: 'outside',
      formatter: '{b} \n{c} {d}%'
    },
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      extraCssText: 'box-shadow: none;',
      textStyle: {
        textShadowBlur: 0
      },
      position: function (point, params, dom, rect, size) {
          return [point[0] + 5, point[1] - size.contentSize[1] - 5];
      },
      formatter(params) {
        const item = _pieData[params.seriesIndex]
        const percent = item['percent']
        return `
          <span style="
            color: #fff;
            display: block;
            height: 28px;
            padding-left: 4px;
            padding-right: 2px;
            font-size: 16px;
            font-weight: 700;
            border-bottom: 1px solid #fff;
            position: relative
          ">
            ${percent}
            <span style="font-size: 14px; font-weight: 400">%</span>
            <span style="
              display: block;
              position: absolute;
              bottom: -2px;
              right: -2px;
              width: 4px; 
              height: 4px; 
              border-radius: 50%; 
              background-color: #fff">
            </span>
            <span style="
              display: block;
              position: absolute;
              bottom: -4.5px;
              left: -8.5px;
              width: 10px; 
              height: 1px;
              transform: rotate(-45deg); 
              background-color: #fff">
            </span>
          </span>`
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight: pieHeight, // 圆环的高度
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha, // 角度
        distance, // 调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 0, // 设置为0无法旋转
        zoomSensitivity: 0, // 设置为0无法缩放
        panSensitivity: 0, // 设置为0无法平移
        autoRotate: false // 自动旋转
      },
      light: {
        main: {
          alpha: 80,
          intensity: 0.6
        }
      }
    },
    series: series
  }
  return option
}
 
/**
 * 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
 */
const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u, v) {
      if (u < startRadian) {
        return (
          offsetX +
          Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y: function (u, v) {
      if (u < startRadian) {
        return (
          offsetY +
          Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}
 
/**
 * 格式化浮点数
 */
const fomatFloat = (num, n) => {
  let f = parseFloat(num)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
  let s = f.toString()
  let rs = s.indexOf('.')
  // 判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + n) {
    s += '0'
  }
  return s
}
 
export { getPie3D, getParametricEquation }