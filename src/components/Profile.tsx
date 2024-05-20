"use client";

import React, { useState, useEffect } from "react";

interface UserProfileProps {
  userId: string;
}
const url = process.env.API_URL!;
interface User {
  _id: string;
  name: string;
  email: string;
  social_link: string;
  instagram_link: string;
  facebook_link: string;
  youtube_link: string;
  service_id: string;
  tag_id: string;
  password: string;
  image: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data by userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/influencers/${userId}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API
    try {
      const response = await fetch(`/api/influencers/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={user.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="instagram_link"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Instagram Link
              </label>
              <input
                type="text"
                name="instagram_link"
                id="instagram_link"
                placeholder="Enter Instagram link"
                value={user.instagram_link}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="facebook_link"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Facebook Link
              </label>
              <input
                type="text"
                name="facebook_link"
                id="facebook_link"
                placeholder="Enter Facebook link"
                value={user.facebook_link}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="youtube_link"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                YouTube Link
              </label>
              <input
                type="text"
                name="youtube_link"
                id="youtube_link"
                placeholder="Enter YouTube link"
                value={user.youtube_link}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="service_id"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Service ID
              </label>
              <input
                type="text"
                name="service_id"
                id="service_id"
                placeholder="Enter service ID"
                value={user.service_id}
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
                value={user.tag_id}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="image"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Image URL
              </label>
              <input
                type="text"
                name="image"
                id="image"
                placeholder="Enter image URL"
                value={user.image}
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

export default UserProfile;
