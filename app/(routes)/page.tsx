import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import { IListingsParams } from "@/types";

interface HomeProps {
  searchParams: IListingsParams;
}

export const dynamic = "force-dynamic";

const HomePage = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log({ listings, searchParams });
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

  return (
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
  );
};

export default HomePage;
