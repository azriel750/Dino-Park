export interface reserveTypeRow {
  id: number | null;
  date: number;
  billets: number;
}

export class reservation {
  protected id: number | null;
  protected date: number;
  protected billets : number;

  constructor(id: number | null, date: number, billets:number,){
    this.id = id;
    this.date = date;
    this.billets = billets;
  }

  static fromRow(row: reserveTypeRow): reservation {
    return new reservation(row.id, row.date, row.billets,);
  }

  getId() {
    return this.id;
  }

  getdate() {
    return this.date;
  }
  getbillets(){
    return this.billets;
  }
}
