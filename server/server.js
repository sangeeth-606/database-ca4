


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(' MongoDB Error:', err));

const publisherSchema = new mongoose.Schema({
  name: String,
  location: String
});
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});
const bookSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  author:{
    type:String
  },
  status:{
    type:String,
    default:"reading"
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  }
});


const User = mongoose.model('User',userSchema);
const Book = mongoose.model('Book',bookSchema);

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/users', async(req , res)=>{
    try {
        const {username,email,password}= req.body;
        const newUser= new User({username,email,password})
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
})
app.post('api/books', async(req,res)=>{
    try {
        const {title,author,status}=req.body;
        const newBook= new Book({title,author,status});
        await newBook.save();
        res.status(201).json({message:"new book created"},newBook)
    } catch (error) {
        
    }

})
app.get('/',(req,res)=>{
    res.status(200).json({message:"hihihi"})
})
app.get('/books/:id', async (req, res)=>{
    try {
        const {id}= req.params.id;
        const bookdata= await Book.findById(id)
        res.status(200).json(bookdata)
    } catch (error) {
        
    }
})

app.listen(8000, () => console.log(' Server running at http://localhost:8000'));
