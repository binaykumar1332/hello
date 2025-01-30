import mongoose from "mongoose"

const MainTicketSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  description: {
    type: String
  },
  Title: {
    type: String
  },
  isCheked: {
    type: String,
    default: false
  }
})

const MainTicket = mongoose.model("MainTicket", MainTicketSchema)
export default MainTicket