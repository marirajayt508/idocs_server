exports.fields = [
    {
     name : 'Full Name',
     type : 'text',
     status : 'upending',
     value : '',
     mandate : true,
     comments : ''
    },
    {
        name : 'Aadhar Card',
        type : 'file',
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
       },
    // {
    //     name : 'Gender',
    //     type : 'radio',
    //     options : ['Male','Femal'],
    //     status : 'upending',
    //     value : '',
    //     mandate : true,
    //     comments : ''
    // },
    // {
    //     name : 'Education',
    //     type : 'check',
    //     options : ['SSLC','HSC'],
    //     status : 'upending',
    //     value : [],
    //     mandate : true,
    //     comments : ''
    // },
    // {
    //     name : 'State',
    //     type : 'select',
    //     options : ['Tamilnadu','Andra'],
    //     status : 'upending',
    //     value : '',
    //     mandate : true,
    //     comments : ''
    // },
]

exports.uploads = [
    {
     name : 'Aadhar Card',
     type : 'file',
     status : 'upending',
     value : '',
     mandate : true,
     comments : ''
    },
    // {
    //     name : 'Pan Card',
    //     type : 'text',
    //     status : 'upending',
    //     value : '',
    //     mandate : true,
    //     comments : ''
    // },
    // {
    //     name : 'SSLC',
    //     type : 'document',
    //     status : 'upending',
    //     value : '',
    //     mandate : true,
    //     comments : ''
    // },
    // {
    //     name : 'HSC',
    //     type : 'document',
    //     status : 'upending',
    //     value : '',
    //     mandate : true,
    //     comments : ''
    // },
  ]


  const awsUrl = "https://dechr.s3.ap-south-1.amazonaws.com/"