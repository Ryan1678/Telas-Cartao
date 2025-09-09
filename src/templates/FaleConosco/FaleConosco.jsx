import { useState } from 'react';
import './FaleConosco.css';

function FaleConosco() {
  const [formData, setFormData] = useState({
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

  async function handleSubmit(e) {
    e.preventDefault();

    // Cria objeto com os nomes corretos para o back-end
    const mensagem = {
      telefone: formData.telefone,
      titulo: formData.titulo,
      texto: formData.detalhamento // Conversão de "detalhamento" para "texto"
    };

    try {
      const response = await fetch('http://localhost:8080/mensagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      alert('Mensagem enviada com sucesso!');
      setSubmitted(true);
    } catch (error) {
      console.error('Erro no envio:', error);
      alert('Falha ao enviar mensagem. Tente novamente.');
    }
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
          <label htmlFor="telefone" className="form-label" style={{ marginTop: '20px' }}>
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            className="form-control"
            placeholder="(DDD) 91234-5678"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          <label htmlFor="titulo" className="form-label" style={{ marginTop: '20px' }}>
            Título do motivo
          </label>
          <input
            id="titulo"
            type="text"
            className="form-control"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          <label htmlFor="detalhamento" className="form-label" style={{ marginTop: '20px' }}>
            Detalhamento
          </label>
          <textarea
            id="detalhamento"
            className="form-control"
            rows="4"
            placeholder="Descreva sua mensagem"
            value={formData.detalhamento}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-custom" style={{ marginTop: '20px' }}>
            Enviar Mensagem
          </button>
        </form>
      </section>
    </div>
  );
}

export default FaleConosco;
