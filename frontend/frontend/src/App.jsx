// src/App.jsx

import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";

const App = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <main
          className="p-4"
          style={{ marginTop: "56px", marginLeft: "250px" }}
        >
          <h1>Welcome to my website</h1>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  );
};
export default App;
