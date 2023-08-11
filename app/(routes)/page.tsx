import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import { IListingsParams } from "@/types";

interface HomeProps {
  searchParams: IListingsParams;
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            2xl:grid-cols-6
            gap-8
            grid 
            grid-cols-1 
            lg:grid-cols-4
            md:grid-cols-3 
            pt-24
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
    </ClientOnly>
  );
};

export default HomePage;
