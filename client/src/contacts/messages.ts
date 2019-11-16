import {autoinject} from 'aurelia-framework';
import {Contact} from './contact';

@autoinject()
export class ContactUpdated {
  contact?: Contact;
  constructor(contact?: Contact) {
    this.contact = contact;
  }
}

@autoinject()
export class ContactViewed {
  contact?: Contact;
  constructor(contact?: Contact) {
    this.contact = contact;
  }
}
