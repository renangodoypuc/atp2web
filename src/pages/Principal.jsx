import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
      console.log('[Principal] UID atual:', uid);

      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUserData(snap.data());
      } else {
      }
    }

    fetchUser();
  }, [navigate]);

  if (!userData) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Bem-vindo, {userData.nome} {userData.sobrenome}</h2>
      <p>Data de Nascimento: {userData.nascimento}</p>
    </div>
  );
}
