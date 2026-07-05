# Backend Odyssey Gazette 001

## Why Does HTTP Exist?

Reading time: 30-45 minutes

Core idea:

> Every technology exists because of a problem.

Today the problem is not "how do computers send bytes?" TCP already helps with that.

The real mystery is:

> Once the bytes arrive, how does the other computer know what those bytes mean?

---

## Front Page Mystery

Imagine a world with no HTTP.

Your browser connects to a server. The server sends back a stream of bytes.

Now what?

Are those bytes HTML? JSON? An image? An error? A redirect? A login result?

TCP can carry the bytes, but TCP does not explain the message. It is like delivering a sealed envelope without any shared agreement about how to read what is inside.

HTTP exists because browsers and servers needed a shared format.

---

## Why It Exists

TCP solves transport.

HTTP solves meaning.

HTTP answers questions like:

- What action is being requested?
- Which resource is being requested?
- What extra metadata is attached?
- Did the request succeed?
- What type of content came back?
- Is there a body? If yes, how should it be interpreted?

Without HTTP, every website might invent its own private format. Browsers would not be universal. Debugging would be painful. Tools like `curl`, proxies, API clients, CDNs, and browser devtools would be far less useful.

---

## History Corner

HTTP was born with the early World Wide Web.

The first version was intentionally simple: a client asked for a document, and a server returned it. That simplicity mattered. The Web did not win because every part was complicated. It won because different machines, servers, and browsers could agree on a small, readable protocol.

This is one of the deepest engineering lessons in backend development:

> A boring shared standard can unlock a huge ecosystem.

---

## Mechanism

The basic flow:

```text
Browser
  |
  | HTTP Request
  v
Server
  |
  | HTTP Response
  v
Browser
```

An HTTP request usually contains:

- Method: what kind of action you want
- Path: which resource you want
- Headers: metadata about the request
- Body: optional data being sent

An HTTP response usually contains:

- Status code: what happened
- Headers: metadata about the response
- Body: the returned content

Example:

```http
GET /hello HTTP/1.1
Host: localhost:3000
Accept: application/json
```

Possible response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"message":"Hello Sam"}
```

The important thing is not the exact syntax. The important thing is that both sides understand the same structure.

---

## Engineering Trade-off

Why not just use TCP?

Because TCP does not define application meaning. It gives you a reliable byte stream, but not a Web protocol.

Why not let every app invent its own format?

Because shared tools would break. Browsers, API clients, proxies, caches, and monitoring tools depend on common conventions.

Is HTTP always the best answer?

No.

- Real-time two-way communication may use WebSocket.
- Internal high-performance service calls may use gRPC.
- Raw TCP may be useful for custom protocols.

HTTP is powerful because it is general, readable, and widely supported. It is not magic. It is a very successful agreement.

---

## Lab

Run the local server:

```bash
npm start
```

Then inspect the response:

```bash
curl -i http://localhost:3000/hello
```

Look for:

- `HTTP/1.1 200 OK`
- `content-type`
- response body

Then test a resource that exists:

```bash
curl -i http://localhost:3000/users/1
```

Then test a resource that does not exist:

```bash
curl -i http://localhost:3000/users/999
```

The point is not only that the code runs.

The point is that you can see HTTP happening:

- status code
- headers
- body
- resource path

---

## Real World

GitHub's API uses HTTP methods to express actions on resources.

For example, a backend API might use:

- `GET /repos` to read repositories
- `POST /repos` to create a repository
- `PATCH /repos/:id` to update part of a repository
- `DELETE /repos/:id` to delete one

The URL points to the resource. The method carries the action.

That is why `POST /orders/123/delete` feels awkward. The action is hidden in the path instead of expressed by the method.

---

## Boss Challenge

PM asks for an order system.

It must support:

- View all orders
- View one order
- Create an order
- Update shipping address
- Cancel an order

Design the REST API.

For each endpoint, explain:

- Why this method?
- Why this path?
- What status code should success return?
- What should happen if the order does not exist?

---

## Test

### Level 1: Concept

What problem does HTTP solve that TCP does not solve?

### Level 2: Judgment

Is this good REST design?

```http
POST /orders/123/delete
```

Explain your answer.

### Level 3: Reasoning

A server receives bytes over TCP. Why might it still need HTTP headers?

### Level 4: Design

Design an Order API with:

- list orders
- get one order
- create order
- update shipping address
- cancel order

### Level 5: Architecture

HTTP is stateless by default. How can a website still keep a user logged in?

Use Cookie, Session, or Token in your explanation.

---

## Score Template

```text
Backend Odyssey 001 Score

Concept: __ / 20
Reasoning: __ / 20
API Design: __ / 20
Architecture: __ / 20
Experiment: __ / 20

Total: __ / 100
Result: Pass / Reinforce
```

---

## Knowledge Map Update

```text
Backend World

Internet
└── HTTP
    ├── Request
    │   ├── Method
    │   ├── Path
    │   ├── Headers
    │   └── Body
    ├── Response
    │   ├── Status Code
    │   ├── Headers
    │   └── Body
    ├── REST
    │   ├── GET
    │   ├── POST
    │   ├── PUT
    │   ├── PATCH
    │   └── DELETE
    └── Stateless
        ├── Cookie
        ├── Session
        └── Token
```

Next issue:

> Why is HTTP stateless, but websites can keep you logged in?
