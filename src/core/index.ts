import { DefaultOptions, Options, ThreeGUIConfig } from "../type/index";
import { GUI } from "../../node_modules/three/examples/jsm/libs/lil-gui.module.min.js";

interface GuiNode {
  [key: string]: any | GuiNode[];
}

export default class ThreeGui {
  public data: Options;
  public nameList!: string[];
  private version: string | number | undefined;
  private static gui: GUI | null = null;
  private static keyMap: Map<any, any> = new Map()
  
  public constructor(options: Options) {
    if (options.item === undefined) {
      throw new Error('item为必传参数');
    }
    if (options.key === undefined) {
      throw new Error('key为必传参数');
    }
    if (options.item.hasOwnProperty('isObject3D') && (options.item as any).isObject3D) {
      this.data = Object.assign(this.initDef(), options)
      ThreeGui.gui = this.createGUI()
      if (ThreeGui.keyMap.has(this.data.key)) {
        throw new Error(`key:${this.data.key}已经使用过，请保证key的唯一性`);
      } else {
        if (Array.from(ThreeGui.keyMap.values()).includes(this.data.item)) {
          console.log(`%citem:${this.data.item}已经使用过，不会再进行绑定`, "background-color: yellow;");
        } else {
          ThreeGui.keyMap.set(this.data.key, this.data.item)
          this.installFolder()
        }
      }
    } else {
      throw new Error('Item must be an instance of Object3D');
    }
  }
  
  private initDef(): DefaultOptions {
    this.version = ThreeGUIConfig.version;
    return <DefaultOptions>{
      sdkVersion: this.version,
      positionFolder: false,
      colorFolder: false
    }
  }
  
  private installFolder() {
    // this.nameList = this.getNameList(ThreeGui.gui!.children)
    // this.nameList.filter(item => item !== undefined)
    const protoTypeName: string = Object.getPrototypeOf(this.data.item).constructor.name
    // 放弃对camera的控制，交给OrbitControls接管
    if (!protoTypeName.toLowerCase().includes('camera')) {
      if (this.data.positionFolder) {
        let guiFolder = ThreeGui.gui!.addFolder(`${this.data.name??"undefined"}`);
        guiFolder.add((this.data.item as any).position, "x", -10, 10, 1)!.name("xPosition");
        guiFolder.add((this.data.item as any).position, "y", -10, 10, 1)!.name("yPosition");
        guiFolder.add((this.data.item as any).position, "z", -10, 10, 1)!.name("zPosition");
        // if (!protoTypeName.toLowerCase().includes('camera')) {
        //   guiFolder.add((this.data.item as any).rotation, "x", 0, Math.PI, Math.PI / 360)!.name("xRotation");
        //   guiFolder.add((this.data.item as any).rotation, "y", 0, Math.PI, Math.PI / 360)!.name("yRotation");
        //   guiFolder.add((this.data.item as any).rotation, "z", 0, Math.PI, Math.PI / 360)!.name("zRotation");
        // }
      }
      if (this.data.colorFolder) {
        // if (protoTypeName.toLowerCase().includes('camera')) {
        //   throw new Error('The camera cannot set colors. Please set the colorFolder parameter to false or do not provide the colorFolder parameter');
        // } else {
        //   const color = this.formatColor((this.data.item as any).material.color)
        //   // const colorDescriptionName = this.data.name ? this.data.name + '颜色' : 'undefined颜色'
        //   // 注意addColor的第二个参数并不是随意的字符串都可以，只能是color，当换成其他东西时报错Cannot read properties of undefined (reading 'toHexString')
        //   ThreeGui.gui!.addColor({color: color}, 'color').onChange((value: number) => {
        //     (this.data.item as any).material.color.set(value)
        //   })
        // }
        const color = this.formatColor((this.data.item as any).material.color)
        ThreeGui.gui!.addColor({color: color}, 'color').onChange((value: number) => {
          (this.data.item as any).material.color.set(value)
        })
      }
    } else {
      console.warn('此组件不对camera进行控制')
    }
  }
  
  // 单例模式的创造gui对象
  private createGUI(): GUI {
    if(!ThreeGui.gui) {
      ThreeGui.gui = new GUI()
    }
    return ThreeGui.gui
  }
  
  private formatColor(data: Object): number {
    var r = Math.floor((data as any).r * 255); // 将红色通道值转换为 0-255 范围的整数
    var g = Math.floor((data as any).g * 255); // 将绿色通道值转换为 0-255 范围的整数
    var b = Math.floor((data as any).b * 255); // 将蓝色通道值转换为 0-255 范围的整数
    r = Math.floor(r); // 取整数部分
    g = Math.floor(g);
    b = Math.floor(b);
    return (r << 16) | (g << 8) | b; // 返回完整的十六进制颜色表示
  }
  
  private getNameList(array: GuiNode[]): string[] {
    let result: string[] = []
    array.forEach(item => {
      result.push(item._name)
      if (item.children) {
        result = result.concat(this.getNameList(item.children))
        delete item.children
      }
    })
    return result
  }
}