import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UseNotifications = () => {
  const addToCartData = useSelector((state) => state.addToCart);
  const partnerFormData = useSelector((state) => state.partnerForm);
  const volunteerFormData = useSelector((state) => state.volunteerForm);
  const beneficiariesFormData = useSelector((state) => state.beneficiariesForm);
  const applyJobData = useSelector((state) => state.applyJob);
  const contactMsgData = useSelector((state) => state.contactusMsg);
  const bankDonationData = useSelector((state) => state.bankDonation);
  const appointmentData = useSelector((state) => state.appointment);
  const serviceReviewData = useSelector((state) => state.serviceReview);
  const updateProfileData = useSelector((state) => state.updateProfile);
  const { data } = useSelector((state) => state.login);
  const newslettersData = useSelector((state) => state.newsletters);



  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);

  //handel Login Notifications
  useEffect(() => {
    if (data) {
      if (data.status === 200) {
        window.location = "/otp-code";
      }
      if (data.data) {
        if (data.data) {
          if (data.data.data) {
            if (data.data.data.phone) {
              localStorage.setItem("phone", data.data.data.phone);
            }
          }
        }
      }
    }
  }, [data]);

  //handel add to cart Notifications
  useEffect(() => {
    if (addToCartData) {
      if (addToCartData.data) {
        if (addToCartData.data.data) {
          if (addToCartData.data.data.status) {
            if (addToCartData.data.data.status.message) {
              successMsg(addToCartData.data.data.status.message);
            }
          }
        }
      }
    }
  }, [addToCartData]);

  //handel add Partner Notifications
  useEffect(() => {
    if (partnerFormData) {
      if (partnerFormData.data) {
        if (partnerFormData.data.data) {
          if (partnerFormData.data.data.msg) {
            successMsg(partnerFormData.data.data.msg);
          }
        }
      }
    }
    if (partnerFormData.error) {
      if (partnerFormData.error.data) {
        if (partnerFormData.error.data) {
          if (partnerFormData.error.data.msg) {
            errorMsg(partnerFormData.error.data.msg);
          }
        }
      }
    }
  }, [partnerFormData]);

  //handel add volunteer Notifications
  useEffect(() => {
    if (volunteerFormData) {
      if (volunteerFormData.data) {
        if (volunteerFormData.data.data) {
          if (volunteerFormData.data.data.msg) {
            successMsg(volunteerFormData.data.data.msg);
          }
        }
      }

      if (volunteerFormData.error) {
        if (volunteerFormData.error.data) {
          if (volunteerFormData.error.data.message) {
            errorMsg(volunteerFormData.error.data.message);
          }
        }
      }
    }
  }, [volunteerFormData]);

  //handel add beneficiaries Notifications
  useEffect(() => {
    if (beneficiariesFormData) {
      if (beneficiariesFormData.data) {
        if (beneficiariesFormData.data.data) {
          if (beneficiariesFormData.data.data.msg) {
            successMsg(beneficiariesFormData.data.data.msg);
          }
        }
      }
      if (beneficiariesFormData.error) {
        if (beneficiariesFormData.error.data) {
          if (beneficiariesFormData.error.data.message) {
            errorMsg(beneficiariesFormData.error.data.message);
          }
        }
      }
    }
  }, [beneficiariesFormData]);

  //handel apply Job Notifications
  useEffect(() => {
    if (applyJobData) {
      if (applyJobData.data) {
        if (applyJobData.data.data) {
          if (applyJobData.data.data.msg) {
            successMsg(applyJobData.data.data.msg);
          }
        }
      }

      if (applyJobData.error) {
        if (applyJobData.error.data) {
          if (applyJobData.error.data.message) {
            errorMsg(applyJobData.error.data.message);
          }
        }
      }
    }
  }, [applyJobData]);

  //handel contactus Notifications
  useEffect(() => {
    if (contactMsgData) {
      if (contactMsgData.data) {
        if (contactMsgData.data.data) {
          if (contactMsgData.data.data.msg) {
            successMsg(contactMsgData.data.data.msg);
          }
        }
      }
    }
  }, [contactMsgData]);

  //handel bank donation Notifications

  useEffect(() => {
    if (bankDonationData) {
      if (bankDonationData.data) {
        if (bankDonationData.data.data) {
          if (bankDonationData.data.data.msg) {
            successMsg(bankDonationData.data.data.msg);
          }
        }
      }
    }
  }, [bankDonationData]);

  //handel appointment Notifications
  useEffect(() => {
    if (appointmentData) {
      if (appointmentData.data) {
        if (appointmentData.data.data) {
          if (appointmentData.data.data.msg) {
            successMsg(appointmentData.data.data.msg);
          }
        }
      }

      if (appointmentData.error) {
        if (appointmentData.error.data) {
          if (appointmentData.error.data.error) {
            console.log(appointmentData.error.data)
            errorMsg(appointmentData.error.data.msg);
          }
        }
      }
    }
  }, [appointmentData]);

  //handel service review Notifications
  useEffect(() => {
    if (serviceReviewData) {
      if (serviceReviewData.data) {
        if (serviceReviewData.data.data) {
          if (serviceReviewData.data.data.msg) {
            successMsg(serviceReviewData.data.data.msg);
            setTimeout(()=>{
              window.location = '/'
            }, 3000)
          }
        }
      }
      if(serviceReviewData.error){
        if(serviceReviewData.error.data){
          if(serviceReviewData.error.data.msg){
            errorMsg(serviceReviewData.error.data.msg)
          }
        }
      }
    }
  }, [serviceReviewData]);

  //update user profile Notifications
  useEffect(() => {
    if (updateProfileData) {
      if (updateProfileData.data) {
        if (updateProfileData.data.data) {
          successMsg(updateProfileData.data.data.msg);
        }
      }
    }
  }, [updateProfileData]);

  //update newsletters Notifications
  useEffect(() => {
    if (newslettersData) {
      if (newslettersData.data) {
        if (newslettersData.data.data) {
          if (newslettersData.data.data.msg) {
            successMsg(newslettersData.data.data.msg);
          }
        }
      }
    }
  }, [newslettersData]);
};

export default UseNotifications;
