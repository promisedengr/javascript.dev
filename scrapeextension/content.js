function doScrape(saveFormat) {
    if(!window.location.href.includes("partscheck.com.au")) {
        alert("Url does not contain partscheck.com.au");
        return;
    }

    let partNumbers = "";
    let partNumbersArr = [];

    var partNumInputs = document.getElementsByClassName('partNr');
    for (let index = 0; index < partNumInputs.length; index++) {
        const element = partNumInputs[index];
        let partNumber = element.value;

        partNumber = partNumber.replace(" ", "");
        partNumber = partNumber.replace("-", "");

        partNumbers += partNumber + '\n';
        partNumbersArr.push([partNumber]);
    }

    console.log(saveFormat)
    if(saveFormat == "csv") {
        downloadCSV("PCIBC", partNumbersArr);
    } else {
        downloadTXT(partNumbers, "PCIBC", "txt");
    }
}

function downloadCSV(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function downloadTXT(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

chrome.runtime.onMessage.addListener( // this is the message listener
    function(request, sender, sendResponse) {
        if (request.message === "scrape") {
            doScrape(request.saveFormat)
        }
    }
);