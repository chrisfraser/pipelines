/* *********************************************************************
* User Object
*
* Used to represent an actual user in pipelines.
********************************************************************* */

var user = {
  id: 1,
  userName: 'richard',
  name: {},
  details: {}
};

// Name is abstracted in hopes we can use this elsewhere
user.name = {
  first: 'Richard',
  middle: '',
  last: 'Niemand'
};

// Contact details are abstracted for use elsewhere
user.details = {
  emailPrimary: 'niemand.richard@gmail.com',
  emailWork: 'niemand.richard@gmail.com',
  emailHome: 'niemand.richard@gmail.com',
  numberPrimary: '0820000000',
  numberHome: '0820000000',
  numberWork: '0820000000'
};


// Combined
var userCombined = {
  id: 1,
  userName: 'richard',
  name: {
    first: 'Richard',
    middle: '',
    last: 'Niemand'
  },
  details: {
    emailPrimary: 'niemand.richard@gmail.com',
    emailWork: 'niemand.richard@gmail.com',
    emailHome: 'niemand.richard@gmail.com',
    numberPrimary: '0820000000',
    numberHome: '0820000000',
    numberWork: '0820000000'
  }
};