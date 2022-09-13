import { CSVLink, CSVDownload } from "react-csv";

export function Excel(props) {
    const { data, filename } = props;
    return (
        <button className="py-2 px-3 border rounded-md mr-3 bg-white flex justify-center items-center cursor-pointer">
            <CSVLink data={data} filename="Teachers.csv">
                Excel
            </CSVLink>
        </button>
    );
}