import { Repository } from "../libs/Repository";
import { dinosaure } from "../models/Dinos";




export class dinosaureRepository extends Repository {
  // Récupère toutes les catégories
  async findAll(): Promise<dinosaure[]> {
    const query = {
      name: "fetch-all-dinosaure",
      text: `SELECT * FROM dinosaure`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `dinosaure`
      const data = result.rows.map((row) => {
        return new dinosaure(row.id, row.nom, row.régime, row.description);
      });

      // [3] Retourne une promesse d'un tableau de `dinosaure`
      return data;
    } catch (error) {
      return [];
    }
  }
}
