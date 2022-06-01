export class FetchUserDTO {
    private readonly _userId: string;

    public constructor(
        userId: string
    ) {
        this._userId = userId;
    }

    public get userId(): string {
        return this._userId;
    }
}