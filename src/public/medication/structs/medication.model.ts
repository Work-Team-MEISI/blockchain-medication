import * as uuid from "uuid";

export class MedicationModel {
    private readonly _medicationId: string;
    private readonly _signature: string;
    private readonly _alias: string;
    private readonly _basePrice: number;

    public constructor(
        signature: string,
        alias: string,
        basePrice: number,
        medicationId: string | null
    ) {
        this._medicationId = medicationId === null ? uuid.v4() : medicationId;
        this._signature = signature;
        this._alias = alias;
        this._basePrice = basePrice;
    }

    public get medicationId(): string {
        return this._medicationId;
    }

    public get signature(): string {
        return this._signature;
    }

    public get alias(): string {
        return this._alias;
    }

    public get basePrice(): number {
        return this._basePrice;
    }
}