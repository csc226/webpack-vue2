<script>
/**
 * 折线图组件
 */
import * as echarts from 'echarts'; // echars 5.0引入方式
import ResizeListener from 'element-resize-detector';

export default {
  name: 'LineChart',
  // mixins: [resize, chartMixin],
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
        // console.log('val', val);
        this.setOptions(val);
        this.chart.resize();
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize);
    this.addChartResizeListener();
    this.initChart();
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

      instance.listenTo(this.$refs.lineChart, () => {
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
      // this.chart = echarts.init(this.$el, 'macarons')
      // this.chart = echarts.init(this.$el);
      this.chart = echarts.init(this.$refs.lineChart);
      this.setOptions(this.chartData);
    },
    setOptions(val) {
      let that = this
      if (JSON.stringify(val) !== '{}') {
        let nameArr = val.map((item, index) => {
          return item.name;
        });
        let valArr = val.map((item) => {
          return item.value;
        });
        this.chart.setOption(
          {
            grid: {
              top: '18%',
              right: '2%',
              height: '80%',
              bottom: '2%',
              left: '2%',
              containLabel: true
            },
            // 鼠标悬停提示框
            tooltip: {
              show: false
              // trigger: 'axis',
              // axisPointer: {
              //   type: 'shadow'
              // }
            },
            // legend: {
            //   data: legendData
            // },
            // x轴
            xAxis: {
              type: 'category',
              data: nameArr,
              axisLine: {
                show: false
                // lineStyle: {
                //   color: 'rgba(18, 196, 155, 0.1)'
                // }
              }, // 不显示坐标轴
              axisTick: {
                show: false // 不显示坐标轴刻度线
              },
              axisLabel: {
                formatter(val) {
                  return that.handleAxisLabel(val, 5)
                },
                margin: 10,
                textStyle: {
                  color: 'rgba(255,255,255,0.7)',
                  'font-size': '12px',
                  'font-weight': 'normal'
                },
                interval: 0,
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
              data: valArr,
              axisLabel: {
                interval: 0,
                rotate: 0, // y轴刻度文字倾斜角度
                textStyle: {
                  color: 'rgba(255,255,255,0.6)',
                  'font-size': '12px',
                  'font-weight': 'normal'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(18, 196, 155, 0.1)'
                }
              }
            },
            // dataZoom: datazoomArr,
            // 图例组件
            series: {
              type: 'line',
              // label: {
              //   position: 'right',
              //   show: true
              // },
              data: valArr,
              symbol: 'circle',
              symbolSize: 4,
              lineStyle: {
                color: 'rgba(65, 248, 230, 0.4)',
                width: 1
                // type: 'dashed'
              },
              itemStyle: {
                borderWidth: 4,
                borderColor: 'rgba(65, 248, 230, 0.2)',
                color: '#41F8E6'
              }
            }
          },
          true
        );
      } else {
        this.chart.setOption({}, true);
      }
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
  }
};
</script>

<template>
  <div ref="lineChart" :class="className" :style="{ height: height, width: width }" />
</template>
