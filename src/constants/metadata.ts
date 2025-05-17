import * as R from 'ramda';

import { Blog } from '@/types/blog';
import { Project } from '@/types/project';

const WEB_URL = 'https://owner.bytesio.net';

const defaultMetadata = {
  title: 'jerrykhh',
  description:
    'Personal blog and portfolio of Jerry Kwok - Software Engineer in Hong Kong. Explore my projects, skills, and contact information',
  type: 'website',
  keywords: [
    'Jerry',
    'JerryKwok',
    'Jerrykhh',
    'Kwok',
    'software',
    'Software Engineering',
    'SE',
    'IT',
    'Information Technology',
    'Web',
    'React',
    'AI',
    'TS',
    'Typescript',
    'python',
    'AWS',
    'serverless',
    'developer',
    'cloud',
    'DevOps',
    'Infrastructure',
    'khh',
    'Creative',
    'App',
    'Nextjs',
    'SSR',
  ].join(', '),
  url: WEB_URL,
  image: `${WEB_URL}/public/static/icon.jpg`,
};

export const generateDefaultMetadata = (
  pageTitle?: string,
  link: string = ''
) => {
  const metadata = {
    title: pageTitle
      ? [pageTitle, defaultMetadata.title].join(' | ')
      : defaultMetadata.title,
  };
  return [
    { title: metadata.title },
    { name: 'description', content: defaultMetadata.description },
    { name: 'keywords', content: defaultMetadata.keywords },
    {
      property: 'og:type',
      content: defaultMetadata.type,
    },
    {
      property: 'og:title',
      content: metadata.title,
    },
    {
      property: 'og:url',
      content: `${defaultMetadata.url}${link}`,
    },
    {
      property: 'og:description',
      content: defaultMetadata.description,
    },
    {
      property: 'og:image',
      content: defaultMetadata.image,
    },
    {
      property: 'og:locale',
      content: 'en_HK',
    },
  ];
};

export const generateContentDefaultMetadata = (
  data: {
    properties: Blog | Project;
  },
  urlPrefix: string
) => {
  const metadata = {
    image: R.isEmpty(data.properties['social.og.image'])
      ? defaultMetadata.image
      : data.properties['social.og.image'],
    title: R.isEmpty(data.properties['social.og.title'])
      ? data.properties.title
      : data.properties['social.og.title'],
    description: R.isEmpty(data.properties['social.og.description'])
      ? data.properties.synopsis
      : data.properties['social.og.description'],
    keywords: `${defaultMetadata.keywords}${data.properties.tags.map((obj) => obj.name).join(', ')}`,
  };

  return [
    { title: metadata.title },
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: metadata.keywords },
    {
      property: 'og:type',
      content: defaultMetadata.type,
    },
    {
      property: 'og:title',
      content: metadata.title,
    },
    {
      property: 'og:url',
      content: R.isEmpty(data.properties.id)
        ? defaultMetadata.url
        : `${WEB_URL}${urlPrefix}/${data.properties.id}`,
    },
    {
      property: 'og:description',
      content: metadata.description,
    },
    {
      property: 'og:image',
      content: defaultMetadata.url,
    },
    {
      property: 'og:locale',
      content: 'en_HK',
    },
  ];
};
