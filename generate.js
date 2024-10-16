/*
const template = `
    <article class="item">
        <p class="product">${product}</p><p class="price">${price}</p>
    </article>
`;
*/
/*
const fs = require('fs');
const papa = require('papaparse');
const file = fs.createReadStream('items.csv');
var count = 0; // cache the running count
papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big file
    step: function(result) {
        // do stuff with result
    },
    complete: function(results, file) {
        console.log('parsing complete read', count, 'records.'); 
    }
});
*/
/*
let fr = new FileReader();
fr.onload = receivedText;
fr.readAsText("./items.csv");

function receivedText() {
    console.log(fr.result);
}
*/

const response = await fetch('items.csv');
const data = await response.text();

console.log(data);
