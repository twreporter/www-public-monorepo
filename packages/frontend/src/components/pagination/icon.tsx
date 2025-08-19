import type { FC } from 'react'

type IconProps = {
  className?: string
}

export const PageUpIcon: FC<IconProps> = ({
  className = '',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <title>pageup</title>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.27046 11.403C6.90985 11.7876 6.90985 12.3862 7.27046 12.7708L12.9769 18.8577C13.3546 19.2606 13.9874 19.281 14.3904 18.9033C14.7933 18.5256 14.8137 17.8928 14.436 17.4898L9.37073 12.0869L14.436 6.68394C14.8137 6.28103 14.7933 5.64819 14.3904 5.27046C13.9874 4.89273 13.3546 4.91315 12.9769 5.31606L7.27046 11.403Z" fill="#9f7544"/>
  </svg>
)

export const PageDownIcon: FC<IconProps> = ({
  className = '',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <title>pagedown</title>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.436 11.403C16.7966 11.7876 16.7966 12.3862 16.436 12.7708L10.7295 18.8577C10.3518 19.2606 9.71898 19.281 9.31606 18.9033C8.91315 18.5256 8.89273 17.8928 9.27046 17.4898L14.3357 12.0869L9.27046 6.68394C8.89274 6.28103 8.91315 5.64819 9.31606 5.27046C9.71898 4.89273 10.3518 4.91315 10.7295 5.31606L16.436 11.403Z" fill="#9f7544"/>
  </svg>
)