export class RefreshTokenDTO {
    private readonly _refreshToken: string;

    public constructor(
        refreshToken: string
    ) {
        this._refreshToken = refreshToken;
    }

    public get refreshToken(): string {
        return this._refreshToken;
    }
}