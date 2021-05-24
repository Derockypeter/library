const express = require('express');
const chalk = require('chalk'); // Adds color to the text
const debug = require('debug')('app'); // Replaces our console.log
const morgan = require('morgan'); // For history
const path = require('path');

const bookRouter = express.Router();

const app = express();
const port = process.env.PORT || 3000;

app.use('/books', bookRouter);
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views/');
app.set('view engine', 'ejs');

bookRouter.route('/')
  .get((req, res) => {
    res.render('books',
      {
        title: 'My Library',
        nav: [
          { links: '/books', title: 'Books' },
          { links: '/authors', title: 'Author' },
        ],
      });
  });
bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello Single Books');
  });

app.get('/', (req, res) => res.render('index',
  {
    title: 'My Library',
    nav: [
      { links: '/books', title: 'Books' },
      { links: '/authors', title: 'Author' },
    ],
  }));
app.listen(port, () => debug(`Library app listening on port localhost:${chalk.green(port)} !`));
