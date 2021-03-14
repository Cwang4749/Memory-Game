# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Calvin Wang**

Time spent: **10** hours spent in total

Link to project: [https://classic-memory-game.glitch.me](https://classic-memory-game.glitch.me)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ]

## Video Walkthrough

Here's a walkthrough of implemented user stories:

3 lives, losing the game, start/stop:
![](https://cdn.glitch.com/e7673312-01b1-4a95-a63e-5ce3140ce64f%2FMemoryGameDemoPt1.gif?v=1615065811182)

Winning the game and game speeds up:
![](https://cdn.glitch.com/e7673312-01b1-4a95-a63e-5ce3140ce64f%2FMemoryGameDemoPt2.gif?v=1615065919674)

Countdown Timer:
![](https://cdn.glitch.com/e7673312-01b1-4a95-a63e-5ce3140ce64f%2FMemoryGameDemoPt3.gif?v=1615760289497)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
[I used geeksforgeeks.org to help create my life counter. I also used a youtube video from InsideTheSquare to help set the image for the buttons.]

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
[The biggest challenge was to implement the optional features. While the easier features, such as making 3 lives or changing the tones,
did not require much proficiency with Javascript or HTML, it was harder to make the features that did require a better grasp over them. 
Without the guide of tutorials and using only my elementary understanding of Javascript and HTML, I was facing difficulty implementing
certain features. For example, in the process of using images as backgrounds for
the buttons, I had to first search for information regarding buttons. After discovering that buttons had an element: background-image,
it suddenly became much clearer how to customize the buttons. Also, without learning about the setInterval function, a lot of experimenting
was done in order to implement the timer feature. This is especially so, in regards to having a timer that reacts to the game logic:
such as reseting between turns, reseting when lives are lost, etc. In the end, I was able to refer to multiple walkthrough videos about
timers in order to get enough of an understanding about setInterval before experimenting with it and then finally succeeding. 
Lastly, for the complex button sounds feature, it soon became clear
to me that I lacked understanding regarding the copy paste snippet provided from the tutorial: startTone() and stopTone(). Although I was
able to successfully put the sounds into the game and it works properly with the clue sequences, but it simply would not play indefinitely
when the user continues clicking on the button. Currently I am still working on this issue and will hopefully find my answer through online
resources such as videos, tutorials, or possibly online forums.] 

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[My biggest question regarding web development is: where is all the data coming from? Not including the built in
features such as buttons, font styles, divisions, etc, but even the image and audio files confound me. For glitch
I can upload assets and then it automatically generates a url that I can use to access those files. However, for a
new web developer, without the assistance of glitch, how are images and other files processed and uploaded from scratch?
Another question is what are the default orientations of all new elements and containers? Conceptually it seems as they
float in empty space. Lastly, how do programs that are not programmed with javascript or html run on webpages? For example
how do games that are embedded into the page work?]

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[If I had more time to work on this project, I would spend my time looking into how to implement certain features
such as user customization of the buttons, user selected difficulty, an option to enter a name and a ranking system
These features are more targeted at improving user experience. In terms of the timer and ranking system, it would be used
to rank players based on their progress through the game. On a technical level, I assume I would have to learn more about
storing data into servers such that the rankings are preserved even after the user has exited the session. Something else
I could do would be to comment out my code and rebuild everything from scratch except using different methods to achieve
the same effect. This would not only help me better familiarize myself with web development, but also pushes myself to be
creative in finding solutions.]



## License

    Copyright [Calvin Wang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.