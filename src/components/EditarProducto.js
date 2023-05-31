import { useSelector, useDispatch } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productoEditar = useSelector((state) => state.productos.productoEditar);
  const [producto, setProducto] = useState({ nombre: "", precio: "" });

  useEffect(() => {
    setProducto(productoEditar);
  }, [productoEditar]);

  const onChangeFormulario = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  if (!productoEditar) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    navigate("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4 font-weight-bold">Editar Producto</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Producto</label>
              <input
                id="nombre"
                type="text"
                className="form-control"
                placeholder="Nombre Producto"
                name="nombre"
                defaultValue={productoEditar.nombre}
                onChange={onChangeFormulario}
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio Producto</label>
              <input
                id="precio"
                type="number"
                className="form-control"
                placeholder="Precio Producto"
                name="precio"
                defaultValue={productoEditar.precio}
                onChange={onChangeFormulario}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
