export type registerDto = {
  name: string
  email: string
  password: string
}
export type loginDto = {
  email: string
  passWord: string
}
export type resetPassDto = {
  password: string
  newPassword: string
}
