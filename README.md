## Backend task for notes app

## I'm using free tire of Mongo db cluster which give downtime for few hours


- Deployed the code on vercel [URL for backend](https://backend-task-alpha.vercel.app)
- You can test the routes using postman/thunderclient
- redis and test have been commented as deploying on vercel was causing issues.
- I've used express as backend ( quick setup and deployment on vercel) with mongo db as data base ( no sql db as schema was not defined and easy to setup ), for security i've use jwt token.
- Routes
     - auth routes
          1.  signup - POST api (body requuires name,email and password)
          2.  login - POST api (body requires email and password)
     - notes routes
          1. GET /api/notes: get a list of all notes for the authenticated user.
          2. GET /api/notes/:id: get a note by ID for the authenticated user.
          3. POST /api/notes: create a new note for the authenticated user.
          4. PUT /api/notes/:id: update an existing note by ID for the authenticated user.
          5. DELETE /api/notes/:id: delete a note by ID for the authenticated user.
          6. POST /api/notes/:id/share: share a note with another user for the authenticated user.
          7. GET /api/search?q=:query: search for notes based on keywords for the authenticated user.
