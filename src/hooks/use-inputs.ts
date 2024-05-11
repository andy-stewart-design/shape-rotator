import { useState, useCallback, useMemo } from "react";
import type { ChangeEvent } from "react";

// ------------------------------------------------------
// Input: Slider ----------------------------------------
// ------------------------------------------------------

interface DelegatedSlideProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
}

type SliderSetupHook = (
  defaultValue: number,
  min: number,
  max: number,
  step: number
) => [number, DelegatedSlideProps];

export const useSlider: SliderSetupHook = (
  defaultValue = 5,
  min = 0,
  max = defaultValue * 2,
  step = 0.1
) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>) {
      const { target } = event;

      if (!target) return;
      const newValueNumber = Number((target as HTMLInputElement).value);

      if (newValueNumber >= max) setValue(max);
      else if (newValueNumber <= min) setValue(min);
      else setValue(newValueNumber);
    },
    [min, max]
  );

  const delegatedProps = useMemo(() => {
    return { onChange, min, max, step };
  }, [min, max, step, onChange]);

  return [value, delegatedProps];
};

// ------------------------------------------------------
// Input: Switch ----------------------------------------
// ------------------------------------------------------

export function useToggle(defaultValue = false) {
  if (typeof defaultValue !== "boolean" && typeof defaultValue !== "function") {
    console.warn("Invalid type for useToggle");
  }

  const [boolean, setBoolean] = useState(defaultValue);

  const toggleBoolean = useCallback(function () {
    setBoolean((b) => !b);
  }, []);

  return [boolean, toggleBoolean];
}

// ------------------------------------------------------
// Input: Slider ----------------------------------------
// ------------------------------------------------------

export function useRadio(defaultValue: string | (() => string)) {
  if (typeof defaultValue !== "string" && typeof defaultValue !== "function") {
    console.warn("Invalid type for useRadio");
  }

  const [value, setValue] = useState(defaultValue);

  function handleSetValue(event: InputEvent) {
    const { target } = event;

    if (!target) return;
    setValue((target as HTMLInputElement).value);
  }

  return [value, handleSetValue];
}
