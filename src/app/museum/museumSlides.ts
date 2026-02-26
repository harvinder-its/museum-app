type MuseumSlide = {
  filename: string;
  src: string;
  alt: string;
  title: string;
  titlePa?: string;
  description: string;
  descriptionPa?: string;
  artist?: string;
  medium?: string;
};

export const MUSEUM_SLIDES: MuseumSlide[] = [
  {
    filename: "01-shastar.jpg",
    src: "/images/museumpaintings/01-shastar.jpg",
    alt: "In the beginning I remember Bhagauti",
    title: "In the beginning I remember Bhagauti (Shastar)",
    titlePa: "ਪ੍ਰਿਥਮ ਭਗੌਤੀ ਸਿਮਰਿ ਕੈ",
    description:
      "This work reflects the foundational Sikh ethos of spiritual strength and righteous defense. It symbolizes discipline, courage, and devotion.",
    descriptionPa:
      "ਇਹ ਕਲਾ-ਕਿਰਤੀ ਸਿੱਖ ਧਾਰਮਿਕਤਾ ਵਿੱਚ ਸ਼ਸਤ੍ਰ ਅਤੇ ਸ਼ਕਤੀ ਦੇ ਆਦਰ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ। ਇਸ ਵਿੱਚ ਸੂਰਵੀਰਤਾ, ਅਨੁਸ਼ਾਸਨ ਅਤੇ ਭਗਤੀ ਦੀ ਭਾਵਨਾ ਪ੍ਰਗਟ ਹੁੰਦੀ ਹੈ।",
    artist: "Parm Singh",
    medium: "Traditional Arms / Oil Painting",
  },
  {
    filename: "02-naam-japo.jpg",
    src: "/images/museumpaintings/02-naam-japo.jpg",
    alt: "Naam Japo",
    title: "Naam Japo (Pray)",
    titlePa: "ਨਾਮ ਜਪੋ",
    description:
      "Naam Japo represents remembrance of the Divine through meditation and prayer, a core pillar of Sikh living.",
    descriptionPa:
      "ਨਾਮ ਜਪੋ ਸਿੱਖ ਜੀਵਨ ਦਾ ਮੂਲ ਸਿਧਾਂਤ ਹੈ, ਜੋ ਰੱਬੀ ਯਾਦ ਅਤੇ ਅੰਦਰੂਨੀ ਸ਼ਾਂਤੀ ਦਾ ਸੰਦੇਸ਼ ਦਿੰਦਾ ਹੈ।",
    artist: "Jaspreet Singh",
    medium: "Oil Painting",
  },
  {
    filename: "14-dal-khalsa.jpg",
    src: "/images/museumpaintings/14-dal-khalsa.jpg",
    alt: "Formation of Dal Khalsa",
    title: "Formation of Dal Khalsa",
    titlePa: "ਦਲ ਖਾਲਸਾ ਦਾ ਗਠਨ",
    description:
      "This scene recalls the unity and military organization of the Khalsa in the eighteenth century, preserving freedom and faith.",
    descriptionPa:
      "ਇਹ ਦ੍ਰਿਸ਼ ਅਠਾਰਹਵੀ ਸਦੀ ਵਿੱਚ ਦਲ ਖਾਲਸਾ ਦੀ ਇਕਤਾ ਅਤੇ ਸੰਗਠਨ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ, ਜਿਸ ਨੇ ਧਰਮ ਅਤੇ ਆਜ਼ਾਦੀ ਦੀ ਰੱਖਿਆ ਕੀਤੀ।",
    artist: "Parm Singh",
    medium: "Oil Painting",
  },
  {
    filename: "23-darbar-maharaja-ranjit-singh.jpg",
    src: "/images/museumpaintings/23-darbar-maharaja-ranjit-singh.jpg",
    alt: "Darbar Maharaja Ranjit Singh",
    title: "Darbar Maharaja Ranjit Singh",
    titlePa: "ਦਰਬਾਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ",
    description:
      "A royal court composition highlighting governance, diplomacy, and cultural brilliance during Maharaja Ranjit Singh's era.",
    descriptionPa:
      "ਇਹ ਕਲਾ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਦੌਰ ਦੀ ਰਾਜਨੀਤਕ ਸਿਆਣਪ, ਸੰਸਕ੍ਰਿਤਿਕ ਵਿਭਵ ਅਤੇ ਦਰਬਾਰੀ ਪਰੰਪਰਾ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।",
    artist: "Jagdeep Singh",
    medium: "Oil Painting",
  },
  {
    filename: "29-anglo-sikh-war.jpg",
    src: "/images/museumpaintings/29-anglo-sikh-war.jpg",
    alt: "Anglo Sikh War",
    title: "Anglo Sikh War",
    titlePa: "ਅੰਗਰੇਜ਼-ਸਿੱਖ ਜੰਗ",
    description:
      "This artwork depicts the conflict period between Sikh forces and the British Empire, marking a critical turning point in Punjabi history.",
    descriptionPa:
      "ਇਹ ਚਿੱਤਰ ਅੰਗਰੇਜ਼-ਸਿੱਖ ਜੰਗਾਂ ਦੇ ਸਮੇਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ, ਜੋ ਪੰਜਾਬ ਦੇ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਮੋੜ ਸੀ।",
    artist: "Gurraj Singh",
    medium: "Oil Painting",
  },
  {
    filename: "30-kooka-lehar.jpg",
    src: "/images/museumpaintings/30-kooka-lehar.jpg",
    alt: "Kooka Movement",
    title: "Kooka Movement",
    titlePa: "ਕੂਕਾ ਲਹਿਰ",
    description:
      "The Kooka movement is remembered for spiritual reform and anti-colonial resistance rooted in Sikh principles.",
    descriptionPa:
      "ਕੂਕਾ ਲਹਿਰ ਸਿੱਖ ਆਦਰਸ਼ਾਂ ਅਧਾਰਿਤ ਆਤਮਿਕ ਸੁਧਾਰ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਰਾਜ ਵਿਰੁੱਧ ਜਾਗਰੂਕਤਾ ਦੀ ਪ੍ਰਤੀਕ ਰਹੀ ਹੈ।",
    artist: "Jaspreet Singh",
    medium: "Oil Painting",
  },
  {
    filename: "31-ghadar-movement.jpg",
    src: "/images/museumpaintings/31-ghadar-movement.jpg",
    alt: "Ghadar Movement",
    title: "Ghadar Movement",
    titlePa: "ਗਦਰ ਲਹਿਰ",
    description:
      "A tribute to revolutionaries who organized globally against colonial rule and inspired generations toward freedom.",
    descriptionPa:
      "ਇਹ ਰਚਨਾ ਉਹਨਾਂ ਗਦਰੀ ਇਨਕਲਾਬੀਆਂ ਨੂੰ ਸਮਰਪਿਤ ਹੈ ਜਿਨ੍ਹਾਂ ਨੇ ਵਿਦੇਸ਼ਾਂ ਵਿੱਚ ਰਹਿ ਕੇ ਵੀ ਆਜ਼ਾਦੀ ਲਈ ਜੰਗ ਲੜੀ।",
    artist: "Kuldeep Singh",
    medium: "Oil Painting",
  },
  {
    filename: "33-kartar-singh-sarabha.jpg",
    src: "/images/museumpaintings/33-kartar-singh-sarabha.jpg",
    alt: "Shaheed Kartar Singh Sarabha",
    title: "Shaheed Kartar Singh Sarabha",
    titlePa: "ਸ਼ਹੀਦ ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ",
    description:
      "Kartar Singh Sarabha became a lasting symbol of youth, sacrifice, and revolutionary spirit in the struggle for justice.",
    descriptionPa:
      "ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਜਵਾਨੀ, ਬਲਿਦਾਨ ਅਤੇ ਇਨਕਲਾਬੀ ਜਜ਼ਬੇ ਦਾ ਸਦੀਵੀ ਪ੍ਰਤੀਕ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ।",
    artist: "Gursharan Singh",
    medium: "Oil Painting",
  },
  {
    filename: "51-partition-of-1947.jpg",
    src: "/images/museumpaintings/51-partition-of-1947.jpg",
    alt: "Partition of 1947",
    title: "Partition of 1947",
    titlePa: "1947 ਦੀ ਵੰਡ",
    description:
      "This piece portrays displacement and human loss during partition, while honoring resilience and collective memory.",
    descriptionPa:
      "ਇਹ ਰਚਨਾ 1947 ਦੀ ਵੰਡ ਦੌਰਾਨ ਹੋਏ ਵਿਸਥਾਪਨ ਅਤੇ ਦੁੱਖਾਂ ਨੂੰ ਯਾਦ ਕਰਦੀ ਹੈ, ਨਾਲ ਹੀ ਲੋਕਾਂ ਦੀ ਹਿੰਮਤ ਨੂੰ ਸਲਾਮ ਕਰਦੀ ਹੈ।",
    artist: "Ravinder Singh",
    medium: "Canvas Print",
  },
  {
    filename: "53-martyrdom-sant-jarnail-singh-ji.jpg",
    src: "/images/museumpaintings/53-martyrdom-sant-jarnail-singh-ji.jpg",
    alt: "Martyrdom of Sant Jarnail Singh Ji",
    title: "Martyrdom of Sant Jarnail Singh Ji",
    titlePa: "ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ",
    description:
      "A solemn depiction of sacrifice and steadfastness in defense of Sikh identity and principles.",
    descriptionPa:
      "ਇਹ ਚਿੱਤਰ ਸਿੱਖ ਪਛਾਣ ਅਤੇ ਅਸੂਲਾਂ ਦੀ ਰੱਖਿਆ ਲਈ ਦਿੱਤੀ ਗਈ ਸ਼ਹਾਦਤ ਅਤੇ ਅਡਿੱਗਤਾ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।",
    artist: "Parm Singh",
    medium: "Canvas Print",
  },
  {
    filename: "61-november-1984.jpg",
    src: "/images/museumpaintings/61-november-1984.jpg",
    alt: "November 1984",
    title: "November 1984",
    titlePa: "ਨਵੰਬਰ 1984",
    description:
      "This artwork remembers the suffering of 1984 and stands as a call for remembrance, justice, and healing.",
    descriptionPa:
      "ਇਹ ਕਲਾ-ਕਿਰਤੀ 1984 ਦੇ ਦੁੱਖਦਾਈ ਘਟਨਾਕ੍ਰਮ ਨੂੰ ਯਾਦ ਕਰਦੀ ਹੈ ਅਤੇ ਇਨਸਾਫ਼ ਤੇ ਚੰਗਿਆਈ ਲਈ ਸੱਦਾ ਦਿੰਦੀ ਹੈ।",
    artist: "Jaspreet Singh",
    medium: "Oil Painting",
  },
];
