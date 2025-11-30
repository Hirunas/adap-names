import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        Link.assertValidBaseNamePreconditionLocal(bn);
        Link.assertValidDirectoryPreconditionLocal(pn);

        super(bn, pn);

        if (tn !== undefined) {
            this.assertValidTargetNodePrecondition(tn);
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        this.assertValidTargetNodePrecondition(target);
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        this.assertValidBaseNamePrecondition(bn);
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        this.assertValidTargetNodePrecondition(target);
        const result: Node = this.targetNode as Node;
        return result;
    }

    protected assertValidTargetNodePrecondition(target: Node | null | undefined): void {
        IllegalArgumentException.assert(
            target !== null && target !== undefined,
            "Target node must not be null or undefined"
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