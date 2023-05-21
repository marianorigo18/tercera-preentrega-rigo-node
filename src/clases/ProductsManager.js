import fs from 'fs';
const path = "src/clases/files/products.json"

export default class ProductsManager{

    constructor(){
        this.products = [];
    }

    getProducts = async () => {
        if(fs.existsSync(path)){
            const users = await fs.promises.readFile(path, "utf-8");
            const usersFormat = await JSON.parse(users)
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
}

const products = new ProductsManager()

const env = async () => {
    console.log(await products.getProducts())
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc129", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc125", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc126", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc127", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc128", 15))
    //console.log(await products.getProducts())
    //console.log(await products.getProductByCode("abc125"))
}

env()