import {
    buildFormData,
    buildJsonBody,
    DefaultHttpSubmitOptions,
    DefaultHttpSubmitService,
    httpSubmitOptionsDefaults
} from "../../Services/DefaultImplementation/DefaultHttpSubmitService";
import {RootState} from "../../Data/Types/RootState";
import {buildMockFieldState} from "../../Utils/TestHelpers";
import {SubmitActions} from "../../Data/Actions/Form/SubmitActions";

let mockFetch = jest.fn();
global.fetch = mockFetch;

describe('DefaultHttpSubmitService', () => {

    const rootState: RootState = {
        fields: {
            username: buildMockFieldState({name: 'username', value: 'ali'}),
            password: buildMockFieldState({name: 'password', value: 'pass'}),
        },
        form: {
            loading: true
        }
    };

    it('should successfully send http request', async function () {
        let dispatchMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            clearAfterSuccess: false, url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        let mockResponse = {response: 'value'};
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => mockResponse}));
        await submitter.submit();
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, SubmitActions.submitStart());
        expect(dispatchMock).toHaveBeenNthCalledWith(2, SubmitActions.submitSucceed(mockResponse));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, SubmitActions.submitComplete());
    });

    it('should send http request and fail', async function () {
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com'
        };
        let dispatchMock = jest.fn();
        let mockError = {error: 'fail message'};
        mockFetch.mockClear().mockReturnValue(new Promise((resolve, reject) => reject(mockError)));
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        try {
            await submitter.submit();
            expect(false).toEqual(true);
        } catch (e) {
        }
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, SubmitActions.submitStart());
        expect(dispatchMock).toHaveBeenNthCalledWith(2, SubmitActions.submitFail(mockError));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, SubmitActions.submitComplete());
    });


    it('clear value after success', async function () {
        let dispatchMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => null}));
        await submitter.submit();
        expect(dispatchMock).toHaveBeenLastCalledWith(SubmitActions.submitComplete());
    });

    it('should call onSuccess listener', async function () {
        let dispatchMock = jest.fn();
        let onSuccessMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onSuccess: onSuccessMock, url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(onSuccessMock).toBeCalledWith('value', dispatchMock)
    });

    it('should call onError listener', async function () {
        let dispatchMock = jest.fn();
        let onFailMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onFail: onFailMock, url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.reject('error'));
        try {
            await submitter.submit();
        } catch {
        }
        expect(onFailMock).toBeCalledWith('error', dispatchMock)
    });

    it('should call onComplete listener', async function () {
        let dispatchMock = jest.fn();
        let onCompleteMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onComplete: onCompleteMock, url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(onCompleteMock).toBeCalledWith(dispatchMock)
    });

    it('should call onResponseStatus listener', async function () {
        let dispatchMock = jest.fn();
        let onResponseStatusMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onResponseStatus: onResponseStatusMock,
            url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({status: 200, statusText: 'OK', json: () => ({})}));
        await submitter.submit();
        expect(onResponseStatusMock).toBeCalledWith(200, 'OK', dispatchMock);
    });

    it('should use initRequest option', async function () {
        let mockInitRequest = jest.fn().mockReturnValue({
            method: 'PUT',
            body: JSON.stringify({test: 'value'})
        } as RequestInit);
        const submitOptions: DefaultHttpSubmitOptions = {
            initRequest: mockInitRequest,
            url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(jest.fn(), rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => ({})}));
        await submitter.submit();
        expect(mockInitRequest).toBeCalledTimes(1);
    });


    it('should use parseResponse option', async function () {
        let mockParseResponse = jest.fn().mockReturnValue({response: 'value'});
        const submitOptions: DefaultHttpSubmitOptions = {
            parseResponse: mockParseResponse,
            url: 'https://test.com'
        };
        const submitter = new DefaultHttpSubmitService(jest.fn(), rootState, {submit: submitOptions});
        let mockFetchResponse = {test: 'response'};
        mockFetch.mockClear().mockReturnValue(Promise.resolve(mockFetchResponse));
        await submitter.submit();
        expect(mockParseResponse).toBeCalledWith(mockFetchResponse);
    });


    it('should send request with method/buildBody/contentType options', async function () {
        let dispatchMock = jest.fn();
        let buildBodyMock = jest.fn().mockReturnValue({test: 'value'});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            method: "PUT",
            contentType: 'test-content-type',
            keysMap: {dummy: 'dummyField'},
            asQuery: ['dummy'],
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalledWith('https://test.com/', {
            method: 'PUT', headers: {
                'Content-Type': 'test-content-type'
            }, body: {test: 'value'}
        });
        expect(buildBodyMock).toBeCalledWith(rootState, {dummy: 'dummyField'}, ['dummy']);
    });


    it('should send request with default method/buildBody/content-type', async function () {
        let dispatchMock = jest.fn();
        let buildBodyMock = jest.fn().mockReturnValue({test: 'value'});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalledWith('https://test.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: {test: 'value'}
        });
        expect(buildBodyMock).toBeCalledWith(rootState, httpSubmitOptionsDefaults.keysMap, httpSubmitOptionsDefaults.asQuery);
    });

    it('should use asQuery option to send data as query parameter', async function () {
        let dispatchMock = jest.fn();
        let buildBodyMock = jest.fn().mockReturnValue({});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            method: "PUT",
            asQuery: ['username'],
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalledWith(`https://test.com/?username=${rootState.fields.username.value}`, expect.anything());
    });

    it('should use asQuery option to send data as query parameter when method is GET,DELETE', async function () {
        async function assertOnMethod(method: string) {
            let dispatchMock = jest.fn();
            let buildBodyMock = jest.fn().mockReturnValue({});
            const submitOptions: DefaultHttpSubmitOptions = {
                url: 'https://test.com/',
                method: method as any,
                buildBody: buildBodyMock,
            };
            const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
            mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
            await submitter.submit();
            expect(mockFetch).toBeCalledWith(`https://test.com/?username=${rootState.fields.username.value}&password=${rootState.fields.password.value}`,
                expect.anything());
        }

        await assertOnMethod("GET");
        await assertOnMethod("DELETE");
    });

    it('should use keyMaps to generate body', async function () {
        const data = buildJsonBody(rootState, {username: 'USERNAME'});
        expect(data).toEqual(JSON.stringify({
            USERNAME: rootState.fields.username.value,
            password: rootState.fields.password.value
        }));
    });

    it('should skip fields (buildJsonBody)', async function () {
        const data = buildJsonBody(rootState, {username: 'USERNAME'}, ['password']);
        expect(data).toEqual(JSON.stringify({USERNAME: rootState.fields.username.value}));
    });

    it('should build json body (buildJsonBody)', async function () {
        const data = buildJsonBody(rootState, {});
        expect(data).toEqual(JSON.stringify({
            username: rootState.fields.username.value,
            password: rootState.fields.password.value
        }));
    });

    it('should build form data (buildFormData)', async function () {
        const data = buildFormData(rootState, {});
        const expected = new FormData();
        expected.append('username', rootState.fields.username.value);
        expected.append('password', rootState.fields.password.value);
        expect(data).toEqual(expected);
    });


    it('should use keyMaps in query params', async function () {
        let dispatchMock = jest.fn();
        let buildBodyMock = jest.fn().mockReturnValue({});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            asQuery: ['username'],
            keysMap: {username: 'USERNAME'},
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(dispatchMock, rootState, {submit: submitOptions});
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalledWith(`https://test.com/?USERNAME=${rootState.fields.username.value}`, expect.anything());
    });

});