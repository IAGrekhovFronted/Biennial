import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";
import { IAuthor, IAuthorTeam } from "src/models/common.interface";
import { IAuthorCard, TargetCardEnum } from "../models/grid-data.interface";

@Injectable({
  providedIn: "root",
})
export class GridDataService {
  constructor(private readonly fetchService: FetchService) {}

  private async fetchEntities(entity: string, query: string) {
    return this.fetchService.getRelationEntities(entity, query);
  }

  private async getAuthorsData(
    query = "populate=composition.type_project&populate=composition.biennial&populate=country_origins"
  ) {
    const [authorsResponse, authorTeamsResponse] = await Promise.all([
      this.fetchEntities("authors", query),
      this.fetchEntities("author-teams", query),
    ]);

    return [
      ...mapGridData(authorsResponse, TargetCardEnum.AUTHOR),
      ...mapGridData(authorTeamsResponse, TargetCardEnum.AUTHOR_TEAMS),
    ];
  }

  async getGridData() {
    return this.getAuthorsData();
  }

  async getGridDataPagination(start: number, pagination: number) {
    const query = `pagination%5Bstart%5D=${start}&pagination%5Blimit%5D=${pagination}&populate=composition.type_project&populate=composition.biennial&populate=country_origins`;
    const combinedData = await this.getAuthorsData(query);

    return combinedData.slice(start, start + pagination);
  }

  dataFilters(data: IAuthorCard[], option: string) {
    return data.filter(
      (item) =>
        item.name_localise === option ||
        item.composition.some((comp) => comp.composition_localise === option)
    );
  }

  filterDataObject(
    filters: Record<string, string[] | null> | null,
    data: any[]
  ): any[] {
    if (!filters) return data;
    console.log("Условие filterDataObject", data);
    return data.filter((item) => {
      return Object.entries(filters).every(([key, values]) => {
        if (!values || values.length === 0) return true;

        switch (key) {
          case "СТРАНА":
            return (
              item.country?.some((country: string) =>
                values.includes(country)
              ) ?? false
            );

          case "БИЕННАЛЕ №":
            return (
              item.composition?.some(
                (comp: any) => comp.biennial && values.includes(comp.biennial)
              ) ?? false
            );

          case "ТИП":
            return values.includes(item.type);

          default:
            return true;
        }
      });
    });
  }
}

function mapGridData(
  data: Array<IAuthorTeam | IAuthor>,
  targetCard: TargetCardEnum
): IAuthorCard[] {
  return data.map((item) => ({
    name_localise: item.name_localise,
    name: item.name,
    image: item.link_photo,
    documentId: item.documentId,
    type: targetCard,
    country: item.country_origins?.map((x) => x.country_localise),
    composition:
      item.composition?.map((compos) => ({
        composition_localise: compos.title_localise,
        composition: compos.title,
        year_creation: compos.year_creation,
        type_project: compos.type_project?.type,
        biennial: compos.biennial?.edition_localise,
      })) || [],
  }));
}
