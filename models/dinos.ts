export interface DinosaureTypeRow {
  id: number | null;
  nom_commun: string;
  regime: string;
  description: string;
  image: string;
}

export class Dinosaure {
  protected id: number | null;
  protected nom_commun: string;
  protected regime: string;
  protected description: string;
  protected image: string;

  constructor(
    id: number | null,
    nom: string,
    regime: string,
    description: string,
    image: string
  ) {
    this.id = id;
    this.nom_commun = nom;
    this.regime = regime;
    this.description = description;
    this.image = image;
  }

  static fromRow(row: DinosaureTypeRow): Dinosaure {
    return new Dinosaure(
      row.id,
      row.nom_commun,
      row.regime,
      row.description,
      row.image 
    );
  }
  getId(): number | null {
    return this.id;
  }

  getNom(): string {
    return this.nom_commun;
  }

  getRegime(): string {
    return this.regime;
  }

  getDescription(): string {
    return this.description;
  }

  getImage(): string {
    return this.image;
  }
}
