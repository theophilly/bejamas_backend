import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Article from './models/Article.js';
import Post from './models/Post.js';

const Posts = [
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52126993429_177b51f9fe_w.jpg',
      alt: 'homepage image',
    },
    category: 'e-commerce',
    etr: '4 min',
    title: 'How to configure the DNS to point to your VetrinaLive',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52125727592_e0342033cb_w.jpg',
      alt: 'homepage image',
    },
    category: 'politics',
    etr: '6 min',
    title:
      'You need to set a width on the container to be able to truncate the text inside',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52126749401_0942a85c9c_w.jpg',
      alt: 'dd',
    },
    category: 'sports',
    etr: '10 min',
    title:
      'Manchester United are in disarray and its the toughest job of Erik ten Hags life, says Paul Merson',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52126993459_ccc4cde51b_w.jpg',
      alt: 'dd',
    },
    category: 'finance',
    etr: '2 min',
    title:
      'Sterling Alternative Finance launches investment platform Sterling Alternative Finance launches investment platform',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52125727642_268b8c5239_w.jpg',
      alt: 'dd',
    },
    category: 'tech',
    etr: '4 min',
    title:
      'A Big Bitcoin Warning…And Other Small Business Tech News This Week A Big Bitcoin Warning',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52126993499_eaf84e274f_w.jpg',
      alt: 'dd',
    },
    category: 'africa',
    etr: '4 min',
    title:
      'Fertiliser shortage hits African farmers battling food crisis Fertiliser shortage hits African ',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52125727707_0a007ec75f_w.jpg',
      alt: 'dd',
    },
    category: 'tech',
    etr: '5 min',
    title:
      'Honeywell Group partners Lagos Innovates to upskill young tech entrepreneurs Honeywell Group partners',
  },
  {
    image: {
      src: 'https://live.staticflickr.com/65535/52125727547_f4943cb7e2_w.jpg',
      alt: 'dd',
    },
    category: 'investments',
    etr: '9 min',
    title: '5 Key Ingredients Every Company Needs in Their Strategic Narrative',
  },
];

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
            'https://live.staticflickr.com/65535/52126776193_6935f84aed_w.jpg',
          alt: 'sdd',
        },
        {
          src:
            'https://live.staticflickr.com/65535/52125727547_f4943cb7e2_w.jpg',
          alt: 'dff',
        },
        {
          src:
            'https://live.staticflickr.com/65535/52126749301_147c75bd88_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126993429_177b51f9fe_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727592_e0342033cb_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126749401_0942a85c9c_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126993459_ccc4cde51b_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727642_268b8c5239_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126993499_eaf84e274f_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727707_0a007ec75f_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52127248650_9d54829e53_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126749491_cca8ba6415_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727812_bd85f29845_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52127248685_3f3ed74b01_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126776548_703f71aba5_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52127248730_8b2190144d_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126776598_a618d69d91_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727912_267be5e123_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52127248805_5b43c06d1f_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126776193_6935f84aed_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727547_f4943cb7e2_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52126993429_177b51f9fe_w.jpg',
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
      src: 'https://live.staticflickr.com/65535/52125727592_e0342033cb_w.jpg',
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

app.get('/fetch_posts', async (req, res) => {
  Post.find({}).then(function (posts) {
    res.send(posts);
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

app.get('/insertallposts', async (req, res) => {
  await Post.insertMany(Posts)
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
