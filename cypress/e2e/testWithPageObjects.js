import { navigateToPage } from "../support/page_objects/navigationPage"
import { onFomsLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test suite for navigate to page', () => {
    beforeEach('Open main page', () => {
        cy.openHomePage()
    })

    it('Test nav menu', () => {
        navigateToPage.formsLayouts()
        navigateToPage.datepickerPage()
        navigateToPage.smartTablePage()
        navigateToPage.toasterPage()
        navigateToPage.tooltipPage()
    })

    it('Test Inlie form with name and email', () => {
        navigateToPage.formsLayouts()
        onFomsLayoutsPage.fillAndSubmitInlineFormNameAndEmailFields('Lili', 'lili@gmail.com')
    })

    it('Test Basic form with email and password', () => {
        navigateToPage.formsLayouts()
        onFomsLayoutsPage.fillAndSubmitNameBasicFormEmailAndPassword('lili@gmail.com', 'lilipass123!')
    }) 

    it('Test choosing date from the Datepicker', () => {
        navigateToPage.datepickerPage()
        onDatepickerPage.chooseDateFromCommonDatepicker(3)
        onDatepickerPage.chooseDateFormDatepickerWithRange(3, 5)
    })

    it.only('Tests on smart table', () => {
        navigateToPage.smartTablePage()
        onSmartTablePage.findRowByNameFromSmartTableandChangeItsAge('Mark', '25')
        onSmartTablePage.addNewRowInSmartTable('Lili', 'Geos')
        onSmartTablePage.searchByAge('33')
    })
}) 