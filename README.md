# Employee Leave Management System

A web-based Employee Leave Management System developed as part of the Full Stack Development Internship Technical Round at ZOLLID Branding Solutions Pvt. Ltd.

The system allows employees to apply for leave, upload supporting documents, track leave status, and receive notifications. A predefined manager account can view employee leave requests, review supporting documents, approve or reject requests, and provide remarks.

---

## Project Duration

**28 July 2026 – 10 August 2026**

---

## Objective

The objective of this project is to build a functional and user-friendly Employee Leave Management System demonstrating:

* User authentication
* Role-based authorization
* Employee registration and login
* Manager authentication
* Leave application
* Leave history
* CRUD operations
* Supporting document uploads
* Leave approval and rejection workflow
* Manager remarks
* In-app notifications
* Database integration
* Protected routes
* Frontend and backend deployment

---

## Live Application

### Frontend

**Live Application:**
[PASTE YOUR NETLIFY URL HERE]

### Backend

**Backend API:**
[PASTE YOUR RENDER BACKEND URL HERE]

### GitHub Repository

**Repository:**
[PASTE YOUR GITHUB REPOSITORY URL HERE]

---

# Technology Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* Lucide React
* React Toastify

## Backend

* Node.js
* Express.js
* JWT (JSON Web Token)
* Multer
* bcrypt
* CORS
* dotenv

## Database

* MySQL
* mysql2

## File Storage

* Local server storage using Multer
* Uploaded files are stored in the backend `uploads` directory.

## Deployment

* Frontend: Netlify
* Backend: Render
* Database: MySQL hosted database

---

# Features

## Employee Features

### Employee Registration

Employees can create an account by providing their required details.

Registration includes:

* Employee ID
* Name
* Username
* Email
* Phone
* Department
* Password

Passwords are securely hashed before being stored in the database.

---

### Employee Login

Registered employees can log in using their credentials.

After successful authentication, the backend generates a JWT token.

The token is stored on the client side and used to access protected API routes.

---

### Employee Dashboard

The employee dashboard provides:

* Welcome message
* Leave statistics
* Apply Leave option
* Leave History option
* Notifications
* Profile information

---

### Apply Leave

Employees can submit a leave request containing:

* Leave Type
* Leave Reason
* Start Date
* End Date
* Supporting Document

Supporting documents can be uploaded as actual files.

Supported file formats include:

* PDF
* JPG
* JPEG
* PNG

The maximum file size is limited to 5 MB.

---

### Leave History

Employees can view all leave requests submitted by them.

Each leave request displays:

* Leave type
* Reason
* Start date
* End date
* Supporting document
* Current status
* Manager remarks

Leave status can be:

* Pending
* Approved
* Rejected

---

### Notifications

Employees receive in-app notifications when their leave request is:

* Approved
* Rejected

Notifications are displayed using toast notifications.

No email or SMS integration is required.

---

# Manager Features

The system contains a single predefined manager account.

Employees cannot create manager accounts.

---

## Manager Dashboard

The manager dashboard displays an overview of the system, including:

* Total employees
* Pending leave requests
* Approved requests
* Rejected requests

---

## Employee Management

The manager can view registered employees.

Employee information includes:

* Employee ID
* Name
* Username
* Email
* Phone
* Department
* Date joined

---

## Leave Request Management

The manager can view all leave requests submitted by employees.

The manager can:

* View employee information
* View leave details
* View leave reason
* View leave dates
* View uploaded supporting documents
* Approve leave requests
* Reject leave requests
* Add remarks before approving or rejecting

After the manager updates a request, the status is reflected in the employee's leave history.

---

# Authentication and Authorization

The application uses JWT-based authentication.

## Authentication Flow

1. User submits login credentials.
2. Backend verifies the credentials.
3. Password is compared with the hashed password.
4. If credentials are valid, a JWT token is generated.
5. The token is returned to the frontend.
6. The frontend stores the token.
7. The token is sent with protected API requests.
8. Backend middleware verifies the token.
9. Authorized users can access protected resources.

---

## Role-Based Access Control

The application supports two roles:

### Employee

Employees can:

* Access Employee Dashboard
* Apply for leave
* View their leave history
* View notifications
* View their profile

Employees cannot:

* Access Manager Dashboard
* View other employees' leave requests
* Approve leave
* Reject leave

### Manager

The manager can:

* Access Manager Dashboard
* View employees
* View all leave requests
* Approve leave
* Reject leave
* Add remarks
* View uploaded documents

---

# Manager Credentials

A predefined manager account is used.

```text
Username: manager@gcu.in
Password: YOUR_MANAGER_PASSWORD
```

Replace `YOUR_MANAGER_PASSWORD` with the actual password used in your deployed application.

No functionality is provided to create additional manager or admin accounts.

---

# Database Design

The application uses a relational MySQL database.

## Users Table

The `users` table stores employee and manager information.

Main fields include:

```text
id
employee_id
name
username
email
phone
department
password
role
created_at
```

The `role` field determines whether the user is an employee or manager.

Possible values:

```text
employee
manager
```

---

## Leaves Table

The `leaves` table stores employee leave requests.

Main fields include:

```text
id
user_id
leave_type
reason
start_date
end_date
document
status
remarks
created_at
```

The `user_id` field establishes the relationship between a leave request and the employee who submitted it.

---

## Notifications Table

The `notifications` table stores in-app employee notifications.

Main fields include:

```text
id
user_id
message
is_read
created_at
```

Notifications are associated with employees using `user_id`.

---

# Project Structure

The project is divided into separate frontend and backend applications.

```text
Employee-Leave-Management-System/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── server/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leaveController.js
│   │   ├── notificationController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── verifyManager.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# File Upload System

Supporting documents are uploaded using Multer.

The backend uses Multer's disk storage functionality to save uploaded files.

The general upload process is:

```text
Employee
    |
    v
Select Supporting Document
    |
    v
React Form
    |
    v
Axios / API Request
    |
    v
Express Backend
    |
    v
Multer
    |
    v
uploads/ Directory
    |
    v
File Path Stored in Database
```

The database stores the file path or reference rather than storing the complete file inside MySQL.

---

# Leave Approval Workflow

The complete workflow is:

```text
Employee Login
      |
      v
Apply Leave
      |
      v
Upload Supporting Document
      |
      v
Leave Status = Pending
      |
      v
Manager Login
      |
      v
View Leave Request
      |
      v
Review Details and Document
      |
      v
Approve / Reject
      |
      v
Add Manager Remarks
      |
      v
Status Updated
      |
      v
Notification Created
      |
      v
Employee Login / Dashboard
      |
      v
Employee Sees Updated Status
      |
      v
Employee Receives Notification
```

---

# API Structure

The backend provides REST APIs for authentication, leaves, users, and notifications.

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Leave Management

```text
POST /api/leaves
GET  /api/leaves/my
GET  /api/leaves
PUT  /api/leaves/:id/approve
PUT  /api/leaves/:id/reject
```

## User Management

```text
GET /api/users
GET /api/users/:id
```

## Notifications

```text
GET /api/notifications
PUT /api/notifications/:id/read
```

API routes may vary slightly depending on the current implementation in the deployed version.

---

# Security

The application implements several security mechanisms.

## Password Hashing

Passwords are hashed before being stored in the database.

The application uses `bcrypt` for password hashing.

## JWT Authentication

Protected requests require a valid JWT token.

## Protected Routes

Authentication middleware verifies the token before allowing access to protected resources.

## Manager Authorization

A separate manager verification middleware checks whether the authenticated user has the manager role.

This prevents employees from accessing manager functionality.

## Environment Variables

Sensitive configuration values are stored using environment variables.

Example:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=employee_leave_management

JWT_SECRET=your_jwt_secret

PORT=5000
```

Sensitive credentials are not committed to GitHub.

---

# Installation and Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL
* Git

---

## Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=employee_leave_management

JWT_SECRET=your_secret_key

PORT=5000
```

Start the backend:

```bash
npm start
```

Or, if the project uses a development script:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal.

Navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# Deployment

## Frontend

The React frontend is deployed using Netlify.

Production environment variable:

```env
VITE_API_URL=YOUR_RENDER_BACKEND_API_URL
```

---

## Backend

The Node.js and Express backend is deployed using Render.

Required environment variables are configured in the Render dashboard.

```env
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
JWT_SECRET=...
PORT=...
```

---

## Database

The application uses a MySQL relational database hosted remotely.

The deployed backend connects to the production database using environment variables.

---

# Demo Workflow

The following workflow can be demonstrated during the project evaluation.

## Step 1 - Employee Login

Log in using an employee account.

## Step 2 - Apply Leave

Navigate to:

```text
Apply Leave
```

Enter:

* Leave type
* Leave reason
* Start date
* End date

Upload a supporting document.

Submit the request.

The initial status will be:

```text
Pending
```

## Step 3 - Manager Login

Log out from the employee account.

Log in using:

```text
Username: manager@gcu.in
Password: YOUR_MANAGER_PASSWORD
```

## Step 4 - Review Leave

Navigate to:

```text
Manager Portal -> Leave Requests
```

The manager can view:

* Employee details
* Leave type
* Reason
* Dates
* Supporting document
* Current status

## Step 5 - Approve or Reject

The manager can approve or reject the request and provide remarks.

## Step 6 - Employee Verification

Log back in as the employee.

The employee can see the updated status:

```text
Status: Approved
```

or:

```text
Status: Rejected
```

The manager's remarks are also displayed.

The employee receives an in-app notification regarding the updated leave request.

---

# UI and UX

The application uses Tailwind CSS to provide a clean and responsive interface.

The UI includes:

* Responsive dashboard
* Sidebar navigation
* Dashboard statistics
* Forms with validation
* Tables for leave requests
* Status indicators
* Toast notifications
* Modal and popup interactions
* Responsive layouts
* Hover effects
* Clear navigation between pages

The application is designed to provide a consistent experience across desktop and smaller screen sizes.

---

# Main Pages

## Employee Portal

```text
Login
Register
    |
    v
Employee Dashboard
    |
    +-- Dashboard
    +-- Apply Leave
    +-- Leave History
    +-- Notifications
    +-- Profile
```

## Manager Portal

```text
Manager Login
    |
    v
Manager Dashboard
    |
    +-- Dashboard
    +-- Employees
    +-- Leave Requests
    +-- Notifications
```

---

# System Architecture

The application follows a client-server architecture.

```text
                    +----------------------+
                    |   React Frontend     |
                    |       Netlify        |
                    +----------+-----------+
                               |
                         HTTP / REST API
                               |
                               v
                    +----------------------+
                    | Node.js + Express    |
                    |       Render         |
                    +----------+-----------+
                               |
                    +----------+----------+
                    |                     |
                    v                     v
          +----------------+     +----------------+
          | MySQL Database |     | File Storage   |
          |                |     | uploads/       |
          +----------------+     +----------------+
```

---

# Design Decisions

## Why React?

React was selected for the frontend because it provides:

* Component-based architecture
* Reusable UI components
* Efficient state management
* Easy routing
* Large ecosystem

## Why Node.js and Express?

Node.js and Express provide a lightweight and efficient backend for building REST APIs.

They also allow the frontend and backend to communicate easily using HTTP requests.

## Why MySQL?

MySQL is suitable for this application because the system contains structured relational data such as:

* Users
* Leave requests
* Notifications

Relationships can be maintained using foreign keys.

## Why JWT?

JWT provides a stateless authentication mechanism.

After successful login, the server generates a token that is used to authenticate subsequent protected requests.

## Why Multer?

Multer is used to process `multipart/form-data` requests and handle actual file uploads from the employee leave application form.

## Why Local File Storage?

For this internship project, supporting documents are stored using backend local storage through Multer.

This keeps the implementation simple and demonstrates the required file upload functionality without depending on an external file-storage service.

For a production-scale system, cloud object storage would be a more suitable solution.

---

# Database Relationships

The primary relationship between users and leaves is:

```text
Users
  |
  | 1
  |
  | Many
  v
Leaves
```

An employee can submit multiple leave requests.

The relationship between users and notifications is:

```text
Users
  |
  | 1
  |
  | Many
  v
Notifications
```

An employee can have multiple notifications.

---

# Access Control

| Feature                   | Employee | Manager |
| ------------------------- | -------: | ------: |
| Register                  |      Yes |      No |
| Login                     |      Yes |     Yes |
| Employee Dashboard        |      Yes |      No |
| Apply Leave               |      Yes |      No |
| View Own Leave History    |      Yes |      No |
| View All Employees        |       No |     Yes |
| View All Leave Requests   |       No |     Yes |
| Approve Leave             |       No |     Yes |
| Reject Leave              |       No |     Yes |
| Add Manager Remarks       |       No |     Yes |
| View Supporting Documents |       No |     All |
| View Notifications        |      Yes |     Yes |
| Create Manager Account    |       No |      No |

---

# Sample Data

The deployed application contains sample employee accounts and leave requests for demonstration.

## Manager Account

```text
Username: manager@gmail.com
Password: 123456
```

## Employee Account

```text
Username: alice@gmail.com
Password: alice
```

Replace the employee credentials with the sample account available in the deployed application.

---

# Important Notes

* Do not commit `.env` files to GitHub.
* Do not expose database passwords or JWT secrets in the source code.
* Uploaded files are stored on the backend server.
* For production-scale applications, object storage such as Amazon S3 or another cloud storage service would be more suitable.
* The manager account is predefined.
* Additional manager or administrator accounts cannot be created through the application.

---

# Future Enhancements

Possible future improvements include:

* Cloud-based document storage
* Email notifications
* SMS notifications
* Forgot password functionality
* Advanced employee search
* Leave balance management
* Holiday calendar
* Multiple managers with permissions
* Admin dashboard
* Attendance integration
* Advanced reporting and analytics
* Export leave reports to Excel or PDF
* Audit logs
* Advanced role and permission management

---

# Developer

**Tharun H S**

B.E. Computer Science Engineering
Garden City University, Bengaluru

---

# Internship Project

**Technical Round - Full Stack Development Internship**

**ZOLLID Branding Solutions Pvt. Ltd.**

**Project:** Employee Leave Management System

**Project Duration:** 28 July 2026 - 10 August 2026

