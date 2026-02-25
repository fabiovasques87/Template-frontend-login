import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  const Private = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route
              path="/"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
            <Route
              path="/new"
              element={
                <Private>
                  <ItemPage />
                </Private>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <Private>
                  <ItemPage />
                </Private>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
