import { Repository } from "../libs/Repository";
import { Dinosaure } from "../models/dinos";


export class dinosaureRepository extends Repository {
  // Récupère toutes les catégories
  async findAll(): Promise<Dinosaure[]> {
    const query = {
      name: "fetch-all-dinosaure",
      text: `SELECT * FROM dinosaure`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `dinosaure`
      const data = result.rows.map((row) => {
        return new Dinosaure(row.id, row.nom_commun, row.regime, row.description,row.image);
      });

      // [3] Retourne une promesse d'un tableau de `dinosaure`
      return data;
    } catch (error) {
      return [];
    }
  }
}
