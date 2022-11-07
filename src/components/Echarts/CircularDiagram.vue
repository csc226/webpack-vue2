<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Venn from 'highcharts/modules/venn';

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Venn(Highcharts);

export default {
  name: "CircularDiagram",
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
    isResize: {
      type: Boolean,
      default: false
    },
    sets: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.sets);

      // this.chart.series[0].setData(this.sets)
      // this.chart.series[0].data=this.sets
    });
  },
  methods: {
    initChart(data) {
      let that = this;
      that.chart = Highcharts.chart('circlechart', {
        chart: {
          type: 'pie',
          backgroundColor: 'none',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: '',
          enabled: false,
        },
        subtitle: {
          // text: 'Highcharts 中的3D环形图'
        },
        credits:{
          enabled:false
        },
        plotOptions: {
          pie: {
            innerSize: 10,
            depth:10
          }
        },
        series: [{
          name: '完成进度',
          events: {
            click: function (event) {
              that.$emit('chooseTheme', event);
              // that.$bus.$emit('chooseTheme', event);
            }
          },
          data: [
            ['整治', 8],
            ['监管', 3],
            ['鉴定', 1],
            ['排查', 6],
          ]
        }],
      });
    }
  }
}
</script>
<template>
  <div id="circlechart" ref="circlechart" :class="className" :style="{ height: height, width: width }" />
</template>