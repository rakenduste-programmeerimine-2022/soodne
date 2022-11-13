import { Category, Grocery } from "groceries-component";
import mongoose from "mongoose";
import { parseCategory } from "../../utils/parseCategory";
import { Compare } from "../lib/Compare";
import { Parser } from "../lib/Parser";
import { Product, ProductType } from "../models/Product";

export class Database {

    static async addProducts(products: ProductType[]) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.create(products, function(err: Error) {
            if (err) throw new Error("Error: " + err);
        });
    }

    static async getProduct(productTitle: string): Promise<ProductType> {
        let foundProduct = {} as ProductType;
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        foundProduct = await Product.findOne({name: productTitle}).exec();
        return foundProduct;
    }

    static async getProductsContainingTitle(productTitle: string): Promise<ProductType[]> {
        let foundProduct = {} as ProductType [];
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        foundProduct = await Product.find({name: { "$regex": `${productTitle}`}}).exec();
        return foundProduct;
    }

    static async updateRimiProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {rimi_price: newProduct.rimi_price}).exec();
    }

    static async updateBarboraProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {barbora_price: newProduct.barbora_price}).exec();

    }
    static async getCategories(): Promise<Category[]> {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        const allCategories = await (Product.find().exec()) as Category[];
        return allCategories;
    }
    
    static async updateBarboraItems() {
        const items = await Parser.getAllBarboraItems();
        items.forEach(async (item: Grocery) => {
            const newItem = {
                category: item.category.trim(),
                name: item.name.trim(),
                barbora_price: item.price
            } as ProductType;
            const commonTitle = await Compare.compareCommonItem(item.name);

            if (typeof commonTitle == 'string' && commonTitle.length > 1) {
                newItem.name = commonTitle
                //console.log(newItem.name)
                await this.updateBarboraProduct(newItem);
            }
            else {
                await this.addProducts([newItem]);
            }
        });
    }

    static async updateRimiItems() {
        const items = await Parser.getAllRimiItems();
        items.forEach(async (item: Grocery) => {
            const newCategory = parseCategory(item.category.trim());
            const commonTitle = await Compare.compareCommonItem(item.name);

            const newItem = {
                category: newCategory,
                name: item.name,
                rimi_price: item.price
            } as ProductType;

            if (typeof commonTitle == 'string' && commonTitle.length > 1) {
                newItem.name = commonTitle
                //console.log(newItem.name)
                await this.updateRimiProduct(newItem);
            }
            else {
                await this.addProducts([newItem]);
            }
        });
    }
}
