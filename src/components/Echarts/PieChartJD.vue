<script>
/**
 * 饼图组件
 */
import * as echarts from 'echarts'; // echars 5.0引入方式
import ResizeListener from 'element-resize-detector';
// require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'
// import { chartMixin } from '@/utils/public'

export default {
  name: 'PieChartJD',
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
    chartPieData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartPieData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
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

      instance.listenTo(this.$refs.piechart, () => {
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
      // this.chart = echarts.init(this.$el, 'macarons');
      this.chart = echarts.init(this.$refs.piechart);
      this.setOptions(this.chartPieData);
    },
    setOptions(val) {
      if (JSON.stringify(val) !== '{}') {
        let value = 80;
        let title = '已完成';
        this.chart.setOption(
          {
            backgroundColor: 'transparent',
            title: {
              // text: `${title}\n${value}%`,
              text: ``,
              x: 'center',
              y: 'center',
              textStyle: {
                fontSize: 18,
                color: '#ffffff'
              }
            },
            series: [
        {
            type: 'gauge',
            radius: '100%',
            clockwise: false,
            startAngle: '90',
            endAngle: '-269.9999',
            splitNumber: 30,
            detail: {
                offsetCenter: [0, -20],
                formatter: ' '
            },
            pointer: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: [
                       [0, 'rgba(65, 248, 230, 0)'],
                       [(100 - value) / 100, 'rgba(65, 248, 230, 1)'],
                       [1, 'transparent']
                    ],
                    width: 20
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                length: 20,
                lineStyle: {
                    shadowOffsetY:'0',
                    color: '#020f18',
                    width: 2
                }
            },
            axisLabel: {
                show: false
            }
        },
              {
                type: 'pie',
                name: '外层细圆环',
                radius: ['90%', '91%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                  normal: {
                    color: 'rgba(65, 248, 230, 0.4)'
                  }
                },
                label: {
                  show: false
                },
                data: [100]
              },
              {
                name: '大环',
                type: 'gauge',
                splitNumber: 35,
                radius: '50%',
                // center: ['50%', '50%'],
                startAngle: 90,
                endAngle: -269.9999,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: [[5, 'rgb(65, 248, 230,0.2)']]
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  length: 2,
                  lineStyle: {
                    color: 'auto',
                    width: 30
                  }
                },
                axisLabel: {
                  show: false
                },
                detail: {
                  show: false
                }
              },
              {
                // 内圆
                type: 'pie',
                radius: '81%',
                center: ['50%', '50%'],
                z: 0,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.RadialGradient(
                      0.5,
                      0.5,
                      1,
                      [
                        {
                          offset: 0,
                          color: 'rgba(65, 248, 230, 0.4)'
                        },
                        {
                          offset: 0.5,
                          // color: '#1E2B57'
                          color: 'rgba(65, 248, 230, 0.02)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(65, 248, 230, 0.01)'
                          // color:'rgba(17,24,43,0)'
                        }
                      ],
                      false
                    ),
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                },
                hoverAnimation: false,
                label: {
                  show: false
                },
                tooltip: {
                  show: false
                },
                data: [100]
              }
    ]
          },
          true
        );
      } else {
        this.chart.setOption({}, true);
      }
    }
  }
};
</script>

<template>
  <div ref="piechart" :class="className" :style="{ height: height, width: width }" />
</template>
