# 🚀 Employee Management System (Spring Boot + Next.js)

A modern **Employee Management System** built with:
* 🌐 **Spring Boot** (Backend REST API)
* ⚛️ **Next.js** with TypeScript (Frontend)
* 🛡️ **JWT-based Authentication** & Authorization
* 🧑‍💼 Role-based Access Control: `ADMIN` & `EMPLOYEE`
* 📅 Employee Scheduling, Attendance Tracking, Profiles

## 📁 Project Structure

```
📦 Employee-Management-System
├── backend/
│   ├── src/main/java/com/yasirukaveeshwara/employee_management
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── config/
│   │   └── Application.java
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── middleware.ts
│   └── public/
```

## 🌟 Features

### 🔐 Authentication & Authorization
* Secure login with **JWT**
* **Token stored in HTTP-only cookies** for middleware support
* Role-based access (admin vs employee)

### 🧑 Admin Capabilities
* Add/Edit/Delete any employee
* Assign employees to **shift schedules**
* View all employee profiles & schedules
* View attendance history per employee

### 👷 Employee Capabilities
* View own profile and update info
* View assigned schedules
* **Mark IN / OUT** attendance (once per day)
* View personal attendance history

### 🧠 Intelligent Middleware (Next.js 13+)
* Auto-redirect to login if token is missing
* Middleware restricts unauthorized routes before rendering

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, Tailwind CSS, Axios |
| Backend | Spring Boot (REST API) |
| Auth | JWT (Bearer Token) |
| Database | PostgreSQL |
| Styling | Tailwind CSS |
| State Mgmt | Local State + useEffect |
| Middleware | Next.js Middleware (Auth) |

## 🔧 Setup Instructions

### 🛠️ Configuration

Create a `application.properties` file in the `backend/src/main/resources` directory of the backend project with the following content:

```properties
spring.application.name=employee-management
spring.datasource.url= <your postgresql url (jdbc:postgresql://localhost:5432/employee_management)>
spring.datasource.username= <your username (default: postgres)>
spring.datasource.password= <your password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
jwt.secret=<your hash>
server.port=8081
```

Ensure that PostgreSQL is running and a database named `employee_management` is created before starting the backend.

### 🚀 Backend Setup (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

* Runs on `http://localhost:8081`
* APIs available under `/api/auth`, `/api/admin`, `/api/employee`

### 🌐 Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

* Runs on `http://localhost:3000`

### 🔑 Default Admin Credentials

The default admin credentials for initial login are:

* **Username:** `admin`
* **Password:** `admin`

## 🌐 API Overview

### 🔒 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with username/password |

### 👤 Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/employees` | List all users |
| POST | `/api/admin/employee` | Add user |
| PUT | `/api/admin/employee/{id}` | Update user |
| DELETE | `/api/admin/employee/{id}` | Delete user |
| GET | `/api/admin/schedules` | View all schedules |
| POST | `/api/admin/schedule/{id}` | Assign schedule |
| GET | `/api/admin/profile` | Admin profile |
| PUT | `/api/admin/profile` | Update admin profile |

### 👷 Employee Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employee/profile` | Get own profile |
| PUT | `/api/employee/profile` | Update own profile |
| GET | `/api/employee/schedules` | View assigned schedules |
| POST | `/api/employee/attendance?type=IN/OUT` | Mark attendance |
| GET | `/api/employee/attendance` | View attendance history |


## 👨‍💻 Author

* Yasiru Kaveeshwara
