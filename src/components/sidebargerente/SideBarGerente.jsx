import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideBarGerente.css';

const SideBarGerente = () => {
  const location = useLocation();

  // Pega o funcionário do localStorage
  const funcionarioJson = localStorage.getItem('funcionario');
  const funcionario = funcionarioJson ? JSON.parse(funcionarioJson) : null;
  const primeiroNome = funcionario?.nome ? funcionario.nome.split(' ')[0] : 'administrador';

  return (
    <aside className="sidebar" style={{ backgroundColor: '#f0f0f0' /* cinza clarinho */ }}>
      <h1 className="sidebar-title">Lanchonete ADM</h1>
      <h2 className="sidebar-logo">Olá administrador, {primeiroNome}</h2>
      <ul>
        <li>
          <a href="/pedidos" className={location.pathname === '/pedidos' ? 'active' : ''}>
            <i className="fa fa-shopping-cart"></i> Pedidos
          </a>
        </li>
        <li>
          <a href="/produtos" className={location.pathname === '/produtos' ? 'active' : ''}>
            <i className="fa fa-cutlery"></i> Produtos
          </a>
        </li>
        <li>
          <a href="/funcionario" className={location.pathname === '/funcionario' ? 'active' : ''}>
            <i className="fa fa-users"></i> Funcionários
          </a>
        </li>
        <li>
          <a href="/mensagens" className={location.pathname === '/mensagens' ? 'active' : ''}>
            <i className="fa fa-users"></i> Mensagens
          </a>
        </li>
      </ul>
      <h2 className="sair"><a href="/">Sair</a></h2>
    </aside>
  );
};

export default SideBarGerente;
