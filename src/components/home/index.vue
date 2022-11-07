<!-- 领导驾驶舱、首页 -->
<script>

export default {
  name: 'Home',
  components: {
    card: () => import('@/components/home/components/card'),
    detail: () => import('@/components/home/components/detail'),
    history: () => import('@/components/home/components/history'),
    'liquid-chart': () => import('@/components/Echarts/liquidfillChart'),
    'pie-chart': () => import('@/components/Echarts/PieChart'),
    'pie-chart-regular': () => import('@/components/Echarts/PieChartRegular'),
    // 'pie-chart-3d': () => import('@/components/Echarts/PieChart3D'), // TODO:
    'gauge-chart': () => import('@/components/Echarts/gaugeChart'),
    'line-chart': () => import('@/components/Echarts/LineChart'),
    'venn-chart': () => import('@/components/Echarts/VennChart'),
    'main-charts-3d': () => import('@/components/Echarts/mainCharts3D')
  },
  data() {
    return {
      visualMapText: '已排查房屋总量',
      zzcs: {
        glcs: Math.floor(Math.random() * (50000 - 10000) + 10000),
        gccs: Math.floor(Math.random() * (50000 - 10000) + 10000),
        wfcs: Math.floor(Math.random() * (50000 - 10000) + 10000)
      },
      detailVisible: false,
      dialogVisible: false,
      // 隐患初判排行榜
      dangerHouseRankingForm: {
        searchArea: '2',
        areaOptions: [
          {
            value: '1',
            label: '本级行政区'
          },
          {
            value: '2',
            label: '下级行政区'
          }
        ],
        maxRatio: null,
        data: [

        ]
      },
      // 房屋隐患整治情况
      houseRemendRankingForm: {
        searchArea: '2',
        areaOptions: [
          {
            value: '1',
            label: '本级行政区'
          },
          {
            value: '2',
            label: '下级行政区'
          }
        ],
        maxRatio: null,
        data: [
          // { xzqmc: '北湖区', yzzCount: 2000,  djbl: 7.35, quantity: 741, showPopover: false }
        ]
      },
      // 房屋用途
      housingUsageForm: {
        "xzqhdm": "370000",
        "jyxzjf": "0",
        "jyxzjfBl": 0,
        "zzjjyxzjf": "3",
        "zzjjyxzjfBl": 33.33,
        "qtzjf": "5",
        "qtzjfBl": 66.67,
        "type": 1,
        "aboveThree": 3,
        "underThree": 0,
        "jyxAboveThree": null,
        "jyxUnderThree": null,
        "zzjjyxAboveThree": null,
        "zzjjyxUnderThree": null,
        "qtAboveThree": null,
        "qtUnderThree": null,
        "zjfzs": 9,
        "wfjs": 1,
        "wfsp": 0,
        "wxzxksx": 0,
        "houseNumArr": ["0", "1", "2", "3", "1", "9"],
        "title": "经营性自建房"
      },
      // 所在区域
      areaForm: [],
      // 建成时间
      buildingTimeStasiticForm: [
        {
          name: '1980年',
          value: 0
        },
        {
          name: '1990年',
          value: 0
        },
        {
          name: '2000年',
          value: 0
        },
        {
          name: '2010年',
          value: 0
        },
        {
          name: '2015年',
          value: 0
        },
        {
          name: '2015年以后',
          value: 0
        }
      ],
      landTypeStatistic: [],
      landTypeDetail: [],
      remediationMeasuresForm: {
        tzsy: '300',
        tzjy: '400',
        fkjs: '500',
        rycl: '600',
        qtcs: '700'
      },
      monitorActive: '1',
      houseMonitorForm: {
        fwCount: '',
        month: {
          clwt: '2',
          dxc: '9',
          fxwt: '3',
          wtjjl: '66.66',
          xxc: '12',
          yxc: '1',
        },
        week: {
          clwt: '1',
          dxc: '1',
          fxwt: '1',
          wtjjl: '100',
          xxc: '3',
          yxc: '2',
        }
      },
      dateTime: '',
      mainForm: {
        "city": "山东省",
        "totalUserCount": 280,
        "todayActiveUser": 0,
        "hiddenDangerCount": 6,
        "appraisalCount": 1,
        "renovateCount": 1,
        "listeningCount": 0
      },
      userNumArr: [],
      todayUserNumArr: [],
      // 2222
      queryForm: {
        "regionCode": "",
        "cityOption": [
          {
            "label": "济南市",
            "value": "370100"
          }, {
            "label": "青岛市",
            "value": "370200"
          }, {
            "label": "淄博市",
            "value": "370300"
          }, {
            "label": "枣庄市",
            "value": "370400"
          }, {
            "label": "东营市",
            "value": "370500"
          }, {
            "label": "烟台市",
            "value": "370600"
          }, {
            "label": "潍坊市",
            "value": "370700"
          },
          { label: "济宁市", value: "370800" },
          { label: "泰安市", value: "370900" },
          { label: "威海市", value: "371000" },
          { label: "日照市", value: "371100" },
          { label: "临沂市", value: "371300" },
          { label: "德州市", value: "371400" },
          { label: "聊城市", value: "371500" },
          { label: "滨州市", value: "371600" },
          { label: "菏泽市", value: "371700" },
        ]
      },
      testChartDataShow: [
        { value: 3237, name: '整治中' },
        { value: 2164, name: '城市建成区' },
        { value: 7561, name: '城乡结合部' },
        { value: 7778, name: '城中村' },
        { value: 7355, name: '拆迁安置区' },
        { value: 1048, name: '工业园区' },
        { value: 2405, name: '建制镇' },
        { value: 1842, name: '集镇' },
        { value: 2090, name: '学校周边' },
        { value: 1762, name: '医院周边' },
        { value: 1593, name: '商贸市场周边' },
        { value: 2060, name: '其他' }
      ],
      // 隐患房屋整治措施柱状图
      dangerRemBarData: [
        { value: 820, name: '管理+工程' },
        { value: 1100, name: '管理+违建查处' },
        { value: 1240, name: '工程+违建查处' },
        { value: 900, name: '管理+工程+违建查处' }
      ],
      zzjdtjForm: {
        title: '整治进度',
        jd: '0',
        pieData: [
          {
            name: '整治中',
            value: 0
          },
          {
            name: '已整治',
            value: 0
          },
          {
            name: '待整治',
            value: 0
          }
        ],
        staticArr: [
          {
            value: '0',
            label: '一种隐患'
          },
          {
            value: '0',
            label: '两种隐患'
          },
          {
            value: '0',
            label: '三种隐患'
          },
          {
            value: '0',
            label: '四种隐患'
          }
        ]
      },
      fwaqjdqkForm: {
        "title": "鉴定进度",
        "jd": 50,
        "pieData": [
          { "name": "鉴定中", "value": 0 },
          { "name": "已鉴定", "value": 1 },
          { "name": "待鉴定", "value": 1 }
        ],
        "alevel": 0,
        "blevel": 0,
        "clevel": 0,
        "dlevel": 0,
        "jdjd": 50,
        "wfsl": 0
      },
      zzcsForm: {
        isZero: true,
        sets: [
          {
            sets: ['管理措施'],
            value: 1,
            name: '管理措施'
          },
          {
            sets: ['工程措施'],
            value: 1,
            name: '工程措施'
          },
          {
            sets: ['违法建设查处'],
            value: 1,
            name: '违法建设查处'
          },
          {
            sets: ['管理措施', '工程措施'],
            value: 0,
            name: '管理+工程'
          },
          {
            sets: ['管理措施', '违法建设查处'],
            value: 0,
            name: '管理+违建查处'
          },
          {
            sets: ['工程措施', '违法建设查处'],
            value: 0,
            name: '工程+违建查处'
          },
          {
            sets: ['管理措施', '工程措施', '违法建设查处'],
            value: 0,
            name: '管理+工程+违建查处'
          }
        ],
        detail: [
          [
            {
              name: '停止使用',
              value: 0
            },
            {
              name: '停止经营',
              value: 0
            },
            {
              name: '封控警示',
              value: 0
            },
            {
              name: '人员撤离',
              value: 0
            },
            {
              name: '其他措施',
              value: 0
            }
          ],
          [
            {
              name: '拆除重建',
              value: 0
            },
            {
              name: '维修加固',
              value: 0
            },
            {
              name: '其他措施',
              value: 0
            }
          ],
          [
            {
              name: '全部拆除',
              value: 0
            },
            {
              name: '部分拆除',
              value: 0
            },
            {
              name: '补办手续',
              value: 0
            },
            {
              name: '罚款',
              value: 0
            },
            {
              name: '没收',
              value: 0
            },
            {
              name: '其他',
              value: 0
            }
          ]
        ],
        currentData: [
          {
            name: '停止使用',
            value: 0
          },
          {
            name: '停止经营',
            value: 0
          },
          {
            name: '封控警示',
            value: 0
          },
          {
            name: '人员撤离',
            value: 0
          },
          {
            name: '其他措施',
            value: 0
          }
        ]
      },
      vennClickForm: {
        name: '',
        value: '',
        singleName: '管理措施',
        linePoints: '20,116.5,85,116.5,190,39'
      },
      szqyArr: [],
      aqyhcpArr: [],
      gytdArr: [],
      jttdArr: [],
      yhcpStatisticForm: [{
        bl: 0,
        dong: '2',
        xzqhdm: "",
        yhcp: "1",
        color: '#ff7373',
        borderColor: 'rgba(255, 115, 115, 0.3)',
        bgColor: 'rgba(255, 115, 115, 0.1)',
        yhcpName: '存在严重安全隐患',
        chartData: {
          "value": 0,
          "outlineColor": "rgba(255, 115, 115, 1)",
          "inlineColor": "rgba(255, 115, 115, 0.3)",
          "color1": "rgba(255, 115, 115, 1)",
          "color2": "rgba(255, 74, 111, 1)"
        }
      }, {
        bl: 0,
        dong: '1',
        xzqhdm: "",
        color: '#ffc901',
        yhcp: "3", yhcpName: '存在一定安全隐患',
        borderColor: 'rgba(255, 201, 1, 0.3)',
        bgColor: 'rgba(255, 201, 1, 0.1)',
        chartData: {
          "value": 100,
          "outlineColor": "rgba(255, 201, 1, 1)",
          "inlineColor": "rgba(255, 201, 1, 0.3)",
          "color1": "rgba(255, 201, 1, 1)",
          "color2": "rgba(255, 111, 0, 1)"
        }
      }, {
        bl: 0,
        dong: '1',
        xzqhdm: "", color: '#12c49b',
        yhcp: "2", yhcpName: '未发现安全隐患',
        borderColor: 'rgba(18, 196, 155, 0.3)',
        bgColor: 'rgba(18, 196, 155, 0.1)',
        chartData: {
          "value": 0,
          "outlineColor": "rgba(65, 248, 230, 1)",
          "inlineColor": "rgba(65, 248, 230, 0.3)",
          "color1": "rgba(17, 207, 156, 1)",
          "color2": "rgba(2, 202, 200, 1)"
        }
      }],
      glqkForm: [
        {
          label: '违法建设',
          num: '5',
          icon: 'svg-icon-home-glqk1'
        },
        {
          label: '违法审批',
          num: '0',
          icon: 'svg-icon-home-glqk2'
        },
        {
          label: '无行政许可手续',
          num: '3',
          icon: 'svg-icon-home-glqk3'
        }
      ],
      zjfaqpcqkHeight: 'calc(75% - 5px)',
      currentUserRegion: {
        "orgName": "山东省",
        "unitGbSysId": "",
        "parRegionName": "山东",
        "unitGbSysCode": "370000",
        "unitGbSysName": "山东省",
        "parRegionCode": "370000",
        "orgRank": "2",
        "regionCode": "370000",
        "regionName": "山东省"
      },
      lastRegionName: '山东省',
      lastRegionCode: '',
      currentRegion: {
        regionName: '',
        regionCode: ''
      },
      isHistory: 0,
      recordId: null,
      // 1111
      parentArea: {
        "regionId": "",
        "parentRegionId": "5",
        "regionName": "山东",
        "firstLetter": "sd",
        "regionFullName": "山东省",
        "regionStatus": 1,
        "regionalLevel": 3,
        "regionSeq": ".0.5.22.",
        "regionNum": "370000",
        "regionOldNum": null,
      },
      timeInterval: null,
    };
  },
  watch: {
    currentUserRegion: {
      handler(val) {
        // console.log('handler:', val)
        // 省级的取全名
        // regionName
        this.lastRegionName = val.parRegionName;
        this.queryForm.regionCode = val.regionCode % 1000 == 0 ? '' : val.regionCode;
        // this.parentArea.regionType === 'p' ? this.parentArea.regionFullName : this.parentArea.regionName;
        this.getCityList(val.regionCode)
      },
      deep: true,
      immediate: true
    }
  },
  async mounted() {
    if (this.isHistory === 0) {
      this.timeInterval = setInterval(this.getTime, 1000);
    }
    window.addEventListener('resize', this.windowResize);
    this.$nextTick(() => {
      this.windowResize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize);
  },
  methods: {
    getCityList(val) {
      this.$axios.get(`./json/${val}.json`).then((res) => {
        // console.log(res.data)
        let data2 = [];// 隐患整治
        let data1 = []; //隐患初判
        let num = []; //隐患初判
        let num1 = [];// 隐患整治

        res.data.features.forEach((item, idx) => {
          //隐患初判
          num.push({
            pcfw: Math.floor(Math.random() * (100000 - 60000) + 60000),
            yhfw: Math.floor(Math.random() * (60000 - 10000) + 10000),
            dong: Math.floor(Math.random() * (60000 - 10000) + 10000),
          })
          // 隐患整治
          num1.push({
            yzzCount: Math.floor(Math.random() * (60000 - 10000) + 10000),
            quantity: Math.floor(Math.random() * (100000 - 60000) + 60000)
          })
        })
        res.data.features.forEach((item, idx) => {
          // 隐患整治
          let obj2 = {
            xzqmc: item.properties.name,
            showPopover: false,
            yzzCount: num1[idx].yzzCount, djbl: ((num1[idx].yzzCount / num1[idx].quantity) * 100).toFixed(2), quantity: num1[idx].quantity
          }
          data2.push(obj2);
          // 隐患初判
          let obj1 = {
            "xzqhdm": item.properties.id,
            "xzqhmc": item.properties.name,
            "pcfw": num[idx].pcfw,
            "yhfw": num[idx].yhfw,
            "ratio": ((num[idx].yhfw / num[idx].pcfw) * 100).toFixed(2),
            "dong": num[idx].dong,
            "ypcfwzl": null,
            "showPopover": false,
            "direction": "down"
          };
          data1.push(obj1)
        })
        // 隐患整治
        this.houseRemendRankingForm.data = data2;
        this.data2 = data2;
        this.yhNum = num1;
        // { xzqmc: '北湖区', yzzCount: 2000,  djbl: 7.35, quantity: 741, showPopover: false }
        // 隐患初判
        this.dangerHouseRankingForm.data = data1;
        this.data1 = data1;
        this.cshNum = num;
        this.getAll();
        // { "xzqhdm": "431002", "xzqhmc": "北湖区", "pcfw": 9, "yhfw": 2, "ratio": 22.22, "dong": 2, "ypcfwzl": null, "showPopover": false, "direction": "down" },
      })
    },
    windowResize() {
      let height = this.$refs.yhfwphb && this.$refs.yhfwphb.$el && this.$refs.yhfwphb.$el.offsetHeight + 10;
      if (height) {
        this.zjfaqpcqkHeight = `calc(100% - ${height}px) !important`;
      }
    },
    getTime() {
      let vWeek;
      let vWeek_s;
      vWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      vWeek_s = date.getDay();
      this.dateTime =
        year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + '\t' + vWeek[vWeek_s];
    },
    mapClick(data, lastRegionCode) {
      this.mainForm.city = data.name;
      this.lastRegionName = this.mainForm.city;
      this.$set(this.currentUserRegion, 'regionCode', data.code.toString());
      this.$set(this.currentUserRegion, 'regionName', data.name);

    },
    goBack() {
      // 最多只能回到省级
      // 1111

      if (this.parentArea.regionalLevel < 3) return
      if (this.parentArea.regionNum) {
        this.$refs.mainChart3d.getmapDetailData(this.parentArea.regionNum);
        console.log(this.parentArea.regionNum)
        // this.$refs.mainChart3d.echartschange(this.parentArea.regionNum);
        this.mainForm.city = this.lastRegionName;
        this.currentUserRegion.regionCode = this.parentArea.regionNum;
        this.currentUserRegion.regionName = this.parentArea.regionName;

      }
    },
    changeRegion(value) {
      console.log('行政区切换：', value)
      // 2222
      this.$set(this.currentUserRegion, 'regionCode', value);
      this.$refs.mainChart3d.echartschange(value);
      this.mainForm.city = this.queryForm.cityOption.filter(
        (item) => item.value === value
      )[0].label;
      // this.parentArea.regionalLevel==3;
      this.$set(this.currentUserRegion, 'regionName', this.mainForm.city);

    },
    getAll() {
      this.dangerHouseRankingForm.searchArea = '2';
      this.houseRemendRankingForm.searchArea = '2';
      // 自建房总量
      let pcfw = 0;
      this.cshNum.forEach(item => {
        pcfw += item.pcfw;
      })
      let csArr = [0, 0, 0, 0, 0, 0];
      let zdy = String(pcfw).split('');
      let zdyL = zdy.length;
      csArr.splice(0, zdyL);
      this.housingUsageForm.houseNumArr = csArr.concat(zdy)
      // 房屋用途
      const num1 = (pcfw * 36 / 100).toFixed(0)
      const num2 = (pcfw * 41 / 100).toFixed(0)
      const num3 = pcfw - num1 - num2;
      this.housingUsageForm.jyxzjf = num1;
      this.housingUsageForm.jyxzjfBl = 36;
      this.housingUsageForm.zzjjyxzjf = num2;
      this.housingUsageForm.zzjjyxzjfBl = 34;
      this.housingUsageForm.qtzjf = num3;
      this.housingUsageForm.qtzjfBl = (100 - 36 - 41);

      // 隐患初判
      const yhN1 = Math.floor(Math.random() * (30000 - 7000) + 7000);
      const yhN2 = Math.floor(Math.random() * (30000 - 7000) + 7000);
      const yhN3 = Math.floor(Math.random() * (30000 - 7000) + 7000);
      const yhT = yhN1 + yhN2 + yhN3;
      this.yhcpStatisticForm[0].dong = yhN1
      this.yhcpStatisticForm[0].chartData.value = Number(yhN1 / yhT * 100).toFixed(0)
      this.yhcpStatisticForm[1].dong = yhN2
      this.yhcpStatisticForm[1].chartData.value = Number(yhN2 / yhT * 100).toFixed(0)
      this.yhcpStatisticForm[2].dong = yhN3
      this.yhcpStatisticForm[2].chartData.value = 100 - Number(yhN1 / yhT * 100).toFixed(0) - Number(yhN2 / yhT * 100).toFixed(0)

      // 管理情况
      this.glqkForm[0].num = Math.floor(Math.random() * (50000 - 10000) + 10000);
      this.glqkForm[1].num = Math.floor(Math.random() * (50000 - 10000) + 10000);
      this.glqkForm[2].num = Math.floor(Math.random() * (50000 - 10000) + 10000);
      // 已鉴定结果
      const yjdN1 = Math.floor(Math.random() * (70000 - 15000) + 15000);
      const yjdN2 = Math.floor(Math.random() * (70000 - 15000) + 15000);
      const yjdN3 = Math.floor(Math.random() * (70000 - 15000) + 15000);
      this.fwaqjdqkForm = {
        "title": "鉴定进度",
        "jd": Number(yjdN2 / (yjdN1 + yjdN2 + yjdN3) * 100).toFixed(0),
        "pieData": [
          { "name": "鉴定中", "value": yjdN1 },
          { "name": "已鉴定", "value": yjdN2 },
          { "name": "待鉴定", "value": yjdN3 }
        ],
        "alevel": Math.floor(Math.random() * (70000 - 15000) + 15000),
        "blevel": Math.floor(Math.random() * (70000 - 15000) + 15000),
        "clevel": Math.floor(Math.random() * (70000 - 15000) + 15000),
        "dlevel": Math.floor(Math.random() * (70000 - 15000) + 15000),
        "jdjd": 0,
        "wfsl": Math.floor(Math.random() * (70000 - 15000) + 15000),
      };
      // 房屋监测巡查情况 
      const xcN1 = Math.floor(Math.random() * (70000 - 15000) + 15000) * 4;
      const xcN2 = Math.floor(Math.random() * (50000 - 10000) + 10000) * 4;
      const xcN3 = Math.floor(Math.random() * (50000 - 10000) + 10000) * 4;
      const xcN4 = Math.abs(xcN1 - xcN2);

      this.houseMonitorForm = {
        fwCount: (xcN1 / 3).toFixed(0).toString(),
        month: {
          clwt: xcN3,
          dxc: xcN4,
          fxwt: xcN3,
          wtjjl: 100,
          xxc: xcN1,
          yxc: xcN2,
        },
        week: {
          clwt: (xcN3 / 2.5).toFixed(0),
          dxc: (xcN1 / 2.5).toFixed(0) - (xcN2 / 2.5).toFixed(0),
          fxwt: (xcN3 / 2.5).toFixed(0),
          wtjjl: '100',
          xxc: (xcN1 / 2.5).toFixed(0),
          yxc: (xcN2 / 2.5).toFixed(0),
        }
      };
      // 整治进度
      const zzjdN1 = Math.floor(Math.random() * (50000 - 10000) + 10000);
      const zzjdN2 = Math.floor(Math.random() * (50000 - 10000) + 10000);
      const zzjdN3 = Math.floor(Math.random() * (50000 - 10000) + 10000);
      const zzjdN4 = Math.floor(Math.random() * (50000 - 19000) + 19000);
      const zzjdN5 = Math.floor(Math.random() * (50000 - 15000) + 15000);
      const zzjdN6 = Math.floor(Math.random() * (50000 - 10000) + 10000);
      const zzjdN7 = Math.floor(Math.random() * (50000 - 8000) + 8000);
      this.zzjdtjForm = {
        title: '整治进度',
        jd: (zzjdN2 / (zzjdN1 + zzjdN2 + zzjdN3) * 100).toFixed(0),
        pieData: [
          {
            name: '整治中',
            value: zzjdN1
          },
          {
            name: '已整治',
            value: zzjdN2
          },
          {
            name: '待整治',
            value: zzjdN3
          }
        ],
        staticArr: [
          {
            value: zzjdN4,
            label: '一种隐患'
          },
          {
            value: zzjdN5,
            label: '两种隐患'
          },
          {
            value: zzjdN6,
            label: '三种隐患'
          },
          {
            value: zzjdN7,
            label: '四种隐患'
          }
        ]
      };
      // 整治措施
      this.zzcsForm.currentData = [
        {
          name: '停止使用',
          value: Math.floor(Math.random() * (60000 - 9000) + 9000)
        },
        {
          name: '停止经营',
          value: Math.floor(Math.random() * (60000 - 9000) + 9000)
        },
        {
          name: '封控警示',
          value: Math.floor(Math.random() * (60000 - 9000) + 9000)
        },
        {
          name: '人员撤离',
          value: Math.floor(Math.random() * (60000 - 9000) + 9000)
        },
        {
          name: '其他措施',
          value: Math.floor(Math.random() * (60000 - 9000) + 9000)
        }
      ]
      // 中間
      this.mainForm.hiddenDangerCount = Math.floor(Math.random() * (60000 - 9000) + 9000);
      this.mainForm.appraisalCount = Math.floor(Math.random() * (50000 - 6000) + 6000);
      this.mainForm.renovateCount = Math.floor(Math.random() * (50000 - 6000) + 6000);
      this.mainForm.listeningCount = Math.floor(Math.random() * (50000 - 6000) + 6000);
    },
    getParentAreaCode() {
      if (!this.currentUserRegion.regionCode) return;
      getParentAreaCode({ regionCode: this.currentUserRegion.regionCode }).then((res) => {
        if (res && res.success) {
          this.parentArea = res.content;
          // 省级的取全名
          this.lastRegionName =
            this.parentArea.regionType === 'p' ? this.parentArea.regionFullName : this.parentArea.regionName;
        }
      });
    },
    getmapCountData() {
      let params = {
        xzqhdm: this.currentUserRegion.regionCode
      };
      getmapCountData(params).then((res) => {
        if (res.success && res.content) {
          let content = res.content;
          // this.mainForm = content;
          this.mainForm.totalUserCount = content.totalUserCount;
          this.mainForm.todayActiveUser = content.todayActiveUser;
          this.mainForm.hiddenDangerCount = content.hiddenDangerCount;
          this.mainForm.appraisalCount = content.appraisalCount;
          this.mainForm.renovateCount = content.renovateCount;
          this.mainForm.listeningCount = content.listeningCount;
          this.userNumArr = this.mainForm.totalUserCount.toString().split('');
          this.todayUserNumArr = this.mainForm.todayActiveUser.toString().split('');
        }
      });
    },
    getRegion() {
      return new Promise((resolve, reject) => {
        let res = '';
        getRegion()
          .then((res) => {
            if (res.success) {
              this.currentUserRegion = res.content;
              this.$set(this.currentUserRegion, 'regionCode', this.currentUserRegion.unitGbSysCode);
              this.$set(this.currentUserRegion, 'regionName', this.currentUserRegion.unitGbSysName);
              this.mainForm.city = this.currentUserRegion.orgName;
              getRegionByOrgidByBSC({ orgId: this.currentUserRegion.unitGbSysId }).then((res) => {
                if (res) {
                  res.map((item) => {
                    item.label = item.text.split('_')[0];
                    item.value = item.text.split('_')[1];
                    return true;
                  });
                  this.queryForm.cityOption = res;
                }
              });
              resolve(res);
            }
          })
          .catch(() => {
            resolve(res);
          });
      });
    },
    getDic() {
      let typeCodes = 'yhpc_szqy,yhpc_aqyhcp,yhpc_gytd_tdxzxflx,yhpc_jjtd_tdxzxflx';
      return new Promise((resolve, reject) => {
        let res = '';
        if (!typeCodes) {
          resolve(res);
        } else {
          getDic(typeCodes)
            .then((res) => {
              if (res.success) {
                this.szqyArr = (res && res.content && res.content.yhpc_szqy) || [];
                this.aqyhcpArr = (res && res.content && res.content.yhpc_aqyhcp) || [];
                this.gytdArr = (res && res.content && res.content.yhpc_gytd_tdxzxflx) || [];
                this.jttdArr = (res && res.content && res.content.yhpc_jjtd_tdxzxflx) || [];
                resolve(res);
              }
            })
            .catch(() => {
              resolve(res);
            });
        }
      });
    },

    handleYHPC(item) {
      let filterItem = this.aqyhcpArr.filter((yhcp) => yhcp.value.toString() === item.yhcp.toString())
      item.yhcpName = filterItem[0].label;
      item.yhcpName = item.yhcpName.split('(')[0];
      switch (item.yhcp) {
        // 存在严重安全隐患
        case '1':
          item.color = 'rgba(255, 115, 115, 1)';
          item.borderColor = 'rgba(255, 115, 115, 0.3)';
          item.bgColor = 'rgba(255, 115, 115, 0.1)';
          item.chartData = {
            value: item.bl,
            outlineColor: 'rgba(255, 115, 115, 1)',
            inlineColor: 'rgba(255, 115, 115, 0.3)',
            color1: 'rgba(255, 115, 115, 1)',
            color2: 'rgba(255, 74, 111, 1)',
          }
          break;
        // 存在一定安全隐患
        case '3':
          item.color = 'rgba(255, 201, 1, 1)';
          item.borderColor = 'rgba(255, 201, 1, 0.3)';
          item.bgColor = 'rgba(255, 201, 1, 0.1)';
          item.chartData = {
            value: item.bl,
            outlineColor: 'rgba(255, 201, 1, 1)',
            inlineColor: 'rgba(255, 201, 1, 0.3)',
            color1: 'rgba(255, 201, 1, 1)',
            color2: 'rgba(255, 111, 0, 1)',
          }
          break;
        // 未发现安全隐患
        case '2':
          item.color = 'rgba(18, 196, 155, 1)';
          item.borderColor = 'rgba(18, 196, 155, 0.3)';
          item.bgColor = 'rgba(18, 196, 155, 0.1)';
          item.chartData = {
            value: item.bl,
            outlineColor: 'rgba(65, 248, 230, 1)',
            inlineColor: 'rgba(65, 248, 230, 0.3)',
            color1: 'rgba(17, 207, 156, 1)',
            color2: 'rgba(2, 202, 200, 1)',
          }
          break;
        default:
          break;
      }
      return item;
    },
    vennClick(data) {
      console.log('vennClick', data);
      let options = data.point.options;
      let beginPoints = [data.chartX, data.chartY - 10];
      this.$nextTick(() => {
        console.log(
          'vennRemark',
          this.$refs.vennRemark.style,
          this.$refs.vennRemark.offsetHeight,
          this.$refs.vennBox.offsetHeight
        );
        let outBoxHeight = this.$refs.vennBox.offsetHeight;
        let inBoxHeight = this.$refs.vennRemark.offsetHeight;
        let bottomY = inBoxHeight + (outBoxHeight - inBoxHeight) / 2 - 8;
        console.log('bottom', bottomY);
        let lastPoints = [20, bottomY];
        let middlePoints = [(data.chartX - 20) / 2, bottomY];
        let str = `${lastPoints[0]},${lastPoints[1]},${middlePoints[0]},${middlePoints[1]},${beginPoints[0]},${beginPoints[1]}`;
        this.vennClickForm.linePoints = str;
        console.log('str', str);
      });
      this.vennClickForm.name = '';
      this.vennClickForm.value = '';
      if (options.sets.length > 1) {
        let nameStr = '';
        options.sets.forEach((item, index) => {
          nameStr += index === options.sets.length - 1 ? item : item + '与';
        });
        this.vennClickForm.name = nameStr;
        this.vennClickForm.value = options.value;
      } else {
        this.vennClickForm.singleName = data.point.name;
      }
      if (this.zzcsForm.detail.length < 1) return;
      switch (this.vennClickForm.singleName) {
        case '管理措施':
          this.zzcsForm.currentData = this.zzcsForm.detail[0];
          break;
        case '工程措施':
          this.zzcsForm.currentData = this.zzcsForm.detail[1];
          break;
        case '违法建设查处':
          this.zzcsForm.currentData = this.zzcsForm.detail[2];
          break;
      }
      console.log('currentData', this.zzcsForm.currentData);
    },
    tdxzClick(data) {
      this.landTypeDetail = data.data;
    },
    changeyhfqphb(val) {
      console.log('切换', val)
      if (val == 1) {
        let pcfw = 0, yhfw = 0, dong = 0;
        this.cshNum.forEach(item => {
          pcfw += item.pcfw;
          yhfw += item.yhfw;
          dong += item.dong;
        })
        let data1 = [];
        let obj = {
          "xzqhdm": this.currentUserRegion.regionCode,
          "xzqhmc": this.currentUserRegion.regionName,
          "pcfw": pcfw,
          "yhfw": yhfw,
          "ratio": ((yhfw / pcfw) * 100).toFixed(2),
          "dong": dong,
          "ypcfwzl": null,
          "showPopover": false,
          "direction": "down"
        };
        data1.push(obj)
        this.dangerHouseRankingForm.data = data1;
      } else {
        this.dangerHouseRankingForm.data = this.data1;
      }
    },
    changeyhzzjdphb(val) {
      console.log('切换', val)
      if (val == 1) {
        let xzqmc = this.currentUserRegion.regionName, yzzCount = 0, quantity = 0;
        this.yhNum.forEach(item => {
          yzzCount += item.yzzCount;
          quantity += item.quantity;
        })
        let data2 = [];
        let obj = {
          xzqmc: xzqmc,
          showPopover: false,
          yzzCount: yzzCount,
          djbl: ((yzzCount / quantity) * 100).toFixed(2),
          quantity: quantity
        }
        data2.push(obj);
        this.houseRemendRankingForm.data = data2;
      } else {
        this.houseRemendRankingForm.data = this.data2;
      }
    },
    showDetail() {
      this.detailVisible = true;
    },
    showHistory() {
      this.dialogVisible = true;
    },
    closeDetailPage() {
      this.detailVisible = false;
    },
    closeDialogPage() {
      this.dialogVisible = false;
    },
    reset(row) {
      clearInterval(this.timeInterval);
      this.recordId = row.id;
      this.isHistory = row.id ? 1 : 0;
      let day = this.dayjs(row.recordTime).day()
      let dayStr = ''
      switch (day) {
        case 0:
          dayStr = '周日';
          break;
        case 1:
          dayStr = '周一';
          break;
        case 2:
          dayStr = '周二';
          break;
        case 3:
          dayStr = '周三';
          break;
        case 4:
          dayStr = '周四';
          break;
        case 5:
          dayStr = '周五';
          break;
        case 6:
          dayStr = '周六';
          break;
      }
      this.dateTime = ''
      this.dateTime = this.dayjs(row.recordTime).format('YYYY年MM月DD日 HH:mm:ss ') + dayStr;
      this.getAll()
    },
    mouseover(e, index, type) {
      this[type].data[index].showPopover = true;
      if (e.clientY < 195) {
        this[type].data[index].direction = 'down';
      } else {
        this[type].data[index].direction = 'up';
      }
    },
    mouseout(e, index, type) {
      this[type].data[index].showPopover = false;
    },
    legendClick(name, pieTitle) {
      if (pieTitle.indexOf('整治') > -1) {
        let type = this.zzjdtjForm.pieData.find(item => item.name === name).type || null;
        this.getzztjjdtj(type)
      }
    },
    // 房屋安全排查情况
    pcqkMap() {
      console.log('cccc1')
      this.visualMapText = "已排查房屋总量";
      this.$refs.mainChart3d.getmapDetailData(this.currentUserRegion.regionCode);
    },
    // 房屋结构安全鉴定
    jdMap() {
      this.visualMapText = "已鉴定房屋总量";
      this.$refs.mainChart3d.getmapDetailData(this.currentUserRegion.regionCode);
    },
    // 房屋监测巡查情况
    xcMap() {
      this.visualMapText = "已巡查房屋总量";
      this.$refs.mainChart3d.getmapDetailData(this.currentUserRegion.regionCode);
    },
    // 隐患房屋整治情况
    zzMap() {
      this.visualMapText = "已整治房屋总量";
      this.$refs.mainChart3d.getmapDetailData(this.currentUserRegion.regionCode);
    },
  }
};
</script>

<template>
  <div class="home_containter dark-page">
    <template v-if="!detailVisible">
      <el-row class="row" :gutter="12">
        <el-col :span="5">
          <card ref="yhfwphb" title="隐患初判排行榜" class="yhfwphb_box">
            <template v-slot:title>
              <el-select v-model="dangerHouseRankingForm.searchArea" class="noBorderSelect"
                popper-class="dark-select-popper"
                style="width: 100%; margin-right: 10px; margin-bottom: 12px; z-index: 100" @change="changeyhfqphb">
                <!-- parentArea.regionType:上级行政区的区域类型 z/p/c -->
                <el-option v-for="item in dangerHouseRankingForm.areaOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                  :disabled="item.value === '1' && !currentUserRegion.parRegionCode && parentArea.regionType === 'z'">
                </el-option>
              </el-select>
            </template>
            <template v-slot:content>
              <div class="yhfwphb_content">
                <el-row class="yhfwphb_row1">
                  <el-col class="normal" style="color: #fff; font-size: 12px; width: 40px">排名</el-col>
                  <el-col class="normal" style="color: #fff;width:66px">行政区</el-col>
                  <el-col class="normal" style="min-height: 1px; width: calc(100% - 226px)"></el-col>
                  <el-col class="normal" style="color: #fff; width: 60px">比例(%)</el-col>
                  <el-col class="normal" style="color: #fff; padding-right: 10px; width: 60px">数量(栋)</el-col>
                </el-row>
                <div style="width: 100%; height: calc(100% - 30px); overflow: auto">
                  <el-row v-for="(item, index) in dangerHouseRankingForm.data" :key="`${index}-yhfqphb`"
                    class="yhfwphb_row2" @mouseover.native="mouseover($event, index, 'dangerHouseRankingForm')"
                    @mouseout.native="mouseout($event, index, 'dangerHouseRankingForm')">
                    <el-col class="normal yhfwphb_second_title" :style="{
                      width: '40px',
                      color:
                        index === 0
                          ? '#FF7373'
                          : index === 1
                            ? '#FFB300'
                            : index === 2
                              ? '#F8E841'
                              : 'rgba(255, 255, 255, 0.8)'
                    }">NO.{{ index + 1 }}</el-col>
                    <el-col class="normal yhfwphb_third_title text-overflow" style="width:66px" :title="item.xzqhmc">{{
                        item.xzqhmc
                    }}</el-col>
                    <el-col class="yhfwphb_col3" style="width: calc(100% - 226px)">
                      <div class="full_process">
                        <!-- (item.ratio / dangerHouseRankingForm.maxRatio) * 100 -->
                        <div :class="['process', { 'hover_process': item.xzqhdm === currentUserRegion.regionCode }]"
                          :style="{
                            width: item.ratio ? `${item.ratio}%` : '0px'
                          }">
                          <div v-if="item.xzqhdm !== currentUserRegion.regionCode" class="yhfwphb_point1_green"></div>
                          <div v-if="item.xzqhdm !== currentUserRegion.regionCode" class="yhfwphb_point2_green"></div>
                          <div v-if="item.xzqhdm === currentUserRegion.regionCode" class="yhfwphb_point1_orange"></div>
                          <div v-if="item.xzqhdm === currentUserRegion.regionCode" class="yhfwphb_point2_orange"></div>
                          <div v-show="item.showPopover"
                            :class="['popover', item.direction === 'down' ? 'popover_down_padding' : 'popover_up_padding']"
                            :style="{ left: `calc(100% - 77px` }">
                            <div :class="['popover-image', item.direction === 'down' ? 'popover_down' : 'popover_up']">
                            </div>
                            <div class="div1">
                              <div class="title">排查房屋：</div>
                              <div>{{ item.pcfw }}栋</div>
                            </div>
                            <div class="div1">
                              <div class="title">隐患初判：</div>
                              <div>{{ item.yhfw || 0 }}栋</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col
                      :class="['normal', 'yhfwphb_third_title', { 'hover_title': item.xzqhdm === currentUserRegion.regionCode }]"
                      style="width: 60px">{{ item.ratio }}</el-col>
                    <el-col
                      :class="['normal', 'yhfwphb_third_title', { 'hover_title': item.xzqhdm === currentUserRegion.regionCode }]"
                      style="padding-right: 10px; width: 60px">{{
                          item.dong
                      }}</el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </card>
          <!-- <card title="房屋安全排查情况" :style="{ 'margin-top': '10px', height: zjfaqpcqkHeight }"> -->
          <card title="房屋安全排查情况" class="customCard" :style="{ 'margin-top': '10px', height: '605px'}" @click.native="pcqkMap">
            <template v-slot:content>
              <span class="aqpcBG_icon">
                <!-- <icons icon="svg-icon-home-aqpcBG"></icons> -->
              </span>
              <div class="total-num">
                <span class="total-num-title text-overflow" title="自建房总量">自建房总量</span>
                <span style="display: flex;align-items: center;justify-content: flex-end;width: calc(100% - 93px);">
                  <span v-for="(item, index) in housingUsageForm.houseNumArr" :key="`${item}-${index}`"
                    class="num-background">
                    <span>{{ item }}</span>
                  </span>
                  <span style="
                      padding: 0 14px 0 10px;
                      color: rgba(255,255,255,0.6);
                    ">栋</span>
                </span>
              </div>
              <!-- 房屋用途 -->
              <!-- <div style="width:100%;height:116px;overflow:hidden"> -->
              <div>
                <div class="second_title">
                  <span class="svgicon1">
                    <icons icon="svg-icon-home-title-fwyt"></icons>
                    <span
                      style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px">房屋用途</span>
                  </span>

                  <span class="svgicon2">
                    <icons icon="svg-icon-home-secondtitle2"></icons>
                  </span>
                </div>

                <div class="house_usage">
                  <div class="house_usage_item">
                    <div class="house_usage_item_row1" @click="getfwytStatistics('1')">
                      <icons icon="svg-icon-home-usage1"></icons>
                      <div class="house_usage_item_content">
                        <div :title="`${housingUsageForm.jyxzjf}栋`" class="usage_item_num text-overflow">
                          {{ housingUsageForm.jyxzjf }}<span style="padding-left: 2px">栋</span>
                        </div>
                        <div :title="`${housingUsageForm.jyxzjfBl}%`" class="usage_item_num text-overflow"
                          style="font-size:12px">{{ housingUsageForm.jyxzjfBl }}<span style="padding-left: 2px">%</span>
                        </div>
                      </div>
                    </div>
                    <div class="house_usage_item_percent">
                      <span class="percent1" style="border-radius: 2px 0 0 2px;"></span>
                      <span class="percent2"><span class="percent3"
                          :style="{ width: `${housingUsageForm.jyxzjfBl}%` }"></span></span>
                      <span class="percent1" style="border-radius: 0px 2px 2px 0"></span>
                    </div>
                    <div class="title">只用作经营性</div>
                  </div>
                  <div class="house_usage_item house_usage_item2">
                    <div class="house_usage_item_row1" @click="getfwytStatistics('1')">
                      <icons icon="svg-icon-home-usage2"></icons>
                      <div class="house_usage_item_content">
                        <div class="usage_item_num text-overflow" :title="`${housingUsageForm.zzjjyxzjf}栋`">
                          {{ housingUsageForm.zzjjyxzjf }}<span style="padding-left: 2px">栋</span>
                        </div>
                        <div class="usage_item_num text-overflow" :title="`${housingUsageForm.zzjjyxzjfBl}%`"
                          style="font-size:12px">{{ housingUsageForm.zzjjyxzjfBl }}<span
                            style="padding-left: 2px">%</span></div>
                      </div>
                    </div>
                    <div class="house_usage_item_percent">
                      <span class="percent1" style="border-radius: 2px 0 0 2px;"></span>
                      <span class="percent2"><span class="percent3"
                          :style="{ width: `${housingUsageForm.zzjjyxzjfBl}%` }"></span></span>
                      <span class="percent1" style="border-radius: 0px 2px 2px 0"></span>
                    </div>
                    <div class="title">自住及经营性自建房</div>
                  </div>
                  <div class="house_usage_item">
                    <div class="house_usage_item_row1" @click="getfwytStatistics('1')">
                      <icons icon="svg-icon-home-usage3"></icons>
                      <div class="house_usage_item_content">
                        <div class="usage_item_num text-overflow" :title="`${housingUsageForm.qtzjf}栋`">
                          {{ housingUsageForm.qtzjf }}<span style="padding-left: 2px">栋</span>
                        </div>
                        <div class="usage_item_num text-overflow" :title="`${housingUsageForm.qtzjfBl}%`"
                          style="font-size:12px">{{ housingUsageForm.qtzjfBl }}<span style="padding-left: 2px">%</span>
                        </div>
                      </div>
                    </div>
                    <div class="house_usage_item_percent">
                      <span class="percent1" style="border-radius: 2px 0 0 2px;"></span>
                      <span class="percent2"><span class="percent3"
                          :style="{ width: `${housingUsageForm.qtzjfBl}%` }"></span></span>
                      <span class="percent1" style="border-radius: 0px 2px 2px 0"></span>
                    </div>
                    <div class="title">其他自建房</div>
                  </div>
                </div>
              </div>
              <!-- 所在区域 -->
              <!-- 建成时间 -->
              <!-- 土地性质 -->
              <!-- <div style="height: calc(100% - 216px)">
                <div style="height: 24%; overflow: hidden">
                  <div class="second_title">
                    <span class="svgicon1"
                      ><icons icon="svg-icon-home-secondtitle1"></icons
                      ><span style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px"
                        >所在区域</span
                      ></span
                    >

                    <span class="svgicon2"><icons icon="svg-icon-home-secondtitle2"></icons></span>
                  </div>
                  <div class="area_statistic_content">
                    <div v-for="(item, index) in areaForm" :key="`${index}-area`" class="content">
                      <span style="color: rgba(255, 255, 255, 0.8)">{{ item.szqyName ? item.szqyName : '-' }}</span>
                      <span class="num">{{ item.dong }}<span>&thinsp;栋</span></span>
                    </div>
                  </div>
                </div>
                <div style="height: 38%; overflow: hidden">
                  <div class="second_title">
                    <span class="svgicon1"
                      ><icons icon="svg-icon-home-secondtitle1"></icons
                      ><span style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px"
                        >建成时间</span
                      ></span
                    >

                    <span class="svgicon2"><icons icon="svg-icon-home-secondtitle2"></icons></span>
                  </div>
                  <div style="height: calc(100% - 33px)">
                    <line-chart ref="lineChart" :chart-data="buildingTimeStasiticForm" height="100%" />
                  </div>
                </div>
                <div style="height: 38%; overflow: hidden">
                  <div class="second_title">
                    <span class="svgicon1"
                      ><icons icon="svg-icon-home-secondtitle1"></icons
                      ><span style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px"
                        >土地性质</span
                      ></span
                    >
                    <span class="svgicon2"><icons icon="svg-icon-home-secondtitle2"></icons></span>
                  </div>
                  <div style="width: 100%; height: calc(100% - 33px); display: flex; justify-content: space-evenly">
                    <pie-chart-regular
                      v-if="landTypeStatistic.length > 0"
                      ref="pieChart"
                      :chart-pie-data="landTypeStatistic"
                      height="100%"
                      width="40%"
                      @click="tdxzClick"
                    />
                    <div style="width: 60%; height: 100%; padding-right: 20px; font-size: 12px; line-height: 20px">
                      <el-row v-if="landTypeDetail.tdxz || landTypeDetail.dong" style="width: 100%; color: #ffc901">
                        <el-col :span="12">{{ landTypeDetail.tdxz || '-' }}</el-col>
                        <el-col :span="12" style="text-align: right">{{ landTypeDetail.dong || '-' }} 栋</el-col>
                      </el-row>
                      <div style="max-height: calc(100% - 20px); overflow-y: auto">
                        <el-row
                          v-for="(item, index) in landTypeDetail.info"
                          :key="`${index}-index`"
                          style="width: 100%"
                        >
                          <el-col :span="12" style="color: rgba(255, 255, 255, 0.6)">{{ item.tdxzName || '-' }}</el-col>
                          <el-col :span="4" style="color: rgba(255, 255, 255, 0.8)">{{ item.ratio }}</el-col>
                          <el-col :span="8" style="text-align: right; color: rgba(255, 255, 255, 0.8)"
                            >{{ item.dong || '-' }} 栋</el-col
                          >
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- 隐患初判 -->
              <div>
                <div class="second_title">
                  <span class="svgicon1">
                    <icons icon="svg-icon-home-title-yhcp"></icons><span
                      style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px">隐患初判</span>
                  </span>
                  <span class="svgicon2">
                    <icons icon="svg-icon-home-secondtitle2"></icons>
                  </span>
                </div>
                <div class="yhcp_statistic">
                  <div v-for="(item, index) in yhcpStatisticForm" :key="`${index}-yhcp`" class="yhcp" :style="{
                    margin: index === 0 ? '0 6px 0 0' : index === 1 ? '0 6px 0 6px' : index === 2 ? '0 0 0 6px' : '0',
                    'border-color': item.borderColor
                  }">
                    <span class="title" :style="{ color: item.color, 'background': item.bgColor }"
                      :title="item.yhcpName">{{
                          item.yhcpName
                      }}</span>
                    <span class="num">{{ item.dong }}<span>&thinsp;栋</span></span>
                    <div style="width: 100%;height: calc(100% - 78px);">
                      <gauge-chart ref="pieChart" :chart-pie-data="item.chartData" height="100%" width="100%" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- 管理情况 -->
              <div>
                <div class="second_title">
                  <span class="svgicon1">
                    <icons icon="svg-icon-home-title-glqk"></icons><span
                      style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px">管理情况</span>
                  </span>
                  <span class="svgicon2">
                    <icons icon="svg-icon-home-secondtitle2"></icons>
                  </span>
                </div>
                <div class="glqk">
                  <div v-for="(item, index) in glqkForm" :key="`${index}-glqk`" class="gl1k_item" :style="{
                    margin: index === 0 ? '0 6px 0 0' : index === 1 ? '0 6px 0 6px' : index === 2 ? '0 0 0 6px' : '0'
                  }">
                    <span>
                      <icons :icon="item.icon"></icons>
                    </span>
                    <span class="glqk_item_content">
                      <span class="num text-overflow" :title="`${item.num}栋`">{{ item.num
                      }}<span>&thinsp;栋</span></span>
                      <span class="title text-overflow" :title="item.label">{{ item.label }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </el-col>
        <el-col :span="14">
          <el-row class="row" style="height: 66.7% !important" :gutter="12">
            <div class="center_side">
              <main-charts-3d v-if="currentUserRegion.regionCode" ref="mainChart3d"
                :regionCode="currentUserRegion.regionCode" :visualMapText="visualMapText" @map-click="mapClick">
              </main-charts-3d>
              <div style="
                  font-size: 12px;
                  color: #fff;
                  height: 32px;
                  line-height: 32px;
                  position: absolute;
                  top: 0px;
                  width: calc(100% + 4px);
                ">
                <!-- <span style="float: left">{{ dateTime }}</span> -->
                <span class="city_label">{{ mainForm.city }}
                  <span style="cursor: pointer" @click="goBack">
                    <icons icon="svg-icon-home-back"></icons>
                  </span>
                </span>
              </div>
              <!-- <div class="user_statistic">
                <div class="user_num user_box">
                  <div style="display: flex; align-items: center">
                    <icons icon="svg-icon-home-user-green"></icons>
                    <span style="display: inline-block; padding-left: 5px">平台用户总人数</span>
                  </div>
                  <div
                    style="
                      color: #fff;
                      font-size: 16px;
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                      padding: 5px 0;
                    "
                  >
                    <span v-for="(item, index) in userNumArr" :key="`${item}-${index}`" class="user_num_green_back">
                      <span>{{ item }}</span>
                    </span>
                    <span style="float: right; font-size: 12px; color: rgba(255, 255, 255, 0.5)">人</span>
                  </div>
                  <div style="display: flex; align-items: center">
                    <icons icon="svg-icon-home-user-blue"></icons>
                    <span style="display: inline-block; padding-left: 5px">今日活跃用户</span>
                  </div>
                  <div
                    style="
                      color: #fff;
                      font-size: 16px;
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                      padding: 5px 0;
                    "
                  >
                    <span v-for="(item, index) in todayUserNumArr" :key="`${item}-${index}`" class="user_num_blue_back">
                      <span>{{ item }}</span>
                    </span>
                    <span style="float: right; font-size: 12px; color: rgba(255, 255, 255, 0.5)">人</span>
                  </div>
                </div>
              </div> -->
              <div class="center_statistics">
                <div class="statistics_item">
                  <span class="statistics_item_title">
                    <icons icon="svg-icon-home-hexagon1"></icons>
                  </span>
                  <div>
                    <span class="statistics_item_num" style="color: #ffc901 !important">{{ mainForm.hiddenDangerCount }}
                      <span class="item_label">栋</span></span>
                    <div class="item_label">隐患房屋</div>
                  </div>
                </div>
                <span class="svg_arrow">
                  <icons icon="svg-icon-home-arrowright1"></icons>
                </span>
                <div class="statistics_item">
                  <span class="statistics_item_title">
                    <icons icon="svg-icon-home-hexagon2"></icons>
                  </span>
                  <div>
                    <span class="statistics_item_num" style="color: #12c49b">{{ mainForm.appraisalCount }} <span
                        class="item_label">栋</span></span>
                    <div class="item_label">已鉴定房屋</div>
                  </div>
                </div>
                <span class="svg_arrow">
                  <icons icon="svg-icon-home-arrowright2"></icons>
                </span>
                <div class="statistics_item">
                  <span class="statistics_item_title">
                    <icons icon="svg-icon-home-hexagon3"></icons>
                  </span>
                  <div>
                    <span class="statistics_item_num" style="color: #4cccff">{{ mainForm.renovateCount }} <span
                        class="item_label">栋</span></span>
                    <div class="item_label">已整治房屋</div>
                  </div>
                </div>
                <span class="svg_arrow">
                  <icons icon="svg-icon-home-arrowright3"></icons>
                </span>
                <div class="statistics_item">
                  <span class="statistics_item_title">
                    <icons icon="svg-icon-home-hexagon4"></icons>
                  </span>
                  <div>
                    <span class="statistics_item_num" style="color: #41f8e6">{{ mainForm.listeningCount }} <span
                        class="item_label">栋</span></span>
                    <div class="item_label">监测巡查</div>
                  </div>
                </div>
              </div>
            </div>
          </el-row>
          <el-row class="row" style="height: 33.3% !important">
            <el-col :span="12" style="padding-right: 6px">
              <card title="房屋结构安全鉴定" class="fwaqjdqk_box customCard" @click.native="jdMap">
                <template v-slot:content>
                  <div class="second_title">
                    <span class="svgicon1">
                      <icons icon="svg-icon-home-secondtitle1"></icons><span
                        style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px">已鉴定结果</span>
                    </span>
                    <span class="svgicon2">
                      <icons icon="svg-icon-home-secondtitle2"></icons>
                    </span>
                  </div>
                  <div style="height: calc(100% - 180px)">
                    <pie-chart ref="pieChart" :chart-pie-data="fwaqjdqkForm" :legendPosition="250" height="100%"
                      width="100%" />
                  </div>
                  <div style="height: 116px; display: flex; align-items: center; padding: 10px 4px 10px 20px">
                    <div class="left">
                      <div class="div1">{{ fwaqjdqkForm.wfsl }}<span class="span1">&thinsp;栋</span></div>
                      <div style="display: flex; align-items: center; margin: 5px 0 7px 0">
                        <span class="circle"></span>
                        <span class="line"></span>
                      </div>
                      <div class="div2">
                        <icons icon="svg-icon-home-yjdjg1"></icons>危房数量
                      </div>
                    </div>
                    <div class="right">
                      <div class="div1">
                        <div class="div2">{{ fwaqjdqkForm.alevel }}<span>&thinsp;栋</span></div>
                        <div class="div3">
                          <icons icon="svg-icon-home-yjdjg-A"></icons>
                          <span>A级</span>
                        </div>
                      </div>
                      <div class="div1">
                        <div class="div2">{{ fwaqjdqkForm.blevel }}<span>&thinsp;栋</span></div>
                        <div class="div3">
                          <icons icon="svg-icon-home-yjdjg-B"></icons> <span>B级</span>
                        </div>
                      </div>
                      <div class="div1">
                        <div class="div2">{{ fwaqjdqkForm.clevel }}<span>&thinsp;栋</span></div>
                        <div class="div3">
                          <icons icon="svg-icon-home-yjdjg-C"></icons> <span>C级</span>
                        </div>
                      </div>
                      <div class="div1">
                        <div class="div2">{{ fwaqjdqkForm.dlevel }}<span>&thinsp;栋</span></div>
                        <div class="div3">
                          <icons icon="svg-icon-home-yjdjg-D"></icons> <span>D级</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </card>
            </el-col>
            <el-col :span="12" style="padding-left: 6px">
              <card title="房屋监测巡查情况" class="customCard"  @click.native="xcMap">
                <template v-slot:content>
                  <div class="monitor_form">
                    <div style="width: 40%; height: 100%; border: 1px solid rgba(76, 204, 255, 0.2)">
                      <liquid-chart radius="80%" :data="0.21" :num="(houseMonitorForm.fwCount).toString()"
                        :colors="['rgba(2, 202, 200, 0.6)', 'rgba(2, 202, 200, 0.2)', 'rgba(2, 202, 200, 0)']"
                        borderColor="rgba(76, 204, 255, 0.5)" shadowColor="rgba(0, 217, 180, 1)">
                      </liquid-chart>
                    </div>
                    <div style="width: 40%; height: 100%">
                      <div style="height: 32px;display: flex;">
                        <span :class="[monitorActive === '1' ? 'active_tab' : 'tab']"
                          @click="monitorActive = '1'">本周巡查</span>
                        <span :class="[monitorActive === '2' ? 'active_tab' : 'tab']"
                          @click="monitorActive = '2'">本月巡查</span>
                      </div>
                      <div class="center">
                        <div style="display: flex;">
                          <span class="span1" title="巡查计划"><span class="span-point"
                              style="background:#FF7373;"></span>巡查计划</span>
                          <span class="span1 span2"><label style="color: #4cccff">{{
                              monitorActive === '1' ? houseMonitorForm.week.xxc : houseMonitorForm.month.xxc
                          }}</label><span style="font-size: 12px">&thinsp;栋</span></span>
                        </div>
                        <div style="display: flex;">
                          <span class="span1" title="已巡查"><span class="span-point"
                              style="background:#12C49B"></span>已巡查</span>
                          <span class="span1 span2"><label style="color: #4ccfa3">{{
                              monitorActive === '1' ? houseMonitorForm.week.yxc : houseMonitorForm.month.yxc
                          }}</label><span style="font-size: 12px">&thinsp;栋</span></span>
                        </div>
                        <div style="display: flex;">
                          <span class="span1" title="待巡查"><span class="span-point"
                              style="background:#FFC901"></span>待巡查</span>
                          <span class="span1 span2"><label style="color: #ffb300">{{
                              monitorActive === '1' ? houseMonitorForm.week.dxc : houseMonitorForm.month.dxc
                          }}</label><span style="font-size: 12px">&thinsp;栋</span></span>
                        </div>
                        <div style="display: flex;">
                          <span class="span1" title="发现问题">发现问题</span>
                          <span class="span1 span2"><label style="color: #ff7373">{{
                              monitorActive === '1' ? houseMonitorForm.week.fxwt : houseMonitorForm.month.fxwt
                          }}</label><span style="font-size: 12px">&thinsp;栋</span></span>
                        </div>
                        <div style="display: flex;">
                          <span class="span1" title="处理问题">处理问题</span>
                          <span class="span1 span2"><label style="color: #fff634">{{
                              monitorActive === '1' ? houseMonitorForm.week.clwt : houseMonitorForm.month.clwt
                          }}</label><span style="font-size: 12px">&thinsp;栋</span></span>
                        </div>
                      </div>
                    </div>
                    <!-- <div style="width: 100%;height: 100%;border: 1px solid rgba(76, 204, 255, 0.2);">
                      <gauge-chart
                        ref="pieChart"
                        :chart-pie-data="houseMonitorForm.chartData"
                        height="100%"
                        width="100%"
                      />
                    </div> -->
                    <div style="
                        width: 20%;
                        height: 100%;
                        border: 1px solid rgba(76, 204, 255, 0.2);
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        line-height: 18px;
                      ">
                      <span style="color: #fff; font-size: 18px; font-weight: bold">{{
                          monitorActive === '1' ? houseMonitorForm.week.wtjjl : houseMonitorForm.month.wtjjl
                      }}<span style="color: #ffffff80; font-size: 12px"> %</span></span>
                      <span style="color: #ffffff80; line-height: 24px">问题解决率</span>
                    </div>
                  </div>
                </template>
              </card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <div>
            <el-select v-model="queryForm.regionCode" popper-class="dark-select-popper"
              style="width: calc(100% - 205px); margin-right: 10px; margin-bottom: 12px" filterable placeholder="请选择行政区"
              @change="changeRegion">
              <el-option v-for="item in queryForm.cityOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button style="width: 88px" size="small" @click="showDetail">查看详情</el-button>
            <el-button style="width: 88px" size="small" @click="showHistory">历史记录</el-button>
          </div>
          <card title="房屋隐患整治情况" style="height: calc(30% - 5px)">
            <template v-slot:title>
              <el-select v-model="houseRemendRankingForm.searchArea" class="noBorderSelect"
                popper-class="dark-select-popper"
                style="width: 100%; margin-right: 10px; margin-bottom: 12px; z-index: 100" @change="changeyhzzjdphb">
                <el-option v-for="item in houseRemendRankingForm.areaOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-slot:content>
              <div class="yhfwphb_content">
                <el-row class="yhfwphb_row1">
                  <!-- <el-col class="normal" style="color: #fff; font-size: 12px; width: 40px">排名</el-col> -->
                  <el-col class="normal" style="color: #fff">行政区</el-col>
                  <el-col class="normal" style="min-height: 1px; width: calc(100% - 190px)"></el-col>
                  <el-col class="normal" style="color: #fff; width: 60px">比例(%)</el-col>
                  <el-col class="normal" style="color: #fff; padding-right: 10px; width: 60px">数量(栋)</el-col>
                </el-row>
                <div style="width: 100%; height: calc(100% - 30px); overflow: auto">
                  <el-row v-for="(item, index) in houseRemendRankingForm.data" :key="`${index}-yhfqphb`"
                    class="yhfwphb_row2" @mouseover.native="mouseover($event, index, 'houseRemendRankingForm')"
                    @mouseout.native="mouseout($event, index, 'houseRemendRankingForm')">
                    <!-- <el-col
                      class="normal yhfwphb_second_title"
                      :style="{
                        width: '40px',
                        color:
                          index === 0
                            ? '#FF7373'
                            : index === 1
                            ? '#FFB300'
                            : index === 2
                            ? '#F8E841'
                            : 'rgba(255, 255, 255, 0.8)'
                      }"
                      >NO.{{ index + 1 }}</el-col
                    > -->
                    <el-col class="normal yhfwphb_third_title text-overflow" :title="item.xzqmc">{{ item.xzqmc }}
                    </el-col>
                    <el-col class="yhfwphb_col3" style="width: calc(100% - 190px)">
                      <div class="full_process">
                        <!-- width: item.djbl ? `${(item.djbl / houseRemendRankingForm.maxRatio) * 100}%` : '0px' -->
                        <div :class="['process', { 'hover_process': item.xzqhdm === currentUserRegion.regionCode }]"
                          :style="{
                            width: item.djbl ? `${item.djbl}%` : '0px'
                          }">
                          <div v-if="item.xzqhdm !== currentUserRegion.regionCode" class="yhfwphb_point1_green"></div>
                          <div v-if="item.xzqhdm !== currentUserRegion.regionCode" class="yhfwphb_point2_green"></div>
                          <div v-if="item.xzqhdm === currentUserRegion.regionCode" class="yhfwphb_point1_orange"></div>
                          <div v-if="item.xzqhdm === currentUserRegion.regionCode" class="yhfwphb_point2_orange"></div>
                          <div v-show="item.showPopover"
                            :class="['popover', item.direction === 'down' ? 'popover_down_padding' : 'popover_up_padding']"
                            :style="{ left: `calc(100% - 77px` }">
                            <div :class="['popover-image', item.direction === 'down' ? 'popover_down' : 'popover_up']">
                            </div>
                            <div class="div1">
                              <div class="title">需整治房屋：</div>
                              <div>{{ item.quantity }}栋</div>
                            </div>
                            <div class="div1">
                              <div class="title">已整治房屋：</div>
                              <div>{{ item.yzzCount }}栋</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col
                      :class="['normal', 'yhfwphb_third_title', { 'hover_title': item.xzqhdm === currentUserRegion.regionCode }]"
                      style="width: 60px">{{ item.djbl }}</el-col>
                    <el-col
                      :class="['normal', 'yhfwphb_third_title', { 'hover_title': item.xzqhdm === currentUserRegion.regionCode }]"
                      style="padding-right: 10px; width: 60px">{{
                          item.yzzCount
                      }}</el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </card>
          <card title="隐患房屋整治情况" style="margin-top: 10px; height: calc(70% - 48px)" class="customCard" @click.native="zzMap">
            <template v-slot:content>
              <div class="second_title">
                <span class="svgicon1">
                  <icons icon="svg-icon-home-secondtitle1"></icons><span
                    style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px">整治进度</span>
                </span>
                <span class="svgicon2">
                  <icons icon="svg-icon-home-secondtitle2"></icons>
                </span>
              </div>
              <div style="width: 100%; height: 40%; padding-bottom: 16px">
                <pie-chart ref="pieChart" :chart-pie-data="zzjdtjForm" height="50%" width="100%"
                  @legend-click="legendClick" />
                <div class="dangerHouseReme" style="height: 45px">
                  <div v-for="(item, index) in zzjdtjForm.staticArr" :key="`${item.value}-${index}`" class="polygon">
                    <icons :icon="`svg-icon-home-tip${index % 2}`"></icons>
                    <div class="first">
                      {{ item.value }}<span style="font-size: 12px; color: rgba(255, 255, 255, 0.5)"> 栋</span>
                    </div>
                    <div class="second">{{ item.label }}</div>
                  </div>
                </div>
              </div>
              <div class="second_title">
                <span class="svgicon1">
                  <icons icon="svg-icon-home-secondtitle1"></icons><span
                    style="padding: 0 8px;display:inline-block;color: #12C49B;font-size: 14px;padding 0 12px">整治措施</span>
                </span>
                <span class="svgicon2">
                  <icons icon="svg-icon-home-secondtitle2"></icons>
                </span>
              </div>
              <div class="zhengzhicuoshi" style="width: 100%; height: calc(60% - 98px)">
                <div v-if="!zzcsForm.isZero" ref="vennBox"
                  style="width: 100%; height: calc(100% - 82px); display: flex; align-items: center; position: relative">
                  <div id="vennRemark" ref="vennRemark" style="
                      width: 105px;
                      height: 71px;
                      color: rgba(255, 255, 255, 0.6);
                      font-size: 14px;
                      padding-left: 20px;
                      position: absolute;
                      left: 0;
                      bottom: 50px;
                    ">
                    <div style="line-height: 18px">{{ vennClickForm.name }}</div>
                    <div v-if="vennClickForm.value"
                      style="font-size: 22px; font-weight: bold; color: #fff; padding-top: 10px">
                      {{ vennClickForm.value
                      }}<span style="font-size: 12px; color: rgba(255, 255, 255, 0.6)">&thinsp;栋</span>
                    </div>
                  </div>
                  <svg v-if="vennClickForm.name" id="svg-wrap" style="width: 100%; position: absolute"
                    xmlns="http://www.w3.org/2000/svg">
                    <polyline :points="vennClickForm.linePoints" stroke="#12C49B" fill="none"></polyline>
                  </svg>

                  <!-- v-if="!zzcsForm.isZero" -->
                  <venn-chart ref="vennChart" style="margin: 0 auto; display: flex; justify-content: center"
                    width="100%" height="100%" :sets="zzcsForm.sets" @click="vennClick"></venn-chart>
                </div>
                <div v-else class="zero-venn" style="width: 100%; height: calc(100% - 82px); position: relative">
                  <div class="circle" style="background: rgba(255, 179, 0, 1); top: 0; left: calc(50% - 70px)">
                    <div><span>{{ zzcs.glcs }}</span> 栋</div>
                    <div>管理措施</div>
                  </div>
                  <div class="circle" style="background: rgba(65, 248, 230, 0.8); top: 0; right: calc(50% - 90px)">
                    <div><span>{{ zzcs.gccs }}</span> 栋</div>
                    <div>工程措施</div>
                  </div>
                  <div class="circle" style="background: rgba(8, 185, 255, 0.8); top: 70px; left: calc(50% - 30px)">
                    <div><span>{{ zzcs.wfcs }}</span> 栋</div>
                    <div>违法建设查处</div>
                  </div>
                </div>
                <div class="guanlicuoshi" style="height: 116px">
                  <div style="padding: 0 12px;text-align: left;">
                    <icons icon="svg-icon-home-guangdian"></icons>
                    <span class="title" style="margin-left:0;">{{ vennClickForm.singleName }}</span>
                  </div>
                  <div class="div1">
                    <div v-for="(itemm, index) in zzcsForm.currentData" :key="`${index}-data`" class="div2">
                      <span class="span1"></span>
                      <span class="span2"></span>
                      <span class="span3">
                        <span class="span4">{{ itemm.value }}<span class="span5"
                            style="padding-left: 2px">栋</span></span>
                        <span class="span5">{{ itemm.name }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </el-col>
      </el-row>
    </template>
    <detail v-if="detailVisible" :currentUserRegion="currentUserRegion" @close="closeDetailPage"></detail>
    <history v-if="dialogVisible" :currentUserRegion="currentUserRegion" @close="closeDialogPage" @reset="reset">
    </history>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/styles/home.scss';

@media only screen and (max-width: 1700px) {
  .center_statistics .svg_arrow .svg-icon {
    width: 41px;
    height: 7px;
  }
}
.home_containter{
  height:900px;}
</style>
<style lang="scss">
.home_containter{ 
 .customCard{
   .card_title{
      cursor: pointer;
    }
  }
}
.yhfwphb_box {
  .card {
    height: auto !important;
  }
}

.noBorderSelect {

  .el-input__inner {
    border: none !important;
    height: 32px;
    line-height: 32px;
  }

  .el-input__icon {
    line-height: 32px;
  }
}
</style>
