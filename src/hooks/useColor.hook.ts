import { Color } from "../interfaces/Color.interface";
import { useCallback, useEffect, useState } from "react";
import { toColor } from "../utils/toColor.util";

/**
 * Returns a stateful [Color](https://github.com/Wondermarin/react-color-palette#color), and a function to update it.
 * @param model HEX.
 * @param initColor Color in HEX model (3-6 digit) or [HTML Color Names](https://www.w3.org/wiki/CSS/Properties/color/keywords).
 */
export function useColor(model: "hex", initColor: Color["hex"]): [Color, React.Dispatch<React.SetStateAction<Color>>];
/**
 * Returns a stateful [Color](https://github.com/Wondermarin/react-color-palette#color), and a function to update it.
 * @param model RGB.
 * @param initColor Color in RGB model.
 */
export function useColor(model: "rgb", initColor: Color["rgb"]): [Color, React.Dispatch<React.SetStateAction<Color>>];
/**
 * Returns a stateful [Color](https://github.com/Wondermarin/react-color-palette#color), and a function to update it.
 * @param model HSV.
 * @param initColor Color in HSV model.
 */
export function useColor(model: "hsv", initColor: Color["hsv"]): [Color, React.Dispatch<React.SetStateAction<Color>>];
export function useColor<M extends keyof Color, C extends Color[M]>(
  model: M,
  initColor: C
): [Color, React.Dispatch<React.SetStateAction<Color>>] {
  const getColor = useCallback(() => {
    if (model === "hex") {
      const color = initColor as Color["hex"];

      return toColor("hex", color);
    } else if (model === "rgb") {
      const color = initColor as Color["rgb"];

      return toColor("rgb", color);
    } else if (model === "hsv") {
      const color = initColor as Color["hsv"];

      return toColor("hsv", color);
    }

    return toColor("hex", "#000000");
  }, [model, initColor]);

  const [color, setColor] = useState(getColor);

  useEffect(() => {
    setColor(getColor);
  }, [getColor]);

  return [color, setColor];
}
