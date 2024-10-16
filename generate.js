(async function () {
    const items = await fetchData();

    async function fetchData() {
        try {
            const response = await fetch("./items.csv");
            const csvData = await response.text();
            console.log("csvData:", csvData);
            const jsonData = csvToJson(csvData);
            console.log("jsonData:", jsonData);
            return jsonData;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function csvToJson(csv) {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(",");

            // Check if the number of values matches the number of headers
            if (currentLine.length !== headers.length) {
                continue;
            }

            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = currentLine[index].trim();
            });

            // Check if the object has any non-empty properties
            if (Object.values(obj).some((value) => value)) {
                result.push(obj);
            }
        }

        return result;
    }

    function groupByCategory(items) {
        return items.reduce((acc, item) => {
            const category = item.Kategorie;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});
    }

    const groupedItems = groupByCategory(items);

    const htmlContent = Object.keys(groupedItems)
        .map((category) => {
            const itemsHtml = groupedItems[category]
                .map((item) => {
                    const articleHtml =
                        item.Preis == "0.00"
                            ? `
                            <article class="item" style="margin-top: -0.25rem;">
                                <p class="product" style="font-size: 17px; padding-left: 1rem">${item.Produkt}</p>
                            </article>`
                            : `
                            <article class="item">
                                <p class="product">${item.Produkt}</p>
                                <p class="price">${item.Preis}</p>
                            </article>`;
                    return articleHtml;
                })
                .join("");
            return `
                <section>
                    <h2>${category}</h2>
                    ${itemsHtml}
                </section>`;
        })
        .join("");

    document.getElementById("itemsWrapper").innerHTML = htmlContent;
})();
