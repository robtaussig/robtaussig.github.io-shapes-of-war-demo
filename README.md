# Life-and-War

Life and War is a high-level history simulator by which a world of five countries is generated with random conditions for each country, including climate variables, size, farmable land, etc. Each country begins with 20 citizens, 10 male and 10 female. The user begins the game by tagging any number of citizens that he or she may wish to "follow." The game is then initiated, and as time progresses, new citizens are born, families are made, food is produced, war is fought, disasters occur, etc. In face of hostile conditions, only the strongest survive, and are thus left to pass on their genetics to the next generation. The game ends when the number of user-determined generations pass, after which the user is presented with an interface through which he or she can investigate that world's history. The citizens originally tagged will have been long gone by now, but their lineage will hold on to the tag, as well as the original citizen's history preserved. A non UI version of this game has been started and its capabilities shown below:

![screen]

This is the result of 20 generations passing, and tens of thousands of citizens being born and passing away for natural and unnatural causes. Each citizen stores an array of its parents and offspring, so entire lineages can be traced through DFS and BFS algorithms. Each citizen also stores his or her own race, attributes, home, alive status, age, etc. Several interesting observations have already been made, especially the fact that citizens of the most hostile environments end up being the most physically and intellectually dominant, because in those particular environments, only the strong can survive and therefore pass along their genetics. In resource-rich countries and those with milder climates, there are less drivers of evolution, and the citizens who end up passing along their genes are more across-the-board and therefore the average offspring will be of less advantageous genetics. I also plan on implementing random events that create both variation in each country, and compelling stories for each citizen, so that the experience of tracing them by the user is more compelling.

# MVP Features

1) A graphical interface for interacting with and controlling the variables that drive progress of each country. The user will be able to manipulate the starting size, climate, etc of each country, or leave it to be randomly generated by the game.

2) A bug-free simulation that can scale up to as large as possible without causing undue stress/delay to the experience of waiting for the simulation to end. In current tests, worlds with more than 20k citizens take no more than 10-20 seconds to simulate 20 generations. While these processes are being calculated, there will be visual representations of various stages to minimize user downtime.

3) Visually appealing art renditions of each country, the size and style of which is dependent upon the variables determined by the user/generated by the application.

# Technologies

React.js (and flux), HTML, CSS. Calculations will occur in the background through the actions model, and upon completion will dispatch the results a store which will notify the views page that everything is ready to be presented to the user. The views page will take that information and render accordingly.

# Wireframes

![wireframe]

# Implementation Timeline

[ ] Phase 1 - Complete bare minimum UI rendering and interaction
- Set up flux cycle and test for basic interaction between the user, the DOM, and the actions component.

[ ] Phase 2 - Complete bare minimum simulation code
- Need to balance existing code, and allow for more initial conditions to increase variability.

[ ] Phase 3 - Combine the two and work on more thematic visuals
- Once bare minimum functionality is completed, work on making the game as visually appealing as possible.


[screen]: ./Screenshot.png
[wireframe]: ./Wireframes.png
