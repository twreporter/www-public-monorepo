import type { FC } from 'react'
import type { CustomizedLinkProps } from './type'

type ExternalLinkProps = CustomizedLinkProps
const ExternalLink: FC<ExternalLinkProps> = ({
  to,
  target = '_self',
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <a
      href={to}
      target={target}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )
}

export default ExternalLink
