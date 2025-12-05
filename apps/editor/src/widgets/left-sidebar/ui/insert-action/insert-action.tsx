import { GithubArtworks } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function InsertAction() {
  const artworks = new GithubArtworks();

  const { data, isSuccess } = useQuery({
    queryKey: ["folders"],
    queryFn: () => artworks.fetchAllArtworksData(),
  });

  console.log("data", data, "isSuccess", isSuccess);

  return <p>insert action</p>;
}
