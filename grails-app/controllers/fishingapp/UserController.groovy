package fishingapp

import FishingApp.User
import grails.converters.JSON
import grails.util.Environment

class UserController {
    def springSecurityService

    def index() { }

    // this function checks if the user is logged in
    def getLogin() {
        User user = springSecurityService.currentUser

        if (user != null) {
            render user.fname
        } else {
            render false

        }

    }
}
