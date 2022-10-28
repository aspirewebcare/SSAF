import { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/Routes/PageRoutes.js";
import './index.css';


export const AuthContext = createContext();
function App() {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    let userData = localStorage.getItem('userData')
    if (userData) {
      setLoggedUser(JSON.parse(userData))
    }
  }, [])
  return (
    <AuthContext.Provider value={[loggedUser, setLoggedUser]}>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;