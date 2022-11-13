import { extend, useThree } from "@react-three/fiber";
import type { FunctionComponent } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export const Controls: FunctionComponent = (props) => {
  const { camera, gl } = useThree();
  return (
    <orbitControls attach={"orbitControls"} args={[camera, gl.domElement]} />
  );
};
