const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObject/POManager');
const selectors = require("../pageObject/Utils/locatorsData.json");

//const locatorData =  JSON.parse(JSON.stringify(require("../pageObject/Utils/locatorsData.json")));

test(`Search by category`, async({page})=>{
    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    //launch search engine on home page
    await homePage.goTo();
    await homePage.searchByCategory();
    await page.waitForSelector(page.getByRole('link', { name: 'Book' }));

    //select categories on Category Page
    const categoriesPage = poManager.getCategoriesPage();
    await categoriesPage.selectCategory();

    //load the search result page
    const searchResults = poManager.getsearchResultPage();
    const loadSuccess = await searchResults.loadsearchResults();
    await expect(loadSuccess).toBeTruthy();

    //assertions
    expect(await page.getByRole('button', { name: 'Category' }).isVisible()).toBeTruthy();
    await expect(page.getByRole('combobox').nth(1)).toHaveValue('5');
    await expect(page.getByRole('combobox').nth(2)).toHaveValue('72');
    await expect(page.getByLabel('Computer It')).toBeChecked();
    console.log(`first test is complete`);
});

test(`Search By Text`, async({page})=>{
    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    const searchText = 'Javascript';
    //launch search engine on home page
    await homePage.goTo();
    await homePage.searchByText(searchText);
   
    //assert
    const SearchResult = page.locator(selectors.SearchResultheading.searchResultheadingSelector); 
    const searchResultheader = await SearchResult.textContent();
    const isVisible = await SearchResult.isVisible();
    console.log(`Search header is visible : ${isVisible}`);
    console.log(`Search header has text ${searchResultheader}`);
    await expect(isVisible).toBeTruthy();
    await expect(SearchResult).toContainText(searchText);
});

test.only(`Search conditions from the latest browsing history`, async({page})=>{
    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    //launch search engine on home page
    await homePage.goTo();
    await homePage.searchByCategory();
     //select categories on Category Page
     const categoriesPage = poManager.getCategoriesPage();
     await categoriesPage.selectCategory();

     const searchResults = poManager.getsearchResultPage();
     const tier1 = await searchResults.getTier1();
     const tier2 = await searchResults.getTier2();
     const tier3 = await searchResults.getTier3();

     console.log("first "+ tier1 + " second  " + tier2 + " and " + "  third " + tier3)

await page.pause();
     //search by text
     await homePage.goTo();
     const searchText = 'Javascript';
    await homePage.searchByText(searchText);
    await page.waitForSelector(selectors.SearchHistory.itemContainer);
    const itemcount = await page.locator(selectors.SearchHistory.itemContainer).count();
    console.log(`Total item visible on the page for ${searchText} is ${itemcount}`);
    
    
    //verify the search history
    await homePage.goTo();
    await homePage.launchSearchBox();
    
    const searchHistory = page.locator(selectors.SearchHistory.searchHistorySelector);

// Wait for the search history to be visible
await page.waitForSelector(selectors.SearchHistory.searchHistorySelector);

// Get the locator for the searched items
const searchedItemsLocator = searchHistory.locator(selectors.SearchHistory.searcheditems);

// Get the count of searched items
const searchedContentsCount = await searchedItemsLocator.count();
console.log(`Search history contains ${searchedContentsCount} histories`);

// Initialize an array to hold the text content of searched items
const searchedContents = [];

// Iterate through the items to extract their text content
for (let i = 0; i < searchedContentsCount; i++) {
    const content = await searchedItemsLocator.nth(i).textContent(); // Get the text content of each item
    if (content && (content.match(searchText) || content.match(tier3))) {
        console.log("Search conditions from the latest browsing history are saved correctly");
    }
}
    const searchContentA = await page.locator(selectors.SearchHistory.historyitem1).textContent();
    const searchContentB = await page.locator(selectors.SearchHistory.historyitem2).textContent();
    
    //assert
    await expect(searchContentA.match(searchText)).toBeTruthy();
    await expect(searchContentB.match(tier3)).toBeTruthy();
});
