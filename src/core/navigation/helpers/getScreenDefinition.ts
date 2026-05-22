import { screenRegistry } from "../ScreenRegistry";

export const getScreenDefinition = (screenKey: string) => {
  return screenRegistry[screenKey];
};
