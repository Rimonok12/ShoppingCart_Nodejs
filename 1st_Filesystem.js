const fs = require('fs');

//All Synchronous == Blocking
//----------------->Read<------------------------//

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
//-------------------Write---------------------->>//
// const textOut = `That's what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');

//All Non-Blocking , Asynchronous way =>
//Call Back hell  ::==> should be Figured out.
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  // 2nd parameter = callback func
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    // 2nd parameter = callback func
    console.log(data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log(`Your file has been written `);
      });
    });
  });
});
console.log('Will read File');
