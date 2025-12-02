import React, { useRef, useEffect, useState } from "react";
import { EditorControls } from "./EditorControls";

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

  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.1, Math.min(transform.scale * delta, 5));

      // Calculate new position to zoom towards mouse cursor
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

  // Keyboard shortcuts (Ctrl++, Ctrl+-)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "+") {
        e.preventDefault();
        setTransform((prev) => ({
          ...prev,
          scale: Math.min(prev.scale * 1.2, 5),
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
      // Space press detection
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-100 overflow-hidden cursor-grab"
      style={{
        cursor: isSpacePressing ? "grabbing" : "grab",
      }}
    >
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

      <EditorControls />
      {/* <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 text-xs space-y-2 pointer-events-none">
        <div>
          <strong>Zoom:</strong>
        </div>
        <div>Ctrl/Cmd + Plus: In</div>
        <div>Ctrl/Cmd + Minus: Out</div>
        <div>Ctrl/Cmd + 0: Reset</div>
        <div className="border-t mt-2 pt-2">
          <strong>Pan:</strong>
        </div>
        <div>Space + Drag</div>
        <div className="border-t mt-2 pt-2">
          Zoom: {Math.round(transform.scale * 100)}%
        </div>
      </div> */}
    </div>
  );
}
