// wizardConfig.js

export const WIZARD_VIEWS = [
  { id: "view-1", optional: false, label: "Source" },
  { id: "view-2", optional: false, label: "Fields" },
  { id: "view-3", optional: true, label: "Order By" },
];

export const REQUIRED_STEPS = WIZARD_VIEWS.filter(
  (view) => !view.optional
).length;