import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.components = source;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    }

    public asString(delimiter: string = this.delimiter): string {
        const s = this.components.join(delimiter);
        return s;
    }

    public asDataString(): string {
        const s:  string[] = []; 
        for (let i = 0; i < this.components.length; i++){
            s.push(this.components[i].replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER).replace(new RegExp(`\\${DEFAULT_DELIMITER}`, "g"), ESCAPE_CHARACTER + DEFAULT_DELIMITER));
        }
        return s.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        if (other.isEmpty()) {
            return;
        }
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

}