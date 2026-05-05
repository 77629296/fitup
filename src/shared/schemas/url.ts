import { z } from "zod";

export const urlSchema = z.string().url("form_invalid_url");
export type Url = z.infer<typeof urlSchema>;
