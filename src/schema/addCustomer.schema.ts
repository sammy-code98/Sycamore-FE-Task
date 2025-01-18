import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const addCustomerSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phoneNumber: z
      .string()
      .regex(/^\d{10,14}$/, "Phone number must be between 10 and 14 digits"),
    state: z.string().nonempty("Please select a state"),
    details: z.string(),
    isActive: z.boolean().default(false),
  })
);
