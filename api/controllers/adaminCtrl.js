import {
  Day,
  Shift,
  User,
  Availability,
  Year,
  ShiftType,
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
      // console.log(checked)
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
        const availabilities = 15 - shift.availabilities.length;

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
      const churchVolunteers = await User.findAll({
        // churchUser does not exist at all
        // I need to find all users who have a shift
        include: [
          {
            model: Shift,
          },
        ],
      });
      // I need to rework this query tomorrow
      console.log(churchVolunteers);
      // res.json(churchVolunteers);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
