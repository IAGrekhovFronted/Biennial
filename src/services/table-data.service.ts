import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service'
import { IArtwork } from '../models/biennial.models';
import { IRowTableData } from '../models/biennial.models';

@Injectable({
    providedIn: 'root',
})

export class TableDataService {

    constructor(
        private readonly fetchService: FetchService
    ) { }

    async getTableData() {
        const responce: IArtwork[] = await this.fetchService.getRelationEntities('projects', 'populate=authors.country_origins&populate=author_teams.country_team&populate=type_project&populate=biennial&populate=explication_area');

        const tableData: IRowTableData[] = responce.map(art => {
            const authors = art.authors.map(x => x.name_localise)
            const authorCountry = art.authors.map(x => x.country_origins.country_localise)

            const authorTeams = art.author_teams.map(x => x.team_localise)
            const authorTeamsCountry = art.author_teams.map(x => x.country_team.country_localise)

            return {
                author: art.authors.length > 0 ? authors.toString() : authorTeams.toString(),
                country: art.authors.length > 0 ? authorCountry.toString() : authorTeamsCountry.toString(),
                composition: art?.title_localise,
                type: art.type_project.type,
                biennial: art.biennial.edition_localise,
                area: art?.explication_area?.title_localise
            }
        })
        return tableData;
    }
};
