import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

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
  try {
    const entries = await client.getEntries({
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
  try {
    const entry = await client.getEntry(id);
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
