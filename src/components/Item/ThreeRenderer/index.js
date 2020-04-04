import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import styled from "styled-components";
import debounce from "lodash/debounce";

function main(el, model, width, height, lightsInput) {
  var container, controls;
  let camera, scene, renderer, light;
  let mainObject;
  let lights;
  let gemMaterial;
  var mouse = { x: 0, y: 0 };

  let dX = 0,
    dY = 0;
  var clock = new THREE.Clock();

  var mixer;

  if (!lightsInput) {
    lights = ["0xff0040"];
  } else {
    lights = lightsInput;
  }

  const debouncedResize = debounce(event => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth / 4, (window.innerWidth * 4) / 3 / 4);
  }, 1000);

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

    lights = lights.map(color => new THREE.PointLight(parseInt(color), 2, 50));

    lights.forEach(light => {
      light.intensity = 1;
      light.shadow = true;
      scene.add(light);
    });
    gemMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.96,
      side: THREE.DoubleSide
    });

    var loader = new FBXLoader();
    loader.load(model, function(object) {
      mixer = new THREE.AnimationMixer(object);
      mainObject = object;
      object.traverse(function(node) {
        if (node.material) {
          node.material = gemMaterial;
          node.material.side = THREE.DoubleSide;
        }
      });
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
    debouncedResize();
  }

  function lerp(ratio, start, end) {
    return (start * (1 - ratio) + end * ratio).toFixed(20);
  }
  //
  function moveObject() {
    if (mainObject) {
      mainObject.rotation.y = mouse.y * 0.3;
      mainObject.rotation.z = mouse.x * 0.3;
    }
  }
  function animateLight() {
    var time = Date.now() * 0.0005;
    var delta = clock.getDelta();

    // if (object) object.rotation.y -= 0.5 * delta;
    let counter = 0;
    let phases = [0.7, 0.5, 0.3];
    let distanceModifier = 1.5;

    lights.forEach((light, key) => {
      light.position.x =
        Math.sin(time * phases[key % 3]) * 30 * distanceModifier;
      light.position.y =
        Math.cos(time * phases[(key + 1) % 3]) * 40 * distanceModifier;
      light.position.z =
        Math.cos(time * phases[(key + 2) % 3]) * 30 * distanceModifier;
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    animateLight();
    moveObject();
    renderer.render(scene, camera);
  }
  init();
  animate();
}
export const ThreeRenderer = ({ model, lights, className }) => {
  const el = useRef();
  console.log(">> three", lights);
  useEffect(() => {
    main(
      el.current,
      model,
      el.current.clientWidth,
      (el.current.clientWidth * 4) / 3,
      lights
    );
    return () => {
      el.current.innerHTML = "";
    };
  }, [model]);
  return (
    <ThreeRendererStyled ref={el} className={className}></ThreeRendererStyled>
  );
};

const ThreeRendererStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;
