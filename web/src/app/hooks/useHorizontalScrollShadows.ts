import ScrollProgressEnum from "@models/enums/ScrollProgressEnum";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

const useHorizontalScrollShadows = (
  containerRef: RefObject<HTMLElement>,
  threshold: number,
  disabled: boolean,
) => {
  const { scrollXProgress } = useScroll({ container: containerRef });
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(
    ScrollProgressEnum.Start,
  );

  useMotionValueEvent(scrollXProgress, "change", (value: number) => {
    if (value < threshold) {
      setScrollProgress(ScrollProgressEnum.Start);
    }

    if (value >= threshold && value <= 1 - threshold) {
      setScrollProgress(ScrollProgressEnum.Middle);
    }

    if (value > 1 - threshold) {
      setScrollProgress(ScrollProgressEnum.End);
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container?.clientWidth || disabled) return;

    const { clientWidth, scrollWidth } = container;
    if (clientWidth >= scrollWidth) {
      setIsStart(true);
      setIsEnd(true);

      return;
    }

    if (scrollProgress === ScrollProgressEnum.Start) {
      setIsStart(true);
      setIsEnd(false);
    }

    if (scrollProgress === ScrollProgressEnum.Middle) {
      setIsStart(false);
      setIsEnd(false);
    }

    if (scrollProgress === ScrollProgressEnum.End) {
      setIsEnd(true);
    }
  }, [disabled, scrollProgress, containerRef]);

  return { isStart, isEnd };
};

export default useHorizontalScrollShadows;
