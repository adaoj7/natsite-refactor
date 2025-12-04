import {
  User,
  Availability,
  db,
  Shift,
  Year,
  Day,
  ShiftType,
  Church,
  SiteLinks,
} from "./model.js";
import years from "../dbscripts/data/years.json" assert { type: "json" };
import days from "../dbscripts/data/days.json" assert { type: "json" };
import shifts from "../dbscripts/data/shifts.json" assert { type: "json" };
import shiftType from "../dbscripts/data/shift-type.json" assert { type: "json" };
import churches from "../dbscripts/data/churches.json" assert { type: "json" };
import links from "../dbscripts/data/links.json" assert { type: "json" };
console.log("Syncing database...");

await db.sync({ force: true });
// These will stay so that I can continue to add data to the db without deleting the users
const yearsInDB = await Promise.all(years.map((param) => Year.create(param)));

const daysInDB = await Promise.all(days.map((param) => Day.create(param)));

const shiftTypesInDB = await Promise.all(
  shiftType.map((shift) => ShiftType.create(shift))
);

const shiftsInDB = await Promise.all(
  shifts.map((param) => Shift.create(param))
);

const linksInDB = await Promise.all(
  links.map((param) => SiteLinks.create(param))
);

const churchesInDB = await Promise.all(
  churches.map((param) => Church.create(param))
);

const usersToCreate = [];
for (let i = 1; i <= 5; i++) {
  usersToCreate.push({
    name: `User ${i}`,
    email: `user${i}@test.com`,
    phone: `309123456${i}`,
    churchId: i,
  });
}

const usersInDB = await Promise.all(
  usersToCreate.map((user) => {
    return User.create(user);
  })
);

const availToCreate = [];

for (let i = 1; i <= 5; i++) {
  availToCreate.push({
    userId: `${i}`,
    shiftId: `${i}`,
  });
}

const availabilityInDB = await Promise.all(
  availToCreate.map((avail) => {
    return Availability.create(avail);
  })
);

console.log(yearsInDB);
console.log(daysInDB);
console.log(usersInDB);
console.log(availabilityInDB);
console.log(shiftsInDB);
console.log(shiftTypesInDB);
console.log(churchesInDB);
console.log(linksInDB);

await db.close();
console.log("Finished seeding database!");
