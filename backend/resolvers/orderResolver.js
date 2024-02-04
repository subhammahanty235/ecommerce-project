const { default: mongoose } = require('mongoose');
const Orders = require('../models/orders.model')
const Item = require('../models/items.model')

const orderResolvers = {
    Query: {
        getAllOrders: async () => {
            try {
                const orders = await Orders.aggregate([
                    {
                        $lookup: {
                            from: 'users', 
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $lookup: {
                            from: 'items',
                            localField: 'itemId',
                            foreignField: '_id',
                            as: 'item',
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                    {
                        $unwind: '$item',
                    },
                    {
                        $project: {
                            user: {
                                _id: '$user._id',
                                name: '$user.name',
                                email: '$user.email',
                                totalExpense: '$user.totalExpense',
                                joined: '$user.joined',
                            },
                            item: {
                                _id: '$item._id',
                                itemName: '$item.itemName',
                                price: '$item.price',
                                totalSales: '$item.totalSales',
                                totalStocks: '$item.totalStocks',
                            },
                            orderDate: 1,
                            orderStatus: 1,
                        },
                    },
                ]);

                return orders;
            } catch (error) {

            }
        },
        getUsersOrders: async (_, args) => {
            console.log(args)
            try {

                const orders = await Orders.aggregate([
                    {
                        $match: {
                            userId: mongoose.Types.ObjectId.createFromHexString(args.userId),
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $lookup: {
                            from: 'items', 
                            localField: 'itemId',
                            foreignField: '_id',
                            as: 'item',
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                    {
                        $unwind: '$item',
                    },
                    {
                        $project: {
                            user: {
                                _id: '$user._id',
                                name: '$user.name',
                                email: '$user.email',
                                totalExpense: '$user.totalExpense',
                                joined: '$user.joined',
                            },
                            item: {
                                _id: '$item._id',
                                itemName: '$item.itemName',
                                price: '$item.price',
                                totalSales: '$item.totalSales',
                                totalStocks: '$item.totalStocks',
                            },
                            orderDate: 1,
                            orderStatus: 1,
                        },
                    },
                ]);

                console.log(orders)
                return orders;
            } catch (error) {

            }
        }
    },
    Mutation: {
        orderItem: async (_, args) => {
            const order = await Orders.create({
                userId: args.order.userId,
                itemId: args.order.itemId,
            })

            await Item.findByIdAndUpdate(args.order.itemId,{
                $inc:{
                    totalStocks:-1,
                    totalsales:1
                }
            })


            return order;
        },

    }
}

module.exports = orderResolvers