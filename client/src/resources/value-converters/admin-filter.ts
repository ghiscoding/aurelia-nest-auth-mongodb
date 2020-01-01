export class AdminFilterValueConverter {
  toView(routes, isAdmin) {
    return routes.filter(r => r.config.admin === undefined || r.config.admin === isAdmin);
  }
}
