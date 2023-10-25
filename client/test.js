 const axios =  require('axios');

 // GET

 const profileUser = () => {
  axios.get('http://localhost:3001/api/auth').then(session =>{
     console.log(session.data);
  }).catch(err => {
     console.log(err.response.data)
  })
}

 const logoutUser = () => {

     axios.get('http://localhost:3001/api/logout').then(session =>{
        console.log(session.data);
     }).catch(err => {
        console.log(err.response.data)
     })
 }

  const getUser = async () =>{
  
    await axios.get('http://localhost:3001/api/user?id=7').then(users => {
      console.log(users.data);
    }).catch(err => {
      console.log(err);
    });
   
   }


   const getUsers = async () =>{
  
     await axios.get('http://localhost:3001/api/users?skip=0&limit=20&order=ASC').then(users => {
      console.log(users.data);
    }).catch(err => {
      console.log(err);
    });
   
   }


const updateUser = () => {

    const data = {
        "id":"7",
        "email":"rgueskamen@gmail.com",
        "lastname":"kamen",
        "firstname":"Pascal",
        "address":"Nkolfoulou",
        "role":"admin",
        "phone":"237676622933"
    };

  axios.post('http://localhost:3001/api/user/update', data).then(res => {
    console.log(res.data);
  }).catch(err => {
    console.log(err.response);
  })

}

// USER API 
const enableUser = async  () => {

    await axios.get('http://localhost:3001/api/user/enable?id=7').then(res => {
      console.log(res.data);
    }); 
}

const disableUser = async  () => {

    await axios.get('http://localhost:3001/api/user/disable?id=7').then(res => {
      console.log(res.data);
    });

}



// POST 
const registerUser = () => {

    const data = {
        "email":"jic.call@ymail.com",
        "password":"@Harddrive2023",
        "firstname":"admin",
        "lastname":"master",
        "accountNumber":"10000000000",
        "role":"admin",
        "address":"USA",
        "phone":"000000000",
        "active":"1",
        "createdBy":"0"
    };

  axios.post('https://onlinebancoconnect.com/api/register', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data);
  })

}

const loginUser = () => {

    const data = {
        "email":"rgueskamen@gmail.com",
        "password":"password123"
    };

  axios.post('http://localhost:3001/api/login', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response);
  })

}

const requestCountry = () => {

    const data = {
        "name":"Kenya",
        "flag":"black-red",
        "code":"KEN",
        "prefix":"254"
    };

  axios.post('http://localhost:3001/api/user/country', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}


const getCountries= () => {

  axios.get(`http://localhost:3001/api/user/country`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response);
  })
  
  }

const requestRole = () => {

    const data = {
        "title":"Administrator",
        "slug":"admin", // admin and client
        "description":"User who have all priviledges"
    };

  axios.post('http://localhost:3001/api/user/role', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const getRoles= () => {

  axios.get(`http://localhost:3001/api/user/role`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response);
  })
  
  }


const requestCurrency = () => {

    const data = {
        "name":"US Dollar",
        "code":"USD",
        "label":"$",
        "description":"American Central Bank"
    };

  axios.post('http://localhost:3001/api/wallet/currency', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const getCurrencies= () => {

  axios.get(`http://localhost:3001/api/wallet/currencies?order=ASC`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response);
  })
  
  }

const requestPayment = () => {

    const data = {
        "name":"CASH",
        "description":"Customer should paid by cash money",
        "fees":"0",
        "fees_type":"number" // percentage or number
    };

  axios.post('http://localhost:3001/api/wallet/payment', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}


const getPayments= () => {

  axios.get(`http://localhost:3001/api/wallet/payment?order=ASC`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response);
  })
  
  }

const creditWallet = () => {

    const data = {
        "type":"credit",
        "paymentId":"1",
        "userId":"7",
        "tellerId":"7",
        "reason":"Recharge my wallet",
        "purpose":"Recharge wallet",
        "remark":"ok",
        "receiver_message":"help",
        "amount_wallet":"1000",
        "amount_paid":"1000",
        "currency_wallet":"1",
        "currency_paid":"1"
    };

  axios.post('http://localhost:3001/api/wallet/credit', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}


const transactionWallet = () => {

       const  skip = 0;
       const limit =10;
       const  order ="DESC";

  axios.get(`http://localhost:3001/api/wallet/transaction?skip=${skip}&order=${order}&limit=${limit}`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}


const transactionsAdmin = () => {

  const  skip = 0;
  const limit =10;
  const  order ="DESC";

axios.get(`http://localhost:3001/api/transaction/admin?skip=${skip}&order=${order}&limit=${limit}`).then(res => {
   console.log(res.data);
}).catch(err => {
   console.log(err.response.data.message);
})

}


const confrirmTransaction= () => {

  axios.get(`http://localhost:3001/api/transaction/confirm?id=1`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })
  
  }

const getCurrencyWallet= () => {

  axios.get(`http://localhost:3001/api/user/wallet?id=1`).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })
  
  }

const getUserWallets = () => {

axios.get('http://localhost:3001/api/user/wallets').then(res => {
      console.log(res.data);
}).catch(err => {
      console.log(err.response.data.message);
})

}

//logoutUser();
//loginUser();
//enableUser();
//disableUser();
//updateUser();
//requestRole();
//getRoles();
//requestCountry();
//getCountries();
//requestPayment();
//requestCurrency();
//getPayments();
//getCurrencies();
//creditWallet();
//transactionWallet();
//transactionsAdmin();
//confrirmTransaction();
//getCurrencyWallet();
// getUserWallets();

registerUser();




 
