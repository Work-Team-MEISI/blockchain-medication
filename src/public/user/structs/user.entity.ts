import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserEntityCollection } from "../constants/user.entity.collection";

@Entity(UserEntityCollection.ALIAS)
export class UserEntity {

    @PrimaryColumn({ name: UserEntityCollection.COLUMN_USER_ID, type: "varchar", length: 255 })
    public readonly userId!: string;

    @Column({ name: UserEntityCollection.COLUMN_EMAIL, type: "varchar", length: 50, unique: true, nullable: false })
    public readonly email!: string;

    @Column({ name: UserEntityCollection.COLUMN_USERNAME, type: "varchar", length: 50 })
    public readonly username!: string;

    @Column({ name: UserEntityCollection.COLUMN_PASSWORD, type: "varchar", length: 100 })
    public readonly password!: string;

    @Column({ name: UserEntityCollection.COLUMN_FIRST_NAME, type: "varchar", length: 50 })
    public readonly firstName!: string;

    @Column({ name: UserEntityCollection.COLUMN_LAST_NAME, type: "varchar", length: 50 })
    public readonly lastName!: string;

    @Column({ name: UserEntityCollection.COLUMN_HASHED_REFRESH_TOKEN, type: "varchar", length: 100, nullable: true })
    public readonly hashedRefreshToken!: string;
}