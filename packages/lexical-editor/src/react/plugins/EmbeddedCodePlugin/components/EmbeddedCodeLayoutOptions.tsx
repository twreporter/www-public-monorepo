import type { FC } from 'react'

import { PluginIconButton } from '../../../components/PluginUI'
import type { EmbeddedCodeLayout } from '../types'

type EmbeddedCodeLayoutOptionsProps = {
  layout: EmbeddedCodeLayout
  onChange: (layout: EmbeddedCodeLayout) => void
}

const layoutOptions: Array<{
  iconClassName: string
  label: string
  value: EmbeddedCodeLayout
}> = [
  {
    iconClassName: 'embedded-layout-default',
    label: 'default',
    value: 'default',
  },
  {
    iconClassName: 'embedded-layout-fullscreen',
    label: 'fullscreen',
    value: 'fullscreen',
  },
]

const EmbeddedCodeLayoutOptions: FC<EmbeddedCodeLayoutOptionsProps> = ({
  layout,
  onChange,
}) => (
  <div className="layout-option">
    {layoutOptions.map((option) => (
      <PluginIconButton
        key={option.value}
        active={layout === option.value}
        iconClassName={option.iconClassName}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </PluginIconButton>
    ))}
  </div>
)

export default EmbeddedCodeLayoutOptions
