<script>
/**
 * 饼图组件
 * 功能描述：饼图echart
 */
import * as echarts from 'echarts'; // echars 5.0引入方式
import ResizeListener from 'element-resize-detector';
// require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'
// import { chartMixin } from '@/utils/public'

export default {
  name: 'PieChartRegular',
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
      if (!val) val = [];
      if (JSON.stringify(val) !== '{}') {
        // 图例只有为name时，才会显示
        let nameArr = val.map((item, index) => {
          if (index !== 5) {
            return item.name;
          } else {
            return '';
          }
        });
        let valArr = val.map((item) => {
          return item.value;
        });
        // let legendData=[];
        // legendData=val.map(item=>{
        //   return item;
        //   // return item.name + ' ' + item.value + '栋';
        // })
        // console.log('legendData',legendData)
        let colorList = ['rgba(0, 168, 255, 1)', '#00D7E9'];
        this.chart.setOption(
          {
            color: colorList,
            //   title: {
            //     text: title,
            //     left: 'center',
            //     textStyle: {
            //       color: '#333'
            //     }
            //   },
            // 鼠标悬停提示框
            // tooltip: {
            //   trigger: 'item',
            //   // 马卡龙主题要启用的样式
            //   textStyle: {
            //     color: '#666'
            //   },
            //   borderColor: '#ffffff',
            //   backgroundColor: '#ffffff'
            //   // axisPointer: {
            //   //   type: 'cross'
            //   // }
            // },
            // legend: {
            //   show: false,
            //   right: '26px',
            //   top: 'center',
            //   orient: 'vertical',
            //   itemGap: 20, // 图例之间的距离
            //   itemWidth: 14,
            //   itemHeight: 12,
            //   //               formatter: function (name) {
            //   //     return 'Legend ' + name;
            //   // },
            //   formatter: function (name) {
            //     let target;
            //     let arr = [];
            //     for (let i = 0; i < val.length; i++) {
            //       if (val[i].name === name) {
            //         target = val[i].value;
            //         switch (i) {
            //           case 0:
            //             arr = ['{a|' + name + '}', '{b|' + target + '} {x|栋}'];
            //             break;
            //           case 1:
            //             arr = ['{a|' + name + '}', '{c|' + target + '} {x|栋}'];
            //             break;
            //           case 2:
            //             arr = ['{a|' + name + '}', '{d|' + target + '} {x|栋}'];
            //             break;
            //           default:
            //             arr = ['{a|' + name + '}', '{b|' + target + '} {x|栋}'];
            //             break;
            //         }
            //       }
            //     }
            //     return arr;
            //   },
            //   textStyle: {
            //     rich: {
            //       a: {
            //         fontSize: 14,
            //         color: '#BAE2FF',
            //         padding: [0, 25, 0, 4]
            //       },
            //       b: {
            //         fontSize: 14,
            //         color: '#4CCCFF'
            //       },
            //       c: {
            //         fontSize: 14,
            //         color: '#4CCFA3'
            //       },
            //       d: {
            //         fontSize: 14,
            //         color: '#FFB300'
            //       },
            //       x: {
            //         fontSize: 14,
            //         color: '#BAE2FF'
            //       }
            //     }
            //   }
            // },
            series: [
              {
                name: 'pie',
                type: 'pie',
                // color: ['rgba(76, 204, 255, 0.1)'],
                radius: '50%',
                center: ['50%', '50%'],
                // hoverAnimation: false,,
                label: {
                  formatter: '{d}%',
                  color: 'inherit'
                },
                labelLine: {
                  length: 2,
                  length2: 2
                },
                // lable: {
                //   normal: {
                //     show: false
                //   },
                //   emphasis: {
                //     show: false
                //   }
                // },
                data: val,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
          true
        );
        this.chart.off('click');
        this.chart.on('click', (params) => {
          this.$emit('click', params);
        });
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
