export default {
    state: {
        width:1960,
        height:1080
    },
    mutations: {
        setWidth (state, value) {
            state.width = value
        },
        setHeight (state, value) {
            state.height = value
        },
    },
    actions: {
        setWidth ({ commit }, value) {
            commit('setWidth', value)
        },
        setHeight ({ commit }, value) {
            commit('setHeight', value)
        }
    }
}