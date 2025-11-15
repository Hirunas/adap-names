import { Printable } from "../common/Printable";

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export interface Name extends Printable {

    /**
     * Returns true, if number of components == 0; else false
     */
    isEmpty(): boolean;

    /** 
     * Returns number of components in Name instance
     */
    getNoComponents(): number;

    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    asString(delimiter?: string): string;

    /** 
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */
    asDataString(): string;

    /** Returns properly masked component string */
    getComponent(i: number): string;

    /** Expects that new Name component c is properly masked */
    setComponent(i: number, c: string): void;

    /** Expects that new Name component c is properly masked */
    insert(i: number, c: string): void;

    /** Expects that new Name component c is properly masked */
    append(c: string): void;

    remove(i: number): void;
    
    concat(other: Name): void;
    
}