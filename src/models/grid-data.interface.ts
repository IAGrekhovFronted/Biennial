export interface IAuthorCard {
  name_localise: string;
  name: string;
  image: string | null;
  documentId: string;
  type: TargetCardEnum;
  composition: IComposition[];
}

export interface IComposition {
  composition_localise: string;
  composition: string;
  year_creation: string | null;
}

export interface IFiltersData {
  countries?: string[] | null;
  "edition-biennials"?: string[] | null;
  "type-projects"?: string[] | null;
}

export enum TargetCardEnum {
  AUTHOR = "author",
  AUTHOR_TEAMS = "author-teams",
}
