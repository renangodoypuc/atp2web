import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Principal from './pages/Principal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function Protected({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('[Protected] Checando autenticação...');
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      console.log('[Protected] Estado do usuário:', u);
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastro" replace />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/principal"
        element={
          <Protected>
            <Principal />
          </Protected>
        }
      />
    </Routes>
  );
}
