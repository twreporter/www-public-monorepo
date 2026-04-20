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
    <div className="fullscreen" onClick={toggleFullscreen}>
      <i className={`icon ${isFull ? 'exit-fullscreen' : 'fullscreen'}`} />
    </div>
  )
}

export default Fullscreen