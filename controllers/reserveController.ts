import z, { string } from "zod";
import { Controller } from "../libs/Controller";



export class reserveController extends Controller {
  public browsereserves() {
    const success = this.request.query.success;
    let flash = null;

    if (success === "true") {
      flash = {
        type: "success",
        message: "Le livre a bien été créé.",
      };
    } else if (success === "false") {
      flash = {
        type: "error",
        message: "Une erreur est survenue lors de la création du livre.",
      };
    }

    this.response.render("pages/reserve.ejs", {

      flash,
    });
  }

  public readreserve() {
    // Je récupère l'ID du livre réclamé (dans l'URL)
    const requestedId = this.request.params.id;

    // J'exploite l'ID réclamé pour récupérer le livre dans "la base de données"

    // Si je n'ai pas trouvé le livre
   

    // Puisque j'ai trouvé le livre, j'utilise son ID pour identifier les commentaires correspondants au livre
  
    // Si j'ai trouvé le livre
    this.response.render("pages/reserve.ejs", {
     
    });
  }

  public editreserve() {
    this.response.send("Bienvenue sur l'éditon d'un livre");
  }

  // Afficher le formulaire pour créer un livre (ditribue une vue)
  public createreserve() {
    this.response.render("pages/reserveCreate.ejs", {
      values: {},
      errors: {}
    });
  }

  // Affiche rien, on traîte la soumission du formulaire d'ajout d'un livre
  public addreserve() {
    // ICI > reception des données envoyées par le formulaire de création d'un livre
    
    // 1. Déclarer le schéma des données attendues
    const reserveSchema = z.object({
      title: string().min(3, "Trop court").max(50, "Trop long")
    })

    // 2. Comparer les données reçues avec le schéma attendu
    const result = reserveSchema.safeParse(this.request.body)

    if (!result.success) {
      // 3.1 Gestion des erreurs du formulaire
      const errors = z.treeifyError(result.error)

      // 3.2 Afficher le formulaire avec : erreurs + values
      return this.response.status(400).render("pages/reserveCreate.ejs", {
        errors: errors.properties,
        values: this.request.body
      })
    }

    const newreserve = {
    
      title: this.request.body.title,
    };


    this.response.redirect("/reserve?success=true");
  }

  public deletereserve() {
    this.response.send("Bienvenue sur la suppression d'un livre");
  }
}
