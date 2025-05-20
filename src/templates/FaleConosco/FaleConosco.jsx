import { useState } from 'react'
import './FaleConosco.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-fieb.png'

function FaleConosco() {
  const [count, setCount] = useState(0)

  return (
    <div className='container-fluid'>
      <section
        id="faleconosco"
        className="text-dark py-5 formulario-card"
        style={{ borderRadius: '8px', backgroundColor: '#f8f9fa' }}
      >
        <div className="container text-center">
          <h2 className="mb-4">
            <i className="bi bi-envelope-fill me-2"></i>
            Fale Conosco
          </h2>
          <p className="lead mb-5">
            Tem dúvidas, sugestões ou precisa de ajuda? Envie sua mensagem para a gente!
          </p>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="card h-100 shadow-sm p-4">
                <form>
                  {/* Nome */}
                  <div className="mb-3 text-start">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" placeholder="Seu nome" />
                  </div>

                  {/* Email */}
                  <div className="mb-3 text-start">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="seuemail@exemplo.com" />
                  </div>

                  {/* Título do motivo */}
                  <div className="mb-3 text-start">
                    <label htmlFor="titulo" className="form-label">Título do motivo</label>
                    <input type="text" className="form-control" id="titulo" placeholder="Título" />
                  </div>

                  {/* Detalhamento do motivo */}
                  <div className="mb-3 text-start">
                    <label htmlFor="mensagem" className="form-label">Detalhamento</label>
                    <textarea className="form-control" id="mensagem" rows="4" placeholder="Descreva sua mensagem"></textarea>
                  </div>

                  {/* Botão enviar */}
                  <button type="submit" className="btn btn-custom w-100">
                    Enviar Mensagem
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="agradecimento"
        className="shadow-sm text-center agradecimento-section py-5"
        style={{
          borderRadius: '0',
          marginTop: '0',
          backgroundColor: '#f8f9fa',
        }}
      >
      </section>
    </div>

  )
}

export default FaleConosco