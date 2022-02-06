import * as THREE from "three";
import { proxy } from "valtio";

export const damp = THREE.MathUtils.damp;
export const state = proxy({
  clicked: null,
  urls: [
    "https://images.ctfassets.net/4b8maak9frxn/1hINytaPDypa6qDk4N9zxN/d7c6e1c9e1013613d2d9db1958aef36f/8_self-portrai_head_2021-10_02.jpg?w=1000&h=1333&fl=progressive&q=50&fm=jpg",
  ],
});
