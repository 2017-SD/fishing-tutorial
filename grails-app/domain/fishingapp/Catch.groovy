package fishingapp

import FishingApp.User

class Catch {
    String tripName
    String fishType
    String comment
    Float xCoord
    Float yCoord
    Date dateCaught

    static belongsTo = [user: User]

    static constraints = {
        tripName blank: false
        fishType blank: false
        dateCaught blank: false
    }
}
