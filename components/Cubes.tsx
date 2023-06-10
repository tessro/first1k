"use client";

import { useMemo } from "react";

const activeColor = "#32cd32";
const lightlyActiveColor = "#3f5f01";
const inactiveColor = "#333";

interface CubesProps {
  data: number[][];
}

const Cubes = ({ data }: CubesProps) => {
  const cubes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < data.length; j++) {
        const isActive = data[j][i] > 0;
        temp.push(
          <mesh key={`${i}-${j}`} position={[2 * i - 100, 400 - 2 * j, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={
                isActive
                  ? data[j][i] < 10
                    ? lightlyActiveColor
                    : activeColor
                  : inactiveColor
              }
              opacity={0.1}
            />
          </mesh>
        );
      }
    }
    return temp;
  }, [data]);

  return <>{cubes}</>;
};

export default Cubes;
