import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import MyPokemon from '../pages/MyPokemon';

const RoutesPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route key="home" path="/" component={Home} exact />
                <Route key="detail" path="/detail/:name" component={Detail} />
                <Route key="mypokemon" path="/my-pokemon" component={MyPokemon} />
            </Switch>
        </BrowserRouter>
    );
}

export default RoutesPage;