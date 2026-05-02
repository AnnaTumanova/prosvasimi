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
    // All three slugs point to the same article in different languages
    let fileName: string;
    const accessibleJobsArticleSlugs = [
      'praca-dla-osob-z-niepelnosprawnosciami',
      'accessible-jobs-market-poland',
      'dostupniy-robochiy-rinok-poland'
    ];
    
    // Article: Accessible Jobs Market in Poland
    if (accessibleJobsArticleSlugs.includes(slug)) {
      switch (lang) {
        case 'en':
          fileName = 'accessible-jobs-market-en.md';
          break;
        case 'ua':
          fileName = 'dostupniy-robochiy-rinok-ua.md';
          break;
        case 'pl':
        default:
          fileName = 'praca-dla-osob-z-niepelnosprawnosciami-pl.md';
          break;
      }
    }
    // Article: Disability Employment Europe vs USA
    else if (slug === 'disability-employment-europe-vs-usa' || 
             slug === 'zatrudnienie-niepelnosprawnych-europa-usa' || 
             slug === 'pracevlashtuvannya-invalidiv-yevropa-ssha') {
      switch (lang) {
        case 'en':
          fileName = 'disability-employment-europe-vs-usa-en.md';
          break;
        case 'ua':
          fileName = 'pracevlashtuvannya-invalidiv-yevropa-ssha-ua.md';
          break;
        case 'pl':
        default:
          fileName = 'zatrudnienie-osob-niepelnosprawnych-europa-usa-pl.md';
          break;
      }
    } else {
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
