import { Repository } from "../libs/Repository";
import { billets } from "../models/billets";



export class billetsRepository extends Repository {
  async findAll(): Promise<billets[]> {
    const query = {
      name: "fetch-all-billets",
      text: `SELECT * FROM type_de_billets`, 
    };

    try {
      const result = await this.pool.query(query);

      const data = result.rows.map((row) => billets.fromRow(row));
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}