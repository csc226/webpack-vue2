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
  name: 'PieChart',
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
    // 图例离左侧的距离
    legendPosition: {
      type: Number,
      default: 210
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
      // TODO：外面圆环中间加空白
      // let a = {
      //   value: 5,
      //   name: '',
      //   itemStyle: {
      //       normal: {
      //           label: {
      //               show: false
      //           },
      //           labelLine: {
      //               show: false
      //           },
      //           color: 'rgba(0, 0, 0, 0)',
      //           borderColor: 'rgba(0, 0, 0, 0)',
      //           borderWidth: 0
      //       }
      //   }
      // }
      // let arr = []
      // val.forEach(item=>{
      //   arr.push(item)
      //   arr.push(a)
      // })
      // console.log('arr',arr)
      // val =arr;

      if (JSON.stringify(val) !== '{}') {
        // 饼图圆环中间文字
        let jd = val.jd;
        let title = val.title || '进度';
        let pieData = (val && val.pieData) || [];
        // 图例只有为name时，才会显示
        // let legendData=[];
        // legendData=val.map(item=>{
        //   return item;
        //   // return item.name + ' ' + item.value + '栋';
        // })
        // console.log('legendData',legendData)
        this.chart.setOption(
          {
            // 图例组件
            legend: {
              // show: false,
              selectedMode: val?title.indexOf('整治')>-1?true:false:false,
              right: '20px',
              left: this.legendPosition,
              top: 'center',
              orient: 'vertical',
              itemGap: 10, // 图例之间的距离
              itemWidth: 14,
              itemHeight: 12,
              // width:'80%',
              // height:'100%',
              //               formatter: function (name) {
              //     return 'Legend ' + name;
              // },
              formatter: function (name) {
                let target;
                let arr = [];
                for (let i = 0; i < pieData.length; i++) {
                  if (pieData[i].name === name) {
                    target = pieData[i].value;
                    switch (i) {
                      case 0:
                        arr = ['{a|' + name + '}', '{b|' + target + '} {x|栋}'];
                        break;
                      case 1:
                        arr = ['{a|' + name + '}', '{c|' + target + '} {x|栋}'];
                        break;
                      case 2:
                        arr = ['{a|' + name + '}', '{d|' + target + '} {x|栋}'];
                        break;
                      default:
                        arr = ['{a|' + name + '}', '{b|' + target + '} {x|栋}'];
                        break;
                    }
                  }
                }
                return arr;
              },
              textStyle: {
                rich: {
                  a: {
                    fontSize: 14,
                    // color: '#BAE2FF',
                    color: 'rgba(255,255,255,0.6)',
                    padding: [0, 25, 0, 4]
                  },
                  b: {
                    fontSize: 14,
                    color: '#fff'
                  },
                  c: {
                    fontSize: 14,
                    color: '#fff'
                  },
                  d: {
                    fontSize: 14,
                    color: '#fff'
                  },
                  x: {
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.6)'
                  }
                }
              }
              // textStyle: {
              //   width: 30,
              // overflow: 'truncate',
              // },
              // data: legendData
            },
            series: [
              // 底部阴影
              {
                name: 'decorationOne',
                type: 'pie',
                color: ['rgba(76, 204, 255, 0.1)'],
                radius: ['80%', '90%'],
                center: ['30%', '45%'],
                hoverAnimation: false,
                lable: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [{ value: 335, name: '' }]
              },
              {
                name: '',
                type: 'pie',
                // 圆环颜色
                color: ['rgba(55, 211, 255, 1)', 'rgba(18, 196, 155, 1)', 'rgba(255, 201, 1, 1)'],
                radius: ['90%', '80%'],
                center: ['30%', '45%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: '50%',
                  borderColor: 'transparent',
                  borderWidth: 4,
                  backgroundcolor: '#194252'
                },
                label: {
                  // 饼图中间文字设置
                  normal: {
                    show: false
                  },
                  emphasis: {
                    // 中间文字显示
                    show: false
                  }
                },
                hoverAnimation: false,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: pieData
              },
              // 中间虚线圆环
              {
                name: 'decorationTwo',
                type: 'pie',
                color: ['#52D6FF', 'rgba(255,255,255,0)'],
                radius: ['70%', '69%'],
                center: ['30%', '45%'],
                hoverAnimation: false,
                label: {
                  show: true,
                  position: 'center',
                  formatter: `{a|${jd}}\r{b|%}\n{c|${title}}`,
                  rich: {
                    a: {
                      fontSize: 18,
                      color: '#fff',
                      lineHeight: 24,
                      fontWeight: 'bold'
                    },
                    b: {
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)'
                    },
                    c: {
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  borderColor: 'transparent',
                  borderWidth: 1,
                  borderCap: 'square'
                },
                data: new Array(77).fill(10).map(() => {
                  return {
                    name: '',
                    value: 20
                  };
                })
              }
            ]
          },
          true
        );
        this.chart.off('legendselectchanged');
        this.chart.on("legendselectchanged", (e) => {
          // console.log('legendselectchanged',e)
          this.$emit('legend-click',e.name,this.chartPieData.title)
        // if (JSON.stringify(selected) !== JSON.stringify(e.selected)) {
          // console.log('a',JSON.stringify(selected),JSON.stringify(e.selected))
          //* 判断是否为全部选中，全部选中则不用设置。如果不判断则会死循环
          this.chart.dispatchAction({
            // type: "legendToggleSelect",
            // selected: [{整治中:true},{已整治:true},{待整治:true}]
            type:'legendSelect',
            name: e.name
          });
        // }
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
