import { useEffect, useState } from "react";

interface UseResizeOptions {
  minWidth?: number;
  maxWidth?: number;
  initialWidth?: number;
  direction?: "left" | "right";
}

export function useResize(options: UseResizeOptions = {}) {
  const {
    minWidth = 200,
    maxWidth = 400,
    initialWidth = 250,
    direction = "left",
  } = options;

  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isResizing) return;

      let newWidth: number;
      if (direction === "right") {
        newWidth = Math.max(
          minWidth,
          Math.min(window.innerWidth - e.clientX, maxWidth),
        );
      } else {
        newWidth = Math.max(minWidth, Math.min(e.clientX, maxWidth));
      }

      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, minWidth, maxWidth, direction]);

  return {
    width,
    isResizing,
    handleMouseDown,
  };
}
