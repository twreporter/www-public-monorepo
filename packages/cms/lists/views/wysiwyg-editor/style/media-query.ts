import { css } from '@emotion/react'

export const DEFAULT_SCREEN = Object.freeze({
  tablet: {
    minWidth: 768,
  },
  desktop: {
    minWidth: 1024,
  },
  hd: {
    minWidth: 1440,
  },
})

export const mobileOnly = (...args: any) => css`
  @media (max-width: ${DEFAULT_SCREEN.tablet.minWidth - 1}px) {
    ${css(...args)}
  }
`

export const tabletAndBelow = (...args: any) => css`
  @media (max-width: ${DEFAULT_SCREEN.desktop.minWidth - 1}px) {
    ${css(...args)}
  }
`

export const tabletOnly = (...args: any) => css`
  @media (min-width: ${
    DEFAULT_SCREEN.tablet.minWidth
  }px) and (max-width: ${DEFAULT_SCREEN.desktop.minWidth - 1}px) {
    ${css(...args)}
  }
`

export const tabletAndAbove = (...args: any) => css`
  @media (min-width: ${DEFAULT_SCREEN.tablet.minWidth}px) {
    ${css(...args)}
  }
`

export const desktopAndBelow = (...args: any) => css`
  @media (max-width: ${DEFAULT_SCREEN.hd.minWidth - 1}px) {
    ${css(...args)}
  }
`

export const desktopOnly = (...args: any) => css`
  @media (min-width: ${
    DEFAULT_SCREEN.desktop.minWidth
  }px) and (max-width: ${DEFAULT_SCREEN.hd.minWidth - 1}px) {
    ${css(...args)}
  }
`

export const desktopAndAbove = (...args: any) => css`
  @media (min-width: ${DEFAULT_SCREEN.desktop.minWidth}px) {
    ${css(...args)}
  }
`

export const hdOnly = (...args: any) => css`
  @media (min-width: ${DEFAULT_SCREEN.hd.minWidth}px) {
    ${css(...args)}
  }
`
