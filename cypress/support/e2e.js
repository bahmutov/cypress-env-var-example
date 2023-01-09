Cypress.on('window:before:load', (win) => {
  win.Cypress = Cypress.currentTest
})
