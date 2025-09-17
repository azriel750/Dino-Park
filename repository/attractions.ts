import { Repository } from "../libs/Repository";
import { attraction } from "../models/attractions";


export class attractionRepository extends Repository {

  async findAll(): Promise<attraction[]> {
    const query = {
      name: "fetch-all-attraction",
      text: `SELECT * FROM attraction`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `attraction`
      const data = result.rows.map((row) => {
        return new attraction(row.nom_de_l_attraction,row.description,row.image,);
      });

      // [3] Retourne une promesse d'un tableau de `attraction`
      return data;
    } catch (error) {
      return [];
    }
  }
}
