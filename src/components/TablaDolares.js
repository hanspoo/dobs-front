import { Form, Select, Table } from "antd";
import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";

import gql from "graphql-tag";
import moment from "moment";

const GET_DOLARES = gql`
  {
    dolares {
      fecha
      paridad
    }
  }
`;

const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha"
  },
  {
    title: "Paridad",
    dataIndex: "paridad",
    key: "paridad"
  }
];

const compararFechaDesc = (a, b) => {
  const d1 = new Date(a.fecha);
  const d2 = new Date(b.fecha);
  const diff = d2.getTime() - d1.getTime();
  return diff;
};
const { Option } = Select;

const enAno = (fecha, ano) => {
  return moment(fecha).year() === ano;
};
const anos = [2020, 2019, 2018];
export default function Dolares({ ondolareselected }) {
  const { loading, error, data } = useQuery(GET_DOLARES);

  const [ano, setAno] = useState(new Date().getFullYear());

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const dataSource = data.dolares
    .filter(d => enAno(d.fecha, ano))
    .sort(compararFechaDesc);

  console.log("dataSource", dataSource);
  return (
    <>
      <Form>
        <Select defaultValue={ano} onChange={setAno}>
          {anos.map(ano => (
            <Option value={ano} key={ano}>
              {ano}
            </Option>
          ))}
        </Select>
      </Form>
      <Table
        style={{ marginTop: "1em" }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
}
