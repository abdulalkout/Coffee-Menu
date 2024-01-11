import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
//------components
import NewOrderPage from "./components/NewOrderPage";
import AuthPage from "./components/AuthPage";
import OrderHistoryPage from "./components/OrderHistoryPage";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}

export default App;
