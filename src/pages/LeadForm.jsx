import { useState } from "react"

const LeadForm = () => {
    const [formData, setFormData] = useState({
        leadName: "",
        leadSource: "dropdown, referral, website, coldCall, etc",
        assignedSalesAgent: "dropdown: new, contacted, qualified, proposalSent, closed",
        tags: "radio: highvalue, FolowUp, etc",
        timeToClose: "estimated time in days to clsoe the deal",
        priority: "dropdown: high,medium , low"
    })

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const inputHandler = (e) => {
        const {value, name, checked} = e.target

    }

    return (
        <div className="container">
            <h1>Lead Form</h1>

            <div className="row">
                <div className="col-md-6">
                <form onSubmit={submitHandler}>
                        <label htmlFor="leadName">Name of Potential Customer or Company:</label>
                        <input type="text" name="leadName" id="leadName" value={formData.leadName} className="form-control" onChange={inputHandler} />

                        <label htmlFor="leadSource">Select Lead Source: </label>
                        <select className="form-select" name="leadSource" id="leadSource">
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="Cold Call">Cold Call</option>
                        </select>

                        <label htmlFor="assignedSalesAgent">Select The Assigned Sales Agent: </label>
                        <select className="form-select" name="assignedSalesAgent" id="assignedSalesAgent">
                            <option value="nameOfAgents"></option>
                        </select>

                        <label htmlFor="leadStatus">Select Lead Status: </label>
                        <select className="form-select" name="leadStatus" id="leadStatus">
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                        </select>

                        <label htmlFor="tags" className="form-label">Select Tags:</label><br />
                        <input type="radio" name="tags" value="High Value" />High Value <br />
                        <input type="radio" name="tags" value="Follow Up" />Follow Up <br />
                        <input type="radio" name="tags" value="Hot Lead" />Hot Lead <br />
                        <input type="radio" name="tags" value="Cold Lead" />Cold Lead <br />
                        <input type="radio" name="tags" value="Long Term" />Long Term <br />


                        <label htmlFor="timeToClose">Estimated Time to Close the deal: </label>
                        <input type="number" name="timeToClose" id="timeToClose" value={formData.timeToClose} className="form-control" onChange={inputHandler} />

                        <label htmlFor="priority">Select Lead Status: </label>
                        <select className="form-select" name="priority" id="priority">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        
                        <button type="submit" className="btn btn-primary">Add Lead</button>

            </form>
                </div>
            </div>


        </div>
    )
}

export default LeadForm