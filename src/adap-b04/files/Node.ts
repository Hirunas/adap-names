import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.assertValidBaseNamePrecondition(bn);
        this.assertValidDirectoryPrecondition(pn);
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.assertValidDirectoryPrecondition(pn);
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.assertValidDirectoryPrecondition(to);
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        this.assertValidDirectoryPrecondition(this.parentNode);
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertValidBaseNamePrecondition(bn);
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.assertValidBaseNamePrecondition(bn);
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
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
