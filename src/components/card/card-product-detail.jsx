import React from "react";

const CardProductDetails = ({ product }) => {
  return (
    // <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
    //   {/* Left side: Details and Actions */}
    //   <div className="md:w-1/2 p-6 flex flex-col justify-between">
    //     <div>
    //       <p className="text-gray-500 text-sm">{product?.category?.name}</p>
    //       <h2 className="text-4xl font-bold text-gray-800 mt-2">
    //         {product?.title}
    //       </h2>
    //       {/* Star rating placeholder */}
    //       <div className="flex items-center mt-2">
    //         <div className="text-yellow-400">
    //           <span className="text-xl">★★★★☆</span>
    //         </div>
    //         <span className="ml-2 text-gray-600 text-sm">22 reviews</span>
    //       </div>
    //       <p className="text-gray-600 mt-4 leading-relaxed">
    //         {product?.description}
    //       </p>
    //       <p className="text-green-600 font-bold text-3xl mt-4">
    //         ${product?.price}
    //       </p>
          
    //       {/* Quantity and Dimensions placeholders */}
    //       <div className="mt-6">
    //         <label className="block text-gray-700 font-semibold mb-2">Select quantity</label>
    //         <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
    //           <button className="px-3 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300">-</button>
    //           <span className="px-4 py-2 text-gray-800 border-x border-gray-300">0</span>
    //           <button className="px-3 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300">+</button>
    //         </div>
    //       </div>
    //       <div className="mt-4">
    //         <label className="block text-gray-700 font-semibold mb-2">Dimensions</label>
    //         <select className="w-full border border-gray-300 p-2 rounded-md">
    //           <option>Select a dimension</option>
    //         </select>
    //       </div>
    //     </div>
        
    //     <button className="mt-8 w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors">
    //       Add to Cart
    //     </button>
    //   </div>

    //   {/* Right side: Main Image and Thumbnails */}
    //   <div className="md:w-1/2 p-6 flex flex-col items-center">
    //     <img
    //       src={product?.images?.[0] || "https://via.placeholder.com/600"}
    //       alt={product?.title}
    //       className="w-full h-auto object-cover rounded-lg mb-4"
    //     />
    //     {/* Thumbnails section (static for demonstration) */}
    //     <div className="grid grid-cols-3 gap-4 w-full">
    //       {product?.images?.map((image, index) => (
    //         <img
    //           key={index}
    //           src={image}
    //           alt={`${product?.title} thumbnail ${index + 1}`}
    //           className="w-full h-auto object-cover rounded-md cursor-pointer border border-gray-300 hover:border-blue-500 transition-colors"
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
      {/* Left side: Details and Actions */}
      <div className="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <p className="text-gray-500 text-sm">{product?.category?.name}</p>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            {product?.name}
          </h2>
          {/* Star rating placeholder */}
          <div className="flex items-center mt-2">
            <div className="text-yellow-400">
              <span className="text-xl">★★★★☆</span>
            </div>
            <span className="ml-2 text-gray-600 text-sm">22 reviews</span>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product?.description}
          </p>
          <p className="text-green-600 font-bold text-3xl mt-4">
            ${product?.priceOut}
          </p>
          
          {/* Quantity and Dimensions placeholders */}
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">Select quantity</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button className="px-3 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300">-</button>
              <span className="px-4 py-2 text-gray-800 border-x border-gray-300">0</span>
              <button className="px-3 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300">+</button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">Dimensions</label>
            <select className="w-full border border-gray-300 p-2 rounded-md">
              <option>Select a dimension</option>
            </select>
          </div>
        </div>
        
        <button className="mt-8 w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors">
          Add to Cart
        </button>
      </div>

      {/* Right side: Main Image and Thumbnails */}
      <div className="md:w-1/2 p-6 flex flex-col items-center">
        <img
          src={product?.thumbnail || "https://via.placeholder.com/600"}
          alt={product?.title}
          className="w-full h-auto object-cover rounded-lg mb-4"
        />
        {/* Thumbnails section (static for demonstration) */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {product?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product?.name} thumbnail ${index + 1}`}
              className="w-full h-auto object-cover rounded-md cursor-pointer border border-gray-300 hover:border-blue-500 transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardProductDetails;