import { SubmitServiceBase, SubmitterOptionsBase } from '../Base/SubmitServiceBase';
import { State } from '../../Data/State';

export class DefaultHttpSubmitService extends SubmitServiceBase<DefaultHttpSubmitOptions> {
    private static submitOptionsKey = 'submit';

    protected extractSubmitOptions(options: Record<string, unknown>): DefaultHttpSubmitOptions {
        return options[DefaultHttpSubmitService.submitOptionsKey] as DefaultHttpSubmitOptions;
    }

    protected getSubmitPromise(data: Record<string, unknown>): Promise<unknown> {
        const buildBody = this.options.buildBody ?? httpSubmitOptionsDefaults.buildBody;
        let request: RequestInit = {
            method: this.options.method ?? httpSubmitOptionsDefaults.method,
            headers: {
                'Content-Type': this.options.contentType ?? httpSubmitOptionsDefaults.contentType,
            },
            body: buildBody(data),
        };
        const url = this.buildUrl();
        request = this.options.initRequest ? this.options.initRequest(request, this.rootState) : request;
        const parseResponse = this.options.parseResponse ?? httpSubmitOptionsDefaults.parseResponse;
        return fetch(url.toString(), request).then(response => {
            return parseResponse(response);
        });
    }

    private buildUrl(): URL {
        return new URL(this.options.url ?? httpSubmitOptionsDefaults.url ?? '');
    }
}

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface DefaultHttpSubmitOptions extends SubmitterOptionsBase {
    url?: string;
    method?: HttpMethod;
    contentType?: string;
    initRequest?: (request: RequestInit, rootState: State) => RequestInit;
    parseResponse?: (response: Response) => Promise<unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildBody?: (data: Record<string, unknown>) => any;
}

export const httpSubmitOptionsDefaults = {
    url: '/',
    method: 'POST',
    parseResponse: (response: Response) => response.json(),
    buildBody: (data: Record<string, unknown>) => JSON.stringify(data),
    asQuery: [],
    keysMap: {},
    contentType: 'application/json',
};
