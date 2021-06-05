import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import cartItems from './Reducers/cartitem';


const reducers = combineReducers({
    cart: cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleWare)),
);

export default store;
