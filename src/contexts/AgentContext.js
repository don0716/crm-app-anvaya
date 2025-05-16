import { createContext, useContext } from "react";

const AgentContext = createContext();
const useAgent = () => useContext(AgentContext);
export default useAgent;

export const AgentProvider = ({ children }) => {
  return <AgentContext.Provider value="">{children}</AgentContext.Provider>;
};
