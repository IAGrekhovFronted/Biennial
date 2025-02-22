export interface IArtwork {
  id: number;
  documentId: string;
  title_localise: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  year_creation: string;
  technical_info: string;
  description_explication: string;
  performers: string | null;
  creation_for_biennial: boolean;
  author_teams: IAuthorTeam[];
  authors: IAuthor[];
  type_project: ITypeProject;
  biennial: IBiennialNumber;
  explication_area: IExplicationArea;
}

export interface IAuthorTeam {
  id: number;
  documentId: string;
  name: string;
  name_localise: string;
  founded_year: string;
  description_team: string;
  link_photo: string | null;
  website: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  country_team: ICountryTeam;
  composition?: IArtwork[];
}

export interface IAuthor {
  id: number;
  documentId: string;
  name: string;
  name_localise: string;
  birth_year: string | null;
  death_year: string | null;
  description_author: string | null;
  link_photo: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  country_origins: ICountry;
  composition?: IArtwork[];
}

interface ITypeProject {
  id: number;
  documentId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ICountry {
  id: number;
  documentId: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  country_localise: string;
}

interface ICountryTeam {
  id: number;
  documentId: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  country_localise: string;
}

interface IBiennialNumber {
  id: number;
  documentId: string;
  edition: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  edition_localise: string;
}

interface IExplicationArea {
  id: number;
  documentId: string;
  title_localise: string;
  title: string;
  home: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  street: string;
}
