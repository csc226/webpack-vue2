<script>
/**
 * 进度仪表盘：
 * chartData= {
      value: 20
      outlineColor: 'rgba(255, 115, 115, 1)',
      inlineColor: 'rgba(255, 115, 115, 0.3)',
      color1: 'rgba(255, 115, 115, 1)',
      color2: 'rgba(255, 74, 111, 1)',
    }
 */
import * as echarts from "echarts"; // echars 5.0引入方式
import ResizeListener from "element-resize-detector";

export default {
  name: "GaugeChart",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    chartPieData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartPieData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.addChartResizeListener();
    this.initChart();
  },
  methods: {
    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: "scroll",
        callOnAdd: true,
      });

      instance.listenTo(this.$refs.gaugechart, () => {
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
      this.chart = echarts.init(this.$refs.gaugechart);
      this.setOptions(this.chartPieData);
    },
    setOptions(val) {
      let maxvalue = 100;
      let percent = (val.value / maxvalue) * 100;
      percent = percent.toFixed(0);
      if (JSON.stringify(val) !== "{}") {
        let option = [
          //外面的线
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.8, //线的位置
                  startAngle: 0, //开始的地方
                  endAngle: 180, //结束的地方
                },
                style: {
                  stroke: val.outlineColor,
                  fill: "transparent",
                  lineWidth: 0.25,
                },
                silent: true,
              };
            },
            data: [0],
          },
          //里面的线
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.7, //线的位置
                  startAngle: 0, //开始的地方
                  endAngle: 180, //结束的地方
                },
                style: {
                  stroke: val.inlineColor,
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          //环形图主体
          {
            name: "main",
            type: "pie",
            radius: ["65%", "52%"],
            silent: true,
            clockwise: true,
            startAngle: 90,
            endAngle: 360,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: val.value,
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: val.color1, // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: val.color2, // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: 100 - val.value,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
        ];
        if (val.value) {
          option.push(
            //小格子
            {
              name: "",
              type: "gauge",
              radius: "65%",
              center: ["50%", "50%"],
              startAngle: 0,
              endAngle: 360,
              splitNumber: 20, //改变小格子宽度
              hoverAnimation: true,
              axisTick: {
                show: false,
              },
              splitLine: {
                length: 10,
                lineStyle: {
                  width: 3,
                  color: "#051929", //改变小格子的线颜色
                },
                distance: -11,
              },
              axisLabel: {
                show: false,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  opacity: 0,
                },
              },
              detail: {
                show: false,
              },
              data: [
                {
                  value: 0,
                  name: "",
                },
              ],
            }
          );
        }
        this.chart.setOption(
          {
            backgroundColor: "transparent",
            title: {
              text: "{a|" + val.value + "}{b|%}",
              x: "center",
              y: "center",
              textStyle: {
                rich: {
                  a: {
                    fontSize: 18,
                    color: "#fff",
                  },
                  b: {
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                    padding: [0, 2],
                  },
                },
              },
            },
            series: option,
          },
          true
        );
      } else {
        this.chart.setOption({}, true);
      }
    },
  },
};
</script>

<template>
  <div
    ref="gaugechart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>
