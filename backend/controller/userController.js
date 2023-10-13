export const getUserData = async (req, res) => {
    try {       

      res.status(200).json({
        success: true,
        type:req.type,
        user:req.user,
      });
    }
   catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
