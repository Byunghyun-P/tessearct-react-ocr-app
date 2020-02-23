import React, { useRef, useEffect, useState } from "react";

import { Container, ResultImage } from "./styled";

interface IProps {
  image: string;
  words: Tesseract.Word[];
}

function ImageCanvas({ image, words }: IProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resultImage, setResultImage] = useState<string>();

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const vImage = new Image();
        vImage.src = image;
        vImage.onload = () => {
          const { naturalWidth, naturalHeight } = vImage;
          ctx.canvas.width = naturalWidth;
          ctx.canvas.height = naturalHeight;
          ctx.drawImage(vImage, 0, 0, naturalWidth, naturalHeight);
          words.forEach(word => {
            const {
              bbox: { x0, x1, y0, y1 },
              text
            } = word;

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.rect(x0, y0, x1 - x0, y1 - y0);

            ctx.font = "15px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(text, x0, y0);
            ctx.stroke();
          });
          setResultImage(canvas.toDataURL());
        };
      }
    }
  }, [canvasRef]);

  return (
    <Container>
      {resultImage ? (
        <ResultImage src={resultImage} />
      ) : (
        <canvas ref={canvasRef} />
      )}
    </Container>
  );
}

export default ImageCanvas;
