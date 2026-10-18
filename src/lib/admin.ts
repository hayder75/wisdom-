// Admin credentials.
//
// IMPORTANT: These are development placeholders. In production, set the
// WISDOM_ADMIN_PASSWORD and WISDOM_ADMIN_SECRET environment variables and
// change the password before going live.
export const adminPassword =
  process.env.WISDOM_ADMIN_PASSWORD ?? "wisdom-admin";

export const adminSecret =
  process.env.WISDOM_ADMIN_SECRET ?? "wisdom-dev-secret-change-me";

export const adminCookieName = "wisdom_admin";
export const adminSessionHours = 12;