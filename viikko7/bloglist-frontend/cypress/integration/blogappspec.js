describe('Blog pp', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testi',
      username: 'testi',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('salasana')
        .click()
      cy.get('#username')
        .type('testi')
      cy.get('#password')
        .type('testi')
      cy.contains('kirjaudu')
        .click()
      cy.contains('testi logged in')
    })

    it('user can logout', function () {
      cy.contains('logout')
        .click()
      cy.contains('log in to Blog app')
    })

    it('a new blog can be created', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('testi')
      cy.get('#url')
        .type('www.testi.fi')
      cy.get('#create')
        .click()
      cy.contains('a new blog a blog created by cypress by testi added')
    })

    it('new blog can be viewed', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('otsikko')
      cy.get('#author')
        .type('kirjoittaja')
      cy.get('#url')
        .type('www.osoite.fi')
      cy.get('#create')
        .click()
      cy.contains('otsikko kirjoittaja')
        .click()
      cy.contains('www.osoite.fi')
    })

    it('can be liked', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('otsikko')
      cy.get('#author')
        .type('kirjoittaja')
      cy.get('#url')
        .type('www.osoite.fi')
      cy.get('#create')
        .click()
      cy.contains('otsikko kirjoittaja')
        .click()
      cy.get('#like')
        .click()
      cy.contains('1 likes')
    })

    it('can be commented', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('otsikko')
      cy.get('#author')
        .type('kirjoittaja')
      cy.get('#url')
        .type('www.osoite.fi')
      cy.get('#create')
        .click()
      cy.contains('otsikko kirjoittaja')
        .click()
      cy.get('#comment')
        .type('kiva kommentti')
      cy.contains('add comment')
        .click()
      cy.contains('kiva kommentti')
    })
  })
})
