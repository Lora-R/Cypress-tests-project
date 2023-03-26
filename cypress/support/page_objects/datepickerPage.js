function selectFutureDate(daysFromToday) {
    let date = new Date()
    date.setDate(date.getDate() + daysFromToday)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {month: 'short'})
    let dateAssertion = `${futureMonth} ${futureDay}, ${date.getFullYear()}`
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( currentMonthDateTitle => {
        if(!currentMonthDateTitle.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            selectFutureDate()
        } else {
            cy.get('.day-cell').not('ng-star-inserted').contains(futureDay).click()
        }
    })
    return dateAssertion
}


export class DatepickerPage {
    chooseDateFromCommonDatepicker(daysFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('nb-card-body').then( form => {
            cy.wrap(form).find('[placeholder="Form Picker"]').click()
            let dateInTheFuture = selectFutureDate(daysFromToday)

            cy.wrap(form).find('[placeholder="Form Picker"]').invoke('prop', 'value').should('contain', dateInTheFuture)
        })
    }

    chooseDateFormDatepickerWithRange(firstDate, secondDate) {
        cy.contains('nb-card', 'Datepicker With Range').find('nb-card-body').then( form => {
            cy.wrap(form).find('[placeholder="Range Picker"]').click()
            let dateFirst = selectFutureDate(firstDate)
            let dateSecond = selectFutureDate(secondDate)
    
            let dateRange = `${dateFirst} - ${dateSecond}`
            cy.wrap(form).find('[placeholder="Range Picker"]').invoke('prop', 'value').should('contain', dateRange)
        })
    }

}

export const onDatepickerPage = new DatepickerPage()