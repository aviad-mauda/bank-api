const express = require('express')
const Customer = require('../db/models/customer')
const User = require('../db/models/user')
const auth = require('../middleware/auth')

const app = express()

app.use(express.json())

app.get('/test', async (req, res) => {
    res.send({res: "good"});
    
})

app.get('/getAllCustomers', async (req, res) => {
    try {
        const dbCustomers = await Customer.find({});

        if (!dbCustomers) {
            return res.status(404).send()
        }
        let customers = [];

        for (let customer of dbCustomers) {
            delete customer._doc.__v;
            customers.push(customer);  
        }
        res.send(customers);
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ token })
    } catch (e) {
        res.status(400).send()
    }
})

// router.post('/logout', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.user.save()

//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })

app.post('/getCustomer', auth, async (req, res) => {
    try {
        const customer = await Customer.findOne({ customerID: req.body.customerID });
        if (!customer) {
            return res.status(404).send()
        }
        delete customer._doc.__v;
        res.send(customer);
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/createCustomer', auth, async (req, res) => {
    const customer = new Customer(req.body);
    try{
        await customer.save();
    } catch (e) {
        res.status(400).send(e);
    }
    res.status(201).send({res:"customer was saved"});
})

app.post('/updateCustomerPermissions', auth, async (req, res) => {
    try {
        const customer = await Customer.findOne({ customerID: req.body.customerID });

        if (!customer) {
            res.status(404).send()
        }

        const found = customer._doc.accountPermissions.find(permission => permission.accountNumberIBAN == req.body.accountNumberIBAN)
        var index = customer._doc.accountPermissions.indexOf(found);
        customer._doc.accountPermissions[index].accountStatus = req.body.accountStatus;
        try{
            await customer.save();
        } catch (e) {
            res.status(400).send(e);
        }
        res.status(201).send({res:"customer was updated"});
    } catch (e) {
        res.status(500).send()
    }
})

app.delete('/deleteCustomer', auth, async (req, res) => {

    try {
        const customer = await Customer.findOneAndDelete({ customerID: req.body.customerID })

        if (!customer) {
            res.status(404).send()
        }

        res.send(customer)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = app