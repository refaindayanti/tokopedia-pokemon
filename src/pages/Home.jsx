import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllPokemon } from '../redux/actions/pokemon.action';
import { 
    Container,
    Row,
    Col
} from 'reactstrap';
import '../styles/_home.scss';
import { isEmpty } from 'lodash';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const data = useSelector(state => state.pokemonReducer.data);

    const [items, setItems] = useState([]);

    useEffect(() => {
        dispatch(getAllPokemon());
        console.log("item ", items);
    }, [dispatch]);

    useEffect(() => {
        console.log("coba ", data);
        if(!isEmpty(data)) {
            setItems(data);
        }
    }, [data]);

    const pokemon = items.map((item, index) => {
        return (
            <Col key={index} xs="12" sm="12" onClick={() => history.push(`/detail/${item.name}`)}>
                <div className="list">
                    <p className="list-title">
                        {item.name} 
                    </p>
                </div>
            </Col>
        );
    });

    return (
        <React.Fragment>
            <Container className="container-home">
                <button className="btn-pokemon" onClick={() => history.push(`/my-pokemon`)}>My Pokemon Lists</button>
                <h3>Pokemon Lists</h3>
                <Row>
                    {pokemon}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Home;