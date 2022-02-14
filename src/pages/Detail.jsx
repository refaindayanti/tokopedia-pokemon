import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePokemon } from '../redux/actions/pokemon.action';
import { 
    Container,
    Row,
    Col
} from 'reactstrap';
import '../styles/_detail.scss';
import { find, isEmpty, join, map } from 'lodash';

const Detail = () => {
    const dispatch = useDispatch();
    const { name } = useParams();

    const data = useSelector(state => state.detailReducer.data);

    const [success, setSuccess] = useState(false);
    const [onCatch, setOnCatch] = useState(false);
    const [nickname, setNickname] = useState("");
    const [alertSubmit, setAlertSubmit] = useState("");

    useEffect(() => {
        console.log("name", name);
        if(name) {
            dispatch(getOnePokemon(name));
        }
    }, [name]);

    useEffect(() => {
        console.log("data ", data);
    }, [data])

    const getTypes = () => {
        return join(map(data.types, (v => v.type.name)), ", ")
    }

    const getMoves = () => {
        return join(map(data.moves, (v => v.move.name)), ", ")
    }

    const checkPossibility = () => {
        return Math.random() > 0.5 ? false : true;
    }

    const catchPokemon = () => {
        setOnCatch(true);
        const check = checkPossibility();
        console.log("check ", check);
        if(check) {
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    }

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    }

    const savePokemon = async () => {
        try {
            const my_pokemon = await JSON.parse(localStorage.getItem("my_pokemon_lists"));
            console.log("my ", my_pokemon);
            if(!isEmpty(my_pokemon)) {
                const checkNickname = find(my_pokemon, v => v.nickname == nickname);
                if(isEmpty(checkNickname)) {
                    my_pokemon.push({
                        nickname: nickname,
                        detail: data
                    });

                    localStorage.setItem("my_pokemon_lists", JSON.stringify(my_pokemon));  
                    setNickname("");
                    setOnCatch(false);
                } else {
                    setAlertSubmit("Nickname already used!");
                }
            } else {
                const pokemon = [
                    {
                        nickname: nickname,
                        detail: data
                    }
                ]
                localStorage.setItem("my_pokemon_lists", JSON.stringify(pokemon));
                setOnCatch(false);
            }
        } catch(e) {
            throw e;
        }
    }

    return (
        <React.Fragment>
            <Container className="container-home">
                <Row>
                    <Col xs="12" sm="12">
                        <div className="title-container">
                            {
                                !isEmpty(data) && (
                                    <img src={data.sprites.front_default} className="img" />
                                )
                            }
                            <div className="title-text">
                                <p className="title">
                                    { !isEmpty(data) ? data.name : "-" }
                                </p>
                                <button className="btn" onClick={() => catchPokemon()}>Catch Pokemon</button>
                                {
                                    onCatch && (
                                        !success ? (
                                            <h5 className="failed-pokemon">Sorry, you didn't get {data.name}</h5>
                                        ) : (
                                            <div className="success-pokemon">
                                                <h5>You got {data.name}!</h5>
                                                <p>Input nickname for your {data.name}</p>
                                                <div>
                                                    <input type="text" name="nickname" value={nickname} onChange={(e) => onChangeNickname(e)} />
                                                    <span>{alertSubmit}</span>
                                                </div>
                                                <button onClick={() => savePokemon()}>Submit</button>
                                            </div>
                                        )
                                    )
                                }    
                            </div>

                        </div>
                        <div className="detail">
                            <h5>Types</h5>
                            <p>{ getTypes() }</p>

                            <h5>Moves</h5>
                            <p>{ getMoves() }</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Detail;