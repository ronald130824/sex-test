import { createContext, ReactNode, useEffect, useState } from 'react'

import { SnackData } from '../interfaces/SnackData'

import { getLingerie, getAcessorios, getCosmeticos, getBrincadeiras } from '../services/api'

interface SnackContextProps {
  lingerie: SnackData[]
  acessorios: SnackData[]
  cosmeticos: SnackData[]
  brincadeiras: SnackData[]
}

interface SnackProviderProps {
  children: ReactNode
}

export const SnackContext = createContext({} as SnackContextProps)

export function SnackProvider({ children }: SnackProviderProps) {
  const [lingerie, setLingerie] = useState<SnackData[]>([])
  const [acessorios, setAcessorios] = useState<SnackData[]>([])
  const [cosmeticos, setCosmeticos] = useState<SnackData[]>([])
  const [brincadeiras, setBrincadeiras] = useState<SnackData[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const lingerieRequest = await getLingerie()
        const acessorioRequest = await getAcessorios()
        const cosmeticosRequest = await getCosmeticos()
        const brincadeirasRequest = await getBrincadeiras()

        const requests = [lingerieRequest, acessorioRequest, cosmeticosRequest, brincadeirasRequest]

        const [
          { data: lingerieResponse },
          { data: acessoriosResponse },
          { data: cosmeticosResponse },
          { data: brincadeirasResponse },
        ] = await Promise.all(requests)

        setLingerie(lingerieResponse)
        setAcessorios(acessoriosResponse)
        setCosmeticos(cosmeticosResponse)
        setBrincadeiras(brincadeirasResponse)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <SnackContext.Provider value={{ lingerie, acessorios, cosmeticos, brincadeiras }}>
      {children}
    </SnackContext.Provider>
  )
}
