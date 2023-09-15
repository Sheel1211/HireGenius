import React, { useState } from 'react'

const Registration = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        url:"",
        description:"",
        contactno:"",
        sector:"" 
    })
const [validCertificateFile, setValidCertificateFile] = useState(null);
const [logoFile, setLogoFile] = useState(null);

    const handleInputChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      if (name === 'validcertificate') {
        setValidCertificateFile(files[0]);
      } else if (name === 'logo') {
        setLogoFile(files[0]);
      }
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("formData", formData);
      console.log("certi",validCertificateFile)
      console.log("logo",logoFile)
      // Now you can send formDataToSubmit to your backend
    };
    
    
  return (
    <div>
      Client Registration page.
      <input type='text' name='name' onChange={handleInputChange} placeholder='Enter a name'/>
      <input type='text' name='email' onChange={handleInputChange} placeholder='email'/>
      <input type='text' name='password' onChange={handleInputChange} placeholder='password'/>
      <input type='text' name='url' onChange={handleInputChange} placeholder='url'/>
      <input type='text' name='description' onChange={handleInputChange} placeholder='description'/>
      <input type='number' name='contactno' onChange={handleInputChange} placeholder='9999999999'/>
      <input type='text' name='sector' onChange={handleInputChange} placeholder='sector'/>

    Valid Certi:<br></br>
      <input type="file" name="validcertificate" onChange={handleFileChange} />
    Logo:<br></br>
    <input type="file" name="logo" onChange={handleFileChange} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Registration
