import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

interface newtype {
    id:number,
    title:string,
    description:string,
    price:number,
    discountPercentage:number,
    images:string[],
    rating:number,
    stock:number,
    thumbnail:string,
    brand:string,
}


interface ProductPageProps {
  product: newtype[];
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(product[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product || product.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
          <p className="text-gray-600">Please provide product data to display.</p>
        </div>
      </div>
    );
  }

  const discountedPrice = selectedProduct.price * (1 - selectedProduct.discountPercentage / 100);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Selection */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {product.map((item) => (
              <Card 
                key={item.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedProduct.id === item.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedProduct(item)}
              >
                <CardContent className="p-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      ${Math.round(item.price * (1 - item.discountPercentage / 100))}
                    </span>
                    <div className="flex items-center">
                      {renderStars(item.rating).slice(0, 1)}
                      <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <img
                  src={selectedProduct.images[selectedImageIndex]}
                  alt={selectedProduct.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
            {selectedProduct.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProduct.title} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer flex-shrink-0 ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {selectedProduct.category}
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedProduct.title}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{selectedProduct.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(selectedProduct.rating)}</div>
                <span className="text-sm text-gray-600">
                  ({selectedProduct.rating} out of 5)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${Math.round(discountedPrice)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${selectedProduct.price}
                </span>
                <Badge variant="destructive">
                  {Math.round(selectedProduct.discountPercentage)}% OFF
                </Badge>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Stock Info */}
            <div className="flex items-center space-x-2">
              <Badge variant={selectedProduct.stock > 10 ? "default" : "destructive"}>
                {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of stock'}
              </Badge>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  disabled={quantity >= selectedProduct.stock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                disabled={selectedProduct.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${Math.round(discountedPrice * quantity)}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{selectedProduct.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{selectedProduct.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-medium">{selectedProduct.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{selectedProduct.rating}/5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;