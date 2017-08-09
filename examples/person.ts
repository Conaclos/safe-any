
import { SafeAny } from "../"


export class Person {

    readonly fullname: string

    readonly birthYear: number

    constructor (fullname: string, birthYear: number) {
        this.fullname = fullname
        this.birthYear = birthYear
    }

    /**
     * @param x
     * @return Person from x. undefined if x is mal-formed.
     */
    static fromPlain (x: SafeAny<Person>): Person | undefined {
        if (typeof x === "object" && x !== null &&
            typeof x.fullname === "string" && typeof x.birthYear === "number" &&
            Number.isSafeInteger(x.birthYear) && x.birthYear > 0) {

            return new Person(x.fullname, x.birthYear)
        } else {
            return undefined
        }
    }

}

