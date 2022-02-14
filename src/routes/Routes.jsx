import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

const RoutesPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route key="home" path="/" component={Home} exact />
                <Route key="detail" path="/detail/:name" component={Detail} />
            </Switch>
        </BrowserRouter>
    );
}

export default RoutesPage;