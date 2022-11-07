<!-- 水球图 -->
<script>
import * as echarts from "echarts";
// import * as echarts from 'echarts/core';
import 'echarts-liquidfill';
// import 'echarts-liquidfill/src/liquidFill.js'
import ResizeListener from 'element-resize-detector';
export default {
  name: 'LiquidfillChart',
  props: {
    data: {
      type: Number,
      default: 0.52
    },
    num: {
      type: String,
      default: 0
    },
    colors: {
      type: Array,
      default: () => ['rgba(14, 71, 120, 1)', 'rgba(58, 160, 235, 1)', 'rgba(107, 211, 253, 1)']
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    borderColor: {
      type: String,
      default: 'rgba(27, 114, 177, 1)'
    },
    shadowColor: {
      type: String,
      default: 'rgba(107, 211, 253, 1)'
    },
    radius: {
      type: String,
      default: '47%'
    }
  },
  data() {
    return {
      option: null,
      chart: null
    };
  },
  watch: {
    data(newVal) {
      this.option.series[0].data = newVal;
      // 更新之前先清空图表 不然会有数字重叠的问题
      this.chart.clear();
      this.chart.setOption(this.option, true);
      this.handleItemMouseover(0);
    },
  },
  mounted() {
    const dataArr = [this.data, this.data, this.data];
      this.option = {
        title: {
          show: true,
          text: (this.num ||0)+'\r{a|栋}\n{a|守护房屋安全中}',
          textStyle: {
            fontSize: 18,
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            color: '#fff',
            rich: {
              a: {
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                padding: [2, 0, 2, 0]
              }
            }
          },
          x: 'center',
          y: 'center'
        },
        series: [
          {
            type: 'liquidFill',
            radius: this.radius,
            center: ['50%', '50%'],
            // amplitude: '8%',
            // waveLength: '100%',
            // phase: 'auto',
            // period: 'auto',
            // direction: 'right',
            // shape: 'circle',

            // waveAnimation: true,
            // animationEasing: 'linear',
            // animationEasingUpdate: 'linear',
            // animationDuration: 2000,
            // animationDurationUpdate: 1000,

            // shape: 'roundRect',
            data: dataArr,
            color: this.colors,
            backgroundStyle: {
              color: this.backgroundColor
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 1,
                borderColor: this.borderColor,
                shadowBlur: 5,
                shadowColor: this.shadowColor
              }
            },
            label: {
              normal: {
                formatter: ''
              }
            }
          }
        ]
      };
      this.chart = echarts.init(this.$refs.liquidchart);
      this.chart.setOption(this.option);
    window.addEventListener('resize', this.handleWindowResize);
    this.addChartResizeListener();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
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

      instance.listenTo(this.$refs.liquidchart, () => {
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
    }
  }
};
</script>
<template>
  <div ref="liquidchart" class="liquid-chart"></div>
</template>
<style lang="scss" scoped>
.liquid-chart {
  width: 100%;
  height: 100%;
}
</style>
