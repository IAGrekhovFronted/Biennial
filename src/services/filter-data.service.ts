import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";

import { IArtwork } from "@models/common.interface";

@Injectable({
  providedIn: "root",
})
export class FilterDataService {
  constructor(private readonly fetchService: FetchService) {}

  /**
   * @param slug
   * @param relation - пример для нескольких Relation: 'populate[0]=authors&populate[1]=author_teams'
   * @returns
   */
  async getFilterData(slug: string, relation: string) {
    const responce: IArtwork[] = await this.fetchService.getRelationEntities(
      slug,
      relation
    );

    const options: Set<string> = new Set();

    responce.forEach((art) => {
      options.add(art.title_localise);

      if (art.author_teams.length > 0) {
        art.author_teams.forEach((team) => {
          options.add(team.name_localise);
        });
      }

      if (art.authors.length > 0) {
        art.authors.forEach((team) => {
          options.add(team.name_localise);
        });
      }
    });

    return Array.from(options);
  }
}
