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
      this.chart = Highcharts.chart('vennchart', {
        chart: {
          backgroundColor: 'transparent'
        },
        series: [
          {
            type: 'venn',
            name: 'The Unattainable Triangle',
            events: {
              click: function (event) {
                that.$emit('click', event);
                that.$bus.$emit('vennClick', event);
              }
            },
            colors: [
              'rgba(255, 179, 0, 0.8)',
              'rgba(65, 248, 230, 0.8)',
              'rgba(8, 185, 255, 0.8)',
              'rgba(93, 228, 187)',
              'rgba(46, 175, 204)',
              'rgba(17, 189, 244)',
              'rgba(25, 193, 241)'
            ],
            borderColor: 'transparent',
            color: '#fff',
            data: data,
            dataLabels: {
              enabled: true,
              formatter: function () {
                if (
                  this.point.name === '管理措施' ||
                  this.point.name === '工程措施' ||
                  this.point.name === '违法建设查处'
                ) {
                  return (
                    '<div style="color:#fff"><span style="font-size:14px;">' +
                    this.point.value +
                    '</span><span style="font-size:11px;color:rgba(255,255,255,0.6)">栋<span></div><br/>' +
                    '<div style="color:rgba(255,255,255,0.6);font-size:11px;textOutline:none">' +
                    this.point.name +
                    '</div>'
                  );
                } else {
                  return '';
                }
              },
              style: {
                textOutline: 'none'
              }
            }
          }
        ],
        title: {
          text: ''
        },
        tooltip: false,
        credits: { enabled: false },
        plotOptions: {
          series: {
            states: {
              hover: {
                enabled: false,
                brightness: 0,
                borderColor: 'transparent',
                halo: false
              },
              select: {
                enabled: false
              },
              inactive: {
                enabled: false
                // opacity: 1
              }
            }
          }
        }
      });
    }
  }
};
</script>

<template>
  <div id="vennchart" ref="vennchart" :class="className" :style="{ height: height, width: width }" />
</template>
