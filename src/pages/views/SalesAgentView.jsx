import { useLocation } from "react-router";
import useAgent from "../../contexts/AgentContext";
import useLeads from "../../contexts/LeadContext";
import { useEffect } from "react";
import FilterDropdown from "../../components/FilterDropdown";

const SalesAgentView = () => {
  const { agents, loading, error } = useAgent();
  const { setFilter, tags, filter, filteredLeads } = useLeads();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const agentIdFromUrl = params.get("salesAgent");

  const agentData = agents.find((agent) => agent._id === agentIdFromUrl);
  const agentName = agentData?.name || "Anonymous";

  useEffect(() => {
    setFilter((prev) => ({ ...prev, agentId: agentIdFromUrl }));
  }, [agentIdFromUrl, setFilter]);

  if (loading) return <div className="text-center my-5">Loading agents...</div>;
  if (error) return <div className="alert alert-danger my-5 text-center">{error}</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center fw-bold">Lead List by {agentName}</h2>

      {filteredLeads.length === 0 ? (
        <p className="text-center fst-italic">No leads found for this agent.</p>
      ) : (
        <ol className="list-group list-group-numbered mb-4">
          {filteredLeads.map((lead) => (
            <li key={lead._id} className="list-group-item">
              {lead.name}
            </li>
          ))}
        </ol>
      )}

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-0">Sales Agent: {agentName}</h5>
        </div>
      </div>

      <div>
        <FilterDropdown
          agents={agents}
          setFilter={setFilter}
          filter={filter}
          tags={tags}
          isAgentView={true}
        />
      </div>
    </div>
  );
};

export default SalesAgentView;
