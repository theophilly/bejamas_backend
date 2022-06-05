import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  currency: {
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
  featured: {
    type: Boolean,
  },
  details: {
    type: Object,
  },
});

export default mongoose.model('Article', articleSchema);
