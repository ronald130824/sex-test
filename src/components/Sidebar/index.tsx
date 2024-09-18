import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Container } from './styles'

import { ReactComponent as LingerieIcon } from '../../fts/lingerie.svg'
import { ReactComponent as AlgemasIcon } from '../../fts/algema.svg'
import { ReactComponent as CosmeticosIcon } from '../../fts/beleza.svg'
import { ReactComponent as BrincadeirasIcon } from '../../fts/dados.svg'

import menuImg from '../../assets/menu.svg'

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <Container isMenuOpen={menuOpen}>
      <button type='button' onClick={handleToggleMenu}>
        <img src={menuImg} alt='Abrir e fechar o menu' />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>
              <LingerieIcon />
              <span>Lingeries</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='algemas'>
              <AlgemasIcon />
              <span>Algemas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='Cosmeticos'>
              <CosmeticosIcon />
              <span>Cosméticos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='Brincadeiras'>
              <BrincadeirasIcon />
              <span>Brincadeiras</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
