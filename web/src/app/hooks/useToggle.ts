"use client";

import { useState } from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

interface UseToggleProps {
  initialValue?: boolean;
  onToggle?: () => void;
}

function useToggle({
  initialValue = false,
  onToggle = () => {},
}: UseToggleProps): [boolean, () => void] {
  const [on, setOn] = useState<boolean>(initialValue);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  useEffectOnUpdate({ effectFunction: onToggle, deps: [on] });

  return [on, toggle];
}

export default useToggle;
