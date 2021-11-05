import {DispatchFunction} from "../../Form/DispatchContext";
import {SubmitServiceBase, SubmitterOptionsBase} from "../Base/SubmitServiceBase";
import {RootState} from "../../Data/Types/RootState";

export class DefaultHttpSubmitService extends SubmitServiceBase<DefaultHttpSubmitOptions> {

    private static submitOptionsKey: string = "submit"

    protected extractSubmitOptions(options: any): DefaultHttpSubmitOptions {
        return options[DefaultHttpSubmitService.submitOptionsKey];
    }

    protected getSubmitPromise(): Promise<any> {
        const buildBody = this.options.buildBody ?? defaults.buildBody;
        let request: RequestInit = {
            method: this.options.method ?? defaults.method,
            body: buildBody(this.rootState, this.options.keysMap ?? defaults.keysMap!, this.options.asQuery ?? defaults.asQuery!),
        };
        const url = this.options.url ?? defaults.url ?? "";
        request = this.options.initRequest ? this.options.initRequest(request, this.rootState) : request;
        const parseResponse = this.options.parseResponse ?? defaults.parseResponse;
        return fetch(url, request)
            .then(response => {
                this.options.onResponseStatus?.(response.status, response.statusText, this.dispatch);
                return parseResponse(response);
            });
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

const defaults = {
    url: "/",
    method: "POST",
    parseResponse: (response:Response) => response.json(),
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