import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Contact} from './contact';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';

@autoinject()
export class ContactList {
  api: WebAPI;
  ea: EventAggregator;
  contacts: Array<Contact>;
  selectedId: number;

  constructor(eventAggregator: EventAggregator, api: WebAPI) {
    this.ea = eventAggregator;
    this.api = api;

    this.ea.subscribe(ContactViewed, msg => {
      this.select(msg.contact)
    });
    this.ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts).catch(err => console.log(err));
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}
