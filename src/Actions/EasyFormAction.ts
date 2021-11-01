export interface EasyFormAction<TActionType, TPayload> {
    type: TActionType;
    payload: TPayload;
}