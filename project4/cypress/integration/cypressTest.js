//-----CYPRESSTESTING-----//
describe('CypressTest - Prosjekt 4', function() {
    it('changes genre', function() {
        cy.visit('/');
        cy.get("#genrePicker")
            .select("Western")
            .should("have.value", "Western");
    });

    it("search for something", function () {
        cy.visit('/');
        cy.get("#searchBar")
            .type("Star Wars{enter}")
            .get(".titleTextSmallShow").then((title) => {
                expect(title).to.contain("Star Wars");

        })
            .contains("Star Wars");
    });

    it("changes from gridview to listview", function () {
        cy.visit("/");
        cy.get("#displayList")
            .click()
            .get("#mainMovieContainer")
            .should("have.class", "movieContainerBig");
    });

    it("changes from listview to gridview", function () {
        cy.visit("/");
        cy.get("#displayList")
            .click()
            .get("#mainMovieContainer")
            .get("#displayGrid")
            .click()
            .get("#mainMovieContainer")
            .should("have.class", "movieContainerSmall");
    });

    it("clears the filters", function () {
        cy.visit("/");
        cy.get("#genrePicker")
            .select("Western")
            .get("#clearSearchContainer")
            .click()
            .get("#genrePicker")
            .should("have.value", "All genres")
            .get("#searchBar")
            .should("have.value", "");
    });

    it("sorts by imdbrating", function () {
        cy.visit("/");
        cy.get("#sortPicker")
            .select("imdb")
            .get(".titleTextSmallShow").eq(0).then((firstMovie) => {
                const title = firstMovie.text();
                expect(title).to.contain("Bollywood im Alpenrausch");
        });
    });
});