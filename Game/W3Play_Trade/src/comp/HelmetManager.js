import React from "react";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async

const HelmetManager = ({
  title,
  description,
  keywords,
  robots = "index, follow",
  canonical,
  author,
  publisher,
  lang,
  themeColor,
  viewport,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {author && <meta name="author" content={author} />}
      {publisher && <meta name="publisher" content={publisher} />}
      {lang && <html lang={lang} />}
      {themeColor && <meta name="theme-color" content={themeColor} />}
      {viewport && <meta name="viewport" content={viewport} />}
    </Helmet>
  );
};

export default HelmetManager;
