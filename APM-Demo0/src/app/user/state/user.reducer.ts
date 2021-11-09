import { createReducer, on, createAction, createSelector, createFeatureSelector } from '@ngrx/store';
import * as UserActions from './user.actions';
export interface UserState {
    maskUserName: boolean;
}

export const initialState: UserState = {
    maskUserName: false
}

export const getUserState = createFeatureSelector<UserState>('user')

export const getMaskUserName = createSelector(
    getUserState,
    state => state.maskUserName
)

export const userReducer = createReducer(
    initialState,
    on(UserActions.maskUserName, state => {
        return {
            ...state, 
            maskUserName: !state.maskUserName,
        };
    })
);
