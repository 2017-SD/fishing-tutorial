package fishingapp

import FishingApp.User
import grails.converters.JSON

class CatchController {
    def springSecurityService


    def index() { }


    def getCatches() {
        User user = springSecurityService.currentUser
        render Catch.findAllByUser(user).toArray() as JSON

    }

    def getCatch() {
        render Catch.findAllById(params.catchID).toArray() as JSON
    }

    def newCatch() {
        User user = springSecurityService.currentUser

        def dateCaughtModified = new Date().parse("yyyy-MM-dd", params.dateCaught)

        def fishCatch = new Catch(
                user: user,
                tripName: params.tripName,
                fishType: params.fishType,
                dateCaught: dateCaughtModified,
                xCoord: params.xCoord,
                yCoord: params.yCoord,
                comment: params.comment

        )

        fishCatch.save(flush: true, failOnError: true)
        render "OH YES OH YES"
    }
}
