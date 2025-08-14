import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideBarGerente.css';

const SideBarGerente = () => {
  const location = useLocation();

  // Pega o funcionário do localStorage
  const funcionarioJson = localStorage.getItem('funcionario');
  const funcionario = funcionarioJson ? JSON.parse(funcionarioJson) : null;

  const primeiroNome = funcionario?.nome ? funcionario.nome.split(' ')[0] : '';
  const nivel = funcionario?.nivelAcesso ? funcionario.nivelAcesso.toUpperCase() : '';

  // Define saudação com base no nível de acesso
  let saudacao = 'Olá';
  if (nivel === 'ADMIN') {
    saudacao = 'Olá administrador';
  } else if (nivel === 'VENDEDOR') {
    saudacao = 'Olá vendedor';
  }

  // Monta a URL da imagem em Base64 (JPEG ou PNG) se existir
  let fotoUrl = null;
  if (funcionario?.foto) {
    const fotoBase64 = funcionario.foto.trim(); // remove espaços
    const mimeType = fotoBase64.startsWith('/9j') ? 'image/jpeg' : 'image/png';
    fotoUrl = `data:${mimeType};base64,${fotoBase64}`;
  }

  // Define os links que cada nível pode acessar
  const links = [
    { path: '/funcionario', label: 'Usuários', icon: 'fa-users', roles: ['ADMIN'] },
     { path: '/pedidos', label: 'Solicitações', icon: 'fa-shopping-cart', roles: ['ADMIN'] },
   { path: '/cartoes', label: 'Cartões', icon: 'fa-credit-card', roles: ['ADMIN', 'VENDEDOR'] },
    { path: '/mensagens', label: 'Mensagens', icon: 'fa-envelope', roles: ['ADMIN'] }
  ];

  return (
    <aside className="sidebar" style={{ backgroundColor: '#f0f0f0' }}>
      <h1 className="sidebar-title">Lanchonete ADM</h1>

      <div
        className="sidebar-user-info"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
      >
        <h2 className="sidebar-logo" style={{ margin: 0 }}>
          {saudacao}{primeiroNome ? `, ${primeiroNome}` : ''}
        </h2>
        {fotoUrl && (
          <img
            src={fotoUrl}
            alt="Foto do usuário"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ccc'
            }}
          />
        )}
      </div>

      <ul>
        {links
          .filter(link => link.roles.includes(nivel)) // filtra links pelo nível de acesso
          .map(link => (
            <li key={link.path}>
              <a href={link.path} className={location.pathname === link.path ? 'active' : ''}>
                <i className={`fa ${link.icon}`}></i> {link.label}
              </a>
            </li>
          ))}
      </ul>

      <h2 className="sair"><a href="/">Sair</a></h2>
    </aside>
  );
};

export default SideBarGerente;
