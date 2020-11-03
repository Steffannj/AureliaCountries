import { AureliaConfiguration } from 'aurelia-configuration';
import { HttpClient } from 'aurelia-fetch-client';
import { Rest } from 'aurelia-api';
import { autoinject, observable } from 'aurelia-framework';
import { Country } from 'common/country';
import * as Toastr from 'toastr';
import { I18N } from 'aurelia-i18n';

@autoinject
export class Countries {
  api: Rest;
  model: Array<Country>;
  @observable selectedCountry: Country;
  isBusy: boolean;

  constructor(private httpClient: HttpClient, private config: AureliaConfiguration, private i18n: I18N) {
    this.model = [];
    this.selectedCountry = new Country();
  }

  async attached() {
    this.isBusy = true;
    try {
      await this.getCountries();
    } catch (error) {
      Toastr.error(this.i18n.tr('errors.canNotFetchCountries'));
    } finally {
      this.isBusy = false;
    }
  }

  private async getCountries() {
    let res = await this.httpClient.get(this.config.get('api'));
    this.model = await res.json();
  }

}
