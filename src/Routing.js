import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Game from "./components/Game";
import PlayersProvider from "./providers/Players";
import CamelProvider from "./providers/Camels";
import DiceProvider from "./providers/Dice";
import LegBetsProvider from "./providers/LegBets";
import RaceBetsProvider from "./providers/RaceBets";

const Routing = () => {
    return (
        <BrowserRouter>
            <RaceBetsProvider>
                <PlayersProvider>
                    <CamelProvider>
                        <DiceProvider>
                            <LegBetsProvider>
                                <Switch>
                                    <Route exact path="/">
                                        <Menu />
                                    </Route>
                                    <Route exact path="/camel-up">
                                        <Game />
                                    </Route>
                                </Switch>
                            </LegBetsProvider>
                        </DiceProvider>
                    </CamelProvider>
                </PlayersProvider>
            </RaceBetsProvider>
        </BrowserRouter>
    )
}

export default Routing;