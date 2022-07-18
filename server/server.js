const express = require('express');
const fs = require('fs');
const path = require('path');
const productsDBPath = path.join(__dirname, './db/products.json');
const cartDBPath = path.join(__dirname, './db/userCart.json');

const app = express();

app.use(express.json());
app.use('/', express.static('./public'));

app.get('/api/products', (req, res) => {
    fs.readFile(productsDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else res.send(data);
        console.log('data-get', data)
    });
});

app.get('/api/product/:id', (req, res) => {
    fs.readFile(productsDBPath, 'utf-8', (err, data) => {
        console.log('111111111111', req.params)
        if (err) res.send(err);
        const productsData = JSON.parse(data);
        console.log('data', data);
        const find = productsData.find((good) => {
            return good.id_product === +req.params.id
        });
        if (!find) res.send({result:0});   
        res.send(find)    
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            console.log('req.body', req.body);
            const cartData = JSON.parse(data);
            cartData.contents.push(req.body);

            fs.writeFile(cartDBPath, JSON.stringify(cartData), 'utf-8', (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            console.log('req.body', req.body);
            console.log(req.params);
            const cartData = JSON.parse(data);
            const find = cartData.contents.find((good) => {
                return good.id_product === +req.params.id
            });
            console.log('find', find);
            find.quantity += req.body.quantity;

            fs.writeFile(cartDBPath, JSON.stringify(cartData), 'utf-8', (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.delete('/api/cart/:id', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            const cartData = JSON.parse(data);
            cartData.contents = cartData.contents.filter((item) => {
                return item.id_product !== +req.params.id
            });

            fs.writeFile(cartDBPath, JSON.stringify(cartData), 'utf-8', (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});
app.delete('/api/cart', (req, res) => {
    fs.writeFile(cartDBPath, JSON.stringify({"contents":[]}), 'utf-8', (err) => {
        if (err) res.send(err);
        else res.send(JSON.stringify({ result: 1 }));
    });
});
app.listen(3000, () => {   // localhost:3000
    console.log('Server started!');
});