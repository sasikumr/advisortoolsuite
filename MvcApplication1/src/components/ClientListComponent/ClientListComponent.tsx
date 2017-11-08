import React from 'react';
import ReactDOM from 'react-dom';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import { AgGridReact } from 'ag-grid-react';
import { ColumnApi, GridApi } from "ag-grid";
interface ValicGridState {
    rowData: any[],
    columnDefs: any[]
}
export default class ClientListComponent extends React.Component<any, ValicGridState>{   
    private gridApi: GridApi;
    private columnApi: ColumnApi;
    constructor(props: any) {
        super(props);
        //this.props.reactContainer.style.display = "inline-block";
        // change the background color of the containing div to be red
        //this.props.reactContainer.style.backgroundColor = "red";
        this.onGridReady = this.onGridReady.bind(this);
//        this.exportDataAsExcel= this.exportDataAsExcel.bind(this);
        //this.getRowNodeId = this.getRowNodeId.bind(this);
        this.state = {
            columnDefs: this.createColumnDefs(),
            rowData: this.createRowData()
        }
    }
    createColumnDefs() {
        return [
            { headerName: "Name", field: "make" },
            { headerName: "Client Id", field: "model" },
            { headerName: "Client Assets", field: "price" },
            { headerName: "Age", field: "make" },
            { headerName: "Birth Month", field: "model" },
            { headerName: "Gender", field: "price" },
            { headerName: "Client Acquisition Date", field: "make" },
            { headerName: "Advisory Service (GPS M/A)", field: "model" },
            { headerName: "Client Review Month", field: "model" },
            { headerName: "Last Client Review Date", field: "price" }
        ];
    }

    createRowData() {
        return [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 },
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 },
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
            
        ];
    }
   
    onGridReady(params: any) {
        //this.api = params.api;
        //this.columnApi = params.columnApi;
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
        this.gridApi.exportDataAsExcel();
    }
    getRowNodeId(data) {
        return data.symbol;
    }
    render() {
        //return (<div className="ag-fresh">
        //    <AgGridReact
        //        columnDefs={this.props.columnDefs}
        //    rowData={this.props.rowData} rowSelection="multiple"
        //    enableSorting=true
        //    enableFilter=true
        //    rowHeight="22"
        //    enableImmutableMode="true"
        //    getRowNodeId={this.getRowNodeId} 
        //    onGridReady={this.onGridReady} /> </div>);
        let containerStyle = {
            height: 500,
            width: 800
        };

        return (
            <div style={containerStyle} className="ag-fresh">
                <h1>Client List:</h1>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
enableFilter={true}
enableSorting={true} 
rowSelection={"Multiple"}
enableColResize = {true} 
animateRows={true} 
enableRangeSelection={true}
pagination ={true}
paginationPageSize ={5}

                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        )
    }
}