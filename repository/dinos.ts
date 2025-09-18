import { Repository } from "../libs/Repository";
import { Dinosaure } from "../models/dinos";


export class dinosaureRepository extends Repository {

  async findAll(): Promise<Dinosaure[]> {
    const query = {
      name: "fetch-all-dinosaure",
      text: `SELECT * FROM dinosaure`,
    };

    try {

      const result = await this.pool.query(query);

      const data = result.rows.map((row) => {
        return new Dinosaure(row.id, row.nom_commun, row.regime, row.description,row.image);
      });

      return data;
    } catch (error) {
      return [];
    }
  }
}
