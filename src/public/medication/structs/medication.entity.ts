import { Column, Entity, PrimaryColumn } from "typeorm";
import { MedicationEntityCollection } from "../constants/medication.entity.collection";

@Entity(MedicationEntityCollection.ALIAS)
export class MedicationEntity {

    @PrimaryColumn({ name: MedicationEntityCollection.COLUMN_MEDICATION_ID, type: "varchar", length: 255 })
    public medicationId!: string;

    @Column({ name: MedicationEntityCollection.COLUMN_SIGNATURE, type: "varchar", length: 50, unique: true, nullable: false })
    public signature!: string;

    @Column({ name: MedicationEntityCollection.COLUMN_ALIAS, type: "varchar", length: 50, nullable: false })
    public alias!: string;

    @Column({ name: MedicationEntityCollection.COLUMN_BASE_PRICE, type: "numeric" })
    public basePrice!: number;
}