import { Date, model, Schema, Types } from 'mongoose'
export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  passWord: string
  createdAt: Date
  updatedAt: Date
  emailConfirmed: boolean
  locked: boolean
  role: string
  followerCount: number
  birtDate?: Date
  gender?: string
  about?: string
  alias?: string
}

const userSchema = new Schema<IUser>(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passWord: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    emailConfirmed: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['MEMBER', ' ARTIST', 'ADMIN'],
      default: 'MEMBER'
    },
    followerCount: {
      type: Number,
      default: 0
    },
    birtDate: {
      type: Date,
      default: null
    },
    gender: {
      type: String,
      enum: ['MALE', ' FEMALE', 'OTHER'],
      default: 'MEMBER'
    },
    about: {
      type: String
    },
    alias: {
      type: String
    }
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        delete ret.__v
      }
    }
  }
)

const User = model('User', userSchema)

export default User
