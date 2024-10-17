const {HomePage} = require('./Homepage');
const {Categoriespage} = require('./Categoriespage');
const {SearchResultpage} = require('./SearchResultpage');
class POManager
{
constructor(page)
{
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.categoriesPage = new Categoriespage(this.page);
    this.searchResultPage = new SearchResultpage(this.page);
}

getHomePage()
{
    return this.homePage;
}

getCategoriesPage()
{
    return this.categoriesPage;
}

getsearchResultPage()
{
    return this.searchResultPage;
}

}
module.exports = {POManager};