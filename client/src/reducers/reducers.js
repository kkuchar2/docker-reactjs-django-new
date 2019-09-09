import {LOGIN} from "../actions/actions";

const initialState = {

};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {};
        default:
            return state;
    }
}

export default rootReducer;