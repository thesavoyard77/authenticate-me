# book.me

Clone the project from: https://github.com/thesavoyard77/authenticate-me

Create a `.env` file in the root directory of the backend directory.
Use the `env.example`

CD into back and install dependancies by running:

  `npm install`

  To initiate the database:

  `npx dotenv sequelize db:create`

Now migrate the database:

 `npx dotenv sequelize db:migrate`

 Now seed the database with the seed files:

 `npx dotenv sequelize db:seed:all`

 You may now run the backend server with:

 `npm start`

 You can query the backend server with Postman using `http://localhost:5000`

 Now CD into the frontend directory and install dependancies by running:

 `npm install`

 Initiate the frontend server by running:

 `npm start`

 Your default browser should open to the home page. If not, open a browser navigate to:

 `http://localhost:3000`


You now have a local full stack website to play around with!
