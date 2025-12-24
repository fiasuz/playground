import React, { useRef, useEffect, useState } from "react";
import { EditorControls } from "./EditorControls";
import { useBoolean } from "minimal-shared";
import { actionsStore } from "@/shared/store";

interface CanvasWrapperProps {
  children: React.ReactNode;
}

export function CanvasWrapper({ children }: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSpacePressing, setIsSpacePressing] = useState(false);
  const isPositionCalculating = useBoolean();
  const { active: activeAction } = actionsStore((state) => state);

  useEffect(() => {
    isPositionCalculating.onTrue();
    if (containerRef.current && contentRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const centerX = (containerRect.width - contentRect.width) / 2;
      const centerY = 100;

      setTransform({ x: centerX, y: centerY, scale: 1 });
      setTimeout(() => {
        isPositionCalculating.onFalse();
        // }, 3000);
      }, 0);
    }
    isPositionCalculating.onFalse();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.1, Math.min(transform.scale * delta, 5));

      const scaleChange = newScale / transform.scale;
      const newX = mouseX - (mouseX - transform.x) * scaleChange;
      const newY = mouseY - (mouseY - transform.y) * scaleChange;

      setTransform({ x: newX, y: newY, scale: newScale });
      e.preventDefault();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [transform.x, transform.y, transform.scale]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        setTransform((prev) => ({
          ...prev,
          scale: Math.min(prev.scale * 1.1, 5),
        }));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setTransform((prev) => ({
          ...prev,
          scale: Math.max(prev.scale * 0.83, 0.1),
        }));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setTransform({ x: 0, y: 0, scale: 1 });
      }

      if (e.code === "Space" && !e.repeat) {
        setIsSpacePressing(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Mouse drag (space+drag for pan, normal drag for frame)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (isSpacePressing) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - transform.x,
          y: e.clientY - transform.y,
        });
        e.preventDefault();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && isSpacePressing) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setTransform((prev) => ({ ...prev, x: newX, y: newY }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        containerRef.current?.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isSpacePressing, dragStart, transform.x, transform.y]);

  const onResetScale = () => {
    setTransform({ ...transform, scale: 1 });
  };

  // Determine cursor style based on current mode
  const getCursor = () => {
    if (activeAction === "text") return "crosshair";
    if (isSpacePressing) return "grabbing";
    return "grab";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab"
      style={{
        cursor: getCursor(),
        backgroundColor: "#eeeeee",
        backgroundImage: `radial-gradient(circle, #d0d0d0 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0px 0px",
      }}
    >
      {isPositionCalculating.value && (
        <div className="w-full h-full absolute top-0 left-0 bg-muted z-5 flex items-center justify-center">
          Yuklanmoqda...
        </div>
      )}
      <div
        ref={contentRef}
        className="absolute"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "0 0",
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>

      <EditorControls scale={transform.scale} onResetScale={onResetScale} />
    </div>
  );
}
