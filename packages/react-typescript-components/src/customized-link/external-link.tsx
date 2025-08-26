import type { FC } from 'react'
import type { CustomizedLinkProps } from './type'

type ExternalLinkProps = CustomizedLinkProps
const ExternalLink: FC<ExternalLinkProps> = ({
  to,
  target = '_self',
  className = '',
  children,
}) => {
  return (
    <a href={to} target={target} className={className}>
      {children}
    </a>
  )
}

export default ExternalLink
