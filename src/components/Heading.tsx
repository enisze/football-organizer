import { Typography } from "@mui/joy";
import { Box } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { flatMap, forEach, isArray, map } from "lodash";
import type { FunctionComponent } from "react";

import { Suspense } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

import Ball from "../../public/ball.svg";

export const Heading: FunctionComponent = () => {
  return (
    <>
      <Typography className="text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        Football <span className="text-purple-300">Organizer</span> App
      </Typography>
      <Ball width={150} height={150} />
      <Svg />
    </>
  );
};

const DefaultModel = () => (
  <Box args={[1, 1, 1]}>
    <meshBasicMaterial attach="material" color="hotpink" />
  </Box>
);

const SvgShape = ({ shape, color, index }: any) => (
  <mesh>
    <meshLambertMaterial
      attach="material"
      color={color}
      /*
        HACK: Offset SVG polygons by index
        The paths from SVGLoader Z-fight.
        This fix causes stacking problems with detailed SVGs.
      */
      polygonOffset
      polygonOffsetFactor={index * -0.1}
    />
    <shapeBufferGeometry attach="geometry" args={[shape]} />
  </mesh>
);

const SvgAsync = ({ sceneRef }: any) => {
  const url = "loclahost:3000/svg";
  const loader = useLoader(SVGLoader, url);
  const shapes = isArray(loader)
    ? forEach(loader, (paths, index) => {
        flatMap(paths.paths, (path) => {
          return path
            .toShapes(true)
            .map((shape) => ({ index, shape, color: path.color }));
        });
      })
    : flatMap(loader.paths, (path, index) => {
        return path
          .toShapes(true)
          .map((shape) => ({ index, shape, color: path.color }));
      });
  return (
    <group
      ref={sceneRef}
      rotation={[-Math.PI / 2, 0, Math.PI]}
      scale={[-0.01, 0.01, 0.01]}
    >
      {map(shapes, (props, key) => (
        <SvgShape key={key} {...props} />
      ))}
    </group>
  );
};

const Svg = (props: any) => (
  <Suspense fallback={<DefaultModel {...props} />}>
    <SvgAsync {...props} />
  </Suspense>
);
