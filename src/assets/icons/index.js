/*
 * @Author: lzl
 * @Date: 2021-06-03 09:27:52
 * @LastEditTime: 2021-06-03 11:43:57
 * @FilePath: \hgsims_vue\src\assets\icons\index.js
 * @Description:全局 Svg Icon 图标组件。
 * 默认在 @/assets/icons 中注册到全局中，可以在项目中任意地方使用。
 * 所以图标均可在 @/assets/icons/svg。可自行添加或者删除图标，所以图标都会被自动导入，无需手动操作
 */
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'; // svg component
import Icons from '@/components/Icons'; // svg component

// register globally
Vue.component('SvgIcon', SvgIcon);
Vue.component('Icons', Icons); 
// 由于菜单栏图标仅需白色，所以未进行stroke变色适配。

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req); 