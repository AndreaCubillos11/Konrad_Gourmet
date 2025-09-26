const express = require("express");
const router = express.Router();
const listasDesplegables = require("../controllers/listasDesplegables");


router.post("/lista-CategoriaPlato",listasDesplegables.categoriaPlato);

router.post("/lista-CategoriaProducto",listasDesplegables.CategoriaProducto);

router.post("/lista-UnidadMedida",listasDesplegables.UnidadMedida);

router.post("/lista-Producto",listasDesplegables.Producto);

router.get("/lista-CategoriaPlato/:id",listasDesplegables.ConsultarCategoriaPlato);

router.get("/lista-CategoriaProducto/:id",listasDesplegables.ConsultarCategoriaProducto);

router.get("/lista-UnidadMedida/:id",listasDesplegables.ConsultarUnidad);

router.get("/lista-Producto/:id",listasDesplegables.ConsultarProductos);

module.exports = router;

