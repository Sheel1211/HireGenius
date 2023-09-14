// import SvgColor from "../../assets/SvgColor/svgColor";

// const icon = (name) => (
//   <SvgColor
//     src={`/assets/icons/navbar/${name}.svg`}
//     sx={{ width: 1, height: 1 }}
//   />
// );

const navConfig = [
  {
    title: "dashboard",
    path: "/clientdashboard",
    // icon: icon("ic_analytics"),
  },
  {
    title: "Candidates",
    path: "/clientdashboard/candidate",
    // icon: icon("ic_user"),
  },
  {
    title: "Schedule Interview",
    path: "/clientdashboard/schedule-interview",
    // icon: icon("ic_cart"),
  },
  // {
  //   title: "blog",
  //   path: "/clientdashboard/candidate",
  // icon: icon("ic_blog"),
  // },
  // {
  //   title: "login",
  //   path: "/clientdashboard/candidate",
  //   // // icon: icon("ic_lock"),
  // },
  // {
  //   title: "Not found",
  //   path: "/clientdashboard/candidate",
  //   // // icon: icon("ic_disabled"),
  // },
];

export default navConfig;
