# Topic 03: Stateless Login

Today we learned that HTTP is stateless by default, but products still need login.

Main idea:

- HTTP does not remember previous requests by itself.
- Login state is added through Cookie, Session, or Token.
- The browser sends proof of identity on later requests.

Questions to keep exploring:

- Where is the login state stored?
- What happens if a token is stolen?
- Why are `401 Unauthorized` and `403 Forbidden` different?

This becomes the natural next lesson: why HTTP is stateless, yet websites can keep you logged in.
