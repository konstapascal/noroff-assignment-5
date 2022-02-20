import { createStore } from 'vuex';

export default createStore({ state: {
    user : null,
    highScore : null
}, 
mutations: {
    setUser: (state, user) => {
        state.user = user
    },
    setHighScore: (state, highScore) => {
        state.highScore = highScore
    }
}, actions: {} });
