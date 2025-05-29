import {  useLocation } from "react-router"
import useLeads from "../../contexts/LeadContext"
import { useEffect, useState } from "react"
import useAgent from "../../contexts/AgentContext"
import { useFetch } from "../../hooks/useFetch"
import FilterDropdown from "../../components/FilterDropdown"

const LeadStatusView = () => {
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    const {loading, filteredLeads, filter, setFilter, fetchLeads} = useLeads()
    const {agents} = useAgent()
    const  {data: tags} = useFetch(`${API_URL}/tags`)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const statusFromUrl = params.get("status")
    
    useEffect(() => {
        setFilter((prev) => ({...prev, status: statusFromUrl }))
    }, [filter.status])

    useEffect(() => {
        fetchLeads()
    }, [])

    function leadsOverview() {
        return (
            <div className="card">
                <div className="text-center card-header">
                    <h1>Lead Overview</h1>
                </div>
                <div className="card-body">
                    <div className="list-group">
                {
                    
                        filteredLeads?.map((lead) => (
                        <div key={lead._id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <div>
                                    {lead.name} | {lead.priority} 
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
                </div>
                <div className="card-body">
                    <strong>Status:</strong> {statusFromUrl}
                </div>
            </div>
        )
    }

    

    
    

    
    return (
        <div>

            {loading ? "Loading..." : filteredLeads?.length === 0 ? <h4 className="text-center">---- No Leads Found ----</h4> : leadsOverview() }

            <hr />

            <div className="list-group">
                {
                    filteredLeads?.map((lead, index) => (
                        <div key={lead._id} className="list-group-item">
                            Lead {index + 1} - {lead.name}  <strong>[Sales Agent: {lead.salesAgent?.name || <span className="text-danger">Not Assigned Yet</span>}]</strong>
                        </div>
                    ))
                }
            </div>

            <hr />
            


            {<FilterDropdown agents={agents} setFilter={setFilter} filter={filter} tags={tags} isView={true} />}
            
        </div>
    )
}

export default LeadStatusView