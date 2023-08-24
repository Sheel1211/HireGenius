import Header from './header/Header'
import Footer from './footer/Footer'
import HomeHero from './home/hero'
import HomePopularCourse from './home/courses'
import HomeFeature from './home/features'
import HomeTestimonial from './home/testimonials'
import HomeOurMentors from './home/mentors'
import HomeNewsLetter from './home/newsletter'

const Landing = () => {
  return (
    <>
    <HomeHero />
    <HomePopularCourse />
    <HomeFeature />
    <HomeTestimonial />
    <HomeOurMentors />
    <HomeNewsLetter />
    <Footer /></>
  )
}

export default Landing