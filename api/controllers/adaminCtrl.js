import { Day, Shift, User, Availability, Year } from "../dbscripts/model.js";

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
};
