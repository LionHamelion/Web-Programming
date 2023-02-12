const pancakesEl = document.getElementById("pancakes");
const inputEl = document.getElementById("arrayInput");
const sortEl = document.getElementById("sort");

function flip(array, index) {
    const flipped = array.slice(0, index + 1).reverse();
    for (let i = 0; i <= index; i++) {
        array[i] = flipped[i];
    }
    displayPancakes(array, index);
    return array;
}

function pancakeSort(array) {
    for (let i = array.length - 1; i >= 1; i--) {
        let maxIndex = 0;
        for (let j = 1; j <= i; j++) {
            if (array[j] > array[maxIndex]) {
                maxIndex = j;
            }
        }
        if (maxIndex !== i) {
            array = flip(array, maxIndex);
            array = flip(array, i);
        }
    }
    return array;
}

function arrayParser(input) {
    text = input.value
    pancakes = text.split(' ').map(function(item) {
    return parseInt(item, 10);
});
    return pancakes
}

function displayPancakes(pancakes, changed) {
    let html = "";
    for (var i = 0; i <= pancakes.length - 1; i++) {
        if (i <= changed) {
            color = "brown";
        } else {
            color = "black";
        }
        html += `<div style="display: inline-block; width: 3vh; height: ${pancakes[i] *
        1}vh; background-color: ${color};"></div>`;
    }
    pancakesEl.innerHTML += "<div>" + html + "</div>";
}

sortEl.addEventListener("click", function () {
    pancakesEl.innerHTML = ""
    data = arrayParser(inputEl)
    displayPancakes(data, -1);
    pancakeSort(data)
});