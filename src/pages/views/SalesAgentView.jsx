import { useEffect } from "react";
import { useLocation } from "react-router";
import useAgent from "../../contexts/AgentContext";
import useLeads from "../../contexts/LeadContext";
import useUI from "../../contexts/UIContext";
import FilterDropdown from "../../components/FilterDropdown";

const SalesAgentView = () => {
  const { agents, loading: agentLoading, error: agentError } = useAgent();
  const {
    setFilter,
    tags,
    filter,
    filteredLeads,
    loading: leadsLoading,
    error: leadsError,
    message: leadsMessage,
  } = useLeads();
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
    <section className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white text-center">
        <h4 className="mb-0 fw-bold">Leads Handled by {agentName}</h4>
      </div>
      <div className="card-body">
        {filteredLeads.length === 0 ? (
          <div className="alert alert-info text-center">
            No leads found for this agent.
          </div>
        ) : (
          <ol className="list-group list-group-numbered">
            {filteredLeads.map((lead) => (
              <li key={lead._id} className="list-group-item d-flex justify-content-between align-items-center">
                {lead.name}
                {lead.status && <span className="badge bg-secondary">{lead.status}</span>}
              </li>
            ))}
          </ol>
        )}

        <div className="card mt-4 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="text-muted mb-2">Agent Details</h6>
            <p className="mb-1"><strong>Name:</strong> {agentName}</p>
            {agentData?.email && <p className="mb-1"><strong>Email:</strong> {agentData.email}</p>}
            {agentData?.phone && <p><strong>Phone:</strong> {agentData.phone}</p>}
          </div>
        </div>
      </div>
    </section>
  );



  // if (!agentIdFromUrl) {
  //   return (
  //     <div className="container my-5">
  //       <div className="alert alert-warning text-center">
  //         No sales agent selected. Please use a valid link or choose from the dropdown.
  //       </div>
  //       {renderFilters()}
  //     </div>
  //   );
  // }

  return (
    <div className="container my-4">
      {leadsMessage && messageUI()}
      {leadsLoading || agentLoading
        ? loadingUI()
        : leadsError || agentError
        ? errorUI()
        : renderLeadList()}
        
      <section className="mb-5">
            <FilterDropdown
              agents={agents}
              setFilter={setFilter}
              filter={filter}
              tags={tags}
              isAgentView={true}
            />
      </section>
    </div>
  );
};

export default SalesAgentView;
