type JoinPrefix<Prefix extends string, K extends string> = Prefix extends '' ? K : `${Prefix}.${K}`

type IsPopulatedPath<Paths extends string, Path extends string> = Path extends Paths
  ? true
  : Extract<Paths, `${Path}.${string}`> extends never
    ? false
    : true

/**
 * Makes complex (object/array) fields optional/undefinable unless they are included in `Paths`.
 *
 * Notes:
 * - `Paths` uses the same dot-notation as Strapi `populate` (e.g. `tags.pageCategory`)
 * - If a parent path is not explicitly included but a descendant is (e.g. `tags.pageCategory`),
 *   the parent is treated as populated.
 */
export type DeepOptionalByPopulate<T, Paths extends string, Prefix extends string = ''> =
  T extends readonly (infer U)[]
    ? Array<DeepOptionalByPopulate<U, Paths, Prefix>>
    : T extends object
      ? {
          [K in keyof T]: K extends string
            ? NonNullable<T[K]> extends object
              ? IsPopulatedPath<Paths, JoinPrefix<Prefix, K>> extends true
                ? DeepOptionalByPopulate<T[K], Paths, JoinPrefix<Prefix, K>>
                : DeepOptionalByPopulate<T[K], Paths, JoinPrefix<Prefix, K>> | undefined
              : T[K]
            : T[K]
        }
      : T

