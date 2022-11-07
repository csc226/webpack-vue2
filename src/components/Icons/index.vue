<!--
 * @Author: lzl
 * @Date: 2021-06-03 10:51:02
 * @LastEditTime: 2021-06-03 17:13:26
 * @FilePath: \hgsims_vue\src\components\Icons\index.vue
 * @Description: 
-->
<script>
export default {
  name: 'Icons',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon } = context.props;
    const vnodes = [];
    if (icon) {
      if (-1 !== icon.indexOf('svg-icon')) {
        const icons = icon.split(' ');
        const svg = icons.filter((row) => -1 !== row.indexOf('svg-icon'))[0];
        const className = icons.filter((row) => row.indexOf('svg-icon') === -1).join(' ');
        vnodes.push(<svg-icon icon-class={svg} class-name={className} />);
      } else {
        vnodes.push(<i class={icon} />);
      }
    }
    return vnodes;
  }
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.is-stroke {
  stroke: currentColor;
}
</style>
