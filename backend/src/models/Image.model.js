import mongoose , {Schema} from "mongoose"

const ImageSchema = new mongoose.Schema(
    {
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
      image: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export const Image = mongoose.model("Image",ImageSchema)