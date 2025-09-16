export interface billetTypeRow {
  id: number;
  intitulé: string;
  tarif_unitaire: number;
  description: string;
}

export class billets {
  protected id: number;
  protected intitulé: string;
  protected tarif_unitaire: number;
  protected description: string;

  constructor(id: number, intitulé: string, tarif_unitaire: number, description: string) {
    this.id = id;
    this.intitulé = intitulé;
    this.tarif_unitaire = tarif_unitaire;
    this.description = description;
  }

  // Hydratation depuis la DB
  static fromRow(row: billetTypeRow): billets {
    return new billets(row.id, row.intitulé, row.tarif_unitaire, row.description);
  }

  // === Getters ===
  getId(): number {
    return this.id;
  }

  getIntitule(): string {
    return this.intitulé;
  }

  getTarifUnitaire(): number {
    return this.tarif_unitaire;
  }

  getDescription(): string {
    return this.description;
  }
}
