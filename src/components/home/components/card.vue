<!-- 领导驾驶舱、首页 -->
<script>
export default {
  name: 'Card',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      cardTitleIconCss: [
        {
          id: '1',
          color: 'rgba(62, 191, 255, 1)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.9)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.8)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.7)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.6)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.5)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.4)'
        },
        {
          id: '1',
          color: 'rgba(62, 191, 255, 0.3)'
        }
      ],
      housingDistributionForm: {
        total: '22200'
      }
    };
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit('close-card');
    }
  }
};
</script>

<template>
  <div class="" style="height: 100%;">
    <div :class="['card', { 'card-medium': size === 'medium' }]">
      <div class="background-image card-corner1"></div>
      <div class="background-image card-corner2"></div>
      <div class="background-image card-corner3"></div>
      <div class="background-image card-corner4"></div>
      <div style="position: relative">
        <div style="display: flex">
          <!-- TODO: -->
          <div style="height: 19px; width: calc(20% - 4px); border-top: 1px solid rgba(76, 204, 255, 0.2)">
            <slot name="title"></slot>
          </div>
          <div class="trapezoid1">
            <div class="trapezoid2"></div>
          </div>
          <div style="height: 29px; width: calc(20% - 4px); border-top: 1px solid rgba(76, 204, 255, 0.2)"></div>
        </div>
        <div style="position: absolute; top: 0; text-align: center; width: 100%; line-height: 22px">
          <div class="card_title">
            <span class="background-image card-title-icon card-title-icon-left"></span>
            <span style="padding: 0 8px">{{ title }}</span>
            <span class="card-title-icon card-title-icon-right"></span>
          </div>
        </div>
      </div>
      <!-- <div style="line-height: 32px">
        <div class="card_title">{{ title }}</div>
        <template v-if="showIcon">
          <span
            v-for="(item, index) in cardTitleIconCss"
            :key="index"
            class="card_title_icon"
            :style="{ background: item.color }"
          >
          </span>
        </template>
        <template v-if="showCloseIcon">
          <span style="float: right; padding: 16px 16px; cursor: pointer" @click="close"
            ><icons icon="svg-icon-home-darkclose"></icons
          ></span>
        </template>
      </div> -->
      <slot name="content"></slot>
      <div class="bottom_line"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.card {
  width: 100%;
  // height: 280px;
  height: 100%;
  border: 1px solid rgba(2,134,202,0.4);
  background: linear-gradient(360deg, rgba(16,86,163,0) 0%, rgba(16,86,163,0.2) 100%);
  // background-image: url('../../../assets/images/card-border-small.png');
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  position: relative;
  border-top: 0;
}
.card-medium {
  background-image: url('../../../assets/images/card-border-medium.png');
}

.background {
  width: 100%;
  height: 100%;
}
.trapezoid1 {
  width: 60%;
  border: 1px solid rgba(76, 204, 255, 0.2);
  margin: 0 auto;
  padding: 0 4px 4px 4px;
  border-top: 1px solid transparent;
  // background: rgba(0, 23, 40);
  transform: perspective(0.5em) rotateX(-1deg);
  border-radius: 3px;
}
.trapezoid2 {
  height: 23px;
  box-shadow: inset 0px 0px 4px 0px #4cccff;
  border-radius: 3px;
  background: rgba(0, 23, 41);
  transform: perspective(0.5em) rotateX(0deg);
  border: 1px solid #41f8e6;
}
.card-corner1 {
  width: 17px;
  height: 17px;
  background-image: url('../../../assets/images/card-corner1.png');
  position: absolute;
  top: -1px;
  left: -2px;
}
.card-corner2 {
  width: 17px;
  height: 17px;
  background-image: url('../../../assets/images/card-corner2.png');
  position: absolute;
  top: -1px;
  right: -2px;
}
.card-corner3 {
  width: 17px;
  height: 17px;
  background-image: url('../../../assets/images/card-corner3.png');
  position: absolute;
  bottom: -2px;
  left: -2px;
}
.card-corner4 {
  width: 17px;
  height: 17px;
  background-image: url('../../../assets/images/card-corner4.png');
  position: absolute;
  bottom: -2px;
  right: -2px;
}
.card_title {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 1px;
  display: inline-block;
}
.card-title-icon {
  width: 22px;
  height: 6px;
  display: inline-block;
  vertical-align: middle;
}
.card-title-icon-left {
  background-image: url('../../../assets/images/card-title-icon-left.png');
}
.card-title-icon-right {
  background-image: url('../../../assets/images/card-title-icon-right.png');
}
.card_title_icon {
  width: 4px;
  height: 8px;
  filter: blur(undefinedpx);
  display: inline-block;
  margin-right: 2px;
  border-radius: 2px;
}
.bottom_line {
  width: calc(100% - 30px);
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(135deg, rgba(65, 248, 230, 0) 0%, #41f8e6 52%, rgba(65, 248, 230, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
}

@media only screen and (max-width: 1700px) {
  .card_title {
    font-size: 12px;
  }
}
</style>
