// Company identity, taken from the SECP certificate of incorporation and the FBR
// registration certificate (copies in /public/docs). Update here if anything changes.
export const company={
  legalName:'RX Direct (SMC-Private) Limited',
  secpCuin:'0347436',
  incorporated:'2026-07-24',
  incorporatedText:'24 July 2026',
  incorporatedAt:'Islamabad',
  act:'Companies Act, 2017',
  secpVerifyUrl:'https://leap.secp.gov.pk/#/verify-company-info/0347436',
  secpCertificate:'/docs/secp-certificate-of-incorporation.pdf',
  fbrRegNo:'J499217',
  fbrTaxOffice:'RTO Rawalpindi',
  fbrCertificate:'/docs/fbr-registration-certificate.pdf',
  address:{street:'2nd Floor, Al-Bilal Plaza, Chandni Chowk',locality:'Rawalpindi',region:'Punjab',country:'PK'},
  addressText:'2nd Floor, Al-Bilal Plaza, Chandni Chowk, Rawalpindi',
};

// Fee policy shown wherever trust matters. Keep in line with the FAQs.
export const feePolicy=[
  {title:'Free for job seekers',text:'Candidates never pay estaff.pk to apply, be shortlisted or be placed.'},
  {title:'Employer fee agreed in writing',text:'The fee and payment timing are written down before the search starts. No hidden charges.'},
  {title:'6-month free replacement',text:'If a placed staff member leaves or does not work out within six months, we find a replacement at no extra charge.'},
  {title:'Pay only the company',text:'Fees are paid to the company account named in your written agreement. We never ask for card details or passwords.'},
];
