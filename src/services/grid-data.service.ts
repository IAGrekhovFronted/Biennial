import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";
import { IAuthor } from "src/models/common.interface";
import { IAuthorCard } from "../models/grid-data.interface";

@Injectable({
  providedIn: "root",
})
export class GridDataService {
  constructor(private readonly fetchService: FetchService) {}

  async getGridData() {
    const responce: IAuthor[] = await this.fetchService.getRelationEntities(
      "authors",
      "populate=composition"
    );

    return mapGridData(responce);
  }

  async getGridDataPagination(start: number, pagination: number) {
    const responce: IAuthor[] = await this.fetchService.getRelationEntities(
      "authors",
      `pagination%5Bstart%5D=${start}&pagination%5Blimit%5D=${pagination}&populate=composition`
    );

    return mapGridData(responce);
  }
}

function mapGridData(data: IAuthor[]): IAuthorCard[] {
  return data.map((item) => {
    return {
      name_localise: item.name_localise,
      name: item.name,
      image: item.link_photo,
      composition:
        item.composition?.map((compos) => {
          return {
            composition_localise: compos.title_localise,
            composition: compos.title,
            year_creation: compos.year_creation,
          };
        }) || [],
    };
  });
}
