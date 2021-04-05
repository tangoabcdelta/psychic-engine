# Architecture

Also called, "Design and Requirements Engineering"

## Objective

An architect's objective is to achivieve
  - maximum quality
  - maximum performance
  - maximum maintainability
  - and overall success
within the given constraints


### What does an Architect do? Or, what does "Architecting" as a process involve doing?
- Picking specific structural options from hundreds of possibilities
- Making fundamental structural choices that are costly to change once implemented (Things that people perceive as hard to change)
- Focus on decisions that "have to" be right the first time
- Finding out what are the "boundaries" from the very generic one liner requirements from the business
- Creating multiple copies of the Program for redundancy
- Identification of Systems & organizing them, and explaining how it behaves



#### Examples of Architecting

For example, the systems that controlled the Space Shuttle launch vehicle had the requirement of "being very fast and very reliable".

- Generally, all requirements arrive from the business in one liner definitions.
- Since these descriptions are very generic, you, as an architect, must find out what are the "boundaries" i.e.
  - if the requirement is to make it fast, then how fast?
  - what's the upper limit of fast?
  - what's the lower limit?
  - what is the meaning of reliability in this case?
    - For example:
      - If you were designing a car engine & wanted it to be reliable, then, you'd want it to survive winters and other bad weathers. A reliable car engine should run upto certain miles e.g. 2500 kilometers without breaking down. It should have an easy cold start etcetera.  deak weather goes through rapid temperature different  duration
      - But a space shuttle's engine doesn't run for a very long period. Launches are typically 15 to 50 minutes long. A rocket's realiability can't be measured in miles because a rocket travels upwards for upto several hundred kilometers only. But it does it at such a fast rate, at such insane speeds, that 



Therefore, an appropriate real-time computing language would need to be chosen. Additionally, to satisfy the need for reliability the choice could be made to have multiple redundant and independently produced copies of the program, and to run these copies on independent hardware while cross-checking results.


### What’s the relationship between software architecture and software design?
Software architecture exposes the structure of a system while hiding the implementation details.

### Identification of Systems
A system is a collection of components that accomplish a specific function (or, plural: a set of functions)
  
## Scope
- High level



