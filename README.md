##  Anvaya CRM – PRD Checklist

This checklist outlines the essential features, modules, and workflows planned for the Anvaya CRM application. Use this to track progress and ensure key components are delivered as per product scope.

---

### 📁 Core Modules

- [ ] Lead Management
  - [ ] Create new lead
  - [ ] Assign sales agent
  - [ ] Set lead status, source, tags, priority
  - [ ] Estimate time to close
  - [ ] Filter/sort leads
  - [ ] Update/delete lead
- [ ] Comments Section
  - [ ] Add comment to a lead
  - [ ] Display author & timestamp
  - [ ] Update/delete comment (optional)
- [ ] Sales Agent Management
  - [ ] Create new agent
  - [ ] View all agents
  - [ ] Assign agents to leads
- [ ] Lead Views
  - [ ] Lead List View
  - [ ] Lead Details View
  - [ ] Lead Status View (grouped by status)
  - [ ] Sales Agent View (grouped by agent)

---

### 📊 Reports & Charts

- [ ] Total Leads in Pipeline (bar chart)
- [ ] Leads Closed Last Week (bar or pie chart)
- [ ] Leads by Sales Agent (bar chart)
- [ ] Lead Status Distribution (pie or bar chart)
- [ ] Charts powered by Chart.js

---

### ⚙️ Filters & Sorting

- [ ] URL-based filters:
  - [ ] `?status=Qualified`
  - [ ] `?salesAgent=John`
  - [ ] `?source=Website`
  - [ ] Combine filters: `?status=New&salesAgent=Jane`
- [ ] Sorting:
  - [ ] Time to Close
  - [ ] Priority

---

### 🧠 Context Management (useContext)

- [ ] `LeadContext` – Manage leads, comments, filters
- [ ] `AgentContext` – Manage sales agents
- [ ] `ReportContext` – Store/report preprocessed stats
- [ ] `UIContext` – Sidebar, modal, loading state

---

### 🧩 UI Layout

- [ ] Sidebar Navigation
- [ ] Dashboard Page
- [ ] Lead List Page
- [ ] Lead Details Page
- [ ] Sales Agent Management Page
- [ ] Reports Page
- [ ] Add/Edit Modals/Forms

---

### 📝 Tags (Lead Categorization)

- [ ] Follow-up
- [ ] High Value
- [ ] Hot Lead
- [ ] Cold Lead
- [ ] Demo Scheduled
- [ ] Needs Nurturing
- [ ] VIP
- [ ] Interested
- [ ] Do Not Disturb
- [ ] Budget Confirmed

---

### 🚀 Stretch Goals / Future

- [ ] Auth system (Login, Role-based access)
- [ ] Activity timeline per lead
- [ ] Lead reminder notifications
- [ ] Export to CSV / PDF

---

_This PRD checklist is a living document and will evolve with feature updates and feedback._
