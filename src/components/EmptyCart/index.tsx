import { Button, Container } from './styles'

import FotoCatalogo from '../../fts/sacola.png'

interface EmptyCartProps {
  title: string
}

export function EmptyCart({ title }: EmptyCartProps) {
  return (
    <Container>
      <h2>{title}</h2>
      <Button to='/'>Checar o Catálogo</Button>
      <img src={FotoCatalogo} alt='mulherSexy' />
    </Container>
  )
}
