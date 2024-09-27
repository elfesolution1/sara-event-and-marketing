"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CustomCard({ imageUrl, title, description, buttonText }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={200}
          className="object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <Button>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
