import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/contentful';

export async function GET() {
  try {
    const articles = await getArticles();
    const publishedArticles = articles.filter(article => article.published);
    return NextResponse.json(publishedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
