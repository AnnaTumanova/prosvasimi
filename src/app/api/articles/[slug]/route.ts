import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/app/articles');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en';

  try {
    // Map slug to file based on language
    let fileName: string;
    switch (slug) {
      case 'praca-dla-osob-z-niepelnosprawnosciami':
        fileName = lang === 'en' ? 'accessible-jobs-market-en.md' : 
                   lang === 'ua' ? 'dostupniy-robochiy-rinok-ua.md' : 
                   'praca-dla-osob-z-niepelnosprawnosciami-pl.md';
        break;
      case 'accessible-jobs-market-poland':
        fileName = 'accessible-jobs-market-en.md';
        break;
      case 'dostupniy-robochiy-rinok-poland':
        fileName = 'dostupniy-robochiy-rinok-ua.md';
        break;
      default:
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const fullPath = path.join(articlesDirectory, fileName);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Article file not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const article = {
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
      author: matterResult.data.author,
      tags: matterResult.data.tags,
      image: matterResult.data.image,
      slug: matterResult.data.slug,
      lang: matterResult.data.lang,
      content: contentHtml,
    };

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error reading article:', error);
    return NextResponse.json({ error: 'Failed to read article' }, { status: 500 });
  }
}
