import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideBarGerente.css';

const SideBarGerente = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">Lanchonete ADM</h2>
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
      </ul>
      <h2 className="sair"><a href="/">Sair</a></h2>
    </aside>
  );
};

export default SideBarGerente;
