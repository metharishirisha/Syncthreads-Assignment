# **Syncthreads Assignment**  

## **Overview**  
This project is a full-stack React application with a secure authentication system, a dashboard displaying card components, and a map integration using OpenLayers. The backend is built with Node.js and Express, using SQLite as the database. Authentication is implemented with JWT, and the frontend uses Bootstrap for styling.

## **Objective**    
- **React Development**: Building modular components and implementing routing.  
- **Authentication**: Implementing secure user authentication using JWT.  
- **API Design**: Creating RESTful APIs using Node.js and Express.  
- **UI/UX Principles**: Designing a visually appealing and responsive interface.  
- **Map Integration**: Using OpenLayers to display maps dynamically.  

---

## **Tech Stack**  
### **Frontend:**  
- React.js  
- React Router  
- OpenLayers (for map integration)  
- Axios (for API requests)  
- Bootstrap (for styling)  
- js-cookie (for handling JWT in cookies)  

### **Backend:**  
- Node.js  
- Express.js  
- SQLite (Database)  
- bcrypt (for password hashing)  
- jsonwebtoken (for authentication)  

---

## **Features**  

### **Authentication:**  
- Users can log in using their credentials.  
- JWT token is generated on successful login.  
- Token is stored in cookies for authentication.  

### **Dashboard:**  
- Displays cards fetched from the backend.  
- Clicking on a card navigates to the Map View.  

### **Map View:**  
- Displays the map using OpenLayers.  
- Shows a zoomed-out view of India initially.  
- Allows zooming in and out.  

### **Protected Routes:**  
- If the user is not logged in, the dashboard and map view show **"User not logged in"**.  
- JWT is verified before fetching dashboard and map data.  

---

## **Project Setup & Installation**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/maniyadhav997/SyncthreadsAssignment.git
cd syncthreads-assignment
```

### **2️⃣ Install Dependencies**  
#### **Backend:**  
```bash
cd backend
npm install
```
#### **Frontend:**  
```bash
cd frontend
npm install
```

---

## **Backend Setup & Running the Server**  
### **3️⃣ Modify `server.js` to Insert a Test User**  
Open `server.js` and add the following code inside `initializeDbAndServer()` to insert a test user:  
```javascript
const bcrypt = require('bcrypt');

const insertTestUser = async () => {
  const username = 'testuser';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO user (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        console.log('Test user already exists.');
      } else {
        console.error('Error inserting test user:', err.message);
      }
    } else {
      console.log('Test user inserted successfully.');
    }
  });
};

insertTestUser();
```

### **4️⃣ Start the Backend Server**  
```bash
cd backend
node server.js
```
*Server will run at:* `http://localhost:4000`

---

## **Frontend Setup & Running the React App**  

### **5️⃣ Start the Frontend**  
```bash
cd frontend
npm start
```
*App will be available at:* `http://localhost:3000`

---

## **API Endpoints**  

### **Authentication**  
**Login:**  
```http
POST /api/login
```
**Request Body:**  
```json
{
  "username": "testuser",
  "password": "password123"
}
```
**Response:**  
```json
{
  "token": "your-jwt-token-here"
}
```

### **Dashboard** *(Protected Route)*  
```http
GET /api/dashboard
```
**Response (if authenticated):**  
```json
[
  {
    "id": 1,
    "title": "Card 1",
    "content": "Card content"
  }
]
```
**Response (if not authenticated):**  
```json
{
  "message": "User not logged in"
}
```

### **Map Data** *(Protected Route)*  
```http
GET /api/map
```
**Response (if authenticated):**  
```json
{
  "center_lat": 20.5937,
  "center_lng": 78.9629,
  "zoom": 5
}
```
**Response (if not authenticated):**  
```json
{
  "message": "User not logged in"
}
```

---

## **Deployment**  
### **Backend Deployment on Render**  
1. **Push your backend to GitHub**  
```bash
git add .
git commit -m "Deploy backend"
git push origin main
```
2. **Go to** [Render](https://dashboard.render.com/) **and create a new Web Service.**  
3. **Connect your GitHub repository** and deploy the backend.  
4. **Set the PORT to 4000** in the environment variables.  
5. **Deploy and get the API URL (e.g., `https://synchthreads-backend.onrender.com`).**  

### **Frontend Deployment on Netlify**  
1. **Push your frontend to GitHub**  
```bash
git add .
git commit -m "Deploy frontend"
git push origin main
```
2. **Go to** [Netlify](https://www.netlify.com/) **and create a new project.**  
3. **Connect your GitHub repository** and deploy the frontend.  
4. **Set environment variable `REACT_APP_API_URL` to your backend URL.**  
5. **Deploy and get the frontend URL.**  

---

## **Project Folder Structure**  
```
syncthreads-assignment/
│── backend/
│   ├── database.db
│   ├── server.js
│   ├── package.json
│   ├── insertUser.js
│   └── .env
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── MapView.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── README.md
```

---

## **Troubleshooting**  

| Issue | Solution |
|--------|------------|
| CORS error | Add `res.header("Access-Control-Allow-Origin", "*");` to `server.js`. |
| Login not working | Ensure test user exists in the database. Check the `insertTestUser()` function. |
| JWT errors | Ensure token is sent in headers (`Authorization: Bearer token`). |
| Database issues | Check if `database.db` exists and has data. |
| Deployment fails | Check Render/Netlify logs for errors. |

---


## **Contributors**  
- **Manikanta Tumgani**  
- **yadavmani8543@gmail.com**  

---

## **License**  
This project is licensed under the MIT License.  

---
