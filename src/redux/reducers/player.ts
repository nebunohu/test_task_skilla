import { GET_RECORD_REQUEST, GET_RECORD_REQUEST_SUCCESS, GET_RECORD_REQUEST_FAILED } from './../actions/player-actions';
import { TPlayerActions } from "../actions/player-actions";

type TPlayerState = {
    record: any;

    getRecordRequest: boolean;
    getRecordRequestSuccess: boolean;
    getRecordRequestFailed: boolean;
};

const initialState: TPlayerState = {
    record: null,

    getRecordRequest: false,
    getRecordRequestSuccess: false,
    getRecordRequestFailed: false,
};

const playerReducer = (state = initialState, action: TPlayerActions) => {
    switch (action.type) {
        case GET_RECORD_REQUEST: {
            return {
                ...state,
                getRecordRequest: true,
                getRecordRequestSuccess: false,
                getRecordRequestFailed: false,
            }
        }
        case GET_RECORD_REQUEST_SUCCESS: {
            return {
                ...state,
                record: action.record,
                getRecordRequest: false,
                getRecordRequestSuccess: true,
            }
        }
        case GET_RECORD_REQUEST_FAILED: {
            return {
                ...state,
                getRecordRequest: false,
                getRecordRequestFailed: true,
            }
        }
        default: {
            return state;
        };
    };
};

export default playerReducer;
