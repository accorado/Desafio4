/// <reference types="cypress" />

import spok from 'cy-spok'
import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'


context('Booking', () => {
    before(() => {
        req.doAuth()
    })

    it('Validar o contrato do booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldbookingIdBePresent(postBookingResponse)
            //validando headers
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDuration(postBookingResponse)

        })
    });


    it('Alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.uptadeBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveContentTypeAppJson(postBookingResponse)
                assertions.shouldHaveDefaultHeaders(postBookingResponse)
            })
        })
    });

    it('Alterar uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.uptadeBookingInvalidToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveContentTypeAppJson(postBookingResponse)
                assertions.shouldHaveDefaultHeaders(postBookingResponse)
            })
        })
    });

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.uptadeBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
                assertions.shouldHaveContentTypeAppJson(postBookingResponse)
                assertions.shouldHaveDefaultHeaders(postBookingResponse)
            })
        })

    });

    it.only('Alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithouToken(postBookingResponse).then(deleteBookingWithouToken => {
                assertions.shouldHaveStatus(deleteBookingWithouToken, 405)
                assertions.shouldHaveContentTypeAppJson(postBookingResponse)


            })
        })
    })


    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)

            })
        })

    });

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithouToken(postBookingResponse).then(deleteBookingWithouToken => {
                assertions.shouldHaveStatus(deleteBookingWithouToken, 405)

            })
        })

    });

    it('Listar Reservas por Nomes @functional', () => {
        req.bookingListForName().then(getBookingResponse => {
            assertions.shouldHaveStatus(getBookingResponse, 200)
            assertions.shouldHaveContentVia(getBookingResponse)
        })
    })

    it('Listar Reservar por Datas @functional', () => {
        req.bookingListForDate().then(getBookingResponse => {
            assertions.shouldHaveStatus(getBookingResponse, 200)
            assertions.shouldHaveContentVia(getBookingResponse)
            assertions.shouldHaveContentTypeAppJson(getBookingResponse)

        })

    });

});

