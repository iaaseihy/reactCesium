/* eslint-disable no-dupe-class-members */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
/** 组件样式文件 */
import cesiumWeather from './index.module.less';
/** 从react中获取React对象 和 Components组件 */
import React, {
    Component
} from 'react';
/** 导入cesium模块 */
import * as Cesium from 'cesium/Cesium'
import axios from 'axios'
import '../../data/config'
import gcoord from './gcoord'
/** 使用react的Component组件对象自定义splitViewer组件 */
export default class weather extends Component {

    /** 数据初始化 */
    constructor(props) {
        super(props)
        this.state = {}
        // 手动绑定 this,直接传递 function 作为 event handler 需要指定函数的执行环境，即需要手动绑定 this ，不然会报 this 为 undefined 的错
        // this.mouseUp = this.mouseUp.bind(this);
        // this.mouseDown = this.mouseDown.bind(this);
        // this.sliderMove = this.sliderMove.bind(this);
    }

    /** dom完成第一次渲染执行函数 */
    componentDidMount() {

        // this.initMap()
        this.initViewer()
    }

    /** 初始化地图 */
    initMap() {
        // 将viewer对象放在window环境下
        window.viewer = new Cesium.Viewer('cesiumContainer')

    }
    /***
     * 粒子效果：雨、雪、雾
     */
    addPostProcessStage(viewer, name, type) {
        let stage = this.getStage(viewer, name),
            fs = null;
        if (!stage) {
            switch (type) {
                case "snow":
                    fs = this.fs_snow();
                    break;
                case "rain":
                    fs = this.fs_rain();
                    break;
                case "fog":
                    fs = this.fs_fog();
                    break;
            }
        }
        stage = new Cesium.PostProcessStage({
            name: name,
            fragmentShader: fs
        });
        viewer.scene.postProcessStages.add(stage);
    }
    removePostProcessStage(viewer, name) {
        let stage = this.getStage(viewer, name);
        if (stage) {
            viewer.scene.postProcessStages.remove(stage);
        }
    }
    getStage(viewer, name) {
        let stage = null,
            stages = viewer.scene.postProcessStages;
        for (let i = 0; i < stages._stages.length; i++) {
            let tmp = stages.get(i);
            if (tmp.name === name) {
                stage = tmp;
                break;
            }
        }
        return stage;
    }
    fs_snow() {
        return 'uniform sampler2D colorTexture;\n' +
            'varying vec2 v_textureCoordinates;\n' +
            'float snow(vec2 uv,float scale)\n' +
            '{\n' +
            '    float time = czm_frameNumber / 60.0;\n' +
            '    float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n' +
            '    uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n' +
            '    uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n' +
            '    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n' +
            '    k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n' +
            '    return k*w;\n' +
            '}\n' +
            'void main(void){\n' +
            '     vec2 resolution = czm_viewport.zw;\n' +
            '     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n' +
            '     vec3 finalColor=vec3(0);\n' +
            '     float c = 0.0;\n' +
            '     c+=snow(uv,30.)*.0;\n' +
            '     c+=snow(uv,20.)*.0;\n' +
            '     c+=snow(uv,15.)*.0;\n' +
            '     c+=snow(uv,10.);\n' +
            '     c+=snow(uv,8.);\n' +
            '     c+=snow(uv,6.);\n' +
            '     c+=snow(uv,5.);\n' +
            '     finalColor=(vec3(c));\n' +
            '     gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5);\n' +
            '}';
    }
    fs_rain() {
        return 'uniform sampler2D colorTexture;\n' +
            'varying vec2 v_textureCoordinates;\n' +
            '	float hash(float x){\n' +
            '	     return fract(sin(x*133.3)*13.13);\n' +
            '	 }\n' +
            '	void main(void){\n' +
            '	     float time = czm_frameNumber / 60.0;\n' +
            '	     vec2 resolution = czm_viewport.zw; \n' +
            '	     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n' +
            '	     vec3 c=vec3(.6,.7,.8); \n' +
            '	     float a=-.4;\n' +
            '	     float si=sin(a),co=cos(a);\n' +
            '	     uv*=mat2(co,-si,si,co);\n' +
            '	     uv*=length(uv+vec2(0,4.9))*.3+1.;\n' +
            '	     float v=1.-sin(hash(floor(uv.x*100.))*2.);\n' +
            '	     float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n' +
            '	     c*=v*b; \n' +
            '	     gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5); \n' +
            '	}';
    }
    fs_fogPre() {
        return 'uniform sampler2D colorTexture;\n' +
            '  uniform sampler2D depthTexture;\n' +
            '  varying vec2 v_textureCoordinates;\n' +
            '  void main(void)\n' +
            '  {\n' +
            '      vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);\n' +
            '      vec4 fogcolor=vec4(0.8,0.8,0.8,0.5);\n' +
            '      float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n' +
            '      vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);\n' +
            '      float f=(depthcolor.r-0.22)/0.2;\n' +
            '      if(f<0.0) f=0.0;\n' +
            '      else if(f>1.0) f=1.0;\n' +
            '      gl_FragColor = mix(origcolor,fogcolor,f);\n' +
            '   }';
    }
    fs_fog() {
        return '\n' +
            ' uniform sampler2D colorTexture;\n' +
            'uniform sampler2D depthTexture;\n' +
            'varying vec2 v_textureCoordinates;\n' +
            'void main(void)\n' +
            '{\n' +
            'vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);\n' +
            'vec4 fogcolor=vec4(0.8,0.8,0.8,0.5);\n' +
            'float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n' +
            'vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);\n' +
            'float f=(depthcolor.r-0.7)/0.2;\n' +
            'if(f<0.0) f=0.0;\n' +
            'else if(f>1.0) f=1.0;\n' +
            'gl_FragColor = mix(origcolor,fogcolor,f);\n' +
            '   }';
        // +        ''}';
    }
    //  export default{
    //     addPostProcessStage:addPostProcessStage,
    //     removePostProcessStage:removePostProcessStage
    //  }

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

        const viewer = new Cesium.Viewer('cesiumContainer', options)
        viewer._cesiumWidget._creditContainer.style.display = 'none'
        window.viewer = viewer

        // var ArcGisMap = new Cesium.UrlTemplateImageryProvider({
        //     //调用深蓝夜色影像服务 
        //     url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
        // })

        // var layers = viewer.imageryLayers;
        // var googleLayer = layers.addImageryProvider(ArcGisMap);
        // googleLayer.splitDirection = Cesium.ImagerySplitDirection.LEFT;//设置图层在左侧

        // var slider = document.getElementById('slider');
        // viewer.scene.imagerySplitPosition = (slider.offsetLeft) / slider.parentElement.offsetWidth;
        // global.constants.dragStartX = 0;
        // document.getElementById('slider').addEventListener('mousedown', this.mouseDown, false);
        // window.addEventListener('mouseup', this.mouseUp, false);

        this.addPostProcessStage(viewer, 'addFog', 'snow')
        // this.removePostProcessStage(viewer,'addSnow')
        const currentLocation = {
            x: 120.861427,
            y: 24.321453
        }

        const result = gcoord.transform(
            [ currentLocation.x , currentLocation.y ],    // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
        )
        console.log(result)
        return viewer
    }
    /** 逻辑渲染 */
    render() {
        // 构建虚拟dom
        return ( <
            > < div id = "cesiumContainer"
            className = {
                cesiumWeather.cesiumContainer
            } > {
                /* <div id="slider" className={cesiumWeather.slider}></div> */ } {
                /* <div id="creditContainer"></div>       */ } <
            /div> <
            />
        )
    }
}