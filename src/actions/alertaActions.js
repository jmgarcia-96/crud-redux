import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

export function mostrarAlerta(alerta) {
  return (dispatch) => {
    dispatch(crearAlerta(alerta));
  };
}

const crearAlerta = (alerta) => ({
  type: MOSTRAR_ALERTA,
  payload: alerta,
});

export function ocultarAlertaAction(alerta) {
  return (dispatch) => {
    dispatch(ocultarAlerta(alerta));
  };
}
const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA,
});
