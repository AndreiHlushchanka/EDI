function upload() {
    let lbl = document.getElementById('users-data-lb');


    request().then(function (result) {
        let tableLayout = '<h1 style="color: white">Output data:</h1><table>\n' +
            '   <tr>\n' +
            '    <th>ID</th>\n' +
            '    <th>First name</th>\n' +
            '    <th>Last name</th>\n' +
            '    <th>Nickname</th>\n' +
            '    <th>Country</th>\n' +
            '    <th>Rank</th>\n' +
            '    <th>Gender</th>\n' +
            '   </tr>\n';

        result.forEach(value => {
            tableLayout = tableLayout + '<tr><td>' + value.id + '</td>\n' + '<td>' + value.first_name + '</td>\n'
                + '<td>' + value.last_name + '</td>\n' + '<td>' + value.nickname + '</td>\n' + '<td>' + value.country + '</td>\n'
                + '<td>' + value.rank + '</td>\n' + '<td>' + value.gender + '</td></tr>\n';
        });

        tableLayout = tableLayout + '</table>';

        lbl.innerHTML = tableLayout;

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
        var layout = {
            title:"Chart 1",
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)',
            font: {
                family: "Courier New, monospace",
                color: "#ffffff"
            }
        };

        Plotly.newPlot(chrt, data, layout);

        var data2 = [{
            x: ranks,
            y: counties,
            mode: "markers",
            type: "scatter"
        }];
        var l2 = {   title:"Chart 2",
            font: {
                family: "Courier New, monospace",
                color: "#ffffff"
            },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)'};

	let chrt2 = document.getElementById('chart2');
        Plotly.newPlot(
		document.getElementById('chart2'), 
		[{
            		x: ranks,
           		y: counties,
            		mode: "markers",
            		type: "scatter"
        	}], layout);
    });
}

async function request() {
    let response = await fetch('https://my.api.mockaroo.com/users.json?key=30eedd50');

    if (response.ok)
        return await response.json();
    else
        throw new Error();
}
