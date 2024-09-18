import { useSnack } from '../../../hooks/useSnack'

import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'

export default function Pizzas() {
  const { acessorios } = useSnack()

  return (
    <>
      <Head title='Acessorios' />
      <SnackTitle>Acessórios</SnackTitle>
      <Snacks snacks={acessorios}></Snacks>
    </>
  )
}
