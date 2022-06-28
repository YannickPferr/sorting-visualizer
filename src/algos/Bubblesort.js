import { AnimationTypes } from './AnimationTypes';

let animations = [];
export const bubblesortAnimations = (list) => {
    animations = [];
    return [bubblesort(list), animations];
};

export const bubblesort = (list) => {
    for (let j = list.length - 1; j >= 0; j--)
        for (let i = 1; i <= j; i++) {
            animations.push({ type: AnimationTypes.COMPARE, i, j: i - 1 });
            if (list[i] < list[i - 1]) {
                animations.push({
                    type: AnimationTypes.SWAP_FOUND,
                    i,
                    j: i - 1,
                });
                animations.push({ type: AnimationTypes.SWAP, i, j: i - 1 });
                swap(list, i, i - 1);
            }
        }
    return list;
};

const swap = (list, l, r) => {
    let temp = list[l];
    list[l] = list[r];
    list[r] = temp;
};
