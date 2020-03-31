import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import FBXLoader from "three-fbx-loader";
import { AnimationObjectGroup } from "three";

var camera, scene, renderer;
var geometry, material, mesh;

const loader = new FBXLoader();

function init(el, model, width, height) {
  camera = new THREE.PerspectiveCamera(170, width / height, 0.01, 100000);
  camera.position.z = 1000;

  scene = new THREE.Scene();

  // geometry = new FBX.BoxGeometry(0.2, 0.2, 0.2);

  loader.load(model, object => {
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(object, material);
    scene.add(mesh);
    // mesh.scale.x = 0.05;
    // mesh.scale.y = 0.05;
    console.log("mesh", mesh);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  el.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  if (mesh) {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
  }

  renderer.render(scene, camera);
}

export const ThreeRenderer = ({ model }) => {
  const el = useRef();
  useEffect(() => {
    init(el.current, model, 300, 400);
    animate();
    return () => {
      el.current.innerHTML = "";
    };
  });
  return <div ref={el}></div>;
};
