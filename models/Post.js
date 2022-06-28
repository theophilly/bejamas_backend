import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  etr: {
    type: String,
  },
  image: {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
});

export default mongoose.model('Post', postSchema);
