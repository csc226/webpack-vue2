<template>
  <div ref="ProcessChart" :class="className" :style="{ height: height, width: width }" />
</template>


<script>
import * as echarts from 'echarts'; // echars 5.0引入方式
import ResizeListener from 'element-resize-detector';
export default {
  name: 'ProcessChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    chartData: {
      type: Object,
      required: true
    },
    isResize: {
      type: Boolean,
      default: false
    },
    needClick: {
      type: Boolean,
      default: false
    },
    outside: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      handler(val) {
        this.setOptions(val);
        this.chart.resize();
      }
    },
    isResize: {
      deep: true,
      handler(val) {
        this.chart.resize();
      }
    }
  },
  methods: {
    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true
      });

      instance.listenTo(this.$refs.ProcessChart, () => {
        if (!this.chart) return;
        this.chart.resize();
      });
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
    initChart() {
      this.chart = echarts.init(this.$refs.ProcessChart);
      this.setOptions(this.chartData);
    },
    setOptions(val) {
      let that = this
      let detailOffset = this.outside ? [0, '5%'] : [0, '-20%']
      let labelOffset = this.outside ? [0, '65%'] : [0, '20%']
      if (JSON.stringify(val) !== '{}') {
        this.chart.setOption({
          grid: {
            height: '90%',
            top: 0,
            bottom: '10%',
            left: 0,
            right: 0,
            containLabel: true
          },
          tooltip: {
            show: false,
            // show: true,
            appendToBody: true,
            backgroundColor: 'rgba(18, 196, 155, 0.1)',
            borderColor: 'rgba(18, 196, 155, 0.8)',
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            position: function(pos, params, dom, rect, size) {
              return [pos[0] - 20, pos[1] - size.contentSize[1] - 20]
            },
            formatter: function(params) {
              return `${params.name}&nbsp;&nbsp;&nbsp;&nbsp;${params.data.count} 栋`
            }
          },
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              radius: '85%',
              endAngle: 0,
              min: 0,
              max: 100,
              splitNumber: 12,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                      offset: 0,
                      color: '#11CF9C'
                  },{
                      offset: 1,
                      color: '#02CAC8'
                  }],
                  globalCoord: false
                },
                shadowColor: 'rgba(17, 207, 156, 0.45)',
                shadowBlur: 5,
                shadowOffsetX: 1,
                shadowOffsetY: 1
              },
              progress: {
                show: true,
                roundCap: true,
                width: 6
              },
              pointer: {
                icon: 'circle',
                width: 12,
                offsetCenter: [0, '-66%'],
                itemStyle: {
                  borderColor: '#fff',
                  
                }
              },
              axisLine: {
                roundCap: true,
                lineStyle: {
                  width: 6,
                  opacity: 0.2
                }
              },
              axisTick: {
                splitNumber: 2,
                distance: 5,
                length: 3,
                lineStyle: {
                  width: 1,
                  color: 'rgba(255, 255, 255, 0.2)'
                }
              },
              detail: {
                formatter: function(params) {
                  return ``
                }
              },
              splitLine: false,
              axisLabel: false,
              title: {
                offsetCenter: labelOffset,
                color: 'rgba(231, 240, 243, 0.6)',
                fontSize: 12,
                lineHeight: 14,
                height: 28,
                width: 100,
                overflow: 'break'
              },
              data: [val]
            }
          ]
        }, true)

        if (this.needClick) {
          this.chart.off('click');
          this.chart.on('click', (params) => {
            this.barClick(params);
          });
        }
      } else {
        this.chart.setOption({}, true);
      }
    },
    barClick(params) {
      const data = this.chartData;
      // 获取点击bar的id
      this.$emit('bar-click', data);
    },
    handleAxisLabel(params, provideNumber = 6) {
      let newParamsName = ''; // 最终拼接成的字符串
      let paramsNameNumber = params.length; // 实际标签的个数
      // let provideNumber = 6; // 每行能显示的字的个数
      let rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
      /**
       * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
       */
      // 条件等同于rowNumber>1
      if (paramsNameNumber > provideNumber) {
        // 循环每一行,p表示行
        for (let p = 0; p < rowNumber; p++) {
          let tempStr = ''; // 表示每一次截取的字符串
          let start = p * provideNumber; // 开始截取的位置
          let end = start + provideNumber; // 结束截取的位置

          // 此处特殊处理最后一行的索引值
          if (p === rowNumber - 1) {
            // 最后一次不换行
            tempStr = params.substring(start, paramsNameNumber);
          } else {
            // 每一次拼接字符串并换行
            tempStr = params.substring(start, end) + '\n';
          }
          newParamsName += tempStr; // 最终拼成的字符串
        }
      } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
      }
      // 将最终的字符串返回
      return newParamsName;
    }
  },
  
  mounted() {
    window.addEventListener('resize', this.handleWindowResize);
    this.addChartResizeListener();
    this.initChart()
  },
}
</script>

<style>

</style>