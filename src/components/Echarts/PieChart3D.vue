<template>
  <div
    ref="piechart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import * as echarts from "echarts"; // echars 5.0引入方式
import "echarts-gl";
import ResizeListener from "element-resize-detector";
import { getPie3D, getParametricEquation } from '../../utils/chart'
export default {
  name: "PieChart3d",
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
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      option: {},
      chartData: []
    };
  },
  watch: {
    chartPieData: {
      handler(val) {
       this.$nextTick(() => {
          this.setOptions(val);
          this.chart.resize()
        })
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
    setOptions(dataSource) {
      this.option = getPie3D(dataSource, 0, 240, 28, 10, 1)
      this.chart.setOption(this.option)
      
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      // this.option.series.push({
      //   name: 'pie2d', //自己根据场景修改
      //   backgroundColor: 'transparent',
      //   type: 'pie',
      //   label: {
      //     opacity: 1,
      //     fontSize: 13,
      //     lineHeight: 20
      //   },
      //   startAngle: -40, // 起始角度，支持范围[0, 360]。
      //   clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      //   radius: ['20%', '50%'],
      //   center: ['50%', '50%'],
      //   data: dataSource,
      //   itemStyle: {
      //     opacity: 0  //这里必须是0，不然2d的图会覆盖在表面
      //   }
      // })
      // this.chart.setOption(this.option)
      this.bindListen(this.chart)
    },
    handleClick(params) {
      const value = this.chartPieData[params.seriesIndex]['typeCode'];
      this.$emit('chart-click', value);
    },
    bindListen(myChart, optionName = 'option') {
      let selectedIndex = ''
      let hoveredIndex = ''
      myChart.off('click');
      myChart.on('click', (params) => {
        this.handleClick(params);
      });
      myChart.off('mouseover')
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on('mouseover', (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
            if(hoveredIndex !== params.seriesIndex) {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
              isSelected = this[optionName].series[hoveredIndex].pieStatus.selected
              isHovered = false
              startRatio = this[optionName].series[hoveredIndex].pieData.startRatio
              endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
              k = this[optionName].series[hoveredIndex].pieStatus.k
              // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
              this[optionName].series[
                hoveredIndex
              ].parametricEquation = getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                30
              )
              this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
              // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
              hoveredIndex = ''
              return
            }
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = this[optionName].series[hoveredIndex].pieStatus.selected
            isHovered = false
            startRatio = this[optionName].series[hoveredIndex].pieData.startRatio
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
            k = this[optionName].series[hoveredIndex].pieStatus.k
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            this[optionName].series[
              hoveredIndex
            ].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              60
            )
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = ''
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== 'mouseoutSeries' &&
            params.seriesName !== 'pie2d'
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              this[optionName].series[params.seriesIndex].pieStatus.selected
            isHovered = true
            startRatio =
              this[optionName].series[params.seriesIndex].pieData.startRatio
            endRatio = this[optionName].series[params.seriesIndex].pieData.endRatio
            k = this[optionName].series[params.seriesIndex].pieStatus.k
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[
              params.seriesIndex
            ].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              60
            )
            this[optionName].series[
              params.seriesIndex
            ].pieStatus.hovered = isHovered
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName])
        }
      })
      
      myChart.off('globalout')
      // 修正取消高亮失败的 bug
      myChart.on('globalout', () => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected
          isHovered = false
          k = this[optionName].series[hoveredIndex].pieStatus.k
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          this[optionName].series[
            hoveredIndex
          ].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            30
          )
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = ''
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName])
      })
    }

  },
};
</script>
