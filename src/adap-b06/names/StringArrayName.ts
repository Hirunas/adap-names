import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];
    
        constructor(source: string[], delimiter?: string) {
            super(delimiter);
            this.components = source;
            this.assertValidNoComponentsAfterConstructorPostcondition();
            this.assertInvariant();
        }
    
        public doClone(): Name {
            return new StringArrayName([...this.components], this.delimiter);
        }
    
        public getNoComponents(): number {
            return this.components.length;
        }
    
        public doGetComponent(i: number): string {
            return this.components[i];
        }
    
        public doSetComponent(i: number, c: string): Name {
            const newComponents = [...this.components];
            newComponents[i] = c;
            return new StringArrayName(newComponents, this.delimiter);
        }
    
        public doInsert(i: number, c: string): Name {
            const newComponents = [...this.components];
            newComponents.splice(i, 0, c);
            return new StringArrayName(newComponents, this.delimiter);
        }
    
        public doAppend(c: string): Name {
            const newComponents = [...this.components, c];
            return new StringArrayName(newComponents, this.delimiter);
        }
    
        public doRemove(i: number): Name {
            const newComponents = [...this.components];
            newComponents.splice(i, 1);
            return new StringArrayName(newComponents, this.delimiter);
        }
    
        protected assertInvariant(): void {
            InvalidStateException.assert(
                this.components !== null && this.components !== undefined,
                "Components must not be null or undefined"
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