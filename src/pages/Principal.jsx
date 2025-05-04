import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import '../App.css';

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    async function fetchUser() {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) setUserData(snap.data());
    }
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!userData) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Bem-vindo, {userData.nome} {userData.sobrenome}</h2>
      <p>Data de Nascimento: {userData.nascimento}</p>
      <button className="button secondary" onClick={handleLogout}>Logout</button>
    </div>
  );
}