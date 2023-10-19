import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import MuiLink from "@mui/material/Link";

const courseMenu = [
  {
    label: "UI/UX Design",
    path: "/",
  },
  {
    label: "Mobile Development",
    path: "#",
  },
  {
    label: "Machine Learning",
    path: "#",
  },
  {
    label: "Web Development",
    path: "#",
  },
];

const pageMenu = [
  {
    label: "Home",
    path: "#", // '/',
  },
  {
    label: "Compiler",
    path: "/compiler", // '/popular-course',
  },
  {
    label: "OA",
    path: "/oa", // '/testimonial',
  },
  {
    label: "Group Discussion",
    path: "/gd", // '/mentors',
  },
];

const companyMenu = [
  { label: "Contact Us", path: "#" },
  { label: "Privacy & Policy", path: "#" },
  { label: "Term & Condition", path: "#" },
  { label: "FAQ", path: "#" },
];

const NavigationItem = ({ label, path }) => {
  return (
    <Link to={path}>
      <MuiLink
        to={path}
        underline="hover"
        sx={{
          display: "block",
          mb: 1,
          color: "primary.contrastText",
        }}
      >
        {label}
      </MuiLink>
    </Link>
  );
};

const FooterSectionTitle = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Typography
        component="p"
        variant="h5"
        sx={{ color: "primary.contrastText", fontWeight: "700" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

const FooterNavigation = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        {/* <FooterSectionTitle title="Course" /> */}
        {/* {courseMenu.map(({ label, path }, index) => (
          <></>
        ))} */}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Menu" />
        {pageMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="About" />
        {companyMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
    </Grid>
  );
};

export const socialLinks = [
  {
    name: "Instagram",
    link: "#",
    icon: "/images/icons/instagram.svg",
  },
  {
    name: "YouTube",
    link: "#",
    icon: "/images/icons/youtube.svg",
  },
  {
    name: "Twitter",
    link: "#",
    icon: "/images/icons/twitter.svg",
  },
  {
    name: "Dribbble",
    link: "https://dribbble.com/shots/18114471-Coursespace-Online-Course-Landing-Page",
    icon: "/images/icons/dribbble.svg",
  },
  {
    name: "Github",
    link: "https://github.com/hiriski/coursespace-landing-page",
    icon: "/images/icons/github.svg",
  },
];

const SocialLinkItem = ({ item }) => (
  <Box
    component="li"
    sx={{
      display: "inline-block",
      color: "primary.contrastText",
      mr: 0.5,
    }}
  >
    <Link
      target="_blank"
      sx={{
        lineHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        color: "inherit",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
        "& img": {
          fill: "currentColor",
          width: 22,
          height: "auto",
        },
      }}
      to={item.link}
    >
      {/* eslint-disable-next-line */}
      <img src={item.icon} alt={item.name + "icon"} />
    </Link>
  </Box>
);

// default
const FooterSocialLinks = () => {
  return (
    <Box sx={{ ml: -1 }}>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          lineHeight: 0,
          borderRadius: 3,
          listStyle: "none",
        }}
      >
        {socialLinks.map((item) => {
          return <SocialLinkItem key={item.name} item={item} />;
        })}
      </Box>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        py: { xs: 6, md: 10 },
        color: "primary.contrastText",
      }}
    >
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Box sx={{ width: { xs: "100%", md: 360 }, mb: { xs: 3, md: 0 } }}>
              <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
                HireGenius
              </Typography>
              <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
                Discover Your Potential with HireGenius - Where Talent Meets
                Opportunity.
              </Typography>
              <FooterSocialLinks />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <FooterNavigation />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
