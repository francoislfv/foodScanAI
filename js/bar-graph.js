let labels = [];
let bars = {};
let graphWrapper;

let colors = ['#E67701', '#D84C6F', '#794AEF', '#1291D0'];
let lightColors = ['#FFECE2', '#FFE9EC', '#F1F0FF', '#E2F5FF'];

export async function setupBarGraph(URL) {
    const metadataURL = `${URL}metadata.json`;
    const response = await fetch(metadataURL);
    const json = await response.json();
    labels = json.labels;
    graphWrapper = document.getElementById('graph-wrapper');
    labels.forEach((label, index) => makeBar(label, index));
}

function makeBar(label, index) {
    let barWrapper = document.createElement('div');
    let barEl = document.createElement('progress');
    let percentEl = document.createElement('span');
    let labelEl = document.createElement('span');
    labelEl.innerText = label;

    barWrapper.appendChild(labelEl);
    barWrapper.appendChild(barEl);
    barWrapper.appendChild(percentEl);
    let graphWrapper = document.getElementById('graph-wrapper');
    graphWrapper.appendChild(barWrapper);

    let color = colors[index % colors.length];
    let lightColor = lightColors[index % colors.length];
    barWrapper.style.color = color;
    barWrapper.style.setProperty('--color', color);
    barWrapper.style.setProperty('--color-light', lightColor);

    bars[label] = {
        bar: barEl,
        percent: percentEl
    };
}

export function updateBarGraph(data) {
    console.log("Predictions: ", data);
    data.forEach(({ className, probability }) => {
        let barElements = bars[className];
        if (barElements) {
            let barElement = barElements.bar;
            let percentElement = barElements.percent;
            barElement.value = probability;
            percentElement.innerText = convertToPercent(probability);
        }
    });
}




function convertToPercent(num) {
    num *= 100;
    num = Math.round(num);
    return `${num}%`;
}