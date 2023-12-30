import React, { useState } from "react";
import MyTable from "../components/Table"

/*
const itemData = {
	"QueryResponse" : 
	{
		"Item" : 
		[
			{
				"Active" : true,
				"FullyQualifiedName" : "Cleaning Income:Commercial Cleaning:Periodic Cleans",
				"Id" : "11",
				"IncomeAccountRef" : 
				{
					"name" : "Periodic Cleaning Sales",
					"value" : "72"
				},
				"Level" : 2,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-29T09:53:57-08:00",
					"LastUpdatedTime" : "2023-12-29T11:13:23-08:00"
				},
				"Name" : "Periodic Cleans",
				"ParentRef" : 
				{
					"name" : "Cleaning Income:Commercial Cleaning",
					"value" : "9"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxIncluded" : false,
				"Sku" : "JANperi",
				"SubItem" : true,
				"SyncToken" : "1",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 0,
				"domain" : "QBO",
				"sparse" : false
			},
			{
				"Active" : true,
				"FullyQualifiedName" : "Cleaning Income:Commercial Cleaning:Regular Janitorial Service",
				"Id" : "2",
				"IncomeAccountRef" : 
				{
					"name" : "Regular Cleaning Sales",
					"value" : "70"
				},
				"Level" : 2,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-28T12:40:37-08:00",
					"LastUpdatedTime" : "2023-12-29T09:56:24-08:00"
				},
				"Name" : "Regular Janitorial Service",
				"ParentRef" : 
				{
					"name" : "Cleaning Income:Commercial Cleaning",
					"value" : "9"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxCodeRef" : 
				{
					"name" : "GST",
					"value" : "4"
				},
				"SalesTaxIncluded" : false,
				"Sku" : "JANreg",
				"SubItem" : true,
				"SyncToken" : "2",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 0,
				"domain" : "QBO",
				"sparse" : false
			},
			{
				"Active" : true,
				"FullyQualifiedName" : "Cleaning Income:Commercial Cleaning:Special Cleans",
				"Id" : "10",
				"IncomeAccountRef" : 
				{
					"name" : "Special Cleaning Sales",
					"value" : "71"
				},
				"Level" : 2,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-29T09:53:07-08:00",
					"LastUpdatedTime" : "2023-12-29T09:56:24-08:00"
				},
				"Name" : "Special Cleans",
				"ParentRef" : 
				{
					"name" : "Cleaning Income:Commercial Cleaning",
					"value" : "9"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxCodeRef" : 
				{
					"name" : "GST",
					"value" : "4"
				},
				"SalesTaxIncluded" : false,
				"Sku" : "JANspec",
				"SubItem" : true,
				"SyncToken" : "0",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 0,
				"domain" : "QBO",
				"sparse" : false
			},
			{
				"Active" : true,
				"Description" : "FileMaker database development and consulting work",
				"FullyQualifiedName" : "Development Income:Development CAD",
				"Id" : "3",
				"IncomeAccountRef" : 
				{
					"name" : "Development Sales CAD",
					"value" : "6"
				},
				"Level" : 1,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-28T12:40:37-08:00",
					"LastUpdatedTime" : "2023-12-29T09:55:46-08:00"
				},
				"Name" : "Development CAD",
				"ParentRef" : 
				{
					"name" : "Development Income",
					"value" : "4"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxCodeRef" : 
				{
					"name" : "GST",
					"value" : "4"
				},
				"SalesTaxIncluded" : false,
				"Sku" : "DEVcad",
				"SubItem" : true,
				"SyncToken" : "1",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 100,
				"domain" : "QBO",
				"sparse" : false
			},
			{
				"Active" : true,
				"FullyQualifiedName" : "Development Income:Development EUR",
				"Id" : "8",
				"IncomeAccountRef" : 
				{
					"name" : "Development Sales EURO",
					"value" : "139"
				},
				"Level" : 1,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-29T09:50:39-08:00",
					"LastUpdatedTime" : "2023-12-29T09:55:46-08:00"
				},
				"Name" : "Development EUR",
				"ParentRef" : 
				{
					"name" : "Development Income",
					"value" : "4"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxCodeRef" : 
				{
					"name" : "Zero-rated",
					"value" : "3"
				},
				"SalesTaxIncluded" : false,
				"Sku" : "DEVeur",
				"SubItem" : true,
				"SyncToken" : "0",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 100,
				"domain" : "QBO",
				"sparse" : false
			},
			{
				"Active" : true,
				"FullyQualifiedName" : "Development Income:Development USD",
				"Id" : "7",
				"IncomeAccountRef" : 
				{
					"name" : "Development Sales USD",
					"value" : "138"
				},
				"Level" : 1,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-29T09:50:07-08:00",
					"LastUpdatedTime" : "2023-12-29T09:55:46-08:00"
				},
				"Name" : "Development USD",
				"ParentRef" : 
				{
					"name" : "Development Income",
					"value" : "4"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxCodeRef" : 
				{
					"name" : "Zero-rated",
					"value" : "3"
				},
				"SalesTaxIncluded" : false,
				"Sku" : "DEVusd",
				"SubItem" : true,
				"SyncToken" : "0",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 100,
				"domain" : "QBO",
				"sparse" : false
			},
			{
				"Active" : true,
				"Description" : "Hosting a FileMaker Database",
				"FullyQualifiedName" : "Development Income:FM Hosting",
				"Id" : "5",
				"IncomeAccountRef" : 
				{
					"name" : "Other Development Services",
					"value" : "76"
				},
				"Level" : 1,
				"MetaData" : 
				{
					"CreateTime" : "2023-12-28T15:35:26-08:00",
					"LastUpdatedTime" : "2023-12-29T11:14:13-08:00"
				},
				"Name" : "FM Hosting",
				"ParentRef" : 
				{
					"name" : "Development Income",
					"value" : "4"
				},
				"PurchaseCost" : 0,
				"PurchaseTaxIncluded" : false,
				"SalesTaxCodeRef" : 
				{
					"name" : "GST",
					"value" : "4"
				},
				"SalesTaxIncluded" : false,
				"Sku" : "FMhost",
				"SubItem" : true,
				"SyncToken" : "1",
				"Taxable" : false,
				"TrackQtyOnHand" : false,
				"Type" : "Service",
				"UnitPrice" : 50,
				"domain" : "QBO",
				"sparse" : false
			}
		],
		"maxResults" : 7,
		"startPosition" : 1
	},
	"time" : "2023-12-29T11:14:53.188-08:00"
};
*/


const MyApp = ({itemData,initRecords}) => {
	console.log('init MyApp')
	console.log('init ItemData',itemData)
	console.log('init recordData',initRecords)

    // Function to transform the initial record
    const transformedRecords = () => {
		//console.log('initRecords:', initRecords[0]);
		//console.log('itemData.Item:', itemData.Item);
	
		if (!initRecords || Object.keys(initRecords).length === 0) return [];
	
		const matchingItem = itemData.Item.find(item => {
			//console.log('Comparing:', item.Name, 'to', initRecords[0].Item);
			return item.Name === initRecords[0].Item;
		});
	
		//console.log('matchingItem:', matchingItem);
	
		if (!matchingItem) {
			console.error("Matching item not found.");
			return [];
		}
	
		const record = {
			Id: matchingItem.Id,
			Name: initRecords[0].Item,
			Rate: initRecords[0].rate,
			Qty: initRecords[0].qty,
			Total: (parseFloat(initRecords[0].rate) * parseInt(initRecords[0].qty)).toFixed(2),
			Note: initRecords[0].Note,
		};
		//console.log('transformedRecord:', record);
	
		return [record];
	};
	const [records, setRecords] = useState(transformedRecords());

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
