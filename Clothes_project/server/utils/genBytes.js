import crypto from "crypto";

const randomBytes = crypto.randomBytes(32);
const hexStr = randomBytes.toString("hex");

console.log(hexStr);
