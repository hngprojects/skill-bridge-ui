"use client";

import { useRef, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const CANVAS_SIZE = 320;
const OUTPUT_SIZE = 400;

interface Props {
  file: File | null;
  onClose: () => void;
  onApply: (file: File) => void;
}

export function AvatarCropModal({ file, onClose, onApply }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{
    startX: number;
    startY: number;
    ox: number;
    oy: number;
  } | null>(null);

  useEffect(() => {
    if (!file) return;
    let active = true;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      createImageBitmap(img)
        .then((bmp) => {
          if (!active) {
            bmp.close();
            return;
          }
          setImageBitmap((prev) => {
            prev?.close();
            return bmp;
          });
          setOffset({ x: 0, y: 0 });
          setZoom(1);
        })
        .catch(() => {})
        .finally(() => URL.revokeObjectURL(url));
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
    return () => {
      active = false;
    };
  }, [file]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageBitmap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = CANVAS_SIZE;
    const r = W / 2;

    ctx.clearRect(0, 0, W, W);

    const baseScale = Math.min(W / imageBitmap.width, W / imageBitmap.height);
    const scale = baseScale * zoom;
    const imgW = imageBitmap.width * scale;
    const imgH = imageBitmap.height * scale;
    const drawX = r + offset.x - imgW / 2;
    const drawY = r + offset.y - imgH / 2;

    ctx.drawImage(imageBitmap, drawX, drawY, imgW, imgH);

    // Dark overlay with circular cutout via even-odd fill
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.beginPath();
    ctx.rect(0, 0, W, W);
    ctx.arc(r, r, r - 2, 0, Math.PI * 2, true);
    ctx.fill("evenodd");

    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(r, r, r - 2, 0, Math.PI * 2);
    ctx.stroke();
  }, [imageBitmap, offset, zoom]);

  function startDrag(clientX: number, clientY: number) {
    drag.current = {
      startX: clientX,
      startY: clientY,
      ox: offset.x,
      oy: offset.y,
    };
  }

  function moveDrag(clientX: number, clientY: number) {
    if (!drag.current) return;
    setOffset({
      x: drag.current.ox + clientX - drag.current.startX,
      y: drag.current.oy + clientY - drag.current.startY,
    });
  }

  function endDrag() {
    drag.current = null;
  }

  function handleApply() {
    if (!imageBitmap || !file) return;

    const W = CANVAS_SIZE;
    const r = W / 2;
    const baseScale = Math.min(W / imageBitmap.width, W / imageBitmap.height);
    const scale = baseScale * zoom;
    const imgW = imageBitmap.width * scale;
    const imgH = imageBitmap.height * scale;
    const drawX = r + offset.x - imgW / 2;
    const drawY = r + offset.y - imgH / 2;

    const out = document.createElement("canvas");
    out.width = OUTPUT_SIZE;
    out.height = OUTPUT_SIZE;
    const ctx = out.getContext("2d");
    if (!ctx) return;

    const ratio = OUTPUT_SIZE / CANVAS_SIZE;

    ctx.beginPath();
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(
      imageBitmap,
      drawX * ratio,
      drawY * ratio,
      imgW * ratio,
      imgH * ratio,
    );

    out.toBlob((blob) => {
      if (!blob) return;
      onApply(new File([blob], file.name, { type: "image/png" }));
    }, "image/png");
  }

  return (
    <Dialog open={!!file} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xs sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Adjust photo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="rounded-lg cursor-grab active:cursor-grabbing touch-none select-none"
            style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => {
              const t = e.touches[0];
              startDrag(t.clientX, t.clientY);
            }}
            onTouchMove={(e) => {
              const t = e.touches[0];
              moveDrag(t.clientX, t.clientY);
            }}
            onTouchEnd={endDrag}
          />

          <div className="w-full flex items-center gap-3 px-1">
            <span className="text-xs text-muted-foreground shrink-0">Zoom</span>
            <Slider
              min={1}
              max={3}
              step={0.01}
              value={[zoom]}
              onValueChange={([v]) => setZoom(v)}
              className="flex-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
