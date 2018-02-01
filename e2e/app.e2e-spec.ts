import { RssPage } from './app.po';

describe('rss App', () => {
  let page: RssPage;

  beforeEach(() => {
    page = new RssPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
