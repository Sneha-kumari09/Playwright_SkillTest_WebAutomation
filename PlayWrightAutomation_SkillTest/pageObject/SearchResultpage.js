class SearchResultpage
{
    constructor(page){
        this.page = page;
        this.itemGrid = page.locator('#item-grid');
        this.filtersection =  page.getByRole('button', { name: 'Category' }),
        this.Tier1 =  page.locator("option[value='5']");
        this.Tier2 =  page.locator("option[value='72']");
        this.Teir3 = page.locator("label:has-text('Computer It')");
        this.filtercheckbox = page.locator("[name='category_id']").nth(1);
    }
    async loadsearchResults(){
        await (this.itemGrid).waitFor();
        let searchPageLoaded = await (this.itemGrid).isVisible();
        return searchPageLoaded;
    }
    async getFilterSection()
{
    return await this.filtersection.textContent();
}
async getTier1()
{
    return await this.Tier1.textContent();
}
async getTier2()
{
    return await this.Tier2.textContent();
}
async getTier3()
{
    return await this.Teir3.textContent();
}

}

module.exports = {SearchResultpage};