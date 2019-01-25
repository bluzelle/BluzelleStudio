import {getClient} from '../../services/BluzelleService'
import Papa from 'papaparse';


export const importCSV = () => {

    const input = document.createElement('input');

    input.type = 'file';


    input.onchange = () => {

        if(input.files.length === 0) {
            return;
        }

        if(input.files.length > 1) {
            alert('Please select only one file.')
            return;
        }

        Papa.parse(input.files[0], {
            complete: function(results) {

                console.log("Errors from CSV input", results.errors);
                console.log("CSV metadata", results.meta);


                const table = results.data;

                const notEmpty = cell => cell.length;


                const filteredTable = table.map(row => row.filter(notEmpty));

                const goodRows = filteredTable.filter(row => row.length >= 2);

                const fields = goodRows.map(row => ({
                    key: row[0],
                    value: row[1]
                }));


                console.log(fields);

            }
        });


    };


    input.click();

};