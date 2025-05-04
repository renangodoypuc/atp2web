import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/principal');
    } catch (err) {
      setError('Usuário não cadastrado ou senha inválida');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/cadastro" className="link-button">Não tem login? Cadastre-se</Link>
    </div>
  );
}