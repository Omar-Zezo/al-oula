import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import OtpCode from "./pages/OtpCode"
import ProfileLayout from './pages/profile/ProfileLayout'
import PersonalInfo from "./pages/profile/PersonalInfo";
import DonationRecord from "./pages/profile/DonationRecord";
import MyBills from "./pages/profile/MyBills";
import Cart from "./pages/profile/Cart";
import BankTransfer from "./pages/BankTransfer"
import StatusFaild from "./pages/StatusFaild"
import PaymentStatus from "./pages/PaymentStatus"
import NewsDetails from "./pages/NewsDetails"
import BlogDetails from "./pages/BlogDetails"
import ServiceDetails from "./pages/ServiceDetails"
import PageByKey from "./pages/PageByKey"
import GovernanceMaterialDetails from "./pages/Aboutus/GovernanceMaterialDetails"
import SeasonalProjectsDetails from "./pages/Aboutus/SeasonalProjectsDetails"
import ServicesOfSection from "./pages/Aboutus/ServicesOfSection"
import EventDetails from "./pages/Aboutus/EventDetails"
import InitiativeDetails from "./pages/Aboutus/InitiativeDetails"
import ProgramDetails from "./pages/ProgramDetails"
import Reviews from "./pages/Reviews"
import UseNotifications from "./hooks/UseNotifications"
import Initiatives from "./pages/Aboutus/Initiatives"
import Page404 from "./pages/Page404"
import DonationInvoice from "./pages/DonationInvoice"
import FacilityDetails from "./pages/FacilityDetails"
import AllPrograms from "./pages/Aboutus/AllPrograms"
import AwardDetails from "./pages/AwardDetails"


const router = createBrowserRouter([
  {
    Component: Layout,
    path: "/",
    children : [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "about-the-association/governance-material/details/:id",
        element: <GovernanceMaterialDetails/>
      },
      {
        path: "projects/details/:id",
        element: <SeasonalProjectsDetails/>
      },
      {
        path: "events/details/:id",
        element: <EventDetails/>
      },
      {
        path: "services-sections/show/:id",
        element: <ServicesOfSection/>
      },
      {
        path: "/otp-code",
        element: <OtpCode/>
      },
      {
        path: 'bank_transfer/:donationCode',
        element: <BankTransfer/>
      },
      {
        path: 'news-sections/news/:id',
        element: <NewsDetails/>
      },
      {
        path: 'blogs-sections/blog/:id',
        element: <BlogDetails/>
      },
      {
        path: 'services-sections/service/:id',
        element: <ServiceDetails/>
      },
      {
        path: 'facility-details/:id',
        element: <FacilityDetails/>
      },
      {
        path: 'pages/join_as_a_partner/:id',
        element: <InitiativeDetails/>
      },
      {
        path: 'pages/:key',
        element: <PageByKey/>
      },
      {
        path: 'program-details/:id',
        element: <ProgramDetails/>
      },
      {
        path: 'initiatives',
        element: <Initiatives/>
      },
      {
        path: 'programs',
        element: <AllPrograms/>
      },
      {
        path: 'award-details/:slug',
        element: <AwardDetails/>
      },
    ]
  },
  {
    Component: ProfileLayout,
    path: "profile",
    children: [
      {
        index: true,
        element: <PersonalInfo/>
      },
      {
        path: 'donation-record',
        element: <DonationRecord/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'my-bills',
        element: <MyBills/>
      },
    ]
  },
  {
    path: "/payment-status",
    element: <PaymentStatus/>
  },
  {
    path: "/status-faild",
    element: <StatusFaild/>
  },
  {
    path: "/reviews/:id",
    element: <Reviews/>
  },
  {
    path: "/donation-invoice/:donationCode/show",
    element: <DonationInvoice/>
  },
  {
    path: "*",
    element: <Page404/>
  }
])


function App() {
  UseNotifications()
  return (
    <RouterProvider router={router}/>
  )
}

export default App
