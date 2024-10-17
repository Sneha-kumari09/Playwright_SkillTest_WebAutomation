class Categoriespage
{
    constructor(page){
        this.page = page;
        this.allCategories = page.locator('[data-testid="merListItem-container"]').first();
        this.categoriesTier1 = page.locator('[data-testid="merListItem-container"]');
        this.categoriesTier2 = page.getByRole('link', { name: 'Book' });
        this.categoriesTier3 = page.getByRole('link', { name: 'Computer It' });
    }

  async selectCategory(){
    await (this.allCategories).waitFor();
    const categoryElements = await this.categoriesTier1.elementHandles(); // Get an array of element handles
    for (let i = 0; i < categoryElements.length; i++) {
        const categoryText = await categoryElements[i].textContent(); // Get text content of each element
        if(categoryText.includes("Books")){
            await categoryElements[i].click(); // Click the element
            break;
        }
    }
    await this.page.waitForTimeout(2000);
    await this.categoriesTier2.click(); // click on Books tier 2 category
    await this.categoriesTier3.click(); // click on Computer It tier 3 category
  }
}
module.exports = {Categoriespage};