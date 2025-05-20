import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-fieb.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Main content */}
      <main className="flex-grow-1">
        {/* Categorias */}
        <section id="home" className="bg-light text-dark py-5">
          <div className="container text-center">
            <h1 className="mb-3">
              <i className="bi bi-shop-window me-2"></i>
              Bem-vindo à Lanchonete Escolar
            </h1>
            <p className="lead mb-5">
              O app ideal para alunos pedirem seus lanches de forma rápida, segura e divertida!

            </p>
            <p className="lead mb-5">
              No App você podera comprar:
            </p>
            <div className="row justify-content-center">
              {[
                { emoji: '🛍️', title: 'Salgados', text: 'Chips e snacks crocantes para matar a fome com sabor.' },
                { emoji: '🥤', title: 'Bebidas', text: 'Refrigerantes gelados e sucos refrescantes.' },
                { emoji: '🍬', title: 'Doces', text: 'Chicletes, balas e os clássicos Finis!' },
                { emoji: '🍦', title: 'Sorvetes', text: 'Picolés saborosos para refrescar seus dias.' }
              ].map((item, i) => (
                <div key={i} className="col-6 col-md-3 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <span className="fs-1">{item.emoji}</span>
                      <h5 className="card-title mt-2">{item.title}</h5>
                      <p className="card-text small">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
         

        {/* Funcionalidades */}
        <section id="funcionalidades" className="bg-light text-dark py-5">
          <div className="container text-center">
            <h2 className="mb-4">
              <i className="bi bi-stars me-2"></i>
              Funcionalidades do App
            </h2>
            <p className="lead mb-5">
              Pensado para facilitar a sua experiência com lanches na escola. Rápido, prático e sem filas!
            </p>

            <div className="row justify-content-center">
              {[
                { emoji: '⏰', title: 'Compra Antecipada', text: 'Peça com antecedência e garanta seu lanche sem correria.' },
                { emoji: '🚶‍♂️❌', title: 'Evite Filas', text: 'Retire direto no balcão, sem pegar fila.' },
                { emoji: '📱', title: 'Compre de Qualquer Lugar', text: 'Na sala, no pátio ou onde quiser.' },
                { emoji: '💳', title: 'Pagamento Rápido', text: 'Pague online ou na hora. Praticidade total!' }
              ].map((item, i) => (
                <div key={i} className="col-6 col-md-3 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <span className="fs-1">{item.emoji}</span>
                      <h5 className="card-title mt-2">{item.title}</h5>
                      <p className="card-text small">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
