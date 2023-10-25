import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { TableV9 } from "@kitameraki/teamswork-library";
import { ITableV9Column } from "@kitameraki/teamswork-library/dist/components/Table_V9/utils/Interface";
import { Input } from "@fluentui/react-components";

interface IData {
  name: string;
}

interface INameCell {
  name: string;
}

const NameCell: React.FC<INameCell> = (props) => {
  const [name, setName] = useState<string>(props.name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return <Input value={name} onChange={onChange} />;
};

const defaultColumns: ITableV9Column[] = [
  {
    key: "name",
    label: "Name",
    dataIndex: "name",
    compare: (a: IData, b: IData) => {
      return a.name.localeCompare(b.name);
    },
    onRenderDataSource: (data: IData) => {
      return <NameCell name={data.name} />;
    },
  },
];

const defaultData: IData[] = [
  {
    name: "asep",
  },
  {
    name: "supri",
  },
  {
    name: "poy",
  },
  {
    name: "karen",
  },
];

const CellInput: React.FC = () => {
  const [columns] = useState<ITableV9Column[]>(defaultColumns);
  const [dataSource] = useState<IData[]>(defaultData);

  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Table With Cell Input" />
      <TableV9 columns={columns} dataSource={dataSource} resizable={false} />
    </div>
  );
};

export default CellInput;
