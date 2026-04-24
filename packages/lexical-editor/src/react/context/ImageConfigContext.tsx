import { createContext, useContext, type ReactNode, type JSX } from 'react'
import type { ImageConfig } from '../../core'

const Context = createContext<ImageConfig | undefined>(undefined)

export const ImageConfigContext = ({
  children,
  value,
}: {
  children: ReactNode
  value: ImageConfig | undefined
}): JSX.Element => {
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useImageConfig = (): ImageConfig | undefined => {
  return useContext(Context)
}
