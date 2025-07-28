import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="footer-inner">
        <div className="footer-section">
          <h6><i className="bi bi-box-seam me-1"></i> Nesse Site</h6>
          <p className="small">Focado para os vendedores e administradores, se não for seu caso, retire-se do site e vá para a aplicação focada em clientes (mobile).</p>
        </div>

        <div className="footer-section">
          <h6>Navegação</h6>
          <nav>
            <Link to="/">Início</Link>
            <Link to="/quem">Sobre</Link>
            <Link to="/fale">Contato</Link>
            <Link to="/login">Admin</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h6>Redes Sociais</h6>
          <div className="social-icons">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-twitter"></i></a>
            <a href="#"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      <hr />
      <div className="copy">© {new Date().getFullYear()} FiebTech. Todos os direitos reservados.</div>
    </footer>
  );
};

export default Footer;
