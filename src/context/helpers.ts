import { ROLES } from "@/constants/roles";
import { User as FirebaseUser } from "firebase/auth";
import { Role } from "@/types/role.type";
import { User } from "@/types/user.type";

export async function formatAuthUser(
  user: FirebaseUser | null,
): Promise<User | null> {
  if (user) {
    const firstName = user?.displayName?.substring(
      0,
      user.displayName.indexOf(" "),
    );
    const lastName = user.displayName?.substring(
      user.displayName.indexOf(" ") + 1,
    );

    const token = await user.getIdTokenResult();
    const tempRoles: Set<Role> = new Set<Role>([]);
    ROLES.forEach((role) => {
      if (token.claims[role]) {
        tempRoles.add(role);
      }
    });

    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      uid: user?.uid || "",
      clientId: (token?.claims?.clientId as string) || "",
      roles: Array.from(tempRoles),
      authStatus: "active",
    };
  }
  return null;
}
