"use client";

import { Canvas as ThreeCanvas } from "@react-three/fiber";
import Cubes from "@/components/Cubes";

interface CanvasProps {
  data: number[][];
}

const Canvas = ({ data }: CanvasProps) => {
  const height = 10 * data.length;
  return (
    <div className={`h-[4000px] w-[1000px]`}>
      <ThreeCanvas camera={{ position: [0, 0, 700], fov: 60 }}>
        <ambientLight />
        <pointLight position={[10, 10, 20]} />
        <Cubes data={data} />
      </ThreeCanvas>
    </div>
  );
};

export default Canvas;
