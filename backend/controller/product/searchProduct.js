// const productModel = require("../../models/productModel")

// const searchProduct = async(req,res)=>{
//     try{
//         const query = req.query.q 

//         const regex = new RegExp(query,'i','g')

//         const product = await productModel.find({
//             "$or" : [
//                 {
//                     productName : regex
//                 },
//                 {
//                     category : regex
//                 }
//             ]
//         })


//         res.json({
//             data  : product ,
//             message : "Search Product list",
//             error : false,
//             success : true
//         })
//     }catch(err){
//         res.json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = searchProduct


const productModel = require("../../models/productModel")

const searchProduct = async (req, res) => {
    try {
        // Sanitize and validate input
        let query = req.query.q;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                message: "Invalid search query",
                error: true,
                success: false
            });
        }

        // Limit query length to prevent abuse
        if (query.length > 100) {
            return res.status(400).json({
                message: "Query too long",
                error: true,
                success: false
            });
        }

        // Escape any special characters for the regex
        const sanitizedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        // Create a case-insensitive regular expression
        const regex = new RegExp(sanitizedQuery, 'i');

        // Limit and paginate results (e.g., max 20 results per page)
        const limit = parseInt(req.query.limit) || 20;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        // Perform the search on specific fields only
        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        })
            .limit(limit)
            .skip(skip)
            .exec();

        res.json({
            data: products,
            message: "Search Product list",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = searchProduct;
