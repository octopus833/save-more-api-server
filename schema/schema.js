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

//dummy data
let spendingItems = [
    {
        id: "0",
        decription: "",
        category: "grocery",
        amount: 5.98,
        vendorId: "0",
        date: new Date(2018, 9, 19)
    },
    {
        id: "1",
        decription: "",
        category: "grocery",
        amount: 110.72,
        vendorId: "1",
        date: new Date(2018, 9, 15)
    },
    {
        id: "2",
        decription: "immigration",
        category: "other",
        amount: 255,
        vendorId: "2",
        date: new Date(2018, 9, 16)
    }
]
let vendors = [
    {
        id: "0",
        name: "metro"
    },
    {
        id: "1",
        name: "season food mart"
    },
    {
        id: "2",
        name: "government of canada"
    },
]

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
                
                return vendors.filter(vendor=>vendor.id === parent.vendorId)[0]
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
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return spendingItems.filter(item=>item.id === args.id)[0]
            }
        },
        vendor: {
            type: VendorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return vendors.filter(vendor=>vendor.id === args.id)[0]
            }
        },
        spendingItems: {
            type: new GraphQLList(SpendingItemType),
            resolve(parent, args){
                return spendingItems
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve(parent, args){
                return vendors
            }
        }
    }) 
});
//================ mutation ================ 


module.exports = new GraphQLSchema({
    query: RootQuery
})

