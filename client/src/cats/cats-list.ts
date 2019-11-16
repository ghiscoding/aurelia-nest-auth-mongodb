import { autoinject } from 'aurelia-framework';
import { Cat } from './cat.interface';
import { CatsDataService } from './cats-data.service';
import { GraphqlResult } from 'shared/models/graphql-result';

@autoinject()
export class CatsList {
  cats: Cat[] = [];

  constructor(private catsDataService: CatsDataService) { }

  activate() {
    this.getCats();
  }

  async getCats() {
    const graphqlResult = await this.catsDataService.getAll<GraphqlResult>();
    if (graphqlResult && graphqlResult.data) {
      const { cats } = graphqlResult.data;
      this.cats = cats;
    }
  }
}
