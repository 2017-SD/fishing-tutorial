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

        def testAdmin = new User(username: 'admin', password: 'password', fname: 'Jake', lname: 'Mager')
        testAdmin.save(flush: true)

        def testUser = new User(username: 'user', password: 'password', fname: 'Jon', lname: 'Nader')
        testUser.save(flush: true)

        UserRole.create testAdmin, adminRole, true
        UserRole.create testUser, userRole, true

        UserRole.withSession {
            it.flush()
            it.clear()
        }


        def fish1 = new Catch(tripName: "Up State", fishType: "Walleye", comment: "Bob Marley", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, user: testAdmin)
        fish1.save(flush:true)




    }
    def destroy = {
    }
}