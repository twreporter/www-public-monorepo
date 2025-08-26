type RadioArgObject<T> = {
  defaultValue: T
  options: T[]
  control: { type: 'radio' }
}

export function getRadioArgFromObject<T extends string | number>(
  object: Record<string, T>,
  defaultValue: T
): RadioArgObject<T> {
  return {
    defaultValue,
    options: Object.values(object),
    control: { type: 'radio' },
  }
}

type RadioArgEnum<E> = {
  defaultValue: E
  options: string[]
  mapping: Record<string, E>
  control: { type: 'radio' }
}

export function getRadioArgFromEnum<E extends Record<string, string | number>>(
  enumObject: E,
  defaultValue: E[keyof E]
): RadioArgEnum<E[keyof E]> {
  // Only keep "real" keys (filter numeric reverse mapping)
  const keys = Object.keys(enumObject).filter((key) =>
    Number.isNaN(Number(key))
  )

  const mapping: Record<string, E[keyof E]> = {}
  keys.forEach((key) => {
    mapping[key] = enumObject[key as keyof E]
  })

  // Find the key corresponding to the default value
  const defaultKey =
    keys.find((key) => enumObject[key as keyof E] === defaultValue) || keys[0]

  return {
    defaultValue: enumObject[defaultKey as keyof E],
    options: keys,
    mapping,
    control: { type: 'radio' },
  }
}
