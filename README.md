# Anvaya CRM App
Anvaya CRM is a web app to manage, track, and close leads with ease. It streamlines the lead lifecycle — from creation to closure — with features like sales agent assignment, status tracking, per-lead comments, and URL-based filters. You can add or remove agents anytime and assign each lead to a specific agent. Built with React, Express, and MongoDB, Anvaya also offers clear charts and reports on lead distribution, agent performance, and pipeline health.

---

## Demo Link

 [Live Demo](https://crm-app-anvaya.vercel.app/)

---
## Quick Start

```
git clone https://github.com/don0716/crm-app-anvaya.git
cd <your-repo>
npm install
npm run dev  # or `npm start` / `yarn dev`
```

---
## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## Demo Video
Watch a walkthrough 4 minute video of all the major features of this app:
[Loom Video Link](https://www.loom.com/share/226bb549a10a486b9436facb470779ab?sid=04e5c13a-0adc-4d30-bf74-1fdf79d236ab)

---

### Pages and Features on each Page.
#### **Dashboard Page**
  - [x] All Leads Section.
  - [x] Sales Agent View
  - [x] Lead Status overview with number of leads per status.
  - [x] Add new lead and add new agent Buttons that take us to the respective pages.
#### **Leads Page**
  - [x] Leads Overview with status, source and priority badge for each Lead and displays Sales agent of that Lead.
  - [x] If Sales Agent is deleted, displays Not assigned.
  - [x] Details button that takes us to the details of that Lead.
  - [x] Sorting and Filtering Component.
#### **Lead Details Page**
  - [x] Lead Details and delete button to delete Lead.
  - [x] Edit Lead Button that Takes us to Lead form to edit lead.
  - [x] Comments Section. Displays comments and allows us to Add Comment by selecting sales agent as author of the comment.
  - [x] delete button next to each comment allows to delete individual comment.
  - [x] Automatically renders page when each comment is added or deleted.
#### **Lead Form Component. (Edit or Add Lead)**
  - [x] Add Lead Form when adding a lead. After New Lead is added. we are automatically redirected to the leads Page.
  - [x] On successfully lead edit. we are redirected to lead details page.
#### **Sales Agents Page**
  - [x] View All Sales Agents and button to delete each sales agent.
  - [x] Buton to add new Sales Agent.
#### **Sales Agent View Page**
  - [x]  Displays All Leads by the selected Sales Agent with the status of each lead.
  - [x]  Displays Agent Details - Name and Email.
  - [x]  Filtering options to filter by status and priority and sort by time to close radio button.
#### **Lead Status Page**
  - [x]  All Leads from the selected Lead status are displayed.
  - [x]  Filtering options to filter by Sales agent and priority and sort by time to close.
####  Reports & Charts
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
###  Stretch Goals / Future
- [ ] Auth system (Login, Role-based access)

---

## API REFERENCE
[Github Link to API Reference readme of CRM BACKEND](https://github.com/don0716/crm-app-backend/blob/main/README.md)
[CRM BACKEND CODE](https://github.com/don0716/crm-app-backend/tree/main)

---

## Contact
For bugs or feature requrest, please reach out to donmonteiro16@gmail.com
---

_This PRD checklist is a living document and will evolve with feature updates and feedback._
