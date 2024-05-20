"use client";
import React, { useState, useEffect } from "react";

interface BrandProfileProps {
  brandId: string;
}
const url = process.env.API_URL!;
interface Brand {
  _id: string;
  name: string;
  email: string;
  tag_id: string;
  password: string;
}

const BrandProfile: React.FC<BrandProfileProps> = ({ brandId }) => {
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    // Fetch brand data by brandId
    const fetchBrandData = async () => {
      try {
        const response = await fetch(`/api/brands/${brandId}`);
        const data: Brand = await response.json();
        setBrand(data);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    fetchBrandData();
  }, [brandId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (brand) {
      setBrand({ ...brand, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API
    try {
      const response = await fetch(`/api/brands/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
      });
      if (response.ok) {
        alert("Brand profile updated successfully");
      } else {
        alert("Failed to update brand profile");
      }
    } catch (error) {
      console.error("Error updating brand profile:", error);
      alert("Error updating brand profile");
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        {brand && (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Brand Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Brand Name"
                value={brand.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="tag_id"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tag ID
              </label>
              <input
                type="text"
                name="tag_id"
                id="tag_id"
                placeholder="Enter tag ID"
                value={brand.tag_id}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BrandProfile;
