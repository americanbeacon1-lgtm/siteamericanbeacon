import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portal-db.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return { articles: [], adSlots: [], subscribers: [], settings: {}, adInquiries: [] };
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { articles: [], adSlots: [], subscribers: [], settings: {}, adInquiries: [] };
  }
}

function writeDB(data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving ad inquiry to DB:', e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, contactName, email, budget, campaignGoals } = body;

    if (!email || !contactName) {
      return NextResponse.json(
        { success: false, error: 'Email and contact name are required.' },
        { status: 400 }
      );
    }

    const inquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      company: company || 'N/A',
      contactName,
      email,
      budget: budget || '$10k-$25k',
      campaignGoals: campaignGoals || '',
      recipientEmail: 'gustavomourabarbosagmm@gmail.com',
      createdAt: new Date().toISOString(),
      status: 'pending_review',
    };

    const db = readDB();
    if (!Array.isArray(db.adInquiries)) {
      db.adInquiries = [];
    }
    db.adInquiries.unshift(inquiry);
    writeDB(db);

    return NextResponse.json({
      success: true,
      message: 'Inquiry successfully recorded and queued for commercial director gustavomourabarbosagmm@gmail.com.',
      inquiry,
    });
  } catch (error) {
    console.error('Error processing advertising inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry.' },
      { status: 500 }
    );
  }
}
