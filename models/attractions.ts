export interface attractionTypeRow {
  nom_de_l_attraction: string;
description:string;
image:string;
}

export class attraction {
  protected nom_de_l_attraction: string;
  protected description:string;
protected image :string;
  constructor( nom: string,description:string,image:string){
    this.nom_de_l_attraction = nom;
    this.description= description;
this.image= image;
  }

  static fromRow(row: attractionTypeRow): attraction {
    return new attraction(row.nom_de_l_attraction,row.description,row.image);
  }
  getnom() {
    return this.nom_de_l_attraction;
  }
  
  getdescription(){
    return this.description;
  }
  getimage(){
    return this.image
  }
}

