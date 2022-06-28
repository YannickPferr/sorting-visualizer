import { AnimationTypes } from './AnimationTypes';

let animations = [];
export const quicksortAnimations = (list, rec = true) => {
    animations = [];
    return [quicksort(list), animations];
};

export const quicksort = (list, rec = true) => {
    if (rec) return quicksortRec(list);
    else return quicksortIt(list);
};

const quicksortRec = (list, start = 0, end = list.length - 1) => {
    if (end <= start) return list;
    let partIdx = partition(list, start, end);
    quicksortRec(list, start, partIdx - 1);
    quicksortRec(list, partIdx + 1, end);
    return list;
};

const quicksortIt = (list) => {
    const stack = [];
    stack.push([0, list.length - 1]);
    while (stack.length > 0) {
        let [l, r] = stack.pop();
        let partIdx = partition(list, l, r);
        if (partIdx + 1 < r) stack.push([partIdx + 1, r]);
        if (l < partIdx - 1) stack.push([l, partIdx - 1]);
    }
    return list;
};

const swap = (list, l, r) => {
    let temp = list[l];
    list[l] = list[r];
    list[r] = temp;
};

const randomPivot = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1) + start);
};

const partition = (list, start, end) => {
    let pivotIndex = Math.floor((start + end) / 2);
    //let pivotIndex = randomPivot(start, end);
    animations.push({
        type: AnimationTypes.PIVOT,
        pivotIndex,
        pivotIndex,
    });
    animations.push({ type: AnimationTypes.SWAP, i: pivotIndex, j: end });
    swap(list, pivotIndex, end);
    let pivot = list[end];
    let i = start;
    let j = end - 1;
    while (i <= j) {
        if (list[i] < pivot) {
            animations.push({
                type: AnimationTypes.PIVOT_COMPARE,
                i,
                j,
                pivotIndex: end,
            });
            i++;
            continue;
        }

        if (list[j] > pivot) {
            animations.push({
                type: AnimationTypes.PIVOT_COMPARE,
                i,
                j,
                pivotIndex: end,
            });
            j--;
            continue;
        }
        animations.push({
            type: AnimationTypes.PIVOT_COMPARE,
            i,
            j,
            pivotIndex: end,
        });
        animations.push({
            type: AnimationTypes.PIVOT_SWAP_FOUND,
            i,
            j,
            pivotIndex: end,
        });
        animations.push({
            type: AnimationTypes.PIVOT_SWAP,
            i,
            j,
            pivotIndex: end,
        });
        swap(list, i, j);
        i++;
        j--;
    }
    animations.push({ type: AnimationTypes.SWAP, i, j: end });
    swap(list, i, end);
    return i;
};

//slower than while!
const partitionFor = (list, start, end) => {
    let pivotIndex = Math.floor((start + end) / 2);
    //let pivotIndex = randomPivot(start, end);
    swap(list, pivotIndex, end);
    let pivot = list[end];
    let i = start;
    for (let j = start; j < end; j++) {
        if (list[j] < pivot) {
            swap(list, i, j);
            i++;
        }
    }
    swap(list, i, end);
    return i;
};
