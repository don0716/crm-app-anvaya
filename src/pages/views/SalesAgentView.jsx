import { useEffect } from "react";
import { useLocation } from "react-router";
import useAgent from "../../contexts/AgentContext";
import useLeads from "../../contexts/LeadContext";
import useUI from "../../contexts/UIContext";
import FilterDropdown from "../../components/FilterDropdown";

const SalesAgentView = () => {
  const { agents, loading: agentLoading , error:agentError } = useAgent();
  const { setFilter, tags, filter, filteredLeads, loading: leadsLoading, error: leadsError, message: leadsMessage } = useLeads();
  const { loadingUI, errorUI, messageUI } = useUI();

  const location = useLocation();
  const agentIdFromUrl = new URLSearchParams(location.search).get("salesAgent");

  const agentData = agents?.find((agent) => agent._id === agentIdFromUrl);
  const agentName = agentData?.name || "Anonymous";

  useEffect(() => {
    if (agentIdFromUrl) {
      setFilter((prev) => ({ ...prev, agentId: agentIdFromUrl }));
    }
  }, [agentIdFromUrl, setFilter]);

  const renderLeadList = () => (
    <section className="card shadow-sm my-4">
      <div className="card-header bg-primary text-white text-center">
        <h4 className="mb-0 fw-bold">Leads by {agentName}</h4>
      </div>
      <div className="card-body">
        {filteredLeads.length === 0 ? (
          <p className="text-center text-muted fst-italic">No leads found for this agent.</p>
        ) : (
          <ol className="list-group list-group-numbered mb-4">
            {filteredLeads?.map((lead) => (
              <li key={lead._id} className="list-group-item">
                {lead.name}
              </li>
            ))}
          </ol>
        )}
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <h6 className="mb-0 text-muted">Agent Info</h6>
            <p className="mb-0">Name: <strong>{agentName}</strong></p>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFilters = () => (
    <section className="my-4">
      <FilterDropdown
        agents={agents}
        setFilter={setFilter}
        filter={filter}
        tags={tags}
        isAgentView={true}
      />
    </section>
  );

  if (!agentIdFromUrl) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center">
          No sales agent selected. Please use a valid link.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {leadsMessage && messageUI()}
      {leadsLoading || agentLoading ? loadingUI() : leadsError || agentError ? errorUI() : renderLeadList()}
      {renderFilters()}
    </div>
  );
};

export default SalesAgentView;
