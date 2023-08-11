import {
    checkboxValueSelector,
    filesValueSelector,
    singleFileSelector,
    textValueSelector,
} from '../../../Field/ValueSelector';

describe('Value Selector', () => {
    it('should select value from input (textValueSelector)', () => {
        const value = textValueSelector({target: {value: 'test-value'}});
        expect(value).toEqual('test-value');
    });

    it('should select value from checkbox (checkboxValueSelector)', () => {
        const value = checkboxValueSelector({target: {checked: true}});
        expect(value).toEqual(true);
    });

    it('should select files (filesValueSelector)', () => {
        const mockedFiles = ['file1', 'file2'];
        const value = filesValueSelector({target: {files: mockedFiles}});
        expect(value).toEqual(mockedFiles);
    });

    it('should select single file (singleFileSelector)', () => {
        const mockedFiles = ['file1', 'file2'];
        const value = singleFileSelector({target: {files: mockedFiles}});
        expect(value).toEqual('file1');
    });

    it('should return undefined when files are empty or null or undefined (singleFileSelector)', () => {
        let value = singleFileSelector({target: {files: undefined}});
        expect(value).toEqual(undefined);
        value = singleFileSelector({target: {files: null}});
        expect(value).toEqual(undefined);
        value = singleFileSelector({target: {files: []}});
        expect(value).toEqual(undefined);
    });
});
