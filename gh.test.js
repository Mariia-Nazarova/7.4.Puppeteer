let page1;
let page2;
let page3;
let page4;

describe("Github page tests", () => {
  jest.setTimeout(60000);
  beforeEach(async () => {
    page1 = await browser.newPage();
    await page1.goto("https://github.com/team");
  });

  afterEach(() => {
    page1.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page1.$("header div div a");
    await firstLink.click();
    await page1.waitForSelector("h1");
    const title1 = await page1.title();
    expect(title1).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page1.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page1.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page1.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team", "Sign up for free");
  });
});

describe("Github page Startups", () => {
  jest.setTimeout(60000);
  beforeEach(async () => {
    page2 = await browser.newPage();
    await page2.goto("https://github.com/enterprise/startups");
  });

  afterEach(() => {
    page2.close();
  });

  test("The h1 header content", async () => {
    await page2.waitForSelector("h1");
    const title2 = await page2.title();
    expect(title2).toEqual(
      "GitHub for Startups: Build your startup on GitHub · GitHub"
    );
  });
});

describe("Github page Enterprise", () => {
  jest.setTimeout(60000);
  beforeEach(async () => {
    page3 = await browser.newPage();
    await page3.goto("https://github.com/enterprise");
  });

  afterEach(() => {
    page3.close();
  });

  test("The header content", async () => {
    const idSelector = "#hero-section-brand-heading";
    await page3.waitForSelector(idSelector);
    const title3 = await page3.title();
    expect(title3).toEqual("The AI Powered Developer Platform. · GitHub");
  });
});

describe("Github page Sponsors", () => {
  jest.setTimeout(60000);
  beforeEach(async () => {
    page4 = await browser.newPage();
    await page4.goto("https://github.com/sponsors");
  });

  afterEach(() => {
    page4.close();
  });

  test("The h1 header content", async () => {
    await page4.waitForSelector("h1");
    const title4 = await page4.title();
    expect(title4).toEqual("GitHub Sponsors · GitHub");
  });

  test("Page content h2-mktg heading", async () => {
    const headingSelector = "*.h2-mktg";
    await page4.waitForSelector(headingSelector);
    const actual = await page4.$eval(
      headingSelector,
      (link) => link.textContent
    );
    expect(actual).toContain(
      "Invest in the software that powers your world",
      "A new way to contribute to open source",
      "Invest in your supply chain",
      "You depend on open source every day",
      "Make open source careers possible",
      "Thanks to our partners",
      "Available in 103 regions",
      "Frequently asked questions",
      "Invest in the projects you depend on"
    );
  });

  test("Page content: When can I get off the waitlist to join GitHub Sponsors?", async () => {
    await page4.waitForSelector(".h5-mktg");
    const actual = await page4.$eval(
      "body > div.logged-out.env-production.page-responsive > div.application-main > main > div > div.container-xl.p-responsive.mb-5 > div > div > div:nth-child(1) > h3",
      (link) => link.textContent
    );
    expect(actual).toContain(
      "When can I get off the waitlist to join GitHub Sponsors?"
    );
  });
});
