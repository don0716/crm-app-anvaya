import { Link } from "react-router";
import useLeads from "../../contexts/LeadContext";
import { useEffect } from "react";
import useAgent from "../../contexts/AgentContext";
import { useFetch } from "../../hooks/useFetch";
import FilterDropdown from "../../components/FilterDropdown";
import useUI from "../../contexts/UIContext";

const LeadList = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const { loading, filteredLeads, filter, setFilter, fetchLeads, error, message } = useLeads();
  const { agents } = useAgent();
  const { data: tags } = useFetch(`${API_URL}/tags`);
  const { loadingUI, errorUI, messageUI } = useUI();

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const renderLeadCard = (lead) => (
    <div
      key={lead._id}
      className="list-group-item py-3 px-4 d-flex justify-content-between align-items-start"
    >
      <div className="me-3 flex-grow-1">
        <h5 className="mb-1">{lead.name}</h5>
        <div className="mb-2">
          <span className="badge bg-secondary me-1">Status: {lead.status}</span>
          <span className="badge bg-info text-dark me-1">Source: {lead.source}</span>
          <span className="badge bg-warning text-dark">Priority: {lead.priority}</span>
        </div>
        <div>
          <small>
            Agent:{" "}
            {lead.salesAgent?.name ? (
              <span className="text-success fw-semibold"><strong>{lead.salesAgent.name}</strong></span>
            ) : (
              <span className="text-danger">Not Assigned</span>
            )}
          </small>
        </div>
      </div>
      <div>
        <Link to={`/leads/${lead._id}`} className="btn btn-sm btn-outline-primary">
          View Details
        </Link>
      </div>
    </div>
  );

  const renderLeadsOverview = () => (
    <div className="card shadow-sm mb-4">
      <div className="card-header text-center bg-primary text-white">
        <h4 className="mb-0">Leads Overview</h4>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {filteredLeads.map(renderLeadCard)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">All Leads</h2>
        <Link
          to={`/leads/new`}
          state={{ agents: agents, tags: tags?.tag }}
          className="btn btn-success"
        >
          + Add New Lead
        </Link>
      </div>

      {loading
        ? loadingUI()
        : error
        ? errorUI(error)
        : filteredLeads.length === 0
        ? messageUI("No Leads Found")
        : renderLeadsOverview()}

      <div className="my-4">
        <FilterDropdown agents={agents} setFilter={setFilter} filter={filter} tags={tags} />
      </div>
    </div>
  );
};

export default LeadList;
