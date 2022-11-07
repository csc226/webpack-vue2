<script>
// import beijing from '../../../../node_modules/echarts/map/js/province/beijing' // /引入北京地图数据

import * as echarts from "echarts"; // echars 5.0引入方式
import "echarts-gl";
import ResizeListener from "element-resize-detector";
import axios from "axios";
export default {
  props: {
    regionCode: {
      type: String,
      default: "",
    },
    visualMapText: {
      type: String,
      default: "已排查房屋总量"
    }
  },
  data() {
    return {
      city: [
        // { name: '', code: '', value: '' }, // TODO: 第一个要放空数据，否则emphasis不生效
        // {
        //   name: '贵阳市',
        //   code: '520100',
        //   value: 31.4,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   height: 3
        // },
        // {
        //   name: '六盘水市',
        //   code: '520200',
        //   value: 0,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   height: 3
        // },
        // {
        //   name: '遵义市',
        //   code: '520300',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   value: 247.9
        // },
        // {
        //   name: '安顺市',
        //   code: '520400',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   value: 196.3
        // },
        // {
        //   name: '毕节市',
        //   code: '520500',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   value: 102
        // },
        // {
        //   name: '铜仁市',
        //   code: '520600',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   value: 242.3
        // },
        // {
        //   name: '黔西南布依族苗族自治州',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   code: '522300',
        //   value: 342.3
        // },
        // {
        //   name: '黔东南苗族侗族自治州',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   code: '522600',
        //   value: 222
        // },
        // {
        //   name: '黔南布依族苗族自治州',
        //   height: 3,
        //   houseCount: 20,
        //   hiddenDangerCount: 20,
        //   renovateCount: 20,
        //   code: '522700',
        //   value: 242.3
        // }
      ],
      min: 0,
      max: 300,
      currentMouseOverIndex: null,
      hasMap: false,
      cityJson: null,
    };
  },
  watch: {
    regionCode: {
      handler(val) {
        this.$nextTick(() => {
          this.getmapDetailData(val);
        });
      },
      immediate: true,
      deep: true,
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.addChartResizeListener();
    // this.getmapDetailData(this.regionCode);
  },
  methods: {
    getmapDetailData(val) {
      // 获取地图数据 
      // this.cityJson = require(`@/utils/json/${val}.json`);
      this.$axios.get(`./json/${val}.json`).then((res) => {
        // console.log(res.data)
        this.cityJson = res.data;
        let content = [];
        res.data.features.forEach(item => {
          let obj = {
            hiddenDangerCount: Math.floor(Math.random() * (70000 - 15000) + 15000),
            houseCount: Math.floor(Math.random() * (70000 - 15000) + 15000),
            name: item.properties.name,
            code: item.properties.id|| item.properties.adcode,
            renovateCount: Math.floor(Math.random() * (70000 - 15000) + 15000),
          }
          content.push(obj)
        })

        let arr = [];
        this.cityJson.features.forEach((item1) => {
          // eslint-disable-next-line max-nested-callbacks 
          content.forEach((item2) => {
            let cityJsonCode = item1 ? item1.properties.id || item1.properties.adcode : ''; 
            if (item2.code.toString() === cityJsonCode.toString()) {
              item2["value"] = item2.houseCount || 0;
              arr.push(item2);
            }
          });
        });
        this.city = arr;
        this.echartschange(this.regionCode, this.city);
      })
    },
    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: "scroll",
        callOnAdd: true,
      });

      instance.listenTo(this.$refs.mainchart, () => {
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
    handleData(city) {
      let max = Math.max.apply(
        Math,
        city.map((item) => {
          return item.value;
        })
      );
      this.max = Math.ceil(max / 5) * 5;
      // 最小值 1
      let min = Math.min.apply(
        Math,
        city.map((item) => {
          return item.value;
        })
      );
      this.min = Math.floor(min);
    },
    echartschange(regionCode, cityData) {
      this.chart && this.chart.clear();
      let city = cityData ? cityData : this.city;
      this.handleData(city);
      let that = this;
      this.chart = echarts.init(this.$refs.mainchart);
      echarts.registerMap(regionCode, this.cityJson);
      let option = {
        tooltip: {
          formatter: function (params) {
            let result = "";
            if (that.visualMapText.indexOf('排查') > -1) {
              result = `
              <div style="width:196px;height:120px;margin-top:-12px;display:flex;flex-direction:column;justify-content:center">
                <div style="width:100%;overflow:hidden;font-size:16px;font-weight:bold;color: #12C49B;display:flex;align-items:center;padding:0px 0 4px 0">
                  <span style="display:inline-block;background:url(${require("../../assets/images/map-location.png")}) no-repeat center center;background-size:100% 100%;width:20px;height:20px;"></span>
                  <span style="display:inline-block">${params.name}</span>
                </div>
                <div style="font-size:14px;padding:2px 0 2px 0">
                  <span style="color:rgba(203, 255, 248, 1)">自建房屋总量：</span>
                  <span style="color:rgba(18, 196, 155, 1)">${params.data.houseCount
                } 栋</span>
                </div>
                <div style="font-size:14px;padding:2px 0 2px 0">
                  <span style="color:rgba(203, 255, 248, 1)">隐患初判总量：</span>
                  <span style="color:rgba(18, 196, 155, 1)">${params.data.hiddenDangerCount
                } 栋</span>
                </div>
                <div style="font-size:14px;padding:2px 0 0px 0">
                  <span style="color:rgba(203, 255, 248, 1)">已整治房屋总量：</span>
                  <span style="color:rgba(18, 196, 155, 1)">${params.data.renovateCount
                } 栋</span>
                </div>
              </div>
            `;
            } else if (that.visualMapText.indexOf('鉴定') > -1) {
              result = `
              <div style="width:196px;height:120px;margin-top:-12px;display:flex;flex-direction:column;justify-content:center">
                <div style="width:100%;overflow:hidden;font-size:16px;font-weight:bold;color: #12C49B;display:flex;align-items:center;padding:0px 0 4px 0">
                  <span style="display:inline-block;background:url(${require("../../assets/images/map-location.png")}) no-repeat center center;background-size:100% 100%;width:20px;height:20px;"></span>
                  <span style="display:inline-block">${params.name}</span>
                </div> 
                <div style="font-size:14px;padding:2px 0 0px 0">
                  <span style="color:rgba(203, 255, 248, 1)">已鉴定房屋总量：</span>
                  <span style="color:rgba(18, 196, 155, 1)">${params.data.renovateCount
                } 栋</span>
                </div>
              </div>
            `;
            } else if (that.visualMapText.indexOf('巡查') > -1) {
              result = `
              <div style="width:196px;height:120px;margin-top:-12px;display:flex;flex-direction:column;justify-content:center">
                <div style="width:100%;overflow:hidden;font-size:16px;font-weight:bold;color: #12C49B;display:flex;align-items:center;padding:0px 0 4px 0">
                  <span style="display:inline-block;background:url(${require("../../assets/images/map-location.png")}) no-repeat center center;background-size:100% 100%;width:20px;height:20px;"></span>
                  <span style="display:inline-block">${params.name}</span>
                </div> 
                <div style="font-size:14px;padding:2px 0 0px 0">
                  <span style="color:rgba(203, 255, 248, 1)">已巡查房屋总量：</span>
                  <span style="color:rgba(18, 196, 155, 1)">${params.data.renovateCount
                } 栋</span>
                </div>
              </div>
            `;
            } else if (that.visualMapText.indexOf('整治') > -1) {
              result = `
              <div style="width:196px;height:120px;margin-top:-12px;display:flex;flex-direction:column;justify-content:center">
                <div style="width:100%;overflow:hidden;font-size:16px;font-weight:bold;color: #12C49B;display:flex;align-items:center;padding:0px 0 4px 0">
                  <span style="display:inline-block;background:url(${require("../../assets/images/map-location.png")}) no-repeat center center;background-size:100% 100%;width:20px;height:20px;"></span>
                  <span style="display:inline-block">${params.name}</span>
                </div> 
                <div style="font-size:14px;padding:2px 0 0px 0">
                  <span style="color:rgba(203, 255, 248, 1)">已整治房屋总量：</span>
                  <span style="color:rgba(18, 196, 155, 1)">${params.data.renovateCount
                } 栋</span>
                </div>
              </div>
            `;
            }

            return result;
          },
          borderColor: "rgba(0, 0, 0, 0)",
          padding: [12, 20],
          extraCssText: `background:url(${require("../../assets/images/map-tooltip.png")}) no-repeat center center;min-width:190px;height:120px;background-size:100% 100%;`,
        },

        backgroundColor: "transparent",
        visualMap: {
          show: true,
          text: [this.visualMapText],
          showLabel: true,
          min: 0,
          max: this.max,
          inRange: {
            color: ["#b5d5ff", "#2c7ce3"],
            // color: ['rgba(18, 196, 155, 1)', '#084d64']
          },
          calculable: true,
          inverse: true,
          type: "piecewise", // 定义为分段型 visualMap
          left: "0",
          bottom: "112",
          hoverLink: false,
          backgroundColor: {
            type: "linear",
            x: 0, // 开始坐标点
            y: 0, // 开始坐标点
            x2: 0, // 结束坐标点
            y2: 1, // 结束坐标点
            colorStops: [
              {
                offset: 0,
                // color: 'rgba(16, 86, 163, 0)' // 0% 处的颜色
                color: "rgba(3, 39, 67, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                // color: 'rgba(16, 86, 163, 0.35)' // 100% 处的颜色
                color: "rgba(7, 49, 90, 1)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },

          borderColor: "rgba(2, 134, 202, 0.2)",
          borderWidth: 1,
          padding: 16,
          textStyle: {
            color: "rgba(255,255,255,0.7)",
          },
          // zlevel: 1,
          // formatter: function (value1, value2) {
          //   // 标签的格式化工具。
          //   return value1 + '-' + value2 + '栋'; // 范围标签显示内容。
          // }
        },
        series: [
          {
            name: regionCode,
            // type: 'scatter',
            type: "map3D",
            map: regionCode,
            data: city, 
            bottom:80, 
            left:40,
            // regionHeight: 3,
            boxWidth: 80,
            boxHeight: 100,
            boxDepth: 60,
            // top: '-10%',
            // left:'10%',
            // shading: 'realistic',
            // realisticMaterial: {
            //   textureTiling:100
            // },
            label: {
              show: true,
              formatter: function (params) {
                return params.name;
              },
              textStyle: {
                // borderWidth:2,
                color: "#fff",
                fontWeight: 400,
                fontSize: 14,
              },

              emphasis: {
                // 对应的鼠标悬浮效果
                show: true,
                textStyle: { color: "#fff" },
              },
            },
            itemStyle: {
              // normal: {
              borderWidth: 1,
              borderColor: "#4CCCFF",
              // }, // 阴影效果
            },
            emphasis: {
              itemStyle: {
                // color: 'rgba(0,0,0,0)',
                color: "#3e78c0",
                // color: '#12c49b',
                borderWidth: 0,
                opacity: 0,
              },
            },

            viewControl: {
              beta:10,
              minBeta: -360,
              maxBeta: 360,
              minDistance: 5,
              panMouseButton: "right",
              rotateMouseButton: "right",
              autoRotate: false,
              distance: 80,
              zoomSensitivity: 1, // 缩放灵敏度
            },
          },
        ],
      };
      this.hasMap = true;
      this.chart.setOption(option);

      this.chart.on("click", function (params) {

        let regionCode = params.data.code;
        // that.getmapDetailData(regionCode);
        if (regionCode % 100 == 0) {
          that.chart && that.chart.clear();
          that.$emit("map-click", params.data, that.regionCode);
        }

      });


      this.chart.on("mouseover", function (params) {
        if (that.currentMouseOverIndex === params.dataIndex) return;
        that.currentMouseOverIndex = params.dataIndex;

        that.city.forEach((item) => {
          item.height = 3;
        });
        if (params.data.hasOwnProperty("height") && params.data.height === 3) {
          that.city[params.dataIndex].height = 4;
          // let itemStyle = that.city[params.dataIndex].itemStyle
          // itemStyle['color'] = params.color;

          // console.log('mouseover-params', params);
          // console.log('mouseover-that.city', that.city);
          // that.echartschange();
          // this.chart.setOption(option)

          // console.log('getOption', this.chart.getOption());
        }
      });
      // 禁用热力图图例选中事件
      this.chart.on("datarangeselected", (e) => {
        const selected = { 0: true, 1: true, 2: true, 3: true, 4: true }; //* 因为这边只分了五段，故写死
        if (JSON.stringify(selected) !== JSON.stringify(e.selected)) {
          //* 判断是否为全部选中，全部选中则不用设置。如果不判断则会死循环
          this.chart.dispatchAction({
            //* 调用action方法将图例重新设置为全部选中
            type: "selectDataRange",
            // 连续型 visualMap 和 离散型 visualMap 不一样
            // 连续型的是一个表示数值范围的数组。
            // 离散型的是一个对象，键值是类目或者分段的索引。值是`true`或`false`
            selected: selected,
          });
        }
      });
    },
  },
};
</script>

<template>
  <div id="mapApp" style="height: 100%;">
    <div id="chartmainbar" ref="mainchart" style="width: 100%; height: calc(100% - 12px)"></div>
  </div>
</template>

<style lang="scss" scoped>
.map-tooltip-box {
  width: 81px;
  height: 103px;
  background-image: url("../../assets/images/background-polygon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
