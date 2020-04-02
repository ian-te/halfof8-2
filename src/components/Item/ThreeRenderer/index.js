import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { AnimationObjectGroup } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function main(el, model, width, height, color = "0xff0040") {
  var container, controls;
  let camera, scene, renderer, light;
  let mainObject;
  var mouse = { x: 0, y: 0 };

  let dX = 0,
    dY = 0;
  var clock = new THREE.Clock();

  var mixer;

  function onMouseMove(event) {
    mouse.x = (event.clientX / document.documentElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / document.documentElement.clientHeight) * 2 + 1;
  }

  function init() {
    container = el;

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(97, 102, 123);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    light = new THREE.HemisphereLight(0xffffff, 0x777777);
    light.position.set(97, 72, 123);
    scene.add(light);

    light = new THREE.PointLight(parseInt(color), 2, 300);
    light.position.set(97, 0, 123);
    scene.add(light)
    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(1000, 200, 100);
    // light.castShadow = true;
    // light.shadow.camera.top = 180;
    // light.shadow.camera.bottom = -100;
    // light.shadow.camera.left = -120;
    // light.shadow.camera.right = 120;
    // scene.add(light);

    // scene.add( new CameraHelper( light.shadow.camera ) );

    // ground
    // model
    var loader = new FBXLoader();
    loader.load(model, function(object) {
      mixer = new THREE.AnimationMixer(object);
      mainObject = object;
      object.doubleSided = true;
      scene.add(object);
      camera.lookAt(THREE.Vector3(0, 0, 0));
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    camera.lookAt(0, 0, 0);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function lerp(ratio, start, end) {
    return (start * (1 - ratio) + end * ratio).toFixed(20);
  }
  //
  function moveObject() {
      if(mainObject) {

        mainObject.rotation.y = mouse.y;
        mainObject.rotation.z = mouse.x;
      }
  }

  function animate() {
    requestAnimationFrame(animate);

    // if (mixer) mixer.update(delta);
    moveObject();
    //   console.log(camera.position)

    renderer.render(scene, camera);
  }
  init();
  animate();
}
export const ThreeRenderer = ({ model, color }) => {
  const el = useRef();
  console.log('>>>color', color)
  useEffect(() => {
    main(
      el.current,
      model,
      el.current.clientWidth,
      (el.current.clientWidth * 4) / 3,
      color
    );
    return () => {
      el.current.innerHTML = "";
    };
  }, [model]);
  return <div ref={el}></div>;
};
