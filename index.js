const express = require("express"); // returns us the createApplication function using module.exports that returns us the variable to create http server
const app = express();
const port = 3000;

const serverUserData = [];

// to start the server
app.listen(port, function () {
  console.log("the server is started")
})

app.get("/", function(req, res) {
  res.send("Welcome to the UserData application")
})

// Middlewares are functions that executes before the request goes to the route-handler. these functions too have access to request and response , res used for authencating the request, parsing the userData present in req like request-body, request-headers, query-params in the request object

// calling the 1st middleware so that we can get the access to the data  from the request
app.use(express.json()); // this returns us a function that will have access to the req, res and will call the next middle-ware using next()

// base route, the application will call this callback based on the route that we will mention from the client side
app.get("/allUserData", function (req, res) {
  // we will get client data from the req like request-headers, request-body, query-params

  // do some calculations
  if (serverUserData.length === 0) {
    res.send("There is no user data"); // here the express will set the contentType in the response-headers as text something
    return
  }

  // the express will send the contentType as type/JSON
  res.json({
    userData: serverUserData
  })


  // the application will send response to the client using the res with the status code, response-headers and response-body
})

app.post("/addData", function (req, res) {
  // data valid format will be an object of firstName, lastName and does not be empty and phone number
  const userData = req.body.userData;

  try {
    if (!userData) {
      const err = {
        err: "Send Valid user Data!!"
      }
      throw err
    }

    if (!userData.firstName) {
      const err = {
        err: "Send Valid firstName not empty!"
      }
      throw err;
    }

    if (!userData.lastName) {
      const err = {
        err: "Send Valid lastName not empty!"
      }
      throw err;
    }

    if (!userData.phoneNumber && userData.phoneNumber.length !== 10) {
      const err = {
        err: "Send Valid phoneNumber!"
      }
      throw err;
    }

    serverUserData.push(userData)

    res.json({
      result: "user successfull added"
    })

  } catch (err) {
    res.json(err);
  }
})


app.put("/update", function (req, res) {
  // do all the same checking
  const userData = req.body.userData;

  try {
    if (!userData) {
      const err = {
        err: "Send Valid user Data!! No user is updated"
      }
      throw err
    }

    if (userData.firstName) {
      const err = {
        err: "Send Valid firstName not empty!"
      }
      throw err;
    }

    if (userData.lastName) {
      const err = {
        err: "Send Valid lastName not empty!"
      }
      throw err;
    }

    if (userData.phoneNumber && userData.phoneNumber.length !== 10) {
      // search the user and update, since arrays are complex primivite => playing with the address
      const latestPhone = userData.phoneNumber;

      const user = serverUserData.find(user => user.phoneNumber === latestPhone);

      if (!user) {
        const err = {
          err: "No User is found Valid phoneNumber!"
        }

        throw err;
      }

      user.phoneNumber = latestPhone;
    }

    res.json({
      result: "user successfull updated"
    })

  } catch (err) {
    res.json(err);
  }
})


app.delete("/delete", function (req, res) {

})

// created different routes based on which the user / client will send the request. If the user uses the method post with route /addData then only the function will be called