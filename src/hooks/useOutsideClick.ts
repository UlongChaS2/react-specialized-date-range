import * as React from "react";
import { EMode } from "../@types/date";
import { useDatePickerOptionValuesContext } from "./useDateOptionContext";

export const useOutsideClick = () => {
  const [isActive, setIsActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const options = useDatePickerOptionValuesContext();
  const { mode } = options;

  const onOutSideClick = React.useCallback(({ target }: MouseEvent): void => {
    inputRef.current && !inputRef.current.contains(target as Node) && setIsActive(false);
  }, []);

  React.useEffect(() => {
    mode === EMode.BASIC && document.addEventListener("click", onOutSideClick);
    return () => {
      document.removeEventListener("click", onOutSideClick);
    };
  }, []);

  return {
    isActive,
    setIsActive,
    inputRef,
  };
};
