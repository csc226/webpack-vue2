<!-- 领导驾驶舱-历史记录 -->
<script> 
let that;
export default {
  name: "History",
  components: {
    card: () => import("./card.vue"),
  },

  filters: {
    filterWeek(val) {
      let week = "";
      if (that.weekOptions && that.weekOptions.length > 0) {
        that.weekOptions.forEach((item) => {
          if (item.value === val) {
            week = item.label;
          }
        });
      }
      return week;
    },
  },
  props: {
    currentUserRegion: {
      type: Object,
      default() {
        return {};
      },
    },
    // dialogVisible: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      date: "",
      startTime: "",
      endTime: "",
      tableLoading: false,
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 20,
      dialogVisible: false,
      form: {
        rate: "4",
        week: "", // 日期-周
        month: "", // 日期-
        day: "", // 日期-日
        time: "", // 日期时间
      },
      weekOptions: [
        {
          value: "1",
          label: "周一",
        },
        {
          value: "1",
          label: "周二",
        },
        {
          value: "1",
          label: "周三",
        },
        {
          value: "1",
          label: "周四",
        },
        {
          value: "1",
          label: "周五",
        },
        {
          value: "1",
          label: "周六",
        },
        {
          value: "1",
          label: "周日",
        },
      ],
      monthOptions: [
        {
          value: "1",
          label: "一月",
        },
        {
          value: "2",
          label: "二月",
        },
        {
          value: "3",
          label: "三月",
        },
        {
          value: "4",
          label: "四月",
        },
        {
          value: "5",
          label: "五月",
        },
        {
          value: "6",
          label: "六月",
        },
        {
          value: "7",
          label: "七月",
        },
        {
          value: "8",
          label: "八月",
        },
        {
          value: "9",
          label: "九月",
        },
        {
          value: "10",
          label: "十月",
        },
        {
          value: "11",
          label: "十一月",
        },
        {
          value: "12",
          label: "十二月",
        },
      ],
      dayOptions: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
    };
  },
  watch: {},
  created() {
    that = this;
  },
  mounted() {
    this.gethistoryRecordPage();
  },
  beforeDestroy() {},
  methods: {
    gethistoryRecordPage() {
      this.tableLoading = true;
      let params = {
        xzqhdm: this.currentUserRegion.unitGbSysCode,
        startTime: this.startTime || "",
        endTime: this.endTime || "",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this.startTime && this.endTime && this.startTime === this.endTime) {
        params.endTime = this.dayjs(this.startTime)
          .add(1, "day")
          .format("YYYY-MM-DD HH:mm:ss");
      }
      gethistoryRecordPage(params)
        .then((res) => {
          if (res && res.success && res.content) {
            let list = res.content.list;
            list.forEach((item) => {
              item.recordTime = this.dayjs(item.recordTime).format(
                "YYYY-MM-DD HH:mm"
              );
            });
            this.tableData = list;
            this.total = res.content.total;
          }
          this.tableLoading = false;
        })
        .catch((e) => {
          this.tableLoading = false;
        });
    },
    closeCard() {
      this.$emit("close");
    },
    submit() {},
    set() {
      this.dialogVisible = true;
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.gethistoryRecordPage();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.gethistoryRecordPage();
    },
    afterClose() {
      this.dialogVisible = false;
    },
    saveConfig() {},
    changeRate() {
      this.form.month = "";
      this.form.week = "";
      this.form.day = "";
      this.form.time = "";
    },
    showTooltip(row, index, show) {
      row.showTooltip = show;
      this.$set(this.tableData, index, row);
    },
    reset(row) {
      this.$emit("reset", row);
      this.closeCard();
    },
  },
};
</script>

<template>
  <div class="dark-page history-box" style="">
    <card
      title="历史统计记录"
      :showCloseIcon="true"
      size="medium"
      style="width: 50%; height: 60%"
      @close-card="closeCard"
    >
      <template v-slot:content>
        <div class="dialog_body">
          <div>
            <!-- <el-date-picker
              v-model="date"
              popper-class="dark-select-popper"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker> -->
            <el-date-picker
              v-model="startTime"
              style="width: 135px"
              popper-class="dark-select-popper"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <span style="color: #12c49b"> - </span>
            <el-date-picker
              v-model="endTime"
              style="width: 135px"
              popper-class="dark-select-popper"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <el-button
              style="width: 64px; margin: 0 2px 0 12px"
              size="small"
              @click="gethistoryRecordPage"
              >查询</el-button
            >
            <el-button style="width: 64px" size="small" @click="set"
              >设置</el-button
            >
          </div>
          <el-table
            ref="agTable"
            v-loading="tableLoading"
            :data="tableData"
            style="
              width: 100%;
              height: calc(100% - 92px);
              overflow: hidden;
              background-color: transparent;
              margin: 15px 0;
            "
            header-cell-class-name="tableStyle"
            :header-cell-style="{ color: '#12C49B' }"
            :row-style="{ height: '40px !important' }"
            :cell-style="{
              padding: '5px 0',
              color: '#E7F0F3',
              'font-size': '14px',
            }"
            border
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(6, 40, 72,1)"
          >
            <el-table-column
              prop="sortNo"
              label="序号"
              min-width="30"
              align="center"
            >
              <template v-slot="scope">
                <!-- <span>{{ (currentPage - 1) * pagesize + scope.$index + 1 }}</span> -->
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="recordTime"
              label="记录时间"
              align="left"
            ></el-table-column>

            <el-table-column label="操作" align="right">
              <template v-slot="scope">
                <div style="display: flex; justify-content: flex-end">
                  <!-- <el-tooltip :value="true" popper-class="tooltip-item" effect="dark" content="查看详情" placement="left-start"> -->
                  <div v-show="scope.row.showTooltip" class="tooltip-box">
                    查看详情
                  </div>
                  <div
                    @mouseover="showTooltip(scope.row, scope.$index, true)"
                    @mouseout="showTooltip(scope.row, scope.$index, false)"
                  >
                    <el-link
                      style="
                        color: rgba(18, 196, 155, 1);
                        font-size: 14px;
                        margin-right: 6px;
                      "
                      :underline="false"
                      @click="reset(scope.row)"
                      ><i class="el-icon-document"></i>
                    </el-link>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            :page-size="pageSize"
            :current-page="pageNum"
            :total="total"
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
        <div class="dialog_footer">
          <el-button
            style="width: 60px; margin-right: 2px"
            size="small"
            @click="submit"
            >确定</el-button
          >
          <el-button style="width: 60px" size="small" @click="closeCard"
            >取消</el-button
          >
        </div>
      </template>
    </card>
    <el-dialog
      ref="dataDialog"
      title="设置记录规则"
      class="custom_dialog_dark"
      :modal="false"
      width="350px"
      :visible="dialogVisible"
      @close="afterClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <template v-slot:label
            ><i
              class="el-icon-time"
              style="margin-right: 2px"
            />选择记录频率</template
          >
          <el-radio-group v-model="form.rate" @change="changeRate">
            <el-radio label="1">每天</el-radio>
            <el-radio label="2">每周</el-radio>
            <el-radio label="3">每月</el-radio>
            <el-radio label="4">每年</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <template v-slot:label
            ><i
              class="el-icon-time"
              style="margin-right: 2px"
            />设置记录时间</template
          >
          <div v-if="form.rate === '4'" class="record_time">
            月份：
            <el-select
              v-model="form.month"
              popper-class="dark-select-popper"
              style="width: calc(100% - 55px)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in monthOptions"
                :key="`month-${item.value}`"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div v-if="form.rate !== '1'" class="record_time">
            日期：
            <el-select
              v-if="form.rate === '2'"
              v-model="form.week"
              popper-class="dark-select-popper"
              style="width: calc(100% - 55px)"
              placeholder="请选择"
              @change="changeWeek"
            >
              <el-option
                v-for="item in weekOptions"
                :key="`week-${item.value}`"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-if="form.rate === '3' || form.rate === '4'"
              v-model="form.day"
              popper-class="dark-select-popper"
              style="width: calc(100% - 55px)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in dayOptions"
                :key="`day-${item}`"
                :label="`${item}号`"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="record_time">
            时间：
            <el-time-picker
              v-model="form.time"
              popper-class="dark-select-popper"
              style="width: calc(100% - 55px)"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="请选择"
            >
            </el-time-picker>
          </div>
        </el-form-item>
        <div
          style="
            background: rgba(18, 196, 155, 0.2);
            line-height: 30px;
            color: #fff;
            font-size: 12px;
            padding: 0 17px;
            margin: 0 5px 0 2px;
          "
        >
          记录规则：
          <span v-if="form.month">{{ form.month }}月</span>
          <span v-if="form.day">{{ form.day }}日</span>&nbsp;
          <span v-if="form.week">{{ form.week | filterWeek }}</span
          >&nbsp;
          <span v-if="form.time">{{ form.time }}</span>
        </div>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button type="primary" size="small" @click="saveConfig"
            >确定</el-button
          >
          <el-button size="small" class="custom_btn_second" @click="afterClose"
            >取消</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.card_big {
  width: 100%;
  // height: 280px;
  height: calc(100% - 34px);
  // border: 1px solid rgba(76, 204, 255, 0.4);
  background-image: url("../../../assets/images/card-border-medium.png");
  // background-image: url("../../../assets/images/card-border-small.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  // background: url("../../../assets/images/card-border.png") center/100% 100% no-repeat;
}
.card_content {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  // background: linear-gradient(180deg, rgba(16, 86, 163, 0) 0%, rgba(16, 86, 163, 0.35) 100%);
  padding: 30px 20px 20px 20px;
}
.history-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.dialog_body {
  padding: 0 25px 18px 25px;
  height: calc(100% - 110px);
}
.dialog_footer {
  padding: 0 25px;
  text-align: right;
  .el-button {
    border: 1px solid rgba(18, 196, 155, 0.4);
    background: transparent;
    border-radius: 2px;
    color: rgba(18, 196, 155, 1);
  }
  .el-button:hover {
    box-shadow: inset 0px 0px 10px 1px rgba(18, 196, 155, 0.6);
    color: #e7f0f3;
  }
}
.my_dialog {
  width: 349px;
  height: 442px;
  background: linear-gradient(
    180deg,
    rgba(16, 86, 163, 0.2) 0%,
    rgba(16, 86, 163, 0) 49%,
    rgba(16, 86, 163, 0.2) 100%
  );
  border-radius: 1px 1px 1px 1px;
}
.tooltip-box {
  position: relative;
  display: inline-block;
  background-color: rgba(76, 204, 255, 0.1);
  margin-right: 10px;
  font-size: 14px;
  color: rgba(18, 196, 155, 1) !important;
  border-radius: 1px;
  padding: 2px 10px !important;
}
.tooltip-box::before {
  width: 0;
  height: 0;
  content: "";
  border: 6px solid rgba(76, 204, 255, 0.1);
  position: absolute;
  border-color: transparent transparent rgba(76, 204, 255, 0.1);
  top: 7px;
  right: -12px;
  transform: rotate(90deg);
}
::v-deep {
  .el-table__header-wrapper {
    tr:first-child {
      background: rgba(18, 196, 155, 0.2);
    }
  }
  .el-table__body-wrapper {
    height: calc(100% - 39px);
  }
  .el-table--border th,
  .el-table--border td {
    border-right: none;
  }
  .el-table--border th.gutter:last-of-type {
    background: transparent;
    border-bottom: 1px solid #2a7293;
  }
  .pagination {
    text-align: right;
    .el-pagination__total {
      color: rgba(18, 196, 155, 1);
      float: left;
    }
    .el-pager li,
    .btn-prev,
    .btn-next {
      background-color: transparent;
      color: rgba(18, 196, 155, 1);
    }
    .el-pager li {
      min-width: 29px;
    }
    .el-pagination button:disabled {
      color: rgba(18, 196, 155, 0.5);
      background-color: transparent;
    }
    .el-pager li.active {
      color: #fff;
      background: rgba(18, 196, 155, 0.4);
      border-radius: 4px 4px 4px 4px;
    }
  }

  .custom_dialog_dark {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dialog {
      margin-top: 0 !important;
      background-color: rgba(6, 36, 60, 0.9) !important;
      background: linear-gradient(
        180deg,
        rgba(16, 86, 163, 0.08) 0%,
        rgba(16, 86, 163, 0) 49%,
        rgba(16, 86, 163, 0.08) 100%
      );
      box-shadow: inset 0px 0px 27px 1px rgb(39 122 218 / 15.2%);
      border-radius: 1px 1px 1px 1px;
      border: 1px solid rgba(18, 196, 155, 0.4);
      .el-dialog__headerbtn {
        width: 16px;
        height: 16px;
        top: 16px !important;
        right: 16px;
        background: url("../../../assets/images/close-green.png") left no-repeat;
        background-size: cover;
      }
      .el-dialog__headerbtn i {
        visibility: hidden;
      }
      .el-dialog__footer {
        padding-top: 20px;
      }
    }
    .dialog-footer {
      .el-button {
        border: 1px solid rgba(18, 196, 155, 0.4);
        background: transparent;
        border-radius: 2px;
        color: rgba(18, 196, 155, 1);
      }
      .el-button:hover {
        box-shadow: inset 0px 0px 10px 1px rgba(18, 196, 155, 0.6);
        color: #e7f0f3;
      }
    }
    .el-form {
      .el-form-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
        .el-form-item__label {
          font-size: 14px;
          font-weight: bold;
          color: rgba(18, 196, 155, 1);
          text-align: left;
        }
        .el-form-item__content {
          margin-left: 20px !important;
        }
      }
    }
    .record_time {
      color: #e7f0f3;
      font-size: 12px;
      padding: 10px 0;
    }
    .el-dialog__header {
      .el-dialog__title {
        font-size: 16px;
        color: #fff;
        font-weight: bold;
      }
      background-color: transparent;
      border-bottom: 1px solid rgba(18, 196, 155, 0.4);
      height: 50px;
      line-height: 48px;
      padding: 0;
      padding-left: 20px;
      .el-dialog__headerbtn {
        top: 12px;
      }
    }
    .el-dialog__body {
      padding: 15px 15px 0px 15px;
    }
    .custom_dialog_body {
      .el-input__inner {
        height: 32px;
      }
      .el-form-item__label {
        line-height: 32px;
      }
      .el-form-item {
        width: 100%;
        margin-bottom: 16px;
      }
      .el-form-item__content {
        line-height: 32px;
        width: calc(100% - 85px);
      }
    }
  }
}
</style>
