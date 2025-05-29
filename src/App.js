import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeadList from "./pages/leads/LeadList";
import LeadForm from "./pages/leads/LeadForm";
import LeadDetails from "./pages/leads/LeadDetails";
import Sidebar from "./layout/Sidebar";
import LeadStatusView from "./pages/views/LeadStatusView";
import SalesAgentView from "./pages/views/SalesAgentView";
import ReportsAndVisualization from "./pages/reports/ReportsAndVisualization";
import { AgentProvider } from "./contexts/AgentContext";
import { UIProvider } from "./contexts/UIContext";
import { LeadProvider } from "./contexts/LeadContext";
import AgentList from "./pages/agents/AgentList";
import Dashboard from "./pages/Dashboard";
import Header from "./layout/Header";

function App() {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
  return (
    <>
      <UIProvider>
        <AgentProvider>
          <LeadProvider>
            <Router>
              <Header />
              <div className="d-flex" style={{ minHeight: "100vh" }}>
                <Sidebar />
                <main
                  className="flex-grow-1 p-4 bg-light"
                  style={{ minHeight: "100vh", overflowY: "auto" }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/leads" element={<LeadList />} />
                    <Route path="/leads/new" element={<LeadForm />} />
                    <Route
                      path="/leads/edit/:id"
                      element={<LeadForm isEditLead={true} />}
                    />
                    <Route path="/leads/:id" element={<LeadDetails />} />
                    <Route path="/status-view" element={<LeadStatusView />} />
                    <Route path="/agents-view" element={<SalesAgentView />} />
                    <Route path="/sales-agents" element={<AgentList />} />
                    <Route
                      path="/reports"
                      element={<ReportsAndVisualization />}
                    />
                  </Routes>
                </main>
              </div>
            </Router>
          </LeadProvider>
        </AgentProvider>
      </UIProvider>
    </>
  );
}

export default App;
