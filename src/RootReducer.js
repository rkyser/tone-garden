import { combineReducers } from 'redux';
import KeyboardReducer from './Features/Keyboard/KeyboardSlice';

const RootReducer = combineReducers({
  keyboard: KeyboardReducer,
});

export default RootReducer;
