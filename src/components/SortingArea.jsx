import { useEffect, useMemo, useState } from 'react';
import { AnimationTypes } from '../algos/AnimationTypes';
import { getSortingAlgoById } from '../algos/SortingAlgo';
import './SortingArea.styles.css';

const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
};

export const SortingArea = ({}) => {
    const DEFAULT_LIST_SIZE = 10;
    const DEFAULT_SORTING_SPEED = 250;

    const ALGOS = [
        { id: 'quicksort', label: 'Quicksort' },
        { id: 'mergesort', label: 'Mergesort' },
        { id: 'bubblesort', label: 'Bubblesort' },
    ];

    const [list, setList] = useState(
        Array.from({ length: DEFAULT_LIST_SIZE }, () =>
            Math.floor(Math.random() * (500 - 30 + 1) + 30)
        )
    );
    const [sortingAlgo, setSortingAlgo] = useState(ALGOS[0].id);
    const [numElements, setNumElements] = useState(DEFAULT_LIST_SIZE);
    const [sortingSpeed, setSortingSpeed] = useState(DEFAULT_SORTING_SPEED);
    const [animationStep, setAnimationStep] = useState(0);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        generateNewRandomList();
    }, [numElements]);

    const [sortedList, animations] = useMemo(
        () => getSortingAlgoById(sortingAlgo).getAnimations([...list]),
        [list, sortingAlgo]
    );

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (animationStep >= 1) sortStep();
        else {
            const bars = document.getElementsByClassName('bar');
            for (let i = 0; i < list.length; i++)
                bars[i].style.backgroundColor = 'red';
        }
    }, [animationStep]);

    const handleChange = (event) => {
        const id = event.target.value;
        setSortingAlgo(id);
    };

    const generateNewRandomList = () => {
        setList(
            Array.from({ length: numElements }, () =>
                Math.floor(Math.random() * (500 - 30 + 1) + 30)
            )
        );
        setAnimationStep(0);
    };

    const swap = (bar, l, r) => {
        let temp = bar[l].style.height;
        bar[l].style.height = bar[r].style.height;
        bar[r].style.height = temp;
    };

    const sortStep = () => {
        const bars = document.getElementsByClassName('bar');
        if (animationStep < animations.length) {
            const animation = animations[animationStep];
            const prevAnimation = animations[animationStep - 1];
            console.log(animation);
            console.log(prevAnimation);
            setTimeout(() => {
                //remove colors of last animation
                if (
                    prevAnimation &&
                    prevAnimation.type !== AnimationTypes.SPLIT
                ) {
                    for (let index in prevAnimation)
                        if (index !== 'type')
                            bars[prevAnimation[index]].style.backgroundColor =
                                'red';
                }

                if (animation.type == AnimationTypes.COMPARE) {
                    bars[animation.i].style.backgroundColor = 'dodgerblue';
                    bars[animation.j].style.backgroundColor = 'dodgerblue';
                } else if (animation.type == AnimationTypes.SWAP_FOUND) {
                    bars[animation.i].style.backgroundColor = 'purple';
                    bars[animation.j].style.backgroundColor = 'purple';
                } else if (animation.type == AnimationTypes.SWAP) {
                    bars[animation.i].style.backgroundColor = 'purple';
                    bars[animation.j].style.backgroundColor = 'purple';
                    swap(bars, animation.i, animation.j);
                } else if (animation.type == AnimationTypes.PIVOT) {
                    bars[animation.pivotIndex].style.backgroundColor = 'blue';
                } else if (animation.type == AnimationTypes.PIVOT_COMPARE) {
                    bars[animation.i].style.backgroundColor = 'dodgerblue';
                    bars[animation.j].style.backgroundColor = 'dodgerblue';
                    bars[animation.pivotIndex].style.backgroundColor = 'blue';
                } else if (animation.type == AnimationTypes.PIVOT_SWAP_FOUND) {
                    bars[animation.i].style.backgroundColor = 'purple';
                    bars[animation.j].style.backgroundColor = 'purple';
                    bars[animation.pivotIndex].style.backgroundColor = 'blue';
                } else if (animation.type == AnimationTypes.PIVOT_SWAP) {
                    bars[animation.i].style.backgroundColor = 'purple';
                    bars[animation.j].style.backgroundColor = 'purple';
                    bars[animation.pivotIndex].style.backgroundColor = 'blue';
                    swap(bars, animation.i, animation.j);
                } else if (animation.type == AnimationTypes.SPLIT) {
                    for (let i = animation.left[0]; i < animation.left[1]; i++)
                        bars[i].style.backgroundColor = 'purple';
                    for (
                        let i = animation.right[0];
                        i < animation.right[1];
                        i++
                    ) {
                        console.log(i + ' ' + bars[i]);
                        bars[i].style.backgroundColor = 'blue';
                    }
                }
                setAnimationStep(animationStep + 1);
            }, sortingSpeed);
        } else {
            for (let i = 0; i < list.length; i++)
                bars[i].style.backgroundColor = 'green';
        }
    };

    return (
        <div>
            <div>
                <label>Number of elements: </label>
                <input
                    type="number"
                    value={numElements}
                    onChange={(e) => setNumElements(parseInt(e.target.value))}
                ></input>
            </div>
            <div>
                <label>Sorting algo: </label>
                <select onChange={handleChange}>
                    {ALGOS?.map((algo, index) => (
                        <option value={algo.id} key={index}>
                            {algo.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sorting speed (ms per step): </label>
                <input
                    type="number"
                    value={sortingSpeed}
                    onChange={(e) => setSortingSpeed(e.target.value)}
                ></input>
            </div>
            <div>
                <button onClick={generateNewRandomList}>
                    Generate new list
                </button>
                <button onClick={sortStep}>Sort</button>
            </div>
            <div className="chart">
                {list &&
                    list.map((el, index) => (
                        <div
                            key={index}
                            className="bar"
                            style={{
                                height: `${el}px`,
                                width: `${
                                    windowSize.innerWidth / list.length - 1
                                }px`,
                            }}
                        ></div>
                    ))}
            </div>
        </div>
    );
};
