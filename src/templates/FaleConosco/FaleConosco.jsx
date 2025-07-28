import { useState } from 'react';
import './FaleConosco.css';

function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    titulo: '',
    detalhamento: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Simulando envio — backend será adicionado futuramente
    console.log('Mensagem simulada:', formData);

    alert('Mensagem simulada como enviada!');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="faleconosco-container">
        <section id="faleconosco" className="faleconosco-card">
          <h2>✨ Obrigado pela sua mensagem!</h2>
          <p>Entraremos em contato o mais breve possível.</p>
          <button className="btn-custom" onClick={() => setSubmitted(false)}>
            Enviar outra mensagem
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="faleconosco-container">
      <section id="faleconosco" className="faleconosco-card">
        <h2>
          <span role="img" aria-label="envelope">📧</span> Fale Conosco
        </h2>
        <p className="lead">
          Tem dúvidas, sugestões ou precisa de ajuda? Envie sua mensagem para a gente!
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            id="nome"
            type="text"
            className="form-control"
            placeholder="Seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefone" className="form-label" style={{ marginTop: '20px' }}>Telefone</label>
          <input
            id="telefone"
            type="tel"
            className="form-control"
            placeholder="(DDD) 91234-5678"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          <label htmlFor="titulo" className="form-label" style={{ marginTop: '20px' }}>Título do motivo</label>
          <input
            id="titulo"
            type="text"
            className="form-control"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          <label htmlFor="detalhamento" className="form-label" style={{ marginTop: '20px' }}>Detalhamento</label>
          <textarea
            id="detalhamento"
            className="form-control"
            rows="4"
            placeholder="Descreva sua mensagem"
            value={formData.detalhamento}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-custom">
            Enviar Mensagem
          </button>
        </form>
      </section>
    </div>
  );
}

export default FaleConosco;
