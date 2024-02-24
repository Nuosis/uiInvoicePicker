import React, { useState, useEffect, useRef } from "react";
import MyTable from "../components/Table";

const MyApp = ({ initData = {}, initRecords = [] }) => { // Default values for props
    console.log('init MyApp');
    console.log('init ItemData', initData);
    console.log('init recordData', initRecords);

    // Ensure there's a fallback if initData.Item is not defined
    const [itemData, setItemData] = useState(initData.Item ? initData : {Item: []});

    // Function to transform the initial records
    const transformedRecords = () => {
        // Now simply checks if initRecords is an array
        if (!Array.isArray(initRecords) || initRecords.length === 0) return [];
    
        return initRecords.map(record => {
            console.log('record', record);
            console.log('record.Item', record.Item);

            // Ensure itemData.Item is checked for existence
            const matchingItem = itemData.Item && itemData.Item.find(item => item.Name === record.Item);
            console.log('matchingItem', matchingItem);
    
            if (!matchingItem) {
                console.error("Matching item not found for", record.Item);
                return null;
            }
    
            // Transform the record
            return {
                Id: matchingItem.Id,
                Name: record.Item,
                Rate: record.Rate,
                Qty: record.Qty,
                Total: (parseFloat(record.Rate) * parseFloat(record.Qty)).toFixed(2),
                Note: record.Note,
            };
        }).filter(record => record !== null);
    };
    
    const [records, setRecords] = useState(transformedRecords());
    const currentState = useRef({ itemData, records });

    useEffect(() => {
        currentState.current = { itemData, records };
    }, [itemData, records]);

    useEffect(() => {
        window.getState = () => {
            const state = currentState.current;
            const obj = {state, path: 'collectState'};
            FileMaker.PerformScript("webViewer . callbacks", JSON.stringify(obj));  
        };
        return () => {
            delete window.getState; // Clean up on unmount
        };
    }, []);

    const items = () => {
        // Safe access with a fallback if itemData.Item is undefined
        const itemArray = itemData.Item || [];
        return itemArray.map((item) => {
            if (item.ParentRef && item.ParentRef.value === "4") {
                return { Id: item.Id, Name: item.Name, Rate: item.UnitPrice };
            }
            return null;
        }).filter(item => item !== null);
    };

    return (
        <>
            <MyTable setRecords={setRecords} records={records} items={items()} />
        </>
    );
};

export default MyApp;
