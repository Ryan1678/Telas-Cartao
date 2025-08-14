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

  const handleLogin = async (e) => {
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

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: password
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setLoginError(data.error || 'Credenciais inválidas.');
        return;
      }

      // Verifica o nível de acesso
      const nivel = data.nivelAcesso ? data.nivelAcesso.toUpperCase() : '';
      if (nivel !== 'ADMIN' && nivel !== 'VENDEDOR') {
        setLoginError('Acesso negado. Apenas ADMIN ou VENDEDOR.');
        return;
      }

      // Salva o usuário no localStorage
      localStorage.setItem('funcionario', JSON.stringify(data));

      // Redireciona conforme o nível
      if (nivel === 'ADMIN') {
        navigate('/funcionario'); // ADMIN vai para a página de usuários
      } else if (nivel === 'VENDEDOR') {
        navigate('/cartoes'); // VENDEDOR vai para a página de cartões
      }
    } catch (error) {
      setLoginError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title" style={{ color: 'rgb(255, 0, 153)' }}>
        Login de Administrador/Vendedor
      </h2>
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
        <button type="submit" className="login-button">
          Entrar
        </button>
        <h2 className="sair">
          <a href="/">VOLTAR</a>
        </h2>
      </form>
    </div>
  );
};
