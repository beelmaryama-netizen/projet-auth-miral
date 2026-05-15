import { Http, ApplicationSettings } from "@nativescript/core";

const API_URL = "http://10.0.2.2:3000";

export class ApiService {
  static async register(full_name: string, email: string, password: string) {
    const response = await Http.request({
      url: `${API_URL}/auth/register`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({ full_name, email, password })
    });
    return response.content.toJSON();
  }

  static async login(email: string, password: string) {
    const response = await Http.request({
      url: `${API_URL}/auth/login`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({ email, password })
    });

    const data = response.content.toJSON();

    if (data.token) {
      ApplicationSettings.setString("token", data.token);
    }

    return data;
  }

  static async getCars() {
    const response = await Http.request({
      url: `${API_URL}/cars`,
      method: "GET"
    });
    return response.content.toJSON();
  }

  static logout() {
    ApplicationSettings.remove("token");
  }
}