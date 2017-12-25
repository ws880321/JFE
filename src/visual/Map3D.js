/**
 * 3D地图
 * Created by jusfoun-fe.github.io on 2017/11/19.
 * @author 九次方前端研发部-朱润亚 <zhu18@vip.qq.com>
 * @version beta v1.0.3
 * @module Map3D
 */

import * as THREE from './three.js'
import Detector from './Detector.js'
import Font3D from './Font3D.js'
import TWEEN from './tween.min.js'
import {OrbitControls} from './OrbitControls.js'
import {Event} from './Event.js'
import {Stats} from './stats.js'


/**
 * 地图立体参数设置
 * @type {{amount: number, bevelThickness: number, bevelSize: number, bevelEnabled: boolean, bevelSegments: number, curveSegments: number, steps: number}}
 */
var extrudeOption = {
  amount : 2,
  bevelThickness : 1,
  bevelSize : .2,
  bevelEnabled : false,
  bevelSegments : 5,
  curveSegments :1,
  steps : 1,
};



class Map3D{
  constructor(o){
    if(!Detector.webgl) {
      console.warn('不支持webgl,停止渲染.');
      return;
    }
  }
}
export {
  Map3D,THREE,Detector,Font3D,TWEEN,OrbitControls,Event,Stats
}
