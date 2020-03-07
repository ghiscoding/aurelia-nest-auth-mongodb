import { autoinject } from 'aurelia-framework';
import { Column, Formatter, Formatters, GraphqlService, GridOption, Filters, MultipleSelectOption } from 'aurelia-slickgrid';

import { User } from './user.interface';
import { UsersDataService } from './users-data.service';
import './users-list.scss';


const providerFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  let output = '';
  if (dataContext?.providers) {
    for (let provider of dataContext.providers) {
      let iconName = '';
      let iconColor = '';

      if (dataContext.userId === dataContext[provider.name]) {
        iconColor = 'fa-border'; // add a border on the original registered account
      } else {
        iconColor = 'fa-noborder'
      }
      switch (provider.name) {
        case 'windowslive':
          iconName += `fa-windows`;
          break;
        default:
          iconName += `fa-${provider.name}`;
          break;
      }
      output += ` <i class="fa fa-lg ${iconName} ${iconColor}" aria-hidden="true" title="userId: ${dataContext[provider.name]}"></i>`;
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
      {
        id: 'roles', name: 'Roles', field: 'roles', filterable: true, sortable: true,
        formatter: Formatters.arrayToCsv, exportWithFormatter: true,
        filter: {
          model: Filters.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'ADMIN', label: 'Admin' }, { value: 'USER', label: 'User' }]
        }
      },
      {
        id: 'providerNames', name: 'Providers',
        field: 'providers.name',
        fields: ['userId', 'facebook', 'github', 'google', 'linkedin', 'microsoft', 'twitter', 'windowslive'],
        filterable: true, sortable: true,
        formatter: providerFormatter,
        filter: {
          model: Filters.multipleSelect,
          collection: [
            { value: 'facebook', label: 'Facebook', icon: '<i class="fa fa-facebook"></i>' },
            { value: 'github', label: 'GitHub', icon: '<i class="fa fa-github"></i>' },
            { value: 'google', label: 'Google', icon: '<i class="fa fa-google"></i>' },
            { value: 'linkedin', label: 'LinkedIn', icon: '<i class="fa fa-linkedin"></i>' },
            { value: 'microsoft', label: 'Microsoft', icon: '<i class="fa fa-windows"></i>' },
            { value: 'twitter', label: 'Twitter', icon: '<i class="fa fa-twitter"></i>' },
            { value: 'windowslive', label: 'Ms Windows Live', icon: '<i class="fa fa-windows"></i>' },
          ],
          customStructure: {
            value: 'value',
            label: 'label',
            labelPrefix: 'icon',
            optionLabel: 'icon',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' '
          },
          enableRenderHtml: true,
          filterOptions: {
            useSelectOptionLabelToHtml: true,
          } as MultipleSelectOption
        },
      },
      // { id: 'github', name: 'github', field: 'github', filterable: true, sortable: true },
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
