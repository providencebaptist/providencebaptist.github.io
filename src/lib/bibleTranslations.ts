// Spanish to English Bible book name translations
const spanishToEnglishBooks: Record<string, string> = {
  // Old Testament
  'Génesis': 'Genesis',
  'Éxodo': 'Exodus',
  'Levítico': 'Leviticus',
  'Números': 'Numbers',
  'Deuteronomio': 'Deuteronomy',
  'Josué': 'Joshua',
  'Jueces': 'Judges',
  'Rut': 'Ruth',
  '1 Samuel': '1 Samuel',
  '2 Samuel': '2 Samuel',
  '1 Reyes': '1 Kings',
  '2 Reyes': '2 Kings',
  '1 Crónicas': '1 Chronicles',
  '2 Crónicas': '2 Chronicles',
  'Esdras': 'Ezra',
  'Nehemías': 'Nehemiah',
  'Ester': 'Esther',
  'Job': 'Job',
  'Salmos': 'Psalms',
  'Proverbios': 'Proverbs',
  'Eclesiastés': 'Ecclesiastes',
  'Cantares': 'Song of Solomon',
  'Isaías': 'Isaiah',
  'Jeremías': 'Jeremiah',
  'Lamentaciones': 'Lamentations',
  'Ezequiel': 'Ezekiel',
  'Daniel': 'Daniel',
  'Oseas': 'Hosea',
  'Joel': 'Joel',
  'Amós': 'Amos',
  'Abdías': 'Obadiah',
  'Jonás': 'Jonah',
  'Miqueas': 'Micah',
  'Nahúm': 'Nahum',
  'Habacuc': 'Habakkuk',
  'Sofonías': 'Zephaniah',
  'Hageo': 'Haggai',
  'Zacarías': 'Zechariah',
  'Malaquías': 'Malachi',
  
  // New Testament
  'Mateo': 'Matthew',
  'Marcos': 'Mark',
  'Lucas': 'Luke',
  'Juan': 'John',
  'Hechos': 'Acts',
  'Romanos': 'Romans',
  '1 Corintios': '1 Corinthians',
  '2 Corintios': '2 Corinthians',
  'Gálatas': 'Galatians',
  'Efesios': 'Ephesians',
  'Filipenses': 'Philippians',
  'Colosenses': 'Colossians',
  '1 Tesalonicenses': '1 Thessalonians',
  '2 Tesalonicenses': '2 Thessalonians',
  '1 Timoteo': '1 Timothy',
  '2 Timoteo': '2 Timothy',
  'Tito': 'Titus',
  'Filemón': 'Philemon',
  'Hebreos': 'Hebrews',
  'Santiago': 'James',
  '1 Pedro': '1 Peter',
  '2 Pedro': '2 Peter',
  '1 Juan': '1 John',
  '2 Juan': '2 John',
  '3 Juan': '3 John',
  'Judas': 'Jude',
  'Apocalipsis': 'Revelation',
};

/**
 * Translates Spanish Bible book names to English in scripture references
 * @param scripture - The scripture reference (e.g., "Lucas 10:25-37")
 * @returns The scripture reference with English book names
 */
export const translateScripture = (scripture: string): string => {
  if (!scripture) return '';
  
  let translatedScripture = scripture;
  
  // Replace each Spanish book name with its English equivalent
  Object.entries(spanishToEnglishBooks).forEach(([spanish, english]) => {
    // Use word boundary to match whole words only
    const regex = new RegExp(`\\b${spanish}\\b`, 'g');
    translatedScripture = translatedScripture.replace(regex, english);
  });
  
  return translatedScripture;
};
