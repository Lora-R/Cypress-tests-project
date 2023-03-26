export class SmartTablePage {
    findRowByNameFromSmartTableandChangeItsAge(name, age) {
        cy.get('tbody').contains('tr', name).then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).get('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addNewRowInSmartTable(firstName, lastName) {
        cy.get('thead').then( tableHead => {
            cy.wrap(tableHead).find('tr th .nb-plus').click()
            cy.wrap(tableHead).find('tr td [placeholder="First Name"]').type(firstName)
            cy.wrap(tableHead).find('tr td [placeholder="Last Name"]').type(lastName)
            cy.wrap(tableHead).find('tr td .nb-checkmark').click()
        })
        cy.get('tbody').find('tr').eq(0).then( newDataRow => {
            cy.wrap(newDataRow).find('td').eq(2).should('contain', firstName)
            cy.wrap(newDataRow).find('td').eq(3).should('contain', lastName)
        })
    }

    searchByAge(age) {
        cy.get('thead').find('tr th [placeholder="Age"]').then( ageFieldSearch => {
                
            cy.wrap(ageFieldSearch).clear().type(age)
            cy.wait(500)
            cy.get('tbody').find('tr').each( tableRow => {
                if (age > 45){
                    cy.wrap(tableRow).find('td').should('contain', 'No data found') 
                } else {
                   cy.wrap(tableRow).find('td').eq(6).should('contain', age)  
                }
            })
        })
    }

}

export const onSmartTablePage = new SmartTablePage()