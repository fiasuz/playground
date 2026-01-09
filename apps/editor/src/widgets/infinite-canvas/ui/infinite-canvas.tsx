import React, { useRef, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plus, Minus, Home } from "lucide-react";

interface InfiniteCanvasProps {
  children: React.ReactNode;
}

export function InfiniteCanvas({ children }: InfiniteCanvasProps) {
  // eslint-disable-next-line
  const transformRef = useRef<any>(null);
  const [scale, setScale] = useState(1);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Plus: zoom in
      if ((e.ctrlKey || e.metaKey) && e.key === "+") {
        e.preventDefault();
        transformRef.current?.zoomIn();
      }
      // Ctrl/Cmd + Minus: zoom out
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        transformRef.current?.zoomOut();
      }
      // Ctrl/Cmd + 0: reset zoom
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        transformRef.current?.resetTransform();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen bg-gray-100">
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.1}
        maxScale={4}
        onZoom={(state) => setScale(state.state.scale)}
        panning={{
          disabled: false,
          velocityDisabled: false,
        }}
        pinch={{
          disabled: false,
        }}
        wheel={{
          disabled: false,
          step: 0.05,
        }}
      >
        <TransformComponent wrapperClass="w-full! h-full! bg-muted border-10">
          {children}
        </TransformComponent>
      </TransformWrapper>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 bg-white rounded-lg shadow-md p-2">
        <button
          onClick={() => transformRef.current?.zoomIn()}
          className="p-2 hover:bg-gray-100 rounded transition"
          title="Zoom in (Ctrl++)"
        >
          <Plus size={20} />
        </button>
        <button
          onClick={() => transformRef.current?.zoomOut()}
          className="p-2 hover:bg-gray-100 rounded transition"
          title="Zoom out (Ctrl+-)"
        >
          <Minus size={20} />
        </button>
        <div className="border-t my-1"></div>
        <button
          onClick={() => transformRef.current?.resetTransform()}
          className="p-2 hover:bg-gray-100 rounded transition"
          title="Reset view (Ctrl+0)"
        >
          <Home size={20} />
        </button>
      </div>

      {/* Zoom Level Display */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-1 text-sm">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
