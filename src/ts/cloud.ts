import * as THREE from '../../node_modules/three/src/Three.js';
export default class Cloud {
  private cloudGeometry: THREE.BufferGeometry
  private cloudMaterial: THREE.MeshBasicMaterial
  private cloudMesh: THREE.Mesh
  
  public constructor() {
    this.cloudGeometry = new THREE.PlaneGeometry(10, 10)
    this.cloudMaterial = new THREE.MeshBasicMaterial({ color: 0x000666, side: THREE.DoubleSide })
    this.cloudMesh = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial)
  }
}