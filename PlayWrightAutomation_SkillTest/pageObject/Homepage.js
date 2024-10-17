class HomePage {

    constructor(page)
    {
        this.page = page;
        this.searchbox= page.getByPlaceholder('Looking for something?');
        this.searchIcon = page.locator("button[aria-label='Search']");
        this.categories = page.getByRole('link', { name: 'Search by category' });
        this.categoryPage = page.locator("#main");
    }
    
    async goTo()
    {
        await this.page.goto("https://jp.mercari.com/en");
    }

    async launchSearchBox(){
        await  this.searchbox.click();
    }
    
    async searchByCategory()
    {
        await  this.searchbox.click(); // click on search box
        await this.categories.click(); // click on search by category
    }

    async searchByText(searchtext){
        await  this.searchbox.click();
        await this.searchbox.fill(searchtext);
        await this.searchIcon.first().click();
    }
    
    }
    module.exports = {HomePage};