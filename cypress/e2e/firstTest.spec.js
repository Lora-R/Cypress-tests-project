/// <reference types="cypress" />

const { Dropdown } = require("bootstrap")

describe('Test suite 1', () => {

    beforeEach('Open the page', () => {
        cy.visit('/')
    })

    it('Test 1, get', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('input[placeholder="Email"]#inputEmail3.input-full-width')
    })

    it('Test 2, parents and find', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('#inputEmail3')
            .parents('form')
            .find('nb-checkbox')
            .click()

    })

    it('Test 3, then and wrap', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then( (firstForm) => {
            const firstFormEmail = firstForm.find('[for="inputEmail1"]').text();
            const firstFormPass = firstForm.find('[for="inputPassword2"]').text();

            expect(firstFormEmail).to.equal('Email');
            expect(firstFormPass).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then((secondForm) => {
                const secondFormEmail = secondForm.find('[for="exampleInputEmail1"]').text();
                const secondFormPass = secondForm.find('[for="exampleInputPassword1"]').text();

                expect(secondFormEmail).to.not.equal(firstFormEmail);
                expect(secondFormPass).to.equal(firstFormPass);


                cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address');
            })

            // 1
            cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

            // 2
            cy.get('[for="exampleInputEmail1"]').then( label => {
                expect(label.text()).to.equal('Email address')
            });

            // 3

            cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
                expect(text).to.equal('Email address')
            });
        })
    
    })

    it('Test 4, invoke', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Basic form').then( checkBox => {
            cy.wrap(checkBox)
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
        })
    })

    it('Test 5, invoke and date', () => {
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // cy.get('input[placeholder="Form Picker"]').click()
        // cy.contains('nb-calendar-day-cell', '17').click()
        // cy.get('input[placeholder="Form Picker"]').then( input => {
        //     expect(input.text()).to.equal('Mar 17, 2023')
        // })

        cy.contains('nb-card','Common Datepicker').then( input => {
            cy.wrap(input).find('input[placeholder="Form Picker"]')
            .click()
            .get('nb-calendar-day-picker').contains('17')
            .click()
            cy.wrap(input).find('input[placeholder="Form Picker"]')
            .invoke('prop', 'value')
            .should('contain', 'Mar 17, 2023')

        })

    })

    it('Test 6, radio buttons', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
                .eq(0)
                .check({ force: true })
                .should('be.checked')


            cy.wrap(radioButtons)
                .eq(1)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')

            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })
                .should('be.checked')
            
            cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.checked')
        })

    })

    it('Test 7, checkboxes', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.contains('nb-card', 'Toaster configuration').find('[type="checkbox"]').then( checkBoxes => {
            cy.wrap(checkBoxes)
                .eq(0)
                .check({ force: true })
                .should('be.checked')

            cy.wrap(checkBoxes)
                .eq(1)
                .should('not.be.checked')

            cy.wrap(checkBoxes)
                .eq(2)
                .click({ force: true })
                .should('not.be.checked')

        })

    })

    it('Test 8, date selecter', () => {
        cy.contains('Forms').click()

        function selectFutureDate(days) {
                let date = new Date()
                date.setDate(date.getDate() + days)
                let futureDay = date.getDate()
                let futureMonth = date.toLocaleString('default', {month: 'short'})
                let dateAssertion = `${futureMonth} ${futureDay}, ${date.getFullYear()}`
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( currentMonthDateTitle => {
                    if(!currentMonthDateTitle.includes(futureMonth)) {
                        cy.get('[data-name="chevron-right"]').click()
                        selectFutureDate()
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    }
                })
                return dateAssertion
            }

        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input[placeholder="Form Picker"]').then( datePickInput => {
            cy.wrap(datePickInput).click() 
            let dateAssertion = selectFutureDate(3)
            cy.wrap(datePickInput).invoke('prop', 'value').should('contain', dateAssertion)
        })
    })

    it('Test 9, dropdowns', () => {
        cy.visit('/')

        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        cy.get('nav nb-select').then( dropDownSelect => {
            cy.wrap(dropDownSelect).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const itemColor = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }   

                cy.wrap(listItem).click()
                cy.wrap(dropDownSelect).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', itemColor[itemText])
                if (index < 3) {
                    cy.wrap(dropDownSelect).click()
                }
            })

        })

    })

    it('Test 10, tables', () => {
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1 Find row with first name === Larry and change its age to 25
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).get('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // 2 Add new row with first and last name
        cy.get('thead').then( tableHead => {
            cy.wrap(tableHead).find('tr th .nb-plus').click()
            cy.wrap(tableHead).find('tr td [placeholder="First Name"]').type('Lulu')
            cy.wrap(tableHead).find('tr td [placeholder="Last Name"]').type('Geos')
            cy.wrap(tableHead).find('tr td .nb-checkmark').click()
        })
        cy.get('tbody').find('tr').eq(0).then( newDataRow => {
            cy.wrap(newDataRow).find('td').eq(2).should('contain', 'Lulu')
            cy.wrap(newDataRow).find('td').eq(3).should('contain', 'Geos')
        })

        // 3 Search by Age and check it appear correct result
        const listAges = [20, 30, 45, 46, 100]

        cy.wrap(listAges).each( age => {
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
        })

    })

    it('Test 11, popups and tooltips', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()


        cy.get('nb-card').contains('button', 'Default').click()
        cy.get('span').should('contain', 'This is a tooltip')


        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // const stub = cy.stub()

        // cy.on('window:confirm', stub => {
        //     cy.get('tbody tr').find('.nb-trash').eq(0).click().then( () => {
        //         expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        //     })
        // })
        
        cy.get('tbody tr').find('.nb-trash').eq(0).click()
        cy.on('window:confirm', confirm => {
            expect(confirm).to.eql('Are you sure you want to delete?')
        })
    })

})

