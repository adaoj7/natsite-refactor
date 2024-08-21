export const routes = [
  ["/", "Home Page"],
  ["/about", "About"],
  [
    "menu",
    ["/getInvolved", "Get Involved"],
    [
      ["/getInvolved/setup", "Setup"],
      ["/getInvolved/host", "Host"],
      ["/getInvolved/myShifts", "My Shifts"],
      ["/getInvolved/donate", "Donate"],
    ],
  ],
  ["/thisYear", "This Year"],
  ["/gallery", "Gallery"],
  ["/lightTheWorld", "Light the World"],
  ["/contact", "Contact"],
];

export const adminRoutes = [
  ["/betaAndPsi/shiftLookup", "Shift Lookup"],
  ["/betaAndPsi/futureShifts", "Add Future Shifts"],
  ["/betaAndPsi/nomination", "Nomination Link"],
];
