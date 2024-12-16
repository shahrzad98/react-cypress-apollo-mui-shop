import { login } from '../../../utils/login';
import {
  categoryListAfterSubCat,
  productList,
  categoryListAfterEdit,
  productList_v2,
  categoryList,
  categoryListAfterDel_V1,
  categoryListAfterDel_V2,
  categoryListAferDelCat,
  chooseMore
} from '../../../fixtures/categories';
import { mockData } from '../../../utils/mockData';

describe('/categories TestCase  : list of categories , create categories , edit categories  , delete categories  ', () => {
  beforeEach(() => {
    login();
  });

  const checkCategoriesDetails = categories => {
    for (let i in categories) {
      cy.get('[data-cy=accord_category]')
        .eq(i)
        .should('contain', categories[i]?.title)
        .should('contain', `${categories[i].products.length} محصول`);
      for (let y in categories[i].products) {
        let products = categories[i].products;
        cy.get('[data-cy=accord_category]').eq(i).click();
        cy.get('[data-cy=products]').should('contain', products[y].label);
      }
      for (let y in categories[i].child_categories) {
        let child_categories = categories[i].child_categories;
        cy.get('[data-cy=child_categories]')
          .should('contain', child_categories[y].title)
          .should('contain', `${child_categories.length} محصول`);
      }
    }
  };

  it('It should have the desired information according to the date mock', () => {
    mockData('Results', 'gqlResults', categoryList);
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(1).click();
    cy.wait('@gqlResults');
    const categories = categoryList.data?.item?.getCategories?.results;
    checkCategoriesDetails(categories);
  });

  it('create categoryList ', () => {
    const rendomName = `hi${Math.random() * 100}`;
    cy.intercept({ method: 'POST', url: Cypress.env('graphBaseUrl') }).as(
      'upload'
    );
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(1).click();
    cy.get('[data-cy=createCategory]').click();
    cy.get('input[type=file]').attachFile('categoryTest.png');
    cy.wait('@upload', { requestTimeout: 120000 });
    cy.get('[data-cy=category_name]').type(`${rendomName}`);
    cy.get('[data-cy=submit_category]').click();
    cy.get('[data-cy=CategoryProductCard]').eq(0).click();
    cy.get('[data-cy=submit_product]').click();
    cy.get('[data-cy=accord_category]')
      .eq(0)
      .should('contain', rendomName)
      .should('contain', `${1} محصول`);
  });

  it('delete category should clear all product and delete that', () => {
    mockData('Results', 'gqlResults', categoryList);
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(1).click();
    cy.wait('@gqlResults');
    const categories = categoryList.data?.item?.getCategories?.results;
    let products = categories[0].products;
    for (let y in products) {
      if (y == 0) {
        mockData('Results', 'gqlResults', categoryListAfterDel_V1);
      }
      if (y == 1) {
        mockData('Results', 'gqlResults', categoryListAfterDel_V2);
      }
      cy.get('[data-cy=accord_category]').eq(0).click();
      cy.get('[data-cy=trash]').eq(0).click();
      cy.get('[data-cy=confirm_btn]').click();
      cy.wait('@gqlResults');
    }
    cy.get('[data-cy=accord_category]').eq(0).click();
    cy.get('[data-cy=empty-products]').should('contain', 'محصولی پیدا نشد!');
    cy.get('[data-cy=more_click]').eq(0).click();
    mockData('Results', 'gqlResults', categoryListAferDelCat);
    mockData('Mutation', 'gqlMutation', {
      data: { item: { deleteCategory: null, __typename: 'ItemMutation' } }
    });
    cy.get('[data-cy=del_modal]').click();
    cy.get('[data-cy=confirm_btn]').click();
    cy.wait('@gqlMutation');
    cy.wait('@gqlResults');
    cy.get('[data-cy=accord_category]').should(
      'not.contain',
      categories[0].title
    );
  });

  it('edit of Category', () => {
    mockData('Results', 'gqlResults', categoryList);
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(1).click();
    cy.wait('@gqlResults');
    mockData('GetCategory', 'gqlGetCategory', chooseMore);
    cy.get('[data-cy=more_click]').eq(3).click();
    cy.get('[data-cy=edit_modal]').eq(0).click();
    cy.wait('@gqlGetCategory');
    cy.get('[data-cy=edit_name]').type('جذاااب یک');
    mockData('PartialUpdateCategory', 'gqlPartialUpdateCategory', {
      item: {
        partialUpdateCategory: { id: '383', __typename: 'Category' },
        __typename: 'ItemMutation'
      }
    });
    mockData('GetCategory', 'gqlGetCategory', productList);
    cy.get('[data-cy=submit_product]').click();
    cy.wait('@gqlPartialUpdateCategory');
    cy.wait('@gqlGetCategory');
    mockData('Mutation', 'gqlMutation', {
      data: { item: { deleteCategory: null, __typename: 'ItemMutation' } }
    });
    mockData('Results', 'gqlResults', categoryListAfterEdit);
    cy.get('[data-cy=CategoryProductCard]').eq(0).click();
    cy.wait('@gqlMutation');
    cy.get('[data-cy=submit_product]').click();
    cy.wait('@gqlResults');
    const categories = categoryListAfterEdit.data?.item?.getCategories?.results;
    checkCategoriesDetails(categories);
  });

  it('add subcategory', () => {
    mockData('Results', 'gqlResults', categoryList);
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(1).click();
    cy.wait('@gqlResults');
    cy.get('[data-cy=more_click]').eq(2).click();
    cy.get('[data-cy=create_sub]').click();
    cy.intercept({ method: 'POST', url: Cypress.env('graphBaseUrl') }).as(
      'upload'
    );
    cy.get('input[type=file]').attachFile('categoryTest.png');
    cy.wait('@upload', { requestTimeout: 120000 });
    cy.get('[data-cy=sub_name]').type('تست ساب');
    mockData('PartialUpdateCategory', 'gqlPartialUpdateCategory', {
      item: {
        partialUpdateCategory: { id: '383', __typename: 'Category' },
        __typename: 'ItemMutation'
      }
    });
    mockData('GetCategory', 'gqlGetCategory', productList_v2);
    mockData('CreateCategory', 'gqlCreateCategory', {
      item: {
        createCategory: { id: '427', __typename: 'Category' },
        __typename: 'ItemMutation'
      }
    });
    cy.get('[data-cy=subCat]').click();
    cy.wait('@gqlCreateCategory');
    cy.wait('@gqlGetCategory');
    mockData('Mutation', 'gqlMutation', {
      data: { item: { deleteCategory: null, __typename: 'ItemMutation' } }
    });
    mockData('Results', 'gqlResults', categoryListAfterSubCat);

    cy.get('[data-cy=CategoryProductCard]').eq(0).click();
    cy.wait('@gqlMutation');
    cy.get('[data-cy=submit_product]').click();
    cy.wait('@gqlResults');
    const categories =
      categoryListAfterSubCat.data?.item?.getCategories?.results;
    checkCategoriesDetails(categories);
  });
});
