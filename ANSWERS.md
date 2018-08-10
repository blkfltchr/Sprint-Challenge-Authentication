<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

`middleware`, as it relates to the authentication we've been doing, is code written to check for sessions that then gets placed in front of endpoints we want to restrict

`sessions` allow a server to store information about a client - they provide a way to persist data across requests

`bcrypt`  - see below

`jwt` defines a compact and self-contained way for securely transmitting information between parties as a JSON object

2.  What does bcrypt do in order to prevent attacks?

`bcrypt` salts and hashes passswords to prevent rainbow table attacks

3.  What are the three parts of the JSON Web Token?

`payload`, `secret`, `options`