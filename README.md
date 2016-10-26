# Simon-Game

This is a **JavaScript & Sass** project for [Free Code Camp challenge](https://www.freecodecamp.com/challenges/build-a-simon-game)

You can [view the site here](http://codepen.io/AsimoLoveGym/full/zKXYKk/)

## Game Rules:

It’s the classical Simon game. It will demo the pattern first, you follow the patter and click each block. Successfully doing so will lead you to next level.

###Game difficulty
Default game difficulty is Hard (20 steps in total to win the game). You can use the dropdown menu to choose other difficulties (9 steps or 15 steps).

###Game mode
In normal mode, you will stay in the same level if you clicked wrong.

In strick mode, you will go back to level 0 if you clicked wrong.

###Others

Switch on/off works as the real switch in life.

Start button can reset game to level 0 and start from beginning.

Tempo will speed up after level 5, 9 and 13.

## Reference:

Mainly inspired by (just reverse engineering, never looked into the code)

https://codepen.io/Em-Ant/full/QbRyqq/

Clear All timeout, inspired by stackoverflow questions

http://stackoverflow.com/questions/3847121/how-can-i-disable-all-settimeout-events

Bourbon.sass for cross browsers compatibility

https://github.com/thoughtbot/bourbon
