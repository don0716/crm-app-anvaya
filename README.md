##  Anvaya CRM – PRD Checklist

This checklist outlines the essential features, modules, and workflows planned for the Anvaya CRM application.

---

### Core Modules

- [x] Lead Management
  - [x] Create new lead
  - [x] Assign sales agent
  - [x] Set lead status, source, tags, priority
  - [x] Filter/sort leads
  - [x] Update/delete lead
- [x] Comments Section
  - [x] Add comment to a lead
  - [x] Display author & timestamp
  - [x] delete comment
- [x] Sales Agent Management
  - [x] Create new agent
  - [x] View all agents
  - [x] Assign agents to leads
- [x] Lead Views
  - [x] Lead List View
  - [x] Lead Details View
  - [x] Lead Status View (grouped by status)
  - [x] Sales Agent View (grouped by agent)

---
### Pages and Features on each Page.

- [x] Dashboard Page
  - [x] All Leads Section.
  - [x] Sales Agent View
  - [x] Lead Status overview with number of leads per status.
  - [x] Add new lead and add new agent Buttons that take us to the respective pages.
- [x] Leads Page
  - [x] Leads Overview with status, source and priority badge for each Lead and displays Sales agent of that Lead.
  - [x] If Sales Agent is deleted, displays Not assigned.
  - [x] Details button that takes us to the details of that Lead.
  - [x] Sorting and Filtering Component.
- [x] Lead Details Page.
  - [x] Lead Details and delete button to delete Lead.
  - [x] Edit Lead Button that Takes us to Lead form to edit lead.
  - [x] Comments Section. Displays comments and allows us to Add Comment by selecting sales agent as author of the comment.
  - [x] delete button next to each comment allows to delete individual comment.
  - [x] Automatically renders page when each comment or deleted.
- [x] Lead Form Component. (Edit or Add Lead)
  - [x] Add Lead Form when adding a lead. After New Lead is added. we are automatically redirected to the leads Page.
  - [x] On successfully lead edit. we are redirected to lead details page.
- [x] Sales Agents Page
  - [x] View All Sales Agents and button to delete each sales agent.
  - [x] buton to add new Sales Agent.
- [x]  Sales Agent View Page.
  - [x]  Displays All Leads by the selected Sales Agent.
  - [x]  Filtering options to filter by status and priority and sort by time to close.
- [x]  Lead Status Page.
  - [x]  All Leads from the selected Lead status are displayed.
  - [x]  Filtering options to filter by Sales agent and priority and sort by time to close.

  

---

###  Reports & Charts

- [x] Total Leads Closed By Agents. x - Sales Agent, y - number of leads closed. (bar chart)
- [x] Leads Status Distribution (pie chart)
- [x] Leads in pipeline and leads closed(last Week) (Pie Chart)
- [x] Charts powered by Chart.js

---

###  Filters & Sorting
- [x] URL-based filters:
  - [x] `?status=Qualified`
  - [x] `?salesAgent=John`
  - [x] `?source=Website`
  - [x] Combine filters: `?status=New&salesAgent=Jane`
- [x] Sorting:
  - [x] Time to Close
  - [x] Priority

---
### Filter Form
- [x] filterDropdown component that can be reused for Agent and leads view
- [x] Filter by status, Tags, Sales Agents, Priority and Source. Each set differently based on page requirement.
- [x] Sort By priority and timeToClose
- [x] clear Filter Button to refresh filters to default.

---

###  Context Management (useContext)

- [x] `LeadContext` – Add Leads, Delete and update Leads, filter query in backend with url query parameters, add and delete Comments.
- [x] `AgentContext` – Manage sales agents - Add, Delete Sales Agent.
- [x] `UIContext` –  loading, error and message.

---

###  UI Layout

- [x] Sidebar Navigation
- [x] Loading, error and message bar shown at the top level of page.
- [x] Header - Displays the page detail
- [x] Dashboard Page
- [x] Lead List Page
- [x] Lead Details Page
- [x] Sales Agent Management Page (Add and Delete Sales Agent.)
- [x] Agent view and lead status view pages.
- [x] Reports Page. (Pie Charts and Bar Chart)
- [x] Add/Edit Lead Form

---

###  Tags (Lead Categorization)

- [x] Dynamically adds tags from backend.

---

###  Stretch Goals / Future

- [ ] Auth system (Login, Role-based access)

---

_This PRD checklist is a living document and will evolve with feature updates and feedback._
