import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.name = source;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.noComponents = source === "" ? 0 : this.name.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.replace(new RegExp(`\\${this.delimiter}`, "g"), delimiter);
    }

    public asDataString(): string {
        return this.name.replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER).replace(new RegExp(`\\${this.delimiter}`, "g"), ESCAPE_CHARACTER + DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        return this.name.split(this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components[n] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string): void {
        this.name += this.delimiter + c;
        this.noComponents += 1;
    }

    public remove(n: number): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;
    }

    public concat(other: Name): void {
        if (other.isEmpty()) {
            return;
        }
        const s = other.asDataString().replace(other.getDelimiterCharacter(), this.delimiter);
        this.name += this.delimiter + s;
        this.noComponents += other.getNoComponents();
    }

}