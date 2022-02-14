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
import { isEmpty, join, map } from 'lodash';

const Detail = () => {
    const dispatch = useDispatch();
    const { name } = useParams();

    const data = useSelector(state => state.detailReducer.data);

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

    const catchPokemon = () => {
        
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