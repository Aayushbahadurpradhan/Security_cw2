// const backendDomin = process.env.REACT_APP_BACKEND_URL//"po

// const SummaryApi = {
//     signUP: {
//         url: `${backendDomin}/api/signup`,
//         method: "post"
//     },
//     signIn: {
//         url: `${backendDomin}/api/signin`,
//         method: "post"
//     },
//     current_user: {
//         url: `${backendDomin}/api/user-details`,
//         method: "get"
//     },
//     logout_user: {
//         url: `${backendDomin}/api/userLogout`,
//         method: 'get'
//     },
//     allUser: {
//         url: `${backendDomin}/api/all-user`,
//         method: 'get'
//     },
//     updatePassword: {
//         url: `${backendDomin}/api/update-password`,
//         method: "post"
//     },
//     updateUser: {
//         url: `${backendDomin}/api/update-user`,
//         method: "put"
//     },
//     uploadProduct: {
//         url: `${backendDomin}/api/upload-product`,
//         method: 'post'
//     },
//     allProduct: {
//         url: `${backendDomin}/api/get-product`,
//         method: 'get'
//     },
//     updateProduct: {
//         url: `${backendDomin}/api/update-product`,
//         method: 'post'
//     },
//     categoryProduct: {
//         url: `${backendDomin}/api/get-categoryProduct`,
//         method: 'get'
//     },
//     categoryWiseProduct: {
//         url: `${backendDomin}/api/category-product`,
//         method: 'post'
//     },
//     productDetails: {
//         url: `${backendDomin}/api/product-details`,
//         method: 'post'
//     },
//     addToCartProduct: {
//         url: `${backendDomin}/api/addtocart`,
//         method: 'post'
//     },
//     addToCartProductCount: {
//         url: `${backendDomin}/api/countAddToCartProduct`,
//         method: 'get'
//     },
//     addToCartProductView: {
//         url: `${backendDomin}/api/view-card-product`,
//         method: 'get'
//     },
//     updateCartProduct: {
//         url: `${backendDomin}/api/update-cart-product`,
//         method: 'post'
//     },
//     deleteCartProduct: {
//         url: `${backendDomin}/api/delete-cart-product`,
//         method: 'post'
//     },
//     searchProduct: {
//         url: `${backendDomin}/api/search`,
//         method: 'get'
//     },
//     filterProduct: {
//         url: `${backendDomin}/api/filter-product`,
//         method: 'post'
//     },
//     payment: {
//         url: `${backendDomin}/api/checkout`,
//         method: 'post'
//     },
//     getOrder: {
//         url: `${backendDomin}/api/order-list`,
//         method: 'get'
//     },
//     allOrder: {
//         url: `${backendDomin}/api/all-order`,
//         method: 'get'
//     }

// }


// export default SummaryApi

const backendDomain = process.env.REACT_APP_BACKEND_URL; // Corrected the typo from 'backendDomin' to 'backendDomain'

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    updatePassword: {  // Added update password route
        url: `${backendDomain}/api/update-password`,
        method: "put"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: 'post'
    },
    payment: {
        url: `${backendDomain}/api/checkout`,
        method: 'post'
    },
    getOrder: {
        url: `${backendDomain}/api/order-list`,
        method: 'get'
    },
    allOrder: {
        url: `${backendDomain}/api/all-order`,
        method: 'get'
    },
    // Added audit log routes
    fetchAuditLogs: {
        url: `${backendDomain}/api/audit/logs`,
        method: 'get'
    },
    fetchAuditLogsByUserId: {
        url: `${backendDomain}/api/audit/logs/user/:userId`, // Replace :userId with actual user ID in implementation
        method: 'get'
    },
    fetchAuditLogsByAction: {
        url: `${backendDomain}/api/audit/logs/action/:action`, // Replace :action with actual action in implementation
        method: 'get'
    }
};

export default SummaryApi;
