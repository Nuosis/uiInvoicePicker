import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function MyTable({ records, setRecords, items }) {
    console.log('items',items)
    console.log('records',records)
    const [newItem, setNewItem] = useState({ item: '', rate: '', qty: 1, total: 0 });


    const calculateGrandTotal = () => {
        if (!records || records.length === 0) return '0';
        return records.reduce((sum, record) => sum + parseFloat(record.Total || 0), 0).toFixed(2);
    };
    const [grandTotal, setGrandTotal] = useState(calculateGrandTotal());

    const handleItemChange = (selectedItemName) => {
        const selectedItem = items.find(item => item.Name === selectedItemName);
        const selectedRate = selectedItem ? selectedItem.Rate : '';
        setNewItem({ ...newItem, item: selectedItemName, rate: selectedRate });
    };

    const handleNoteChange = (note, index) => {
        const updatedRecords = [...records];
        updatedRecords[index] = { ...updatedRecords[index], Note: note };
        setRecords(updatedRecords);
    };

    const handleRowClick = (index) => {
        const selectedRecord = records[index];
        setNewItem({ 
            item: selectedRecord.Name, 
            rate: selectedRecord.Rate, 
            qty: selectedRecord.Qty, 
            total: selectedRecord.Total,
            note: selectedRecord.Note 
        });
        const updatedRecords = records.filter((_, idx) => idx !== index);
        setRecords(updatedRecords);
    };

    const addToInvoice = () => {
      console.log("addToInvoice Clicked")
        if (!newItem.item || newItem.item === 'Select Item') {
            alert('Please select an item.');
            return; // Exit the function early
        }
    
        // Check if the rate is null or 0
        if (!newItem.rate || parseFloat(newItem.rate) === 0) {
            alert('Please enter a valid rate.');
            return; // Exit the function early
        }
    
        // Check if the quantity is null or 0
        if (!newItem.qty || parseInt(newItem.qty) === 0) {
            alert('Please enter a valid quantity.');
            return; // Exit the function early
        }

        // Assuming 'items' is accessible here and contains the items you showed
        const selectedItem = items.find(item => item.Name === newItem.item);
    
        // If selectedItem is undefined, it means the newItem.item doesn't match any item from your items array
        if (!selectedItem) {
            console.error("Selected item not found in items array.");
            return; // Exit the function early
        }
    
        // Construct the new record with all needed properties
        const newRecord = {
            Id: selectedItem.Id, 
            Name: newItem.item, 
            Rate: newItem.rate, 
            Qty: newItem.qty,    
            Total: (parseFloat(newItem.rate) * parseFloat(newItem.qty)).toFixed(2), // Calculate the total
            Note: newItem.note || ''
        };
        
        // Update records
        const updatedRecords = [...records, newRecord];
        setRecords(updatedRecords);
    
        // Calculate and update the grand total
        const totalSum = updatedRecords.reduce((sum, record) => sum + parseFloat(record.Total), 0);
        setGrandTotal(totalSum.toFixed(2));
        setNewItem({ item: '', rate: '', qty: 1, total: 0 }); // Reset inputs after adding
    };
    
    const sendToFileMaker = () => {
        const obj = {records, grandTotal, path: 'createInvoice'}
        FileMaker.PerformScript("webViewer . callbacks", JSON.stringify(obj));
    };
    

    useEffect(() => {
        setNewItem({ ...newItem, total: (newItem.rate * newItem.qty).toFixed(2) });
    }, [newItem.rate, newItem.qty]);

    useEffect(() => {
        const newGrandTotal = records.reduce((sum, record) => sum + parseFloat(record.Total || 0), 0).toFixed(2);
        setGrandTotal(newGrandTotal);
    }, [records]);

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }
        const reorderedRecords = Array.from(records);
        const [removed] = reorderedRecords.splice(source.index, 1);
        reorderedRecords.splice(destination.index, 0, removed);
    
        setRecords(reorderedRecords);
    };

    return (
        <div className="grow overflow-x-auto h-full">
            <div className="inline-block min-w-full align-middle h-full">
                <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5 h-full">
                    <div className="min-w-full divide-y divide-gray-300 h-full">
                        <div className="flex flex-row justify-center bg-gray-100 p-5">
                            <div className="w-1/5 flex justify-center">Item</div>
                            <div className="w-1/5 flex justify-center">Rate</div>
                            <div className="w-1/5 flex justify-center">Qty</div>
                            <div className="w-1/5 flex justify-center">Total</div>
                            <div className="w-1/5 flex justify-center"></div>
                        </div>
                        <div className="flex flex-row justify-center p-5">
                            <select 
                                className="select-style"
                                value={newItem.item} 
                                onChange={(e) => handleItemChange(e.target.value)}>
                                <option value="">Select Item</option>
                                {items.map(item => (
                                    <option key={item.Id} value={item.Name}>{item.Name}</option>
                                ))}
                            </select>
                            <input className="input-style" type="number" value={newItem.rate} onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })} />
                            <input className="input-style" type="number" value={newItem.qty} min="1" onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })} />
                            <div className="w-1/5 flex items-center justify-center">${newItem.total}</div>
                            <button 
                                className="w-1/5 flex items-center justify-center bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                onClick={addToInvoice}>Add to Invoice
                            </button>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="invoiceItems">
                                {(provided) => (
                                    <section {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                        {(records || []).map((record, index) => (
                                            <Draggable key={index} draggableId={record.Id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex flex-row justify-between bg-gray-50 p-4"
                                                    >
                                                        <div className="w-1/5 flex items-center justify-center" onClick={() => handleRowClick(index)}>{record.Name}</div>
                                                        <div className="w-1/5 flex items-center justify-center" onClick={() => handleRowClick(index)}>${record.Rate}</div>
                                                        <div className="w-1/5 flex items-center justify-center" onClick={() => handleRowClick(index)}>{record.Qty}</div>
                                                        <div className="w-1/5 flex items-center justify-center" onClick={() => handleRowClick(index)}>${record.Total}</div>
                                                        <input
                                                            className="input-style"
                                                            type="text"
                                                            value={record.Note || ''}
                                                            placeholder="add note"
                                                            onChange={(e) => handleNoteChange(e.target.value, index)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </section>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {records.length > 0 && ( // Conditional rendering based on the length of the records array
                            <div className="flex justify-start p-5">
                                <button
                                    className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                                    onClick={() => sendToFileMaker()}
                                >
                                    Create Invoice for ${grandTotal}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

