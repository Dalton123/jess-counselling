"use client";

import { useRef, useEffect, DependencyList } from "react";

interface UseEffectOnUpdateProps {
  effectFunction: () => void;
  deps: DependencyList;
}

export default function useEffectOnUpdate({
  effectFunction,
  deps,
}: UseEffectOnUpdateProps) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      // Skip running the effect during SSR
      return;
    }

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      effectFunction();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
