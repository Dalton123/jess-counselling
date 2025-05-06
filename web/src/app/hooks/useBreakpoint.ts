import { useCallback, useEffect, useState } from "react";

enum SizesEnum {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  XLarge = "xl",
}

const getCurrentBreakpoint = () => {
  const breakpoints = { tablet: 768, desktop: 1024, lgDesktop: 1440 };
  const width = window.innerWidth;

  if (width < breakpoints.tablet) {
    return SizesEnum.Small;
  }
  if (width >= breakpoints.tablet && width < breakpoints.desktop) {
    return SizesEnum.Medium;
  }
  if (width >= breakpoints.desktop && width < breakpoints.lgDesktop) {
    return SizesEnum.Large;
  }
  return SizesEnum.XLarge;
};

const useBreakpoint = () => {
  const [screen, setScreen] = useState<SizesEnum>();

  const resizeHandler = useCallback(
    () => setScreen(getCurrentBreakpoint()),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    setScreen(getCurrentBreakpoint());

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return screen;
};

export default useBreakpoint;
