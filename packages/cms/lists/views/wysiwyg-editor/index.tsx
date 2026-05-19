import type {
  FieldController,
  FieldControllerConfig,
  FieldProps,
  JSONValue,
} from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React, { useMemo } from 'react'
// lexical
import { LexicalEditor } from '@twreporter/lexical-editor'
import { LexicalBox, StyleWrapper } from './style'
// config
import createLexicalEditorConfig, { getFieldFeatureOverride } from './config'
// css
import '@twreporter/lexical-editor/style'

type WysiwygFieldController = FieldController<string, string> & {
  listKey: string
}

export const Field = ({
  value,
  field,
  onChange,
}: FieldProps<typeof controller>) => {
  const valueJSON = useMemo(
    () => (value ? JSON.parse(value) : null),
    [value]
  )
  const lexicalEditorConfig = useMemo(
    () => {
      const features = getFieldFeatureOverride(field.listKey, field.path)

      return createLexicalEditorConfig({
        ...(features ? { features } : {}),
      })
    },
    [field.listKey, field.path]
  )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <LexicalBox id="www-lexical-editor">
        <StyleWrapper>
          <LexicalEditor
            value={valueJSON}
            onChange={onChange}
            config={lexicalEditorConfig}
          />
        </StyleWrapper>
      </LexicalBox>
    </FieldContainer>
  )
}

type ControllerConfig = FieldControllerConfig<{ defaultValue: JSONValue }>

export const controller = (
  config: ControllerConfig
): WysiwygFieldController => ({
  listKey: config.listKey,
  path: config.path,
  label: config.label,
  description: config.description,
  graphqlSelection: config.path,
  defaultValue:
    config.fieldMeta.defaultValue === null
      ? ''
      : JSON.stringify(config.fieldMeta.defaultValue, null, 2),
  validate: (value) => {
    if (!value) {
      return true
    }

    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  },
  deserialize: (data) => {
    const fieldValue = data[config.path]

    if (fieldValue === null) {
      return ''
    }

    return JSON.stringify(fieldValue, null, 2)
  },
  serialize: (fieldValue) => {
    if (!fieldValue) {
      return { [config.path]: null }
    }

    try {
      return { [config.path]: JSON.parse(fieldValue) }
    } catch {
      return { [config.path]: undefined }
    }
  },
})
