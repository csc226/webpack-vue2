<!-- 领导驾驶舱-查看详情 -->
<script> 
import { downloadByBlob } from "@/utils/common.js";
export default {
  name: 'Detail',
  components: {},
  props: {
    currentUserRegion: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      originData: [],
      originTitle: [
        '行政区划',
        '已排查房屋总量',
        '经营性自建房',
        '其他自建房',
        '国有土地',
        '集体土地',
        '城市建成区',
        '城乡结合部',
        '城中村',
        '拆迁安置区',
        '工业园区',
        '建制镇',
        '集镇',
        '学校周边',
        '医院周边',
        '商贸市场周边',
        '其他',
        '三层以上',
        '三层及以下',
        '1980年及以前',
        '1981-1990年',
        '1991-2000年',
        '2001-2010年',
        '2011-2015年',
        '2016及以后',
        '疑似隐患总量',
        '危险房屋',
        '暂无危险房屋',
        '潜在危险房屋',
        '已鉴定',
        'A级',
        'B级',
        'C级',
        'D级',
        '危房总量',
        '需整治房屋总量',
        '待整治',
        '整治中',
        '总量',
        '管理措施',
        '工程措施',
        '违法建设查处',
        '监测中房屋总量',
        '已巡查次数',
        '发现问题',
        '已处理问题'
      ],
      // originTitle 该标题为 正常显示的标题, 数组中的顺序就是上面数据源对象中的字段标题对应的顺序
      tableData: []
    };
  },
  watch: {},
  mounted() {
    this.getdetailsStatistics();
  },
  beforeDestroy() {},
  methods: {
    getdetailsStatistics() {
      this.tableLoading = true;
      let params = {
        xzqhdm: this.currentUserRegion.regionCode
      };
      getdetailsStatistics(params)
        .then((res) => {
          if (res.success && res.content) {
            let content = res.content;
            let arr = [];
            content.forEach((item) => {
              arr.push({
                xzqhmc: item.xzqhmc,
                ypcfwzl: item.ypcfwzl,
                jyxzjf: item.jyxzjf,
                qtzjf: item.qtzjf,
                gytd: item.gytd,
                jttd: item.jttd,
                csjcq: item.csjcq,
                cxjhb: item.cxjhb,
                czc: item.czc,
                cqazq: item.cqazq,
                gyyq: item.gyyq,
                jzz: item.jzz,
                jz: item.jz,
                xxzb: item.xxzb,
                yyzb: item.yyzb,
                smsczb: item.smsczb,
                qt: item.qt,
                scys: item.scys,
                scjyx: item.scjyx,
                earlierEights: item.earlierEights,
                toNines: item.toNines,
                toTwoThousand: item.toTwoThousand,
                toTens: item.toTens,
                toFifteens: item.toFifteens,
                laterFifteens: item.laterFifteens,
                ysyhzl: item.ysyhzl,
                wxfw: item.wxfw,
                zwwxfw: item.zwwxfw,
                qzwxfw: item.qzwxfw,
                yjd: item.yjd,
                aj: item.aj,
                bj: item.bj,
                cj: item.cj,
                dj: item.dj,
                wfzl: item.wfzl,
                xzzfwzl: item.xzzfwzl,
                dzz: item.dzz,
                zzz: item.zzz,
                zl: item.zl,
                glcs: item.glcs,
                gccs: item.gccs,
                wfjscc: item.wfjscc,
                jczfwzl: item.jczfwzl,
                yxccs: item.yxccs,
                fxwt: item.fxwt,
                yclwt: item.yclwt
              });
            });
            this.originData = arr;
            this.handleTableData();
            this.tableLoading = false;
          } else {
            this.tableLoading = false;
          }
        })
        .catch((e) => {
          this.tableLoading = false;
        });
    },
    handleTableData() {
      // 数组按矩阵思路, 变成转置矩阵
      let matrixData = this.originData.map((row) => {
        let arr = [];
        for (let key in row) {
          if (key) {
            arr.push(row[key]);
          }
        }
        return arr;
      });
      // console.log('matrixData', matrixData);
      let firstColTitle = [
        '行政区划',
        '已排查房屋总量',
        '房屋用途',
        '',
        '土地性质',
        '',
        '所在区域',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '所在区域',
        '建筑层数',
        '',
        '建成时间',
        '',
        '',
        '',
        '',
        '',
        '隐患初判',
        '',
        '',
        '',
        '安全鉴定',
        '',
        '',
        '',
        '',
        '',
        '隐患整治',
        '',
        '',
        '',
        '',
        '',
        '',
        '监测巡查',
        '',
        '',
        '',
        ''
      ];
      let secondColTItle = [
        '',
        '',
        '经营性自建房',
        '其他自建房',
        '国有土地',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '已整治',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ];
      // matrixData.forEach(matrixData={

      // })
      // 加入标题拼接最终的数据
      this.tableData = matrixData[0].map((col, i) => {
        // return [firstColTitle[i],this.originTitle[i], ...matrixData.map((row) => {
        return [
          firstColTitle[i],
          secondColTItle[i],
          this.originTitle[i],
          ...matrixData.map((row) => {
            return row[i];
          })
        ];
      });
      console.log('tableData', this.tableData);
    },
    goback() {
      this.$emit('close');
    },
    exportFile() {
      let params = {
        xzqhdm: this.currentUserRegion.regionCode
      };
      // this.tableLoading = true;
      exportDetailsStatistics(params).then((res) => {
        let fileName = `${this.currentUserRegion.regionName}房屋安全鉴定整治监管台账.xls`;
        downloadByBlob(res,fileName);
      });
    },
    query() {},
    set() {},
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let cellStyleObj = {
        padding: '5px 0',
        color: '#E7F0F3',
        'font-size': '14px'
      };
      if (columnIndex === 0 || (rowIndex < 2 && columnIndex === 2)) {
        cellStyleObj.background = '#033539';
        // cellStyleObj.background="rgba(18, 196, 155, 0.1)";
      } else if (columnIndex === 1 || columnIndex === 2) {
        cellStyleObj.background = '#012735';
        // cellStyleObj.background="rgba(18, 196, 155, 0.08)";
      }
      return cellStyleObj;
    },
    // eslint-disable-next-line complexity
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex < 2) {
        if (columnIndex === 2) {
          return [1, 3];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
      if ((1 < rowIndex && rowIndex < 38) || 41 < rowIndex) {
        if (columnIndex === 2) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
      if (columnIndex === 0) {
        switch (rowIndex) {
          case 2:
          case 4:
          case 17:
            return {
              rowspan: 2,
              colspan: 1
            };
          case 6:
            return {
              rowspan: 11,
              colspan: 1
            };
          case 19:
          case 29:
            return {
              rowspan: 6,
              colspan: 1
            };
          case 25:
          case 42:
            return {
              rowspan: 4,
              colspan: 1
            };
          case 35:
            return {
              rowspan: 7,
              colspan: 1
            };
          default:
            return {
              rowspan: 0,
              colspan: 0
            };
        }
      }
      if (columnIndex === 1) {
        if (rowIndex === 38) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>

<template>
  <div class="dark-page" style="height: 100%">
    <div style="height: 34px;padding:0 14px">
      <el-button style="width: 60px; float: right; margin-left: 8px" size="small" @click="goback">返回</el-button>
      <el-button style="width: 60px; float: right" size="small" @click="exportFile">导出</el-button>
    </div>
    <!-- <card title="" :showIcon="false">
      <template v-slot:content> -->
    <div class="card_big">
      <div class="card_content">
        <el-table
          ref="agTable"
          v-loading="tableLoading"
          row-key="id"
          :span-method="objectSpanMethod"
          :data="tableData"
          style="width: 100%; height: 100%; overflow: hidden; background-color: transparent"
          header-cell-class-name="tableStyle"
          :row-style="{ height: '42px !important' }"
          :cell-style="cellStyle"
          border
          element-loading-background="rgba(255, 255, 255, 0.1)"
          :show-header="false"
        >
          <template v-if="tableData && tableData.length > 0">
            <el-table-column
              v-for="(item, index) in tableData[0]"
              :key="index"
              label=""
              :fixed="index < 3 ? 'left' : false"
              :align="index === 2 ? 'left' : 'center'"
              :width="index === 0 ? '80' : index === 1 ? '40' : index === 2 ? '120' : ''"
            >
              <template v-slot="scope">
                {{ scope.row[index] === null || scope.row[index] === undefined ? '-' : scope.row[index] }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <!-- </template> -->
    <!-- </card> -->
  </div>
</template>

<style lang="scss" scoped>
.card_big {
  width: 100%;
  // height: 280px;
  height: calc(100% - 34px);
  // background-image: url('../../../assets/images/card-border-full.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  // background: url("../../../assets/images/card-border.png") center/100% 100% no-repeat;
}
.card_content {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  // background: linear-gradient(180deg, rgba(16, 86, 163, 0) 0%, rgba(16, 86, 163, 0.35) 100%);
  padding: 12px 12px 0px 14px;
}
::v-deep {
  //设置图标颜色
  .el-loading-spinner .path {
    stroke: #fff;
  }
  .el-table__header-wrapper {
    tr:first-child {
      background: rgba(18, 196, 155, 0.2);
    }
    tr:nth-child(2),
    tr:nth-child(3) {
      background: rgba(18, 196, 155, 0.08);
    }
  }
  .el-table__body-wrapper {
    height: calc(100% - 0px); // TODO: 根据表头高度动态变化
    overflow-y: auto;
  }
  .el-table__body tr.hover-row > td {
    background-color: transparent;
  }
  .el-table__body {
    tr:first-child {
      td:first-child {
        border-top: 1px solid rgba(18, 196, 155, 0.2);
      }
    }
    tr td:first-child {
      border-left: 1px solid rgba(18, 196, 155, 0.2);
      border-left: none;
    }
  }
  .el-table__fixed-body-wrapper {
    height: 100%;
  }
}
</style>
