import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(private readonly fetchService: FetchService) {}

  async getCard(targetUrl: string, documentId: string, populate: string) {
    const slug = `${targetUrl}/${documentId}`;
    const responce = await this.fetchService.getRelationEntities(
      slug,
      populate
    );
    return responce;
  }
}
