import { AbstractResponse } from "../../abstracts/response.abstract";

export class DeleteResponseModel<T> extends AbstractResponse<T> {
    private readonly _oldResourceURL: string | null;

    public constructor(
        resourceId: string,
        resourceArgs: T | null,
        oldResourceURL: string | null,
    ) {
        super(resourceId, resourceArgs);

        this._oldResourceURL = oldResourceURL;
    }

    public get oldResourceURL(): string | null {
        return this._oldResourceURL;
    }
}