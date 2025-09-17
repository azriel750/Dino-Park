import { Controller } from "../libs/Controller";
import { attractionRepository } from "../repository/attractions";
import { dinosaureRepository } from "../repository/dinos";


export class GlobalsController extends Controller {

  public async homepage() {
    try {
      // Crée une instance du repository
      const repo = new dinosaureRepository();

      // Récupère tous les dinosaures via le repository
      const dinos = await repo.findAll();

      // Passe les données à la vue
      this.response.render("pages/home", { dinos });
    } catch (err) {
      console.error("Erreur SQL:", err); 
      this.response.status(500).send("Erreur lors de la récupération des dinosaures");
    }
  }

  public login() {
    this.response.render("pages/login", {});
  }
public async attractions (){
  try{
  const repo = new attractionRepository();

  const attraction= await repo.findAll();

  this.response.render("pages/Attractions",{attraction});
} catch (err){
   console.error("Erreur SQL:", err); 
      this.response.status(500).send("Erreur lors de la récupération des attractions");
}
}
}
