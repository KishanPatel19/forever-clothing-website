import mongoose from 'mongoose'

const connectDB = async()=>{
     

    try {
          mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })

   await mongoose.connect(process.env.MONGODB_URI)
  
        
    } catch (error) {
        console.log("Failed to connect database",error)
        process.exit(1);
    }

  
}

export default connectDB