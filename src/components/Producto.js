import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditarAction,
} from "../actions/productoActions";

const Producto = ({ producto }) => {
  const navigate = useNavigate();
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();

  const handleEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProductoAction(id));
      }
    });
  };

  const handleEditarProducto = () => {
    dispatch(obtenerProductoEditarAction(producto));
    navigate(`/productos/editar/${id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">{precio}€</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => handleEditarProducto(producto)}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
