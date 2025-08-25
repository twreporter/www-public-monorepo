export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

export type CustomizedLinkProps = {
  to: string
  target?: LinkTarget
  className?: string
  children?: React.ReactNode
}