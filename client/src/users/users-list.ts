import { autoinject } from 'aurelia-framework';
import { Column, Formatter, Formatters, GraphqlService, GridOption, Filters } from 'aurelia-slickgrid';

import { User } from './user.interface';
import { UsersDataService } from './users-data.service';


const providerFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  let output = '';
  if (dataContext?.providers) {
    for (let provider of dataContext.providers) {
      switch (provider.name) {
        case 'windowslive':
          output += ` <i class="fa fa-windows" aria-hidden="true"></i>`;
          break;
        default:
          output += ` <i class="fa fa-${provider.name}" aria-hidden="true"></i>`;
          break;

      }
    }
  }
  // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
  return output;
};

@autoinject()
export class UsersList {
  users: User[] = [];
  gridOptions: GridOption;
  columnDefinitions: Column[];

  constructor(private usersDataService: UsersDataService) {
    this.defineGrid();
  }

  activate() {
    // this.getUsers();
  }

  defineGrid() {
    this.columnDefinitions = [
      { id: 'displayName', name: 'Display Name', field: 'displayName', filterable: true, sortable: true, filter: { model: Filters.compoundInputText } },
      { id: 'email', name: 'Email', field: 'email', filterable: true, sortable: true },
      { id: 'roles', name: 'Roles', field: 'roles', filterable: true, sortable: true, formatter: Formatters.arrayToCsv, exportWithFormatter: true },
      { id: 'providerNames', name: 'Providers', field: 'providers.name', filterable: true, sortable: true, formatter: providerFormatter },
      { id: 'github', name: 'github', field: 'github', filterable: true, sortable: true },
    ];

    this.gridOptions = {
      enableFiltering: true,
      backendServiceApi: {
        service: new GraphqlService(),
        options: {
          // because some fields are complex objects ("providers.name"),
          // we must wrap the fields in double quotes to keep the (.) in the filterBy/orderBy fields in the GraphQL query
          keepArgumentFieldDoubleQuotes: true,
          datasetName: 'users',
          columnDefinitions: this.columnDefinitions
        },
        process: (query) => this.usersDataService.getUsers(query),
      },
      enablePagination: true,
    }
  }
}
