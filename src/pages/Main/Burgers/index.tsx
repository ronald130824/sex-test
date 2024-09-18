import { useSnack } from '../../../hooks/useSnack'

import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'

export default function Burgers() {
  const { lingerie } = useSnack()

  return (
    <>
      <Head title='Lingerie' />
      <SnackTitle>Lingerie</SnackTitle>
      <Snacks snacks={lingerie}></Snacks>
    </>
  )
}
