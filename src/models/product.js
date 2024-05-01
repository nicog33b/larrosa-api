const mongoose = require("mongoose");

/**
 IDEAS.
1 Nombre del producto
2 Descripción del producto
3 Categoría del producto
4 Precio del producto
5 Imagen del producto
6 Código de barras del producto
7 SKU (Stock Keeping Unit) del producto
8 Peso del producto
9 Tamaño del producto
10 Disponibilidad del producto
*/
const productSchema = mongoose.Schema({
  productId: {
    type: String,
  },
  product_name: {
    type: String,
  },
  product_description: {
    type: String,
  },
  product_type: {
    type: String,
  },
  product_price: {
    type: Number,
  },
  product_image: {
    type: Image,
  },
});

module.exports = mongoose.model("Product", productSchema);
