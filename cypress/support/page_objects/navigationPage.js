function checkDownArrow(titlePage) {
    cy.contains('a', titlePage).then( navLine => {
        cy.wrap(navLine).find('.expand-state').invoke('attr', 'ng-reflect-icon').then( attr => {
            if(attr.includes('left')) {
                cy.wrap(navLine).click()
            }
        })
    })
}

export class NavigationPage {

    formsLayouts(){
        checkDownArrow('Forms')
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        checkDownArrow('Forms')
        cy.contains('Datepicker').click()
    }

    toasterPage() {
        checkDownArrow('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage() {
        checkDownArrow('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage() {
        checkDownArrow('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}


export const navigateToPage = new NavigationPage()