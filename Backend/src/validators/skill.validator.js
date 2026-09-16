"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSkillSchema = void 0;
const zod_1 = require("zod");
exports.addSkillSchema = zod_1.z.object({
    skillId: zod_1.z.string().length(24, "Invalid skill id"),
});
