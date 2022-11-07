<template>
  <div ref="ColumnChart" :class="className" :style="{ height: height, width: width }" />
</template>


<script>
import * as echarts from 'echarts'; // echars 5.0引入方式
import ResizeListener from 'element-resize-detector';
export default {
  name: 'ColumnChart',
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
      type: Array,
      required: true
    },
    isResize: {
      type: Boolean,
      default: false
    },
    needClick: {
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
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.setOptions(val);
          this.chart.resize()
        })
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

      instance.listenTo(this.$refs.ColumnChart, () => {
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
      this.chart = echarts.init(this.$refs.ColumnChart);
      this.setOptions(this.chartData);
    },
    setOptions(val) {
      let that = this
      // 颜色
      const barColor = '#4CCCFF';
      if (JSON.stringify(val) !== '{}') {
        let xzqhArr = val.map((item) => {
          return item.name;
        });
        let valArr = val.map((item) => {
          return item.value;
        });
        this.chart.setOption(
          {
            grid: {
              top: '17%',
              width: '100%',
              height: '78%',
              bottom: '2%',
              left: 10,
              right: 10,
              containLabel: true
            },
            // 鼠标悬停提示框
            tooltip: false,
            // legend: {
            //   data: legendData
            // },
            // x轴
            xAxis: {
              data: xzqhArr,
              axisLine: { show: false }, // 不显示坐标轴
              axisTick: {
                show: false // 不显示坐标轴刻度线
              },
              axisLabel: {
                formatter(val) {
                  return that.handleAxisLabel(val, 2)
                },
                margin: 14,
                textStyle: {
                  color: 'rgba(255,255,255,0.7)',
                  'font-size': '12px',
                  'font-weight': 'normal'
                }
              },
              splitLine: {
                show: false
              }
            },
            // y轴
            yAxis: {
              name: '栋',
              nameGap: 6,
              min: 0,
              nameTextStyle: {
                color: 'rgba(255,255,255,0.6)',
                align: 'left',
                padding: [0, 0, 6, -20]
              },
              type: 'value',
              axisLabel: {
                interval: 0,
                rotate: 0, // y轴刻度文字倾斜角度
                textStyle: {
                  color: 'rgba(255,255,255,0.6)',
                  'font-size': '12px',
                  'font-weight': 'normal'
                }
              },
              axisTick: {
                show: false // 不显示坐标轴刻度线
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(18, 196, 155, 0.1)'
                }
              }
            },
            // dataZoom: datazoomArr,
            dataZoom: {
              show: true, // 为true 滚动条出现
              rangeMode: 'value',
              type:'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
              height: 0, // 表示滚动条的高度，也就是粗细
              startValue: 0, // 表示默认展示20%～80%这一段。
              endValue: 7,
              zoomLock: true,
              showDetail: false,
              showDataShadow: false,
              bottom: 42,
              moveHandleSize: 4,
              backgroundColor: '#666',
              borderColor: 'transparent',
              
            },
            // 图例组件
            series: {
              type: 'bar',
              barWidth: 10,
              data: valArr,
              itemStyle: {
                normal: {
                  color: barColor
                }
              }
            }
          },
          true
        );
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
      const data = this.chartData[params.dataIndex];
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
    this.initChart();
  },
}
</script>

<style>

</style>