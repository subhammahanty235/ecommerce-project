const Item = require('../models/items.model')

const itemsResolvers = {
    Query: {
        getAllItems: async () => {
            try {
                const items = await Item.find({});
                return items;
            } catch (error) {

            }
        },
        getSingleItem: async (_, id) => {
            console.log(id)
            try {
                const item = await Item.findById(id.id);
                return item;

            } catch (error) {

            }
        }
    },
    Mutation: {
        addItem: async (_, args) => {


            const item = await Item.create({
                itemName: args.item.itemName,
                itemDescription: args.item.itemDescription,
                price: args.item.price,
                totalStocks: args.item.totalStocks
            })

            return item;
        },

        deleteItem: async (_, itemId) => {
            console.log(itemId)
            const deletedItem = await Item.findByIdAndDelete(itemId.itemId);

            if (!deletedItem) {
                throw new Error('Item not found');
            }

            return deletedItem;
        },
        updateItem: async (_, args) => {
            try {
                
                const { id, ...updateItemData } = args.item;
                const updatedItem = await Item.findByIdAndUpdate(id, updateItemData, { new: true });

                if (!updatedItem) {
                    throw new Error('Item not found');
                }

                return updatedItem;
            } catch (error) {

            }
        }

    }
}

module.exports = itemsResolvers