import * as FileSaver from "file-saver";
import { useEffect } from "react";
import * as XLSX from "sheetjs-style"

const ExportExcel = ({excelData, fileName}) => {
    console.log("🚀 ~ file: excelexport.js:6 ~ ExportExcel ~ fileName:", fileName)
    console.log("🚀 ~ file: excelexport.js:6 ~ ExportExcel ~ excelData:", excelData)
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    debugger
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType:'xlsx', type: 'array'});
        const data = new Blob([excelBuffer],{type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    useEffect(() => {
        exportToExcel();
    },[])

    return (
        <>
        
        </>
    )
}
export default ExportExcel;