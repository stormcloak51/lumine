"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = Authorization;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("./roles.decorator");
const auth_guard_1 = require("../guards/auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
function Authorization(...roles) {
    if (roles.length > 0) {
        return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
    }
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
//# sourceMappingURL=auth.decorator.js.map