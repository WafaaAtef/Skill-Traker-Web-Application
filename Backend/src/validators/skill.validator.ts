import { z } from "zod";

export const addSkillSchema = z.object({
  skillId: z.string().length(24, "Invalid skill id"),
});