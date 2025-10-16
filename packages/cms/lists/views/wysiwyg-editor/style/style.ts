import styled from '@emotion/styled'
import { css } from '@emotion/css'
import {
  mobileOnly,
  tabletOnly,
  desktopOnly,
  hdOnly,
} from '../utils/media-query'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

export const LexicalBox = styled.div`
  background-color: #fafbfc;
  border: 1px solid #e1e5e9;
  border-radius: 6px;

  &.fullscreen {
    z-index: 1000;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 20px;
    background-color: ${colorGrayscale.gray100};
    max-height: 100vh;
    overflow-y: scroll;

    .editor-shell {
      max-width: 1000px;
    }

    .editor-container {
      height: 100vh;
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
    max-width: 1100px;
    position: relative;
    line-height: 1.7;
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
  }

  .TwreporterTheme__paragraph {
    ${normalWidthCSS}
    margin: ${mockup.margin.normal};
    font-size: 18px;
    position: relative;
  }

  .TwreporterTheme__h2, .TwreporterTheme__h3 {
    ${normalWidthCSS}
    margin: ${mockup.margin.normal};
  }

  .TwreporterTheme__ul, TwreporterTheme__ol {
    ${normalWidthCSS}
    margin: ${mockup.margin.normal};
  }

  .TwreporterTheme__annotation {
    ${normalWidthCSS}
    margin: ${mockup.margin.normal};
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
