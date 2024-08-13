import { model, Schema, Types } from 'mongoose'

export interface IToken {
  _id: Types.ObjectId
  token: string
  expirytime: Date
  type: string
  userId: Types.ObjectId
}
const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['CONFIRM_EMAIL', 'RESET_PASSWORD', 'REFRESH_TOKEN']
  },
  expirytime: {
    type: Date
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})
const Token = model('Token', tokenSchema)
export default Token
