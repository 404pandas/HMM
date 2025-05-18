import db from "../config/connection.js";
import { Monster, User } from "../models/index.js";
import cleanDB from "./cleanDB.js";

import userData from "./userSeedData.json" with { type: "json" };
import monsterData from "./monsterSeedData.json" with { type: "json" };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await Monster.insertMany(monsterData);
    await User.create(userData);
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
