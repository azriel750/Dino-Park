import { ReservationInput, reservationSchema } from "../libs/validation/reserveSchema";
import { reservationRepository } from "../repository/reserverepository";
import { billetsRepository } from "../repository/billets";
import { Controller } from "../libs/Controller";
import { ZodError } from "zod";

export class reserveController extends Controller {

  // Affiche le formulaire avec tous les billets
  public async browsereserve() {
    const repo = new billetsRepository();
    const billets = await repo.findAll();

    return this.response.render("pages/reserve", {
      billets,
      errors: [],
      values: {}
    });
  }

  // Paiement simulé
  public async paiement() {
    try {
      const billetRepo = new billetsRepository();
      const billets = await billetRepo.findAll();

      // Construction tickets dynamiques
      const tickets: Record<string, number> = {};
      billets.forEach(b => {
        tickets[`quantite_${b.getId()}`] = Number(this.request.body[`quantite_${b.getId()}`] || 0);
      });

      // Construction formData pour Zod
      const formData: ReservationInput = {
        firstName: this.request.body.firstName,
        lastName: this.request.body.lastName,
        visitDate: this.request.body.visitDate,
        tickets,
        cardNumber: this.request.body.cardNumber,
        expiry: this.request.body.expiry,
        cvv: this.request.body.cvv,
        maskedCard: this.request.body.maskedCard || ""
      };

      // Validation Zod
      const data = reservationSchema.parse(formData);

      // Vérifier qu’au moins un billet est sélectionné
      const billetsChoisis = billets
        .filter(b => tickets[`quantite_${b.getId()}`] > 0)
        .map(b => ({ billet: b, quantite: tickets[`quantite_${b.getId()}`] }));

      if (billetsChoisis.length === 0) {
        return this.response.render("pages/reserve", {
          billets,
          errors: [{ path: ["tickets"], message: "Veuillez sélectionner au moins un billet." }],
          values: this.request.body
        });
      }

      // Calcul montant total
      const montant_total = billetsChoisis.reduce(
        (sum, item) => sum + item.billet.getTarifUnitaire() * item.quantite,
        0
      );

      // Création réservation (simulée)
      const id_clients = 1;
      const reservationRepo = new reservationRepository();
      const reservation = await reservationRepo.create(
        id_clients,
        data.visitDate,
        billetsChoisis,
        montant_total
      );

      // Affichage confirmation
      return this.response.render("pages/confirmation", {
        reservation,
        billetsChoisis,
        nom_client: data.firstName + " " + data.lastName,
        date_reservation: reservation.date_de_la_reservation,
        montant_total
      });

    } catch (err) {
      if (err instanceof ZodError) {
        // Recharger formulaire avec erreurs et valeurs saisies
        const billetRepo = new billetsRepository();
        const billets = await billetRepo.findAll();

        if (err instanceof ZodError) {
          return this.response.render("pages/reserve", {
            billets,
            errors: err.issues,
            values: this.request.body
          });
        } else {
          console.error("Erreur serveur:", err);
          return this.response.status(500).render("pages/reserve", {
            billets: [],
            errors: [{ path: ["global"], message: "Erreur serveur, réessayez plus tard." }],
            values: this.request.body
          });
        }
      }
    }
  }
}
