import { useState } from 'react'
import './QuemSomos.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-fieb.png'

function QuemSomos() {
  const [count, setCount] = useState(0)

  return (
    <div className='container-fluid'>
      <section id='quemsomos'>
         Quem somos
      </section>
     
    </div>

  )
}

export default QuemSomos