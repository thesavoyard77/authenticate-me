# bearbnb
#### *By Christopher Felix*

___

**Table of Contents**
* Introduction
* Frontend Overview 
* Backend Overview
* Conclusion

## bearbnb Introduction

bearbnb is a full stack application that simulates a local, Big Bear, California property reservation site. Allowing owners to create properties and upload photos via  [Amazon S3 media sharing](https://aws.amazon.com/media-sharing/).

Potential guest can brows properties and create reservations. While this site is fairly simple, it was my first solo project built in one week. bearbnb is a tongue in cheek application that pokes fun at the locals obsession with naming everything with a bear in it.

## Frontend Overview

bearbnb has a simple but intuative user interface, I invite you to look at my later projects to see how my skills have developed.

### Frontend Technologies Used:

#### React: 
bearbnb uses react for fast, dynamically loaded pages that allow information to tranisition smoothly.

#### Redux:
Redux is used to query the backend and store data in the store.The store is a cache of relevant data that is stored
client side in order to update the state seemlessly.

for more information on [Redux](https://redux.js.org/).

Dependancy management on the front end is handled with 
[npmjs](https://www.npmjs.com/). Which is also used to run the frontend and backend servers in development.

## Backend Overview

The database RDBMS is in [SQL](http://www.sqlcourse.com/intro.html)

Queries and routes are handled with [Sequelize ORM](https://sequelize.org/), which makes SQL queries easy to write.

The backend app is handled by [ExpressJS](https://expressjs.com/) which is a web framework for [NodeJS](https://nodejs.org/en/).

## Conclusion

bearbnb was my sharpest learning curve. To move from theoretical programming to practice full stack web development. The application taught me invaluable lessons on how data moves through and is shaped by the app. Store and state management were massive challenges that can only be overcome through practice. The practice this app afforded me transformed me into a full stack developer.