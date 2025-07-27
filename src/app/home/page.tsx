import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';


const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-28 py-16 min-h-[calc(100vh-8ch)] bg-background text-foreground">
      
      {/* Left Side - Text */}
      <div className="text-center md:text-left max-w-xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Discover Our Exclusive Products
        </h1>
        <p className="text-lg ">
          Shop the best selections with unmatched quality and style — curated just for you.
        </p>
        <Button size="lg" className="mt-4">
          Browse Now
        </Button>
      </div>

      {/* Right Side - Image Card */}
      <div className="mt-10 md:mt-0 md:ml-10">
        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Image
              src="https://cdn.pixabay.com/photo/2022/11/03/15/24/coffee-7567749_1280.jpg"
              alt="Coffee Product"
              width={400}
              height={400}
              className="object-cover w-full h-auto"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
