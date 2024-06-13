/**
 * @item
 * @positionFolder
 * @colorFolder
 * @sdkVersionsdk 版本
 */
interface DefaultOptions {
    key: string | number;
    item: Object;
    name: string | undefined;
    positionFolder: boolean;
    colorFolder: boolean;
    sdkVersion: string | number;
}
interface Options extends Partial<DefaultOptions> {
    key: string | number;
    item: Object;
}

declare class ThreeGui {
    data: Options;
    nameList: string[];
    private version;
    private static gui;
    private static keyMap;
    constructor(options: Options);
    private initDef;
    private installFolder;
    private createGUI;
    private formatColor;
    private getNameList;
}

export { ThreeGui as default };
