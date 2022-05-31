const mongoose = require("mongoose");
const route = require('express').Router();
const  { User } = require("../model/traker");

route.post('/',async (req,res)=>{
    try{
        
        // Get username input
        const { username  }  = req.body;

        // Validate user input
        if (!(username)) {
          return res.status(409).json({error: 'invalid username'});
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Try Again");
          }

        // Create user in our database
        const newUser = await User.create({
            username
          });
          delete newUser["__v"];
          res.status(200).json(newUser);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
});
route.get('/', async (req,res)=>{

    try{
        // Retrieve All users from our Database
        const allUser = await User.find();
        if(allUser){
            const usersArray = allUser.map((user) => {
                delete user["__v"];
                user["_id"].toString();
                return user;
              });
            console.log(usersArray);
            res.status(200).send(usersArray);
        }else{
            res.status(404).json({error: 'No User Found'});
        }
        
    }catch(error){
        console.error(error);
        process.exit(1);
    }
});



module.exports = route;