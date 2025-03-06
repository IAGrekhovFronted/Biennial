import { Injectable } from "@angular/core";

import { environmentDev } from "../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class FetchService {
  url = environmentDev.url;
  token = environmentDev.token;

  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  async getDataEntities(slug: string) {
    const url = `${this.url}${slug}`;

    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.data;
  }

  async getRelationEntities(slug: string, relation: string) {
    const url = `${this.url}${slug}?${relation}`;

    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.data;
  }
}
