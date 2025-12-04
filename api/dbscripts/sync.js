import { Availability } from "./model.js";
import { Op } from "sequelize";
import process from "process";

console.log("Syncing database...");

try {
  const availToDelete = [];
  for (let i = 1; i <= 5; i++) {
    availToDelete.push({
      userId: `${i}`,
      shiftId: `${i}`,
    });
  }

  const deletedCount = await Availability.destroy({
    where: {
      [Op.or]: availToDelete,
    },
  });

  console.log(`Deleted ${deletedCount} records`);
  console.log("Finished syncing database!");
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
}
