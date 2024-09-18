import { useSnack } from '../../../hooks/useSnack'

import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'

export default function IceCreams() {
  const { brincadeiras } = useSnack()

  return (
    <>
      <Head title='Brincadeiras' />
      <SnackTitle>Brincadeiras</SnackTitle>
      <Snacks snacks={brincadeiras}></Snacks>
    </>
  )
}
