import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { AnimationObjectGroup } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var container, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixer;

function init(el, model, width, height) {
  container = el;

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  camera.position.set(100, 200, 300);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 200, 0);
  scene.add(light);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 200, 100);
  light.castShadow = true;
  light.shadow.camera.top = 180;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = -120;
  light.shadow.camera.right = 120;
  scene.add(light);

  // scene.add( new CameraHelper( light.shadow.camera ) );

  // ground
  // model
  var loader = new FBXLoader();
  loader.load(model, function(object) {
    mixer = new THREE.AnimationMixer(object);

    var action = mixer.clipAction(object.animations[0]);
    action.play();

    object.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(object);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 100, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

export const ThreeRenderer = ({ model }) => {
  const el = useRef();
  useEffect(() => {
    init(
      el.current,
      model,
      el.current.clientWidth,
      (el.current.clientWidth * 4) / 3
    );
    animate();
    return () => {
      el.current.innerHTML = "";
    };
  }, [model]);
  return <div ref={el}></div>;
};
