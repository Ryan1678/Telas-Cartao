import { useState } from 'react'
import './Produtos.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-fieb.png'

function Produtos() {
  const [count, setCount] = useState(0)

  return (
    <div className='container-fluid'>
      <section id='produto'>
        Produtos
      </section>
    </div>

  )
}

export default Produtos