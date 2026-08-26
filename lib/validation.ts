import { z } from "zod";
export const enquirySchema = z.object({name:z.string().trim().min(2),email:z.string().trim().email(),phone:z.string().trim().optional(),company:z.string().trim().optional(),service:z.string().trim().optional(),budget:z.string().trim().optional(),message:z.string().trim().min(10)});
