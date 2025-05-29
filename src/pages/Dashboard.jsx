import { Link, useNavigate } from "react-router";
import useLeads from "../contexts/LeadContext";
import { useEffect } from "react";
import useAgent from "../contexts/AgentContext";
import useUI from "../contexts/UIContext";
import { useFetch } from "../hooks/useFetch";

const Dashboard = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const { filteredLeads, setFilter, loading, error } = useLeads();
  const { agents } = useAgent();
  const { loadingUI, errorUI } = useUI();
  const statusList = ["New", "Contacted", "Qualified", "Closed"];
  const {data: tags} = useFetch(`${API_URL}/tags`)
  console.log(tags)
  useEffect(() => {
    setFilter([]);
  }, []);

  const statusCounts = filteredLeads?.reduce(
    (acc, lead) => {
      const status = lead.status;
      if (status === "New") acc.new++;
      else if (status === "Contacted") acc.contacted++;
      else if (status === "Qualified") acc.qualified++;
      else if (status === "Closed") acc.closed++;
      return acc;
    },
    { new: 0, contacted: 0, qualified: 0, closed: 0 }
  );

  if (loading) return loadingUI();
  if (error) return errorUI(error);

  return (
    <div className="container-fluid">
      <h2 className="mb-3">Dashboard Overview</h2>

      {/* All Leads */}
      <section className="mb-5">
        <h4 className="mb-3">All Leads</h4>
        <div className="d-flex flex-wrap gap-2">
          {filteredLeads.map((lead) => (
            <button
              key={lead._id}
              className="btn btn-outline-dark btn-sm rounded-pill"
              onClick={() => navigate(`/leads/${lead._id}`)}
            >
              {lead.name}
            </button>
          ))}
        </div>
      </section>

      {/* Sales Agents */}
      <section className="mb-5">
        <h4 className="mb-3">Sales Agents</h4>
        <div className="row g-4">
          {agents.map((agent, index) => (
            <div key={agent._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">{agent.name}</h5>
                    <p className="text-muted">Agent #{index + 1}</p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/agents-view?salesAgent=${agent._id}`)
                    }
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Agent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Status Cards */}
      <section className="mb-5">
        <h4 className="mb-3">Lead Status Overview</h4>
        <div className="row g-4">
          {statusList.map((status) => {
            const count = statusCounts[status.toLowerCase()];
            const statusColors = {
              New: "primary",
              Contacted: "info",
              Qualified: "success",
              Closed: "secondary",
            };

            return (
              <div key={status} className="col-sm-6 col-lg-3">
                <div className={`card border-${statusColors[status]} shadow-sm`}>
                  <div className={`card-body text-${statusColors[status]}`}>
                    <h5 className="card-title">{status}</h5>
                    <p className="card-text mb-3">
                      <strong>{count}</strong> Lead{count !== 1 ? "s" : ""}
                    </p>
                    <button
                      className={`btn btn-sm btn-${statusColors[status]}`}
                      onClick={() =>
                        navigate(`/status-view?status=${status}`)
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="mb-3">
        <div className="d-flex flex-wrap gap-2">
          <Link
            to={`/leads/new`}
            state={{ agents: agents, tags: tags?.tag }}
            className="btn btn-success"
          >
            + Add New Lead
          </Link>
          
          <Link to={`/sales-agents`} state={{ agents: agents, tags: tags?.tag }} className="btn btn-outline-primary">
            + Add New Agent
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
