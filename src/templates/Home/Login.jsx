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

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }), // Atenção aqui: a senha tem que chamar 'senha' como no backend
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (data.funcionario) {
          localStorage.setItem('funcionario', JSON.stringify(data.funcionario));
        } else {
          console.error('Objeto funcionario não recebido na resposta do login');
        }
        navigate('/pedidos');
      } else {
        setLoginError(data.message);
      }
    })
    .catch(() => {
      setLoginError('Erro ao conectar ao servidor. Tente novamente.');
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title" style={{ color: 'rgb(255, 0, 153)' }}>Login de Administrador</h2>
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
