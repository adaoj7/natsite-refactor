﻿import {
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

  shiftSignup: async (req, res) => {
    try {
      const { userId, checked } = req.body;
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
