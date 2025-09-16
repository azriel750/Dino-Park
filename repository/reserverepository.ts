import { Repository } from "../libs/Repository";
import { reservation } from "../models/reserve";

export class reservationRepository extends Repository {

  async findAll(): Promise<reservation[]> {
    const query = { text: "SELECT * FROM reservation" };
    const result = await this.pool.query(query);
    return result.rows.map(row => reservation.fromRow(row));
  }

  async create(
    id_client: number,
    date_reservation: string,
    billets: { billet: any, quantite: number }[],
    montant_total: number
  ): Promise<reservation> {

    let lastInserted: any;

    for (const item of billets) {
      const query = {
        text: `
          INSERT INTO reservation (
            id_clients, 
            date_de_la_reservation, 
            billet_associe_a_la_commande, 
            quantite, 
            montant_total
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
        `,
        values: [
          id_client,
          date_reservation,
          item.billet.getId(),
          item.quantite,
          item.billet.getTarifUnitaire() * item.quantite
        ],
      };

      const result = await this.pool.query(query);
      lastInserted = result.rows[0];
    }

    return reservation.fromRow(lastInserted);
  }
}
