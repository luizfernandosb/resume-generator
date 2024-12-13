
interface LanguageType {
  name: string;
}

export const LanguageList: LanguageType[] = [
  { name: 'Inglês' },
  { name: 'Português' },
  { name: 'Espanhol' }
];

interface LevelType {
  name: string;
}

export const LevelList: LevelType[] = [
  { name: 'Básico' },
  { name: 'Intermediário' },
  { name: 'Avançado' }
];
