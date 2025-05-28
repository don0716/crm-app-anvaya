import { createContext, useContext, useEffect } from "react";

const UIContext = createContext();
const useUI = () => useContext(UIContext);
export default useUI;

export const UIProvider = ({ children }) => {
  function loadingUI() {
    return (
      <div className="card ">
        <div
          className="card-body d-flex justify-content-center align-items-center bg-warning"
          style={{ height: "60px", padding: "0.5rem" }}
        >
          <div
            className="spinner-border spinner-border-sm text-dark me-2"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mb-0 fw-semibold small">Loading...</p>
        </div>
      </div>
    );
  }

  function errorUI(errorMessage) {
    return (
      <div className="card ">
        <div
          className="card-body d-flex justify-content-center align-items-center bg-danger"
          style={{ height: "60px", padding: "0.5rem" }}
        >
          <p className="mb-0 fw-semibold small">ERROR: {errorMessage}</p>
        </div>
      </div>
    );
  }

  function messageUI(message) {
    return (
      <div className="card ">
        <div
          className="card-body d-flex justify-content-center align-items-center bg-success text-white"
          style={{ height: "60px", padding: "0.5rem" }}
        >
          <h4 className="mb-0 fw-semibold small"> {message}</h4>
        </div>
      </div>
    );
  }

  return (
    <UIContext.Provider value={{ loadingUI, errorUI, messageUI }}>
      {children}
    </UIContext.Provider>
  );
};
