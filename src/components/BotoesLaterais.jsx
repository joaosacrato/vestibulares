import React, {useState} from 'react'
import { buscaTodas } from '../api/api';

function BotoesLaterais() {

    const [Questoes, setQuestoes] = useState([])
    const url = '/fuvest'

    buscaTodas(url, setQuestoes);


    return (
        <>
        {console.log(Questoes)}
        </>
    );
}

export default BotoesLaterais;