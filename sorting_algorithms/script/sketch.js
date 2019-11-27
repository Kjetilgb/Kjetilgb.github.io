/*
 * TODO Create 'classes' for each sorting algorithm.
 * TODO Needs to work with the 'states' array to put coloring on the visualizer.
 */

let values = []; // Array which are sorted by different algorithms
let w = 10; // Variable which helps set the size of the values-array
let button; // Just a button
let sel; // Just a selection

/*
 * Stores the color type for each value in values array
 * 1 = Green (Iterated on now)
 * 0 = Red (Being moved on / Compared)
 * -1 = White (Neutral state)
 */
let states = [];

// Resets the canvas and scrambles the array.
function reset(){
    setup();
}

/*
 * This is where all the visuals are created.
 */
function setup() {
    clear();
    createCanvas(windowWidth, windowHeight);
    values = new Array(floor(width / w));
    for(let i = 0; i < values.length; i++) {
        values[i] = random(height);
        states[i] = -1;
    }

    sel = createSelect(); // Dropdown-menu
    sel.position(10,10);
    sel.option('Bubble Sort');
    sel.option('Merge Sort');
    sel.option('Quick Sort');
    sel.option('Radix Sort');
    sel.option('Insertion Sort');
    sel.option('Selection Sort');
    sel.option('Cocktail Sort');
    sel.option('Shell Sort');
    button = createButton('Sort!'); // Button
    button.position(150, 10);
    button.mousePressed(runAlgo);
}

// Switch case function which takes a string from the dropdown menu
// which then starts the sorting algorithm that corresponds to that
function runAlgo() {
    switch(sel.value()) { // Current value in the drop-down menu.
        case "Bubble Sort":
            bubbleSort(values);
            break;
        case "Merge Sort":
            mergeSort();
            break;
        case "Quick Sort":
            quickSort(values, 0, values.length - 1);
            break;
        case "Radix Sort":
            radixSort();
            break;
        case "Insertion Sort":
            insertionSort(0, values.length);
            break;
        case "Selection Sort":
            selectionSort();
            break;
        case "Cocktail Sort":
            cocktailSort();
            break;
        case "Shell Sort":
            shellSort();
            break;
    }
}

// Draws the values from 'values' array on the canvas, as a graph.
function draw() {
    background(0);

    for(let i = 0; i < values.length; i++) {
        noStroke();
        if(states[i] === 0) {
            fill('#E0777D')
        } else if(states[i] === 1) {
            fill('#00E640')
        } else {
            fill(255);
        }
        strokeWeight(1);
        stroke(51);
        rect(i * w, height - values[i], w, values[i])
    }
}


// Rewrite InsertionSort for this sorting algorithm to work.
// TODO
function timSort(){
    console.log("WORK IN PROGRESS");
    let run = 32;

    for(let i = 0; i < values.length; i += run) {
        insertionSort(i, Math.min((i+31), (values.length-1)));
    }

    for(let size = run; size < values.length; size = 2 * size) {
        for(let left = 0; left < values.length; left += 2 * size) {
            let mid = left + size -1;
            let right = Math.min((left + 2 * size - 1), (values.length - 1));
            merge(values, left, mid, right)
        }
    }
}

/*
 * Shell sort function
 */
async function shellSort() {
    let increment = values.length / 2;

    while(increment > 0) {
        for(let i = increment; i < values.length; i++) {
            states[i] = 1;
            let j = i;
            let temp = values[i];

            while(j >= increment && values[j-increment] > temp) {
                states[j] = 0;
                states[j-increment] = 0;
                await sleep(60);
                values[j] = values[j-increment];
                states[j-increment] = -1;
                states[j] = -1;
                j = j - increment;
            }
            values[j] = temp;
            states[i] = -1;
        }

        if(increment === 2) {
            increment = 1;
        } else {
            increment = parseInt((increment * 5) / 11)
        }
    }
    // Colors all values green after sorting is complete
    for(let i = 0; i < values.length; i++) {
        await sleep(10);
        states[i] = 1;
    }
}

/*
 * Cocktail/Shaker sort.
 */
async function cocktailSort() {
    let swapped = true;
    let start = 0;
    let end = values.length;

    while(swapped) {
        swapped = false;

        for(let i = start; i < end - 1; i++) {
            states[i] = 1;
            await sleep(10);
            if(values[i] > values[i+1]) {
                let temp = values[i];
                values[i] = values[i+1];
                values[i+1] = temp;
                swapped = true;
            }
            states[i] = -1;
        }

        if(!swapped) {
            break;
        }

        swapped = false;

        end = end - 1;

        for(let i = end - 1; i >= start; i--) {
            states[i] = 1;
            await sleep(10);
            if(values[i] > values[i+1]) {
                let temp = values[i];
                values[i] = values[i+1];
                values[i+1] = temp;
                swapped = true;
            }
            states[i] = -1;
        }
        start = start + 1;
    }
    // Colors all values green after sorting is complete
    for(let i = 0; i < values.length; i++) {
        await sleep(10);
        states[i] = 1;
    }
}

/*
 * Bubble sort.
 */
async function bubbleSort(list) {
    let length = list.length;
    let swapped;
    do {
        swapped = false;
        for(let i = 0; i < length; i++) {
            await sleep(10);
            if(list[i] > list[i + 1]) {
                let temp = list[i];
                list[i] = list[i + 1];
                list[i+1] = temp;
                swapped = true;
            }
            states[i] = -1;
            states[i+1] = 1;
        }
    } while (swapped);
    // Colors all values green after sorting is complete
    for(let i = 0; i < values.length; i++) {
        await sleep(10);
        states[i] = 1;
    }
}

async function selectionSort() {
    let len = values.length;

    for(let i = 0; i < len-1; i = i+1) {
        let j_min = i;
        for(let j = i + 1; j < len; j = j+1) {
            states[j] = 0;
            if(values[j] < values[j_min]) {
                await sleep(100);
                j_min = j;
                states[j_min] = 0;
            }
            states[j] = -1;
        }
        if(j_min !== i) {
            await sleep(10);
            states[j_min] = -1;
            states[i] = 1;
            states[i-1] = -1;
            let temp = values[i];
            values[i] = values[j_min];
            values[j_min] = temp;
        }
        states[i] = 1;
        states[i-1] = -1;
    }
    states[len-2] = -1;
    // Colors all the values green after sorting is complete
    for(let i = 0; i < len; i++) {
        await sleep(5);
        states[i] = 1;
    }
}

// TODO Rewrite so that Timsort can work.
// TODO add 'left' and 'right' arguments and merge them into existing code.
// TODO Rewrite insertion sort so that the sorting works (https://www.geeksforgeeks.org/timsort/)
async function insertionSort(left, right) {

    for(let i = left; i < right; i++) {
        let temp = values[i];
        let j;
        for(j = i - 1; j >= 0 && values[j] >= temp; j--) {
            states[j] = 1;
            states[j-1] = 0;
            await sleep(10);
            values[j+1] = values[j];
            states[j+1] = -1;
        }
        states[j-1] = -1;
        states[j] = -1;
        states[j+1] = -1;
        values[j+1] = temp;
    }
    // Colors all the values green after sorting is complete
    for(let i = 0; i < values.length; i++) {
        await sleep(2);
        states[i] = 1;
    }
}

let counter = [
    []
];
async function radixSort() {
    let max = 0,
        mod = 10,
        dev = 1; //max

    for (let i = 0; i < values.length; i++) {
        if (values[i] > max) {
            max = values[i];
        }
    }
    // determine the large item length
    let maxDigitLength = (max + '').length;
    for (let i = 0; i < maxDigitLength; i++, dev *= 10, mod *= 10) {
        for (let j = 0; j < values.length; j++) {
            let bucket = Math.floor((values[j] % mod) / dev); // Formula to get the significant digit
            if (counter[bucket] === undefined) {
                counter[bucket] = [];
            }

            counter[bucket].push(values[j]);
        }
        let pos = 0;
        for (let j = 0; j < counter.length; j++) {
            let value = undefined;
            if (counter[j] !== undefined) {
                // TODO It sorts fine, but are stuck in the while-loop for some time
                while ((value = counter[j].shift()) !== undefined) {
                    states[pos] = 1;
                    await sleep(10);
                    states[pos] = -1;
                    values[pos++] = value;
                }
            }
        }
    }
    console.log("out of while-loop");
}

async function mergeSort() {

    let n = values.length;
    let curr_size;
    let left_start;

    for(curr_size = 1; curr_size <= n-1; curr_size = 2*curr_size) {
        await sleep(50);
        for(left_start = 0; left_start < n-1; left_start += 2*curr_size) {
            await sleep(50);
            let mid = Math.min(left_start + curr_size - 1, n-1);
            let right_end = Math.min(left_start + 2 * curr_size - 1, n-1);
            merge(values, left_start, mid, right_end);
        }
    }
}

function merge(arr, l, m, r) {
    let i, j, k;
    let n1 = m - l + 1;
    let n2 = r - m;

    let temp1 = [];
    let temp2 = [];

    for(i = 0; i < n1; i++) {
        temp1[i] = arr[l + i];
    }
    for(j = 0; j < n2; j++) {
        temp2[j] = arr[m + 1 + j];
    }

    i = 0;
    j = 0;
    k = l;

    while(i < n1 && j < n2) {
        if(temp1[i] <= temp2[j]) {
            arr[k] = temp1[i];
            i++;
        } else {
            arr[k] = temp2[j];
            j++;
        }
        k++;
    }

    while(i < n1) {
        arr[k] = temp1[i];
        i++;
        k++;
    }
    while(j < n2) {
        arr[k] = temp2[j];
        j++;
        k++;
    }
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
    // Colors all values green after sorting is complete
    for(let i = 0; i < values.length; i++) {
        await sleep(10);
        states[i] = 1;
    }
}

async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }

    return pivotIndex;
}

async function swap(arr, a, b) {
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// Function that makes the program able to visualize the sorting.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
