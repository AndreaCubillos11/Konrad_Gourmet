const express = require("express");
const router = express.Router();
const listasDesplegables = require("../controllers/listasDesplegables");
const auth = require("../middlewares/auth");

router.post("/lista-CategoriaPlato",auth.verificarToken, listasDesplegables.categoriaPlato);

router.post("/lista-CategoriaProducto",auth.verificarToken, listasDesplegables.CategoriaProducto);

router.post("/lista-UnidadMedida",auth.verificarToken, listasDesplegables.UnidadMedida);

router.post("/lista-Producto",auth.verificarToken, listasDesplegables.Producto);

router.post("/lista-Marca",auth.verificarToken,listasDesplegables.Marca);

router.get("/lista-CategoriaPlato/:id",auth.verificarToken, listasDesplegables.ConsultarCategoriaPlato);

router.get("/lista-CategoriaProducto/:id",auth.verificarToken, listasDesplegables.ConsultarCategoriaProducto);

router.get("/lista-UnidadMedida/:id",auth.verificarToken, listasDesplegables.ConsultarUnidad);

router.get("/lista-Producto/:id",auth.verificarToken, listasDesplegables.ConsultarProductos);

router.get("/lista-Producto/categoria/:id_categoria",auth.verificarToken,listasDesplegables.ConsultarProductosPorCategoria);

router.get("/lista-Marca",auth.verificarToken,listasDesplegables.consultarMarcas);

module.exports = router;