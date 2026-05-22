import { $api } from "../../../shared/api/axiosInstance";
import type { AxiosResponse } from "axios";
import type { iUser } from "../../../shared/types/iUser";

export default class UserApi {
  static async getUsers(): Promise<AxiosResponse<iUser[]>> {
    return $api.get<iUser[]>("api/user");
  }
}
