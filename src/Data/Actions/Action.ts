export interface Action<TActionType, TPayload> {
    type: TActionType;
    payload: TPayload;
}


