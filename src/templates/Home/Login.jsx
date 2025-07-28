import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setLoginError('');

    let valid = true;

    if (!email) {
      setEmailError('Por favor, insira seu email.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, insira um email válido.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Por favor, insira sua senha.');
      valid = false;
    }

    if (!valid) return;

    // Simulando login bem-sucedido (sem conexão com backend)
    const fakeFuncionario = {
      nome: 'Administrador Simulado',
      email: email,
    };

    localStorage.setItem('funcionario', JSON.stringify(fakeFuncionario));
    navigate('/pedidos');
  };

  return (
    <div className="login-container">
      <h2 className="login-title" style={{ color: 'rgb(255, 0, 153)' }}>Login de Administrador/Vendedor</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            className={`input-field ${emailError ? 'error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            className={`input-field ${passwordError ? 'error' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        {loginError && <div className="error-message">{loginError}</div>}
        <button type="submit" className="login-button">Entrar</button>
        <h2 className="sair"><a href="/">VOLTAR</a></h2>
      </form>
    </div>
  );
};
