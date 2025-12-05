import { Node } from "./Node";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { Exception } from "../common/Exception";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }  

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        const result: Set<Node> = new Set<Node>();

        for (const child of this.childNodes) {
            try {
                child.findNodes(bn).forEach(n => result.add(n));
            } catch (e) {
                if (e instanceof ServiceFailureException){
                    throw new ServiceFailureException("Failed to find nodes", (e as Exception).getTrigger() as Exception);
                }
                else {
                    throw new ServiceFailureException("Failed to find nodes", e as Exception);
                }
            }
        }
        if (this.getBaseName() === bn) {
            result.add(this);
        }
        return result;
    }

}