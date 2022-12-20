import { Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

export const Background = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
        <ambientLight />
      </Suspense>
    </Canvas>
  );
};

export default Background;

const Stars = (props: any) => {
  const ref = useRef({ rotation: { x: 0, y: 0 } });
  const [sphere] = useState(
    () => {
      let d, x, y, z;
      do {
        x = Math.random() * 2.0 - 1.0;
        y = Math.random() * 2.0 - 1.0;
        z = Math.random() * 2.0 - 1.0;
        d = x * x + y * y + z * z;
      } while (d > 1.0);
      return { x: x, y: y, z: z };
    }
    // random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <Points
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled={false}
      {...props}
    ></Points>
  );
};
