import {DispatchFunction} from "../../Form/DispatchContext";
import {SubmitServiceBase, SubmitterOptionsBase} from "../Base/SubmitServiceBase";
import {RootState} from "../../Data/Types/RootState";

export class DefaultHttpSubmitService extends SubmitServiceBase<DefaultHttpSubmitOptions> {

    private static submitOptionsKey: string = "submit"

    protected extractSubmitOptions(options: any): DefaultHttpSubmitOptions {
        return options[DefaultHttpSubmitService.submitOptionsKey];
    }

    protected getSubmitPromise(): Promise<any> {
        const buildBody = this.options.buildBody ?? httpSubmitOptionsDefaults.buildBody;
        let asQueryList = this.options.asQuery ?? httpSubmitOptionsDefaults.asQuery;
        let request: RequestInit = {
            method: this.options.method ?? httpSubmitOptionsDefaults.method,
            body: buildBody(this.rootState, this.options.keysMap ?? httpSubmitOptionsDefaults.keysMap, asQueryList),
        };
        const url = this.buildUrl();
        request = this.options.initRequest ? this.options.initRequest(request, this.rootState) : request;
        const parseResponse = this.options.parseResponse ?? httpSubmitOptionsDefaults.parseResponse;
        return fetch(url.toString(), request)
            .then(response => {
                this.options.onResponseStatus?.(response.status, response.statusText, this.dispatch);
                return parseResponse(response);
            });
    }

    private buildUrl(): URL {
        let asQueryList = this.options.asQuery ?? httpSubmitOptionsDefaults.asQuery;
        asQueryList = ["GET", "DELETE"].includes(this.options.method ?? '') ? Object.keys(this.rootState.fields) : asQueryList;
        const url = new URL(this.options.url ?? httpSubmitOptionsDefaults.url ?? "");
        const params = asQueryList.reduce((acc, fieldName) => {
            const field = this.rootState.fields[fieldName];
            if (field) {
                acc[this.options.keysMap?.[fieldName] ?? fieldName] = field.value;
            }
            return acc;
        }, {} as any);
        url.search = new URLSearchParams(params).toString();
        return url;
    }
}


export interface DefaultHttpSubmitOptions extends SubmitterOptionsBase {
    url?: string;
    method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
    initRequest?: (request: RequestInit, rootState: RootState) => RequestInit;
    parseResponse?: (response: Response) => Promise<any>;
    onResponseStatus?: (status: number, statusText: string, dispatch: DispatchFunction) => void;
    buildBody?: (state: RootState, keysMap: { [fieldName: string]: string }, skipFields: string[]) => any;
    asQuery?: string[];
    keysMap?: { [fieldName: string]: string };
}

export const httpSubmitOptionsDefaults = {
    url: "/",
    method: "POST",
    parseResponse: (response: Response) => response.json(),
    buildBody: buildJsonBody,
    asQuery: [],
    keysMap: {}
}


export function buildJsonBody(state: RootState, keysMap: { [fieldName: string]: string }, skipFields: string[] = []): string {
    return JSON.stringify(buildData(state, keysMap, skipFields));
}

export function buildFormData(state: RootState, keysMap: { [fieldName: string]: string }, skipFields: string[] = []): FormData {
    const data = buildData(state, keysMap, skipFields);
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
}

function buildData(state: RootState, keysMap: { [fieldName: string]: string }, skipFields: string[] = []): any {
    const keys = Object.keys(state.fields);
    return keys.reduce((body, key) => {
        if (skipFields.includes(key)) {
            return body;
        }
        body[keysMap[key] ?? key] = state.fields[key].value;
        return body;
    }, {} as any);
}