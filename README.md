To start API for development (hot-recompiling and restarting server): `npm install && npm start`.  
To start for production: `npm install --production && npm run build`.  

For local development, you will also need to send the e-vars on your machine, or in a file called evars.json in the root of the project directory.(I have checked in this git for dev purposes)

To Do:
- Retrieve emails "QUEUED" in db and send emails using a scheduler.
- Add GET/DELETE endpoints
- Write tests
- Add logging (already implemented needs to cover the entire code base for better debugging)
