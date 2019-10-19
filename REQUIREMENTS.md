# Poker Face

In a language of your choice write a program that names a poker hand. The program should read input from a file and convert the specified hands (there may be many) into the name of the corresponding poker hand. The name of the hand will be one of:

High card

One pair

Two pair

Three of a kind

Straight

Flush

Full house

Four of a kind

Straight flush

Royal Flush

The full definition of these hands is here: <http://en.wikipedia.org/wiki/List_of_poker_hands>

Each line of the input file will contain 5 valid card descriptions. Each description is in the form CS, where C is the name of the card (2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A) and S is the suit (H, D, S, C for Hearts, Diamonds, Spades and Clubs respectively).

Example input:

3H JS 3C 7C 5D

JH 2C JD 2H 4C

9H 9D 3S 9S 9C

9C 3H 9S 9H 3S

Example output:

3H JS 3C 7C 5D => One pair

JH 2C JD 2H 4C => Two pair

9H 9D 3S 9S 9C => Four of a kind

9C 3H 9S 9H 3S => Full house

Notes:

- Aces can be the highest or lowest card of a straight or straight flush i.e. A, 2, 3, 4, 5 or T, J, Q, K, A

- There are no marks for the UI in this exercise. A console application is acceptable, however feel free to build it whatever way you like.

- We are interested in how you write the code in particular: readability, decomposition, use of data structures, etc.

- Your code should be unit tested although the actual console output itself does not require test coverage. Make sure you consider how best to decompose the code to allow for best unit test coverage.

- It goes without saying, but please don't google a solution as we wish to see how you approach the problem.
