import { createContext, useContext } from "react";

const LeadContext = createContext();
const useLead = () => useContext(LeadContext);
export default useLead;

export const LeadProvider = ({ children }) => {
  return <LeadContext.Provider value="">{children}</LeadContext.Provider>;
};
