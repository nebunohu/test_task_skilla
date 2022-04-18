import { AppDispatch, AppThunk } from "../../types";
import { getListRequest } from "../../utils/get-list-request";

export const GET_CALLS_REQUEST: "GET_PRODUCTS_REQUEST" = "GET_PRODUCTS_REQUEST";
export const GET_CALLS_REQUEST_SUCCESS: "GET_PRODUCTS_REQUEST_SUCCESS" = "GET_PRODUCTS_REQUEST_SUCCESS";
export const GET_CALLS_REQUEST_FAILED: "GET_PRODUCTS_REQUEST_FAILED" = "GET_PRODUCTS_REQUEST_FAILED";
export const SAVE_FILTERED_CALLS_LIST: "SAVE_FILTERED_PRODUCTS" = "SAVE_FILTERED_PRODUCTS";
export const CLEAR_CALLS_LIST: "CLEAR_CALLS_LIST" = "CLEAR_CALLS_LIST";

export type TGetCallsRequest = {
  type: typeof GET_CALLS_REQUEST;
}

export type TGetCallsRequestSuccess = {
  type: typeof GET_CALLS_REQUEST_SUCCESS;
  callsList: Array<any>
}

export type TGetCallsRequestFailed = {
  type: typeof GET_CALLS_REQUEST_FAILED;
}

export type TSaveFilteredProducts = {
  type: typeof SAVE_FILTERED_CALLS_LIST;
  callsList: Array<any>;
}

export type TClearCallsList = {
  type: typeof CLEAR_CALLS_LIST;
}

export const getCallsRequest = (): TGetCallsRequest => {
  return {
    type: GET_CALLS_REQUEST
  }
}

export const getCallsRequestSuccess = (callsList: Array<any>): TGetCallsRequestSuccess => {
  return {
    type: GET_CALLS_REQUEST_SUCCESS,
    callsList
  }
}

export const getCallsRequestFailed = (): TGetCallsRequestFailed => {
  return {
    type: GET_CALLS_REQUEST_FAILED
  }
}

export const saveFilteredProducts = (callsList: Array<any>) => {
  return {
    type: SAVE_FILTERED_CALLS_LIST,
    callsList
  }
}

export const clearCallsList = (): TClearCallsList => {
  return {
    type: CLEAR_CALLS_LIST
  }
}


export type TCallsActions = TGetCallsRequest |
  TGetCallsRequestSuccess |
  TGetCallsRequestFailed |
  TClearCallsList; 

export const getCallsListThunk: AppThunk = (dateStart: string, dateEnd: string, inOut: string) => async (dispatch: AppDispatch) => {
  dispatch(getCallsRequest());
  try {
    const callsList = await getListRequest(dateStart, dateEnd, inOut);
    //dispatch(saveProducts(products));
    dispatch(getCallsRequestSuccess(callsList));
  } catch (error) {
    console.log(error);
    dispatch(getCallsRequestFailed());
  }

}