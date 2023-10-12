import React, { Children, useState } from "react";
import {
  Box,
  FormControlLabel,
  RadioGroup,
  TextField,
  FormLabel,
  Checkbox,
  Tooltip,
  IconButton,
  Avatar,
  Dialog,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { setOptions, setAnswers } from "../../../store/slices/SingleQuestion";
import { useDispatch } from "react-redux";
import axios from "axios";

const ImageOption = ({ optionNumber }) => {
  const [singleImageOption, setSingleImageOption] = useState("");
  const [showImageOption, setShowImageOption] = useState("");
  const [showImageOptionDialog, setShowImageOptionDialog] = useState(false);
  const dispatch = useDispatch();

  console.log(showImageOption);
  console.log(singleImageOption);

  const handleOptions = (value, optionNumber, imageURL) => {
    dispatch(setOptions({ value, optionNumber, imageURL }));
  };

  const handleAnswers = (optionNumber, e) => {
    dispatch(setAnswers({ optionNumber, e }));
  };

  const handleOpenOptionDialog = () => {
    setShowImageOptionDialog(true);
  };

  const handleCloseOptionDialog = () => {
    setShowImageOptionDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <TextField
          type="file"
          id={`option ${optionNumber}`}
          sx={{ display: "none" }}
          onChange={(e) => {
            setSingleImageOption(e.target.files[0]),
            
            axios
            .post(
              "http://127.0.0.1:4000/api/create-image-link",
              {
                img:e.target.files[0]
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              console.log("response", res.data.message);
              if(res.data.success=== true){
                setShowImageOption(res.data.message);
                alert("uploaded")
              }else{
                  alert("error")
              }
            })
            .catch((error) => {
              console.log("error", error);
              alert("something went wrong")
            });


            // setShowImageOption(URL.createObjectURL(e.target.files[0]));

            handleOptions(
              e.target.files[0],
              optionNumber,
              showImageOption
              //URL.createObjectURL(e.target.files[0])
            );
          }}
        />
        
        <FormLabel htmlFor={`option ${optionNumber}`}>
          <Tooltip title="Choose the question" placement="top-start" arrow>
            <IconButton component="span" size="large">
              <PhotoCameraIcon sx={{ width: 55, height: 55 }} />
            </IconButton>
          </Tooltip>
        </FormLabel>
        {showImageOption && (
          <>
            <Avatar
              onClick={handleOpenOptionDialog}
              sx={{ marginLeft: 2, cursor: "pointer" }}
              alt="Image"
              src={showImageOption}
            />
            <Dialog
              open={showImageOptionDialog}
              onClose={handleCloseOptionDialog}
            >
              <img src={showImageOption} alt="question image" />
            </Dialog>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 2,
        }}
      >
        <RadioGroup row>
          <FormControlLabel
            value="Correct"
            control={<Checkbox size="small" color="success" />}
            label="Correct"
            onClick={(e) => handleAnswers(optionNumber, e)}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default ImageOption;
