import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CandidateLogin from "./CandidateLogin";
import Instructions1 from "./Instructions1";
import Instructions2 from "./Instructions2";
import Test from "./Test";
import { setSelectedPage } from "../../../store/slices/AptiDashboard";
import ThankYou from "./ThankYou";

const index = () => {
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const pageIndex = localStorage.getItem(`${params.aptitudeId}`);
    if (!pageIndex) return;
    dispatch(setSelectedPage(pageIndex));
  }, []);

  if (AptiDetails.selectedPage === "0") return <CandidateLogin />;
  if (AptiDetails.selectedPage === "1") return <Instructions1 />;
  if (AptiDetails.selectedPage === "2") return <Instructions2 />;
  if (AptiDetails.selectedPage === "3") return <Test />;
  if (AptiDetails.selectedPage === "4") return <ThankYou />;
};

export default index;
