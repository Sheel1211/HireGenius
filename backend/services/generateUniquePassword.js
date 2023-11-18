import generator from "generate-password";

export const generateUniquePassword = ()=>{
  
  const password = generator.generate({length:10,numbers:true})
  
  return password;

}