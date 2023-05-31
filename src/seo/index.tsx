import React from "react";
import { Helmet } from "react-helmet";

interface interFade_Helmet {
  title: string;
  description: string;
}
const SEO = ({ title, description }: interFade_Helmet) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
