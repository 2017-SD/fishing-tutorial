package fishingapp

import FishingApp.User
import grails.converters.JSON
import grails.util.Environment

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


    //TODO: Data verification check
    def newCatch() {
        User user = springSecurityService.currentUser

        def dateCaughtModified = new Date().parse("yyyy-MM-dd", params.dateCaught)
        def imageUpload = params.image

        def destDir = System.getProperty("user.home") + "/Desktop/FishingApp/src/main/webapp/Images"
        def destFilename = String.format("%s.jpg", UUID.randomUUID().toString())
        File destFile = new File(destDir, destFilename)

        destFile.createNewFile()
        imageUpload.transferTo(destFile)

        def fishCatch = new Catch(
                user: user,
                tripName: params.tripName,
                fishType: params.fishType,
                dateCaught: dateCaughtModified,
                xCoord: params.xCoord,
                yCoord: params.yCoord,
                comment: params.comment,
                image: destFilename,
        )

        fishCatch.save(flush: true, failOnError: true)
        render "OH YES OH YES"
    }

    def editCatch() {
        User user = springSecurityService.currentUser

        def dateCaughtModified = new Date().parse("yyyy-MM-dd", params.dateCaught)

        Catch getCatch = Catch.get(params.ID)


        def imageUpload = params.image

        if (imageUpload != null) {
            def destDir = System.getProperty("user.home") + "/Desktop/FishingApp/src/main/webapp/Images"
            File destFile = new File(destDir, getCatch.image)
            destFile.createNewFile()
            imageUpload.transferTo(destFile)
        }


        getCatch.tripName = params.tripName
        getCatch.fishType = params.fishType
        getCatch.dateCaught = dateCaughtModified
        getCatch.xCoord = Float.parseFloat(params.xCoord)
        getCatch.yCoord = Float.parseFloat(params.yCoord)
        getCatch.comment = params.comment


        getCatch.save(flush: true, failOnError: true)
        render "OH YES OH YES"
    }

}
