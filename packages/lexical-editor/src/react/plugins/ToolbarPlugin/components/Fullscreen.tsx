import { useState, type JSX } from 'react'

const editorId = 'lexical-editor'
const fullscreenClassname = 'fullscreen'

function Fullscreen(): JSX.Element {
  const [isFull, setIsFull] = useState(false)
  const toggleFullscreen = () => {
    if (!document) return
    const editorElement = document.getElementById(editorId)
    if (!editorElement) return

    if (isFull) {
      editorElement.classList.remove(fullscreenClassname)
    } else {
      editorElement.classList.add(fullscreenClassname)
    }

    setIsFull(!isFull)
  }

  return (
    <button
      className="toolbar-item spaced"
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFull ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      <i className={`icon ${isFull ? 'exit-fullscreen' : 'fullscreen'}`} />
    </button>
  )
}

export default Fullscreen