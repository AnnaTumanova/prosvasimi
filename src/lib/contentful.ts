import { createClient, ContentfulClientApi } from 'contentful';

let client: ContentfulClientApi<undefined> | null = null;

function getClient(): ContentfulClientApi<undefined> | null {
  if (client) return client;
  
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken) {
    console.warn('Contentful credentials not configured');
    return null;
  }
  
  client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });
  
  return client;
}

export interface Article {
  id: string;
  titleEn: string;
  titleUk: string;
  titlePl: string;
  contentEn: string;
  contentUk: string;
  contentPl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getArticles(): Promise<Article[]> {
  const contentfulClient = getClient();
  if (!contentfulClient) {
    return [];
  }
  
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'article',
      order: ['-sys.createdAt'],
    });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      titleEn: item.fields.titleEn || '',
      titleUk: item.fields.titleUk || '',
      titlePl: item.fields.titlePl || '',
      contentEn: item.fields.contentEn || '',
      contentUk: item.fields.contentUk || '',
      contentPl: item.fields.contentPl || '',
      published: item.fields.published ?? true,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching articles from Contentful:', error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  const contentfulClient = getClient();
  if (!contentfulClient) {
    return null;
  }
  
  try {
    const entry = await contentfulClient.getEntry(id);
    return {
      id: entry.sys.id,
      titleEn: (entry.fields as any).titleEn || '',
      titleUk: (entry.fields as any).titleUk || '',
      titlePl: (entry.fields as any).titlePl || '',
      contentEn: (entry.fields as any).contentEn || '',
      contentUk: (entry.fields as any).contentUk || '',
      contentPl: (entry.fields as any).contentPl || '',
      published: (entry.fields as any).published ?? true,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching article from Contentful:', error);
    return null;
  }
}
