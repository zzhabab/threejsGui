/**
 * @item
 * @positionFolder
 * @colorFolder
 * @sdkVersionsdk 版本
 */
export interface DefaultOptions {
  key: string | number,
  item: Object,
  name: string | undefined,
  positionFolder: boolean,
  colorFolder: boolean,
  sdkVersion: string | number,
}

export interface Options extends Partial<DefaultOptions> {
  key: string | number,
  item: Object
}

//版本
export enum ThreeGUIConfig {
  version = '1.0.0'
}