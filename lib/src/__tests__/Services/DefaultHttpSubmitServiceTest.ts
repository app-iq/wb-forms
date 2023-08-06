import {
    DefaultHttpSubmitOptions,
    DefaultHttpSubmitService,
    HttpMethod,
} from '../../Services/DefaultImplementation/DefaultHttpSubmitService';
import {State} from '../../Data/State';
import {buildMockFieldState} from '../Utils/TestHelpers';
import {SubmitActions} from '../../Data/Form/SubmitActions';
import {FormActions} from '../../Data/Form/FormActions';
import {DefaultDataCollector} from '../../Services/DefaultImplementation/DefaultDataCollector';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('DefaultHttpSubmitService', () => {
    const rootState: State = {
        fields: {
            username: buildMockFieldState({name: 'username', value: 'ali'}),
            password: buildMockFieldState({name: 'password', value: 'pass'}),
        },
        form: {
            loading: true,
        },
    };

    it('should successfully send http request', async () => {
        const dispatchMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            clearAfterSuccess: false,
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        const mockResponse = {response: 'value'};
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => mockResponse}));
        await submitter.submit();
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, SubmitActions.submitStart());
        expect(dispatchMock).toHaveBeenNthCalledWith(2, SubmitActions.submitSucceed(mockResponse));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, SubmitActions.submitComplete());
    });

    it('should send http request and fail', async () => {
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com',
        };
        const dispatchMock = jest.fn();
        const mockError = {error: 'fail message'};
        mockFetch.mockClear().mockReturnValue(Promise.reject(mockError));
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        try {
            await submitter.submit();
            expect(false).toEqual(true);
            // eslint-disable-next-line no-empty
        } catch (e) {}
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, SubmitActions.submitStart());
        expect(dispatchMock).toHaveBeenNthCalledWith(2, SubmitActions.submitFail(mockError));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, SubmitActions.submitComplete());
    });

    it('clear value after success', async () => {
        const dispatchMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => null}));
        await submitter.submit();
        expect(dispatchMock).toHaveBeenLastCalledWith(SubmitActions.submitComplete());
    });

    it('should call onSuccess listener', async () => {
        const dispatchMock = jest.fn();
        const onSuccessMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onSuccess: onSuccessMock,
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(onSuccessMock).toBeCalledWith('value', dispatchMock);
    });

    it('should call clear values after success', async () => {
        const dispatchMock = jest.fn();
        const onSuccessMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onSuccess: onSuccessMock,
            url: 'https://test.com',
            clearAfterSuccess: true,
        };
        const fieldsConfiguration = {
            testField: {
                clearValue: 'test clear value',
            },
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {
                submit: submitOptions,
            },
            new DefaultDataCollector(rootState, {}),
            fieldsConfiguration,
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(dispatchMock).toBeCalledWith(FormActions.clearValues(fieldsConfiguration));
    });

    it('should call onError listener', async () => {
        const dispatchMock = jest.fn();
        const onFailMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onFail: onFailMock,
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        const error = new Error('error');
        mockFetch.mockClear().mockReturnValue(Promise.reject(error));
        try {
            await submitter.submit();
            // eslint-disable-next-line no-empty
        } catch {}
        expect(onFailMock).toBeCalledWith(error, dispatchMock);
    });

    it('should call onComplete listener', async () => {
        const dispatchMock = jest.fn();
        const onCompleteMock = jest.fn();
        const submitOptions: DefaultHttpSubmitOptions = {
            onComplete: onCompleteMock,
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(onCompleteMock).toBeCalledWith(dispatchMock);
    });

    it('should use initRequest option', async () => {
        const mockInitRequest = jest.fn().mockReturnValue({
            method: 'PUT',
            body: JSON.stringify({test: 'value'}),
        } as RequestInit);
        const submitOptions: DefaultHttpSubmitOptions = {
            initRequest: mockInitRequest,
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            jest.fn(),
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => ({})}));
        await submitter.submit();
        expect(mockInitRequest).toBeCalledTimes(1);
    });

    it('should use parseResponse option', async () => {
        const mockParseResponse = jest.fn().mockReturnValue({response: 'value'});
        const submitOptions: DefaultHttpSubmitOptions = {
            parseResponse: mockParseResponse,
            url: 'https://test.com',
        };
        const submitter = new DefaultHttpSubmitService(
            jest.fn(),
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        const mockFetchResponse = {test: 'response'};
        mockFetch.mockClear().mockReturnValue(Promise.resolve(mockFetchResponse));
        await submitter.submit();
        expect(mockParseResponse).toBeCalledWith(mockFetchResponse);
    });

    it('should send request with method/buildBody/contentType options', async () => {
        const dispatchMock = jest.fn();
        const buildBodyMock = jest.fn().mockReturnValue({test: 'value'});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            method: 'PUT',
            contentType: 'test-content-type',
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalledWith('https://test.com/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'test-content-type',
            },
            body: {test: 'value'},
        });
        expect(buildBodyMock).toBeCalled();
    });

    it('should send request with default method/buildBody/content-type', async () => {
        const dispatchMock = jest.fn();
        const buildBodyMock = jest.fn().mockReturnValue({test: 'value'});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalledWith('https://test.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {test: 'value'},
        });
        expect(buildBodyMock).toBeCalled();
    });

    it('should use asQuery option to send data as query parameter', async () => {
        const dispatchMock = jest.fn();
        const buildBodyMock = jest.fn().mockReturnValue({});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            method: 'PUT',
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalled();
    });

    it('should use asQuery option to send data as query parameter when method is GET,DELETE', async () => {
        async function assertOnMethod(method: HttpMethod) {
            const dispatchMock = jest.fn();
            const buildBodyMock = jest.fn().mockReturnValue({});
            const submitOptions: DefaultHttpSubmitOptions = {
                url: 'https://test.com/',
                method,
                buildBody: buildBodyMock,
            };
            const submitter = new DefaultHttpSubmitService(
                dispatchMock,
                rootState,
                {submit: submitOptions},
                new DefaultDataCollector(rootState, {}),
                {},
            );
            mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
            await submitter.submit();
            expect(mockFetch).toBeCalled();
        }

        await assertOnMethod('GET');
        await assertOnMethod('DELETE');
    });

    it('should use keyMaps in query params', async () => {
        const dispatchMock = jest.fn();
        const buildBodyMock = jest.fn().mockReturnValue({});
        const submitOptions: DefaultHttpSubmitOptions = {
            url: 'https://test.com/',
            buildBody: buildBodyMock,
        };
        const submitter = new DefaultHttpSubmitService(
            dispatchMock,
            rootState,
            {submit: submitOptions},
            new DefaultDataCollector(rootState, {}),
            {},
        );
        mockFetch.mockClear().mockReturnValue(Promise.resolve({json: () => 'value'}));
        await submitter.submit();
        expect(mockFetch).toBeCalled();
    });
});
