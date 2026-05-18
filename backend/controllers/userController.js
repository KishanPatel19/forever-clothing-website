import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET
    )
}

//Route for Login user
const loginUser = async(req,res)=>{
    try {
          const {email,password} = req.body

    const user = await userModel.findOne({email});

    

    //check user ids available or not
    if(!user){
        res.json({success:false,message:"User does not exist"});
    }

    //password checking
    const isMatch = await bcrypt.compare(password,user.password)

    if(isMatch){
        const token = createToken(user._id);
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"Invalid credential"});
    }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
  
}

//Route for Register userModel
const registerUser = async (req,res)=>{
   try {
    const {name ,email,password} = req.body;

    //Check user already exist or not 
    const exists = await userModel.findOne({email});

    if(exists){
        res.json({success:false , message:"User already exist !"})
    }

    //validating email
    if(!validator.isEmail(email)){
        res.json({success:false,message:"Enter valid email !"})
        return
    }

    //Check password length
    if(password.length < 8){
        res.json({success:false , message:"Password length must be grater than seven "})
    }

    //hashing password
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create new user
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    //saving new user 
    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
        success:true,
        token
    })


   } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
   }
}

//Route fo Admin login
const adminLogin = async(req,res)=>{

    try {
     const {email,password} =  req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"Unauthorized access !"})
    } 
    } catch (error) {
     console.log(error)
    res.json({success:false, message:error.message})
    }
  

}

export{loginUser,registerUser,adminLogin}
