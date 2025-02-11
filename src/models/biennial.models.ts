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
    author_teams: AuthorTeam[];
    authors: Author[];
    type_project: TypeProject;
    biennial: BiennialNumber;
    explication_area: ExplicationArea;
}

export interface AuthorTeam {
    id: number;
    documentId: string;
    team: string;
    team_localise: string;
    founded_year: string;
    description_team: string;
    link_photo: string | null;
    website: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country_team: CountryTeam
}

export interface Author {
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
    country_origins: Country
}


export interface IRowTableData {
    author: string;
    country: string;
    composition: string;
    type: string;
    biennial: string;
    area: string;
}

interface TypeProject {
    id: number;
    documentId: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface Country {
    id: number;
    documentId: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country_localise: string;
}

interface CountryTeam {
    id: number;
    documentId: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country_localise: string;
}

interface BiennialNumber {
    id: number;
    documentId: string;
    edition: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    edition_localise: string;
}

interface ExplicationArea {
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
