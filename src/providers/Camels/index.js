import { createContext, useState } from "react";

import { initializeCamels } from "../../utils/defaults";

const initialState = {
  camels: initializeCamels(),
};

export const CamelsContext = createContext({
  state: { ...initialState },
  setState: () => {},
});

const CamelProvider = ({ children }) => {
  const [camels, setCamels] = useState(initialState.camels);

  const value = {
    state: {camels},
    setCamels,
  };

  return (
    <CamelsContext.Provider value={value}>{children}</CamelsContext.Provider>
  );
};

export default CamelProvider;
