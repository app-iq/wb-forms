import {DispatchFunction} from "../../Form/DispatchContext";
import {SubmitServiceBase, SubmitterOptionsBase} from "../Base/SubmitServiceBase";
import {RootState} from "../../Data/Reducer/RootReducer";

export class DefaultHttpSubmitService extends SubmitServiceBase<DefaultHttpSubmitOptions> {

    private static submitOptionsKey: string = "submit"

    protected extractSubmitOptions(options: any): DefaultHttpSubmitOptions {
        return options[DefaultHttpSubmitService.submitOptionsKey];
    }

    protected getSubmitPromise(): Promise<any> {
        let request: RequestInit = {
            method: this.options.method ?? defaults.method,
        };
        const url = this.options.url ?? defaults.url ?? "";
        request = this.options.initRequest ? this.options.initRequest(request, this.rootState) : request;
        const parseResponse = this.options.parseResponse ?? defaults.parseResponse!;
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
}

const defaults: DefaultHttpSubmitOptions = {
    url: "/",
    method: "POST",
    parseResponse: response => response.json(),
}