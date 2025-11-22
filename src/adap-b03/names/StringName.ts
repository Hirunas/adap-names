import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = source.split(this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
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

}