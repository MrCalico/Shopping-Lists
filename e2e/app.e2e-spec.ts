import { ShoplistPage } from './app.po';

describe('shoplist App', () => {
  let page: ShoplistPage;

  beforeEach(() => {
    page = new ShoplistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
