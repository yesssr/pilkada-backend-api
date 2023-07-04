import { genSaltSync, hashSync, compare } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export function hashPass(password: string) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

export async function comparePass(password: string, hashPass: string) {
  const isMatch = await compare(password, hashPass);
  return isMatch;
}

export function createToken(payload: JwtPayload) {
  const token = sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRED,
  });
  return token;
}

export function verifyToken(token: string) {
  const isMatch = verify(token, process.env.JWT_SECRET_KEY!);
  return isMatch;
}

export function success(
  res: Response,
  msg: string,
  statusCode: number,
  data: any,
  pagination?: object,
  token?: string
) {
  return res.status(statusCode).json({
    success: true,
    message: msg,
    statusCode: statusCode,
    data: data,
    token: token,
  });
}

export function pagination(total: number, start: number, end: number) {
  let length = end - start - 1;
  let currentPage = Math.ceil(end / length);

  return {
    current_page: currentPage,
    next_page: currentPage + 1,
    previous_page: currentPage - 1,
    total_pages: Math.ceil(total / length),
    per_page: length,
    total_entries: total,
  };
}
