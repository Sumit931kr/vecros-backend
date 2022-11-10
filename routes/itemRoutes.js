import express from 'express'
import Item from '../Modal/itemSchema.js'
import Product from '../Modal/productSchema.js'
const router = express.Router();


// Creating the item

router.post('/createitem', async (req, res) => {
    try {
        const { itemname, description, img, price } = req.body;
        const newItem = await Item.create({
            itemname,
            price,
            description,
            img,
        });
        res.status(200).send(newItem)

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})


// Get all the items

router.get('/items', async (req, res) => {

    try {
        console.log("yes");
        const Items = await Item.find({});
        res.status(200).send(Items)

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})


// Get a particular Item
router.get('/items/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const item = await Item.findById(id)
        console.log(item);
         res.status(200).json(item);
        
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
})


// Creating a API to order something

router.get('/item/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const isitem = await Item.findById(id)
        const addproduct = await Product.create({
            itemname: isitem.itemname,
            price: isitem.price,
            description: isitem.description,
            img: isitem.img,
            createdAt: new Date().toISOString()
        });
        if (isitem) {


            res.status(200).send(addproduct);

            //  await Item.findByIdAndDelete(id);
        }


    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
})


// API to get all the previous ORDER

router.get('/previousorder', async (req, res) => {

    try {
        const product = await Product.find({});
        res.status(200).send(product)

    } catch (error) {
        res.status(402).send("new",error.message);
        console.log(error.message);
    }
})


export default router;