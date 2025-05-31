import { useLocation } from "react-router";
import useLeads from "../../contexts/LeadContext";
import { useEffect } from "react";
import useAgent from "../../contexts/AgentContext";
import { useFetch } from "../../hooks/useFetch";
import FilterDropdown from "../../components/FilterDropdown";
import useUI from "../../contexts/UIContext";

const LeadStatusView = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const {
    loading: leadsLoading,
    error: leadsError,
    message: leadsMessage,
    filteredLeads,
    filter,
    setFilter,
    fetchLeads,
  } = useLeads();
  const { agents, loading: agentLoading, error: agentError } = useAgent();
  const { loadingUI, messageUI, errorUI } = useUI();
  const { data: tags } = useFetch(`${API_URL}/tags`);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusFromUrl = params.get("status");

  useEffect(() => {
    setFilter((prev) => ({ ...prev, status: statusFromUrl }));
  }, [statusFromUrl]);

  useEffect(() => {
    fetchLeads();
  }, []);

  function getPriorityBadge(priority) {
    switch (priority) {
      case "High":
        return <span className="badge bg-danger ms-2">High</span>;
      case "Medium":
        return <span className="badge bg-warning text-dark ms-2">Medium</span>;
      case "Low":
        return <span className="badge bg-success ms-2">Low</span>;
      default:
        return null;
    }
  }

  function leadsOverview() {
    return (
      <div className="container">
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white text-center">
            <h4 className="mb-0">Leads Overview</h4>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col text-center">
                <strong>Viewing Status:</strong>{" "}
                <span className="text-primary fw-semibold">{statusFromUrl}</span>
              </div>
            </div>
            <div className="row row-cols-1 g-3">
              {filteredLeads.map((lead) => (
                <div key={lead._id} className="col">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">
                          {lead.name} {getPriorityBadge(lead.priority)}
                        </h5>
                        <p className="mb-0">
                          <strong>Sales Agent:</strong>{" "}
                          {lead.salesAgent?.name ? (
                            lead.salesAgent.name
                          ) : (
                            <span className="text-danger fst-italic">Not Assigned</span>
                          )}
                        </p>
                      </div>
                      <span className="badge bg-secondary">{lead.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    );
  }

  return (
    <div className="container my-4">
      {leadsLoading || agentLoading
        ? loadingUI()
        : leadsError || agentError
        ? errorUI(leadsError || agentError)
        : filteredLeads?.length === 0
        ? <h4 className="text-center text-muted">---- No Leads Found ----</h4>
        : leadsOverview()}
        <FilterDropdown
          agents={agents}
          setFilter={setFilter}
          filter={filter}
          tags={tags}
          isView={true}
        />
    </div>
  );
};

export default LeadStatusView;
