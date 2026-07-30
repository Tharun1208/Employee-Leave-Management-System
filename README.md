# Employee Leave Management System

## Project Overview

The Employee Leave Management System is a web-based application developed to manage employee leave requests digitally. The system provides role-based access for employees and managers.

Employees can apply for leave, upload supporting documents, track leave status, and receive notifications when their requests are approved or rejected.

Managers can manage employees, review leave requests, view uploaded documents, approve or reject requests, and provide remarks.

## Project Duration

28 July 2026 - 10 August 2026

## Features

### Employee Module

* Employee registration and login
* JWT-based authentication
* Employee dashboard
* Apply leave request
* Upload supporting documents (PDF/Image)
* View leave history
* View leave status:

  * Pending
  * Approved
  * Rejected
* View manager remarks
* Receive in-app notifications

### Manager Module

* Predefined manager login
* Manager dashboard
* View all employees
* Edit employee details
* Delete employees
* View all leave requests
* View leave details
* View uploaded supporting documents
* Approve leave requests
* Reject leave requests
* Add remarks during approval/rejection

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify
* Lucide React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer File Upload

### Database

* MySQL

## Project Structure

```
Employee-Leave-Management-System

├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   └── App.jsx
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── uploads
│   ├── config
│   └── server.js
│
└── README.md
```

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE employee_leave_management;
```

Required tables:

* users
* leaves
* notifications

## Backend Setup

Go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_leave_management

JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

## Frontend Setup

Go to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

## Authentication

### Manager Credentials

```
Username:
manager@gcu.in

Password:
(Your configured manager password)
```

Only the predefined manager account can access the Manager Portal.

## Application Workflow

### Employee Workflow

1. Login
2. Apply leave
3. Upload supporting document
4. Submit request
5. View leave history
6. Receive approval/rejection notification

### Manager Workflow

1. Login
2. Open Manager Dashboard
3. View employee leave requests
4. View uploaded documents
5. Approve or reject request
6. Add remarks

### Final Status Update

1. Employee logs in again
2. Views updated leave status
3. Receives notification

## Security Implementation

* JWT authentication
* Protected routes
* Role-based authorization
* Manager-only portal access
* Secure document access

## Future Enhancements

* Email notifications
* Leave balance calculation
* Attendance integration
* Admin dashboard
* Cloud deployment

## Author

Tharun H S

## License

This project is developed for educational purposes.


Login Creditional 
manager:
email:manager@gmail.com
password:123456