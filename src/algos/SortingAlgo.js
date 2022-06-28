import { bubblesort, bubblesortAnimations } from './Bubblesort';
import { mergesort, mergesortAnimations } from './Mergesort';
import { quicksort, quicksortAnimations } from './Quicksort';

const sortingAlgos = {
    mergesort: { sort: mergesort, getAnimations: mergesortAnimations },
    quicksort: { sort: quicksort, getAnimations: quicksortAnimations },
    bubblesort: { sort: bubblesort, getAnimations: bubblesortAnimations },
};

export const getSortingAlgoById = (id) => {
    if (id in sortingAlgos) return sortingAlgos[id];
};
