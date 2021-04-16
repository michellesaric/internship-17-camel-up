import { useContext } from "react";
import { CamelsContext } from ".";

const useCamelsContext = () => {
  return useContext(CamelsContext);
};

export const useCamels = () => {
  const {
    state: { camels },
    setCamels,
  } = useCamelsContext();

  return [camels, setCamels];
};
