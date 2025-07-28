import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  images: string[];
  rating: number;
  stock: number;
  thumbnail: string;
  brand: string;
}

interface ProductPageProps {
  product: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-200 text-yellow-300'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="px-4 md:px-12 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {product.map((item) => (
          <Link href={`/product/${item?.id}`}>
          <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm text-gray-600">
                    {item.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {item.images.slice(0, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`product-img-${index}`}
                    width={60}
                    height={60}
                    className="rounded border"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stock:</span>
                <Badge variant="secondary">{item.stock}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Rating:</span>
                <div className="flex">{renderStars(item.rating)}</div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
              <span className="font-medium">${item.price.toFixed(2)}</span>
              <span className="text-green-600 font-semibold">
                {item.discountPercentage}% Off
              </span>
            </CardFooter>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
