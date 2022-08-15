const router = require('express').Router();
const Item = require('../models/Item')
const Cart = require('../models/Cart')

router.post('/additem', async(req,res) => {
    const {name, price, rating, image, category} = req.body
    if(!name || !price || !rating || !image || !category)
    {
        res.status(400).send('Please enter all the fields')
        return

    }
    try{
        const item = new Item({
            name:name,
            price: price,
            rating: rating,
            image: image,
            category: category
        })
        const savedItem = await item.save()
        res.status(201).json({
            _id: item.id,
            name: item.name,
            price: item.price,
            rating: item.rating,
            image: item.image,
            category: item.category
        })
        // res.status(200).send(savedUser)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
        return
    }

})

router.get('/getitems', async(req,res) => {
    const items = await Item.find()
    if(!items)
    {
        res.status(400).send('No items found')
        return
    }
        res.status(200).json(items)
    
})

router.post('/addtocart', async(req,res) => {
    const {name, price, rating, image, user, status} = req.body
    if(!name || !price || !rating || !image || !user || !status)
    {
        res.status(400).send('Please enter all the fields')
        return

    }
    // console.log(uid, name, price, rating, image, category)
    try{
        const item = new Cart({
            name:name,
            price: price,
            rating: rating,
            image: image,
            user: user,
            status: status
        })
        const savedItem = await item.save()
        res.status(201).json({
            _id: item.id,
            name: item.name,
            price: item.price,
            rating: item.rating,
            image: item.image,
            user: item.user,
            status: status
        })
        // res.status(200).send(savedUser)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
        return
    }

})

router.post('/getcart', async(req,res) => {
    const {user} = req.body
    const cart = await Cart.find({user:user, status: "cart"})
    if(!cart)
    {
        res.status(400).send('No items found')
        return
    }
        res.status(200).json(cart)
    
})
router.post('/getorders', async(req,res) => {
    const {user} = req.body
    const cart = await Cart.find({user:user, status: "order"})
    if(!cart)
    {
        res.status(400).send('No items found')
        return
    }
        res.status(200).json(cart)
    
})

router.post('/deleteitem', async(req,res) => {
    const {id, user} = req.body
    const item = await Cart.findByIdAndDelete({_id:id, status: "cart", user:user})
    if(!item)
    {
        res.status(400).send('No items found')
        return
    }
        res.status(200).json(item)
    
})

router.post('/buyorder', async(req,res) => {
    const {user} = req.body
    Cart.updateMany({status:"cart", user: user}, 
        {status:"order"}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(401).send(err)
        }
        else{
            console.log("Updated Docs : ", docs);
            res.status(200).json(docs)
        }
    });
})
module.exports = router;