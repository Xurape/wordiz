'use server';

let wordlist = ["risão","clube","ureia","aerea","aereo","panos","patos","patas","capas","cacos","arroz","nariz","arara","papel",
  "pesos", "pista", "pasto", "gatos", "gatas", "galos", "galas", "fotos", "fotos", "fatos", "fatas", "fatos", "fatas", "fatos",
  "aceno", "zaire", "orais", "moveu", "loira", "saude", "ruiva", "topei", "ânsia", "dúzia", "enfia", "abriu", "ergui", "ouçam", 
  "adieu", "voará", "ética", "casei", "caído", "podia", "coque", "seria", "media", "césio", "caçou", "subia", "aceso", "enoja", 
  "gêmea", "oliva", "reais", "pasta", "fazer", "feito", "fazia", "mario", "afeto", "fazem", "fazem", "fazem", "fazem", "fazem",
  "amigo", "amiga", "exibar", "igual", "meios", "teste", "genio", "opera", "viola", "vazio", "vazia", "epico", "ouvir", "puxar",
  "lirio", "flora", "fauna", "outro", "outra", "pifar", "feias", "feios", "nabos", "medir", "partir", "fecho", "saude", "abriu",
  "agito", "icone", "serio", "mafia", "raios", "unica", "estar"
];

export const getRandomWord = (length) => {
  const filteredWords = wordlist.filter(word => word.length === length);
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
};

export const checkWord = (word) => {
  return wordlist.includes(word);
}