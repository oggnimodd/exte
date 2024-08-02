import { Card, Image } from "@nextui-org/react";
import { Linkedin, Twitter } from "lucide-react";
import type React from "react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  twitter: string;
  linkedin: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
  twitter,
  linkedin,
}) => {
  return (
    <Card shadow="lg" className="md:max-w-md py-4 mx-6 sm:mx-0">
      <div className="flex flex-col items-center">
        <Image
          className="mb-3"
          src={image}
          alt={name}
          width={150}
          height={150}
        />
        <p className="text-xl font-bold mb-1">{name}</p>
        <p className="mb-3">{role}</p>
        <div className="flex space-x-4">
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="color-primary-500" size={24} />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="color-primary-500" size={24} />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default TeamMemberCard;
