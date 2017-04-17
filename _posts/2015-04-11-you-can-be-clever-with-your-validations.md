---
layout:     post
comments:   true
title:      You can be clever with your validations
date:       2015-04-11 11:13
summary:    Don't be afraid to implement clever solutions on the back-end for a better user experience on the front.
categories: rails
---

For me, good design of web forms comes down to two main objectives:

* Reducing number of necessary user inputs
* Reducing number of potential error messages

And in order to acheieve these goals, its okay to be a bit clever behind the scenes.

## When it isn't useful

Take the following two datepickers:

![Datepickers](/images/2015-04-11-date_pickers.jpg)

Expedia (on the left) is the beter of the two. TravelSupermarket (on the right) has room for improvement.

The main reason for this is that TravelSupermarket allows one extra error message path than Expedia. You can set a check-out date that is before the check-in date and you'll be presented with an error message. But where does this fall down?

![Without Javascript](/images/2015-04-11-without_javascript.jpg)

Without JavaScript.

However you wish to dress it up, it's forcing data integrity client-side, although it is a rather nice form of it. If you change the request, you still get the same error message as the TravelSupermarket one.

![Crafted Request](/images/2015-04-11-crafted_request.jpg)

How many people will see this error message? I'd bet not many.

So then, why I am concerning myself with it? I believe there's something to be said for server-side error correction and providing responses with the best possible information. What if instead, we could return the following:

![Better Response](/images/2015-04-11-better_response.jpg)

In this scenario there are the following assumptions to consider:

* Guiding a user to a list of hotels and prices is better than returning an error with no listings.
* There will be increased sales because of these changes to justify the cost of development work.
* The dates entered were actually entered backwards and not just incorrectly.
* Users will actually check their corrected dates and make sure they are correct before purchasing.

It becomes fairly obvious that it isn't in Expedia's best interest to invest in this solution.

## When it is useful

Take this example, from a jobs board side-project that I've been working on:

![Graft Salary](/images/2015-04-11-graft_salary.png)

Forgetting about the UI, which is a work in progress, should the above form return an error that prevents the user from continuing through the process only because the min salary is greater than the max salary? I'd say absolutely not. Let the server correct the mistake and allow the user to continue to the next stage where they can preview the listing, perhaps with a warning bar for good measure.

*EDIT: As Nil2 noted in the comments, it would still be a good idea warn the user of the error before they submit. The meaning behind the above statement was that this is now not an error that would forbid the user from continuing altogether, rather one that can be handled on the server without the relying on client-side JS to force the input to a certain range.*

It can be easy to lean too much on a framework's in-built validation methods and let those rules trickle down into the views. Smarter error correction and data validation server-side can directly result in a better experience for the user.
