import { autoinject } from 'aurelia-framework';
import { User } from './user.interface';
import { UsersDataService } from './users-data.service';
import { GraphqlResult } from 'shared/models/graphql-result';

@autoinject()
export class UsersList {
  users: User[] = [];

  constructor(private usersDataService: UsersDataService) { }

  activate() {
    this.getUsers();
  }

  async getUsers() {
    const graphqlResult = await this.usersDataService.getAll<GraphqlResult>();
    if (graphqlResult && graphqlResult.data) {
      const { users } = graphqlResult.data;
      this.users = users;
    }
  }
}
