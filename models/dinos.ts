export interface dinosaureTypeRow {
  id: number | null;
  nom_commun: string;
  regime: string;
description:string;
}

export class dinosaure {
  protected id: number | null;
  protected nom_commun: string;
  protected regime : string;
  protected description:string;

  constructor(id: number | null, nom: string, régime:string,description:string,){
    this.id = id;
    this.nom_commun = nom;
    this.regime = régime;
    this.description= description;
  }

  static fromRow(row: dinosaureTypeRow): dinosaure {
    return new dinosaure(row.id, row.nom_commun, row.regime, row.description);
  }

  getId() {
    return this.id;
  }

  getnom() {
    return this.nom_commun;
  }
  getrégime(){
    return this.regime;
  }
  getdescription(){
    return this.description;
  }
}

