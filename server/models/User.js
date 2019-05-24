const Sequelize = require("sequelize");
const Circuit = require('./Circuit')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

const Model = Sequelize.Model;
const DataTypes = Sequelize.DataTypes;//data type for table in this model

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class User extends Model {
    authenticate(rawPassword){
        return bcrypt.compareSync(rawPassword, this.password_digest)//returns a boolean based on comparison
    }

    set password(value){
        let salt = bcrypt.genSaltSync(10);//sets a 10 seconds salt time. Feel free to adjust this time to your requirement
        let hash = bcrypt.hashSync(value, salt)//generates the hash with bcrypt, which is an encrypted value
        this.password_digest = hash;//assigning password_digest of the instance of user class to that hash
    }

    get token(){
        return jwt.sign({ id: this.id},  "17eb365ddb4c387e1a9507e77bee1678");//user gets the token for the session so that the browser will maintain the session
    }

    toJSON(){
        let jsonObject = {...this.dataValues, token: this.token};//this jsonObject goes back and forth between the browser and the server to maintain the session
        delete jsonObject.password_digest;//password_digest will be deleted from the body of the request
        return jsonObject; //this will be maintained instead of the password_digest so as to maintain security
    }


}

User.init(
    {
        username: {
            type: Sequelize.STRING,
            allowNull: false //user with a null username i.e., a user without a username is not allowed
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              isEmail: true
            },
            unique: {
              args: true,
              msg: "Email address already in use!"
            }
        },
        password_digest: {
            type: Sequelize.STRING
        }
        // circuit: {
        //     type: Sequelize.STRING
        // }the circuit beong to this user will have a 
        
        //If you want to add some more ciolumns add here

    },
    {
        sequelize,
        modelName: "user"
    }
);


module.exports = User;

sequelize.sync();
//this will create user table

User.hasMany(Circuit, {as: 'Circuits'})
//because of has many -> this line adds userid automatically
//My project's relationship structure :
//---- A User has many circuits 
//-------A Circuit Has many -> gates & wires; A circuit belongsTo one user
//-----------A User has many gates and wires through the circuit
//-----------(circuit is the joint class between user and gate) & circuit is the joint class between a  User and a wire