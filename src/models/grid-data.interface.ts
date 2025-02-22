export interface IAuthorCard {
  name_localise: string;
  name: string;
  image: string | null;
  composition: IComposition[];
}

export interface IComposition {
  composition_localise: string;
  composition: string;
  year_creation: string | null;
}
