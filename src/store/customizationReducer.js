/*eslint-disable*/
// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    safe_keywords_store:[],
    unsafe_keywords_store:[],
    annot_value_store:[],
    annot_desc_store:[]
    
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
            case actionTypes.SET_SAFE_KEYWORDS:
               
            return {
                ...state,
                safe_keywords_store:action.safe_keywords
            };
            case actionTypes.SET_UNSAFE_KEYWORDS:
              
            return {
                ...state,
                unsafe_keywords_store:action.unsafe_keywords
            };
            case actionTypes.SET_ANNOT_VALUE:
               
                return {
                    ...state,
                    annot_value_store:action.annot_value
                };
                case actionTypes.SET_ANNOT_DESC:
                  
                return {
                    ...state,
                    annot_desc_store:action.annot_desc
                };
        default:
            return state;
    }
};

export default customizationReducer;
