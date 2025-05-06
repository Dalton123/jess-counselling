import { RefObject, useEffect, useRef, useState } from "react";

const useHorizontalGrabScroll = (
  containerRef: RefObject<HTMLElement>,
  disabled: boolean,
) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseScrollPosition = useRef<{
    top: number;
    left: number;
    x: number;
    y: number;
  }>({
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container?.clientWidth) return;

    if (container.clientWidth >= container.scrollWidth || disabled) {
      container.style.cursor = "inherit";
      return;
    }

    if (isMouseDown) {
      container.style.cursor = "grabbing";
      return;
    }

    container.style.cursor = "grab";
  }, [isMouseDown, disabled, containerRef]);

  useEffect(() => {
    mouseScrollPosition.current = { top: 0, left: 0, x: 0, y: 0 };
    const container = containerRef.current;

    if (!container) return () => ({});
    if (disabled) {
      container.scrollTop = 0;
      container.scrollLeft = 0;

      return () => ({});
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      const dx = e.clientX - mouseScrollPosition.current.x;
      const dy = e.clientY - mouseScrollPosition.current.y;

      container.scrollTop = mouseScrollPosition.current.top - dy;
      container.scrollLeft = mouseScrollPosition.current.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      setIsMouseDown(false);
    };

    const mouseDownHandler = (e: MouseEvent) => {
      mouseScrollPosition.current = {
        top: container.scrollTop,
        left: container.scrollLeft,
        x: e.clientX,
        y: e.clientY,
      };
      setIsMouseDown(true);

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      container.scrollTo({
        left: container.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    container.addEventListener("mousedown", mouseDownHandler);
    container.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      container.removeEventListener("mousedown", mouseDownHandler);
      container.removeEventListener("wheel", onWheel);
    };
  }, [disabled, containerRef]);
};

export default useHorizontalGrabScroll;
