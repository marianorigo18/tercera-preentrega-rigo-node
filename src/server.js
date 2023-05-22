import express from "express";

import ProductsManager from "./clases/ProductsManager.js";

const app = express();

const productsManger = new ProductsManager()

app.get("/products", async (req, res) => {
    const products = await productsManger.getProducts(req.query.limit)
    res.send(products)
});

app.get("/products/:id", async (req, res) => {
    const productId = await productsManger.getProductById(req.params.id)
    res.send(productId)
})

app.listen(8080, ()=>{
    console.log("escuchando")
})