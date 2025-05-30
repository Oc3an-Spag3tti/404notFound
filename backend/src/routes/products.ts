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

// Resultats produits d'une recherche
productsRouter.get("/search", async (req: Request, res: Response) => {
  try {
    const { product_name, sortby, categories } = req.query;

    let categoryList: string[] = [];

    if (categories) {
      if (Array.isArray(categories)) {
        categoryList = categories.filter(
          (c): c is string => typeof c === "string"
        );
      } else {
        categoryList = [categories as string];
      }
    }

    const filter = {
      ...(product_name && {
        name: { $regex: product_name, $options: "i" },
      }),
      ...(categoryList.length > 0 && {
        category: { $in: categoryList },
      }),
    };

    let sortOptions = {};

    if (sortby === "croissant") {
      sortOptions = { price: 1 };
    } else if (sortby === "decroissant") {
      sortOptions = { price: -1 };
    }

    const result = await Products.find(filter).sort(sortOptions).limit(10);
    res.json({ success: true, products: result });
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res
      .status(500)
      .json({ success: false, message: "Erreur interne du serveur" });
  }
});

productsRouter.get("/details", async (req: Request, res: Response) => {
  const category = req.query.category;
  const similarProducts = await Products.find({ category: category }).limit(6);
  res.json(similarProducts);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.json(product);
});

productsRouter.post("/", isAdmin, async (req: Request, res: Response) => {
  console.log("req.body", req.body);
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
  res.json({ _id: stripeProduct.id, success: true });
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
  const _idString = req.body._id;
  const name = req.body.name;

  const _objectId = new ObjectId(_idString);

  const filter = { _id: _objectId };

  const product = await Products.deleteOne(filter);

  res.send({ _objectId, product });
});

export default productsRouter;
