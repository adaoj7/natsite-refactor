import {
  Shift,
  ShiftType,
  Day,
  Year,
  Availability,
  User,
} from "../../dbscripts/model.js";

export default {
  setupShifts: async (req, res) => {
    const shift = await Year.findAll({
      include: [
        {
          model: Day,
          separate: true,
          order: ["dateId"],
          include: [
            {
              model: Shift,
              where: { isFull: false },
              separate: true,
              order: ["shiftId"],
              include: [
                {
                  model: ShiftType,
                  where: { shiftType: "setup" },
                },
              ],
            },
          ],
        },
      ],
    });
    let filteredShifts;
    filteredShifts = shift.filter((year) => {
      const yearDate = new Date().getFullYear();
      if (year.year === yearDate) {
        return year;
      }
    });
    filteredShifts = filteredShifts[0].days.filter((day) => {
      if (day.shifts.length > 0) {
        return day;
      }
    });

    res.json(filteredShifts);
  },

  hostShifts: async (req, res) => {
    const shift = await Year.findAll({
      include: [
        {
          model: Day,
          separate: true,
          order: ["dateId"],
          include: [
            {
              model: Shift,
              where: { isFull: false },
              separate: true,
              order: ["shiftId"],
              include: [
                {
                  model: ShiftType,
                  where: { shiftType: "host" },
                },
              ],
            },
          ],
        },
      ],
    });
    let filteredShifts;
    filteredShifts = shift.filter((year) => {
      const yearDate = new Date().getFullYear();
      if (year.year === yearDate) {
        return year;
      }
    });
    filteredShifts = filteredShifts[0].days.filter((day) => {
      if (day.shifts.length > 0) {
        return day;
      }
    });
    res.json(filteredShifts);
  },
};
