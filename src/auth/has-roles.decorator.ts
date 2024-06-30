import { SetMetadata } from "@nestjs/common";
import { Role } from "src/user/entities/role-enum";

export const HasRoles = (...role: Role[]) => SetMetadata('role',role)