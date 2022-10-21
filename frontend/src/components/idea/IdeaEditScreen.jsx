import React, {useEffect, useState} from 'react';
import {IdeaEdit} from "./IdeaEdit";
import axios from "axios";
import {url} from "../../helpers/urls";
import {useParams} from "react-router-dom";

export const IdeaEditScreen = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [idea, setIdea] = useState({})

    const {ideaId} = useParams();


    useEffect(() => {
        axios.get(url + '/idea', {
            headers: {
                id: ideaId
            }
        }).then(res => {
            console.log(res.data)
            setIdea(res.data.data)
            setIsLoading(false)
        })
    }, [ideaId])

    return (
        <>
            {
                (!isLoading) && <IdeaEdit ideaData={idea}/>
            }

        </>
    );
};
