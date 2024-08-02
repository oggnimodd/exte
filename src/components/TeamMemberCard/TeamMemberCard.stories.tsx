import { faker } from "@faker-js/faker";
import type { Story } from "@ladle/react";
import { nanoid } from "nanoid";
import TeamMemberCard from ".";

export const Default: Story = () => {
  return (
    <div className="pt-16 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map(() => (
        <TeamMemberCard
          key={nanoid()}
          name={faker.person.fullName()}
          role={faker.person.jobTitle()}
          image={faker.image.avatar()}
          twitter={faker.internet.url()}
          linkedin={faker.internet.url()}
        />
      ))}
    </div>
  );
};
