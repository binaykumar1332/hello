import mongoose from "mongoose"
async function ConnectDb(){
  await mongoose.connect("mongodb+srv://thegangstaguy001:NuLcOmlDKV6UGNoi@cluster0.nh1ewxi.mongodb.net/discordTicket?retryWrites=true&w=majority")
  .then(() => console.log("Connected to db"))
  .catch((err)=> console.log("error", err))
}
export default ConnectDb