import { 
  GET_CALLS_REQUEST, 
  GET_CALLS_REQUEST_SUCCESS, 
  GET_CALLS_REQUEST_FAILED,
  CLEAR_CALLS_LIST } from '../actions/calls-actions';
import { TCallsActions } from '../actions/calls-actions';
import { combineReducers } from "redux";

export type TProductsState = {
  callsList: Array<any> | any;
  filteredCallsList: Array<any>;

  getCallsRequest: boolean;
  getCallsRequestSuccess: boolean;
  getCallsRequestFailed: boolean;
};

const callsListInitialState: TProductsState = {
  callsList: [],
  filteredCallsList: [],

  getCallsRequest: false,
  getCallsRequestSuccess: false,
  getCallsRequestFailed: false,
};

export const callsListReducer = (state = callsListInitialState, action: TCallsActions): TProductsState => {
  switch (action.type) {
    case GET_CALLS_REQUEST: {
      return {
        ...state,
        getCallsRequest: true,
        getCallsRequestSuccess: false,
        getCallsRequestFailed: false,
      }
    }
    case GET_CALLS_REQUEST_SUCCESS: {
      return {
        ...state,
        getCallsRequest: false,
        getCallsRequestSuccess: true,
        callsList: action.callsList,
        filteredCallsList: action.callsList,
      }
    }
    case GET_CALLS_REQUEST_FAILED: {
      return {
        ...state,
        getCallsRequest: false,
        getCallsRequestFailed: true,
      }
    }
    case CLEAR_CALLS_LIST: {
      return {
        ...state,
        callsList: []
      }
    }
    
    default: return state;
  }
};

export const rootReducer = combineReducers({
  callsListState: callsListReducer
});