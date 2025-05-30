import mongoose from "mongoose";
import dotenv from "dotenv";
import Products from "./models/productsModels";
import Categories from "./models/categoriesModel";

dotenv.config();

// Les données à insérer
const products = [
  {
    name: "CrowdStrike Falcon Enterprise",
    description:
      "Solution EDR complète incluant protection des endpoints, threat hunting et détection avancée des menaces.",
    price: 4500,
    caracteristics: {
      osSupport: "Windows",
      cloud: "oui",
      license: "Annuel",
      support: "24/7",
    },
    category: "EDR",
  },
  {
    name: "SentinelOne Singularity",
    description:
      "EDR alimenté par l'IA, avec réponse automatisée aux incidents et analyse comportementale.",
    price: 4900,
    caracteristics: {
      osSupport: "macOS",
      license: "Mensuel",
      deployment: "Cloud/On-Premise",
    },
    category: "EDR",
  },
  {
    name: "Bitdefender GravityZone",
    description:
      "Protection centralisée pour les entreprises avec gestion des vulnérabilités intégrée.",
    price: 3700,
    caracteristics: {
      firewall: "oui",
      patchManagement: "oui",
      console: "Web",
      integration: "SIEM",
    },
    category: "SOC",
  },
  {
    name: "Microsoft Defender for Endpoint",
    description:
      "EDR intégré à l'écosystème Microsoft 365 avec capacités de threat intelligence.",
    price: 5200,
    caracteristics: {
      integration: "Office 365",
      threatIntelligence: "oui",
      automaticRemediation: "oui",
      osSupport: "Linux",
    },
    category: "EDR",
  },
  {
    name: "Trend Micro Apex One",
    description:
      "Protection complète des postes de travail avec détection avancée et analyse comportementale.",
    price: 3900,
    caracteristics: {
      machineLearning: "oui",
      centralizedManagement: "oui",
      updates: "Automatiques",
      languages: "Anglais",
    },
    category: "XDR",
  },
];

const categories = [
  {
    name: "SOC",
  },
  {
    name: "EDR",
  },
  {
    name: "XDR",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connecté à MongoDB");

    await Products.deleteMany();
    await Products.insertMany(products);
    await Categories.deleteMany();
    await Categories.insertMany(categories);

    console.log("Données insérées !");
  } catch (err) {
    console.error("Erreur lors du seed :", err);
  } finally {
    await mongoose.disconnect();
    console.log("Déconnecté");
  }
};

seed();
