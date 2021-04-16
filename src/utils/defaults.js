import { Players } from "../constants/consts";
import { getRandomNumber, getRandomRoll } from "./random";

export const initializeDice = () => {
    return {
        red: "x",
        green: "x",
        blue: "x",
        yellow: "x",
        white: "x"
    }
};

export const initializePlayers = () => {
    const firstIsRandom = getRandomNumber(0,1) ? false : true;

    return {
        [Players.playerOne]: {
            name: "",
            score: 0,
            tempscore: 0,
            current: firstIsRandom
        },
        [Players.playerTwo]: {
            name: "",
            score: 0,
            tempscore: 0,
            current: !firstIsRandom
        }
    }
};

export const initializeCamels = () => {
    const camels = {
        red: {
            position: -1,
            stackPosition: 0
        },
        green: {
            position: -1,
            stackPosition: 0
        },
        blue: {
            position: -1,
            stackPosition: 0
        },
        yellow: {
            position: -1,
            stackPosition: 0
        },
        white: {
            position: -1,
            stackPosition: 0
        }
    }

    for (let camel in camels) {
        const newPosition = getRandomNumber(0,2);
        camels[camel].stackPosition = Object.values(camels).filter(c => c.position === newPosition).length;
        camels[camel].position = newPosition;
    }

    return camels;
};

export const initializeLegBets = () => {
    return {
        red: null,
        green: null,
        blue: null,
        yellow: null,
        white: null
    }
};

export const initializeRaceBets = () => {
    return {
        red: [],
        green: [],
        blue: [],
        yellow: [],
        white: []
    }
};