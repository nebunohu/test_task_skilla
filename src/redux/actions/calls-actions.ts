import { AppDispatch, AppThunk, TListItem } from "../../types";
import { getListRequest } from "../../utils/get-list-request";

export const GET_CALLS_REQUEST: "GET_PRODUCTS_REQUEST" = "GET_PRODUCTS_REQUEST";
export const GET_CALLS_REQUEST_SUCCESS: "GET_PRODUCTS_REQUEST_SUCCESS" = "GET_PRODUCTS_REQUEST_SUCCESS";
export const GET_CALLS_REQUEST_FAILED: "GET_PRODUCTS_REQUEST_FAILED" = "GET_PRODUCTS_REQUEST_FAILED";
export const SAVE_FILTERED_CALLS_LIST: "SAVE_FILTERED_PRODUCTS" = "SAVE_FILTERED_PRODUCTS";
export const CLEAR_CALLS_LIST: "CLEAR_CALLS_LIST" = "CLEAR_CALLS_LIST";
export const SET_PAGES_COUNT: 'SET_PAGES_COUNT' = 'SET_PAGES_COUNT';
export const GET_NEXT_PAGE_REQUEST: "GET_NEXT_PAGE_REQUEST" = "GET_NEXT_PAGE_REQUEST";
export const GET_NEXT_PAGE_REQUEST_SUCCESS: "GET_NEXT_PAGE_REQUEST_SUCCESS" = "GET_NEXT_PAGE_REQUEST_SUCCESS";
export const GET_NEXT_PAGE_REQUEST_FAILED: "GET_NEXT_PAGE_REQUEST_FAILED" = "GET_NEXT_PAGE_REQUEST_FAILED";

export type TGetCallsRequest = {
  type: typeof GET_CALLS_REQUEST;
};

export type TGetCallsRequestSuccess = {
  type: typeof GET_CALLS_REQUEST_SUCCESS;
  callsList: Array<TListItem>
};

export type TGetCallsRequestFailed = {
  type: typeof GET_CALLS_REQUEST_FAILED;
  error_msg: string;
};

export type TSaveFilteredProducts = {
  type: typeof SAVE_FILTERED_CALLS_LIST;
  callsList: Array<TListItem>;
};

export type TClearCallsList = {
  type: typeof CLEAR_CALLS_LIST;
};

export type TSetPagesCount = {
  type: typeof SET_PAGES_COUNT;
  pagesCount: number;
};

export type TGetNextPageRequest = {
  type: typeof GET_NEXT_PAGE_REQUEST;
};

export type TGetNextPageRequestSuccess = {
  type: typeof GET_NEXT_PAGE_REQUEST_SUCCESS;
  callsPage: Array<TListItem>
};

export type TGetNextPageRequestFailed = {
  type: typeof GET_NEXT_PAGE_REQUEST_FAILED;
  error_msg: string;
};

export const getCallsRequest = (): TGetCallsRequest => {
  return {
    type: GET_CALLS_REQUEST
  }
};

export const getCallsRequestSuccess = (callsList: Array<any>): TGetCallsRequestSuccess => {
  return {
    type: GET_CALLS_REQUEST_SUCCESS,
    callsList
  }
};

export const getCallsRequestFailed = (msg: string): TGetCallsRequestFailed => {
  return {
    type: GET_CALLS_REQUEST_FAILED,
    error_msg: msg,
  }
};

export const saveFilteredProducts = (callsList: Array<TListItem>) => {
  return {
    type: SAVE_FILTERED_CALLS_LIST,
    callsList
  }
};

export const clearCallsList = (): TClearCallsList => {
  return {
    type: CLEAR_CALLS_LIST
  }
};

export const setPagesCount = (count: number): TSetPagesCount => {
  return {
    type: SET_PAGES_COUNT,
    pagesCount: count
  }
};


export const getNextPageRequest = (): TGetNextPageRequest => {
  return {
    type: GET_NEXT_PAGE_REQUEST,
  }
};

export const getNextPageRequestSuccess = (callsPage: Array<TListItem>): TGetNextPageRequestSuccess => {
  return {
    type: GET_NEXT_PAGE_REQUEST_SUCCESS,
    callsPage
  }
};

export const getNextPageRequestFailed = (msg: string): TGetNextPageRequestFailed => {
  return {
    type: GET_NEXT_PAGE_REQUEST_FAILED,
    error_msg: msg,
  }
};

export type TCallsActions = TGetCallsRequest |
  TGetCallsRequestSuccess |
  TGetCallsRequestFailed |
  TClearCallsList |
  TSetPagesCount |
  TGetNextPageRequest |
  TGetNextPageRequestSuccess |
  TGetNextPageRequestFailed; 

export const getCallsListThunk: AppThunk = (dateStart: string, dateEnd: string, inOut: string) => async (dispatch: AppDispatch) => {
  dispatch(getCallsRequest());
  try {
    const data = await getListRequest(dateStart, dateEnd, inOut);
    if (!data.results) {
      throw new Error(`${data.error_code} ${data.error_msg}`);
    }
    dispatch(getCallsRequestSuccess(data.results));
    dispatch(setPagesCount(Math.floor(data.total_rows / 50)));
  } catch (error: any) {
    dispatch(getCallsRequestFailed(error.message));
  }
};

export const getCallsNexPageThunk: AppThunk = (dateStart: string, dateEnd: string, inOut: string, page: number) => async (dispatch: AppDispatch) => {
  dispatch(getNextPageRequest());
  try {
    const offset = page * 50;
    const data = await getListRequest(dateStart, dateEnd, inOut, offset);
    if (!data.results) {
      throw new Error(`${data.error_code} ${data.error_msg}`);
    }
    dispatch(getNextPageRequestSuccess(data.results));
  } catch (error: any) {
    dispatch(getNextPageRequestFailed(error.message));
  }
};
