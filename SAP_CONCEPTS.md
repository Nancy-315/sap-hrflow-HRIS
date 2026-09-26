# SAP HCM Concepts & Enterprise HRIS Learning Guide

This document accompanies the **SAP HRFlow** portfolio project developed by **Nancy F** (MBA — HR & Systems, Mother Teresa Women's University, Chennai, 2026). It explains the fundamental concepts of enterprise human resource information systems inspired by SAP Human Capital Management (HCM).

---

## ⚠️ Important Educational Scope & Boundaries

### What This Project Does:
- Demonstrates how standard enterprise HR processes (hiring, promotion, relocation, attendance, leave, probation, exit) can be digitally structured.
- Simulates the logical relationships between Organizational Units, Jobs, Positions, and Persons (O-C-S-P model).
- Illustrates infotype-style modular data maintenance (Personal Data, Org Assignment, Addresses, Absences).
- Provides interactive workflows that emulate enterprise governance (e.g. employee update requests routed to HR review rather than direct unmonitored edits).

### What This Project Does NOT Do:
- **It does NOT connect to any SAP system** (no RFC, BAPI, OData, or SAP NetWeaver connectors).
- **It does NOT execute real SAP transaction codes** (PA30, PA40, PPOME are referenced conceptually only).
- **It does NOT represent an official SAP product or implementation.**
- **It is strictly an independent, educational simulation.**

---

## 1. Personnel Administration (PA)
In SAP HCM, Personnel Administration is the central repository for maintaining employee-related master data across their organizational tenure.
- **Infotype Concept:** Rather than one massive flat table, SAP stores data in modular time-dependent structures called *Infotypes*:
  - **IT0001 (Organizational Assignment):** Ties employee to Company Code, Personnel Area, Subarea, Employee Group, Subgroup, and Cost Center.
  - **IT0002 (Personal Data):** Biographical details, name, date of birth, gender, nationality.
  - **IT0006 (Addresses):** Permanent and temporary residential locations, emergency contacts.
  - **IT0008 (Basic Pay):** Salary grades, wage types, compensation brackets.
  - **IT2001 (Absences):** Casual, sick, earned leaves.

---

## 2. Organizational Management (OM)
Organizational Management provides the architectural blueprint of the enterprise. Unlike PA, which is person-centric, OM is structure-centric.
- **Standard SAP OM Objects:**
  - **Organizational Unit [O]:** Represents business functional entities (e.g. Human Resources, Information Technology, Operations).
  - **Job [C]:** A generic description of work tasks (e.g. "Software Engineer", "HR Specialist").
  - **Position [S]:** An individual, concrete slot staffed by an employee or currently vacant (e.g. "Lead ERP Application Developer", "Senior Talent Specialist").
  - **Person [P]:** The employee assigned to a position.
- **Relationships:**
  - `O incorporates O` (Sub-department hierarchy)
  - `S describes C` (Position inherits Job classification)
  - `S belongs to O` (Position allocated to Org Unit)
  - `P occupies S` (Person holds Position)
  - `S reports to S` (Supervisory chain of command)

---

## 3. Personnel Actions (PA40)
A Personnel Action is an orchestrated sequence of infotypes triggered to document significant lifecycle milestones:
- **Hiring Action:** Generates a new Employee ID, records personal demographics (IT0002), establishes enterprise organizational assignment (IT0001), links to a position, and activates employment status.
- **Transfer Action:** Reassigns an employee to a new department, reporting manager, cost center, or geographic personnel area.
- **Promotion Action:** Upgrades the employee's position title and salary grade.
- **Confirmation Action:** Concludes the probationary evaluation period and transitions the employee to regular permanent status.
- **Leaving / Separation Action:** Triggers notice period calculations, knowledge transfer handover checklists, asset returns, final payroll settlement, and changes employee status to *Exited (Status 0)*.

---

## 4. Time Management (PT)
Time Management covers both positive and negative time recording:
- **Positive Time Recording:** Capturing clock-in and clock-out timestamps via biometric or card swipe readers, calculating daily working hours, late arrivals, half-days, and overtime.
- **Absence & Quota Management (IT2006):** Pre-allocated entitlement pools for Casual Leave (CL), Sick Leave (SL), Earned Leave (EL), and Optional Holidays (OH). When an employee applies for leave and HR approves, the quota pool is decremented automatically.

---

## 5. Employee Self-Service (ESS) & Manager Self-Service (MSS)
Digital enterprise portals designed to reduce administrative overhead:
- **Employee Self-Service (ESS):** Enables personnel to inspect their personal profile, submit address change requests, check leave quota balances, submit absence requests, view departmental reporting trees, and download certificates.
- **Manager Self-Service (MSS):** Enables department heads to review and approve leave requests, conduct performance appraisals, and initiate transfer or promotion recommendations.

---

## 6. Enterprise System Thinking & Data Governance
A key insight demonstrated in SAP HRFlow is **controlled data modification**. In consumer applications, users freely edit their profile details. In enterprise HRIS systems:
- Changing sensitive master data (Bank Account, Residential Address, Tax Status) requires formal ticket submission and four-eye verification by the HR Operations desk to prevent fraud and maintain statutory payroll compliance.
