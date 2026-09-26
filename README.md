# SAP HRFlow — A Practical SAP HCM-Inspired HRIS Simulation

> **Educational & Portfolio Disclaimer:**
> **SAP HRFlow** is an independent educational and portfolio project inspired by common SAP HCM/HRIS concepts. It is **not** an official SAP product, does **not** connect to real SAP systems, and does **not** represent an SAP implementation. All employee records, organizational units, attendance logs, leave balances, and transaction workflows shown are **fictional demonstration data**.

---

## 📌 Project Overview
**SAP HRFlow** is an interactive, enterprise-grade Human Resource Information System (HRIS) simulation designed to bridge strategic MBA human resource knowledge with enterprise digital systems architecture. 

While analytical dashboards (such as *PeoplePulse HR*) focus on retrospective workforce reporting, **SAP HRFlow** is built specifically for **operational HR systems execution**:
- Personnel Administration (Master Data & Infotypes)
- Organizational Management (O-C-S-P Hierarchies)
- Personnel Actions (PA40 Hiring, Promotion, Transfer, Confirmation, Separation)
- Positive Time Management & Shift Attendance
- Absence Quotas & Leave Approvals
- Employee Self-Service (ESS) & Manager Self-Service (MSS)
- End-to-End 14-Stage Employee Lifecycle Workflows

---

## 👩‍💼 Developer Information
- **Developer Name:** Nancy F
- **Academic Qualification:** MBA — Human Resources & Systems
- **University:** Mother Teresa Women's University
- **Location:** Chennai, Tamil Nadu, India
- **Career Focus:** HRIS / SAP HR / SAP HCM / HR Systems / Digital HR / HR Technology
- **Project Year:** 2026

---

## 🚀 Key Features

### 1. Dual Role-Based Interfaces
- **HR Administrator View:** Complete command center for workforce headcount, master data maintenance, organizational trees, leave queue approvals, personnel actions audit, offboarding clearances, and reporting.
- **Employee Self-Service (ESS) View:** Personalized portal for employees to review master data, request updates via HR tickets (governance rule: no uncontrolled direct edits), view department organizational reporting lines, check leave quota balances, submit absence requests, and inspect training certifications.

### 2. SAP HCM Process Simulator
Interactive multi-step wizards that write directly to the browser's persistent `LocalStorage` database:
1. **Hiring Simulation (PA40 Hire):** Personal Data (IT0002) → Employment Terms → Org Assignment (IT0001) → Position Link (OM Relationship B008) → Onboarding Checklist → Active Status.
2. **Transfer Simulation (PA40 Transfer):** Inter-departmental and inter-plant mobility (Chennai ↔ Bangalore ↔ Coimbatore) with Before/After state comparison and approval auditing.
3. **Promotion Simulation (PA40 Promotion):** Position title elevation, salary grade adjustment, and executive rationale logging.
4. **Leave & Absence Simulation (IT2001 & IT2006):** ESS submission → HR Admin decision queue → Real-time quota balance deduction.
5. **Separation & Exit Simulation (PA40 Leaving):** 60-day notice period tracking, knowledge transfer sign-off, IT asset recovery, full and final settlement (FnF), and status transition to *Exited*.

### 3. Organizational Management (SAP OM)
- Hierarchical tree visualizing the enterprise blueprint of **ABC Manufacturing Pvt. Ltd.** (Chennai, India).
- Models standard SAP OM relationships: **Organizational Units (O)**, **Job Roles (C)**, **Positions (S)**, and **Persons (P)**.
- Direct reporting manager lines, cost center tags (`CC-HR-101`, `CC-IT-201`, etc.), and position vacancy status.

### 4. Interactive 14-Stage Employee Lifecycle
Visual timeline mapping each employee lifecycle milestone directly to its enterprise SAP concept:
1. Selection
2. Hiring Action (PA40)
3. Master Data Creation (IT0002 / IT0006)
4. Organizational Assignment (IT0001)
5. Onboarding & Induction
6. Probation Assessment
7. Permanent Confirmation Action
8. Active Operational Employment
9. Performance Review & Goal Alignment
10. Learning & Development (LSO)
11. Promotion / Organizational Transfer
12. Notice Period Servicing
13. Multi-Department Separation Clearances
14. Final Settlement & Archiving (Status 0)

### 5. Enterprise HR Reports Studio
10 exportable operational reports with instant CSV download and search filtering:
- Headcount Report
- Employee Master Data Report
- Organizational Units Report
- Personnel Actions Audit Log
- Daily Swipe Attendance Register
- Leave & Absence Quotas Report
- Performance Appraisal Scorecards
- Training & Competency Register
- Lifecycle Distribution Report
- Separation & Clearances Report

---

## 🛠️ Technology Stack
- **Framework:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS with enterprise SAP Fiori-inspired color palette
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (Headcount by department, lifecycle distribution, hiring trends, leave status)
- **Routing:** React Router v6 with SPA rewrites (`vercel.json`)
- **Data Persistence:** Client-Side `LocalStorage` engine with reactive cross-tab event dispatching and one-click demo data reset.

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/sap-hrflow-hris.git

# Navigate into project directory
cd sap-hrflow

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will launch at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Landing Page |
| :--- | :--- | :--- | :--- |
| **HR Administrator** | `admin@hrflow.demo` | `HRFlow@123` | `/dashboard` |
| **Employee (Self-Service)** | `employee@hrflow.demo` | `Employee@123` | `/employee` |

*(Quick one-click demo buttons are provided on the login page for effortless evaluation.)*

---

## ☁️ Deployment Instructions (Vercel)
See [`VERCEL_DEPLOYMENT.md`](./VERCEL_DEPLOYMENT.md) for full step-by-step instructions.

---

## 📄 License & Attribution
Independent educational and portfolio project developed by **Nancy F** (MBA HR & Systems, 2026).
Not affiliated with, endorsed by, or connected to SAP SE or its affiliates.
