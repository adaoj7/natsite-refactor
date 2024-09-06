﻿import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import Sequelize from "sequelize";

export const db = await connectToDB("postgresql:///natsite-refactor");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    church: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

export class Year extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Year.init(
  {
    yearId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "year",
    sequelize: db,
  }
);

export class Day extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Day.init(
  {
    dateId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
    },
    yearId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "day",
    sequelize: db,
  }
);
export class Shift extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Shift.init(
  {
    shiftId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timeRange: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    dateId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
    },
    isFull: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "shift",
    sequelize: db,
  }
);

export class Availability extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Availability.init(
  {
    availabilityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    shiftId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "availability",
    sequelize: db,
  }
);

export class Volunteer extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Volunteer.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    modelName: "volunteer",
    sequelize: db,
  }
);

export class ShiftType extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

ShiftType.init(
  {
    typeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shiftType: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "shift_type",
    sequelize: db,
  }
);

User.hasMany(Availability, { foreignKey: "userId" });
Availability.belongsTo(User, { foreignKey: "userId" });

Shift.hasMany(Availability, { foreignKey: "shiftId" });
Availability.belongsTo(Shift, { foreignKey: "shiftId" });

Year.hasMany(Day, { foreignKey: "yearId" });
Day.belongsTo(Year, { foreignKey: "yearId" });

Day.hasMany(Shift, { foreignKey: "dateId" });
Shift.belongsTo(Day, { foreignKey: "dateId" });

ShiftType.hasMany(Shift, { foreignKey: "typeId" });
Shift.belongsTo(ShiftType, { foreignKey: "typeId" });

// unable to increment until users has been established because volunteers will be linked to user and nots the other way around

// User.hasOne(Volunteer, {foreignKey: 'userId'})
// Volunteer.belongsTo(User, {foreignKey: 'userId'})
