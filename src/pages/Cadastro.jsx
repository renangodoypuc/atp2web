import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [form, setForm] = useState({ email: '', password: '', nome: '', sobrenome: '', nascimento: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Cadastro] Enviando dados:', form);
  
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;
      console.log('[Cadastro] UID criado:', uid);
  
      await setDoc(doc(db, 'users', uid), {
        nome: form.nome,
        sobrenome: form.sobrenome,
        nascimento: form.nascimento,
        uid
      });
      console.log('[Cadastro] Dados gravados no Firestore. Redirecionando...');
      
      navigate('/login');
    } catch (err) {
      console.error('[Cadastro] Erro ao cadastrar:', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          name="sobrenome"
          type="text"
          placeholder="Sobrenome"
          onChange={handleChange}
          required
        />
        <input
          name="nascimento"
          type="date"
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
