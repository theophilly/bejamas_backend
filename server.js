import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Article from './models/Article.js';

const Products = [
  {
    name: 'Samurai King Restling',
    category: 'landmarks',
    price: 101,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121523483_987e776e29_b.jpg',
      alt: 'homepage image',
    },
    bestseller: false,
    featured: true,
    details: {
      dimmentions: {
        width: 1020,
        height: 1020,
      },
      size: 15000,
      description:
        'So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely',
      recommendations: [
        {
          src:
            'https://live.staticflickr.com/65535/52121597813_477d38c645_b.jpg',
          alt: 'sdd',
        },
        {
          src:
            'https://live.staticflickr.com/65535/52121812034_0a1987f458_b.jpg',
          alt: 'dff',
        },
        {
          src:
            'https://live.staticflickr.com/65535/52122065705_65d5855fd4_b.jpg',
          alt: 'sder',
        },
      ],
    },
  },
  {
    name: 'Egg Balloon',
    category: 'people',
    price: 3.89,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121597103_c442e9e71b_b.jpg',
      alt: 'homepage image',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Egg Balloon',
    category: 'food',
    price: 93.89,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121811434_9d9fe41e10_b.jpg',
      alt: 'homepage image',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Man',
    category: 'people',
    price: 100,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52122065250_e48047be76_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Architecture',
    category: 'landmarks',
    price: 101,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52122065285_961e7fff84_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Camile Dog',
    category: 'pets',
    price: 101,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52122065310_d4c8f48712_b.jpg',
      alt: 'dd',
    },
    bestseller: true,
    featured: false,
    details: {},
  },
  {
    name: 'London Bay',
    category: 'cities',
    price: 101,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52120532327_56e3463410_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'London Bay',
    category: 'nature',
    price: 200.22,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121811644_7de29fccbc_b.jpg',
      alt: 'dd',
    },
    bestseller: true,
    featured: false,
    details: {},
  },
  {
    name: 'Alacantara',
    category: 'premium',
    price: 4000,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121597368_9710a9a3ef_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Image Address',
    category: 'people',
    price: 70.89,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121811724_cf093ecb6e_b.jpg',
      alt: 'homepage image',
    },
    bestseller: true,
    featured: false,
    details: {},
  },
  {
    name: 'Two Coup',
    category: 'food',
    price: 900,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121566141_3776e67ffc_b.jpg',
      alt: 'homepage image',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Man',
    category: 'people',
    price: 300,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52122065250_e48047be76_b.jpg',
      alt: 'dd',
    },
    bestseller: true,
    featured: false,
    details: {},
  },
  {
    name: 'Bejavas',
    category: 'landmarks',
    price: 501,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121811919_b2ffdbfbed_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Camile Dog',
    category: 'pets',
    price: 101,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52122065705_65d5855fd4_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Cup Bay',
    category: 'cities',
    price: 11,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121597663_ee8d10f2b4_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Rewind Up',
    category: 'pets',
    price: 20.22,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121597663_ee8d10f2b4_b.jpg',
      alt: 'dd',
    },
    bestseller: true,
    featured: false,
    details: {},
  },
  {
    name: 'Zamani Revolt',
    category: 'premium',
    price: 203,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121812034_0a1987f458_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Street con',
    category: 'pets',
    price: 1,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121597813_477d38c645_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Link up',
    category: 'cities',
    price: 111,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52122065905_51a2459987_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Unkindled',
    category: 'pets',
    price: 306.22,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121597903_13f0c2de9b_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
  {
    name: 'Wande UT',
    category: 'premium',
    price: 405,
    currency: 'USD',
    image: {
      src: 'https://live.staticflickr.com/65535/52121523483_987e776e29_b.jpg',
      alt: 'dd',
    },
    bestseller: false,
    featured: false,
    details: {},
  },
];

const app = express();

dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.egm3f.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log('database conection succesfully'))
  .catch((err) => console.log(err));

app.get('/fetch_products', async (req, res) => {
  Article.find({}).then(function (articles) {
    res.send(articles);
  });
});

app.get('/insertall', async (req, res) => {
  await Article.insertMany(Products)
    .then(function () {
      console.log('Data inserted'); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  res.json({ message: 'you are welcome' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('app running on port 5000'));
