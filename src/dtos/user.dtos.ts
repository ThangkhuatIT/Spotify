import { Gender } from "~/models/enum"

export type updateProfileDto = {
  email?: string
  password?: string
  name?: string
  birtDate?: Date
  gender?:Gender
}
