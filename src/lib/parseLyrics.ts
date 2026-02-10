import { LyricLine } from '@/types';

/**
 * Parse TTML (Timed Text Markup Language) file content
 */
export function parseTTML(ttmlContent: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(ttmlContent, 'text/xml');

  // Get all <p> elements which contain the lyrics
  const paragraphs = doc.querySelectorAll('p');

  paragraphs.forEach((p) => {
    const begin = p.getAttribute('begin');
    const end = p.getAttribute('end');
    const text = p.textContent?.trim() || '';

    if (begin && text) {
      lines.push({
        startTime: parseTimeToSeconds(begin),
        endTime: end ? parseTimeToSeconds(end) : 0,
        text,
      });
    }
  });

  // If no end times, calculate from next line's start time
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].endTime === 0) {
      lines[i].endTime = lines[i + 1]?.startTime || lines[i].startTime + 5;
    }
  }

  return lines;
}

/**
 * Parse LRC (Lyric) file content
 * Format: [mm:ss.xx]Text or [mm:ss]Text
 */
export function parseLRC(lrcContent: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const lrcLines = lrcContent.split('\n');

  const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/g;

  lrcLines.forEach((line) => {
    const matches = [...line.matchAll(timeRegex)];
    const text = line.replace(timeRegex, '').trim();

    if (matches.length > 0 && text) {
      matches.forEach((match) => {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;

        const startTime = minutes * 60 + seconds + milliseconds / 1000;

        lines.push({
          startTime,
          endTime: 0, // Will be calculated
          text,
        });
      });
    }
  });

  // Sort by start time
  lines.sort((a, b) => a.startTime - b.startTime);

  // Calculate end times from next line's start time
  for (let i = 0; i < lines.length; i++) {
    lines[i].endTime = lines[i + 1]?.startTime || lines[i].startTime + 5;
  }

  return lines;
}

/**
 * Parse time string to seconds
 * Supports formats: "00:01:23.456", "01:23.456", "01:23", "83.456s"
 */
function parseTimeToSeconds(timeStr: string): number {
  // Handle "Xs" format (e.g., "83.456s")
  if (timeStr.endsWith('s')) {
    return parseFloat(timeStr.slice(0, -1));
  }

  // Handle "HH:MM:SS.mmm" or "MM:SS.mmm" format
  const parts = timeStr.split(':');
  let seconds = 0;

  if (parts.length === 3) {
    // HH:MM:SS.mmm
    seconds = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseFloat(parts[2]);
  } else if (parts.length === 2) {
    // MM:SS.mmm
    seconds = parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
  } else {
    seconds = parseFloat(timeStr);
  }

  return seconds;
}

/**
 * Auto-detect format and parse lyrics
 */
export function parseLyrics(content: string): LyricLine[] {
  const trimmed = content.trim();

  // Check if it's TTML (XML)
  if (trimmed.startsWith('<?xml') || trimmed.startsWith('<tt')) {
    return parseTTML(trimmed);
  }

  // Assume LRC format
  return parseLRC(trimmed);
}
