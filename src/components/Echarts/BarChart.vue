<script>
/**
 * 柱状图组件
 * 创建人：zhuxm
 * 功能描述：柱状图echart
 * className 样式类
 * width 宽度
 * height 高度
 * chartData 渲染数据
 * sortData 排序字段
 * 创建时间：2021/04/21
 */
import * as echarts from 'echarts'; // echars 5.0引入方式
// require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'
// import { chartMixin } from '@/utils/public'
import ResizeListener from 'element-resize-detector';

export default {
  name: 'BarChart',
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
    },
    sortData: {
      type: String,
      default: ''
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
        if (val && !val.source) return;
        this.setOptions(val);
      }
    },
    sortData: {
      deep: true,
      handler(val) {
        // 释放图表实例
        this.chart.dispose();
        this.chart = null;
        // 加载图表
        this.$nextTick(() => {
          // 加载图表
          this.initChart();
        });
      }
    },
    isResize: {
      deep: true,
      handler(val) {
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

      instance.listenTo(this.$refs.barchart, () => {
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
      this.chart = echarts.init(this.$refs.barchart);
      this.setOptions(this.chartData);
    },
    setOptions(val) {
      let that = this;
      // 颜色
      const barColor = ['#409EFF', '#17D3D5', '#ff9b02'];
      const seriesObj = {
        type: 'bar',
        datasetIndex: 1
      };
      if (JSON.stringify(val) !== '{}') {
        let xzqhArr = val.map((item) => {
          return item.name;
        });
        let valArr = val.map((item) => {
          return item.value;
        });
        let markPointDatum = [];
        for (let i = 0; i < valArr.length; i++) {
          let _obj = {
            symbol: 'circle',
            symbolSize: 4,
            symbolRotate: 0,
            coord: [valArr[i] + 1, i],
            value: valArr[i],
            label: {
              show: false
            },
            itemStyle: {
              borderWidth: 4,
              borderColor: 'rgba(21, 155, 134, 0.2)',
              color: 'rgba(21, 155, 134, 1)'
            },
            emphasis: {
              itemStyle: {
                color: '#FFC901',

                borderColor: 'rgba(255, 201, 1, 0.2)'
              }
            }
          };
          markPointDatum.push(_obj);
        }
        this.chart.setOption(
          {
            grid: {
              top: 36,
              width: '100%',
              height: '80%',
              bottom: 30,
              left: 10,
              containLabel: true
            },
            // 鼠标悬停提示框
            tooltip: {
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
              type: 'value',
              max: 9999,
              axisLine: { show: false }, // 不显示坐标轴
              axisTick: {
                show: false // 不显示坐标轴刻度线
              },
              axisLabel: { show: false }, // 显示x轴的数值
              splitLine: {
                show: false
              }
            },
            // y轴
            yAxis: [
              {
                name: '排名',
                nameLocation: 'end',
                nameTextStyle: {
                  color: '#fff'
                },
                type: 'category',
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
                offset: 80,
                position: 'left',
                axisLine: { show: false, onZero: false }, // 不显示坐标轴
                axisTick: {
                  show: false // 不显示坐标轴刻度线
                },
                splitLine: {
                  show: false
                }
              },
              {
                name: '行政区',
                type: 'category',
                nameTextStyle: {
                  color: '#fff'
                },
                data: xzqhArr,
                axisLabel: {
                  interval: 0,
                  rotate: 0, // y轴刻度文字倾斜角度

                  textStyle: {
                    color: 'rgba(255,255,255,0.6)',
                    'font-size': '12px',
                    'font-weight': 'normal'
                  }
                },
                offset: -0,
                position: 'left',
                axisLine: { show: false }, // 不显示坐标轴
                axisTick: {
                  show: false // 不显示坐标轴刻度线
                },
                splitLine: {
                  show: false
                }
              },
              {
                name: '比例(%)',
                type: 'category',
                nameTextStyle: {
                  color: '#fff'
                },
                data: valArr,
                axisLabel: {
                  interval: 0,
                  rotate: 0, // y轴刻度文字倾斜角度

                  textStyle: {
                    color: 'rgba(255,255,255,0.6)',
                    'font-size': '12px'
                  }
                },
                offset: -25,
                axisLine: { show: false, onZero: false }, // 不显示坐标轴
                axisTick: {
                  show: false // 不显示坐标轴刻度线
                },
                splitLine: {
                  show: false
                }
              },
              {
                name: '数量(栋)',
                type: 'category',
                data: valArr,
                nameTextStyle: {
                  color: '#fff'
                },
                axisLabel: {
                  interval: 0,
                  rotate: 0, // y轴刻度文字倾斜角度

                  textStyle: {
                    color: 'rgba(255,255,255,0.6)',
                    'font-size': '12px'
                  }
                },
                offset: 25,
                axisLine: { show: false, onZero: false }, // 不显示坐标轴
                axisTick: {
                  show: false // 不显示坐标轴刻度线
                },
                splitLine: {
                  show: false
                }
              }
            ],
            // dataZoom: datazoomArr,
            // 图例组件
            series: {
              type: 'bar',
              barWidth: 2,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              stack: 'chart',
              z: 3,
              data: valArr,
              markPoint: {
                symbol: 'circle',
                symbolSize: 10,
                data: markPointDatum
              },
              itemStyle: {
                normal: {
                  color: 'rgba(18, 196, 155, 0.7)'
                },
                emphasis: {
                  color: '#FFC901'
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
      const value = params.value;
      // 获取点击bar的id
      const id = value[value.length - 1];
      const name = value[0];
      this.$emit('bar-click', id, name);
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
  <div ref="barchart" :class="className" :style="{ height: height, width: width }" />
</template>
