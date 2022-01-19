/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
/** 组件样式文件 */
import splitDirection from './index.module.less';
/** 从react中获取React对象 和 Components组件 */
import React, { Component } from 'react';
/** 导入cesium模块 */
import * as Cesium from 'cesium/Cesium'
import axios from 'axios'
import '../../data/config'
/** 使用react的Component组件对象自定义splitViewer组件 */
export default class splitViewer extends Component {
 
  /** 数据初始化 */
  constructor(props) {
    super(props)
    this.state = {}
     // 手动绑定 this,直接传递 function 作为 event handler 需要指定函数的执行环境，即需要手动绑定 this ，不然会报 this 为 undefined 的错
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.sliderMove = this.sliderMove.bind(this);
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
  mouseUp() {
    window.removeEventListener('mousemove', this.sliderMove, true);
  }
  mouseDown(e) {
    var slider = document.getElementById('slider');
    global.constants.dragStartX = e.clientX - slider.offsetLeft;
    window.addEventListener('mousemove', this.sliderMove, true);
    console.log(window.viewer.scene.mode)
  }
  sliderMove(e) {
    var slider = document.getElementById('slider');
    var splitPosition = (e.clientX - global.constants.dragStartX) / slider.parentElement.offsetWidth;
    slider.style.left = 100.0 * splitPosition + '%';
    window.viewer.scene.imagerySplitPosition = splitPosition;
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

    var layers = viewer.imageryLayers;
    var googleLayer = layers.addImageryProvider(ArcGisMap);
    googleLayer.splitDirection = Cesium.ImagerySplitDirection.LEFT;//设置图层在左侧

    var slider = document.getElementById('slider');
    viewer.scene.imagerySplitPosition = (slider.offsetLeft) / slider.parentElement.offsetWidth;
    global.constants.dragStartX = 0;
    document.getElementById('slider').addEventListener('mousedown', this.mouseDown, false);
    window.addEventListener('mouseup', this.mouseUp, false);
    // 获取当前缩放的地图层级
    let level = 0;
    if (viewer.scene.globe._surface._tilesToRender.length) {
        level = viewer.scene.globe._surface._tilesToRender[0].level
        console.log(level,"=======当前地图层级");
    } 
    return viewer
  }
  /** 逻辑渲染 */
  render() {   
    // 构建虚拟dom
    return (
      <><div id="cesiumContainer" className={splitDirection.cesiumContainer}>    
            <div id="slider" className={splitDirection.slider}></div>
        <div id="creditContainer"></div>      
            </div>
            </>
    )
  }
}