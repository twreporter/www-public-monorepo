import styled from '@emotion/styled'
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
`