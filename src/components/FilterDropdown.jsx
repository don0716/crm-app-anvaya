const FilterDropdown = ({setFilter, filter, agents, tags, isView = false, isAgentView = false  }) => {
    return (
            <div className="card mt-2">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        <h2 className="text-center">Sorting and Filtering</h2>
                    {(!isAgentView && !isView) && <button onClick={() => setFilter({ status: "", agentId: "",tags: "", source: "", priority: "",sortBy: ""})} className="btn btn-secondary">Clear Filters</button>}
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        {
                            (!isView )&& (
                                <div className="col-md-6">
                        <label  htmlFor="statusFilter" className="form-label mt-3" >Filter By Status:</label>
                        <select value={filter.status} onChange={(e) => setFilter(prev => ({...prev, status: e.target.value }))} className="form-select col-md-6" id="">
                        <option value="">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                        
                        </select>
                       </div>
                            )
                        }
                   {
                    (!isAgentView && (
                        <div className="col-md-6">
                    <label  htmlFor="salesAgentFilter" className="form-label mt-3" >Filter By Sales Agent:</label>
                     <select value={filter.agentId} onChange={(e) => setFilter(prev => ({...prev, agentId: e.target.value }))} className="form-select col-md-6" id="">
                        <option value="">All</option>
                        {
                            agents.map(agent => (
                                <option key={agent._id} value={agent._id} >{agent.name}</option>
                            ))
                        }
                    </select>
                   </div>
                    ) )
                   }
                   {
                    ((isView || isAgentView) && (
                        <div className="col-md-6">
                    <label  htmlFor="priority" className="form-label mt-3" >Filter By Priority:</label>
                     <select value={filter.priority} onChange={(e) => setFilter(prev => ({...prev, priority: e.target.value }))} className="form-select col-md-6" id="">
                        <option value="">All</option>
                        <option  value="High">High</option>
                        <option  value="Medium">Medium</option>
                        <option  value="Low">Low</option>
                    </select>
                   </div>
                    ))
                   }
                   {
                    (!isView && !isAgentView) && (
                        <>
                            <div className="col-md-6">
                    <label  htmlFor="tagsFilter" className="form-label mt-3" >Filter By Tags:</label>
                     <select value={filter.tags} onChange={(e) => setFilter(prev => ({...prev, tags: e.target.value }))} className="form-select col-md-6" id="">
                        <option hidden value="">Filter By Tags</option>
                        {
                            tags?.tag.map(tag => (
                                <option key={tag?._id} value={tag?.name} >{tag?.name}</option>
                            ))
                        }
                    </select>
                   </div>
                   <div className="col-md-6">
                    <label  htmlFor="sourceFilter" className="form-label mt-3" >Filter By Source:</label>
                     <select value={filter.source} onChange={(e) => setFilter(prev => ({...prev, source: e.target.value }))} className="form-select col-md-6" id="">
                        <option hidden value="">Filter By Source</option>
                            <option  value="Website">Website</option>
                            <option  value="Referral">Referral</option>
                            <option  value="Cold Call">Cold Call</option>
                        </select>
                   </div>
                        </>
                    )
                   }
                    </div>
                    <hr />

                <div className="">
                 <span><strong>Sort By:</strong> </span>
                {
                    (!isView && !isAgentView) && (
                        <span>
                            <input onChange={(e) => setFilter(prev => ({...prev, sortBy: e.target.value }))} name="sortBy" type="radio" value="priority" id="priority"/>
                <label className="m-2" htmlFor="priority">Priority</label>
                        </span>
                    )
                }

                <input onChange={(e) => setFilter(prev => ({...prev, sortBy: e.target.value }))} name="sortBy" value="timeToClose"  type="radio" className="" id="timeToClose"/>
                <label  htmlFor="timeToClose">Time To Close</label>
                </div>
                </div>
                
            </div>
    )
}

export default FilterDropdown