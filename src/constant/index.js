const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "none", // remove borders
    backgroundColor: "transparent", // remove background
    boxShadow: "none", // remove shadow o focus
  }),
  menu: (base) => ({
    ...base,
    border: "1px solid #CCC",
    backgroundColor: "#F7F7F7",
    boxShadow: "none",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: "transparent",
    color: "black",
    "&:hover": {
      backgroundColor: "#814494",
      color: "#FFF"
    },
  }),
};

const memberShipContent = [
  {
    type: "Permanent Member - Annual Subscription 10,000 SAR",
    title: "supporting member",
    desc: "Permanent Membership Details - An annual subscription fee of 10,000 SAR. This membership is for individuals who either helped establish the association or joined after its founding, based on the approval of the Board of Directors for their membership application. This membership is open to women as well. Members have the right to attend General Assembly meetings, vote on its decisions, and nominate themselves for the Board of Directors after six months of joining the association. Additionally, members benefit from receiving a free seat at VIP tables during all of the association's annual festivals. They are also entitled to use the Ali Al Sha'er (may he rest in peace) Hall for Culture and Arts, which is affiliated with the association, once a year. The annual subscription fee for this membership is 10,000 SAR.",
  },
  {
    type: "Active Member - Annual Subscription 1,000 SAR",
    title: "active member",
    desc: "Active Membership Details - An annual subscription fee of 1,000 SAR. This membership is for individuals who either helped establish the association or joined after its founding, based on the approval of the Board of Directors for their membership application. This membership is open to women as well. Members have the right to attend General Assembly meetings, vote on its decisions, and nominate themselves for the Board of Directors after six months of joining the association. The annual subscription fee for this membership is 1,000 SAR.",
  },
  {
    type: "Affiliate Member - Annual Subscription 500 SAR",
    title: "associate Member",
    desc: "Affiliate Membership Details - An annual subscription fee of 500 SAR. This membership is for individuals who apply to join the association and are accepted by the Board of Directors after meeting the conditions specified in Article (4), except for the age requirement. Affiliate members do not have the right to attend General Assembly meetings or run for the Board of Directors. The annual subscription fee for this membership is 500 SAR.",
  },
  {
    type: "Student Member - Annual Subscription 200 SAR",
    title: "oula Student Membership",
    desc: "Student Membership Details - An annual subscription fee of 200 SAR. This membership is for individuals who apply to join the association and are accepted by the Board of Directors, with the age requirement being 20 years or younger. Student members do not have the right to attend General Assembly meetings or run for the Board of Directors. The annual subscription fee for this membership is 200 SAR.",
  },
];

export { customStyles, memberShipContent };
