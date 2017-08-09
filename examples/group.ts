
import { SafeAny } from "../"

import { Person } from "./person"


export class Group {

    readonly participants: Person[]

    readonly leader?: Person

    hasLeader (): boolean {
        return this.leader !== undefined
    }

    constructor (participants: Person[], leader?: Person) {
        this.participants = participants
        this.leader = leader
    }

    /**
     * @param x
     * @return Group from x. undefined if x is mal-formed
     */
    static fromPlain (x: SafeAny<Group>): Group | undefined {
        if (typeof x === "object" && x !== null &&
            x.participants instanceof Array) {

            // Well-formed if all partiicipants are well-formed.
            const participants: Person[] | undefined = x.participants.reduce (
                (acc, itm: SafeAny<Person>) => {
                    if (acc !== undefined) {
                        const p: Person | undefined = Person.fromPlain(itm)
                        if (p !== undefined) {
                            return [p, ...acc]
                        }
                    }
                    return undefined
                }, [])

            if (participants !== undefined) {
                // Well-formed if no leader or if well-formed leader
                // Accept null value for no leader
                if (x.leader === undefined || x.leader === null) {
                    return new Group(participants)
                } else {
                    const leader = Person.fromPlain(x.leader)
                    if (leader !== undefined) {
                        return new Group(participants, leader)
                    }
                }
            }
        }
        return undefined
    }

}

