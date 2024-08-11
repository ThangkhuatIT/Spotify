import { Schema, Types } from "mongoose";

export interface IAtist{
    _id:Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    name:String,
    birthDate?:Date,
    about?:string,
    imageUrl?:string,
    imageId?:string,
    followerCount:number,
    alias?:string,
    email: string,
    phoneNumber?: string,
    emailConfirmed:boolean,
}

// const userSchema = new Schema<IAtist>(
//   {
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//     },
//     emailConfirmed:{
//       type: Boolean,
//       default:false
//     },
//     locked:{
//       type:Boolean,
//       default:false
//     },
//     role:{
//       type:typeof Enums.Role,
//       default:Enums.Role.MEMBER
//     },
//     followerCount:{
//       type:Number,
//       default:0
//     },
//     birtDate:{
//       type:Date,
//       default:null
//     },
//     gender:{
//       type:typeof Enums.Gender,
//       default:null,
//     },
//     about:{
//       type:String,
//     },
//     alias:{
//       type:String,
//     }
//   },
//   {
//     timestamps: true,
//     toObject: {
//       transform(doc, ret, options) {
//         delete ret.__v;
//       },
//     },
//   }
// );

// const User = model("User", userSchema);

// export default User;