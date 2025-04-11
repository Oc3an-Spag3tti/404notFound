import { Router } from "express";
import { Request, Response } from "express";

import Products from "../models/productsModels";
import { ObjectId } from "mongodb";
import { stripe } from "..";
import isAuth from "../utils/isAuth";
import isAdmin from "../utils/isAdmin";

const productsRouter = Router();

// Front fait un GET pour récup les produits;
productsRouter.get("/", async (req: Request, res: Response) => {
  const products = await Products.find();
  res.json(products);
});

productsRouter.get("/search", async (req: Request, res: Response) => {
  const productName = req.query.product_name;
  const myLimit = parseInt(req.query.limit as string) || 10;

  // TODO utiliser un filtre "case-insensitive" et un "contains"
  const productSearch = await Products.find({
    name: { $regex: productName, $options: "i" },
  }).limit(myLimit);
  res.json({
    products: productSearch,
    success: true,
  });
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.json(product);
});

// GET `localhost:3000/products/search`

// Front fait un POST pour ajouter un produit;
// format des données -> { name, description, price }

// productsRouter.post("/", async (req: Request, res: Response) => {
//   /*const product = new Products(req.body); // instance de notre model
//   await product.save();*/

//   const name = req.body.name;
//   const description = req.body.description;
//   const price = req.body.price;

//   const product = await Products.create({
//     name,
//     description,
//     price,
//   });

//   /*
//   un objet qui contient l'identifiant du produit qui vient d'^

//   */

//   res.json({ _id: product._id, success: true });
// });
productsRouter.post("/", isAdmin, async (req: Request, res: Response) => {
  const stripeProduct = await stripe.products.create({
    name: req.body.name,
    description: req.body.description,
    default_price_data: {
      currency: "eur",
      unit_amount: req.body.price,
      recurring: req.body.recurring
        ? {
            interval: req.body.recurring.interval,
            interval_count: req.body.recurring.interval_count,
          }
        : undefined,
    },
  });
  Products.create({
    name: req.body.name,
    desc: req.body.description,
    price: req.body.price,
  });
});

productsRouter.put("/", isAdmin, async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  const result = await Products.updateOne(
    { name: name }, // Recherche par le nom du produit
    {
      $set: {
        description, // Mise à jour de la description
        price, // Mise à jour du prix
      },
    }
  );
  res.json(result);
});

productsRouter.delete("/", isAdmin, async (req: Request, res: Response) => {
  // 1. INPUT -> _id de type string  -> req.body._id
  const _idString = req.body._id;
  const name = req.body.name;
  // 2. PROCESS ????

  const _objectId = new ObjectId(_idString);
  // 3. OUTPUT -> un _id de type ObjectId

  const filter = { _id: _objectId }; // to fix

  const product = await Products.deleteOne(filter);

  res.send({ _objectId, product });
});

export default productsRouter;
