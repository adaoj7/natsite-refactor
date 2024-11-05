import { DummyAvailability, Shift, Day } from "../dbscripts/model.js";

export default {
  dummyVolunteer: async (req, res) => {
    try {
      const { userId, checked } = req.body;
      for (const shiftId of checked) {
        const newVolunteerShifts = await DummyAvailability.create({
          userId,
          shiftId,
        });
      }
      for (const shiftId of checked) {
        console.log(
          (await DummyAvailability.count({
            where: { shiftId: shiftId },
          })) >= 15
        );
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
    const { availabilityId, shiftId } = req.body;

    try {
      await DummyAvailability.destroy({
        where: {
          availabilityId: availabilityId,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }

    if (
      (await DummyAvailability.count({ where: { shiftId: shiftId } })) <= 15
    ) {
      const shift = await Shift.findByPk(shiftId);
      await shift.update({ isFull: false });
      console.log(shift);
    }

    console.log("availability destroyed");
  },
};
