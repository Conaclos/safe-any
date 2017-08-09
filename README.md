
# Safe any

[![travis][travis-image]][travis-url]

[![Standard Version][sv-image]][sv-url]
[![NPM version][npm-image]][npm-url]

`SafeAny` provides a type-safe alternative to TypeScript `any`. It enforces
 a complete type test.

We first motivate the need of an alternative to TypeScript `any` type. Then we
 introduce how to use `SafeAny`.


## TypeScript any is evil

Type `any` was introduced in TypeScript for gradual typing. In particular to
 progressively type an existing JavaScript project.

In a pure TypeScript project, `any` is only used to bypass the compiler.
  By using `any` you tell to the compiler to keep away and to blindly trust you.

For instance the following code compiles with strict null checks:

```typescript
const x: any = null
const fullname = x.fullname
```

`Object | null | undefined` provides a type-safe replacement in most of the
 cases where `any` is involved.

However, this latter type does not allow to structurally test an object.

The following code is invalid:

```typescript
const x: Object | null | undefined = ...
if (x !== null && typeof x === "object") {
    if (typeof x.fullname === "string") {
        //> error: Property 'fullname' does not exist
    }
}

```

A compiler-compliant alternative could be:

```typescript
const x: Object | null | undefined = ...
if (x !== null && typeof x === "object") {
    const y: {fullname?: Object | null} = x as {fullname?: Object | null}

    if (typeof y.fullname === "string") {
        const fullname = y.fullname
    }
}

```

This is a simple test. Imagine a test over a complex object structure with
 nested objects... Futhermore, the test is error-prone. If you forget to
 null-check `x`, the compiler does not blame you since there is a
  type-assertion. Is that really better than `any`? I guess no.


## Type-safe test

`SafeAny` provides a way to defensively test if an object is valid, without
 any type-assertion or compiler tricks.

If you wish to test if an object `x` is structurally equivalent to an object of
 type `T`, then `x` must be typed as `SafeAny<T>`. You can assign everyting
 to `x`.

As an example assume that we receive a well-formed json string. The sender
 claims that the json string represents a `Person`. The following sample enables
 to test its claim:

 ```typescript
type Person = {fullname: string, birthYear: number}

const x: SafeAny<Person> = JSON.parse(untrustedJson)
if (typeof x === "object" && x !== null &&
    typeof x.fullname === "string" && typeof x.birthYear === "number") {

    // x is a Person
}
```

More examples are availables in `code-samples`.


## FAQ

### Should I place this package as dev or production dependency?

If you use `SafeAny` in at least one exported interface, you have to place this
 package as production dependency.

```bash
npm install safe-any
```

In contrast, if `SafeAny` is only internally used, you can place this package as
 a dev dependency.

```bash
npm install --save-dev safe-any
```

### What about type-union?

If `T1` and `T2` have at least one common property name, then a source of type
 `SafeAny<T1 | T2>` is assignable to a target of type `SafeAny<T1>` or
 `SafeAny<T2>`. Otherwise, you have to make a type assertion.


[travis-image]:
https://img.shields.io/travis/Conaclos/safe-any/master.svg
[travis-url]: https://travis-ci.org/Conaclos/safe-any
[sv-image]:
https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=flat-square
[sv-url]:
https://github.com/conventional-changelog/standard-version
[npm-image]:
https://img.shields.io/npm/v/safe-any.svg?style=flat-square
[npm-url]:
https://www.npmjs.com/package/safe-any

