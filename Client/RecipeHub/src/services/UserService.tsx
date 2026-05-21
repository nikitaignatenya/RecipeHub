import { $api } from "../http";
import type { AxiosResponse } from "axios";
import type { iAuthResponse } from "../models/response/AuthResponse";
import type { iUser } from "../models/iUser";

export default class UserService {
  static async fetchUser(): Promise<AxiosResponse<iUser[]>> {
    return $api.get<iUser[]>("api/user");
  }
}
