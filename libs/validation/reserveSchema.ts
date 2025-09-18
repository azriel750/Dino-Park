import { z } from "zod";

export const reservationSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom est trop court")
    .max(50, "Le prénom est trop long"),

  lastName: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long"),

  visitDate: z
    .string()
    .refine(date => {
      const d = new Date(date);
      return !isNaN(d.getTime()) && d >= new Date();
    }, "Date de visite invalide ou déjà passée"),

  tickets: z.record(
    z.string(), 
    z.coerce.number().int().min(0, "Minimum 0 billet")
  ),

  cardNumber: z.string().min(12, "Numéro de carte trop court").max(19, "Numéro de carte trop long"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/AA invalide"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV invalide"),
  maskedCard: z.string().optional()
});

export type ReservationInput = z.infer<typeof reservationSchema>;
