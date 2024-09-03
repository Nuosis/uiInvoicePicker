import React, { useState, useEffect, useRef } from "react";
import MyTable from "./components/Table";

const transformItems = (items) => {
  // Safe access with a fallback if itemData.Item is undefined
  const itemArray = items || [];
  return itemArray.map((item) => {
      if (item.ParentRef && item.ParentRef.value === "4") {
          return { Id: item.Id, Name: item.Name, Rate: item.UnitPrice };
      }
      return null;
  }).filter(item => item !== null);
};

// Function to transform the initial records
const transformedRecords = (records,items) => {
  if (!Array.isArray(records) || records.length === 0) return [];
  console.log('items', items)

  return records.map(record => {
      //console.log('recordItem', record.item);
      //console.log('record.Item', record.item);

      // Ensure items is checked for existence
      const matchingItem = Array.isArray(items) ? items.find(item => item.Name === record.item) : undefined;
      //console.log('matchingItem', matchingItem);

      if (!matchingItem) {
          console.error("Matching item not found for", record.Item);
          return null;
      }

      // Transform the record
      return {
          Id: matchingItem.Id,
          Name: record.item,
          Rate: record.Rate,
          Qty: record.Qty,
          Total: (parseFloat(record.Rate) * parseFloat(record.Qty)).toFixed(2),
          Note: record.Note,
      };
  }).filter(record => record !== null);
};

const MyApp = ({ initData = {}, initRecords = [] }) => {
    console.log('init MyApp');

    // Ensure there's a fallback if initData.Item is not defined
    const [itemData, setItemData] = useState(initData.Item ? transformItems(initData.Item) : {Item: []});
    const [records, setRecords] = useState(transformedRecords(initRecords, itemData));
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
    }, []);

    return (
        <>
            <MyTable setRecords={setRecords} records={records} items={itemData} />
        </>
    );
};

export default MyApp;
