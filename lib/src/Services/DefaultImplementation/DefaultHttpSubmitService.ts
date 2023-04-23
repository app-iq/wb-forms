import {SubmitServiceBase, SubmitterOptionsBase} from '../Base/SubmitServiceBase';
import {State} from '../../Data/State';
import {DispatchFunction} from 'wb-core-provider';

export class DefaultHttpSubmitService extends SubmitServiceBase<DefaultHttpSubmitOptions> {

    private static submitOptionsKey = 'submit';

    protected extractSubmitOptions(options: Record<string, unknown>): DefaultHttpSubmitOptions {
        return options[DefaultHttpSubmitService.submitOptionsKey] as DefaultHttpSubmitOptions;
    }

    protected getSubmitPromise(): Promise<unknown> {
        const buildBody = this.options.buildBody ?? httpSubmitOptionsDefaults.buildBody;
        const asQueryList = this.options.asQuery ?? httpSubmitOptionsDefaults.asQuery;
        let request: RequestInit = {
            method: this.options.method ?? httpSubmitOptionsDefaults.method,
            headers: {
                'Content-Type': this.options.contentType ?? httpSubmitOptionsDefaults.contentType
            },
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
        asQueryList = ['GET', 'DELETE'].includes(this.options.method ?? '') ? Object.keys(this.rootState.fields) : asQueryList;
        const url = new URL(this.options.url ?? httpSubmitOptionsDefaults.url ?? '');
        const initialValue: Record<string, string> = {};
        const params = asQueryList.reduce((acc, fieldName) => {
            const field = this.rootState.fields[fieldName];
            if (field) {
                acc[this.options.keysMap?.[fieldName] ?? fieldName] = field.value;
            }
            return acc;
        }, initialValue);
        url.search = new URLSearchParams(params).toString();
        return url;
    }
}


export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface DefaultHttpSubmitOptions extends SubmitterOptionsBase {
    url?: string;
    method?: HttpMethod;
    contentType?: string;
    initRequest?: (request: RequestInit, rootState: State) => RequestInit;
    parseResponse?: (response: Response) => Promise<unknown>;
    onResponseStatus?: (status: number, statusText: string, dispatch: DispatchFunction) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildBody?: (state: State, keysMap: { [fieldName: string]: string }, skipFields: string[]) => any;
    asQuery?: string[];
    keysMap?: { [fieldName: string]: string };
}

export const httpSubmitOptionsDefaults = {
    url: '/',
    method: 'POST',
    parseResponse: (response: Response) => response.json(),
    buildBody: buildJsonBody,
    asQuery: [],
    keysMap: {},
    contentType: 'application/json'
};


export function buildJsonBody(state: State, keysMap: { [fieldName: string]: string }, skipFields: string[] = []): string {
    return JSON.stringify(buildData(state, keysMap, skipFields));
}

export function buildFormData(state: State, keysMap: { [fieldName: string]: string }, skipFields: string[] = []): FormData {
    const data = buildData(state, keysMap, skipFields);
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
}

function buildData(state: State, keysMap: { [fieldName: string]: string }, skipFields: string[] = []) {
    const keys = Object.keys(state.fields);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialValue: any = {};
    return keys.reduce((body, key) => {
        if (skipFields.includes(key)) {
            return body;
        }
        body[keysMap[key] ?? key] = state.fields[key].value;
        return body;
    }, initialValue);
}
