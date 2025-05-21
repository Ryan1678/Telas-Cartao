import { useState } from 'react';
import './FaleConosco.css';

function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
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

    // Enviar os dados para o backend
    fetch('http://localhost:8080/mensagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao enviar mensagem');
        return res.json();
      })
      .then(() => {
        alert('Mensagem enviada com sucesso!');
        setSubmitted(true);
      })
      .catch(err => {
        console.error('Erro ao enviar:', err);
        alert('Houve um erro ao enviar sua mensagem. Tente novamente.');
      });
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

          <label htmlFor="email" className="form-label" style={{ marginTop: '20px' }}>Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="seuemail@exemplo.com"
            value={formData.email}
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
