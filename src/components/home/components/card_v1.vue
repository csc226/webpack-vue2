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
          color: 'rgba(18, 196, 155, 1)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.9)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.8)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.7)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.6)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.5)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.4)'
        },
        {
          id: '1',
          color: 'rgba(18, 196, 155, 0.3)'
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
  <div class="" style="height: 100%">
    <div :class="['card', { 'card-medium': size === 'medium' }]">
      <div style="line-height: 32px">
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
      </div>
      <slot name="content"></slot>
      <!-- <div class="title-box"> -->
      <!-- <div class="box"></div>
            <div class="box2"></div>
            <div class="box3"></div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  // height: 280px;
  height: 100%;
  // border: 1px solid rgba(76, 204, 255, 0.4);
  // background-image: url("../../../assets/images/card-border.png");
  background-image: url('../../../assets/images/card-border-small.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // background: linear-gradient(180deg, rgba(16, 86, 163, 0) 0%, rgba(16, 86, 163, 0.35) 100%);
}
.card-medium {
  background-image: url('../../../assets/images/card-border-medium.png');
}
.background {
  width: 100%;
  // height: 280px;
  height: 100%;
}
.card_title {
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0px 0px 6px #12c49b;
  padding: 12px 10px 12px 12px;
  // letter-spacing: 1px;
  display: inline-block;
}
.card_title_icon {
  width: 4px;
  height: 8px;
  display: inline-block;
  margin-right: 2px;
  border-radius: 2px;
}
// .box,
// .box3 {
//   display: inline-block;
//   width: 0px;
//   height: 0px;
//   border-top: 20px solid rgba(0, 0, 0, 0);
//   border-right: 20px solid rgba(0, 0, 0, 0);
//   border-bottom: 20px solid green;
//   border-left: 20px solid rgba(0, 0, 0, 0);
//   margin-bottom: 10px;
// }
// .box2 {
//   display: inline-block;
//   width: 20px;
//   height: 20px;
//   background-color: green;
// }
// .box {
//   transform: translate(54px, 10px);
// }
// .box3 {
//   transform: translate(-54px, 10px);
// }

.title-box {
  position: absolute;
  right: -8px;
  top: -30px;
  padding: 0;
  text-decoration: none;
  display: inline-block;
  z-index: 0;
  width: 140px;
  height: 40px;
  line-height: 28px;
  text-align: right;
  padding-right: 10px;
  font-size: 16px;
}

.title-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #2486c9;
  border-bottom: none;
  -webkit-transform: perspective(1em) scale(1.1, 1.3) rotateX(5deg);
  z-index: -1;
  -webkit-transform-origin: bottom right;
}
</style>
