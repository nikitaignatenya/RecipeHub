import { $api } from "../http";
import type { AxiosResponse } from "axios";
import type { iAuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<iAuthResponse>> {
    return await $api.post<iAuthResponse>("/user/login", { email, password });
  }
  static async registrtaion(
    email: string,
    password: string,
  ): Promise<AxiosResponse<iAuthResponse>> {
    return await $api.post<iAuthResponse>("/user/registration", {
      email,
      password,
    });
  }
  static async logout(): Promise<void> {
    return await $api.post("/user/logout");
  }
}
