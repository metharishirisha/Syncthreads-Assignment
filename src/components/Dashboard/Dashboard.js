import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios.get("https://synchthreads-backend.onrender.com/api/dashboard", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setCards(response.data))
        .catch(() => navigate("/"));
    }
  }, [token, navigate]);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="row">
        {cards.map(card => (
          <div key={card.id} className="col-md-4">
            <div className="card" onClick={() => navigate(`/map/${card.id}`)}>
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
