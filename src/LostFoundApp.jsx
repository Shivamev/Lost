import React from "react";
import "./lost-found-app.css";

const LostFoundApp = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Lost & Found</h1>
        <p>Your one-stop solution to report or find lost items</p>
      </header>

      <main className="main-section">
        <section className="card-section">
          <div className="card">
            <h2>Report Lost Item</h2>
            <p>Can't find your item? Post a lost report here and we'll help you find it.</p>
            <button>Report Now</button>
          </div>
          <div className="card">
            <h2>Report Found Item</h2>
            <p>Found something valuable? Let others know by posting a found report.</p>
            <button>Report Now</button>
          </div>
        </section>

        <section className="feature-section">
          <h2>How It Works</h2>
          <ol>
            <li>Describe the item</li>
            <li>Share contact info</li>
            <li>Get connected with the owner or finder</li>
          </ol>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2025 Lost & Found App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LostFoundApp;