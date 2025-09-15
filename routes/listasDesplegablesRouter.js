const express = require("express");
const router = express.Router();
const listasDesplegables = require("../controllers/listasDesplegables");


router.post("/lista-CategoriaPlato",listasDesplegables.categoriaPlato);

router.post("/lista-CategoriaProducto",listasDesplegables.CategoriaProducto);

router.post("/lista-UnidadMedida",listasDesplegables.UnidadMedida);

router.post("/lista-Producto",listasDesplegables.Producto);

module.exports = router;

