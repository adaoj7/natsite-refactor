import { DummyAvailability, Shift, Day } from "../dbscripts/model.js";

export default {
  dummyVolunteer: async (req, res) => {
    try {
      const { userId, checked, finalChecked, shiftType } = req.body;
      console.log("body", req.body);
      for (const array of finalChecked) {
        const shiftId = array[0];
        const signups = array[1];
        for (let i = 0; i < signups; i++) {
          await DummyAvailability.create({
            userId: userId,
            shiftId: shiftId,
          });
        }
      }

      if (shiftType === "setup") {
        for (const array of checked) {
          const shiftId = array[0];
          if (
            (await DummyAvailability.count({
              where: { shiftId: shiftId },
            })) >= 50
          ) {
            const shift = await Shift.findByPk(shiftId);
            if (!shift) {
              return res.sendStatus(404);
            }
            await shift.update({ isFull: true });
          }
        }
      } else if (shiftType === "host") {
        for (const shiftId of checked) {
          if (
            (await DummyAvailability.count({
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
      }

      res.sendStatus(200);
    } catch (theseHands) {
      console.log(theseHands);
      res.sendStatus(500);
    }
  },
  dummyUserShifts: async (req, res) => {
    try {
      const { userId } = req.query;
      const shifts = await DummyAvailability.findAll({
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

      console.log("shifts", shifts);

      const reducerFn = (acc, curr, index) => {
        let shiftArr = acc;
        shiftArr.push([curr.availabilityId, curr.shift]);
        return shiftArr;
      };

      const userShifts = shifts.reduce(reducerFn, []).map((shift) => {
        const availId = shift[0];
        const shiftObj = shift[1];
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
    } catch (error) {
      console.log(error);
      res.sendStatus(404);
    }
  },
  dummyDeleteShift: async (req, res) => {
    const { availabilityId, shiftId, typeId } = req.body;

    console.log("availabilityId", availabilityId);

    try {
      for (const id of availabilityId) {
        await DummyAvailability.destroy({
          where: {
            availabilityId: id,
          },
        });
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }

    if (typeId === 1) {
      if (
        (await DummyAvailability.count({ where: { shiftId: shiftId } })) <= 50
      ) {
        const shift = await Shift.findByPk(shiftId);
      }
    } else if (typeId === 2) {
      if (
        (await DummyAvailability.count({ where: { shiftId: shiftId } })) <= 15
      ) {
        const shift = await Shift.findByPk(shiftId);
      }
    }

    console.log("availability destroyed");
  },
};
