class Requests {
    //verboRecurso
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping',
        })
    }

    getBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking/1',
        })

    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })

    }

    getBookingList() {
        return cy.request({
            method: 'GET',
            url: 'booking',
        })
    }


    uptadeBookingWithoutToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })

    }
    uptadeBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    uptadeBookingInvalidToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }

        })
    }

    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token
            Cypress.env('token', token)

        })

    }

    deleteBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWithouToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: 'booking/1312312312',
            headers: {
                Cookie: `token=${Cypress.env('token')}`

            },
            failOnStatusCode: false
        })
    }


    bookingListForName(response) {
        return cy.request({
            method: 'GET',
            url: 'booking?firstname=**'

        })
    }

    bookingListForDate(response) {
        return cy.request({
            method: 'GET',
            url: 'booking?checkin=2018-01-01'
        })
    }
}

export default new Requests()