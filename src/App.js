import { BrowserRouter as Router, Routes, Route } from "react-router";
import LeadList from "./pages/LeadList";
import LeadForm from "./pages/LeadForm";
import LeadDetails from "./pages/LeadDetails";
import Sidebar from "./layout/Sidebar";
import LeadStatusView from "./pages/LeadStatusView";
import SalesAgentView from "./pages/SalesAgentView";
import ReportsAndVisualization from "./pages/ReportsAndVisualization";
import { AgentProvider } from "./contexts/AgentContext";
import { UIProvider } from "./contexts/UIContext";
import { ReportProvider } from "./contexts/ReportContext";
import { LeadProvider } from "./contexts/LeadContext";

function App() {
  return (
    <>
      <UIProvider>
        <ReportProvider>
          <AgentProvider>
            <LeadProvider>
              <Router>
                <Sidebar />
                <Routes>
                  <Route path="/leads" element={<LeadList />} />
                  <Route path="/leads/new" element={<LeadForm />} />
                  <Route path="/leads/:id" element={<LeadDetails />} />
                  <Route path="/status-view" element={<LeadStatusView />} />
                  <Route path="/sales-agents" element={<SalesAgentView />} />
                  <Route
                    path="/reports"
                    element={<ReportsAndVisualization />}
                  />
                </Routes>
              </Router>
            </LeadProvider>
          </AgentProvider>
        </ReportProvider>
      </UIProvider>
    </>
  );
}

export default App;
