import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

window.loadTable = (data) => {
    // Check if data is null or empty string
    if (!data) {
        console.error('Data is null or not provided');
        data = '{}'; // Provide a default empty object as a string if data is null
    }

    let json;
    try {
        json = JSON.parse(data);
    } catch (e) {
        console.error('Invalid JSON format:', e);
        json = {}; // Provide a default empty object if JSON parsing fails
    }

    console.log('initQboData', json.QueryResponse);
    const records = Array.isArray(json.record) ? json.record : (json.record ? [json.record] : []);
    console.log('initRecord', records);
    // Load the new React app
    root.render(<MyApp initData={json.QueryResponse || {}} initRecords={records} />);
}

console.log(
    "v1.0.5",
    {
        "FUNCTIONS":[
            "loadTable",
            {
                "Props":[
                    {initData:{
                            "QueryResponse": "qbo Item Object"
                        }
                    },
                    {initRecords:{
                            "records": [{
                                "Item":"",
                                "Note":"",
                                "Qty":"",
                                "Rate":"",
                            }]
                        }
                    },
                ]
            }
        ]
    }
);
