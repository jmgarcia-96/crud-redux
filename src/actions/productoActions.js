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
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//#region CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      await clienteAxios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, inténtelo de nuevo",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
//#endregion CREAR NUEVOS PRODUCTOS

//#region OBTENER PRODUCTOS DE LA API
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const productos = await clienteAxios("/productos");
      dispatch(descargaProductosExito(productos.data));
    } catch (error) {
      dispatch(descargaProductosError(true));
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});
const descargaProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});
const descargaProductosError = (estado) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado,
});
//#endregion OBTENER PRODUCTOS DE LA API

//#region SELECCIONA Y ELIMINA EL PRODUCTO
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      Swal.fire(
        "Eliminado",
        "El producto se eliminó correctamente.",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError(true));
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});
const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});
//#endregion SELECCIONA Y ELIMINA EL PRODUCTO

//#region SELECCIONA EL PRODUCTO A EDITAR
export function obtenerProductoEditarAction(producto) {
  return async (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
  };
}

const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});
//#endregion SELECCIONA EL PRODUCTO A EDITAR

//#region SELECCIONA Y EDITA EL PRODUCTO
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto));
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
      Swal.fire(
        "Actualizado",
        "El producto se actualizó correctamente.",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError(true));
    }
  };
}

const editarProducto = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto,
});
const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto,
});
const editarProductoError = () => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: true,
});
//#endregion SELECCIONA Y EDITA EL PRODUCTO
