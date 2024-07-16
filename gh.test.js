let page;
beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 60000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title1 = await page.title();
    expect(title1).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team", "Sign up for free");
  });
});

describe("Github page Startups", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/enterprise/startups");
  }, 60000);

  test("The h1 header content", async () => {
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for Startups: Build your startup on GitHub · GitHub"
    );
  });
});

describe("Github page Enterprise", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/enterprise");
  }, 60000);

  test("The header content", async () => {
    const idSelector = "#hero-section-brand-heading";
    await page.waitForSelector(idSelector);
    const title3 = await page.title();
    expect(title3).toEqual("The AI Powered Developer Platform. · GitHub");
  });
});

describe("Github page Sponsors", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/sponsors");
  }, 60000);

  test("The h1 header content", async () => {
    await page.waitForSelector("h1");
    const title4 = await page.title();
    expect(title4).toEqual("GitHub Sponsors · GitHub");
  });

  test("Page content h2-mktg heading", async () => {
    const headingSelector = "*.h2-mktg";
    await page.waitForSelector(headingSelector);
    const actual = await page.$eval(
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
    await page.waitForSelector(".h5-mktg");
    const actual = await page.$eval(
      "body > div.logged-out.env-production.page-responsive > div.application-main > main > div > div.container-xl.p-responsive.mb-5 > div > div > div:nth-child(1) > h3",
      (link) => link.textContent
    );
    expect(actual).toContain(
      "When can I get off the waitlist to join GitHub Sponsors?"
    );
  });
});
