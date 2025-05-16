import { Link } from "react-router"

const Sidebar = () => {
    return (
        <div className="bg-dark text-white py-4">
            <div className="d-flex justify-content-between container">
                <h2>CRM App</h2>
                <div className="navbar">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={`/leads`} className="nav-link">Lead List</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/leads/new`} className="nav-link">Lead Form</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar