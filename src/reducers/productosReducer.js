import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDICION_PRODUCTO,
} from "../types";

// Cada reducer tiene su propio state
const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
    case COMENZAR_DESCARGA_PRODUCTOS:
    case COMENZAR_EDICION_PRODUCTO:
      return { ...state, loading: action.payload, error: null };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        productos: [...state.productos, action.payload],
      };
    case AGREGAR_PRODUCTO_ERROR:
      return { ...state, loading: false, error: action.payload };
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        productos: action.payload,
      };

    case DESCARGA_PRODUCTOS_ERROR:
    case PRODUCTO_ELIMINADO_ERROR:
    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return { ...state, productoEliminar: action.payload };
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== state.productoEliminar
        ),
        productoEliminar: null,
      };
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoEditar: action.payload,
      };
    case PRODUCTO_EDITAR_EXITO:
      return {
        ...state,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id ? action.payload : producto
        ),
        productoEditar: null,
      };
    default:
      return state;
  }
}
