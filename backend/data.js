import bcrypt from 'bcryptjs'

const Data = {
  users: [
    {
      name: 'Oneilla',
      email: 'admin1@admin.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Carlson',
      email: 'admin2@admin.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false
    }
  ],
  products: [
    {
      // _id:'1',
      name: 'Backless Gown',
      slug: 'backless-gown',
      category: 'Party',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'InestaGowns',
      rating: 4.5,
      numReviews: 10,
      description: 'Party pink light gowns'
    },
    {
      //_id:'2',
      name: 'Stripless Gown',
      slug: 'stripless-gown',
      category: 'Red Carpet',
      image: '/images/p2.jpg',
      price: 250,
      countInStock: 0,
      brand: 'InestaGowns',
      rating: 4.0,
      numReviews: 10,
      description: 'All black Stripless gowns for red Carpets',
    },
    {
      // _id:'3',
      name: 'Wedding Queen',
      slug: 'wedding-queen',
      category: 'Wedding',
      image: '/images/p3.jpg',
      price: 25,
      countInStock: 15,
      brand: 'InestaWeddings',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      //_id:'4',
      name: 'Flary Ball Gown',
      slug: 'flary-ball-gown',
      category: 'Ball-Gowns',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'InestaBallGowns',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      //_id:'4',
      name: 'Traditional Gown',
      slug: 'traditional-gown',
      category: 'Traditional Wears',
      image: '/images/p5.jpg',
      price: 109,
      countInStock: 5,
      brand: 'InestaTradition',
      rating: 4.5,
      numReviews: 20,
      description: 'Represent your culture while looking like a queen',
    },
    {
      //_id:'4',
      name: 'Fitting slim Gown',
      slug: 'fitting-slim-gown',
      category: 'Party',
      image: '/images/p6.jpg',
      price: 80,
      countInStock: 5,
      brand: 'InestaPartyGowns',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
   
    
  ],
};

export default Data;