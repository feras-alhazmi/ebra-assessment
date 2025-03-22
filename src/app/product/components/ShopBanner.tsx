import Image from "next/image";
import React from "react";

const ShopBanner = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
      {/* Background Image */}
      <Image
        src="/banner.svg" // Replace with your actual image path
        alt="Shop Banner"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center  bg-opacity-10">
        {/* Breadcrumb */}
        <p className="text-sm md:text-base text-gray-600">
          <span className="text-gray-500">Home</span> &gt;{" "}
          <span className="text-black">Shop</span>
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-black mt-2">
          Shop Page
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mt-2">
          Let's design the place you always imagined.
        </p>
      </div>
    </div>
  );
};

export default ShopBanner;
