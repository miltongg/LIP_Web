import React, {useEffect} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LabScreen} from '../components/Lab/LabScreen';
import {LoginScreen} from '../components/auth/LoginScreen';
import {RegisterScreen} from '../components/auth/RegisterScreen';
import {startChecking} from "../actions/auth";
import {IdeaListScreen} from '../components/idea/IdeaListScreen';
import {IdeaForm} from "../components/idea/IdeaForm";
import {UserProfileScreen} from "../components/user/UserProfileScreen";
import {IdeaScreen} from "../components/idea/IdeaScreen";
import {EditUserScreen} from "../components/user/EditUserScreen";
import {IdeaEditScreen} from "../components/idea/IdeaEditScreen";
import {AppForm} from "../components/app/AppForm";
import {AppScreen} from "../components/app/AppScreen";
import {AppListScreen} from "../components/app/AppListScreen";
import {AppEditScreen} from "../components/app/AppEditScreen";
import {DashboardScreen} from "../components/admin/DashboardScreen";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, token, role} = useSelector(state => state.auth)

    useEffect(() => {

        dispatch(startChecking())

    }, [dispatch]);

    if (checking) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <div>
                <Routes>

                    <Route
                        path='/user/login'
                        element={!!token ? <Navigate to='/user/profile'/> : <LoginScreen/>}
                    />
                    <Route
                        path='/user/edit/:userId'
                        element={!token ? <Navigate to='/'/> : <EditUserScreen/>}
                    />
                    <Route path='/' element={<LabScreen/>}/>
                    <Route
                        path='/user/register'
                        element={!!token ? <Navigate to='/user/profile'/> : <RegisterScreen/>}
                    />
                    <Route path='/user/*' element={<Navigate replace to="/user/login"/>}/>
                    <Route path='/user/profile'
                           element={!token ? <Navigate to='/user/login'/> : <UserProfileScreen/>}
                    />

                    {/* IDEA ROUTES */}
                    <Route path='/idea/add' element={<IdeaForm/>}/>
                    <Route path='/idea/list' element={<IdeaListScreen/>}/>
                    <Route path='/idea/:ideaId' element={<IdeaScreen/>}/>
                    <Route path='/idea/edit/:ideaId' element={<IdeaEditScreen/>}/>

                    {/* APP ROUTES */}
                    <Route path='/app/add' element={<AppForm/>}/>
                    <Route path='/app/list' element={<AppListScreen/>}/>
                    <Route path='/app/:appId' element={<AppScreen/>}/>
                    <Route path='/app/edit/:appId' element={<AppEditScreen/>}/>

                    {/* DASHBOARD ROUTES */}
                    <Route path='/dashboard' element={(role === 'admin' || role === 'moderator') ? <DashboardScreen/> :
                        <Navigate to='/'/>}/>

                </Routes>
            </div>
        </Router>
    )
}
