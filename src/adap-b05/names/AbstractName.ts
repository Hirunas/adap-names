import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    /**
     * @precondition delimiter must be a single valid character
     * @postcondition getDelimiterCharacter() == delimiter
     * @postcondition getNoComponents() > 0
     */
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertValidDelimiterPrecondition(delimiter);
        this.delimiter = delimiter;
        this.assertValidDelimiterPostcondition(delimiter);
    }

    /**
     * @postcondition clone().getDelimiterCharacter() == getDelimiterCharacter()
     * @postcondition clone().getNoComponents() == getNoComponents()
     * @postcondition for i in 0 .. getNoComponents() - 1: clone().getComponent(i) == getComponent(i)
     */
    public clone(): Name {
        const c: Name = this.doClone();
        this.assertValidDelimiterPostcondition(c.getDelimiterCharacter());
        this.assertNoComponentsPostcondition(c.getNoComponents());
        for (let i = 0; i < this.getNoComponents(); i++) {
            this.assertComponentsPostcondition(this.getComponent(i), c.getComponent(i));
        }
        return c;
    }

    protected abstract doClone(): Name;

    /**
     * @precondition delimiter must be a single valid character.
     */
    public asString(delimiter?: string): string {
        this.assertValidDelimiterPrecondition(delimiter ?? this.delimiter);
        const s: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            s.push(this.getComponent(i));
        }
        return s.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const s: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            s.push(this.getComponent(i).replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER).replace(new RegExp(`\\${DEFAULT_DELIMITER}`, "g"), ESCAPE_CHARACTER + DEFAULT_DELIMITER));
        }
        return s.join(DEFAULT_DELIMITER);
    }

    /**
     * @precondition name must be a valid name.
     */
    public isEqual(other: Name): boolean {
        this.assertValidNamePrecondition(other);
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        if (this.delimiter !== other.getDelimiterCharacter()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    /**
     * @precondition i must be a valid index.
     */
    public getComponent(i: number): string {
        this.assertValidIndexPrecondition(i);
        return this.doGetComponent(i);
    }

    protected abstract doGetComponent(i: number): string;

    /**
     * @precondition i must be a valid index and c must be a valid component.
     */
    public setComponent(i: number, c: string): void {
        this.assertValidIndexPrecondition(i);
        this.assertValidComponentPrecondition(c);
        this.doSetComponent(i, c);
        this.assertInvariant();
    }

    protected abstract doSetComponent(i: number, c: string): void;

    /**
     * @precondition i must be a valid index and c must be a valid component.
     */
    public insert(i: number, c: string): void {
        this.assertValidIndexPrecondition(i);
        this.assertValidComponentPrecondition(c);
        this.doInsert(i, c);
        this.assertInvariant();
    }

    protected abstract doInsert(i: number, c: string): void;

    /**
     * @precondition c must be a valid component.
     */
    public append(c: string): void {
        this.assertValidComponentPrecondition(c);
        this.doAppend(c);
        this.assertInvariant();
    }

    protected abstract doAppend(c: string): void;

    /**
     * @precondition i must be a valid index.
     */
    public remove(i: number): void {
        this.assertValidIndexPrecondition(i);
        this.doRemove(i);
        this.assertInvariant();
    }

    protected abstract doRemove(i: number): void;

    /**
     * @precondition other must be a valid name.
     */
    public concat(other: Name): void {
        this.assertValidNamePrecondition(other);
        if (other.isEmpty()) {
            return;
        }
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        this.assertInvariant();
    }

    protected assertValidDelimiterPrecondition(del: string): void {
        if (del.length !== 1) {
            throw new Error("Delimiter must be a single character");
        }
    }

    protected assertValidNamePrecondition(other: Name): void {
        IllegalArgumentException.assert(
            other !== null && other !== undefined,
            `Name must not be null or undefined`
        );
    }

    protected assertValidIndexPrecondition(index: number): void {
        IllegalArgumentException.assert(
            index >= 0 && index < this.getNoComponents(),
            `Index out of bounds: ${index}`
        );
    }

    protected assertValidComponentPrecondition(component: string): void {
        IllegalArgumentException.assert(
            component !== null && component !== undefined,
            `Component must not be null or undefined`
        );
    }

    protected assertValidDelimiterPostcondition(del: string): void {
        MethodFailedException.assert(
            this.delimiter === del,
            `Delimiter must be set to "${del}", but was: "${this.delimiter}"`
        );
    }

    protected assertNoComponentsPostcondition(n: number): void {
        MethodFailedException.assert(
            this.getNoComponents() === n,
            `Number of components must be ${n}, but was: ${this.getNoComponents()}`
        );
    }

    protected assertValidNoComponentsAfterConstructorPostcondition(): void {
        MethodFailedException.assert(
            this.getNoComponents() > 0,
            `Number of components must be > 0, but was: ${this.getNoComponents()}`
        );
    }

    protected assertComponentsPostcondition(expected: string, actual: string): void {
        MethodFailedException.assert(
            expected === actual,
            `Components must be "${expected}", but was: "${actual}"`
        );
    }

    protected abstract assertInvariant(): void;
}