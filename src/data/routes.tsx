export const routes = [
  ["/", "Home Page"],
  ["/about", "About"],
  ["/thisYear", "This Year"],
  [
    "menu",
    ["/getInvolved", "Get Involved"],
    [
      ["/getInvolved/availabilities", "Availabilities"],
      ["/getInvolved/setup", "Setup"],
      ["/getInvolved/host", "Host"],
      ["/getInvolved/myShifts", "My Shifts"],
      ["/getInvolved/music", "Music"],
      ["/getInvolved/poinsettias", "Poinsettias"],
      ["/getInvolved/FTN", "Friends of the Nativity"],
    ],
  ],
  ["/gallery", "Gallery"],
  ["/lightTheWorld", "Light the World"],
  ["/contact", "Contact"],
];

export const adminRoutes = [
  ["/betaPsi/shiftAvailabilities", "Shift Availabilities"],
  ["/betaPsi/shiftLookup", "Shift Lookup"],
  ["/betaPsi/formLinks", "Form Links"],
];

export const userRoutes = [
  ["/user/profile", "Profile"],
  ["/user/nativities", "Nativities"],
];
