import { Repository } from "../libs/Repository";
import { attraction } from "../models/attractions";


export class attractionRepository extends Repository {

  async findAll(): Promise<attraction[]> {
    const query = {
      name: "fetch-all-attraction",
      text: `SELECT * FROM attraction`,
    };

    try {

      const result = await this.pool.query(query);


      const data = result.rows.map((row) => {
        return new attraction(row.nom_de_l_attraction,row.description,row.image,);
      });

      return data;
    } catch (error) {
      return [];
    }
  }
}
