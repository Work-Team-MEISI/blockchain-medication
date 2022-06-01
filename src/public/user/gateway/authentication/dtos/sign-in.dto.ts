export class SignInDTO {
    private readonly _email: string;
    private readonly _password: string;

    public constructor(
        email: string,
        password: string,
    ) {
        this._email = email;
        this._password = password;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }
}