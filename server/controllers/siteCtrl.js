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
      console.log(filteredShifts);
      res.json(filteredShifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(404);
    }
  },

  userShifts: async (req, res) => {
    try {
      console.log("userShifts", req.query);
      const { userId } = req.query;
      let shifts = await Availability.findAll({
        where: { userId: userId },
        include: [
          {
            model: Shift,
            // separate: true,
            order: ["shiftId"],
            include: [
              {
                model: Day,
              },
            ],
          },
        ],
      });
      const reducerFn = (acc, curr, index) => {
        if (index === 0) {
          let shiftArr = [];
          Object.defineProperties(shiftArr, {
            yearId: { value: curr.shift.day.yearId },
            date: { value: curr.shift.day.date },
          });
          console.log("curr", curr.shift);
          shiftArr.push(curr.shift);
          return shiftArr;
        }
        let shiftArr = acc;
        Object.defineProperties(shiftArr, {
          yearId: { value: curr.shift.day.yearId },
          date: { value: curr.shift.day.date },
        });
        console.log("curr", curr.shift);
        shiftArr.push(curr.shift);
        return shiftArr;
      };

      shifts = shifts.reduce(reducerFn, shifts[0]);
      shifts.map((shift) => {
        console.log("shift", shift);
        shift.date = shift.day.date;
        shift.shiftId = shift.day.yearId;
      });

      // res.json(shifts);
      console.log("shifts", shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(404);
    }
  },
  volunteer: async (req, res) => {
    try {
      const { userId, checked } = req.body;
      console.log(req.body);
      for (const shiftId of checked) {
        const newVolunteerShifts = await Availability.create({
          userId,
          shiftId,
        });
        console.log(newVolunteerShifts);
      }
      for (const shiftId of checked) {
        console.log(
          (await Availability.count({
            where: { shiftId: shiftId },
          })) >= 15
        );
        if (
          (await Availability.count({
            where: { shiftId: shiftId },
          })) >= 15
        ) {
          const shift = await Shift.findByPk(shiftId);
          if (!shift) {
            return res.sendStatus(404);
          }
          await shift.update({ isFull: true });
          console.log(shift);
        }
      }
      res.sendStatus(200);
    } catch (theseHands) {
      console.log(theseHands);
      res.sendStatus(500);
    }
  },
};
