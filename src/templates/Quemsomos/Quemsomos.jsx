import React from 'react';
import './QuemSomos.css';
import logo from '../../assets/images/logo-fieb.png';

const equipe = [
  { nome: 'Ryan Amorim', funcao: 'Desenvolvedor Front-end e Desenvolvedor Back-end' },
  { nome: 'Lanny Caroliny', funcao: 'Desenvolvedor Front-end' },
  { nome: 'Isabela Lorrany', funcao: 'Designer e Responsável a Documentação' },
  { nome: 'Vitoria Jordana', funcao: 'Gerente de Projeto e Responsável a Documentação' },
  { nome: 'Juana Ferreira', funcao: 'Testes e Qualidade e Responsável a Documentação' },
];

function QuemSomos() {
  return (
    <div className="quemsomos-container">
      <section className="quem-section">
        <div className="content-wrapper">
          <img src={logo} alt="Logo FIEB" className="logo" />
          <h1>Quem Somos</h1>
          <p className="descricao">
            Somos um grupo de <strong>5 estudantes do 3º ano do Ensino Médio</strong> na <strong>FIEB Tech</strong>, cursando Informática.
            Estamos criando este site para a FIEB Tech com o objetivo de ajudar os alunos a evitarem os problemas que nosso grupo enfrentou.
          </p>

          <div className="card prop-card">
            <h2>Nosso Propósito</h2>
            <p>
              Este projeto é figurativo, mas nossa intenção é real: desenvolver uma ferramenta que facilite o dia a dia dos alunos na escola,
              principalmente na compra de lanches, evitando filas e correria.
            </p>
          </div>

          <h2 className="equipe-titulo">Nossa Equipe</h2>
          <div className="equipe-grid">
            {equipe.map(({ nome, funcao }, i) => (
              <div key={i} className="equipe-card">
                <div className="avatar-placeholder">{nome.charAt(0)}</div>
                <h3>{nome}</h3>
                <p>{funcao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuemSomos;
