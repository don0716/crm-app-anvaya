import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AgentContext = createContext();
const useAgent = () => useContext(AgentContext);
export default useAgent;

export const AgentProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
  }, [agents, error]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/agents`);
      if (res.data.agentsData.length > 0) {
        setAgents(res.data?.agentsData);
        setLoading(false);
      } else {
        setError("No Agents Found");
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);

  const addAgent = async (agentData) => {
    try {
      const res = await axios.post(`${API_URL}/agents`, agentData);
      console.log(res.data);
      setMessage("Added Agent Successfully.");
      fetchAgents();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const deleteAgent = async (agentId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/agents/${agentId}`);
      if (res.status === 200) {
        setAgents((prev) => prev.filter((agent) => agent._id !== agentId));
        setMessage("Deleted Agent Successfully.");
        setLoading(false);
      }
      await fetchAgents();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <AgentContext.Provider
      value={{ agents, loading, error, addAgent, deleteAgent, message }}
    >
      {children}
    </AgentContext.Provider>
  );
};
