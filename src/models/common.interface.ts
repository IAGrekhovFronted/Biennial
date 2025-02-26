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
  photos: IPhotoData[];
  videos: IVideoData[];
  additional_materials: IAdditionalMaterialData[];
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
  country_origins: ICountry[];
  composition?: IArtwork[];
  authors?: IAuthor[];
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
  country_origins: ICountry[];
  composition?: IArtwork[];
  author_teams?: IAuthorTeam[];
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

export interface IPhotoData {
  id: number;
  documentId: string;
  title_photo: string;
  link_photo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IVideoData {
  id: number;
  documentId: string;
  title_video: string;
  link_video: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IAdditionalMaterialData {
  id: number;
  documentId: string;
  title_material: string;
  link_material: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
