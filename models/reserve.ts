export interface reservationTypeRow {
  id_reservation: number | null;
  date_de_la_reservation: string; // ou Date si tu veux manipuler un objet Date
  billet_associe_a_la_commande: number;
  id_clients: number;
  quantite: number;
  montant_total: number;
}

export class reservation {
  constructor(
    public id_reservation: number | null,
    public date_de_la_reservation: string,
    public billet_associe_a_la_commande: number,
    public id_clients: number,
    public quantite: number,
    public montant_total: number
  ) {}

  static fromRow(row: reservationTypeRow): reservation {
    return new reservation(
      row.id_reservation,
      row.date_de_la_reservation,
      row.billet_associe_a_la_commande,
      row.id_clients,
      row.quantite,
      row.montant_total
    );
  }
}
