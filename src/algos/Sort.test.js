import { bubblesort } from './Bubblesort';
import { mergesort } from './Mergesort';
import { quicksort } from './Quicksort';

const length = 10;
const l = Array.from({ length }, () => Math.floor(Math.random() * 40));
describe('Sorting tests', () => {
    test('Test Mergesort', () => {
        const list = [...l];
        const list1 = mergesort(list);
        const list2 = [...list].sort((a, b) => a - b);
        expect(list1).toEqual(list2);
    });

    test('Test Quicksort Rec', () => {
        const list = [...l];
        const list1 = quicksort(list);
        const list2 = [...list].sort((a, b) => a - b);
        expect(list1).toEqual(list2);
    });

    test('Test Quicksort It', () => {
        const list = [...l];
        const list1 = quicksort(list, false);
        const list2 = [...list].sort((a, b) => a - b);
        expect(list1).toEqual(list2);
    });

    test('Test Bubblesort', () => {
        const list = [...l];
        const list1 = bubblesort(list);
        const list2 = [...list].sort((a, b) => a - b);
        expect(list1).toEqual(list2);
    });
});
