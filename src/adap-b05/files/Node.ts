import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        const erg =  this.doGetBaseName();
        this.assertInvariant();
        return erg;

    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        const result: Set<Node> = new Set<Node>();

        if (this.getBaseName() === bn) {
            result.add(this);
        }

        return result;
    }

    protected assertInvariant(): void {
        // allow empty baseName only for the root (root's parentNode === root)
        if (this.baseName.length === 0 && this.parentNode as Node !== this as Node )    {
            throw new InvalidStateException("Base name cannot be empty");
        }
        if (this.baseName === null || this.baseName === undefined) {
            throw new InvalidStateException("Base name cannot be null or undefined");
        }
    }
}
