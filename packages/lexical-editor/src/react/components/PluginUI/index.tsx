import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type JSX,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'

type PluginDialogProps = {
  title: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export const PluginDialog = ({
  title,
  actions,
  children,
  className = '',
}: PluginDialogProps): JSX.Element | null => {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dialogRef.current?.focus()
  }, [])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="LexicalPluginDialog__overlay">
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`LexicalPluginDialog ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="LexicalPluginDialog__header">
          <p className="LexicalPluginDialog__title" id={titleId}>
            {title}
          </p>
          {actions ? (
            <div className="LexicalPluginDialog__actions">{actions}</div>
          ) : null}
        </div>
        <div className="LexicalPluginDialog__content">{children}</div>
      </div>
    </div>,
    document.body
  )
}

type PluginFieldProps = {
  label: string
  children: ReactNode
  className?: string
}

export const PluginField = ({
  label,
  children,
  className = '',
}: PluginFieldProps): JSX.Element => (
  <div className={`LexicalPluginField ${className}`.trim()}>
    <p className="LexicalPluginField__label">{label}</p>
    {children}
  </div>
)

export const PluginTextInput = ({
  className = '',
  type = 'text',
  ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element => (
  <input
    {...props}
    type={type}
    className={`LexicalPluginTextInput ${className}`.trim()}
  />
)

type PluginButtonVariant = 'primary' | 'secondary' | 'danger'

type PluginButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PluginButtonVariant
  iconClassName?: string
}

export const PluginButton = ({
  children,
  className = '',
  iconClassName,
  type = 'button',
  variant = 'secondary',
  ...props
}: PluginButtonProps): JSX.Element => (
  <button
    {...props}
    type={type}
    className={`LexicalPluginButton LexicalPluginButton--${variant} ${className}`.trim()}
  >
    {iconClassName ? (
      <i className={`LexicalPluginButton__icon ${iconClassName}`} />
    ) : null}
    {children ? <span>{children}</span> : null}
  </button>
)

type PluginIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconClassName: string
  active?: boolean
}

export const PluginIconButton = ({
  active = false,
  children,
  className = '',
  iconClassName,
  type = 'button',
  ...props
}: PluginIconButtonProps): JSX.Element => (
  <button
    {...props}
    type={type}
    className={`LexicalPluginIconButton ${
      active ? 'is-active' : ''
    } ${className}`.trim()}
  >
    <i className={`LexicalPluginIconButton__icon ${iconClassName}`} />
    {children ? <span>{children}</span> : null}
  </button>
)
