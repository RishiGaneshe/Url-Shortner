const bcrypt= require('bcrypt')



exports.hashPassword= async (password)=>{
  try{
      const saltRounds= 10;
      return await bcrypt.hash(password,saltRounds)
  }catch(err){
      console.log("Problem In Hash Generating",err)
  } 
}


exports.verifyPassword= async (password,hashedpassword)=>{
  try{
      return await bcrypt.compare(password,hashedpassword)
  }catch(err){
      console.log("Problem In Hash Varifying",err)
  } 
}
