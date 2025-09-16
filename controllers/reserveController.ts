import { Controller } from "../libs/Controller";
import { billetsRepository } from "../repository/billets";
import { reservationRepository } from "../repository/reserverepository";

export class reserveController extends Controller {

  public async browsereserves() {
    const repo = new billetsRepository();
    const billets = await repo.findAll();

    this.response.render("pages/reserve.ejs", {
      billets, 
      flash: null
    });
  }

  public async paiement() {
    const { nom, date_reservation } = this.request.body;

    const billetRepo = new billetsRepository();
    const billets = await billetRepo.findAll();

    const billetsChoisis: { billet: any; quantite: number }[] = [];

    billets.forEach(b => {
      const quantite = Number(this.request.body[`quantite_${b.getId()}`] || 0);
      if (quantite > 0) {
        billetsChoisis.push({ billet: b, quantite });
      }
    });

    if (billetsChoisis.length === 0) {
      return this.response.status(400).send("Veuillez sélectionner au moins un billet.");
    }

    // Calcul du montant total
    let montant_total = 0;
    billetsChoisis.forEach(item => {
      montant_total += item.billet.getTarifUnitaire() * item.quantite;
    });

    // Création de la réservation en base (nom NON utilisé)
    const id_clients = 1; // valeur fixe pour l'exemple
    const reservationRepo = new reservationRepository();
    const reservation = await reservationRepo.create(
      id_clients,
      date_reservation,
      billetsChoisis,
      montant_total
    );

    // Affichage de la confirmation avec le nom côté front seulement
    this.response.render("pages/confirmation", {
      reservation,
      billetsChoisis,
      nom_client: nom,
       date_reservation: date_reservation
    });
  }
}
