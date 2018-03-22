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


    //TODO: Data verification check
    def newCatch() {
        User user = springSecurityService.currentUser

        def dateCaughtModified = new Date().parse("yyyy-MM-dd", params.dateCaught)
//        def imageUpload = params.image
//
//        // Define the file path for the video upload
//        def destDir = new File(System.getProperty("user.home"))
//
//        def curTime = new Date()
//        def destFilename = String.format("%s-%s.jpg", curTime.format("MM-dd-yyyy-HH-mm-ss"), params.tripName)
//        def destFile = new File(destDir, destFilename)
//
//        // Save the video on the server
//        destFile.createNewFile()
//        imageUpload.transferTo(destFile)

        def fishCatch = new Catch(
                user: user,
                tripName: params.tripName,
                fishType: params.fishType,
                dateCaught: dateCaughtModified,
                xCoord: params.xCoord,
                yCoord: params.yCoord,
                comment: params.comment,
//                imagePath: destFile.path,
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
