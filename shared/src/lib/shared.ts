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

export type PersonDetail = z.infer<typeof PersonDetailSchema>;
export type PersonList = z.infer<typeof PersonListSchema>;
