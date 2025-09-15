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

    this.response.render("pages/reserve.ejs", {
     
    });
  }

  public editreserve() {
    this.response.send("Bienvenue sur l'éditon d'un livre");
  }


  public createreserve() {
    this.response.render("pages/reserveCreate.ejs", {
      values: {},
      errors: {}
    });
  }


  public addreserve() {
    
    const reserveSchema = z.object({
      title: string().min(3, "Trop court").max(50, "Trop long")
    })


    const result = reserveSchema.safeParse(this.request.body)

    if (!result.success) {

      const errors = z.treeifyError(result.error)

 
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
  public paiement() {
    const { nom, typeBillet, quantite, montantTotal } = this.request.body;

    // Ici tu pourrais insérer la réservation en DB
    // await ReservationRepository.save(...);

    // Une fois payé → redirection vers confirmation avec les infos
    this.response.render("pages/confirmation", {
      nom,
      typeBillet,
      quantite,
      montantTotal,
    });
  }
}


