import { useEffect, useState } from "react";
import AppView from "../sections/interviews/view";
import Loader from "../utils/loader";
import { useNavigate } from "react-router-dom";

export default function AppPage() {
  return <AppView />;
}
