import mongoose from "mongoose"

const TicketCreateSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  sub: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }, 
})

const TicketCreate = mongoose.model("TicketCreate", TicketCreateSchema)
export default TicketCreate