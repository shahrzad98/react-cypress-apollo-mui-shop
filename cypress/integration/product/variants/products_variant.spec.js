import {
  getProductVariant,
  prodcutListDetails_mock_variant,
  productList
} from '../../../fixtures/product';
import { login } from '../../../utils/login';
import { mockData, mockSpy } from '../../../utils/mockData';

describe('products variant test', () => {
  beforeEach(() => {
    login();
    cy.visit('/');

    cy.get('[data-cy=products]').click();

    mockData('GetProducts', 'gqlGetProducts', productList);

    cy.get('[data-cy=order_card]').first().click();

    cy.wait('@gqlGetProducts');

    mockData(
      'GetCategories',
      'gqlGetCategories',
      prodcutListDetails_mock_variant
    );
    cy.get('[data-cy=product-card]').get('p:contains("ساعت")').last().click();
  });

  it('product variants has been in document', () => {
    cy.get('[data-cy=variantCard]').should(
      'have.length',
      prodcutListDetails_mock_variant.data.item.getProduct.variants.length
    );
    cy.get('[data-cy=variantCard]')
      .first()
      .should(
        'contain',
        prodcutListDetails_mock_variant.data.item.getProduct.variants[0].name
      );
    cy.get('[data-cy=variantCard]')
      .first()
      .should(
        'contain',
        Number(
          prodcutListDetails_mock_variant.data.item.getProduct.variants[0]
            .primary_cost
        ).toLocaleString()
      );
  });
  it('product variant edit button has been in document', () => {
    cy.get('[data-cy=variantCard]').first().find('button').click();
    cy.get('[role=presentation]').should('contain', 'ویرایش');
  });
  it('product variant details button has been in document and works', () => {
    cy.get('[data-cy=variantCard]')
      .first()
      .find('[data-cy=variantCardLink]')
      .click();
    cy.url().should(
      'include',
      `detail/variant/${prodcutListDetails_mock_variant.data.item.getProduct.variants[0].id}?product=${prodcutListDetails_mock_variant.data.item.getProduct.name}`
    );
  });
  it('product variant edit button works', () => {
    cy.get('[data-cy=variantCard]').first().find('button').click();
    cy.get('[role=presentation]').find('button:contains("ویرایش")').click();
    cy.url().should(
      'include',
      prodcutListDetails_mock_variant.data.item.getProduct.variants[0].id
    );
  });
  it('product variant edit page should have true value', () => {
    mockData('GetVariant', 'gqlgetVariant', getProductVariant);
    cy.get('[data-cy=variantCard]').first().find('button').click();
    cy.get('[role=presentation]').find('button:contains("ویرایش")').click();
    cy.wait('@gqlgetVariant');
    cy.get('input[name=cost]').should(
      'have.value',
      getProductVariant.data.item.getVariant.cost
    );
    cy.get('input[name=time_delay]').should(
      'have.value',
      getProductVariant.data.item.getVariant.time_delay
    );
  });
  it('product variant edit page inputs should works', () => {
    cy.get('[data-cy=variantCard]').first().find('button').click();
    mockData('GetVariant', 'gqlgetVariant', getProductVariant);
    cy.get('[role=presentation]').find('button:contains("ویرایش")').click();
    cy.wait('@gqlgetVariant');
    cy.get('input[type=checkbox]').click();
    cy.get('input[name=stock]').should('not.be');
    cy.get('input[type=checkbox]').click();
    cy.get('input[name=stock]').should('be.visible');
    cy.get('input[name=time_delay]').clear();
    cy.get('button:contains("ثبت")').click();
    cy.get(
      'p:contains("زمان آماده سازی ، اطلاعات مورد نیاز برای نمایش محصول می باشد")'
    ).should('be.visible');
  });

  it('call appolo', () => {
    cy.get('[data-cy=variantCard]').first().find('button').click();
    mockData('GetVariant', 'gqlgetVariant', getProductVariant);
    cy.get('[role=presentation]').find('button:contains("ویرایش")').click();
    cy.wait('@gqlgetVariant');
    cy.get('input[name=cost]').clear();
    cy.get('input[name=cost]').type('123456789');

    mockSpy('PartialUpdateVariant', 'mutatePartialUpdateVariant');
    cy.get('button:contains("ثبت")').click();

    cy.wait('@mutatePartialUpdateVariant', 500)
      .its('request.body.variables.content.primary_cost')
      .should('eq', 123456789);
  });
});
