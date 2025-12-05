import { useEffect, useState, type MouseEvent } from "react";

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
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      let newWidth: number;
      if (direction === "right") {
        newWidth = Math.max(
          minWidth,
          Math.min(window.innerWidth - e.clientX, maxWidth)
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
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any);
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
