
/**
 * SafeAny enables to defensively test if an object is valid.
 *
 * As an example assume that we receive a well-formed json string. The sender
 * claims that the json string represents `Person`.  The following sample
 * enables to test its claim:
 *
 * ```
 * type Person = {fullname: string, birthYear: number}
 *
 * const x: SafeAny<Person> = JSON.parse(untrustedJson)
 * if (typeof x === "object" && x !== null &&
 *      typeof x.fullname === "string" && typeof x.birthYear === "number") {
 *
 *      // x is a Person
 * }
 * ```
 */
export type SafeAny <T = object> = {
    [k in keyof T]?: SafeAny<T[k]>
} | boolean | number | string | symbol | null | undefined

