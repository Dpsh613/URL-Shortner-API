import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import type { UrlData } from "../../interface/UrlData";
import { serverUrl } from "../../helpers/Constants";
import axios from "axios";
import DataTable from "../DataTable/DataTable";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/shortUrl`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      {/* Pass fetchTableData down so it updates the table immediately upon submit */}
      <FormContainer updateData={fetchTableData} />
      <DataTable data={data} updateData={fetchTableData} />
    </>
  );
};

export default Container;
