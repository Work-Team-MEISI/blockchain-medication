import * as uuid from "uuid";
import * as bcrypt from "bcrypt";

export class UserModel {
    private readonly _userId: string;
    private readonly _email: string;
    private readonly _username: string;
    private readonly _password: string;
    private readonly _firstName: string;
    private readonly _lastName: string;
    private readonly _hashedRefreshToken: string | null;

    public constructor(
        email: string,
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        userId: string | null
    ) {
        this._userId = userId === null ? uuid.v4() : userId;
        this._email = email.toLocaleLowerCase();
        this._username = username.toLocaleLowerCase();
        this._password = bcrypt.hashSync(password, 10);
        this._firstName = firstName.toLocaleLowerCase();
        this._lastName = lastName.toLocaleLowerCase();
        this._hashedRefreshToken = null;
    }

    public get userId(): string {
        return this._userId;
    }

    public get email(): string {
        return this._email;
    }

    public get username(): string {
        return this._username;
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

    public get hashedRefreshToken(): string | null {
        return this._hashedRefreshToken;
    }
}