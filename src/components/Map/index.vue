<template>
  <div class="map">
    <div style="pointer-events: none;width: 100%;height: 100%;position: absolute;background: linear-gradient(90deg, rgba(1, 10, 23, 0.36) 0%, rgba(1, 10, 23, 0) 23%, rgba(1, 10, 23, 0) 77%, rgba(1, 10, 23, 0.36) 100%);z-index: 2;"></div>
    <!-- 地图部分 -->
    <div class="map" id="cesiumContainer"></div>
    <div class="toolDiv">
      <img :src="tool" width="100%" height="100%" alt="" />
      <div class="toolBtn" @click="toolClcik" title="工具"></div>
    </div>
    <div class="infoWindow" v-show="showInfoWindow">
      <div class="title">
        <span>属性信息</span>
        <img
          :src="close"
          @click="closeWindow"
          class="closeBtn"
          title="关闭"
          alt=""
        />
      </div>
      <hr style="border: none; border-top: 1px solid #ffffffcc; margin: 0" />
      <div class="titleTab">
        <span style="margin-left: 20px; color: #12c49b">房屋楼栋信息</span>
      </div>
      <hr style="border: none; border-top: 1px solid #ffffffcc; margin: 0" />
      <hr
        style="
          margin: 0;
          border: none;
          border-top: 3px solid #12c49b;
          width: 84px;
          left: 20px;
          top: 90px;
          position: absolute;
        "
      />
      <!-- <div class="tabBtn">
        <input type="button" value="基本信息" style="background: #12c49b" />
        <input type="button" value="建设情况" />
        <input type="button" value="管理情况" />
        <input type="button" value="排查情况" />
        <input type="button" value="整治情况" />
      </div>
      <hr
        style="
          border: none;
          border-top: 1px solid #ffffffcc;
          margin: 0;
          width: 406px;
          margin-left: 20px;
        "
      /> -->
      <div class="concent">
        <div id="pickResult" style="margin-top: 16px;line-height: 28px;text-align: left;"></div>
      </div>
      <!-- <input class="submitBtn" type="button" value="查看详情" /> -->
    </div>
    <div class="zhibeizhen" :style="{right:typeMap === 1 ? '288px' : '398px'}"></div>
    <div class="bottom">
      <div class="wapper">
        经度：<span>{{ lng }}</span> 纬度：<span>{{ lat }}</span> 海拔：<span>{{
          elevation
        }}</span>
        方向：<span>{{ heading }}</span> 俯仰角：<span>{{ pitch }}</span>
        视高：<span>{{ viewHeight }}</span>
      </div>
    </div>
    <div class="searchDiv">
      <img :src="search" @click="searchWindow" class="searchBtn" alt="" />
      <span>综合查询</span>
    </div>
      <!-- <el-cascader popper-class="dark-select-popper" class="areaSelect" v-model="JNArea" :props="{ emitPath: false }" :options="selectOptions" placeholder="请选择或输入行政区名称" :show-all-levels="false"></el-cascader> -->
      
    <div class="areaSelect">
        <el-cascader
            v-model="JNArea"
            popper-class="dark-select"
            placeholder="请选择或输入行政区名称"
            :options="options"
        ></el-cascader>
      <!-- <el-select
        popper-class="dark-select-popper"
        v-model="JNArea"
        placeholder="请选择或输入行政区名称"
      ><el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
    </div>
  </div>
</template>

<script>
import "../../../public/js/Cesium/Widgets/widgets.css";
import axios from 'axios'
let viewer =null;
let colorArr  = ['#0fb0ff', '#124e9b', '#40C4E4', '#42B2BE', '#8CB7E5', '#00f4bc', '#139FF0', '#33b0cc'];
let cityEntities=[],wmtsLayer=null,modeLayer=null,modeLayerContent=null;
let isInit=false;
let hightLighted = {
  feautre: undefined,
  originalColor:null
};
export default {
  data() {
    return {
      tiandituTk: "9a7edb3600f54cd5f022f5ff7a9f44b6",
      showPrimitives: 1,
      viewHeight: "",
      lng: "",
      lat: "",
      elevation: "",
      pitch: "",
      heading: "",
      XZToolState: 0,
      toolXZ: require("../../../public/img/map/toolXZ.png"),
      toolWXZ: require("../../../public/img/map/tool.png"),
      tool: null,
      close: require("../../../public/img/map/close.png"),
      search: require("../../../public/img/map/find.png"),
      showInfoWindow: false,
      JNArea:'',
    //   selectOptions:[{
    //           value: '370100',
    //           label: '全市',
    //         },{
    //           value: '370102',
    //           label: '历下区'
    //         }, {
    //           value: '370103',
    //           label: '市中区'
    //         }, {
    //           value: '370104',
    //           label: '槐荫区'
    //         }, {
    //           value: '370105',
    //           label: '天桥区'
    //         }, {
    //           value: '370112',
    //           label: '历城区'
    //         }, {
    //           value: '370113',
    //           label: '长清区'
    //         }, {
    //           value: '370114',
    //           label: '章丘区'
    //         }, {
    //           value: '370115',
    //           label: '济阳区'
    //         }, {
    //           value: '370116',
    //           label: '莱芜区'
    //         }, {
    //           value: '370117',
    //           label: '钢城区'
    //         }, {
    //           value: '370124',
    //           label: '平阴县'
    //         }, {
    //           value: '370126',
    //           label: '商河县'
    //         }, {
    //           value: '370171',
    //           label: '济南高新技术产业开发区'
    //         }, {
    //           value: '370172',
    //           label: '济南新旧动能转换先行区'
    //         }],
    options: [
        {
        value: "1",
        label: "济南市",
        children: [
            {
              value: '370102',
              label: '历下区'
            }, {
              value: '370103',
              label: '市中区'
            }, {
              value: '370104',
              label: '槐荫区'
            }, {
              value: '370105',
              label: '天桥区'
            }, {
              value: '370112',
              label: '历城区'
            }, {
              value: '370113',
              label: '长清区'
            }, {
              value: '370114',
              label: '章丘区'
            }, {
              value: '370115',
              label: '济阳区'
            }, {
              value: '370116',
              label: '莱芜区'
            }, {
              value: '370117',
              label: '钢城区'
            }, {
              value: '370124',
              label: '平阴县'
            }, {
              value: '370126',
              label: '商河县'
            }, {
              value: '370171',
              label: '济南高新技术产业开发区'
            }, {
              value: '370172',
              label: '济南新旧动能转换先行区'
            }
        ],
        },
        {
        value: "2",
        label: "青岛市",
        },
        {
        value: "3",
        label: "淄博市",
        },
        {
        value: "4",
        label: "枣庄市",
        },
        {
        value: "5",
        label: "东营市",
        },
        {
        value: "6",
        label: "烟台市",
        },
        {
        value: "7",
        label: "潍坊市",
        },
        {
        value: "8",
        label: "济宁市",
        },
        {
        value: "9",
        label: "泰安市",
        },
        {
        value: "10",
        label: "威海市",
        },
        {
        value: "11",
        label: "日照市",
        },
        {
        value: "12",
        label: "临沂市",
        },
        {
        value: "13",
        label: "德州市",
        },
        {
        value: "14",
        label: "聊城市",
        },
        {
        value: "15",
        label: "滨州市",
        },
        {
        value: "16",
        label: "菏泽市",
        },
    ],
        
    };
  },
  props:{
    areaCode: {
      type: String,
      default: "370100"
    },
    highLightType:{
      type:Number,
      default:null
    },
    typeMap:{
        type:Number,
    }
  },

  
  watch: {
    JNArea(newValue,oldValue){
        // console.log('click:'+newValue);
        this.$parent.$data.areaCode=newValue;
        setTimeout(() => {
          this.clangeSelect(newValue);
          this.closeWindow();
        }, 10);
	},
    areaCode(newValue,oldValue){
      this.JNArea=this.areaCode;
      this.closeWindow();
	},
    highLightType(newValue,oldValue){
      this.highLightModel();
      this.closeWindow();
		},
    

  },
  mounted() {
    this.initMap();
    this.JNArea=this.areaCode;
  },
  methods: {
    initMap() {
      let that = this;
      that.tool = that.toolWXZ;
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Y2E5N2NmOS00YTNkLTQ4ZWUtOWI0NC1jNWRjNjZlMTM0NjQiLCJpZCI6MzYxODcsImlhdCI6MTYzNDU1Njc0NH0.CK6UsbUy7Z-CqKHJrRZSijYk6tOjPeYwazdEWN4Yr8Y";
        window.safeViewer= viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false,
        selectionIndicator: false,
        infoBox: false,
        animation: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        navigationHelpButton: false,
        homeButton: false,
        geocoder: false,
        navigationInstructionsInitiallyVisible: false,
        skyBox: false,
        skyAtmosphere: false,
        selectedImageryProviderViewModel: undefined,
        selectedTerrainProviderViewModel: undefined,
        shadows: false,
        shouldAnimate: true,
        imageryProvider: new Cesium.TileMapServiceImageryProvider({
                url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
            })
      });
      // viewer.scene.globe.enableLighting = false;
      // viewer.shadows = false
      // viewer.shadowMap.softShadows  = false
      // viewer.scene.globe.enableLighting = false;
      // viewer.shadows = false;
       //行政区划
      let region = new Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://192.168.1.121:8080/geoserver/gwc/service/wmts/rest/fwaq%3A%E6%B5%8E%E5%8D%97%E5%8E%BF%E7%95%8C/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
        style: "",
        format: "image/png",
        tileMatrixSetID: "EPSG:4326",
        tilingScheme: new Cesium.GeographicTilingScheme()
      });
      viewer.imageryLayers.addImageryProvider(region,2);
      // wmts
              wmtsLayer=viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
              //外网访问
              url: "http://192.168.1.121:8080/geoserver/gwc/service/wmts/rest/fwaq%3Atif2/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
              style: "raster",
              format: "image/png",
              tileMatrixSetID: "EPSG:4326",
              tilingScheme: new Cesium.GeographicTilingScheme(),
              // maximumLevel:18
            }),1);
      
      if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        // 判断是否支持图像渲染像素化处理
        viewer.resolutionScale = window.devicePixelRatio
      }
      // 开启抗锯齿 fxaa
      viewer.scene.fxaa = true
      viewer.scene.postProcessStages.fxaa.enabled = true
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
    },
    mouseMoveWatch() {
      let self = this;
      let handler3D = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler3D.setInputAction(function (movement) {
        let pick = new Cesium.Cartesian2(
          movement.endPosition.x,
          movement.endPosition.y
        );
        if (pick) {
          let cartesian = viewer.scene.globe.pick(
            viewer.camera.getPickRay(pick),
            viewer.scene
          );
          if (cartesian) {
            //世界坐标转地理坐标（弧度）
            let cartographic =
              viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
            if (cartographic) {
              //海拔
              let height = viewer.scene.globe.getHeight(cartographic);
              //视角海拔高度
              let he = Math.sqrt(
                viewer.scene.camera.positionWC.x *
                  viewer.scene.camera.positionWC.x +
                  viewer.scene.camera.positionWC.y *
                    viewer.scene.camera.positionWC.y +
                  viewer.scene.camera.positionWC.z *
                    viewer.scene.camera.positionWC.z
              );
              let he2 = Math.sqrt(
                cartesian.x * cartesian.x +
                  cartesian.y * cartesian.y +
                  cartesian.z * cartesian.z
              );
              //地理坐标（弧度）转经纬度坐标
              let point = [
                (cartographic.longitude / Math.PI) * 180,
                (cartographic.latitude / Math.PI) * 180,
              ];
              if (!height) {
                height = 0;
              }
              if (!he) {
                he = 0;
              }
              if (!he2) {
                he2 = 0;
              }
              if (!point) {
                point = [0, 0];
              }

              self.viewHeight = (he - he2).toFixed(1) + "米"; //视高
              self.lng = point[0].toFixed(6); //经度
              self.lat = point[1].toFixed(6); //纬度
              self.elevation = height.toFixed(2) + "米"; //海拔
              self.pitch = Number(viewer.scene.camera.pitch).toFixed(2) + "度"; //俯仰角
              self.heading = Number(viewer.scene.camera.heading).toFixed(2); //方向
              if (self.heading == "0") {
                self.heading = "正北方向";
              }
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    toolClcik() {
      let that = this;
      if (that.XZToolState == 0) {
        that.tool = that.toolXZ;
        that.XZToolState = 1;
      } else if (that.XZToolState == 1) {
        that.tool = that.toolWXZ;
        that.XZToolState = 0;
      }
    },
    mouseLeftWatch() {
      let that = this;
      viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(event) {

        // 选择新要素
        const pickedFeature = viewer.scene.pick(event.position);
        that.pickAndSelect(pickedFeature,1)
        
      },
      Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    //pick及选中要素
    pickAndSelect(pickedFeature,isclick=0){
      let that=this;
      // 清除之前的高亮元素
      if (Cesium.defined(hightLighted.feature)) {
              hightLighted.feature.color = hightLighted.originalColor;
              hightLighted.feature = undefined;
        }
        if (!Cesium.defined(pickedFeature)) {
          return;
        }
        let concentDiv= document.getElementById("pickResult");
        let queryResult={};
        let zh={'Floor':"楼层数",
                'OBJECTID':"对象ID",
                'bh':"编号",
                'cs':"场所",
                'fwbh':"房屋编号",
                'fwmj':"房屋面积",
                'fwyt':"房屋用途",
                'gkjcs':"改扩建次数",
                'grade':"级别",
                'height':"高度",
                'id':"ID",
                'name':"名称",
                'pcqk':"排查情况",
                'pcsj':"排查时间",
                'status':"排查状态",
                'sub_fwyt':"是否自住",
                'yhfwbh':"隐患房屋编号"
                }
        let properties= pickedFeature.getPropertyNames();
        properties.forEach((i,n)=>{
            let  propertyValue=pickedFeature.getProperty(i);
            // console.log(i,propertyValue);
            queryResult[zh[i]]=propertyValue;
        })
        
        concentDiv.innerHTML=`
        <div><span style="opacity: 0.6; left: 30px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          隐患房屋编号</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["隐患房屋编号"]}</span></div>
        <div><span style="opacity: 0.6; left: 58px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          房屋编号</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["房屋编号"]?queryResult["房屋编号"]:"暂无"}</span></div>
        <div><span style="opacity: 0.6; left: 85px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          高度</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["高度"]}米</span></div>
        <div><span style="opacity: 0.6; left: 72px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          楼层数</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["楼层数"]}层</span></div>
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          房屋用途</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["房屋用途"]?"经营性及自住自建房":queryResult["房屋用途"]==2?"其他自建房":"经营性自建房"}</span></div>
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          房屋面积</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["房屋面积"]?queryResult["房屋面积"]:"暂无"}</span></div>
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          排查时间</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            ${queryResult["排查时间"]?queryResult["排查时间"]:"暂无"}</span></div>
          `

        if(isclick){
          switch (that.highLightType) {
            case 0:
            concentDiv.innerHTML+=`
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          房屋状态</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            定期巡查房屋</span></div>`
              break;
            case 1:
            concentDiv.innerHTML+=`
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          安全级别</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            C级</span></div>`
              
              break;
            case 2:
            concentDiv.innerHTML+=`
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          整治状态</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            已整治</span></div>`
              
              break;
            case 3:
            concentDiv.innerHTML+=`
        <div><span style="opacity: 0.6; left: 59px; position: absolute;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;text-align: left;color: #fff;">
          整治状态</span><span style="margin-left: 170px;font-family:'Microsoft YaHei';font-weight: 400;font-size: 14px;line-height: 23px;text-align: left;color: #fff;">
            已整治</span></div>`
              
              break;
            default:
              break;
          }
        }else{
          
          that.flyToFeature(queryResult["编号"]);
        }

        // // 存储选中要素的信息
        hightLighted.feature = pickedFeature;
        hightLighted.originalColor=new Cesium.Color();
        Cesium.Color.clone(pickedFeature.color, hightLighted.originalColor);
        // 高亮选中元素
        pickedFeature.color =new Cesium.Color.fromCssColorString("#33EDEE");
        that.showInfoWindow = true;
    },
    selectAndFly(fwbh){
      let concent=window.modeLayerContent.content;
      var featureResult=null;
      // let contenTimeer= setInterval(() => {
          // clearInterval(contenTimeer);
      let featuresLength = concent.featuresLength;
      for(let i=0;i<featuresLength;i++){
        let feature = concent.getFeature(i);
        let  propertyValue=feature.getProperty('yhfwbh');
        if(propertyValue==fwbh){
          featureResult=feature;
          break;
        }
      }
      this.pickAndSelect(featureResult);
      // }, 10);

    },
    flyToFeature(fwbh){
      let layerItem = {
            wfsName: 'fwaq:建筑基地面',
            filter: 'bh=\''+fwbh+'\''
        };
      let that=this;
      
      let wfsName = layerItem.wfsName;
      let filter = layerItem.filter;
      let geoserverUrl = 'http://192.168.1.121:8080/geoserver';
      let url = `${geoserverUrl}/wfs?service=wfs&version=1.0.0&request=getfeature&outputformat=json&typename=${wfsName}&cql_filter=${filter}&srsname=EPSG:4326`;
      url = encodeURI(url);
      axios.get(url).then( (res)=>{
        // console.log(res);
        viewer.camera.flyTo({
                  destination: new Cesium.Cartesian3.fromDegrees(
                          res.data.features[0].geometry.coordinates[0][0][0][0],
                          res.data.features[0].geometry.coordinates[0][0][0][1],
                          300.0),
                })
      });
    },
    closeWindow() {
      let that = this;
      that.showInfoWindow = false;
    },
    searchWindow() {},
    // 加载geojson数据
    loadgeojson(url) {
        Cesium.GeoJsonDataSource.load(url).then(dataSource => {
            const entities = dataSource.entities.values;
            for (let i = 0; i < entities.length; i++) {
              try {
                this.cityPolygonLabel(entities[i]);
              } catch (error) {
                console.log(error);
              }
            }
        })
    },
    // 生成行政区划面+ 标签
    cityPolygonLabel(entity) {
        const name = entity.name;
        let positions = entity._polygon._hierarchy._value.positions;
        let color = colorArr[Math.floor(Math.random() * colorArr.length + 1) - 1];
        let Line = viewer.entities.add({
            // position: Cesium.Cartesian3.fromDegrees(jwd[0], jwd[1]),
            id:entity.properties.id._value,
            name: name,
            polyline: {
                positions: positions,
                width: 2,
                material: new Cesium.Color.fromCssColorString(color),
                clampToGround: true,
            },
            description: 'quhua'
        });
        // cityEntities.push(Line);
        viewer.flyTo(cityEntities);
        // 
    },
    // 改变选中
    clangeSelect(xzdm) {
        console.log("xzdm",xzdm);
      let that =this;
      // let line=cityEntities.find((item)=>item.id==xzdm)
      // viewer.imageryLayers.remove (wmtsLayer);
      if(!!modeLayer){
        viewer.scene.primitives.remove(modeLayer);
        modeLayer=null;
      }
      try {
      if(xzdm=="370100"){
          // viewer.flyTo(line);
        viewer.camera.setView({
          destination: new Cesium.Cartesian3.fromDegrees(
            117.2256,36.75,370000
          ),
        });
          if(isInit){
            isInit=false;
          }

      }else{
        viewer.camera.flyTo({
          destination:
           new Cesium.Cartesian3.fromDegrees(
            117.023263,
            36.664218,
            760.0
          ),
          orientation : {
              heading :Cesium.Math.toRadians(20,0),
              pitch : Cesium.Math.toRadians(-40),
              roll : 0.000005784169954559104
          },
          duration: 2,
          complete:  () =>{
              wmtsLayer=viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://192.168.1.121:8080/geoserver/gwc/service/wmts/rest/fwaq:jnyx2%20(1)/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
                style: "",
                format: "image/png",
                tileMatrixSetID: "EPSG:4326",
                tilingScheme: new Cesium.GeographicTilingScheme(),
              }),3);
              
              // wmtsLayer = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
              //   url: "http://192.168.1.121:8080/geoserver/fwaq/wms",
              //   layers: "fwaq:jns16-2",
              //   parameters: {
              //     transparent: true, //是否透明
              //     format: "image/png",
              //     srs: "EPSG:4326",
              //     styles: "",
              //   },
              // }));
              modeLayer=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                // url: "http://192.168.1.121:8090/3dtiles/tileset.json",
                url:"http://192.168.1.121:8090/3dtiles3/tileset.json",
                loadSiblings: true,
                dynamicScreenSpaceError: true
              }));
              modeLayer.tileLoad.addEventListener((tile)=> {
                window.modeLayerContent=tile;
                that.highLightModel()
                // console.log('2222');
              });
              if(!isInit){
                that.mouseMoveWatch();
                that.mouseLeftWatch()
                isInit=1;
              }
            }
          })
      }
      } catch (error) {
        console.error(error);
        
      }
    },
    //高亮模型
    highLightModel(){
      let self=this;
      switch (self.highLightType) {
        case 0://巡查
            let modelTimer=setInterval(() => {
              if(!!modeLayer&&self.areaCode!=="370100"){
                clearInterval(modelTimer);
                modeLayer.style = new Cesium.Cesium3DTileStyle({
                  defines : {
                      "hasChecked" : "${height}%3",
                      "NoChecked" : "${height}%3",
                  },
                  color: {
                    conditions: [
                      ["${hasChecked}>2", "color('#1E8D6E',0.8)"],
                      ["(${height}===28)||(${height}===35)", "color('#BDAD6E',0.8)"],
                      ['true', 'rgb(255, 255, 255)']
                    ]
                  }
                })
              }
            }, 10);
          
          break;
        case 1://结构安全
            let modelTimer1=setInterval(() => {
              if(!!modeLayer&&self.areaCode!=="370100"){
                clearInterval(modelTimer1);
                modeLayer.style = new Cesium.Cesium3DTileStyle({
                  defines : {
                      "classA" : "${height}%5",
                      // "classB" : "${height}%5",
                      // "classC" : "${height}%5",
                      // "classD" : "${height}%5",
                  },
                  color: {
                    conditions: [
                      ["(${classA}>0.5)&&(${classA}<=1)", "color('#23BBBC',0.8)"],
                      ["(${classA}>1)&&(${classA}<=3.6)","color('#215FB9',0.8)" ],
                      ["(${classA}>3.6)&&(${classA}<5)", "color('##BF7E4B',0.8)"],
                      ["${classA}<=0.5","color('#BF5D5F',0.8)" ],
                      ['true', 'rgb(255, 255, 255)']
                    ]
                  }
                })
              }
            }, 10);
          
          break;
        case 2://经营安全
            let modelTimer2=setInterval(() => {
              if(!!modeLayer&&self.areaCode!=="370100"){
                clearInterval(modelTimer2);
                modeLayer.style = new Cesium.Cesium3DTileStyle({
                  defines : {
                      // "hasChecked" : "${height}%3",
                      "Checked" : "${Floor}%5",
                  },
                  color: {
                    conditions: [
                      ["${Checked}===1", "color('#198F6C',0.8)"],
                      ["${Checked}===4", "color('#C07D4B',0.8)"],
                      ["${Checked}===3", "color('#7D76CE',0.8)"],
                      ['true', 'rgb(255, 255, 255)']
                    ]
                  }
                })
              }
            }, 10);
          
          break;
        case 3:
            let modelTimer3=setInterval(() => {
              if(!!modeLayer&&self.areaCode!=="370100"){
                clearInterval(modelTimer3);
                modeLayer.style = new Cesium.Cesium3DTileStyle({
                  defines : {
                      "Checked" : "${Floor}%5",
                  },
                  color: {
                    conditions: [
                      ["${Checked}===1", "color('#198F6C',0.8)"],
                      ["${Checked}===4", "color('#C07D4B',0.8)"],
                      ["${Checked}===2", "color('#7D76CE',0.8)"],
                      ['true', 'rgb(255, 255, 255)']
                    ]
                  }
                })
              }
            }, 10);
          
          break;
      
      
        default:
          break;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 1920px;
  height: 893px;
  position: relative;
}
// -----start地图部分
.map {
  width: 100%;
  height: 100%;
}
.bottom {
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  background-color: rgba(2, 22, 32, 0.8);
}
.wapper {
  float: right;
  font-family: "Source Han Sans CN";
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  color: #fff;
  margin-top: 7px;
  span {
    margin-right: 20px;
  }
}
.toolDiv {
  width: 467px;
  height: 46px;
  background: #021620;
  opacity: 0.8;
  position: absolute;
  left: 727px;
  bottom: 42px;
  z-index: 100;
  cursor: pointer;
  .toolBtn {
    position: absolute;
    right: 99px;
    top: 5px;
    width: 50px;
    height: 33px;
    z-index: 100;
  }
}
.zhibeizhen {
  z-index: 100;
  position: absolute;
//   right: 398px;
  bottom: 30px;
  width: 87px;
  height: 175px;
  background-image: url("../../../public/img/map/zhibeizhen.png");
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 2;
}
.infoWindow {
  z-index: 100;
  position: absolute;
  width: 335px;
  height: 346px;
  border-radius: 10px;
  background: #010a17cc;
  bottom: 247px;
  right: 412px; 
  top: 165px;
  .title {
    width: 100%;
    height: 40px;
    span {
      font-family: "Microsoft YaHei Bold";
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      text-align: left;
      color: #fff;
      left: 20px;
      position: absolute;
      top: 10px;
    }
  }
  .titleTab {
    height: 50px;
    span {
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      color: #fff;
      opacity: 0.7;
      float: left;
      margin-left: 30px;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  .tabBtn {
    height: 60px;
    input {
      cursor: pointer;
      width: 72px;
      height: 28px;
      border-radius: 14px;
      background: transparent;
      border: 1px solid #12c49b;
      font-family: "Microsoft YaHei UI";
      font-weight: 400;
      font-size: 12px;
      text-align: center;
      color: #fff;
      margin-left: 11px;
      margin-top: 16px;
    }
  }
  .concent {
    div {
      margin-top: 16.5px;
    }
  }
  
  .submitBtn {
    width: 88px;
    height: 32px;
    border-radius: 4px;
    background: #12c49b;
    position: absolute;
    left: 336px;
    bottom: 14px;
    cursor: pointer;
  }
  .closeBtn {
    width: 12px;
    height: 12px;
    position: absolute;
    right: 20px;
    top: 12px;
    cursor: pointer;
  }
}
.searchDiv {
  width: 114px;
  height: 32px;
  border-radius: 4px;
  background: #021620cc;
  z-index: 100;
  position: absolute;
  top: 12px;
  right: 412px;
  cursor: pointer;
  span {
    font-family: "Microsoft YaHei";
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: left;
    color: #fff;
    position: absolute;
    left: 42px;
    top: 7px;
  }
  .searchBtn {
    width: 20px;
    height: 20px;
    background: transparent;
    position: absolute;
    left: 16px;
    top: 7px;
  }
}
.areaSelect {
  width: 204px;
  height: 32px;
  border-radius: 4px;
  // background: #021620cc;
  z-index: 10000;
  position: absolute;
  top: 12px;
  left: 390px;
}
/deep/.el-input__inner {
    background-color: #021620cc;
    border: 1px solid rgba(18, 196, 155, 0.4);
    color: #12c49b;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    height: 32px;
}
// -----end地图部分
.areaSelect /deep/.el-cascader__dropdown{
  background-color: #021620cc;
  color: #fff;

}
</style>
<style lang='less'>
.dark-select .el-cascader-menu {
  font-family: "Microsoft YaHei";
  font-weight: 400!important;
  font-size: 13px!important;
  text-align: left!important;
  color: #fff!important;
}
.dark-select .el-cascader-node.in-active-path,
.dark-select  .el-cascader-node.is-active,
.dark-select  .el-cascader-node.is-selectable.in-checked-path {
  color: #1e845aCC!important;
  background: #021620cc!important;
}
.dark-select  .el-cascader-node:hover {
  color: #1e845aCC!important;
  background: #021620cc!important;
}
.dark-select .el-cascader-node:not(.is-disabled):focus,
.dark-select .el-cascader-node:not(.is-disabled):hover {
  background: #021620cc!important;
}
.dark-select {
  background: rgba(6, 36, 60, 0.9)!important;
  box-shadow: 0px 2px 12px 1px rgba(10, 29, 48, 0.1)!important;
  border-radius: 2px 2px 2px 2px!important;
  opacity: 1!important;
  border: 1px solid rgba(18, 196, 155, 0.4)!important;
  .el-scrollbar__wrap {
    overflow-x: hidden!important;
  }
  .el-select-dropdown__item {
    background: transparent;
    color: #12c49b!important;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(18, 196, 155, 0.1)!important;
  }
  .el-select-dropdown__item.selected {
    background: rgba(18, 196, 155, 0.2)!important;
    color: #fff!important;
  }
  .popper__arrow {
    display: none!important;
  }
}
</style>
