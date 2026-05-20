import type { JSX } from 'react'

type FullscreenProps = {
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

function Fullscreen({
  isFullscreen,
  onToggleFullscreen,
}: FullscreenProps): JSX.Element {
  return (
    <button
      className="toolbar-item spaced"
      type="button"
      onClick={onToggleFullscreen}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      <i
        className={`icon ${isFullscreen ? 'exit-fullscreen' : 'fullscreen'}`}
      />
    </button>
  )
}

export default Fullscreen
