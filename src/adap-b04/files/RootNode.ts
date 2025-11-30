import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.assertValidDirectoryPrecondition(pn);
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        this.assertValidDirectoryPrecondition(to);
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        this.assertValidBaseNamePrecondition(bn);
        // null operation
    }

    protected assertValidDirectoryPrecondition(dir: Directory): void {
        IllegalArgumentException.assert(
            dir !== null && dir !== undefined,
            "Directory must not be null or undefined"
        );
    }

    protected assertValidBaseNamePrecondition(bn: string): void {
        IllegalArgumentException.assert(
            bn !== null && bn !== undefined,
            "Base name must not be null or undefined"
        );
    }

}