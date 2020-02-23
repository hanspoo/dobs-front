import { Button, Icon, Radio, Select } from "antd";
import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";

import gql from "graphql-tag";

import ControlMes from "./ControlMes";

const { Option } = Select;

const GET_DOLARES = gql`
  {
    dolares {
      fecha
      paridad
    }
  }
`;
const periodos = [
  { value: "S", label: "Semanal" },
  { value: "M", label: "Mensual" },
  { value: "A", label: "Anual" },
  { value: "T", label: "Todo" }
];

const anos = [2020, 2019, 2018];

const enFecha = (fecha, mes, ano) => {
  const d = new Date(fecha);

  return d.getMonth() + 1 === mes && d.getFullYear() === ano;
};
const hoy = new Date();

export default function ConNavegacion({ comp }) {
  const { loading, error, data } = useQuery(GET_DOLARES);
  const [periodo, setPeriodo] = useState("M");

  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const [ano, setAno] = useState(hoy.getYear() + 1900);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const dolares = data.dolares.filter(d => enFecha(d.fecha, mes, ano));
  const ele = React.createElement(comp, { dolares });

  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <ControlMes mes={mes} setMes={setMes} />
        <>
          <Button onClick={() => setAno(ano - 1)}>
            <Icon type="left" />
          </Button>
          <Select
            style={{ width: 120 }}
            onChange={value => setAno(value)}
            value={ano}
          >
            {anos.map(({ value, label }) => (
              <Option value={value} key={value}>
                {label}
              </Option>
            ))}
          </Select>
          <Button onClick={() => setAno(ano + 1)}>
            <Icon type="right" />
          </Button>
        </>

        <div style={{ float: "right" }}>
          <Radio.Group
            onChange={e => setPeriodo(e.target.value)}
            value={periodo}
          >
            {periodos.map(({ value, label }) => (
              <Radio.Button key={value} value={value}>
                {label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      </div>
      <hr style={{ color: "#ddd", marginBottom: "2em" }} />
      {dolares.length === 0 ? <p>No hay información</p> : ele}
    </>
  );
}
