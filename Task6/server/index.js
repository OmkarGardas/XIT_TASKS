import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const corsOptions = {
  origin:'*',
  Credentials:true,
  optionSuccesStatus:200,
}
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/crudop")
  .then(() => {
    console.log("DB connected succesfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema(
  {
    employeeName: String,
    email: String,
    phoneNo: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

//read data
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.status(200).json({ success: true, data: data });
});

//create data
app.post("/create", async (req, res) => {
  // console.log(req.body);

  const data = new userModel(req.body);
  await data.save();
  console.log(data);

  res.send({ success: true, msg: "successfully created" ,data:data});
});

//update data
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {_id, ...rest} = req.body;
    const data = await userModel.updateOne({_id:_id},rest)

    res.send({success:true, msg:"update successfully", data: data});
})

//deleting user

app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const data = await userModel.deleteOne({_id:id})
    res.send({success:true, msg:"deleted successfully", data: data});

})