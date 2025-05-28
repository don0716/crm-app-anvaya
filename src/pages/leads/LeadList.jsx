import { Link } from "react-router";
import useLeads from "../../contexts/LeadContext";
import { useEffect } from "react";
import useAgent from "../../contexts/AgentContext";
import { useFetch } from "../../hooks/useFetch";
import FilterDropdown from "../../components/FilterDropdown";
import useUI from "../../contexts/UIContext";

const LeadList = () => {
  const backendUrl = `http://localhost:3005`;
  const { loading, filteredLeads, filter, setFilter, fetchLeads, error } = useLeads();
  const { agents } = useAgent();
  const { data: tags } = useFetch(`${backendUrl}/tags`);
  const { loadingUI, errorUI, messageUI } = useUI();

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const leadsOverview = () => (
    <div className="card shadow-sm">
      <div className="card-header text-center bg-primary text-white">
        <h4 className="mb-0">Leads Overview</h4>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {filteredLeads.map((lead) => (
            <div key={lead._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{lead.name}</strong> <br />
                <small className="text-muted">
                  Status: {lead.status} | Source: {lead.source} | Priority: {lead.priority}
                </small>
                <br />
                <small>
                  Agent:{" "}
                  {lead.salesAgent?.name ? (
                    <span className="text-success">{lead.salesAgent.name}</span>
                  ) : (
                    <span className="text-danger">Not Assigned</span>
                  )}
                </small>
              </div>
              <Link to={`/leads/${lead._id}`} className="btn btn-sm btn-outline-primary">
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h2 className="my-4">All Leads</h2>

      {loading
        ? loadingUI()
        : error
        ? errorUI(error)
        : filteredLeads.length === 0
        ? messageUI("No Leads Found")
        : leadsOverview()}

      <div className="my-4">
        <FilterDropdown agents={agents} setFilter={setFilter} filter={filter} tags={tags} />
      </div>

      <div className="d-grid gap-2 my-3">
        <Link
          to={`/leads/new`}
          state={{ agents: agents, tags: tags?.tag }}
          className="btn btn-success"
        >
          + Add New Lead
        </Link>
      </div>
    </div>
  );
};

export default LeadList;

