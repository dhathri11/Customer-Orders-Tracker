# Customer Orders Tracker

## Overview

Customer Orders Tracker is a full-stack web application that helps businesses manage customer details and purchase records. It allows users to add, update, search, and view customer information along with their purchase history in one place.

## Features

* User Authentication (Login & Logout)
* Add, Edit, Delete Customers
* Search Customers
* Add and Manage Purchase History
* View Customer Purchase Records
* Responsive User Interface
* Secure REST APIs

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Token)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd customer-orders-tracker
```

### 2. Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Backend

```bash
npm run dev
```

### 5. Start the Frontend

```bash
npm run dev
```

## Project Structure

```text
customer-orders-tracker/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

## Future Enhancements

* Dashboard with sales analytics
* PDF invoice generation
* Email notifications
* Export purchase history to Excel/PDF
* Role-based access (Admin/Staff)
* Dark mode

## Author

**Gattupalli D S V Naga Sai Mani Deepika**
