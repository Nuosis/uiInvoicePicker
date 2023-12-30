import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";

let root; // Store the root outside the function
window.loadTable = (data) => {
    const json = JSON.parse(data);
    console.log('initData',json)
    const records = Array.isArray(json.record) ? json.record : (json.record ? [json.record] : []);
    console.log('initRecord',records)


    //Unmount existing React component if any
    try {
        if (root) {
            root.unmount();
        }
    } catch (e) {
        console.error("Error during unmount:", e);
    }
    
    // Load the new React app
    try {
        const container = document.getElementById("root");
        if (container) {
            if (!root) { // Only create root if it hasn't been created yet
                root = createRoot(container);
            }
            root.render(<MyApp initData={json.QueryResponse} initRecords={records} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app:", e);
    }
};