import { useEffect, useState } from "react";
import useAgent from "../../contexts/AgentContext";
import useUI from "../../contexts/UIContext";
import { useNavigate } from "react-router";

const AgentList = () => {
  const { agents, loading, error, addAgent, deleteAgent, message } = useAgent();
  const [addAgentDisplay, setAddAgentDisplay] = useState(false);
  const { loadingUI, errorUI, messageUI } = useUI();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
    });
    if (addAgentDisplay) setAddAgentDisplay(false); // close form on successful add (optional)
  }, [agents]);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addAgent(formData);
  };

  function agentList() {
    if (!agents.length)
      return (
        <p className="text-center text-muted fst-italic my-3">
          No agents found. Please add some.
        </p>
      );

    return (
      <div className="list-group shadow-sm mb-4">
        {agents.map((agent) => (
          <div
            onClick={() => navigate(`/agents-view?salesAgent=${agent._id}`) }
            key={agent._id}
            className="list-group-item d-flex justify-content-between align-items-center rounded mb-2"
          >
            <div>
              <strong>{agent.name}</strong>{" "}
              <small className="text-muted">- {agent.email}</small>
            </div>
            <button
              onClick={() => deleteAgent(agent._id)}
              className="btn btn-outline-danger btn-sm"
              title="Delete Agent"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    );
  }

  function addAgentForm() {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Add New Agent</h5>
          <form onSubmit={submitHandler}>
            <input
              value={formData.name}
              className="form-control mb-3"
              placeholder="Enter Agent Name"
              type="text"
              name="name"
              onChange={inputHandler}
              required
              autoFocus
            />
            <input
              value={formData.email}
              type="email"
              name="email"
              className="form-control mb-3"
              onChange={inputHandler}
              placeholder="Enter Agent Email Address"
              required
            />
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Add Agent
              </button>
              <button
                type="button"
                onClick={() => setAddAgentDisplay(false)}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {loading
        ? loadingUI()
        : error
        ? errorUI(error)
        : message
        ? messageUI(message)
        : ""}

      {agentList()}

      {!addAgentDisplay && (
        <button
          onClick={() => setAddAgentDisplay(true)}
          className="btn btn-primary d-block mx-auto"
        >
          Add New Agent
        </button>
      )}

      {addAgentDisplay && addAgentForm()}
    </div>
  );
};

export default AgentList;
