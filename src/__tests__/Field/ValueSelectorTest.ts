import {
    checkboxValueSelector,
    filesValueSelector,
    singleFileSelector,
    textValueSelector
} from "../../Field/ValueSelector";

describe('Value Selector', () => {
    it('should select value from input (textValueSelector)', () => {
        const value = textValueSelector({target: {value: 'test-value'}}, {} as any);
        expect(value).toEqual('test-value');
    });

    it('should select value from checkbox (checkboxValueSelector)', () => {
        const value = checkboxValueSelector({target: {checked: true}}, {} as any);
        expect(value).toEqual(true);
    });


    it('should select files (filesValueSelector)', () => {
        let mockedFiles = ['file1', 'file2'];
        const value = filesValueSelector({target: {files: mockedFiles}}, {} as any);
        expect(value).toEqual(mockedFiles);
    });


    it('should select single file (singleFileSelector)', () => {
        let mockedFiles = ['file1', 'file2'];
        const value = singleFileSelector({target: {files: mockedFiles}}, {} as any);
        expect(value).toEqual('file1');
    });


    it('should return undefined when files are empty or null or undefined (singleFileSelector)', () => {
        let value = singleFileSelector({target: {files: undefined}}, {} as any);
        expect(value).toEqual(undefined);
        value = singleFileSelector({target: {files: null}}, {} as any);
        expect(value).toEqual(undefined);
        value = singleFileSelector({target: {files: []}}, {} as any);
        expect(value).toEqual(undefined);
    });

});