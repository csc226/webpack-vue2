import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import buildingInfo from '@/components/buildingInfo/buildingInfo'
import buildingsafe from '@/components/buildingSafe/index' //建筑安全巡查 鉴定
Vue.use(Router)
export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            name: '首页',
            component: index,
            meta: {
                menu: false
            }
        },
       
    ]
})