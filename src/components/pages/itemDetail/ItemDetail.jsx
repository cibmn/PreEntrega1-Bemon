import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import CounterContainer from "../../common/counter/CounterContainer";
import Button from "@mui/material/Button"; 
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./ItemDetailContainer.css";

const ItemDetail = ({ item, initial }) => {
  const { addToCart } = useContext(CartContext);
  const [limpiadorSeleccionado, setLimpiadorSeleccionado] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddToCart = (quantity) => {
    let precioTotal = item.price; 

    if (limpiadorSeleccionado) {
      precioTotal += 35000; 
    }

    addToCart({ ...item, quantity, precio: precioTotal });
    handleOpenModal();
  };

  return (
    <div className="containerItemDetail">
      <div className="leftColumn">
        <div className="containerImage" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={item.image} alt="" />
        </div>
      </div>
      <div className="rightColumn">
        <div className="details">
          <div className="warranty">Garantía de por vida</div>
          <div className="rating">
            <span role="img" aria-label="star">
              ⭐⭐⭐⭐☆
            </span>
            <span> (639 votos)</span>
          </div>
          <h1>{item.title}</h1>
          <p>Descripción: {item.description}</p>
          <h2>Precio: ${item.price}.-</h2>
          <div className="colors">
            <h3 className="inline-title">Color:</h3>
            <ul className="inline-list">
              {Array.isArray(item.color) ? (
                item.color.map((color, index) => (
                  <li key={index}>
                    {index > 0 ? "- " : ""}
                    {color}
                  </li>
                ))
              ) : (
                <li>{item.color}</li>
              )}
            </ul>
          </div>

          <div className="sizes">
            <h3 className="inline-title">Tamaño:</h3>
            <ul className="inline-list">
              {Array.isArray(item.size) ? (
                item.size.map((size, index) => (
                  <li key={index}>
                    {index > 0 ? " - " : ""}
                    {size}
                  </li>
                ))
              ) : (
                <li>{item.size}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="addons">
          <div>
            <hr style={{ margin: "0 0 30px 0%", width: "94%", boxSizing: "border-box" }} />
          </div>
          <label htmlFor="limpiadorCheckbox">
            ¿Quieres agregar Limpiador de Mat y paño? +$35.000
          </label>
          <input
            type="checkbox"
            id="limpiadorCheckbox"
            style={{ marginLeft: "10px", width: "20px", color:"red" }}
            onChange={(e) => setLimpiadorSeleccionado(e.target.checked)}
          />
        </div>
        <div className="add-to-cart">
          <CounterContainer
            stock={item.stock}
            onAdd={handleAddToCart}
            initial={initial}
          />
          <div className="shipping-info">
            <p>
              Envío gratis a partir de $70.000 y devolución gratis hasta tope 30
              días.
            </p>
          </div>
        </div>
        <div className="add-to-cart">
          <Button variant="contained" size="small" onClick={handleAddToCart} style={{ marginTop: "10px", backgroundColor:"red" }}>Agregar SET COMPLETO
          </Button>{" "} 
        </div>
        <div className="additional-sections">
          <h3>Generalidades +</h3>
          <p>Texto desplegable de generalidades</p>
          <h3>Especificaciones+</h3>
          <p>Texto desplegable de especificaciones</p>
          <h3>Usos & Cuidados +</h3>
          <p>Texto desplegable de usos y cuidados</p>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregado al Carrito!</DialogTitle>
        <DialogContent>
          <p>Guardamos tu producto con sus preferenicas en el carrito. 
          </p>
          <p>Ingresa al carrito para hacer modificaciones y finalizar la compra.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemDetail;
