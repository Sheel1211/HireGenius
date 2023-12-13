import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled } from '@mui/material/styles'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'
import MentorCardItem from './mentorCard'

const data = [
    {
      id: 1,
      photo: '/images/mentors/christian-buehner-DItYlc26zVI-unsplash.jpg',
      name: 'Jhon Dwirian',
      category: 'UI/UX Design',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Grab',
        logo: '/images/companies/grab.png',
      },
    },
    {
      id: 2,
      photo: '/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg',
      name: 'Leon S Kennedy',
      category: 'Machine Learning',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Google',
        logo: '/images/companies/google.png',
      },
    },
    {
      id: 3,
      photo: '/images/mentors/noah-buscher-8A7fD6Y5VF8-unsplash.jpg',
      name: 'Nguyễn Thuy',
      category: 'Android Development',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Airbnb',
        logo: '/images/companies/airbnb.png',
      },
    },
    {
      id: 4,
      photo: '/images/mentors/philip-martin-5aGUyCW_PJw-unsplash.jpg',
      name: 'Rizki Known',
      category: 'Fullstack Development',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Microsoft',
        logo: '/images/companies/microsoft.png',
      },
    },
  ]
  

const SliderArrow = (props) => {
  const { onClick, type, className } = props
  return (
    <IconButton
      sx={{
        backgroundColor: 'background.paper',
        color: 'primary.main',
        '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' },
        bottom: '-28px !important',
        left: 'unset !important',
        right: type === 'prev' ? '60px !important' : '0 !important',
        zIndex: 10,
        boxShadow: 1,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? <IconArrowForward sx={{ fontSize: 22 }} /> : <IconArrowBack sx={{ fontSize: 22 }} />}
    </IconButton>
  )
}

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -20,
    paddingLeft: theme.spacing(1),
    textAlign: 'left',
    '& li': {
      marginRight: theme.spacing(2),
      '&.slick-active>div': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const HomeOurMentors = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))

  const sliderConfig = {
    infinite: true,
    // autoplay: true,
    speed: 300,
    slidesToShow: matchMobileView ? 1 : 3,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box sx={{ height: 8, width: 30, backgroundColor: 'divider', display: 'inline-block', borderRadius: 4 }} />
    ),
  }

  return (
    <Box
      id="mentors"
      sx={{
        pt: {
          xs: 6,
          md: 8,
        },
        pb: {
          xs: 8,
          md: 12,
        },
        backgroundColor: '#ecf3f3',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ fontSize: 40 }}>
          Our Expert Mentors
        </Typography>

        <Slider {...sliderConfig}>
          {/* {data.map((item) => (
            <MentorCardItem key={String(item.id)} item={item} />
          ))} */}
        </Slider>
      </Container>
    </Box>
  )
}

export default HomeOurMentors
