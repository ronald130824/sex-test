import { useSnack } from '../../../hooks/useSnack'

import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'

export default function Drinks() {
  const { cosmeticos } = useSnack()

  return (
    <>
      <Head title='Cosméticos' />
      <SnackTitle>Cosméticos</SnackTitle>
      <Snacks snacks={ cosmeticos }></Snacks>
    </>
  )
}
