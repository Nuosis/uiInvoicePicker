import React, { useState, useEffect, useRef } from "react";
import MyTable from "../components/Table"

const MyApp = ({initData,initRecords}) => {
	console.log('init MyApp')
	console.log('init ItemData',initData)
	console.log('init recordData',initRecords)

	const [itemData, setItemData] = useState(initData);

    // Function to transform the initial record
	const transformedRecords = () => {
		// Check if initRecords is empty or not an array
		if (!Array.isArray(initRecords) || initRecords.length === 0) return [];
	
		return initRecords.map(record => {
			console.log('record',record)
			console.log('record.Item',record.Item)
			// Find the matching item in itemData.Item for each record
			const matchingItem = itemData.Item.find(item => item.Name === record.Item);
			console.log('matchingItem',matchingItem)
	
			// If no matching item is found, log an error and return null (to be filtered out later)
			if (!matchingItem) {
				console.error("Matching item not found for", record.Item);
				return null;
			}
	
			// Transform the record
			return {
				Id: matchingItem.Id,
				Name: record.Item,
				Rate: record.rate,
				Qty: record.qty,
				Total: (parseFloat(record.rate) * parseInt(record.qty)).toFixed(2),
				Note: record.Note,
			};
		}).filter(record => record !== null); // Filter out any null values if a matching item was not found
	};
	
	const [records, setRecords] = useState(transformedRecords());
	// Ref to hold the current state
	const currentState = useRef({ itemData, records });

	// Update the ref whenever the state changes
	useEffect(() => {
		currentState.current = { itemData, records };
	}, [itemData, records]);

	useEffect(() => {
        window.getState = () => {
			const state = currentState.current;
			const obj = {state, path: 'collectState'}
			FileMaker.PerformScript("webViewer . callbacks", JSON.stringify(obj));	
		}
        return () => {
            delete window.getState; // Clean up on unmount
        };
    }, []);

	const items = () => {
		const itemArray = itemData.Item;
		let result = itemArray.map((item) => {
		if (item.ParentRef.value === "4") {
			return { Id: item.Id, Name: item.Name, Rate: item.UnitPrice };
		}
		return null;
		}).filter(item => item !== null); // Filter out null values
		return result;
	};

	return (
		<>
		<MyTable setRecords={setRecords} records={records} items={items()} />
		</>
	);
};

export default MyApp;
