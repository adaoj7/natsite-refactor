﻿import {
  Shift,
  ShiftType,
  Day,
  Year,
  Availability,
  User,
  SiteLinks,
  Church,
} from "../dbscripts/model.js";

export default {
  setupShifts: async (req, res) => {
    const shift = await Year.findAll({
      include: [
        {
          model: Day,
          include: [
            {
              model: Shift,
              where: { isFull: false },
              separate: true,
              order: [["shiftId", "ASC"]],
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
      order: [
        ["year", "ASC"],
        [Day, "dateId", "ASC"],
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
            include: [
              {
                model: Shift,
                where: { isFull: false },
                separate: true,
                order: [["shiftId", "ASC"]],
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
        order: [
          ["year", "ASC"],
          [Day, "dateId", "ASC"],
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
  churches: async (req, res) => {
    try {
      const churches = await Church.findAll();
      res.json(churches);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  links: async (req, res) => {
    try {
      const { linkType } = req.query;
      const link = await SiteLinks.findAll();

      if (linkType) {
        const filteredLink = link.filter((link) => {
          if (link.linkType === linkType) {
            return link;
          }
        });
        console.log("filteredLink", filteredLink[0]);
        res.json(filteredLink[0]);
      } else {
        res.json(link.sort((a, b) => a.linkType.length - b.linkType.length));
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  updateFormLinks: async (req, res) => {
    try {
      console.log("req.body", req.body);
      const links = await SiteLinks.findAll();
      links
        .sort((a, b) => a.linkType.length - b.linkType.length)
        .forEach((link) => {
          link.update({ link: req.body[link.linkType] });
        });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
