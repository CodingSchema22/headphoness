
import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem("soundx-user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem("soundx-user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getSavedUser);

  const login = (userData) => {
    localStorage.setItem(
      "soundx-user",
      JSON.stringify(userData)
    );
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("soundx-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};

export default AuthContext;
