import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouterConfiguration} from 'aurelia-router';
import {Contact} from './contact';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';
import {areEqual} from './utility';
import $ from 'bootstrap';

@autoinject()
export class ContactDetail {
  api: WebAPI;
  ea: EventAggregator;
  contact: Contact;
  routeConfig: any;
  originalContact: Contact;

  constructor(api: WebAPI, eventAggregator: EventAggregator) {
    this.api = api;
    this.ea = eventAggregator;
  }

  activate(params: any, routeConfig: any): Promise<void>{
    this.routeConfig = routeConfig;
    //$('#example').tooltip(options)

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactViewed(contact));
    });
  }

  get canSave(): boolean {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save(): void {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactUpdated(this.contact));
    });
  }

  canDeactivate(): boolean {
    if(!areEqual(this.originalContact, this.contact)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if(!result){
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
