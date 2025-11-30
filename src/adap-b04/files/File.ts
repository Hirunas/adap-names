import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        File.assertValidBaseNamePreconditionLocal(baseName);
        File.assertValidDirectoryPreconditionLocal(parent);
        super(baseName, parent);
    }

    public open(): void {
        this.assertNotDeletedPrecondition();
        this.assertClosedStatePrecondition();
        // do something
        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        this.assertNotDeletedPrecondition();
        this.assertOpenStatePrecondition();
        this.assertValidNoBytesPrecondition(noBytes);
        // read something
        return new Int8Array();
    }

    public close(): void {
        this.assertNotDeletedPrecondition();
        this.assertOpenStatePrecondition();
        // do something
        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertValidNoBytesPrecondition(n: number): void {
        IllegalArgumentException.assert(
            Number.isInteger(n) && n >= 0,
            "Number of bytes must be a non-negative integer"
        );
    }

    protected assertOpenStatePrecondition(): void {
        IllegalArgumentException.assert(
            this.state === FileState.OPEN,
            "File must be open"
        );
    }

    protected assertClosedStatePrecondition(): void {
        IllegalArgumentException.assert(
            this.state === FileState.CLOSED,
            "File must be closed"
        );
    }

    protected assertNotDeletedPrecondition(): void {
        IllegalArgumentException.assert(
            this.state !== FileState.DELETED,
            "File must not be deleted"
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