import {inject, bindable, bindingMode, DOM, PLATFORM} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap/js/src/modal';

@inject(Element)
export class AbpModalCustomElement {
  @bindable() disabled;
  @bindable() element;
  @bindable() value;
  @bindable() dismissFlag;
  @bindable() dismissReason;
  @bindable() model;
  @bindable() saveMethod;
  @bindable() viewModel: string;
  @bindable() onClose: (reason?: any) => void;
  @bindable() onDismiss: (reason?: any) => void;
  @bindable() buttonList = [];

  parent: any;

  // plugin own variables
  @bindable placeholder = '';

  // picker options
  @bindable options;
  @bindable showing = true;

  // events (from the View)
  @bindable onBeforeItemAdd;
  @bindable onBeforeItemRemove;
  @bindable onItemAdded;
  @bindable onItemAddedOnInit;
  @bindable onItemRemoved;

  // variables
  customVM: any;
  domElm: any;
  elm: any;
  events = {};
  methods = {};
  suppressValueChanged;

  constructor(elm) {
    this.elm = elm;
  }

  attached() {
    console.log('attached abp-modal')
    // reference to the DOM element
    this.domElm = $(this.elm).find('.modal')
      .modal({ show: true })
      .on('show.bs.modal', () => {
        this.showing = true;
      })
      .on('hide.bs.modal', () => {
        this.showing = false;
      });
    console.log(PLATFORM.moduleName(this.viewModel));
  }

  detached() {
    console.log('detached abp-modal')
    this.domElm.modal('hide');
    // this.domElm.modal('dispose');
  }

  modelChanged(newVal) {
    console.log(newVal);
    console.log(this.customVM.currentViewModel);
  }

  bind(parent: any) {
    this.parent = parent;
    console.log(parent.showBootstrapModal, this.showing);
  }

  unbind() {
    console.log('unbind abp-modal')
  }

  closeModal(reason?: any) {
    this.showing = false;
    // this.parent.showBootstrapModal = false;
    if (this.parent[this.dismissFlag]) {
      this.parent[this.dismissFlag] = false;
    }
    if (typeof this.onClose === 'function') {
      this.onClose({ reason });
    }
    this.hideModal();
  }

  dismiss(reason?: any) {
    console.log('dismissing', this.onDismiss)
    this.closeModal();
    if (typeof this.onDismiss === 'function') {
      console.log('dismissing reason', reason)
      this.onDismiss({ reason });
    }
  }

  hideModal() {
    this.domElm.modal('hide');
  }

  public showModal() {
    this.domElm.modal('show');
  }

  showingChanged(newValue) {
    if (newValue) {
      $(this.domElm).modal('show')
    } else {
      $(this.domElm).modal('hide')
    }
  }

  buttonMethod(method?: any) {
    const childMethod = this.customVM && this.customVM.currentViewModel && this.customVM.currentViewModel[method];
    console.log(method, this.customVM.currentViewModel, childMethod)
    if (typeof childMethod === 'function') {
      const promise = childMethod.bind(this.customVM.currentViewModel)();
      if (promise && promise.then) {
        promise.then((response) => this.dismiss(response));
      }
    }
    if (typeof method === 'function') {
      method.bind(this.customVM.currentViewModel);
      method(this.model);
    }
  }

  saveChanges() {
    const promise = this.customVM && this.customVM.currentViewModel && this.customVM.currentViewModel.save(this.model)
    if (promise && promise.then) {
      promise.then((response) => this.dismiss(response));
    }
  }
}
