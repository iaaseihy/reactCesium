/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
/** 组件样式文件 */
import cesiumViewerStyle from './index.module.less';
/** 从react中获取React对象 和 Components组件 */
import React, { Component } from 'react';
/** 导入cesium模块 */
import * as Cesium from 'cesium/Cesium'

 
/** 使用react的Component组件对象自定义map3d组件 */
export default class cesiumViewer extends Component {
 
  /** 数据初始化 */
  constructor(props) {
    super(props)
    this.state = {}
  }
 
  /** dom完成第一次渲染执行函数 */
  componentDidMount() {
 
    // this.initMap()
    this.initViewer()
  }
 
  /** 初始化地图 */
  initMap() {
    // 将viewer对象放在window环境下
    window.viewer  = new Cesium.Viewer('cesiumContainer')
  
  }
  initViewer() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyOWI4NmU3MS0wNjMwLTRkYzgtODZmOC0wY2IxYzRiYjM3MjciLCJpZCI6MjA5NjIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Nzg2MjM2MDB9.1N0686jkepigCJiLU3bDFgg5Ti61J943lKpJoqDR2bA'
    const options = {
      selectionIndicator: false,
      animation: false, // 是否显示动画控件
      baseLayerPicker: false, // 是否显示图层选择控件
      geocoder: false, // 是否显示地名查找控件
      timeline: false, // 是否显示时间线控件
      navigationHelpButton: false, // 是否显示帮助信息控件
      homeButton: false,
      sceneModePicker: false,
      infoBox: false,
      navigation: false,
      creditContainer: null,
      fullscreenButton: false
    }
   
    // options.imageryProvider = new Cesium.SingleTileImageryProvider({
    //  url: baseLayerImg
    // })
    // options.imageryProvider = new Cesium.UrlTemplateImageryProvider({
    //   // url: 'http://172.17.20.27:6060/tms_b_map/{z}/{x}/{y}.jpg',
    //   url: 'http://192.168.1.48:6060/Data/BASE_DATA/IMAGE/{z}/{x}/{y}.png',
    //   fileExtension: 'jpg'
    // })
    options.imageryProvider = new Cesium.UrlTemplateImageryProvider({
      url: 'http://localhost:6060/Data/BASE_DATA/IMAGE/{z}/{x}/{y}.png',
      // eslint-disable-next-line no-undef
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      fileExtension: 'png',
      minimumLevel: 0,
      maxmumLevel: 19
    })
    // options.terrainProvider = new Cesium.CesiumTerrainProvider({
    //   url: 'http://localhost:6060/Data/BASE_DATA/TERRIAN',
    //   requestWaterMask: true,
    //   requestVertexNormals: true
    // })

    const viewer  = new Cesium.Viewer('cesiumContainer', options)
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    window.viewer = viewer    

    var ArcGisMap = new Cesium.UrlTemplateImageryProvider({
        //调用深蓝夜色影像服务 
        url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
    })
    // 用于联动的viewer
    var viewerEye = new Cesium.Viewer('cesiumContainerR', {

        imageryProvider: ArcGisMap,

        creditContainer: "creditContainerR",

        scene3DOnly: true,

        baseLayerPicker: false,

        infoBox: false,

        selectionIndicator: false,

        geocoder: false, // 是否显示地名查找控件

        navigationHelpButton: false, // 是否显示帮助信息控件

        homeButton: false,

        timeline: false,

        animation: false,

    });
    viewerEye._cesiumWidget._creditContainer.style.display = 'none'
    var control = viewerEye.scene.screenSpaceCameraController;

    control.enableRotate = false;

    control.enableTranslate = false;

    control.enableZoom = false;

    control.enableTilt = false;

    control.enableLook = false;

    var syncViewer = function () {

        viewerEye.camera.flyTo({

            destination: viewer.camera.position,

            orientation: {

                heading: viewer.camera.heading,

                pitch: viewer.camera.pitch,

                roll: viewer.camera.roll

            },

            duration: 0.0

        });

    }

    viewer.camera.changed.addEventListener(syncViewer);

    viewer.scene.preRender.addEventListener(syncViewer);

    return viewer
  }
  /** 逻辑渲染 */
  render() {
    
    // 构建虚拟dom
    return (
    //   <div className={ map3DStyle.viewer } >
    //     <div id="cesiumContainer" className={ map3DStyle.cesiumContainer } ></div>
    //   </div>
      <>
               {/* <div className={ map3DStyle.viewer } >
                 <div id="cesiumContainer" className={ map3DStyle.cesiumContainer } ></div>
               </div> */}
            <div id="cesiumContainer" className={cesiumViewerStyle.cesiumContainer}>        
            </div>
            <div id="cesiumContainerR" className={cesiumViewerStyle.cesiumContainerRight}>
                <div id="creditContainerR" ></div>
            </div>
            </>
    )
  }
}