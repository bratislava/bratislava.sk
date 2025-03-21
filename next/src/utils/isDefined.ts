export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export type ObjWithAttributes = {
  attributes?: Record<string, unknown> | null | undefined
}

export type WithRequired<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: NonNullable<Type[Property]>
}

export type WithAttributes<Type extends ObjWithAttributes> = WithRequired<Type, 'attributes'>

export function hasAttributes<T extends ObjWithAttributes>(
  value: T | null | undefined,
): value is WithAttributes<T> {
  return isDefined(value) && 'attributes' in value && isDefined(value.attributes)
}

export function withAttributes<T extends ObjWithAttributes>(
  value: T | null | undefined,
): WithAttributes<T> | null | undefined {
  if (isDefined(value)) {
    if (hasAttributes(value)) {
      return value
    }
    return null
  }
  return value
}
