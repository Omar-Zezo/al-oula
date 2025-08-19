import {configureStore} from "@reduxjs/toolkit"
import langDetect from "./slices/translation/translation"
import contactInfo from "./slices/Home/contactus"
import heroSlider from "./slices/Home/heroSlider"
import virtualTour from "./slices/Home/virtualTour"
import statistics from "./slices/Home/statistics"
import briefHome from "./slices/Home/briefHome"
import programsSections from "./slices/Home/programsSections"
import programDetails from "./slices/Home/programDetails"
import partnersHome from "./slices/Home/partnersHome"
import aboutSliderHome from "./slices/Home/aboutSliderHome"
import ourPrizes from "./slices/Home/ourPrizes"
import ourBlogs from "./slices/Home/ourBlogs"
import ourNews from "./slices/Home/ourNews"
import donationSliderHome from "./slices/Home/donationSliderHome"
import serviceDetails from "./slices/Home/serviceDetails"
import login from "./slices/auth/login"
import logout from "./slices/auth/logout"
import updateProfile from "./slices/auth/updateProfile"
import otpCode from "./slices/auth/otpCode"
import loggedUser from "./slices/auth/loggedUser"
import donationHistory from './slices/profile/donationHistory'
import cart from './slices/cart/cart'
import addToCart from './slices/cart/addToCart'
import updateCart from './slices/cart/updateCart'
import checkout from './slices/cart/checkout'
import deleteItemFromCart from './slices/cart/deleteItem'
import invoices from './slices/profile/invoices'
import donationPayment from './slices/donation/donationPayment'
import banks from './slices/cart/banks'
import completeOrder from './slices/cart/completeOrder'
import bankDonation from './slices/cart/bankDonation'
import navbar from './slices/utils/navbar'
import footer from './slices/utils/footer'
import pageNavById from './slices/utils/pageNavById'
import newsDetails from './slices/media cnter/newsDetails'
import blogDetails from './slices/media cnter/blogDetails'
import newsSection from './slices/media cnter/newsSection'
import newsSectionDetails from './slices/media cnter/newsSectionDetails'
import blogSection from './slices/media cnter/blogSection'
import blogsSectionDetails from './slices/media cnter/blogsSectionDetails'
import photoSection from './slices/media cnter/photoSection'
import viewPhotos from './slices/media cnter/viewPhotos'
import videoSection from './slices/media cnter/videoSection'
import viewVideos from './slices/media cnter/viewVideos'
import boardOfDirectors from './slices/about us/boardOfDirectors'
import generalAssembly from './slices/about us/generalAssembly'
import ourTeam from './slices/about us/ourTeam'
import servicesSections from './slices/services/servicesSections'
import governanceMaterial from './slices/about us/governanceMaterial'
import governanceMaterialDetails from './slices/about us/governanceMaterialDetails'
import seasonalProjects from './slices/about us/seasonalProjects'
import seasonalProjectsDetails from './slices/about us/seasonalProjectsDetails'
import servicesCategoryDetails from './slices/about us/servicesCategoryDetails'
import library from './slices/about us/library'
import events from './slices/about us/events'
import eventDetails from './slices/about us/eventDetails'
import surveys from './slices/about us/surveys'
import voteForSurvey from './slices/about us/voteForSurvey'
import initiatives from './slices/about us/initiatives'
import initiativeDetails from './slices/about us/initiativeDetails'
import strategies from './slices/about us/strategies'
import faqList from './slices/about us/faqList'
import files from './slices/about us/files'
import giftOrderInService from './slices/gifts/giftOrderInService'
import giftsCategories from './slices/gifts/giftsCategories'
import giftsCards from './slices/gifts/giftsCards'
import giftPayment from './slices/gifts/giftPayment'
import partnerForm from './slices/forms/partnerForm'
import membershipForm from './slices/forms/membershipForm'
import volunteerForm from './slices/forms/volunteerForm'
import volunteeringTimes from './slices/forms/volunteeringTimes'
import beneficiariesForm from './slices/forms/beneficiaries/beneficiariesForm'
import beneficiariesRequests from './slices/forms/beneficiaries/beneficiariesRequests'
import msgTypes from './slices/about us/contactus/msgTypes'
import contactusMsg from './slices/about us/contactus/contactusMsg'
import clientOpinions from './slices/about us/clientOpinions'
import applyJob from './slices/about us/applyJob'
import jobs from './slices/about us/jobs'
import facilitiesTypes from './slices/about us/facilitiesTypes'
import facilitiesTypesFacilities from './slices/about us/facilitiesTypesFacilities'
import facilityDetails from './slices/about us/facilityDetails'
import appointment from './slices/about us/appointment'
import serviceReview from './slices/utils/serviceReview'
import settings from './slices/utils/settings'
import newsletters from './slices/utils/newsletters'
import invoiceDetails from './slices/donation/invoiceDetails'
import quickDonations from './slices/donation/quickDonations'
import QDonationPayment from './slices/donation/QDonationPayment'
import unpaidInvoice from './slices/profile/unpaidInvoice'
import facilitesWithEvents from './slices/about us/facilitesWithEvents'
import allPrograms from './slices/about us/allPrograms'
import awardDetails from './slices/about us/awardDetails'

const store = configureStore({
    reducer:{
        langDetect,
        contactInfo,
        heroSlider,
        virtualTour,
        statistics,
        briefHome,
        programsSections,
        programDetails,
        partnersHome,
        aboutSliderHome,
        ourPrizes,
        ourBlogs,
        ourNews,
        donationSliderHome,
        login,
        logout,
        updateProfile,
        otpCode,
        loggedUser,
        donationHistory,
        cart,
        addToCart,
        checkout,
        invoices,
        updateCart,
        deleteItemFromCart,
        donationPayment,
        banks,
        completeOrder,
        bankDonation,
        navbar,
        footer,
        newsDetails,
        blogDetails,
        newsSection,
        newsSectionDetails,
        blogSection,
        blogsSectionDetails,
        photoSection,
        viewPhotos,
        videoSection,
        viewVideos,
        serviceDetails,
        pageNavById,
        boardOfDirectors,
        generalAssembly,
        ourTeam,
        servicesSections,
        governanceMaterial,
        governanceMaterialDetails,
        seasonalProjects,
        seasonalProjectsDetails,
        servicesCategoryDetails,
        library,
        events,
        eventDetails,
        giftOrderInService,
        giftsCategories,
        giftsCards,
        giftPayment,
        surveys,
        voteForSurvey,
        initiatives,
        initiativeDetails,
        strategies,
        faqList,
        partnerForm,
        volunteerForm,
        volunteeringTimes,
        membershipForm,
        beneficiariesForm,
        beneficiariesRequests,
        msgTypes,
        contactusMsg,
        clientOpinions,
        jobs,
        applyJob,
        facilitiesTypes,
        facilitiesTypesFacilities,
        facilityDetails,
        appointment,
        serviceReview,
        settings,
        newsletters,
        invoiceDetails,
        quickDonations,
        QDonationPayment,
        unpaidInvoice,
        facilitesWithEvents,
        allPrograms,
        awardDetails,
        files
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
})

export default store