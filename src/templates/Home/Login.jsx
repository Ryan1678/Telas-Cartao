import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import './Login.css';

export const Login = () => {
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(''); // Para exibir erros de login

  const handleLogin = (e) => {
    e.preventDefault(); // Previna o comportamento padrão de recarregar a página

    // Resetar mensagens de erro
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    let valid = true;

    // Validação do Email
    if (!email) {
      setEmailError('Por favor, insira seu email.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, insira um email válido.');
      valid = false;
    }

    // Validação da Senha
    if (!password) {
      setPasswordError('Por favor, insira sua senha.');
      valid = false;
    }

    if (valid) {
      // Fazer requisição ao backend
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Enviar dados do login
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate('/pedidos'); // Redireciona para pedidos se autenticado com sucesso
        } else {
          setLoginError(data.message); // Mostra erro se falhar
        }
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        setLoginError('Erro ao conectar ao servidor. Tente novamente.');
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
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
        {loginError && <div className="error-message">{loginError}</div>} {/* Exibe erro geral */}
        <button type="submit" className="login-button">Entrar</button>
        <h2 className="sair"><a href="/">VOLTAR</a></h2>
      </form>
    </div>
  );
};
