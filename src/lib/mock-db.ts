export interface MockUser {
  email: string;
  role: "admin" | "student" | "instructor";
}

export const currentUserRole: MockUser = {
  email: "dummy@gmail.com",
  role: "student",
};

export const getRoleByEmail = (email: string): MockUser["role"] => {
  return currentUserRole.role;
};
