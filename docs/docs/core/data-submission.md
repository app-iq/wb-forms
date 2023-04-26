---
sidebar_position: 6
---

# Data Submission

after all, we need to submit form data somewhere, for example to an http server or graphql server, or firebase database, so that we provided you with `SubmitService` to handle that.

the submit service is created via the service factory, by default we create `DefaultHttpSubmitService` which uses `fetch` to send the http request.

## Default Implementation (DefaultHttpSubmitService)

if decided to use the default submit service, you will only need add the submit options to the form props:

    <Form serviceOptions={{
        submit: {
            url: 'http://my-server.com/'
        }
    }}>
        ...
    </Form>

| option        | description                                                                                                                                                              | default                                  |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| url           | url where to send the http request                                                                                                                                       | `/`                                      |
| method        | http method                                                                                                                                                              | POST                                     |
| contentType   | content type header                                                                                                                                                      | application/json                         |
| initRequest   | a function to return the request that will be used by `fetch` function, the type of the function is: `(request:RequestInit,rootState:State) => RequestInit`              | undefined                                |
| parseResponse | a function that will be used to parse the response that returned by `fetch`                                                                                              | `(response:Response) => response.json()` |
| buildBody     | a function to build the body from the form data, the type of the function is `(state:State, keysMap:{ [fieldName:string]: string}, skipFields:string[]) => any`          | a function to build data as a json       |
| asQuery       | an array of field names to indicate which fields should be sent in the query instead of the body                                                                         | empty array                              |
| keysMap       | an object that will be used to change the name of field when sending the data, for example you have a field with the name "birthdate" but you want to send it as "date"  | empty object                             |
| onSuccess | a callback function that will be called when the request completes successfully, the callback will receive `response` and `dispatch` | undefined |
| onFail | a callback function that will be called when the request fails, the callback will receive `error` and `dispatch` | undefined |
| onComplete | a callback function that will be called when the request completes, even if it fails or succeed, the callback will receive `dispatch` | undefined |