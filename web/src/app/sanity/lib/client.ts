import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Setting this to false since you'll likely want real-time updates for your quiz content
  perspective: "published",
});
