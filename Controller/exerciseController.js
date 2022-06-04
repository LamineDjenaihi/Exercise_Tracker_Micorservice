const mongoose = require("mongoose");
const route = require('express').Router();
const  { Exercise, User } = require("../model/traker");
const moment  = require('moment');
route.post('/:_id/exercises',async (req,res)=>{
    try{
        let userId = req.params._id;
        // Get description, duration, date inputs
        let { description, duration,date }  = req.body;
        date = date ||  Date.now();
        // Validate user input
        if (!(userId) && !(description) && !(duration)) {
          return res.status(409).json({error: 'invalid username'});
        }
        //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateFormat =  moment(date).format('ddd MMMM DD YYYY'); 
       /* if(date){
            try{
                
                //dateFormat = dateFormat.toLocaleDateString('en-US', options);
            }catch(error){
                console.error(error);
            }

        }else{
            dateFormat =  new Date().toLocaleDateString('en-US', options);
        }*/ 
        userId = mongoose.Types.ObjectId(userId);
        const userExist = await User.findById(userId);
        // Create user in our database
       const newExercise =  await Exercise.create({
            username: userExist.username,
            description,
            duration,
            date: dateFormat,
            userId
          });
          
                                    
          res.status(200).json(newExercise);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
});


module.exports = route;