import fs from 'fs';
const path = "src/clases/files/products.json"

export default class ProductsManager{

    constructor(){
        this.products = [];
    }

    getProducts = async (limite) => {
        if(fs.existsSync(path)){
            const users = await fs.promises.readFile(path, "utf-8");
            const usersFormat = await JSON.parse(users)
            if(limite){
                const productsLimite = usersFormat.slice(0, limite)
                return productsLimite
            }
            return usersFormat;
        }else{
            return [];
        }
    }

    createProducts = async (title, description, price, thumbnail, code, stock) => {
        if( title == null ||
            description == null ||
            price == null ||
            thumbnail == null ||
            stock == null ||
            code == null){
            console.log("Debe completar todos los campos por favor");
            return;
        }

        const productsContent = await this.getProducts()
        const productContent = productsContent.find((prod)=> prod.code == code)
        if(productContent){
            console.log(`ya existe un producto con el code ${code}`);
            return;
        }

        const product = {title, description, price, thumbnail, code, stock}

        if(this.products.length == 0){
            product.id = 1
        }else{
            product.id = this.products[this.products.length-1].id + 1
        }

        this.products.push(product)

        await fs.promises.writeFile(path, JSON.stringify(this.products, null, "\t"));

        console.log(`nuevo producto agregado con code ${code}`)
    }

    getProductByCode = async (code) => {
        const products = await this.getProducts()
        const product = products.find((prod)=> prod.code == code)
        if(!product){
            console.log(`no se encontro el producto con code ${code}`)
            return;
        }
        return product
    } 

    getProductById = async (id) => {
        const products = await this.getProducts()
        const result = products.filter((prod) => prod.id == id)
        if(result.length == 0){
            // console.log(`no se encontro el producto con id ${id}`)
            return `no se encontro el producto con id ${id}`;
        }
        return result
    }

    deleteProductById = async (id) => {
        const products = await this.getProducts()
        let filterProduct = []
        if(products.length > 0){
            filterProduct = products.filter((prod) => prod.id !== id)
        }

        if(filterProduct.length === products.length-1){
            await fs.promises.writeFile(path, JSON.stringify(filterProduct, null, "\t"))
            console.log(`El producto con id: ${id} fue eliminado.`);
        } else {
            console.log(`No existe producto con id: ${id}.`);
        }
    }
    deleteProductByCode = async (code) => {
        const products = await this.getProducts()
        let filterProduct = []
        if(products.length > 0){
            filterProduct = products.filter((prod) => prod.code !== code)
        }

        if(filterProduct.length === products.length-1){
            await fs.promises.writeFile(path, JSON.stringify(filterProduct, null, "\t"))
            console.log(`El producto con code: ${code} fue eliminado.`);
        } else {
            console.log(`No existe producto con code: ${code}.`);
        }
    }
    updateProduct = async (id, productUpdate) => {
        const products = await this.getProducts()
        if(products.length > 0){
            const productIdx = products.findIndex((p)=> p.id === id)
            if(productIdx === -1){
                console.log("no existe el producto con indice " + id)
                return;
            }
            if(products[productIdx].code === productUpdate.code){
                console.log(`Existe un producto con code: ${productUpdate.code}. No se actualiza el producto.`)
                return;
            }
            // el producto buscado existe, no hay problemas con el code, entonces lo actualizo
            products[productIdx] = {...products[productIdx], ...productUpdate};
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"))
            // si se actualizo, logueamos por consola
            console.log(`Producto con id: ${id} actualizado.`);
        }else {
            // no hay productos
            console.log("No hay productos. No se puede realizar la actualización.");
          }
    }
}

// const products = new ProductsManager()

// const env = async () => {
//     //console.log(await products.getProducts())
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc130", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc131", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc132", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc133", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc134", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc135", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc136", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc137", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc138", 15))
    // console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc139", 15))
//     //console.log(await products.getProducts())
//     //console.log(await products.getProductByCode("abc125"))
//     //console.log(await products.getProductById(4))
//     //console.log(await products.deleteProductById(4))
//     //console.log(await products.deleteProductByCode("abc126"))
//     console.log(await products.updateProduct(2, {code: "abc131"}))
// }

// env()