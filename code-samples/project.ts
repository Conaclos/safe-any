
import { SafeAny } from "../"

import { Person } from "./person"
import { Group } from "./group"


export class Project {

    readonly name: string

    readonly team: Person | Group

    constructor (name: string, team: Person | Group) {
        this.name = name
        this.team = team
    }

    /**
     * @param x
     * @return Project from x. undefined if x is mal-formed
     */
    static fromPlain (x: SafeAny<Project>): Project | undefined {
        if (typeof x === "object" && x !== null && typeof x.name === "string") {
            let team: Person | Group | undefined =
                Person.fromPlain(x.team as SafeAny<Person>)
            if (team === undefined) {
                team = Group.fromPlain(x.team as SafeAny<Group>)
            }
            if (team !== undefined) {
                return new Project(x.name, team)
            }
        }
        return undefined
    }

}

