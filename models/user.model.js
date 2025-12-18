const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
         minLength: 6
        
    },
    userRole: {
        type: String,
        // required: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
}, {timestamps: true});// creates cretedAt,updatedAt by default

//This will help to excute logic inside it before saving the user data into database .This is called hooks[In RDBMS it is clled triggers]
userSchema.pre('save', async function (next) {
    // a trigger to encrypt the plain password before saving the user

    // const user=this;
    // console.log(this);
    //Here this refers to current entry or you can say user or {user object}

    const hash = await bcrypt.hash(this.password, 10);
    // console.log(hash);
    this.password = hash;
    // console.log(this.password);
    next();
});



const User=mongoose.model('User',userSchema);
module.exports=User;