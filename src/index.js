import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";

let root; // Store the root outside the function
window.loadTable = (data) => {
    console.log('version', 1.03);
    const json = JSON.parse(data);
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
            root.render(<MyApp initData={json.QueryResponse} initRecords={records} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app v1.03:", e);
    }
};
