export const routes = [
  ["/", "Home Page"],
  ["/about", "About"],
  ["/thisYear", "This Year"],
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
  // ["/gallery", "Gallery"],
  ["/lightTheWorld", "Light the World"],
  ["/contact", "Contact"],
];

export const adminRoutes = [
  ["/betaAndPsi/shiftLookup", "Shift Lookup"],
  ["/betaAndPsi/formLinks", "Form Links"],
];
