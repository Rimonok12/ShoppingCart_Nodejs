//File System :
const fs = require('fs');
//http Server:
const http = require('http');

//------SLUGIFY------------//
const slugify = require('slugify');

//-------_ROUTING----------

const url = require('url');

//--------------------------------------- Server -----------------------------------------//
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};

//synchronous api best for one time use. .blocking.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
//---------------Slugify---------//
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);
//-------------------------------//
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

// TODO:
// BUG
// FIXME:

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// const server = http.createServer((req, res) => {
//   //   console.log(req.url);
//   const { query, pathname } = url.parse(req.url, true);

//   //   const pathname = req.url;
//   //overview html + page
//   if (pathname === '/overview' || pathname === '/') {
//     res.writeHead(200, { 'Content-type': 'text/html' });

//     const cardsHTML = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join('');
//     const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

//     res.end(output);
//   } //product page // template-product :
//   else if (pathname === '/product') {
//     res.writeHead(200, { 'Content-type': 'text/html' });

//     const product = dataObj[query.id];
//     const output = replaceTemplate(tempProduct, product);

//     res.end(output);
//   }
//   //else if (pathname === '/') {
//   //     res.end('Welcome to  The ROOT Server!!!');
//   //   }
//   //
//   else if (pathname === '/api') {
//     //   api-json::aynchronous
//     // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
//     //   const productData = JSON.parse(data);
//     //   //   console.log(productData);
//     //   res.writeHead(200, { 'Content-type': 'application/json' });
//     //   res.end(data);
//     // });

//     ///synchronous on the upper::
//     res.writeHead(200, { 'Content-type': 'application/json' });
//     res.end(data);
//   } //not found func:
//   else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//       'my-own-header': 'hello-world',
//     });
//     res.end('<h1>Page not Found!</h1>');
//   }
// });
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started TO LIstening on 8000');
});
