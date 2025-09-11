export interface billetsTypeRow {
  id: number | null;
  intitule: string;
  tarif_unitaire: number;
}

export class billets {
  protected id: number | null;
  protected intitule: string;
  protected tarif_unitaire : number;

  constructor(id: number | null, intitule: string, tarif_unitaire:number,){
    this.id = id;
    this.intitule = intitule;
    this.tarif_unitaire = tarif_unitaire;
  }

  static fromRow(row: billetsTypeRow): billets {
    return new billets(row.id, row.intitule, row.tarif_unitaire,);
  }

  getId() {
    return this.id;
  }

  getintitule() {
    return this.intitule;
  }
  gettarif_unitaire(){
    return this.tarif_unitaire;
  }
}
