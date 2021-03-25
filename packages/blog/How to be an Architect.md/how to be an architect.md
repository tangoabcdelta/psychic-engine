Why react became so popular while rest of the frameworks are still struggling?
Ans:

- Frameworks are all about the "inversion of control" which means they run your code, not you.
- Other frameworks enforced the MVC or MVVM patterns and compelled people to use them.
- React did not.
- React was just a component building library.
- And this gave Architects the advantage to think about how to build the application.

First:
  - The first concern of an architect is to ensure that the house is usable.
    - The architects don't concern themselves with what bricks or what cement to be used.
    - This is a quote from "Bob"
 
 Second:
  - Distinguish the "Essentials" from the "Details"
    - "Essentials"
      - These are the parts without which, a house, in 2020, is next to unusable
      - e.g. a kitchen, entires, rest rooms, floors and walls and the spaces
    - "Details"
      - Examples:
        - Building materials like wood or brick or concrete or steel
        - Ornamentation

Same applies to software too.
When building an app, we should not think about the framework.
Because frameworks are like bricks, cement and wood.
We should think about "how to build an app" first.
To build an app, we need:
  1. Entities (or Data)
  2. Use Cases
  
And with just that, we can pretty much get started.
Rest is just details:
  1. Presentation
  1. Persistence
  1. Technology
    1. React
    1. jQuery
    1. MongoDB
    1. Relational-DB
    - Remember that technology itself is an architectural "Detail"
    
When you choose a framework, you choose an architecture itself - MVC or MVVM etc.
You choose a set of tools already




1. Presentation Layer (Show everything)
1. Application Layer (Set of activities like, borrow a book, lend a book, manage collections)
1. Data Layer (Entities Layers e.g. Book, Author, Collection, Owner)
1. Infrastructure Layer (Persist information to database, communicate with servers)


"Loose coupling and high cohesion" among components, this should be the goal











