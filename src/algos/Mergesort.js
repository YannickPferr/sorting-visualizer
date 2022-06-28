const animations = [];

export const mergesortAnimations = (list) => {
    animations = [];
    return [mergesort(list), animations];
};

export const mergesort = (list) => {
    if (list.length === 1) return list;
    if (list.length === 2) {
        if (list[0] <= list[1]) return list;

        return [list[1], list[0]];
    }

    let left = mergesort(list.slice(0, list.length / 2));
    let right = mergesort(list.slice(list.length / 2, list.length));
    return union(left, right);
};

const union = (left, right) => {
    let union = [];
    let l = 0;
    let r = 0;
    for (let i = 0; i < left.length + right.length; i++) {
        if (l >= left.length) union.push(right[r++]);
        else if (r >= right.length) union.push(left[l++]);
        else union.push(left[l] <= right[r] ? left[l++] : right[r++]);
    }
    return union;
};
