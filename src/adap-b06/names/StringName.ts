import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        const length = source.split(this.delimiter).length;
        this.noComponents = length !== 0 ? length : 0;
        this.assertValidNoComponentsAfterConstructorPostcondition();
        this.assertInvariant();
    }

    public doClone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public doGetComponent(x: number): string {
        return this.name.split(this.delimiter)[x];
    }

    public doSetComponent(n: number, c: string): Name {
        const components = this.name.split(this.delimiter);
        components[n] = c;
        const newName = components.join(this.delimiter);
        return new StringName(newName, this.delimiter);
    }

    public doInsert(n: number, c: string): Name {
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, c);
        const newName = components.join(this.delimiter);
        return new StringName(newName, this.delimiter);
    }

    public doAppend(c: string): Name {
        const newName = this.name + this.delimiter + c;
        return new StringName(newName, this.delimiter);
    }

    public doRemove(n: number): Name {
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);
        const newName = components.join(this.delimiter);
        return new StringName(newName, this.delimiter);
    }

    protected assertInvariant(): void {
        InvalidStateException.assert(
            this.noComponents >= 0,
            "Number of components must not be negative"
        );
        InvalidStateException.assert(
            this.name !== null && this.name !== undefined,
            "Name string must not be null or undefined"
        );
        InvalidStateException.assert(
            this.noComponents === Math.floor(this.noComponents),
            "Number of components must be an integer"
        );
        InvalidStateException.assert(
            this.delimiter !== null && this.delimiter !== undefined,
            "Delimiter must not be null or undefined"
        );
        InvalidStateException.assert(
            this.delimiter.length === 1,
            `Delimiter must be a single character, but was: "${this.delimiter}"`
        );
        InvalidStateException.assert(
            this.delimiter !== ESCAPE_CHARACTER,
            `Delimiter must not be the escape character: "${ESCAPE_CHARACTER}"`
        );
    }

}