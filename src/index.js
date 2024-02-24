import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";

let root; // Store the root outside the function
window.loadTable = (data) => {
    console.log('version', 1.05);
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

    console.log('initData', json);

    const records = Array.isArray(json.record) ? json.record : (json.record ? [json.record] : []);
    console.log('initRecord', records);

    // Unmount existing React component if any
    if (root) {
        root.unmount();
        root = null; // Set root to null after unmounting
    }

    // Load the new React app
    try {
        const container = document.getElementById("root");
        if (container) {
            // Create a new root if it doesn't exist
            if (!root) {
                root = createRoot(container);
            }
            // Adjusted to handle cases where json.QueryResponse might be undefined
            root.render(<MyApp initData={json.QueryResponse || {}} initRecords={records} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app v1.05:", e);
    }
};

loadTable()