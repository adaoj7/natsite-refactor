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
      const shifts = await Availability.findAll({
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
          shiftArr.push(curr.shift);
          return shiftArr;
        }
        let shiftArr = acc;
        shiftArr.push(curr.shift);
        return shiftArr;
      };

      const newShifts = shifts.reduce(reducerFn, shifts[0]);
      const returnShifts = newShifts.map((shift) => {
        return {
          shiftId: shift.shiftId,
          timeRange: shift.timeRange,
          date: shift.day.date,
          dateId: shift.dateId,
          typeId: shift.typeId,
          isFull: shift.isFull,
        };
      });
      res.json(returnShifts);
      console.log("shifts", returnShifts);
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
