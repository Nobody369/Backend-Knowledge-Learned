# Topic 01: HTTP Message

Today we learned that TCP moves bytes, but HTTP gives those bytes meaning.

Core questions:

- Why is TCP not enough for the Web?
- What are method, path, headers, and body?
- What are status code, response headers, and response body?

Lab:

```bash
curl -i http://localhost:3000/hello
curl -i http://localhost:3000/users/1
curl -i http://localhost:3000/users/999
```

Expected discovery:

- `200 OK` means the server understood and successfully answered.
- `404 Not Found` means the requested resource does not exist.
- Headers describe metadata about the message.
