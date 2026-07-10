import React, { useEffect, useState } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: "tir2z79k6zhh",
  accessToken: "OUbFbvf7D_ncFJuYAbDAwXT_MXtt_kxdTbre9cN2nL0",
});

export default function ChumphonPinnaclePage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    client
      .getEntries({
        content_type: "diveSite", // Replace with your Contentful content type ID
        "fields.slug": "chumphon-pinnacle", // Replace with your slug field and value
        limit: 1,
      })
      .then((response) => {
        if (response.items.length > 0) {
          setContent(response.items[0].fields);
        }
      });
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <h1>{content.title}</h1>
      <div>{content.description}</div>
      {/* Render other fields as needed */}
    </div>
  );
}