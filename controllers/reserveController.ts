import { ReservationInput, reservationSchema } from "../libs/validation/reserveSchema";
import { reservationRepository } from "../repository/reserverepository";
import { billetsRepository } from "../repository/billets";
import { Controller } from "../libs/Controller";
import { ZodError } from "zod";

export class reserveController extends Controller {

  public async browsereserve() {
    const repo = new billetsRepository();
    const billets = await repo.findAll();

    return this.response.render("pages/reserve", {
      billets,
      errors: [],
      values: {}
    });
  }
public async paiement() {
  console.log("[PAIEMENT] Début, body:", this.request.body);

  try {
    const billetRepo = new billetsRepository();
    const billets = await billetRepo.findAll();

    const tickets: Record<string, number> = {};
    billets.forEach(b => {
      tickets[`quantite_${b.getId()}`] = Number(this.request.body[`quantite_${b.getId()}`] || 0);
    });

    const formData: ReservationInput = {
      firstName: this.request.body.firstName,
      lastName: this.request.body.lastName,
      visitDate: this.request.body.visitDate,
      tickets,
      cardNumber: this.request.body.cardNumber.replace(/\s+/g, ""), // 🔥 supprime espaces
      expiry: this.request.body.expiry,
      cvv: this.request.body.cvv,
      maskedCard: this.request.body.maskedCard || ""
    };

    const data = reservationSchema.parse(formData);

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

    const montant_total = billetsChoisis.reduce(
      (sum, item) => sum + item.billet.getTarifUnitaire() * item.quantite,
      0
    );

    const id_clients = 1;
    const reservationRepo = new reservationRepository();
    const reservation = await reservationRepo.create(
      id_clients,
      data.visitDate,
      billetsChoisis,
      montant_total
    );

    console.log("[PAIEMENT] Succès, réservation créée ID:", reservation);
    return this.response.render("pages/confirmation", {
      reservation,
      billetsChoisis,
      nom_client: data.firstName + " " + data.lastName,
      date_reservation: reservation.date_de_la_reservation,
      montant_total
    });

  } catch (err) {
    const billetRepo = new billetsRepository();
    const billets = await billetRepo.findAll();

    if (err instanceof ZodError) {
      console.warn("[PAIEMENT] Erreur de validation:", err.issues);
      return this.response.render("pages/reserve", {
        billets,
        errors: err.issues,
        values: this.request.body
      });
    }

    console.error("[PAIEMENT] Erreur serveur:", err);
    return this.response.status(500).render("pages/reserve", {
      billets,
      errors: [{ path: ["global"], message: "Erreur serveur, réessayez plus tard." }],
      values: this.request.body
    });
  }
}}