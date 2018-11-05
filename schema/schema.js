const graphql = require("graphql");
const graphqlCustomTypes = require("graphql-custom-types");
const Vendor = require("../models/vendor");
const SpendingItem = require("../models/spendingItem");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

const {
    GraphQLDateTime,
} = graphqlCustomTypes;



//================ model ================ 
//SpendingItem
const SpendingItemType = new GraphQLObjectType({
    name: "SpendingItem",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        decription: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        amount: {
            type: GraphQLFloat
        },
        vendor: {
            type: VendorType,
            resolve(parent, args){
                
                return Vendor.findById(parent.vendorId)
            }
        },
        date: {
            type: GraphQLDateTime
        }
    })
});

//vendor
const VendorType = new GraphQLObjectType({
    name: "Vendor",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        } 
    })
});

//================ query ================ 
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        spendingItem: {
            type: SpendingItemType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return SpendingItem.findById(args.id)
            }
        },
        vendor: {
            type: VendorType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return Vendor.findById(args.id)
            }
        },
        spendingItems: {
            type: new GraphQLList(SpendingItemType),
            resolve(parent, args){
                return SpendingItem.find()
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve(parent, args){
                return Vendor.find()
            }
        }
    }) 
});
//================ mutation ================ 
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addSpendingItem: {
            type: SpendingItemType,
            args: {
                decription: {type: GraphQLString},
                category: {type: new GraphQLNonNull(GraphQLString)},
                amount: {type: new GraphQLNonNull(GraphQLFloat)},
                vendorId: {type: GraphQLID},
                date: {type: GraphQLDateTime}
            },
            resolve(parent, args){
                let newSpendingItem = new SpendingItem({
                    decription: args.decription,
                    category: args.category,
                    amount: args.amount,
                    vendorId: args.vendorId,
                    date: new Date()
                });
                return newSpendingItem.save();
            }
        },
        addVendor: {
            type: VendorType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                let newVendor = new Vendor({
                    name: args.name
                });
                return newVendor.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

