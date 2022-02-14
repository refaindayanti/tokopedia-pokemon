import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Container,
    Row,
    Col
} from 'reactstrap';
import '../styles/_mypokemon.scss';
import { isEmpty } from 'lodash';

const MyPokemon = () => {
    const history = useHistory();
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await JSON.parse(localStorage.getItem("my_pokemon_lists"));
                if(!isEmpty(data)) {
                    setPokemon(data);
                } else {
                    setPokemon([]);
                }
            } catch(e) {
                throw e;
            }
        }

        fetchData();
    }, []);

    const releasePokemon = () => {

    }

    const list = pokemon.map((item, index) => {
        return (
            <Col key={index} xs="12" sm="12">
                <div className="list">
                    <p className="list-title">
                        {item.nickname} 
                    </p>
                    <button className="btn-pokemon" onClick={() => releasePokemon()}>Release</button>
                </div>
            </Col>
        );
    });

    return (
        <React.Fragment>
            <Container className="container-home">
                <button className="btn-pokemon" onClick={() => history.push(`/home`)}>Home</button>
                <h3>My Pokemon Lists</h3>
                <Row>
                    {list}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default MyPokemon;