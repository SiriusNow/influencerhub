import Image from "next/image";
import Link from "next/link";
import ProductRating from "./Rating";
import CollabImage from "@/assets/img/team-4-470x470.png";
import InfluencerImage from "@/assets/img/team-2-800x800.jpg";
import AcceptButton from "./AcceptButton";

const url = process.env.API_URL!;
const defaultImage =
  "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=";

export default function Collaboration({ data, user }: any) {
  const { influencer, brand, collab } = data;

  return (
    <tr key={collab._id}>
      <td className="px-6 py-4 whitespace-nowrap">{brand.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{influencer.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{collab.collab_detail}</td>
      <td className="px-6 py-4 whitespace-nowrap">{collab.collab_salary}</td>
      <td className="px-6 py-4 whitespace-nowrap">{collab.state}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <AcceptButton col={collab} user={user} />
      </td>
    </tr>
  );
}
