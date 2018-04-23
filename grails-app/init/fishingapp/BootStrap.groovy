package fishingapp

import FishingApp.Role
import FishingApp.User
import FishingApp.UserRole

class BootStrap {

    def init = { servletContext ->

        def today = new Date()

        // Add for creating Roles and Users
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        def testAdmin = new User(username: 'jake', password: 'password', fname: 'Jake', lname: 'Mager')
        testAdmin.save(flush: true)

        UserRole.create testAdmin, adminRole, true

        UserRole.withSession {
            it.flush()
            it.clear()
        }


        def fish1 = new Catch(tripName: "Up State", fishType: "Walleye", comment: "It was cold", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, user: testAdmin)
        fish1.save(flush:true)
        def fish2 = new Catch(tripName: "Piligrim River", fishType: "Pike", comment: "40 incher", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, user: testAdmin)
        fish1.save(flush:true)



    }
    def destroy = {
    }
}
