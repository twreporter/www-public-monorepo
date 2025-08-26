import type { FC } from 'react'
import clsx from 'clsx'

const Loading: FC = () => {
  return (
    <div
      className={clsx(
        'block min-h-screen w-full',
        'bg-[url(/spinner-logo.gif)] bg-center bg-no-repeat'
      )}
    >
      <div className="bg-[url(/spinner-logo.gif)] bg-center bg-no-repeat" />
    </div>
  )
}

export default Loading
