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
        console.log("acc", acc);
        let shiftArr = acc;
        shiftArr.push([curr.availabilityId, curr.shift]);
        return shiftArr;
      };

      const userShifts = shifts.reduce(reducerFn, []).map((shift) => {
        console.log("shift", shift);
        const availId = shift[0];
        const shiftObj = shift[1];
        console.log("shiftObj", shiftObj);
        return {
          availabilityId: availId,
          shiftId: shiftObj.shiftId,
          timeRange: shiftObj.timeRange,
          date: shiftObj.day.date,
          dateId: shiftObj.dateId,
          typeId: shiftObj.typeId,
          isFull: shiftObj.isFull,
        };
      });

      res.json(userShifts);
      console.log("usershifts", userShifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(404);
    }
  },
  volunteer: async (req, res) => {
    try {
      const { userId, checked } = req.body;
      for (const shiftId of checked) {
        const newVolunteerShifts = await Availability.create({
          userId,
          shiftId,
        });
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
        }
      }
      res.sendStatus(200);
    } catch (theseHands) {
      console.log(theseHands);
      res.sendStatus(500);
    }
  },
  deleteShift: async (req, res) => {
    console.log(req.body);
    const { availabilityId, shiftId } = req.body;

    try {
      await Availability.destroy({
        where: {
          availabilityId: availabilityId,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }

    if ((await Availability.count({ where: { shiftId: shiftId } })) <= 15) {
      const shift = await Shift.findByPk(shiftId);
      await shift.update({ isFull: false });
      console.log(shift);
    }

    console.log("availability destroyed");
  },
};
