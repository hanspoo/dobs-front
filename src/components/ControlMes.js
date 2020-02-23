import { Button, Icon, Select } from "antd";
import React from "react";

const { Option } = Select;

const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" }
];

export default function ControlMes({ mes, setMes, setAno, ano }) {
  const retrocederMes = () => {
    if (mes === 1) {
      setAno(ano - 1);
      setMes(12);
    } else setMes(mes - 1);
  };
  const avanzarMes = () => {
    if (mes === 12) {
      setAno(ano + 1);
      setMes(1);
    } else setMes(mes + 1);
  };

  return (
    <>
      <Button onClick={retrocederMes}>
        <Icon type="left" />
      </Button>
      <Select
        style={{ width: 120 }}
        onChange={value => setMes(value)}
        value={mes}
      >
        {meses.map(({ value, label }) => (
          <Option value={value} key={value}>
            {label}
          </Option>
        ))}
      </Select>
      <Button onClick={avanzarMes}>
        <Icon type="right" />
      </Button>
    </>
  );
}
