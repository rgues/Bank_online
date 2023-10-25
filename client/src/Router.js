import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './hoc/auth';

import Home from './components/Home/Home';
import User from './components/Admin';
import Logout from './components/Admin/logout';

import Login from './containers/Admin/login';
import Register from './containers/Admin/register';
import Transfer from './containers/Admin/transfer';
import UpdateUser from './containers/Admin/update';
import TransactionsContainer from './containers/transactions_container';
import UsersContainer from './containers/users_container';
import UpdatePassword from './containers/Admin/updatePassword';

const AuthenticateHome = Auth(Home,null);
const UserProfile = Auth(User,true);
const UserLogin = Auth(Login,false);
const UpdatePasswordView = Auth(UpdatePassword,true);
const UserLogout = Auth(Logout,true);
const RegisterView = Auth(Register,true);
const UpdateView = Auth(UpdateUser,true);
const TransferView = Auth(Transfer,true);
const UsersView = Auth(UsersContainer,true);
const TransactionsView = Auth(TransactionsContainer,true);

const Router = () => (

    <Layout >
        <Routes>
            <Route path='/' exact element={ <AuthenticateHome/>} />
            <Route path='/login' exact element={<UserLogin />} />
            <Route path='/update/password' exact element={<UpdatePasswordView />} />
            <Route path='/user' exact element={<UserProfile />} />
            <Route path='/user/list' exact element={<UsersView />} />
            <Route path='/user/admin/transactions' exact element={<TransactionsView />} />
            <Route path='/user/edit/:id' exact element={<UpdateView />} />
            <Route path='/user/register' exact element={<RegisterView />} />
            <Route path='/user/logout' exact element={<UserLogout />} />
            <Route path='/user/wallet/transfer' exact element={<TransferView />} />
            <Route path='*' exact element={<UserLogin />} />
        </Routes>
    </Layout>
)

export default Router;