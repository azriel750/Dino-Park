import { Repository } from "../libs/Repository";
import { reservation } from "../models/reserve";



export class reservationRepository extends Repository {
  // Récupère toutes les catégories
  async findAll(): Promise<reservation[]> {
    const query = {
      name: "fetch-all-reserve",
      text: `SELECT * FROM reserve`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `reserve`
      const data = result.rows.map((row) => {
        return new reservation(row.id, row.date, row.billets);
      });

      // [3] Retourne une promesse d'un tableau de `reserve`
      return data;
    } catch (error) {
      return [];
    }
  }
}
