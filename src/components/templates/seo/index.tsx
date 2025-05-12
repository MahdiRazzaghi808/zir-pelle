import Head from "next/head";

type OpenGraphProps = {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  image?: string;
};

type TwitterProps = {
  card?: string;
  site?: string;
  title?: string;
  description?: string;
  image?: string;
};

type AdditionalMeta = {
  name: string;
  content: string;
};

export type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  robots?: string;
  openGraph?: OpenGraphProps;
  twitter?: TwitterProps;
  additionalMeta?: AdditionalMeta[];
};

export default function SEO({
  title,
  description,
  keywords,
  author,
  canonical,
  robots,
  openGraph,
  twitter,
  additionalMeta,
}: SEOProps) {
  return (
    <Head>
      {/* Basic Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      {robots && <meta name="robots" content={robots} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Tags */}
      <meta
        property="og:title"
        content={(openGraph && openGraph.title) || title}
      />
      <meta
        property="og:description"
        content={(openGraph && openGraph.description) || description}
      />
      {canonical && (
        <meta
          property="og:url"
          content={(openGraph && openGraph.url) || canonical}
        />
      )}
      <meta
        property="og:type"
        content={(openGraph && openGraph.type) || "website"}
      />
      {openGraph && openGraph.image && (
        <meta property="og:image" content={openGraph.image} />
      )}

      {/* Twitter Cards Tags */}
      <meta
        name="twitter:card"
        content={(twitter && twitter.card) || "summary_large_image"}
      />
      {twitter && twitter.site && (
        <meta name="twitter:site" content={twitter.site} />
      )}
      <meta
        name="twitter:title"
        content={(twitter && twitter.title) || title}
      />
      <meta
        name="twitter:description"
        content={(twitter && twitter.description) || description}
      />
      {twitter && twitter.image && (
        <meta name="twitter:image" content={twitter.image} />
      )}

      {/* Additional Meta Tags */}
      {additionalMeta &&
        additionalMeta.map((meta) => (
          <meta key={meta.name} name={meta.name} content={meta.content} />
        ))}
    </Head>
  );
}
