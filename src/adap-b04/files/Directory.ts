import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        Directory.assertValidBaseNamePreconditionLocal(bn);
        Directory.assertValidDirectoryPreconditionLocal(pn);
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        this.assertValidChildNodePrecondition(cn);
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.assertValidChildNodePrecondition(cn);
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.assertValidChildNodePrecondition(cn);
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    protected assertValidChildNodePrecondition(cn: Node): void {
        IllegalArgumentException.assert(
            cn !== null && cn !== undefined,
            "Child node must not be null or undefined"
        );
    }

    // Local helper assertions for constructor preconditions (usable before super)
    private static assertValidBaseNamePreconditionLocal(bn: string): void {
        IllegalArgumentException.assert(
            bn !== null && bn !== undefined,
            "Base name must not be null or undefined"
        );
    }

    private static assertValidDirectoryPreconditionLocal(pn: Directory): void {
        IllegalArgumentException.assert(
            pn !== null && pn !== undefined,
            "Directory must not be null or undefined"
        );
    }
}