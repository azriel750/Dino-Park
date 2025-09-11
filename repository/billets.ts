import { Repository } from "../libs/Repository";
import { billets } from "../models/billets";



export class billetsRepository extends Repository {
  // Récupère toutes les catégories
async findAll(): Promise<billets[]> {
  const query = {
    name: "fetch-all-billets",
    text: `SELECT * FROM billets`,
  };

  try {
    const result = await this.pool.query(query);

    // On transforme les rows en instances de billets
    const data = result.rows.map((row) => billets.fromRow(row));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}}