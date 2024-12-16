/// <reference types="cypress" />

import { brandStoreData, editStore } from '../../../fixtures/settings';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';

describe('Test store information', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=settings]').click();
  });

  const storeInformation = () => {
    cy.get('[data-cy=settingStore]').click();
    cy.get('h2').should('contain', 'اطلاعات فروشگاه');
    cy.get('[data-cy=info]').click();
    mockData('My_brand', 'gqlMy_brandQuery', brandStoreData);
    cy.get('[data-cy=postalCode]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].store_address.postal_code
    );
    cy.get('[data-cy=nameStore]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].name
    );
    cy.get('[data-cy=guildStore]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].guild
    );
    cy.get('[data-cy=cityStore]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].store_address.city
    );
    cy.get('[data-cy=cityStore]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].store_address.city
    );
    cy.get('[data-cy=provinceStore]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].store_address.province
    );
    // cy.get('[data-cy=telephoneStore]').should('contain', brandStoreData.data.user.getUserRead.my_store[0].phone_number)
    cy.get('[data-cy=addressStore]').should(
      'contain',
      brandStoreData.data.user.getUserRead.my_store[0].store_address.address
    );
    cy.wait('@gqlMy_brandQuery');
    cy.get('[data-cy=editStore]').click();
    cy.get('[data-cy=storeName]')
      .invoke('val')
      .then(sometext => cy.log(sometext));
    cy.get('[data-cy=storeName]').clear().type('فروشگاه فروشگاه');

    // find and select option guild store
    const findOption = cy.get('[data-cy=guildStoreSelected]').click();
    findOption.invoke('val').then(() => {
      const someText = 'آپشن اصناف وجود دارند';
      cy.log(someText);
    });
    cy.get('[dataCy=optionStoreSelected]')
      .invoke('val')
      .then(() => {
        const someText = 'صنف انتخاب شده وجود دارد';
        cy.log(someText);
      });
    cy.get('body').click();

    // find and select option city store
    const findOptionCity = cy.get('[data-cy=cityStoreSelected]').click();
    findOptionCity.invoke('val').then(() => {
      const someText = 'آپشن ها استان وجود دارند';
      cy.log(someText);
    });
    cy.get('[dataCy=provinceStoreSelected]')
      .invoke('val')
      .then(() => {
        const someText = 'استان انتخاب شده وجود دارد';
        cy.log(someText);
      });
    cy.get('body').click();

    // find and select option cities store
    const findOptionCities = cy.get('[data-cy=citiesStoreSelected]').click();
    findOptionCities.invoke('val').then(() => {
      const someText = 'آپشن ها شهر وجود دارند';
      cy.log(someText);
    });
    cy.get('[dataCy=citiesStoreSelected]')
      .invoke('val')
      .then(() => {
        const someText = 'شهر انتخاب شده وجود دارد';
        cy.log(someText);
      });
    cy.get('body').click();

    //test for telephone store
    const teleStore = cy.get('[data-cy=teleStore]').click();
    teleStore.invoke('val').then(() => {
      const someText = 'شماره تلفن وارد شده است.';
      cy.log(someText);
    });
    cy.get('[data-cy=teleStore]').clear().type('021771122314');

    //test for postalCode Store
    const postalCodeStore = cy.get('[data-cy=postalCodeStore]').click();
    postalCodeStore.invoke('val').then(() => {
      const someText = 'شماره کدپستی وارد شده است.';
      cy.log(someText);
    });
    const postalCodeRegex = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g;

    cy.get('[data-cy=postalCodeStore]').clear().type('643832137');
    //test for address Store
    const address = cy.get('[data-cy=address]').click();
    address.invoke('val').then(() => {
      const someText = 'آدرس وارد شده است.';
      cy.log(someText);
    });
    cy.get('[data-cy=address]').clear().type('تهران آزادی خیابان ینفشه');
    mockData('EditStoreData', 'gqlEditStoreDataMutation', editStore);
    cy.get('[data-cy=submitEditStore]').click();
    cy.get('[data-cy=postalCodeStore]')
      // .invoke('text')
      .should('contain', 'کدپستی نامعتبر است.');
    cy.get('[data-cy=postalCodeStore]').clear().type('6919747845');
    cy.get('[data-cy=submitEditStore]').click();
    cy.wait('@gqlEditStoreDataMutation');
  };

  it('store information', storeInformation);
});
