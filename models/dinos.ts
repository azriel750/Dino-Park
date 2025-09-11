export interface dinosaureTypeRow {
  id: number | null;
  nom: string;
  régime: string;
description:string;
}

export class dinosaure {
  protected id: number | null;
  protected nom: string;
  protected régime : string;
  protected description:string;

  constructor(id: number | null, nom: string, régime:string,description:string,){
    this.id = id;
    this.nom = nom;
    this.régime = régime;
    this.description= description;
  }

  static fromRow(row: dinosaureTypeRow): dinosaure {
    return new dinosaure(row.id, row.nom, row.régime, row.description);
  }

  getId() {
    return this.id;
  }

  getnom() {
    return this.nom;
  }
  getrégime(){
    return this.régime;
  }
  getdescription(){
    return this.description;
  }
}

