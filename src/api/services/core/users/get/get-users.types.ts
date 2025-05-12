import { z } from "zod";
import { getUsersSchema } from "./get-users.schema";

// Request
export type GetUsersRequest = z.input<typeof getUsersSchema.request>;

export type GetUsersRequestTransofrmed = z.infer<
  typeof getUsersSchema.request
>;

// Response
export type GetUsersResponse = z.input<typeof getUsersSchema.response>;

export type GetUsersResponseTransformed = z.infer<
  typeof getUsersSchema.response
>;
