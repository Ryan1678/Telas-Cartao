
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-custom bg-dark text-white p-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5><i className="bi bi-box-seam me-2"></i>Nesse Site</h5>
            <p className="small">Aluno ou professor poderá visualizar algumas funções disponíveis no nosso aplicativo web.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Navegação</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Início</Link></li>
              <li><Link to="/quem" className="text-white text-decoration-none">Sobre</Link></li>
              <li><Link to="/fale" className="text-white text-decoration-none">Contato</Link></li>
              <li><Link to="/login" className="text-white text-decoration-none">Administração</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Redes Sociais</h6>
            <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-5"></i></a>
            <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-5"></i></a>
            <a href="#" className="text-white me-3"><i className="bi bi-twitter fs-5"></i></a>
            <a href="#" className="text-white"><i className="bi bi-linkedin fs-5"></i></a>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center small">
          © {new Date().getFullYear()} FiebTech. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
