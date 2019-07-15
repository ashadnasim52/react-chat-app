const User = require('../../model/User')


//When the adduser request come to server
//then adding user to the database
exports.addUserHandler = (req, res) => {
    console.log('addUserHandler', req.body);

    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    User.findOne({
        email
    }).then(isMatched => {
        if (isMatched) {
            return res.json({
                message: 'Email already exists'
            })
        } else {
            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            })
            newUser.save().then(createdUser => {
                console.log('addUserHnadler', 'user created...');
                return res.json({
                    message: 'User Created....'
                })

            }).catch(err => {
                console.error(err);
                return res.json({
                    message: 'Something went wrong....'
                })
            })
        }

    })
}


//Getting all user from database 
//TODO do something different
exports.getUserHandler = (req, res) => {
    User.find().then(all => {
        return res.json(all)
    }).catch(err => {
        console.error(err);

    })

}


//When User wants to sigin
exports.sigined = (req, res) => {
    console.log('signed', req.body);
    User.findOne({
            email: req.body.email
        })
        .then(user => {

            if (user) {
                return res.json({
                    user
                })
            } else {
                return res.json({
                    message: 'no user found'
                })
            }
        })
        .catch(err => {
            console.log('signed', err);
            res.json({
                message: 'something went wrong'
            })

        })

}