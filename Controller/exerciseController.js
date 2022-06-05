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
          return res.status(409).json({error: 'invalid data'});
        }
        //Validate the date 
        let dateFormat =  moment(date, 'YYYY-MM-DD').isValid() ? 
                        moment(date, 'YYYY-MM-DD') :
                        res.json({error: 'invalid Format Date'});
         
        //Cast the userID to objectId
        userId = mongoose.Types.ObjectId(userId);
        //Search about the user who has this userID
        const userExist = await User.findById(userId);
        // Create user in our database
       let newExercise =  await Exercise.create({
            username: userExist.username,
            description,
            duration,
            date: dateFormat,
            userId
          });
                       
          res.status(200).json({
            username,
            description,
            duration,
            date: moment(newExercise.date).format('ddd MMMM DD YYYY'),
            userId
          });
    }catch(error){
        console.error(error);
        process.exit(1);
    }
});


route.get('/:_id/logs', (req, res)=>{
    let userId = mongoose.Types.ObjectId(req.params._id);
    let { from, to, limit } = req.query;
    from = moment(from, 'YYYY-MM-DD').isValid() ? moment(from, 'YYYY-MM-DD') : 0;
    to = moment(to, 'YYYY-MM-DD').isValid() ? moment(to, 'YYYY-MM-DD') : moment().add(1000000000000);
    User.findById(userId).then(user => {
        if (!user) throw new Error('Unknown user with _id');
            Exercise.find( userId )
            .where('date').gte(from).lte(to)
            .limit(+limit).exec()
            .then(log => res.status(200).send({
                _id: userId,
                count: log.length,
                username: user.username,
                log: log.map(o => ({
                    description: o.description,
                    duration: o.duration,
                    date: moment(o).format('ddd MMMM DD YYYY')
                }))
            }))
    })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })

});

module.exports = route;