import { createContext, useContext } from "react";

const ReportContext = createContext();
const useReport = () => useContext(ReportContext);
export default useReport;

export const ReportProvider = ({ children }) => {
  return <ReportContext.Provider value="">{children}</ReportContext.Provider>;
};
