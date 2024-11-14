"use client";

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const TsubuyakiProcessing: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let t = 0;
      let width: number;
      let height: number;

      const updateDimensions = () => {
        width = window.innerWidth;
        height = window.innerHeight;
      };

      const mag = (x: number, y: number) => Math.sqrt(x * x + y * y);

      const a = (
        x: number,
        y: number,
        d = mag(x / 8 - 25, y / 8 - 25) ** 2 / 99
      ) => {
        const k = x / 8 - 25;
        const e = y / 8 - 25;
        const q = x / 3 + ((k * 0.5) / Math.cos(y * 5)) * Math.sin(d * d - t);
        const c = d / 2 - t / 8;
        return [
          q * Math.sin(c) + e * Math.sin(d + k - t) + 200,
          (q + y / 8 + d * 9) * Math.cos(c) + 200,
        ];
      };

      p.setup = () => {
        updateDimensions();
        p.createCanvas(width, height);
      };

      p.draw = () => {
        p.background(23, 23, 23, 100);
        p.stroke(255, 100);
        for (let y = 0; y < height; y += 8) {
          for (let x = 0; x < width; x += 8) {
            const [px, py] = a((x / width) * 300, (y / height) * 300);
            const mappedX = p.map(px, 0, 400, 0, width);
            const mappedY = p.map(py, 0, 400, 0, height);
            p.point(mappedX, mappedY);
          }
        }
        t += Math.PI / 60;
      };

      p.windowResized = () => {
        updateDimensions();
        p.resizeCanvas(width, height);
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-5 overflow-hidden">
      <div ref={sketchRef} className=" rounded-lg overflow-hidden" />
    </div>
  );
};

export default TsubuyakiProcessing;
