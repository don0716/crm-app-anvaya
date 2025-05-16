import { createContext, useContext } from "react";

const UIContext = createContext();
const useUI = () => useContext(UIContext);
export default useUI;

export const UIProvider = ({ children }) => {
  return <UIContext.Provider value="">{children}</UIContext.Provider>;
};
