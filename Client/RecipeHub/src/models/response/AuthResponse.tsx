import type { iUser } from "../iUser";

export interface iAuthResponse {
  accessToken: string;
  user: iUser;
}
