# Elevator Simulation

I wanted to work on a project with more logic to test my JavaScript skills so came up with this idea of modelling an elevator system. Here's how it works:

* There are two elevators in a block of flats for this system. 

* The left one can only travel between the ground floor and the top floor.

* The right one however can travel from the underground carpark (-1) to all the other floors.

* Whenever a user presses the 'call' button on their floor, whichever elevator is closest will arrive at that floor.

* If both lifts are equally close/far away, the right one will arrive (since this one can travel to more floors).

* Depending on which elevator arrives, the user is then presented with lift controls which reflect the floors which the elevator can reach.

* The user can then select which floor they want to travel to and the elevator will take them there.

* If a user presses the 'call' button while there is already a lift at their floor, they will recieve feedback via an alert.

* If a user tries to travel to a floor which they are already on, they will again recieve feedback via an alert.

