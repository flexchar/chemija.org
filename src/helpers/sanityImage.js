import imageUrlBuilder from '@sanity/image-url';
import sanityConfig from '@/../sanity.config';

/**
 * Format sanity image
 *
 * @see https://www.sanity.io/docs/image-url
 *
 * @param {object|string} source SanityImage object or URL to SanityImage
 *
 * @return ImageUrlBuilder remember to output final url with .url()
 */
export default function (source) {
    const builder = imageUrlBuilder(sanityConfig);
    return builder.image(source).fit('max').auto('format');
}
