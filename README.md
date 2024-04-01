## MaxHome.ai Real Estate Application
Our website is your go-to destination for exploring all kinds of properties, from charming cottages to majestic castles. We've created a simple and user-friendly platform where you can browse through property listings effortlessly.


## What You'll Find Here
🏰 Property Listings: Dive into a collection of properties with descriptions, prices, locations, and images. Whether you're dreaming of a cozy retreat or a grand estate, we've got you covered!

💡 Easy to Use: We've designed our website with simplicity in mind. No complex navigation or confusing features here—just a straightforward interface to help you find your dream property.

🌐 Accessible Anywhere: Access our website from any device, whether you're at home on your computer or out and about on your phone. We've made sure it looks great and works smoothly no matter where you are.


## Technologies Used

- **Frontend:** React.js, HTML, CSS, JavaScript, Material UI
- **Backend:** Express.js, Node.js
- **Database:** MongoDB


## Getting Started
The MERN Application is designed in such a way that client and server communicate with each other when both of their services run concurrently. Both Client(project_ui in File Directory) and Server(project_backend in file directory) are developed separately.

The Database MongoDB is hosted on the Cloud, so no local setup is required to fetch the data from the DB.

Steps to run the Application
1. Clone the Repository to your local machine.
2. To run the application, Both the services (Client and Server) needs to executed concurrently in separate terminals.
3. Steps to Run Client
    a. Navigate to the project_ui folder i.e. "cd project_ui"
    b. Run "npm install" to install all dependencies and libraries to your local. The libraries will be installed in "node_modules" folder.
    c. Run "npm start" to run the Client Service.
    d. The Client Application started running in PORT #3000. Ensure the port is free in your machine.
4. Steps to Run Server
    a. Navigate to the project_backend folder i.e. "cd project_backend".
    b. Run "npm install" to install all dependencies and libraries to your local. The libraries will be installed in "node_modules" folder.
    c. Run "npm run dev" to run the Server Service.
    d. The Server Application is running in PORT #8888. Ensure the port is free your machine.
5. Server API is running at http://localhost:SERVER_PORT (http://localhost:8888 by default)
   Web client is running at http://localhost:CLIENT_PORT (http://localhost:3000 by default)
6. Open the browser and navigate to http://localhost:3000/ to access the application.
7. You are all set to use the application.


## File structure
#### `project_ui` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `context` - This folder holds the Context (Variables) of the Application.
    - #### `img` - This folder holds images used in the Application.
    - #### `LandingPage` - The Landing Page of the Application.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
- #### `.gitignore` - Tells git which files to ignore
#### `project_backend` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `server`
    - #### `routes` - This holds all of our HTTP to URL path associations for each unique url
    - #### `server.js` - This holds the server configuration of the Application
- #### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
- #### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## About the Application
- The Application displayes the list of Properties in both Cards and Tabular Format (Views can be switched anytime).
- The Application also provides the feature to filter and sort the applications based on users choice.
- It offers user to create a set of Favourite properties, by clicking on the heart icon.
- Users can View details of property by clicking on "View Detail" button.
- User can also book the Property by clicking in "Book Now" button. This will trigger a mail to the concerned person (Demo Mail in this case, for prototyping)
- The application can be used in any device i.e. mobile, laptops, legacy computer of any screen size. Responsiveness is being taken care off.

## Future Scope of Work and Improvement
- The Application can be integrated with Google Maps to show the exact location of the Property. Giving it a better UI look and feel.
- The Application can be integrated with Payment Gateways to make online payments and book the hotels.
- The Application can be improved by adding the feature of "Reviews and Ratings".