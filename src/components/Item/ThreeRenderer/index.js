import React, { useEffect, useRef } from "react";
import styled from "styled-components";

async function main(el, model, width, height, lightsInput) {
  const THREE = await import("three");
  const { FBXLoader } = await import("three/examples/jsm/loaders/FBXLoader");
  var container, controls;
  let camera, scene, renderer, lightambient, light, lightmain, lightsupport;
  let mainObject;
  let lights;
  let gemMaterial;
  var mouse = { x: 0, y: 0 };
  var frustumSize = 130;

  let dX = 0,
    dY = 0;
  var clock = new THREE.Clock();

  var mixer;

  if (!lightsInput) {
    lights = ["0xff0040"];
  } else {
    lights = lightsInput;
  }

  //   const debouncedResize = debounce(event => {
  //     // const aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();

  //     renderer.setSize(window.innerWidth / 4, (window.innerWidth * 4) / 3 / 4);
  // }, 1000);

  init();
  animate();

  function onMouseMove(event) {
    mouse.x = (event.clientX / document.documentElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / document.documentElement.clientHeight) * 2 + 1;
  }

  function init() {
    container = el;

    const aspect = 0.75;
    camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );

    // camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    // camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 1.8, 50, 1000 );
    // camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
    // var aspect = window.innerWidth / window.innerHeight;
    // camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
    // camera.position.set(0, 0, 0);
    camera.position.set(-50, 100, 200);
    // camera.position.set(97, 102, 123);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // white
    light = new THREE.PointLight(0xFFFFFF, 1, 100);
    light.position.set(0, 50, 0);
    scene.add(light);

    // blue
    lightmain = new THREE.PointLight(0x0047ff, 3, 100);
    lightmain.position.set(-40, 0, 60);
    scene.add(lightmain);

    // pink
    lightsupport = new THREE.PointLight(0xFF00B8, 3, 100);
    lightsupport.position.set(40, 0, 60);
    scene.add(lightsupport);

    // lights = lights.map(color => new THREE.PointLight(parseInt(color), 2, 50));

    // lights.forEach(light => {
    //   light.intensity = 1;
    //   light.shadow = true;
    //   scene.add(light);
    // });

    gemMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: 0xffffff,
      shininess: 300,
      metalness: 0.7,
      roughness: 1,
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    camera.lookAt(0, 0, 0);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    camera.updateProjectionMatrix();
  }

  function lerp(ratio, start, end) {
    return (start * (1 - ratio) + end * ratio).toFixed(20);
  }
  //
  function moveObject() {
    if (mainObject) {
      mainObject.rotation.y = -(mouse.x * 0.5);
      mainObject.rotation.z = -(mouse.y * 0.2);
    }
  }

  // function animateLight() {
  //   var time = Date.now() * 0.0005;
  //   var delta = clock.getDelta();

  //   // if (object) object.rotation.y -= 0.5 * delta;
  //   let counter = 0;
  //   let phases = [0.7, 0.5, 0.3];
  //   let distanceModifier = 1;

  //   lights.forEach((light, key) => {
  //     light.position.x =
  //       Math.sin(time * phases[key % 3]) * 30 * distanceModifier;
  //     light.position.y =
  //       Math.cos(time * phases[(key + 1) % 3]) * 40 * distanceModifier;
  //     light.position.z =
  //       Math.cos(time * phases[(key + 2) % 3]) * 30 * distanceModifier;
  //   });
  // }

  function animate() {
    requestAnimationFrame(animate);
    // animateLight();
    moveObject();
    renderer.render(scene, camera);
  }
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
