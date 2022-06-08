import { AppDispatch, AppThunk } from '../../types';
import getRecord from '../../utils/get-record';
export const GET_RECORD_REQUEST: 'GET_RECORD_REQUEST' = 'GET_RECORD_REQUEST';
export const GET_RECORD_REQUEST_SUCCESS: 'GET_RECORD_REQUEST_SUCCESS' = 'GET_RECORD_REQUEST_SUCCESS';
export const GET_RECORD_REQUEST_FAILED: 'GET_RECORD_REQUEST_FAILED' = 'GET_RECORD_REQUEST_FAILED';

export type TGetRecord = {
    type: typeof GET_RECORD_REQUEST;
};

export type TGetRecordSuccess = {
    type: typeof GET_RECORD_REQUEST_SUCCESS;
    record: any;
};

export type TGetRecordFailed = {
    type: typeof GET_RECORD_REQUEST_FAILED;
};

export type TPlayerActions = TGetRecord |
    TGetRecordSuccess |
    TGetRecordFailed;

export const getRecordRequest = () => {
    return {
        type: GET_RECORD_REQUEST,
    };
};

export const getRecordRequestSuccess = (record: any) => {
    return {
        type: GET_RECORD_REQUEST_SUCCESS,
        record
    };
};

export const getRecordRequestFailed = () => {
    return {
        type: GET_RECORD_REQUEST_FAILED,
    };
};

export const getRecordThunk: AppThunk = (recordId: string, partnershipId: string) => async (dispatch: AppDispatch) => {
    dispatch(getRecordRequest());
    try {
        const res = await getRecord(recordId, partnershipId);
        const data = await res.json();
        dispatch(getRecordRequestSuccess(data));
    } catch (error: any) {
        console.log(error);
        dispatch(getRecordRequestFailed());
    }
};
