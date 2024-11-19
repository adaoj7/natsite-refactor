import {
  Day,
  Shift,
  User,
  Availability,
  Year,
  ShiftType,
  Church,
} from "../dbscripts/model.js";

export default {
  allShifts: async (req, res) => {
    try {
      const shift = await Year.findAll({
        include: [
          {
            model: Day,
            separate: true,
            order: ["dateId"],
            include: [
              {
                model: Shift,
                separate: true,
                order: ["shiftId"],
              },
            ],
          },
        ],
      });
      const thisYear = new Date().getFullYear();
      const thisYearShifts = shift.filter((e) => e.year === thisYear);
      res.json(thisYearShifts);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  getShiftsForAdmin: async (req, res) => {
    try {
      const { date, time } = req.body;
      const { dateId } = await Day.findOne({ where: { date: date } });
      const { shiftId } = await Shift.findOne({
        where: { timeRange: time, dateId: dateId },
      });
      const volunteersAvail = await User.findAll({
        include: [
          {
            model: Availability,
            where: { shiftId: shiftId },
            include: [
              {
                model: Shift,
              },
            ],
          },
        ],
      });

      res.json({ volunteersAvail });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  shiftAvailabilities: async (req, res) => {
    try {
      const shiftAvailabilities = await Shift.findAll({
        include: [
          {
            model: Availability,
            include: [
              {
                model: User,
                attributes: ["userId", "name"],
              },
            ],
          },
          {
            model: Day,
            attributes: ["date"],
          },
          {
            model: ShiftType,
            attributes: ["shiftType"],
          },
        ],
        attributes: ["shiftId", "timeRange", "isFull"],
        order: [["shiftId", "ASC"]],
      });

      const shiftTypesMap = {};

      shiftAvailabilities.forEach((shift) => {
        const shiftType = shift.shift_type.shiftType;
        const date = shift.day.date;
        let availabilities;
        if (shiftType === "host") {
          availabilities = 15 - shift.availabilities.length;
        } else if (shiftType === "setup") {
          availabilities = 50 - shift.availabilities.length;
        }

        if (!shiftTypesMap[shiftType]) {
          shiftTypesMap[shiftType] = [];
        }

        const existingDateEntry = shiftTypesMap[shiftType].find(
          (entry) => entry.date === date
        );

        if (existingDateEntry) {
          existingDateEntry.shifts.push({
            shiftId: shift.shiftId,
            timeRange: shift.timeRange,
            isFull: shift.isFull,
            availabilityCount: availabilities,
          });
        } else {
          shiftTypesMap[shiftType].push({
            date,
            shifts: [
              {
                shiftId: shift.shiftId,
                timeRange: shift.timeRange,
                isFull: shift.isFull,
                availabilityCount: availabilities,
              },
            ],
          });
        }
      });

      res.json(shiftTypesMap);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getAllChurchVolunteers: async (req, res) => {
    try {
      const volunteersWithShifts = await User.findAll({
        attributes: ["userId", "name", "email", "phone"],
        include: [
          {
            model: Church,
            attributes: ["churchId", "churchName"],
          },
          {
            model: Availability,
            required: true,
            include: [
              {
                model: Shift,
                attributes: ["shiftId", "timeRange", "isFull"],
              },
            ],
          },
        ],
        order: [
          ["name", "ASC"],
          [Availability, Shift, "shiftId", "ASC"],
        ],
      });
      // now I need to get the count of users in each church
      const churchCounts = volunteersWithShifts.reduce((acc, volunteer) => {
        const churchId = volunteer.church.churchId;
        if (!acc[churchId]) {
          acc[churchId] = 0;
        }
        acc[churchId]++;
        return acc;
      }, {});

      const churches = await Church.findAll({ order: [["churchId", "ASC"]] });
      // add count to each church
      const churchesWithCounts = churches.map((church) => {
        const count = churchCounts[church.churchId];
        if (count) {
          return {
            ...church.dataValues,
            count,
          };
        } else {
          return {
            ...church.dataValues,
            count: 0,
          };
        }
      });

      res.json(churchesWithCounts);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getChurchVolunteers: async (req, res) => {
    const { churchId } = req.body;
    if (!churchId) {
      res.status(400).send("Church ID is required");
      return;
    }
    console.log("churchId", churchId);
    try {
      const church = await Church.findOne({
        where: { churchId: churchId },
        include: [
          {
            model: User,
          },
        ],
      });
      const userList = await Promise.all(
        church.users.map(async (user) => {
          const userInfo = await User.findOne({
            where: { userId: user.userId },
            include: [
              {
                model: Availability,
              },
            ],
          });
          const availLength = userInfo.availabilities.length;

          const userObject = {
            userId: user.userId,
            name: user.name,
            email: user.email,
            phone: user.phone,
            availability: availLength,
          };
          return userObject;
        })
      );
      res.json(userList);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
