import { Link, useNavigate, useParams } from "react-router";
import useLeads from "../../contexts/LeadContext";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useAgent from "../../contexts/AgentContext";
import useUI from "../../contexts/UIContext";

const LeadDetail = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const leadId = useParams();
  const {
    leads,
    addComment,
    comments,
    setComments,
    fetchComments,
    fetchLeads,
    deleteLead,
    deleteComment,
    loading: leadLoading,
    error: leadError,
    message: leadMessage,
  } = useLeads();
  const leadData = leads.find((lead) => lead._id === leadId.id);
  const { agents, fetchAgents, loading: agentLoading } = useAgent();
  const { data: tags } = useFetch(`${API_URL}/tags`);
  const { loadingUI, errorUI, messageUI } = useUI();

  const [commentData, setCommentData] = useState({
    commentText: "",
    author: "",
  });

 
  useEffect(() => {
    const initializeData = async () => {
      if(leadId.id) {
        setComments([])
        await fetchComments(leadId.id)
      }
      await fetchAgents()
      await fetchLeads()
    }
    initializeData()

  }, [leadId.id])
  
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(commentData)
    await addComment(commentData, leadId.id);
    setCommentData({ commentText: "", author: "" });
    await fetchComments(leadId.id);
  };

  function leadDetailsJSX() {
    return (
      <div className="card shadow-sm my-4">
        <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
          <h4 className="mb-0">{leadData?.name}</h4>
          <button
            onClick={async () => {
              await deleteLead(leadData?._id);
              navigate(`/leads`)
            }}
            className="btn btn-sm btn-danger"
            title="Delete Lead"
          >
            Delete Lead
          </button>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <strong>Sales Agent:</strong>{" "}
                {leadData?.salesAgent?.name || "Not Assigned"}
              </p>
              <p>
                <strong>Lead Source:</strong> {leadData?.source}
              </p>
              <p>
                <strong>Lead Status:</strong> {leadData?.status}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Tags:</strong> {leadData?.tags?.join(", ")}
              </p>
              <p>
                <strong>Priority:</strong> {leadData?.priority}
              </p>
              <p>
                <strong>Time To Close:</strong>{" "}
                {leadData?.timeToClose > 1
                  ? `${leadData?.timeToClose} Days`
                  : `${leadData?.timeToClose} Day`}
              </p>
            </div>
          </div>

          <Link
            to={`/leads/edit/${leadData?._id}`}
            state={{ agents: agents, tags: tags?.tag, lead: leadData, leadId }}
            className="btn btn-outline-primary mb-4"
          >
            Edit Lead
          </Link>

          <hr />

          <h5 className="text-center mb-3">Comments</h5>
          {comments?.length > 0 ? (
            <div className="list-group mb-4">
              {comments.map((comment) => (
                
                <div
                  key={comment._id}
                  className="list-group-item list-group-item-action mb-2 shadow-sm rounded"
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-1">
                        <strong>Author:</strong>{" "}
                        {comment.author?.name || "Anonymous"}
                      </p>
                      <small className="text-muted">
                        {new Date(comment.createdAt).toLocaleDateString()}{" "}
                        at {new Date(comment.createdAt).toLocaleTimeString()}
                      </small>
                      <p className="mt-2 mb-0">{comment.commentText}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => deleteComment(comment._id, leadId.id)}
                        className="btn btn-outline-danger btn-sm"
                        title="Delete Comment"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted fst-italic">
              No Comments Found!
            </p>
          )}

          <hr />

          <h5 className="text-center mb-3">Add a Comment</h5>
          <form onSubmit={onSubmitHandler}>
            <select
              value={commentData.author}
              name="author"
              onChange={inputHandler}
              className="form-select mb-3"
              required
            >
              <option value="" disabled>
                Select An Agent
              </option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>

            <div className="form-floating mb-3">
              <textarea
                value={commentData.commentText}
                onChange={inputHandler}
                className="form-control"
                name="commentText"
                id="textarea"
                placeholder="Leave a comment"
                style={{ minHeight: "100px" }}
                required
              />
              <label htmlFor="textarea">Leave a comment:</label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      { leadMessage
        && messageUI(leadMessage)}

      {leadLoading || agentLoading
        ? loadingUI()
        : leadError
        ? errorUI(leadError) : leadDetailsJSX()}
    </div>
  );
};

export default LeadDetail;
