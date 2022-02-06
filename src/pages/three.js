import { graphql } from "gatsby";
import { getImage, getSrc } from "gatsby-plugin-image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { state, damp } from "../helpers/three-utils";

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      8,
      delta
    );
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    );
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      );
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      );
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      );
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    );
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? "white" : "#aaa"),
      hovered ? 0.3 : 0.1
    );
  });
  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  );
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  return (
    <ScrollControls
      horizontal
      damping={10}
      pages={(width - xW + urls.length * xW) / width}
    >
      {/* <Minimap /> */}
      <Scroll>
        {urls.map((item, i) => (
          <Item
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 4, 1]}
            url={item}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

export default function ThreePage({ data }) {
  // return <h1>TEST BUILD</h1>;
  const isBrowser = typeof window !== "undefined";
  useEffect(() => {
    state.urls = data.contentfulMainPage.items
      .map((i) => getSrc(i.background))
      .filter((i) => !!i);
  });

  if (!isBrowser) return <h1>Hello</h1>;
  return (
    <Suspense fallback={null}>
      <Canvas
        style={{ height: "100vh" }}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
      >
        <Items />
      </Canvas>
    </Suspense>
  );
}

export const pageQuery = graphql`
  query MyQuery1 {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulMainPage {
      items {
        ... on ContentfulPortfolioItem {
          id
          name
          background: indexBackgroundImage {
            gatsbyImageData(aspectRatio: 0.75, width: 640)
            file {
              url
            }
          }
        }
        ... on ContentfulAudio {
          id
          name
          background {
            gatsbyImageData(aspectRatio: 0.75, width: 640)
            file {
              url
            }
          }
        }
      }
    }
  }
`;
