const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        'ecim__app_373828'
    );
}

const userResolvers = {
    Query: {
        getUser: async() => {
            
            

            try {
                const user =await User.find({});
                return user;
            } catch (error) {
                return {success:false, message:"error occured"}
            }
        },
        getSingleUser: async(_, args) => {
            if(!args.email){
                return {success:false, message:"Please pass the email"}
            }
            try {
                const user = await User.findOne({email:args.email});
                return user
            } catch (error) {
                
            }
        }

    },

    Mutation:{
        signup: async(_ , args) => {
            console.log("iuyuyuyiuyiy")
            try {
                // console.log("fhuerfhiuegheiufiufj")
                // console.log(args.name);
                // console.log(args.email)
                const existingUser = await User.findOne({email:args.user.email});
                if(existingUser){
                    console.log("existing")
                    return {success: false , message:"user exists"}
                }

                const user = await User.create({
                    name:args.user.name , 
                    email:args.user.email , 
                    password:args.user.password,
                })
                const token = generateAuthToken(user);
                return { token, user: user };
                // return {success:true, token:token , user:newUser , message:"Sign up successful"}
            } catch (error) {
                console.error("Error during signup:", error.message);
      return { success: false, message: "An error occurred during signup" };
            }
        }
    }
}


module.exports = userResolvers;

