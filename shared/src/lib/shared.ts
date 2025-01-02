
import { z } from 'zod';

// Person Detail Schema
export const PersonDetailSchema = z.object({
  uid: z.string(),
  name: z.string(),
  birth_year: z.string(),
  homeworld_name: z.string(),
  homeworld_terrain: z.string(),
});

export const PersonListSchema = z.object({
  uid: z.string(),
  name: z.string(),
  url: z.string().url(),
});

export const PersonAPIResponseSchema = z.object({
  results:  z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      birth_year: z.string(),
      homeworld_name: z.string(),
      homeworld_terrain: z.string(),
    })
  ),
  total_records: z.number()
});

export type PersonDetail = z.infer<typeof PersonDetailSchema>;
export type PersonList = z.infer<typeof PersonListSchema>;
export type PersonAPIResponse = z.infer<typeof PersonAPIResponseSchema>;
