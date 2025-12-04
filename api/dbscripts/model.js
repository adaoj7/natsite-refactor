﻿import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import "dotenv/config";

// eslint-disable-next-line no-undef
const { CONNECTION_STRING } = process.env;
const dbURI = CONNECTION_STRING;

export const db = await connectToDB(dbURI);

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
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    churchId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

export class Church extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Church.init(
  {
    churchId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    },
    churchName: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "church",
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
      autoIncrement: false,
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
      autoIncrement: false,
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

export class ShiftType extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

ShiftType.init(
  {
    typeId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
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

export class Shift extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Shift.init(
  {
    shiftId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    },
    timeRange: {
      type: DataTypes.STRING,
    },
    dateId: {
      type: DataTypes.INTEGER,
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

export class DummyAvailability extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

DummyAvailability.init(
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
    modelName: "dummy_availability",
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
    },
    lname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "volunteer",
    sequelize: db,
  }
);

export class SiteLinks extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

SiteLinks.init(
  {
    linkId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    linkType: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    linkName: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "site_links",
    sequelize: db,
  }
);

User.hasMany(Availability, { foreignKey: "userId" });
Availability.belongsTo(User, { foreignKey: "userId" });

User.hasMany(DummyAvailability, { foreignKey: "userId" });
DummyAvailability.belongsTo(User, { foreignKey: "userId" });

Shift.hasMany(Availability, { foreignKey: "shiftId" });
Availability.belongsTo(Shift, { foreignKey: "shiftId" });

Shift.hasMany(DummyAvailability, { foreignKey: "shiftId" });
DummyAvailability.belongsTo(Shift, { foreignKey: "shiftId" });

Year.hasMany(Day, { foreignKey: "yearId" });
Day.belongsTo(Year, { foreignKey: "yearId" });

Day.hasMany(Shift, { foreignKey: "dateId" });
Shift.belongsTo(Day, { foreignKey: "dateId" });

ShiftType.hasMany(Shift, { foreignKey: "typeId" });
Shift.belongsTo(ShiftType, { foreignKey: "typeId" });

Church.hasMany(User, { foreignKey: "churchId" });
User.belongsTo(Church, { foreignKey: "churchId" });

// unable to increment until users has been established because volunteers will be linked to user and nots the other way around

// User.hasOne(Volunteer, {foreignKey: 'userId'})
// Volunteer.belongsTo(User, {foreignKey: 'userId'})
