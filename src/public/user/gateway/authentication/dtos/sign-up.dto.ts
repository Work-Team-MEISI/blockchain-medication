export class SignUpDTO {
    private readonly _username: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _firstName: string;
    private readonly _lastName: string;

    public constructor(
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }
}