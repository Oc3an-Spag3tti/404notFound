import { Router } from "express";
import { Request, Response } from "express";
import Products from "../models/productsModels";
import { ObjectId } from "mongodb";

const productsRouter = Router();

// Front fait un GET pour récup les produits;
productsRouter.get("/", async (req: Request, res: Response) => {
  const products = await Products.find();
  res.json(products);
});

// Front fait un POST pour ajouter un produit;
// format des données -> { name, description, price }
productsRouter.post("/", async (req: Request, res: Response) => {
  /*const product = new Products(req.body); // instance de notre model
  await product.save();*/

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  const product = await Products.create({
    name,
    description,
    price,
  });

  /*
  un objet qui contient l'identifiant du produit qui vient d'^
  
  */

  res.json({ _id: product._id, success: true });
});

productsRouter.put("/", async (req: Request, res: Response) => {
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
});

productsRouter.delete("/", async (req: Request, res: Response) => {
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
