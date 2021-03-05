##Sign-in Sign-up Microservice Project

###Tools:

+ Language
    + Javascript
    + HTML
    + CSS
+ Tools & Frameworks
    + node.js
    + Oauth 2.0
    + JWT
    + Bootstrap 4
    + Gulp.js
    + SASS
    + Mongoose & MongoDB
    + Passport.js


###Flowchart for Both Sign-in Sign-up Operations

```flow
st=>start: Sign-in & Sign-up
kayit?=>condition: Do you have any account?
createuser=>operation: Create new user
validateuser=>operation: Validate user account
cond=>condition: Successful Yes or No?
cond2=>condition: Successful Yes or No?
e=>end: Success
e2=>end: Success
in=>inputoutput: Submit user email and password 
or Authenticate via Google Account
in2=>inputoutput: Submit user email and password 
or Sign-up via Google Account
st->kayit?
kayit?(yes)->in
kayit?(no)->in2
in->validateuser->cond
in2->createuser->cond2
cond(yes)->e
cond(no)->in
cond2(yes)->e2
cond2(no)->in2
```
