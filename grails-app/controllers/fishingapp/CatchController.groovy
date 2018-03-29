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

        def destDir
        if (Environment.current == Environment.DEVELOPMENT) {
            destDir = new File(System.getProperty("user.home"))
        }else if (Environment.current == Environment.PRODUCTION){
            // not in prod yet
            destDir = new File("/var/lib/tomcats/2017_sd_5/resources/")
        }

        def curTime = new Date()
        def destFilename = String.format("%s.jpg", curTime.format("MM-dd-yyyy-HH-mm-ss"))
        def destFile = new File(destDir, imageUpload)

        // Save the video on the server
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
                imagePath: destFile.path,
        )

        fishCatch.save(flush: true, failOnError: true)
        render "OH YES OH YES"
    }

    def editCatch() {
        User user = springSecurityService.currentUser

        def dateCaughtModified = new Date().parse("yyyy-MM-dd", params.dateCaught)

        Catch getCatch = Catch.get(params.ID)

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
