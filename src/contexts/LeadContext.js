import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LeadContext = createContext();
const useLeads = () => useContext(LeadContext);
export default useLeads;

export const LeadProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [leads, setLeads] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    agentId: "",
    tags: "",
    source: "",
    priority: "",
    sortBy: "",
  });
  // Effects
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
  }, [leads, error, comments]);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterQuery();
  }, [filter, leads]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/leads`);
      if (res.data.length > 0) {
        setLeads(res.data);
        setLoading(false);
      } else {
        setError("No Leads Found");
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addLead = async (newLead) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/leads`, newLead);
      if (res.data.message) {
        setLoading(false);
        setMessage(res.data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const editLead = async (leadId, updatedLead) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/leads/${leadId}`, updatedLead);
      if (res.data.message) {
        setMessage(res.data.message);
        setLoading(false);
        fetchLeads();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteLead = async (leadId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/leads/${leadId}`);
      if (res.data.message) {
        setMessage(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const addComment = async (commentData, leadId) => {
    setLoading(true);
    try {
      console.log("CommentData form", commentData);
      const res = await axios.post(
        `${API_URL}/leads/${leadId}/comments`,
        commentData
      );
      console.log(res.data);
      if (res.data.message) {
        setMessage(res.data.message);
        setLoading(false);
        fetchLeads();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchComments = async (leadId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/leads/${leadId}/comments`);
      setComments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId, leadId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/comments/${commentId}`);
      if (res.data.message) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
        setLoading(false);
        setMessage(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const filterQuery = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.status) params.append("status", filter.status);
      if (filter.agentId) params.append("salesAgent", filter.agentId);
      if (filter.source) params.append("source", filter.source);
      if (filter.tags) params.append("tags", filter.tags);
      if (filter.priority) params.append("priority", filter.priority);
      if (filter.sortBy) params.append("sortBy", filter.sortBy);

      const response = await axios.get(`${API_URL}/leads?${params.toString()}`);
      let leadsData = response.data;

      if (filter.sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        leadsData.sort(
          (a, b) =>
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        );
      }

      if (filter.sortBy === "timeToClose") {
        leadsData.sort((a, b) => (a.timeToClose || 0) - (b.timeToClose || 0));
      }
      setLoading(false);
      setFilteredLeads(leadsData);
    } catch (error) {
      setFilteredLeads([]);
      setLoading(false);
    }
  };

  return (
    <LeadContext.Provider
      value={{
        fetchLeads,
        leads,
        loading,
        error,
        filter,
        setFilter,
        addLead,
        addComment,
        filterQuery,
        filteredLeads,
        editLead,
        fetchComments,
        comments,
        setComments,
        setComments,
        deleteLead,
        deleteComment,
        message,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};
