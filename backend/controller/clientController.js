export const clientRegistration = async (req, res) => {
  const { name, email, password, url, description, contactno, sector } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !url ||
    !description ||
    !contactno ||
    !sector
  ) {
    return res.status(400).send({ message: "All fields are required!" });
  } else {
    console.log(
      "req.body => ",
      "name : ",
      name,
      "email : ",
      email,
      "password : ",
      password,
      "Url : ",
      url,
      "desc: ",
      description,
      "contact : ",
      contactno,
      "sector : ",
      sector
    );

    // const validcertificate = await uploadFile(
    //   req.files.validcertificate,
    //   `${name}+_Certi`
    // );
    // const logo = await uploadFile(req.files.logo, `${name}+_Logo`);

    // console.log(
    //   "validcertificate : ",
    //   validcertificate.Location,
    //   "logo : ",
    //   logo.Location
    // );
    // console.log(
    //   "Data : ",
    //   clientType,
    //   company,
    //   domain,
    //   website,
    //   imgUrl.Location
    // );

    // return res.status(200).send({ message: "Success" });
  }
};
