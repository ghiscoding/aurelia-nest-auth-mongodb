import { autoinject } from 'aurelia-framework';
import { Column, Formatters, GridOption } from 'aurelia-slickgrid';
import { GraphqlService, GraphqlServiceApi, } from '@slickgrid-universal/graphql';

import { Cat } from './cat.interface';
import { CatsDataService } from './cats-data.service';

@autoinject()
export class CatsList {
  gridOptions: GridOption;
  columnDefinitions: Column[];

  constructor(private catsDataService: CatsDataService) {
    this.defineGrid();
  }

  defineGrid() {
    this.columnDefinitions = [
      { id: 'name', name: 'Name', field: 'name', filterable: true, sortable: true },
      { id: 'breed', name: 'Breed', field: 'breed', filterable: true, sortable: true },
      { id: 'age', name: 'Age', field: 'age', filterable: true, sortable: true },
      { id: 'owner', name: 'Owner', field: 'owner.displayName', filterable: true, sortable: true, formatter: Formatters.complexObject },
    ];

    this.gridOptions = {
      autoResize: {
        container: '.grid-container'
      },
      enableFiltering: true,
      backendServiceApi: {
        service: new GraphqlService(),
        options: {
          datasetName: 'cats',
          columnDefinitions: this.columnDefinitions,
          useLocalFiltering: true,
          useLocalSorting: true,
        },
        process: (query) => this.catsDataService.getCats(query),
        useLocalFiltering: true,
        useLocalSorting: true,
      } as GraphqlServiceApi,
      enablePagination: false,
    }
  }
}
