import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Cadastro() {
  const [form, setForm] = useState({ email: '', password: '', nome: '', sobrenome: '', nascimento: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;
      await setDoc(doc(db, 'users', uid), {
        nome: form.nome,
        sobrenome: form.sobrenome,
        nascimento: form.nascimento,
        uid
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="nome"
          type="text"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="sobrenome"
          type="text"
          placeholder="Sobrenome"
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="nascimento"
          type="date"
          onChange={handleChange}
          required
        />
        <button className="button" type="submit">Cadastrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="link-button" onClick={() => navigate('/login')}>Voltar ao Login</button>
    </div>
  );
}