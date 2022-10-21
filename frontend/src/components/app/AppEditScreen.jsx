import React, {useEffect, useState} from 'react';
import {AppEdit} from "./AppEdit";
import axios from "axios";
import {url} from "../../helpers/urls";
import {useParams} from "react-router-dom";

export const AppEditScreen = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [app, setApp] = useState({})

    const {appId} = useParams();


    useEffect(() => {
        axios.get(url + '/app', {
            headers: {
                id: appId
            }
        }).then(res => {
            console.log(res.data)
            setApp(res.data.data)
            setIsLoading(false)
        })
    }, [appId])

    return (
        <>
            {
                (!isLoading) && <AppEdit appData={app}/>
            }

        </>
    );
};
