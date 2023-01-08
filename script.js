function upload() {
    let lbl = document.getElementById('users-data-lb');

    requestText().then(function (res) {
        lbl.innerHTML = res;
    })

    request().then(function (result) {
        let ranks = [];
        let counties = [];

        result.forEach(value => {
            ranks.push(value.rank);
            counties.push(value.country);
        });

        ranks.sort();
        let chrt = document.getElementById('chart1');
        var data = [{
            x: ranks,
            y: counties,
            type: "bar"  }];
        var layout = {title:"Chart 1"};

        Plotly.newPlot(chrt, data, layout);

        var data2 = [{
            x: ranks,
            y: counties,
            mode: "markers",
            type: "scatter"
        }];
        var l2 = {title:"Chart 2"};

        Plotly.newPlot(document.getElementById("chart2"), data2, l2);
    });
}

async function request() {
    let response = await fetch('https://my.api.mockaroo.com/users.json?key=30eedd50');

    if (response.ok)
        return await response.json();
    else
        throw new Error();
}

async function requestText() {
    let response = await fetch('https://my.api.mockaroo.com/users.json?key=30eedd50');

    if (response.ok)
        return await response.text();
    else
        throw new Error();
}