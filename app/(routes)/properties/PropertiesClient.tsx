"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/types";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading subtitle="List of your properties" title="Properties" />
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
            actionId={listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
            data={listing}
            disabled={deletingId === listing.id}
            key={listing.id}
            onAction={onDelete}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
