import { SafeListing, SafeUser } from "@/types";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading subtitle="List of places you favorited!" title="Favorites" />
      <div
        className="
          2xl:grid-cols-6
          gap-8
          grid 
          grid-cols-1 
          lg:grid-cols-4
          md:grid-cols-3 
          mt-10
          sm:grid-cols-2 
          xl:grid-cols-5
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            data={listing}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
