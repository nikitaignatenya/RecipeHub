import type { iUser } from "../../../shared/types/iUser";

export interface iAuthResponse {
  accessToken: string;
  user: iUser;
}
