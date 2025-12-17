import styled from '@emotion/styled'
import { css } from '@emotion/react'
// utils
import {
  mobileOnly,
  tabletOnly,
  desktopOnly,
  hdOnly,
  tabletAndBelow,
  tabletAndAbove,
} from '../utils/media-query'
// @twreporter
import { colorGrayscale, colorSupportive } from '@twreporter/core/lib/constants/color'

export const LexicalBox = styled.div`
  background-color: #fafbfc;
  border: 1px solid #e1e5e9;
  border-radius: 6px;

  &::selection {
    background-color: ${colorSupportive.heavy};
    color: ${colorGrayscale.white};
  }

  &.fullscreen {
    z-index: 1000;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    background-color: ${colorGrayscale.gray100};
    max-height: 100vh;
    max-width: 100vw;
    overflow-y: scroll;

    .toolbar {
      position: fixed;
      width: 100%;
      max-width: 100vw;
    }

    .editor-container {
      height: 100vh;
      padding-top: 36px;
    }
  }
`

const extendWidthCSS = css`
  ${mobileOnly`
    width: 100%;
  `}
  ${tabletOnly`
    width: 100%;
  `}
  ${desktopOnly`
    width: 752px;
  `}
  ${hdOnly`
    width: 1033px;
  `}
`

const largeWidthCSS = css`
  ${mobileOnly`
    width: calc(300/375*100%);
  `}
  ${tabletOnly`
    width: 513px;
  `}
  ${desktopOnly`
    width: 550px;
  `}
  ${hdOnly`
    width: 730px;
  `}
`

const normalWidthCSS = css`
  ${mobileOnly`
    padding-left: 34px;
    padding-right: 34px;
  `}
  ${tabletOnly`
    width: 453px;
  `}
  ${desktopOnly`
    width: 480px;
  `}
  ${hdOnly`
    width: 580px;
  `}
`

const paragraphTextCSS = css`
  font-size: 18px;
  position: relative;
  line-height: 2.11;
  letter-spacing: 0.6px;
`

const mockup = {
  margin: {
    extend: '60px auto',
    large: '60px auto',
    normal: '40px auto',
  },
}

export const StyleWrapper = styled.div`
  .editor-shell {
    margin: 0 auto;
    border-radius: 2px;
    max-width: 100%;
    position: relative;
    line-height: 1.8;
    font-weight: 400;
  }

  .editor-shell .editor-container {
    position: relative;
    display: block;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .editor-scroller {
    min-height: 150px;
    max-width: 100%;
    border: 0;
    display: flex;
    position: relative;
    outline: 0;
    z-index: 0;
    resize: vertical;
  }

  .editor {
    flex: auto;
    max-width: 100%;
    position: relative;
    resize: vertical;
    z-index: -1;
    /* twreporter style */
    background-color: ${colorGrayscale.gray100};
    color: ${colorGrayscale.gray800};
    font-family: "Roboto Slab", "Noto Sans TC", sans-serif;

    & > div {
      padding: 0;
    }
  }

  .TwreporterTheme__paragraph {
    ${normalWidthCSS}
    ${paragraphTextCSS}
    margin: ${mockup.margin.normal};
    color: ${colorGrayscale.gray800};

    /* line break */
    white-space: pre-wrap;
  }
  
  .TwreporterTheme__link {
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid ${colorGrayscale.gray300};
    span {
      color: ${colorSupportive.heavy} !important;
    }
    &:hover {
      border-color: ${colorSupportive.heavy};
    }
  }

  .TwreporterTheme__h2, .TwreporterTheme__h3 {
    ${normalWidthCSS}
    margin: ${mockup.margin.normal};
  }
  
  .TwreporterTheme__h2 {
    line-height: 125%;
    font-size: 32px;
  
    ${tabletAndBelow`
      font-size: 24px;  
    `}
  }
  
  .TwreporterTheme__h3 {
    line-height: 150%;
    font-size: 28px;

    ${tabletAndBelow`
      font-size: 22px;  
    `}
  }

  .TwreporterTheme__ul, .TwreporterTheme__ol {
    ${normalWidthCSS}
    ${paragraphTextCSS}
    margin: ${mockup.margin.normal};
    font-size: 18px;
    margin-block-start: 0;
    margin-block-end: 0;
    ${tabletAndAbove`
      padding: 0!important;  
    `}

    li {
      margin: 0 0 1em 3em;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .TwreporterTheme__annotation {
    .Annotation__content {
      ${normalWidthCSS}
      margin: 0 auto 10px auto;
      span {
        color: ${colorGrayscale.gray700} !important;
        background-color: white !important;
      }
    }
  }

  .TwreporterTheme__audio {
    ${largeWidthCSS}
    margin: ${mockup.margin.large};
  }

  .TwreporterTheme__slideshow {
    ${extendWidthCSS}
    margin: ${mockup.margin.extend};
  }

  .TwreporterTheme__textBold {
    font-weight: bold;
  }

  .TwreporterTheme__textItalic {
    font-style: italic;
  }

  .TwreporterTheme__textUnderline {
    text-decoration: underline;
  }

  .TwreporterTheme__textStrikethrough {
    text-decoration: line-through;
  }

  .TwreporterTheme__textUnderlineStrikethrough {
    text-decoration: underline line-through;
  }

  .TwreporterTheme__textSubscript {
    font-size: 0.8em;
    vertical-align: sub !important;
  }

  .TwreporterTheme__textSuperscript {
    font-size: 0.8em;
    vertical-align: super;
  }

  .TwreporterTheme__textLowercase {
    text-transform: lowercase;
  }

  .TwreporterTheme__textUppercase {
    text-transform: uppercase;
  }

  .TwreporterTheme__textCapitalize {
    text-transform: capitalize;
  }

`
