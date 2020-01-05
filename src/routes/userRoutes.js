// Import file system
const fs = require('fs')

// Imports folder manager struture
const { join } = require('path')

// Create directory for file insertion
const filePath = join(__dirname, 'users.json')

// Function takes user and if file exists is read and if not returns empty
const getUsers = () => {
   const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : []

   // Return converted file to JSON
   try {
      return JSON.parse(data)
   } catch (error) {
      return []
   }
}

// Receive user data as file and convert javascript to JSON
// Add datas, if empty returns null, and is tabbed
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {

   // Pass route url as parameter receiving or not id and sending response JSON file
   app.route('/users/:id?').get((req, res) => {
         const users = getUsers()

         // Send user in response
         res.send({ users })

         // 'POST' sends user information for url to 'getUsers()' function
      }).post((req, res) => {
         const users = getUsers()

         // const { email, name } = req.body

         // Insert data sent in the body of the request
         users.push(req.body)

         // Save users to the created directory
         saveUser(users)

         // Report response status and send message
         res.status(201).send('OK, User Create')

         // 'PUT' update user information
      }).put((req, res) => {
         const users = getUsers()

         // Saves user by checking all user data if user id is the same as the parameter sent
         saveUser(users.map(user => {
            if (user.id === req.params.id) {

               // Return user data and request sent
               return {
                  ...user,
                  ...req.body
               }
            }

            // Return updated user
            return user
         }))

         res.status(200).send('Ok, Updated')

         // 'DELETE' erase user information
      }).delete((req, res) => {
         const users = getUsers()

         // Return an object of all the values in the id that are a specific
         saveUser(users.filter(user => user.id === req.params.id))

         res.status(200).send('Ok, deleted')
      })
}

// Export function as module
module.exports = userRoute
