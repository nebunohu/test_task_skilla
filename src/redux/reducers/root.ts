import { TListItem } from './../../types/index';
import { SET_PAGES_COUNT, GET_NEXT_PAGE_REQUEST, GET_NEXT_PAGE_REQUEST_SUCCESS, GET_NEXT_PAGE_REQUEST_FAILED } from './../actions/calls-actions';
import { 
  GET_CALLS_REQUEST, 
  GET_CALLS_REQUEST_SUCCESS, 
  GET_CALLS_REQUEST_FAILED,
  CLEAR_CALLS_LIST } from '../actions/calls-actions';
import { TCallsActions } from '../actions/calls-actions';
import { combineReducers } from "redux";

export type TProductsState = {
  callsList: Array<TListItem>;
  filteredCallsList: Array<any>;
  pagesCount: number;

  getCallsRequest: boolean;
  getCallsRequestSuccess: boolean;
  getCallsRequestFailed: boolean;
  getNextPageRequest: boolean;
  getNextPageRequestSuccess: boolean;
  getNextPageRequestFailed: boolean;
  error_msg: string;
};

const callsListInitialState: TProductsState = {
  callsList: [],
  filteredCallsList: [],
  pagesCount: 0,

  getCallsRequest: false,
  getCallsRequestSuccess: false,
  getCallsRequestFailed: false,
  getNextPageRequest: false,
  getNextPageRequestSuccess: false,
  getNextPageRequestFailed: false,
  error_msg: '',
};

export const callsListReducer = (state = callsListInitialState, action: TCallsActions): TProductsState => {
  switch (action.type) {
    case GET_CALLS_REQUEST: {
      return {
        ...state,
        getCallsRequest: true,
        getCallsRequestSuccess: false,
        getCallsRequestFailed: false,
        error_msg: '',
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
        error_msg: action.error_msg,
      }
    }
    case GET_NEXT_PAGE_REQUEST: {
      return {
        ...state,
        getNextPageRequest: true,
        getNextPageRequestSuccess: false,
        getNextPageRequestFailed: false,
        error_msg: '',
      }
    }
    case GET_NEXT_PAGE_REQUEST_SUCCESS: {
      return {
        ...state,
        getNextPageRequest: false,
        getNextPageRequestSuccess: true,
        callsList: [...state.callsList, ...action.callsPage],
        // filteredCallsList: action.callsList,
      }
    }
    case GET_NEXT_PAGE_REQUEST_FAILED: {
      return {
        ...state,
        getNextPageRequest: false,
        getNextPageRequestFailed: true,
        error_msg: action.error_msg,
      }
    }
    case CLEAR_CALLS_LIST: {
      return {
        ...state,
        callsList: []
      }
    }
    case SET_PAGES_COUNT: {
      return {
        ...state,
        pagesCount: action.pagesCount,
      }
    }
    default: return state;
  }
};

export const rootReducer = combineReducers({
  callsListState: callsListReducer
});