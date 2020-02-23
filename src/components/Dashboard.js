import { Button, Typography } from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import moment from "moment";
import gql from "graphql-tag";

const { Title } = Typography;

const QUERY_DOLAR = gql`
  {
    dolarHoy {
      paridad
      fecha
    }
  }
`;

const CARGAR_DOLAR = gql`
  mutation actualizarDolares {
    actualizarDolares {
      paridad
      fecha
    }
  }
`;

export default function Dashboard(props) {
  const { loading, error, data } = useQuery(QUERY_DOLAR);
  const [
    cargarDolar,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(CARGAR_DOLAR, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: QUERY_DOLAR }]
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { dolarHoy } = data;
  console.log(dolarHoy);

  return (
    <>
      {dolarHoy && (
        <div>
          Dolar hoy ({moment(dolarHoy.fecha).format("dddd DD MMMM YYYY")}):
          <Title>{dolarHoy.paridad}</Title>
        </div>
      )}
      {!dolarHoy && (
        <>
          <p>Dolar hoy no se ha cargado</p>
          <Button onClick={cargarDolar}>Cargar ahora</Button>
          {mutationLoading && <p>Actualizando...</p>}
          {mutationError && <p>{mutationError.error}</p>}
        </>
      )}
    </>
  );
}
