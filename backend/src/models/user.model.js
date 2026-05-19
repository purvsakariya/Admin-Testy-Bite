import mongoose,{Schema} from 'mongoose'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
            minLength: 1,
            maxLength: 30,
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            minLength: 6,
            maxLength: 50,
        },
        accessToken:{
            type:String
        }
    },{timestamps:true}
)

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePass = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.accessTokenGenerator = function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User",userSchema);