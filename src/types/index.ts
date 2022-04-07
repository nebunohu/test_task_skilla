import { TCallsActions } from '../redux/actions/calls-actions';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../index';

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TCallsActions; 

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export type TListItem = {
  "id": string;
  "partnership_id": string;
  "date": string;
  "date_notime": string;
  "time": string;
  "from_number": string;
  "from_extension": string;
  "to_number": string;
  "to_extension": string;
  "status": string;
  "record": string;
  "line_number": string;
  "in_out": string;
  "contact_name": string;
    "contact_company": string;
  "person_id": string;
  "person_name": string;
  "person_surname": string;
  "person_avatar": string;

}
