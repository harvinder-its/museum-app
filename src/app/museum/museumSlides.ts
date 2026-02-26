export type MuseumSlide = {
  src: string;
  alt: string;
  /** English */
  title: string;
  /** English */
  description: string;
  /** Punjabi (optional; falls back to English) */
  titlePa?: string;
  /** Punjabi (optional; falls back to English) */
  descriptionPa?: string;
  artist?: string;
  medium?: string;
  filename: string;
};

const MUSEUM_FILENAMES = [
  "01-shastar.jpg",
  "02-naam-japo.jpg",
  "03-kirat-karo.jpg",
  "04-vand-shako.jpg",
  "05-ang-sahib.jpg",
  "06-battle-of-chappad-chidi.jpg",
  "07-baba-banda-singh-bahadar.jpg",
  "08-tara-singh-van.jpg",
  "09-chawinde-walian-bibian.jpg",
  "10-bhai-mani-singh.jpg",
  "11-bhai-garja-singh-bota-singh.jpg",
  "12-chhota-ghallughara.jpg",
  "13-bhai-taru-singh.jpg",
  "14-dal-khalsa.jpg",
  "15-baba-deep-singh-battle.jpg",
  "16-vadda-ghallughara.jpg",
  "17-akali-timeless.jpg",
  "18-jassa-singh-ramgarhia.jpg",
  "19-18th-century-singh.jpg",
  "20-jain-khaan-victory-over-sirhind.jpg",
  "21-patshahi-badshahi.JPG",
  "23-darbar-maharaja-ranjit-singh.jpg",
  "24-akali-phoola-singh-ji.jpg",
  "25-sardar-hari-singh-nalwa.jpg",
  "26-maharani-jind-kaur.jpg",
  "27-kunwar-nau-nihal-singh.jpg",
  "28-maharaj-duleep-singh.jpg",
  "29-anglo-sikh-war.jpg",
  "30-kooka-lehar.jpg",
  "31-ghadar-movement.jpg",
  "32-baba-sohan-singh-bhakna.jpg",
  "33-kartar-singh-sarabha.jpg",
  "34-bibi-gulab-kaur.jpg",
  "35-babbar-akali-movement.jpg",
  "36-babar-karm-singh-rakkad.jpg",
  "37-babar-ratan-singh.jpg",
  "38-babar-kishan-singh-gadgajj.jpg",
  "39-babar-dhanna-singh-behbalpur.jpg",
  "41-bhai-veer-singh-ji.jpg",
  "42-prof-pooran-singh.jpg",
  "43-giyani-ditt-singh.jpg",
  "44-bhai-randhir-singh-ji.jpg",
  "45-master-tara-singh.jpg",
  "46-doctor-gandha-singh.jpg",
  "47-karm-singh-historian.jpg",
  "48-bibi-harnam-kaur.jpg",
  "49-bhai-kaahn-singh-nabha.jpg",
  "50-sikhs-in-world-wars.jpg",
  "51-partition-of-1947.jpg",
  "52-bhai-fauja-singh-saka-1978.jpg",
  "53-martyrdom-sant-jarnail-singh-ji.jpg",
  "54-akal-takhat-sahib-model.jpg",
  "55-sant-jarnail-singh-ji.jpg",
  "56-bhai-amrik-singh-ji.jpg",
  "57-general-subegh-singh-ji.jpg",
  "58-baba-thahra-singh-ji.jpg",
  "59-bibi-upkar-kaur-ji.jpg",
  "60-bhai-mehnga-singh-babbar.jpg",
  "61-november-1984.jpg",
  "62-old-home-model-2.jpg",
  "62-old-home-model-3.jpg",
  "62-old-home-model-4.jpg",
  "62-old-home-model.jpg",
  "63-stapoo.jpg",
  "64-mothers-creation.jpg",
  "65-dadi-pota.jpg",
  "67-kirtan-sculpture.jpg",
] as const;

type CopyOverride = Partial<
  Pick<
    MuseumSlide,
    "title" | "description" | "titlePa" | "descriptionPa" | "artist" | "medium" | "alt"
  >
>;

/**
 * Fill this as you send titles/descriptions. Key = filename.
 * Example:
 * "01-shastar.jpg": { title: "...", description: "..." }
 */
export const MUSEUM_COPY_OVERRIDES: Partial<Record<string, CopyOverride>> = {
  "01-shastar.jpg": {
    title: "In the beginning I remember Bhagauti (Shastar)",
    description: `First, remembering the Primal Power (Bhagauti), meditate on Guru Nanak. Then, may Guru Angad, Guru Amar Das, and Guru Ram Das grant their aid. I remember Guru Arjan and Guru Hargobind, and Sri Har Rai. Meditate on Sri Har Krishan, at whose very sight all sorrow departs. Remembering Guru Tegh Bahadur, the nine treasures hasten into the home. May help be present everywhere. (1) May the Tenth Sovereign, Sahib Sri Guru Gobind Singh Ji, be our support in all places.`,
    titlePa: "ਪ੍ਰਿਥਮ ਭਗਉਤੀ ਸਿਮਰਿ ਕੈ (ਸ਼ਸਤਰ)",
    descriptionPa: `ਪ੍ਰਿਥਮ ਭਗਉਤੀ ਸਿਮਰਿ ਕੈ ਗੁਰ ਨਾਨਕ ਲਈਂ ਧਿਆਇ ॥ ਫਿਰਿ ਅੰਗਦ ਗੁਰ ਤੇ ਅਮਰਦਾਸੁ ਰਾਮਦਾਸੈ ਹੋਈਂ ਸਹਾਇ ॥ ਅਰਜਨ ਹਰਿਗੋਬਿੰਦ ਨੋ ਸਿਮਰੌ ਸ੍ਰੀ ਹਰਿਰਾਇ ॥ ਸ੍ਰੀ ਹਰਿਕ਼੍ਰਿਸਨ ਧਿਆਈਐ ਜਿਸੁ ਡਿਠੈ ਸਭੁ ਦੁਖੁ ਜਾਇ ॥ ਤੇਗ ਬਹਾਦਰ ਸਿਮਰਿਐ ਘਰਿ ਨਉ ਨਿਧਿ ਆਵੈ ਧਾਇ ॥ ਸਭ ਥਾਈਂ ਹੋਇ ਸਹਾਇ ॥੧॥`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Traditional Arms",
  },
  "02-naam-japo.jpg": {
    title: "Naam Japo (Pray)",
    description: `In the Sikh path, "Naam Japo"—to remember and repeat the Divine Name—is a foundational principle. To grasp it, we first ask: What is "Naam" in Gurmat? In the spiritual order, "Naam" signifies the Supreme Reality. All the expanse is of the Naam, and by Naam the creation moves. The Mahan Kosh (Great Lexicon) notes under "Naam" that it is the Creator and the cognitive word of His Command (Hukam).

The Gurus instructed humankind to remember the Naam for spiritual growth and self-realization—keeping the Name and qualities of the Divine constantly alive in one's awareness. In Gurmat, Naam is remembrance of the Timeless One alone. The Gurbani contains the Naam; by meditating upon it, one can reach the Naami—the Akal Purakh Himself.

Before reciting, Gurbani first teaches us to recognize the Naam:
"They read, but the self-willed do not know the way;
they do not understand the Naam, and wander in delusion."
(Marū, Guru Nanak, ang 1032)

Sri Guru Nanak Dev Ji says to the yogi: the essence of religious discourse is this—without Naam there is no Yoga:
"Hear, O ascetic, the decision of the Word:
without the Name, there is no yoga."
(Rag Ramkalī, ang 946)

In Sikhi, meditating on the Naam means to remain ever aware of the Divine's presence—seeing the One as pervading all, unfathomable, all-powerful, merciful and just, and walking in His Will. One shapes life by the Guru's teachings, sings the Creator's praise, and lives by the Guru's command.

Naam Japo does not mean abandoning the world and retreating to caves like ascetics to mutter the Name while torturing the body. Rather, Guru Sahib teaches:
"Understand forests and homes as one;
keep detachment in the mind itself."
Thus, moving within society, one should practice Naam so that "laughing, playing, dressing, eating" one receives liberation.

Through Naam Simran, a person, disciplined in spirit, tastes inward peace, remaining untouched by worldly attachment. Singing the Lord's virtues lights wisdom within; the Shabad-Guru comes to dwell in the heart. When the Shabad shines there, the restless mind receives the gift of steadiness. For this reason, the Gurus blessed the threefold path: "Naam Japo, Kirat Karo, Vand Chhako"—so that worldly life proceeds rightly and the soul's purpose in coming to this world is fulfilled.`,
    titlePa: "ਨਾਮ ਜਪੋ",
    descriptionPa: `ਸਿੱਖ ਧਰਮ ਵਿੱਚ "ਨਾਮ ਜਪੋ" ਬੁਨਿਆਦੀ ਸਿਧਾਂਤ ਹੈ। 'ਨਾਮ ਜਪੋ' ਨੂੰ ਸਮਝਣ ਵਾਸਤੇ ਪਹਿਲਾਂ ਇਹ ਜਾਣਨਾ ਜ਼ਰੂਰੀ ਹੈ ਕਿ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਨਾਮ ਕੀ ਹੈ? 'ਅਧਿਆਤਮਿਕ ਸੱਤਾ ਵਿੱਚ 'ਨਾਮ' 'ਪਰਮ ਸੱਤਾ' ਦਾ ਸੂਚਕ ਹੈ। 'ਨਾਮ' ਦਾ ਹੀ ਸਾਰਾ ਪਸਾਰਾ ਹੈ ਤੇ 'ਨਾਮ' ਹੀ ਸ੍ਰਿਸ਼ਟੀ ਨੂੰ ਚਲਾ ਰਿਹਾ ਹੈ।

ਮਹਾਨ ਕੋਸ਼ ਵਿੱਚ 'ਨਾਮ' ਦੇ ਇੰਦਰਾਜ ਹੇਠ ਦਰਜ ਹੈ ਕਿ 'ਨਾਮ' ਕਰਤਾਰ ਅਤੇ ਉਸ ਦਾ ਹੁਕਮ ਬੋਧਿਕ ਸ਼ਬਦ ਹੈ। ਗੁਰੂ ਸਾਹਿਬਾਨ ਨੇ ਅਧਿਆਤਮਿਕ ਵਿਕਾਸ ਅਤੇ ਸਵੈ-ਬੋਧ ਲਈ ਮਨੁੱਖ ਨੂੰ ਨਾਮ ਜਪਣ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ ਜਿਸ ਵਿੱਚ ਪਰਮਾਤਮਾ ਦੇ ਨਾਮ ਅਤੇ ਗੁਣਾਂ ਨੂੰ ਲਗਾਤਾਰ ਸਿਮ੍ਰਿਤੀ 'ਚ ਰੱਖਣਾ ਹੈ। ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਨਾਮ ਸਿਰਫ਼ ਅਕਾਲ ਪੁਰਖ ਦਾ ਸਿਮਰਨਾ ਹੈ। ਗੁਰਬਾਣੀ ਅੰਦਰ ਨਾਮ ਸਮੋਇਆ ਹੋਇਆ ਹੈ, ਜਿਸ ਨੂੰ ਜਪ ਕੇ 'ਨਾਮੀ' ਭਾਵ 'ਅਕਾਲ ਪੁਰਖ' ਤੱਕ ਪਹੁੰਚਿਆ ਜਾ ਸਕਦਾ ਹੈ।

ਗੁਰਬਾਣੀ ਵਿੱਚ ਨਾਮ ਜਪਣ ਤੋਂ ਪਹਿਲਾਂ ਇਸ ਨੂੰ ਜਾਣਨ ਦਾ ਉਪਦੇਸ਼ ਕੀਤਾ ਮਿਲਦਾ ਹੈ-
ਪੜਹਿ ਮਨਮੁਖ ਪਰੁ ਬਿਧਿ ਨਹੀ ਜਾਨਾ ॥ ਨਾਮੁ ਨ ਬੂਝਹਿ ਭਰਮਿ ਭੁਲਾਨਾ ॥
(ਮਾਰੂ ਮ:੧, ਅੰਗ ੧੦੩੨)

ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਫ਼ਰਮਾਉਂਦੇ ਹਨ ਕਿ ਹੇ ਜੋਗੀ! ਧਰਮ ਦੀ ਵਾਰਤਾ ਦਾ ਨਿਚੋੜ ਇਹੀ ਹੈ ਕਿ ਨਾਮ ਦੇ ਬਿਨਾਂ ਜੋਗ ਕਮਾਇਆ ਹੀ ਨਹੀਂ ਜਾ ਸਕਦਾ-
ਸਬਦੈ ਕਾ ਨਿਬੇੜਾ ਸੁਣਿ ਤੂ ਅਉਧੂ ਬਿਨੁ ਨਾਵੈ ਜੋਗੁ ਨ ਹੋਈ॥
(ਰਾਗੁ ਰਾਮਕਲੀ, ਅੰਗ ੯੪੬)

ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਨਾਮ ਜਪਣ ਦਾ ਭਾਵ ਹਰ ਵੇਲੇ ਪਰਮਾਤਮਾ ਨੂੰ ਹਾਜ਼ਰ-ਨਾਜ਼ਰ ਸਮਝਣਾ ਹੈ। ਪਰਮਾਤਮਾ ਨੂੰ ਸਰਵ-ਵਿਆਪਕ, ਅਗੰਮ-ਅਗੋਚਰ, ਸਰਵ-ਸ਼ਕਤੀਮਾਨ, ਕਾਦਰ, ਕਰਤਾ, ਕਰੀਮ, ਰਹੀਮ ਸਮਝ ਕੇ ਉਸ ਦੀ ਰਜ਼ਾ ਵਿੱਚ ਚੱਲਣਾ ਹੈ। ਆਪਣੇ ਜੀਵਨ ਨੂੰ ਗੁਰੂ ਦੀ ਸਿੱਖਿਆ ਮੁਤਾਬਿਕ ਢਾਲਣਾ, ਕਰਤੇ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਕਰਨੀ ਅਤੇ ਗੁਰੂ ਜੀ ਦੇ ਹੁਕਮ ਅਨੁਸਾਰ ਜੀਵਨ ਜਿਊਂਣਾ ਹੈ।

ਗੁਰਮਤਿ ਵਿੱਚ ਨਾਮ ਜਪਣ ਦਾ ਭਾਵ ਇਹ ਨਹੀਂ ਕਿ ਦੁਨੀਆ ਦੀ ਕਾਰ-ਵਿਹਾਰ ਛੱਡ ਕੇ ਜੋਗੀਆਂ ਜਾਂ ਸਿੱਧਾਂ ਵਾਂਗ ਪਹਾੜਾਂ ਦੀਆਂ ਕੰਦਰਾਂ ਜਾਂ ਗੁਫਾਵਾਂ 'ਚ ਬੈਠ ਕੇ ਨਾਮ ਦਾ ਰਟਨ ਕੀਤਾ ਜਾਵੇ ਤੇ ਸਰੀਰ ਨੂੰ ਤਸੀਹੇ ਦਿੱਤੇ ਜਾਣ। ਸਗੋਂ ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਨੇ "ਬਨ ਸੇ ਸਦਨ ਸਭੈ ਕਰਿ ਸਮਝਹੁ ਮਨ ਹੀ ਮਾਹਿ ਉਦਾਸਾ" ਰਾਹੀਂ ਮਨੁੱਖ ਨੂੰ ਸਮਾਜ ਵਿੱਚ ਵਿਚਰਦਿਆਂ 'ਨਾਮ ਜਪਣ' ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ, ਜਿਸ ਨਾਲ "ਹਸੰਦਿਆ ਖੇਲੰਦਿਆ ਪੈਨੰਦਿਆ ਖਾਵੰਦਿਆ" ਹੀ ਮੁਕਤ ਪਦ ਪ੍ਰਾਪਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।

ਨਾਮ ਸਿਮਰਨ ਨਾਲ ਮਨੁੱਖ ਅਧਿਆਤਮਿਕ ਅਨੁਸ਼ਾਸਨ 'ਚ ਰਹਿੰਦਿਆਂ ਅੰਦਰੂਨੀ ਸ਼ਾਂਤੀ ਦਾ ਅਨੁਭਵ ਕਰਕੇ ਸੰਸਾਰਿਕ ਮੋਹ ਤੋਂ ਨਿਰਲੇਪ ਰਹਿ ਸਕਦਾ ਹੈ। ਪਰਮਾਤਮਾ ਦੇ ਗੁਣ ਗਾਇਣ ਕਰਨ ਨਾਲ ਮਨ ਅੰਦਰ ਗਿਆਨ ਦਾ ਪ੍ਰਗਾਸ ਹੁੰਦਾ ਹੈ ਤੇ ਹਿਰਦੇ ਅੰਦਰ ਸ਼ਬਦ-ਗੁਰੂ ਦਾ ਵਾਸਾ ਹੋ ਜਾਂਦਾ ਹੈ। ਜਦ ਸ਼ਬਦ-ਗੁਰੂ ਦਾ ਪ੍ਰਕਾਸ਼ ਹਿਰਦੇ ਵਿੱਚ ਹੁੰਦਾ ਹੈ ਤਾਂ ਉਸ ਨਾਲ ਚੰਚਲ ਮਨ ਨੂੰ ਸਥਿਰਤਾ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਹੁੰਦੀ ਹੈ। ਇਸ ਲਈ 'ਨਾਮ ਜਪੋ, ਕਿਰਤ ਕਰੋ, ਵੰਡ ਛਕੋ' ਦਾ ਤ੍ਰੈ-ਸੂਤਰੀ ਸਿਧਾਂਤ ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਨੇ ਬਖ਼ਸ਼ਿਆ ਹੈ ਜਿਸ ਨਾਲ ਸੰਸਾਰਿਕ ਨਿਰਬਾਹ ਵੀ ਚੱਲਦਾ ਹੈ ਤੇ ਮਨੁੱਖ ਦਾ ਸੰਸਾਰ 'ਤੇ ਆਉਣ ਦਾ ਮਨੋਰਥ ਵੀ ਸੰਪੂਰਨ ਹੁੰਦਾ ਹੈ।`,
    artist: "ਜਸਪ੍ਰੀਤ ਸਿੰਘ",
    medium: "Oil Painting",
  },
  "03-kirat-karo.jpg": {
    title: "Kirat Karo (Earn an honest living)",
    description: `In Guru Nanak's time, society's religious, political, and economic fabric was tangled. Religious leaders had twisted faith so badly that ordinary people couldn't follow it; rulers with influence strayed from rightful duty. Guru Sahib says:

"Modesty and righteousness stood hidden away; falsehood paraded as leader, O Lalo."

To clear that darkness, the Guru took up the mission—described by Bhai Gurdas Ji as:

"He rose to transform a hidden earth."

Guru Nanak's principles were simple and doable for all. For the welfare of all humanity, the threefold doctrine—Kirat Karo (earn by honest labor), Naam Japo (remember the Name), Vand Chhako (share what you have)—proved immensely fruitful. These three are the lived expression of:

"Earn by toil, and out of your hands give."

Guru Nanak says:

"Some, as householders, serve and practice; through the Guru's wisdom they are attached.
They fix Naam, charity, and cleansing within, and awake to the Lord's devotion."
(Sri Guru Granth Sahib, ang 418)

"Kirat"—honest livelihood—is the ground that makes sharing possible. Only one who earns righteously can share righteously. In the Mul Mantar, feeling the Creator's working nature, Guru Nanak calls the Timeless One "Karta"—the Doer. Being a spark of the Divine, working is the human being's basic duty.

The Sikh is to work with both hands—free of deceit or fraud—marked by honesty and sincere feeling. Wealth gathered by dishonest means can never bear true fruit:

"Without sins, one cannot live;
and nothing goes along with you when you die."
(Sri Guru Granth Sahib, ang 417)

On his missionary journeys, Guru Nanak established this Gurmat principle of honest earning, and then gave it practical form by founding Kartarpur Sahib. The well-known account of Bhai Lalo and Chaudhary Malik Bhago teaches the Sikhs the worth of truthful work.

In daily life, Gurmat tells us to remember the Divine while working, which is the central aim of life. The dialogue in Gurbani involving Bhagat Namdev Ji and Bhagat Trilochan Ji strengthens the Sikh to remember the Lord while doing one's tasks:

Trilochan says: "Nama, friend, you are entangled in Maya—
Why do you patch leather? Why not fix your mind on the Lord?"
Namdev replies: "Trilochan, keep God upon your lips—
with hands and feet do all your work, but keep your consciousness with the Immaculate One."
(Sri Guru Granth Sahib, ang 1375)

So for human progress, true work must be done. Work keeps one healthy and strong, deepens one's grasp of the Creator's play, and wards off sloth. Ever be industrious:

"Make effort, O soul, and enjoy the comfort you earn;
meditating on the Lord, you will meet Him, O Nanak, and anxiety will depart."
(Sri Guru Granth Sahib, ang 522)

"Work with your hands; walk with your feet to the holy congregation.
Earn by righteous labor and share to nourish righteousness."
(Varan Bhai Gurdas Ji, Var 1, Pauṛī 3)`,
    titlePa: "ਕਿਰਤ ਕਰੋ",
    descriptionPa: `ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਮੇਂ ਸਮਾਜਿਕ, ਧਾਰਮਿਕ, ਰਾਜਨੀਤਿਕ ਅਤੇ ਆਰਥਿਕ ਬਣਤਰ ਦਾ ਤਾਣਾ-ਬਾਣਾ ਉਲਝਿਆ ਹੋਇਆ ਸੀ। ਧਾਰਮਿਕ ਆਗੂਆਂ ਨੇ ਧਰਮ ਨੂੰ ਏਨਾ ਪੀਡਾ ਕਰ ਛੱਡਿਆ ਸੀ ਕਿ ਆਮ ਜਨਤਾ ਉਸ ਉਤੇ ਚੱਲ ਨਹੀਂ ਸੀ ਸਕਦੀ ਅਤੇ ਉਹ ਖ਼ੁਦ ਕੁਰਾਹੇ ਪਏ ਹੋਏ ਸਨ। ਰਾਜਨੀਤਿਕ ਰਸੂਖ਼ ਰੱਖਦੇ ਰਜਵਾੜੇ ਵੀ ਆਪਣੇ ਰਾਜ-ਧਰਮ ਤੋਂ ਲਾਂਭੇ ਹੋਏ ਪਏ ਸਨ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ੶ਬਦਾਂ ਵਿਚ ਬਿਆਨ ਕੀਤਾ ਹੈ "ਸਰਮੁ ਧਰਮੁ ਦੁਇ ਛਪਿ ਖਲੋਏ ਕੂੜੁ ਫਿਰੈ ਪਰਧਾਨੁ ਵੇ ਲਾਲੋ"। ਜਗਤ ਦੀ ਹਨੇਰ-ਗਰਦੀ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਬੀੜ੍ਹਾ ਚੁਕਿਆ, ਜਿਸ ਨੂੰ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਨੇ "ਚੜ੍ਹਿਆ ਸੋਧਣਿ ਧਰਤਿ ਲੁਕਾਈ" ਦੇ ੶ਬਦਾਂ ਰਾਹੀਂ ਦਰਸਾਇਆ ਹੈ।

ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਲੁਕਾਈ ਨੂੰ ਜੋ ਸੰਕਲਪ ਅਤੇ ਸਿਧਾਂਤ ਦਿਤੇ ਉਨ੍ਹਾਂ ਉਤੇ ਚਲਣਾ ਆਮ ਜਨਤਾ ਲਈ ਬੜਾ ਸੁਖਾਲਾ ਸੀ। ਸਮੁੱਚੀ ਮਾਨਵਤਾ ਦੀ ਭਲਾਈ ਲਈ ਕਿਰਤ ਕਰੋ, ਨਾਮ ਜਪੋ ਅਤੇ ਵੰਡ ਛਕੋ ਦਾ ਤਿੰਨ-ਸੂਤਰੀ ਸਿਧਾਂਤ ਲਾਹੇਵੰਦਾ ਸਾਬਤ ਹੋਇਆ। ਇਹ ਤਿੰਨੇ ਸੰਕਲਪ 'ਘਾਲਿ ਖਾਇ ਕਿਛੁ ਹਥਹੁ ਦੇਇ' ਦਾ ਅਮਲੀ ਰੂਪ ਹਨ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਬਾਣੀ ਵਿਚ ਜ਼ਿਕਰ ਕਰਦੇ ਹਨ-
ਇਕਿ ਗਿਰਹੀ ਸੇਵਕ ਸਾਧਿਕਾ ਗੁਰਮਤੀ ਲਾਗੇ॥ ਨਾਮੁ ਦਾਨੁ ਇਸਨਾਨੁ ਦ੍ਰਿੜੁ ਹਰਿ ਭਗਤਿ ਸੁ ਜਾਗੇ॥
(ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 418)

ਉਪਰੋਕਤ ਪਹਿਲੀ ਪੰਗਤੀ ਵਿਚ ਗੁਰੂ ਸਾਹਿਬ 'ਗਿਰਹੀ' ਰਾਹੀਂ ਕਿਰਤ ਵੱਲ ਇਸ਼ਾਰਾ ਕਰਦੇ ਹਨ। ਵੰਡ ਕੇ ਛਕਣ ਦੇ ਪਿਛੋਕੜ ਵਿਚ ਕਿਰਤ ਦਾ ਸੰਕਲਪ ਕਾਰਜਸ਼ੀਲ ਹੈ। ਇਕ ਕਿਰਤੀ ਗੁਰਸਿਖ ਹੀ ਕਿਰਤ ਰਾਹੀਂ ਜੁਟਾਏ ਪਦਾਰਥ ਵੰਡ ਕੇ ਛਕ ਸਕਦਾ ਹੈ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਪਰਮਾਤਮਾ ਦੇ ਕਿਰਤੀ ਸੁਭਾਅ ਨੂੰ ਅਨੁਭਵ ਕਰਦਿਆ 'ਮੂਲ ਮੰਤਰ' ਵਿੱਚ ਅਕਾਲ ਪੁਰਖ ਨੂੰ 'ਕਰਤਾ' ਬਿਆਨ ਕੀਤਾ ਹੈ। ਮਨੁੱਖ ਪਰਾਤਮਾ ਦੀ ਅੰਸ਼ ਹੈ, ਇਸ ਲਈ ਕਿਰਤ ਕਰਨੀ ਮਨੁੱਖ ਦਾ ਬੁਨਿਆਦੀ ਫਰਜ਼ ਹੈ।

ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਮਨੁੱਖ ਨੇ ਦਸਾਂ ਨਹੁੰਆਂ ਦੀ ਕਿਰਤ ਕਰਨੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਧੋਖਾ, ਫਰੇਬ, ਬੇਈਮਾਨੀ ਨਾ ਹੋਵੇ ਸਗੋਂ ਇਮਾਨਦਾਰੀ ਤੇ ਸੱਚੀ ਭਾਵਨਾ ਹੋਵੇ। ਆਪਣੇ ਸੁਆਰਥੀ ਹਿੱਤਾਂ ਦੀ ਪੂਰਤੀ ਲਈ ਬੇਈਮਾਨ ਢੰਗ ਤਰੀਕਿਆਂ ਦੀ ਕਿਰਤ ਕਰਕੇ ਇਕੱਤਰ ਕੀਤਾ ਧਨ ਕਦੇ ਵੀ ਮਨੁੱਖ ਦੇ ਜੀਵਨ ਲਈ ਫਲਦਾਇਕ ਨਹੀਂ ਹੋ ਸਕਦਾ। ਗੁਰਬਾਣੀ ਦਾ ਫਰਮਾਣ ਹੈ:
ਪਾਪਾ ਬਾਝਹੁ ਹੋਵੈ ਨਾਹੀ ਮੁਇਆ ਸਾਥਿ ਨ ਜਾਈ।।
(ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 417)

ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਦੇਸ਼-ਵਿਦੇਸ਼ ਦੀਆਂ ਪ੍ਰਚਾਰ ਫੇਰੀਆਂ ਦੌਰਾਨ ਸੱਚੀ ਕਿਰਤ ਕਰਨ ਦਾ ਗੁਰਮਤਿ ਸਿਧਾਂਤ ਲੋਕਾਈ ਨੂੰ ਦ੍ਰਿੜ ਕਰਵਾਇਆ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਪ੍ਰਚਾਰ ਫੇਰੀਆ ਉਪਰੰਤ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਨਗਰ ਦੀ ਸਥਾਪਨਾ ਕਰਕੇ ਇਸ ਨੂੰ ਵਿਵਹਾਰਿਕ ਸਰੂਪ ਪ੍ਰਦਾਨ ਕੀਤਾ। ਗੁਰੂ ਸਾਹਿਬ ਦੇ ਜੀਵਨ ਇਤਿਹਾਸ ਵਿੱਚੋਂ ਭਾਈ ਲਾਲੋ ਜੀ ਅਤੇ ਚੌਧਰੀ ਮਲਕ ਭਾਗੋ ਦੀ ਸਾਖੀ ਸੱਚੀ ਕਿਰਤ ਕਰਨ ਲਈ ਗੁਰਸਿੱਖਾਂ ਨੂੰ ਸਿੱਖਿਆਂ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।

ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਮਨੁੱਖ ਆਪਣੇ ਨਿਤਾਪ੍ਰਤੀ ਕਾਰ ਵਿਹਾਰ ਦੌਰਾਨ ਸੱਚੀ ਕਿਰਤ ਕਰਦਾ ਹੋਇਆ ਪਰਮਾਤਮਾ ਨੂੰ ਯਾਦ ਰੱਖਦਾ ਹੈ, ਜੋ ਮਨੁੱਖੀ ਜੀਵਨ ਦਾ ਮੁਖ ਮਨੋਰਥ ਹੈ। ਗੁਰਬਾਣੀ ਵਿੱਚ ਭਗਤ ਕਬੀਰ ਜੀ ਦੇ ਸਲੋਕਾਂ ਅਧੀਨ ਭਗਤ ਨਾਮਦੇਵ ਜੀ ਅਤੇ ਭਗਤ ਤ੍ਰਿਲੋਚਨ ਜੀ ਦੀ ਵਾਰਤਾਲਾਪ ਗੁਰਸਿੱਖ ਨੂੰ ਸੱਚੀ ਕਿਰਤ ਕਰਦਿਆਂ ਨਾਮ ਜਪਣ ਲਈ ਪ੍ਰਪੱਕ ਕਰਦੀ ਹੈ:
ਨਾਮਾ ਮਾਇਆ ਮੋਹਿਆ ਕਹੈ ਤਿਲੋਚਨਾ ਮੀਤ।। ਕਾਹੇ ਛੀਪਹੁ ਛਾਇਲੈ ਰਾਮ ਨ ਲਾਵਹੁ ਚੀਤੁ।।
ਨਾਮਾ ਕਹੈ ਤਿਲੋਚਨਾ ਮੁਖ ਤੇ ਰਾਮੁ ਸੰਮਾਲਿ।। ਹਾਥ ਪਾਉ ਕਰਿ ਕਾਮੁ ਸਭੁ ਚੀਤੁ ਨਿਰੰਜਨ ਨਾਲਿ।।
(ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 1375)

ਇਸ ਪ੍ਰਕਾਰ ਮਾਨਵਤਾ ਦੀ ਤਰੱਕੀ ਲਈ ਸੱਚੀ ਕਿਰਤ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ। ਕਿਰਤ ਮਨੁੱਖ ਨੂੰ ਤੰਦਰੁਸਤ ਅਤੇ ਤਕੜਾ ਰੱਖਦੀ ਹੈ। ਮਨੁੱਖ ਪਰਮਾਤਮਾ ਦੀ ਕੁਦਰਤ ਨੂੰ ਵੱਧ ਸਮਝਦਾ ਹੈ। ਮਨੁੱਖ ਨੂੰ ਆਲਸੀ ਅਤੇ ਨਿਕੰਮਾ ਬਿਲਕੁਲ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ, ਹਮੇਸ਼ਾ ਉਦਮਸ਼ੀਲ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ।

ਉਦਮੁ ਕਰੇਦਿਆ ਜੀਉ ਤੂੰ ਕਮਾਵਦਿਆ ਸੁਖ ਭੁੰਚੁ।।
ਧਿਆਇਦਿਆ ਤੂੰ ਪ੍ਰਭੂ ਮਿਲੁ ਨਾਨਕ ਉਤਰੀ ਚਿੰਤੁ।।
(ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 522)

ਹਥੀ ਕਾਰ ਕਮਾਵਣੀ ਪੈਰੀ ਚਲਿ ਸਤਿਸੰਗਿ ਮਿਲੇਹੀ।।
ਕਿਰਤਿ ਵਿਰਤਿ ਕਰਿ ਧਰਮ ਦੀ ਖਟਿ ਖਵਾਲਣੁ ਕਾਰਿ ਕਰੇਹੀ।।
(ਵਾਰਾਂ ਭਾਈ ਗੁਰਦਾਸ ਜੀ, ਵਾਰ-1, ਪਉੜੀ 3)`,
    artist: "Jaspreet Singh",
    medium: "Oil Painting",
  },
  "04-vand-shako.jpg": {
    title: "Vand Shako (Share What You Have)",
    description: `Vand Chhako is part of the Gurmat threefold principle (Naam Japo, Kirat Karo, Vand Chhako). In lexicons, "Vand" can mean to separate, to apportion, a portion; "Chhakkṇa" means to eat, partake, be satisfied. The Gurmat Nirṇay Kosh defines it thus: "Using appropriately what you possess for the help of those in need is called Vand Chhakkṇa."

From these meanings, Vand Chhako emerges as: taking an equal portion from what you have and giving it to one in need or one who wishes to partake. The concept springs from Guru Nanak's line:

"By toil earn your living, and from your hands give."

Here, Vand Chhako is "hathahu dei"—give from your hands. Sri Guru Arjan Dev Ji emphasizes its importance:

"Eat and spend together, O brothers;
there will be no loss—it will only increase."

Bhai Gurdas Ji, interpreter of Gurmat, writes:

"Earn by toil, and the Gursikhs eat together."

"Eating together" is exactly Vand Chhako. In the Gurus' time, every Sikh lived this principle. In the era of Guru Amar Das Ji, both Vand Chhako and offerings (kar-bhet) existed; over time, daswandh (giving one-tenth) took shape, likely inspired by Vand Chhako. In Gurmat, Vand Chhako and daswandh each has its own identity—daswandh is offered for the Guru's cause:

"Whatever you earn,
give a tenth for the Guru's sake."
(Bhai Santokh Singh, Sri Gur Pratap Sūraj Granth)

When Guru Amar Das Ji began the digging of the Goindwal Baolī, Sikhs used to bring kar-bhet before the Guru:

"One day, in the assembly, he proclaimed,
'Here, the baoli will bring salvation…'
The Guru prepared for the holy work;
blessed ones came forward for service…
a great gathering of the Sangat assembled;
each, to his capacity, brought offerings."
(Sri Gur Pratap Sūraj Granth)

Even today, daswandh belongs to the Guru Panth and can be used for its causes; Vand Chhako preserved its independent identity then as now, as we see in Guru Arjan's Bani and Bhai Gurdas's Vars. Sharing strengthens bonds among Sikhs and the wider community—ties we so often lack today.

Rehatnamas mention Vand Chhako. Bhai Prahlad Singh writes:

"Let the Sikh distribute the blessed food;
for such a Sikh the Guru would give his very life."

Thus, whoever guards this principle wins the Guru's pleasure. In the 18th century, even amidst persecution and exile, the Khalsa did not forget to share; after preparing langar, they would call out loudly so that the needy and hungry ate first, then they themselves.

Bhai Ratan Singh Bhangu records that Sikhs always shared—no Singh ate alone or in secret; if one had food, all ate together; otherwise they would keep langar going:

"If he had (food), he opened his hand and gave; if not, he would not eat alone.
It has ever been the Khalsa's way: none eats secretly or alone.
If there is but one (share), all eat together; otherwise, they call it the 'langar of contentment.'
First offer openly, then eat; loving the Singhs, call them together."
(Ratan Singh Bhangu, Sri Gur Panth Prakash)

Vand Chhako teaches us to live beyond caste, creed, religion, color, race—showing equal regard to all. Through the Guru's insistence on sharing, we can build a global brotherhood, sorely needed today.`,
    titlePa: "ਵੰਡ ਛਕੋ",
    descriptionPa: `ਵੰਡ ਛਕਣ ਦਾ ਸੰਕਲਪ ਗੁਰਮਤਿ ਦੇ ਤਿੰਨ ਸੂਤਰੀ ਸਿਧਾਂਤ (ਨਾਮ ਜਪੋ, ਕਿਰਤ ਕਰੋ, ਵੰਡ ਛਕੋ) ਵਿਚ ਸਮਿਲਿਤ ਹੈ। ਮਹਾਨ ਕੋਸ਼ ਵਿਚ ਵੰਡ ਛਕਣ ਬਾਰੇ ਇਕਠਾ ਇੰਦਰਾਜ ਪ੍ਰਾਪਤ ਨਹੀਂ ਹੁੰਦਾ ਪਰ 'ਵੰਡ' ਅਤੇ 'ਛਕਣਾ' ਵੱਖਰੇ-ਵੱਖਰੇ ਰੂਪ ਵਿਚ ਮਿਲਦੇ ਹਨ। 'ਵੰਡ' ਸ਼ਬਦ ਦੇ ਅਰਥ ਹਨ- ਅਲੱਗ ਕਰਨਾ, ਹਿੱਸਾ ਕਰਨਾ, ਢੱਕਣਾ, ਹਿੱਸਾ ਅਤੇ ਆਟਾ ਛਾਣਨ ਤੋਂ ਛਾਣਨੀ ਵਿਚ ਬਚਿਆ ਸੂਹੜਾ ਆਦਿ ਮਿਲਦੇ ਹਨ। ਛਕਣਾ ਦੇ ਅਰਥ- ਖਾਣਾ, ਭੋਜਨ ਕਰਨਾ ਅਤੇ ਤ੍ਰਿਪਤ ਹੋਣਾ ਆਦਿ ਮਿਲਦੇ ਹਨ।

ਗੁਰਮਤਿ ਨਿਰਣਯ ਕੋਸ਼ ਅਨੁਸਾਰ, "ਲੋੜਵੰਦਾਂ ਦੀ ਸਹਾਇਤਾ ਲਈ ਜੋ ਕੁਝ ਤੁਹਾਡੇ ਕੋਲ ਹੈ, ਉਸਦੀ ਸੁਯੋਗ ਵਰਤੋਂ ਦਾ ਨਾਂ 'ਵੰਡ ਛਕਣਾ' ਹੈ।" ਉਪਰੋਕਤ ਕੋਸ਼ਗਤ ਅਰਥਾਂ ਤੋਂ ਵੰਡ ਛਕਣ ਦੇ ਅਰਥ- ਕੋਈ ਵੀ ਵਸਤ ਜੋ ਵਿਅਕਤੀ ਜਾਂ ਮਨੁੱਖ ਕੋਲ ਹੈ, ਉਸ ਵਿੱਚੋਂ ਬਰਾਬਰ ਦਾ ਹਿੱਸਾ ਕੱਢ ਕੇ ਲੋੜਵੰਦ ਜਾਂ ਪਦਾਰਥ ਛਕਣ ਦੀ ਇਛਾ ਰੱਖਣ ਵਾਲੇ ਨੂੰ ਦੇਣਾ ਆਦਿ ਉਘੜ੍ਹ ਕੇ ਸਾਮ੍ਹਣੇ ਆਉਂਦੇ ਹਨ।

'ਵੰਡ ਛਕਣ' ਦਾ ਸੰਕਲਪ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਵੱਲੋਂ ਉਚਾਰਨ ਪੰਗਤੀ "ਘਾਲਿ ਖਾਇ ਕਿਛੁ ਹਥਹੁ ਦੇਇ" ਵਿਚੋਂ ਉਪਜਦਾ ਹੈ। ਏਥੇ ਵੰਡ ਛਕਣ ਨੂੰ 'ਹਥਹੁ ਦੇਇ' ਕਰ ਕੇ ਦਰਸਾਇਆ ਹੈ। ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਵੀ ਵੰਡ ਛਕਣ ਦੇ ਸੰਕਲਪ ਦੀ ਮਹੱੱਤਤਾ ਬਾਣੀ ਵਿਚ ਦਰਸਾਉਂਦੇ ਹੋਏ ਜ਼ਿਕਰ ਕਰਦੇ ਹਨ-
ਖਾਵਹਿ ਖਰਚਹਿ ਰਲਿ ਮਿਲਿ ਭਾਈ॥ ਤੋਟਿ ਨ ਆਵੈ ਵਧਦੋ ਜਾਈ॥

ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਸਮਕਾਲੀ ਭਾਈ ਗੁਰਦਾਸ ਜੀ, ਜੋ ਗੁਰਮਤਿ ਸਿਧਾਂਤਾਂ ਦੇ ਵਿਆਖਿਆਕਾਰ ਹਨ, ਉਹ ਆਪਣੀ ਰਚਨਾ ਵਿਚ ਬਿਆਨ ਕਰਦੇ ਹਨ-
ਘਾਲਿ ਖਾਇ ਗੁਰਸਿਖ ਮਿਲਿ ਖਾਣਾ॥
'ਗੁਰਸਿਖ ਮਿਲਿ ਖਾਣਾ' ਤੋਂ ਭਾਵ ਵੰਡ ਕੇ ਛਕਣ ਤੋਂ ਹੀ ਹੈ। ਉਪਰੋਕਤ ਹਵਾਲਿਆਂ ਰਾਹੀਂ ਸਾਨੂੰ ਸਹਿਜੇ ਹੀ ਗਿਆਤ ਹੋ ਜਾਂਦਾ ਹੈ ਕਿ ਗੁਰੂ-ਕਾਲ ਵਿਚ ਹਰੇਕ ਗੁਰਸਿਖ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ ਉਤੇ ਅਮਲੀ ਰੂਪ ਵਿਚ ਪਹਿਰਾ ਦਿੰਦਾ ਸੀ।

ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੇ ਗੁਰਿਆਈ ਕਾਲ ਵੇਲੇ ਵੰਡ ਛਕਣ ਅਤੇ ਕਾਰ-ਭੇਟ ਦਾ ਸੰਕਲਪ; ਦੋਵੇਂ ਮੌਜੂਦ ਸਨ। ਕਾਰ-ਭੇਟ ਨੇ ਬਾਅਦ ਵਿਚ ਕੁਝ ਸਮੇਂ ਉਪਰੰਤ ਦਸਵੰਧ ਦਾ ਰੂਪ ਅਖ਼ਤਿਆਰ ਕਰ ਲਿਆ। 'ਦਸਵੰਧ' ਦੇ ਸਿਧਾਂਤ ਦੀ ਰੂਪ-ਰੇਖਾ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ ਤੋਂ ਪ੍ਰੇਰਿਤ ਜਾਪਦੀ ਹੈ। ਉਂਝ ਗੁਰਮਤਿ ਵਿਚ 'ਵੰਡ ਛਕਣ' ਦਾ ਸੰਕਲਪ ਅਤੇ 'ਦਸਵੰਧ' ਦਾ ਸਿਧਾਂਤ ਆਪਣੀ ਵੱਖਰੀ-ਵੱਖਰੀ ਹੋਂਦ ਰੱਖਦੇ ਹਨ। ਦਸਵੰਧ ਗੁਰੂ ਦੇ ਨਮਿਤ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ-
ਜੋ ਅਪਨੀ ਕਛੁ ਕਰਹੁ ਕਮਾਈ। ਗੁਰ ਹਿਤ ਦਿਹੁ ਦਸਵੰਧ ਬਨਾਈ।
(ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ, ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ (ਜਿਲਦ ਪੰਜਵੀਂ))

ਜਦੋਂ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਨੇ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਬਾਉਲੀ ਦੀ ਖੁਦਾਈ ਦੀ ਸੇਵਾ ਆਰੰਭ ਕਰਵਾਈ ਤਾਂ ਉਸ ਸਮੇਂ ਸਿਖ 'ਕਾਰ-ਭੇਟ' ਗੁਰੂ ਦੇ ਸਨਮੁਖ ਲੈ ਕੇ ਹਾਜ਼ਰ ਹੁੰਦੇ ਸਨ-
ਇਕ ਦਿਨ ਸਭਾ ਮਝਾਰ ਉਚਾਰਾ। ਇਹਾਂ ਬਾਵਲੀ ਲਗਹਿ ਉਦਾਰਾ।...
ਤੀਰਥ ਕੀ ਤਿਯਾਰੀ ਗੁਰੁ ਕਰੈਂ। ਹੁਇ ਨਿਹਾਲ ਸੇਵਾ ਹਿਤ ਧਰੈਂ।...
ਭਯੋ ਮੇਲ ਸੰਗਤਿ ਕੋ ਭਾਰੋ। ਜਥਾ ਸਕਤਿ ਲੈ ਆਵਹਿਂ ਕਾਰੋ।
(ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ, ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ (ਜਿਲਦ ਪੰਜਵੀਂ))

ਅਜੋਕੇ ਸਮੇਂ ਵਿਚ ਵੀ ਦਸਵੰਧ ਗੁਰੂ-ਪੰਥ ਦਾ ਹੈ, ਉਹ ਇਸ ਨੂੰ ਜਿਸ ਕਾਜੈ ਚਾਹੇ ਵਰਤ ਸਕਦਾ ਹੈ। 'ਵੰਡ ਛਕਣ' ਦਾ ਸੰਕਲਪ ਗੁਰੂ-ਕਾਲ ਵੇਲੇ ਵੀ ਦਸਵੰਧ ਨਾਲੋਂ ਅੱਡਰੀ ਹੋਂਦ ਬਰਕਰਾਰ ਰੱਖਦਾ ਸੀ, ਜਿਸ ਦਾ ਹਵਾਲਾ ਸਾਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੀ ਬਾਣੀ ਅਤੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀਆਂ ਵਾਰਾਂ ਵਿਚੋਂ ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ। ਵੰਡ ਕੇ ਛਕਣਾ ਗੁਰਭਾਈਆਂ ਅਤੇ ਸਮਾਜਿਕ ਭਾਈਚਾਰੇ ਨਾਲ ਸਾਂਝ ਨੂੰ ਦ੍ਰਿੜ੍ਹ ਕਰਵਾੳਂੁਣਾ ਹੈ, ਜਿਸ ਤੋਂ ਅਜੋਕੇ ਸਮੇਂ ਵਿਚ ਅਸੀਂ ਦੂਰ ਖਿਸਕ ਰਹੇ ਹਾਂ।

ਸਿਖ ਰਹਿਤਨਾਮਿਆਂ ਵਿਚ ਵੰਡ ਛਕਣ ਦਾ ਜ਼ਿਕਰ ਮਿਲਦਾ ਹੈ। ਭਾਈ ਪ੍ਰਹਿਲਾਦ ਸਿੰਘ ਜੀ ਆਪਣੇ ਰਹਿਤਨਾਮੇ ਵਿਚ ਦਰਸਾਉਂਦੇ ਹਨ-
ਕਰਿ ਪ੍ਰਸਾਦਿ ਸਿਖ ਮੁਖ ਪਾਵੈ। ਤਿਸ ਸਿਖ ਪੈ ਗੁਰ ਵਾਰਨੇ ਜਾਵੈ।
ਉਪਰੋਕਤ ਹਵਾਲਿਆਂ ਨਾਲ ਸਪੱਸ਼ਟ ਹੈ ਕਿ ਜੋ ਵੀ ਸਿਖ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ 'ਤੇ ਪਹਿਰਾ ਦਿੰਦਾ ਹੈ, ਉਸ ਨੂੰ ਗੁਰੂ ਦੀ ਖੁਸ਼ੀ ਪ੍ਰਾਪਤ ਹੁੰਦੀ ਹੈ।

ਅਠਾਰਵੀਂ ਸਦੀ ਵਿਚ ਰਾਜਸੀ ਹਾਲਾਤ ਸਿਖਾਂ ਦੇ ਅਨੁਕੂਲ ਨਹੀਂ ਸਨ ਅਤੇ ਘਰਾਂ ਤੋਂ ਬੇਘਰ ਹੋਇਆ ਖ਼ਾਲਸਾ ਘੋੜਿਆਂ ਦੀਆਂ ਕਾਠੀਆਂ 'ਤੇ ਦਿਨ ਅਤੇ ਰਾਤ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿਚ ਗੁਜ਼ਾਰਦਾ ਸੀ। ਉਸ ਸਮੇਂ ਵੀ ਗੁਰੂ ਦੇ ਸਿੱਖਾਂ ਨੇ ਵੰਡ ਕੇ ਛਕਣ ਦੇ ਸੰਕਲਪ ਨੂੰ ਨਹੀਂ ਵਿਸਾਰਿਆ ਅਤੇ ਲੰਗਰ ਤਿਆਰ ਹੋਣ ਤੋਂ ਬਾਅਦ ਉਚੀ ਹੋਕਾ ਦੇ ਕੇ ਲੋੜਵੰਦਾਂ ਅਤੇ ਭੁਖਣ-ਭਾਣਿਆਂ ਨੂੰ ਪ੍ਰਸ਼ਾਦਾ ਛਕਾ, ਪਿਛੋਂ ਆਪ ਛਕਦੇ ਸਨ। ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ ਵੰਡ ਕੇ ਛਕਣ ਦਾ ਜ਼ਿਕਰ ਕਰਦੇ ਹੋਏ ਦੱਸਦੇ ਹਨ ਕਿ ਸਿਖ ਆਪਸ ਵਿਚ ਵੰਡ ਕੇ ਛਕਦੇ ਸਨ। ਖ਼ਾਲਸੇ ਦੀ ਇਹ ਰਹੁ-ਰੀਤ ਸੀ ਕਿ ਕੋਈ ਵੀ ਸਿੰਘ ਇਕੱਲਾ ਅਤੇ ਲੁਕ ਕੇ ਨਹੀਂ ਸੀ ਛਕਦਾ। ਜੇਕਰ ਇਕ ਕੋਲ ਵਸਤ ਹੁੰਦੀ ਤਾਂ ਸਾਰੇ ਰਲ-ਮਿਲ ਛਕਦੇ, ਨਹੀਂ ਤਾਂ ਲੰਗਰ ਮਸਤਾਨਾ ਦੱਸਦੇ ਸਨ-
ਪਾਸ ਹੋਤਿ ਤੌ ਦੇਤ ਖੁਲਾਇ। ਹੋਇ ਨਹੀਂ ਤਾਂ ਇਕਲੋ ਨ ਖਾਇ।
ਹੁਤੀ ਪਹਿਲੋਂ ਖਾਲਸੌ ਯਹਿ ਰੀਤ। ਇਕਲੋ ਨ ਖਾਵੈ ਲੁਕ ਕਰ ਕੀਤ।
ਇਕ ਪੈ ਹੋਇ ਤੌ ਸਭ ਮਿਲ ਖਾਹਿਂ। ਨਹਿਂ ਹੁਇ ਤੇ ਲੰਗਰ ਮਸਤ ਅਖਾਹਿਂ।
ਔਰ ਖੁਲਾਇ ਆ ਪਿੱਛੋਂ ਖਾਵੈ। ਬਹੁਤ ਪਯਾਰ ਕਰ ਸਿੰਘਨ ਸਦਾਵੈ।
(ਰਤਨ ਸਿੰਘ ਭੰਗੂ, ਸ੍ਰੀ ਗੁਰ ਪੰਥ ਪ੍ਰਕਾਸ਼, (ਸੰਪਾ.) ਡਾ. ਬਲਵੰਤ ਸਿੰਘ ਢਿੱਲੋਂ)

ਵੰਡ ਕੇ ਛਕਣ ਦਾ ਸੰਕਲਪ ਊਚ-ਨੀਚ, ਭੇਦ-ਭਾਵ, ਧਰਮ, ਜਾਤ, ਰੰਗ ਅਤੇ ਨਸਲ ਆਦਿ ਦੇ ਵਿਤਕਰਿਆਂ ਨੂੰ ਤਿਆਗ ਕੇ ਜੀਵਨ ਜਿਉਣ ਦੀ ਜੁਗਤਿ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਇਸ ਸੰਕਲਪ ਨੂੰ ਵਿਵਹਾਰਕ ਤੌਰ 'ਤੇ ਅਪਨਾਉਂਣ ਵਾਲਾ ਵਿਅਕਤੀ; ਵੈਰੀ ਜਾਂ ਮੀਤ ਦੀ ਪਛਾਣ ਨਹੀਂ ਕਰਦਾ, ਸਗੋਂ ਵੰਡ ਕੇ ਛਕਣ ਵੇਲੇ ਹਰੇਕ ਨੂੰ ਸਮਦ੍ਰਿਸ਼ਟੀ ਨਾਲ ਵੇਖਦਾ ਹੈ। ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਵੱਲੋਂ ਦ੍ਰਿੜ੍ਹ ਕਰਵਾਏ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ ਸਦਕਾ ਅਸੀਂ ਵਿਸ਼ਵ-ਭਾਈਚਾਰਕ ਸਾਂਝ ਪੈਦਾ ਕਰ ਸਕਦੇ ਹਾਂ, ਜਿਸ ਦੀ ਅਜੋਕੇ ਸਮੇਂ ਵਿਚ ਬੇਹਦ ਲੋੜ੍ਹ ਪ੍ਰਤੀਤ ਹੁੰਦੀ ਹੈ।`,
    artist: "Jaspreet Singh",
    medium: "Oil Painting",
  },
  "05-ang-sahib.jpg": {
    title: "Shabad Guru Surat Dhun Chela",
    description: `"Shabad Guru, Surat Dhun Chela" — The Word is the Guru; Consciousness, the Disciple of Its Melody.

The eleventh Sikh Guru is the Sri Guru Granth Sahib, the eternal spiritual Guru of the Sikhs—not a person but the sacred scripture containing the Bani of the Sikh Gurus and saints. It teaches truth, equality, devotion, and humility. Sikhs seek timeless guidance from it.`,
    titlePa: "ਸਬਦ ਗੁਰੂ ਸੁਰਤਿ ਧੁਨਿ ਚੇਲਾ॥",
    descriptionPa: `ਗਿਆਰਹਵੇਂ ਸਿੱਖ ਗੁਰੂ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਹਨ, ਜੋ ਸਿੱਖਾਂ ਦੇ ਸਦਾ ਕਾਲੀਨ ਆਤਮਕ ਗੁਰੂ ਹਨ। ਇਹ ਕੋਈ ਵਿਅਕਤੀ ਨਹੀਂ, ਸਗੋਂ ਪਵਿੱਤਰ ਗ੍ਰੰਥ ਹੈ ਜਿਸ ਵਿੱਚ ਸਿੱਖ ਗੁਰੂਆਂ ਅਤੇ ਸੰਤਾਂ ਦੀ ਬਾਣੀ ਸੰਗ੍ਰਹਿਤ ਹੈ। ਇਹ ਸੱਚ, ਸਮਾਨਤਾ, ਭਗਤੀ ਅਤੇ ਨਿਮਰਤਾ ਦਾ ਉਪਦੇਸ਼ ਦਿੰਦਾ ਹੈ। ਸਿੱਖ ਇਸ ਤੋਂ ਸਦੀਵੀ ਮਾਰਗਦਰਸ਼ਨ ਲੈਂਦੇ ਹਨ।

ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਸਿੱਖ ਧਰਮ ਦਾ ਕੇਂਦਰੀ ਗ੍ਰੰਥ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੇ ਗਿਆਰਹਵੇਂ ਗੁਰੂ ਦੇ ਰੂਪ ਵਿੱਚ ਪੂਜਿਆ ਜਾਂਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਸਿੱਖ ਗੁਰੂਆਂ, ਭਗਤਾਂ ਅਤੇ ਸੰਤਾਂ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ ਸ਼ਾਮਲ ਹੈ। ਇਹ ਗ੍ਰੰਥ ਸਿੱਖਾਂ ਲਈ ਸਦਾ ਕਾਲੀਨ ਗੁਰੂ ਹੈ ਅਤੇ ਇਸ ਦਾ ਸਤਿਕਾਰ ਸਿੱਖ ਧਰਮ ਦਾ ਮੂਲ ਆਧਾਰ ਹੈ।

ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਵਿੱਚ ਸ਼ਾਮਲ ਬਾਣੀ ਸਿੱਖਾਂ ਨੂੰ ਸੱਚੇ ਜੀਵਨ ਦਾ ਮਾਰਗ ਦਿਖਾਉਂਦੀ ਹੈ। ਇਹ ਇੱਕ ਇੱਕ ਇਨਸਾਨ ਦੀ ਸਮਾਨਤਾ, ਭਗਤੀ ਦੀ ਮਹੱਤਤਾ, ਅਤੇ ਸੇਵਾ ਦੇ ਮਹੱਤਵ ਨੂੰ ਉਜਾਗਰ ਕਰਦੀ ਹੈ। ਸਿੱਖ ਇਸ ਪਵਿੱਤਰ ਗ੍ਰੰਥ ਤੋਂ ਆਪਣੇ ਜੀਵਨ ਦੇ ਹਰ ਪੜਾਅ 'ਤੇ ਮਾਰਗਦਰਸ਼ਨ ਲੈਂਦੇ ਹਨ।

ਅੰਗ ਸਾਹਿਬ ਦਾ ਸਤਿਕਾਰ ਸਿੱਖ ਧਰਮ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ। ਇਹ ਸਿੱਖਾਂ ਨੂੰ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੀ ਸਿੱਖਿਆ ਨੂੰ ਆਪਣੇ ਜੀਵਨ ਵਿੱਚ ਉਤਾਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕਰਦਾ ਹੈ। ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਸਿੱਖਾਂ ਲਈ ਸਿਰਫ਼ ਇੱਕ ਧਾਰਮਿਕ ਗ੍ਰੰਥ ਨਹੀਂ, ਸਗੋਂ ਇੱਕ ਜੀਵਤ ਗੁਰੂ ਹੈ ਜੋ ਸਦਾ ਸਿੱਖਾਂ ਦਾ ਮਾਰਗਦਰਸ਼ਨ ਕਰਦਾ ਰਹਿੰਦਾ ਹੈ।`,
    artist: "Manjeet Kaur",
    medium: "Miniature Style Painting",
  },
  "06-battle-of-chappad-chidi.jpg": {
    title: "Battle of Chappad Chidi",
    description: `To chastise tyranny, the Tenth Guru sent Baba Banda Singh Bahadur toward Punjab, blessing him with five arrows and placing him under the command of the Panj Singh. As the Singhs gathered and fought battles, the day arrived when Wazir Khan—who had martyred the Younger Sahibzade—would be faced in the field.

At Chappar Chiri, a fierce battle raged. Until noon, the Singhs dominated; but because Wazir Khan had much larger forces and artillery, the tide began turning against the Singhs in the afternoon. Seeing this, Baba Baaz Singh urged Baba Banda Singh, who was observing from a high mound, to enter the fray so the battle would again turn in their favor and the tyrant receive justice. Banda Singh prayed before Guru Sahib and mounted his horse. As recorded in Sri Gur Panth Prakash:

"Smiling, Banda called for his horse, saying, 'Master, I have arrived.'
'Strike! Seize! Plunder!'—so saying, he loosed the arrow."

Firing one of the arrows blessed by the Guru, Baba Ji changed the course of the battlefield. Soon the Singhs were victorious; they captured Wazir Khan, took him to Sirhind, and punished him.`,
    titlePa: "ਚੱਪੜ ਝਿੜੀ ਦੀ ਜੰਗ",
    descriptionPa: `ਦਸਵੇਂ ਪਾਤਸ਼ਾਹ ਨੇ ਜਾਲਮ ਨੂੰ ਸੋਧਣ ਲਈ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਨੂੰ ਪੰਜ ਤੀਰ ਦੇ ਕੇ ਪੰਜਾਂ ਸਿੰਘਾਂ ਦੀ ਤਾਬਿਆ ਵਿਚ ਪੰਜਾਬ ਵੱਲ ਨੂੰ ਤੋਰਿਆ। ਦੁਸ਼ਟਾਂ ਨੂੰ ਸੋਧਦਿਆਂ ਆਖ਼ਰ ਉਹ ਦਿਨ ਆ ਗਿਆ ਜਿਸ ਦਿਨ ਛੋਟੇ ਸਾਹਿਬਜਾਦਿਆਂ ਨੂੰ ਸ਼ਹੀਦ ਕਰਨ ਵਾਲੇ ਵਜ਼ੀਰ ਖਾਨ ਦਾ ਸੋਧਾ ਲੱਗਣਾ ਸੀ। ਚੱਪੜਚਿੜੀ ਦੇ ਮੈਦਾਨ ਚ ਘਮਸਾਨ ਦਾ ਯੁੱਧ ਚੱਲਿਆ ਜਿਸ ਵਿਚ ਦੁਪਹਿਰ ਤਕ ਸਿੰਘ ਭਾਰੂ ਰਹੇ ਪਰ ਵਜ਼ੀਰ ਖਾਨ ਕੋਲ ਬਹੁਤ ਜਿਆਦਾ ਫੌਜ ਤੇ ਜੰਗੀ ਅਮਲਾ-ਫੈਲਾ ਹੋਣ ਕਾਰਨ ਦੁਪਿਹਰੋਂ ਬਾਦ ਜੰਗ ਸਿੰਘਾਂ ਉੱਤੇ ਹਾਵੀ ਹੋਣ ਲੱਗੀ।

ਇਹ ਦੇਖਦਿਆਂ ਬਾਬਾ ਬਾਜ਼ ਸਿੰਘ ਨੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਨੂੰ ਜੋ ਇਕ ਉੱਚੀ ਟਿੱਬੀ ਤੋਂ ਜੰਗ ਨੂੰ ਦੇਖ ਰਹੇ ਸਨ ਕਿਹਾ ਕਿ ਉਹ ਹੁਣ ਜੰਗ ਵਿਚ ਆ ਜਾਣ ਤਾਂ ਜੋ ਜੰਗ ਦੁਬਾਰਾ ਸਾਡੇ ਹੱਕ 'ਚ ਹੋ ਜਾਵੇ ਤੇ ਜਾਲਮ ਵਜ਼ੀਰ ਖਾਨ ਦਾ ਸੋਧਾ ਲੱਗ ਸਕੇ। ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰੂ ਸਾਹਿਬ ਅੱਗੇ ਅਰਦਾਸ ਕੀਤੀ ਤੇ ਆਪਣੇ ਘੋੜੇ 'ਤੇ ਚੜ ਗਏ। ਸ੍ਰੀ ਗੁਰ ਪੰਥ ਪ੍ਰਕਾਸ਼ 'ਚ ਅੰਕਿਤ ਹੈ ਕਿ-
ਹਸਿ ਬੰਦੇ ਘੋੜੋ ਮੰਗਯੋ ਕਹਿ ਮਾਲਕ ਪਹੁੰਚਯੋ ਆਇ ।
ਮਾਰੋ ਲੇਵੋ ਲੂਟ ਕਹਿ ਦਯੋ ਸੁ ਤੀਰ ਚਲਾਇ ।੩੦।

ਗੁਰੂ ਸਾਹਿਬ ਦੇ ਬਖਸ਼ੇ ਤੀਰਾਂ ਵਿਚੋਂ ਇਕ ਤੀਰ ਬਾਬਾ ਜੀ ਨੇ ਚਲਾ ਦਿੱਤਾ ਜਿਸ ਨਾਲ ਜੰਗ ਦਾ ਸਾਰਾ ਮਹੌਲ ਬਦਲ ਗਿਆ। ਛੇਤੀ ਹੀ ਸਿੰਘਾਂ ਦੀ ਫਤਿਹ ਹੋ ਗਈ ਤੇ ਉਨ੍ਹਾਂ ਵਜ਼ੀਰ ਖਾਨ ਨੂੰ ਫੜ ਕੇ ਤੇ ਸਰਹਿੰਦ ਲਿਜਾ ਕੇ ਸੋਧ ਦਿੱਤਾ।`,
    artist: "Parm Singh",
    medium: "Canvas Print",
  },
  "07-baba-banda-singh-bahadar.jpg": {
    title: "Baba Banda Singh Bahadur",
    description: `Baba Banda Singh Bahadur was a great Sikh warrior and martyr, born 16 October 1670 in Rajouri (Jammu) to a Rajput family. In youth, after a painful incident in which he killed a pregnant doe, his heart changed. Leaving home to become an ascetic known as Madho Das Bairagi, he eventually settled at Nanded in Maharashtra.

In 1708, Guru Gobind Singh Ji visited his hut. Madho Das tried to impress the Guru with sorcery but failed; humbled, he said, "I am your Banda (servant)." The Guru urged him to leave asceticism and fight for Dharma. On 3 September 1708, the Guru administered Khande-di-Pahul and named him Banda Singh Bahadur, sending him to Punjab to end Mughal tyranny, especially to punish Nawab Wazir Khan.

Under the guidance of five Singhs—Baaz Singh, Ram Singh, Binod Singh, Kahan Singh, and Fateh Singh—the Guru gave him five golden arrows and a hukamnama. Banda Singh distributed captured state treasuries at Sonipat and Kaithal among the poor; he struck Samana (home of executioners of Guru Tegh Bahadur Ji and the younger Sahibzade), his first territorial victory and administrative unit; he destroyed Sadhora (where Syed Buddhu Shah had been tormented), where many were killed in a place called "Qatal Garhi."

On 12 May 1710, at Chappar Chiri, he defeated Wazir Khan's large army; Wazir Khan was killed, and Sirhind fell the next day. Banda made Lohgarh the capital of the first Sikh state, issued coins, and—most importantly—abolished the feudal landlord system to establish peasant proprietorship.

The Mughal emperor Bahadur Shah launched reprisals. Banda was driven from the plains and besieged at Gurdas Nangal. After eight months of heroic resistance and the exhaustion of provisions and ammunition, Banda Singh and about 740 Sikhs were captured on 17 December 1715, marched in chains to Delhi, and paraded. On 9 June 1716, Baba Banda Singh Bahadur was martyred in Delhi with his young son Ajay Singh.`,
    artist: "Jagdeep Singh",
    medium: "Oil Painting",
  },
  "08-tara-singh-van.jpg": {
    title: "Bhai Tara Singh Van's Battle",
    description: `In the third decade of the 18th century, the battle fought by Bhai Tara Singh of Van and his band in Van village ranks among the stirring engagements of Sikh history. Guarding Sikh tradition, he fought and attained martyrdom.

Likely born around 1702 to Bhai Gurdas Singh, who had served Guru Har Rai and later supported Sikh campaigns under Banda Singh Bahadur, Bhai Tara Singh was the eldest of five brothers. He took Khande-di-Pahul under Bhai Mani Singh's leadership. He built a fortified enclosure (vaṛa) on his fields near Van—so high that even a man on a camel couldn't peer inside.

After Banda Singh's martyrdom, the Sikhs adopted guerrilla tactics—by day hiding in forests, by night striking and melting away. Bands operating near Van would rest and eat at Bhai Tara Singh's enclosure before slipping away again before dawn. The state kept close watch on such Sikhs. A quarrel with local official Sahib Rai Nausheria brought the matter to Ja'far Beg, the faujdar of Patti. His first raid failed; he then asked Zakirya Khan, governor of Lahore, for help. Zakirya Khan sent Moman Khan with 2200 cavalry and war materiel to attack.

The Singhs learned of the approach. In council, they judged the imperial army too numerous and well-armed; prudence suggested withdrawing to forests like other bands. Bhai Tara Singh set out toward Malwa; reaching near Bahadur Nagar to ford the Sutlej, his conscience would not let him flee. Taking out a Dasam Granth he always kept in his coffer, he drew a Gurbani line for guidance:

"If one could escape death by fleeing from Time,
tell me—why run away?"
(Sri Dasam Granth)

Deeply struck, he abandoned the plan to withdraw, returned with his band, and held the enclosure. Moman Khan arrived. At amrit-vela, the Singhs beat the war-drum; their cry "akal!" shook the sky. Only about twenty-two Singhs stood against vastly more. They fought fiercely—Taqi Beg was wounded by Bhai Tara Singh's hand. Many Mughals fell. Moman Khan then ordered a united charge. One by one, the Singhs attained martyrdom in the field; at last, Bhai Tara Singh too fell fighting. This occurred around 1725–26. The Sikhs of that century, sheltered by the Shabad-Guru, chose martyrdom over flight. The memorial "Shaheed Ganj" of Bhai Tara Singh and his comrades stands in Van.`,
    titlePa: "ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਦਾ ਜੰਗ",
    descriptionPa: `ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਤੀਸਰੇ ਦਹਾਕੇ ਦੌਰਾਨ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਜਥੇ ਵੱਲੋਂ 'ਵਾਂ' ਪਿੰਡ 'ਚ ਲੜੀ ਜੰਗ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀਆਂ ਅਸਾਵੀਆਂ ਜੰਗਾਂ ਵਿੱਚ ਸ਼ੁਮਾਰ ਹੈ। ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਨੇ ਸਿੱਖ ਪਰੰਪਰਾ 'ਤੇ ਪਹਿਰਾ ਦਿੰਦਿਆਂ ਜੂਝ ਕੇ ਸ਼ਹੀਦੀ ਪਾਈ।
ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਭਾਈ ਗੁਰਦਾਸ ਸਿੰਘ ਦੇ ਘਰ 1702 ਈ. ਦੇ ਆਸ-ਪਾਸ ਹੋਇਆ ਕਿਆਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਭਾਈ ਗੁਰਦਾਸ ਸਿੰਘ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਹਜ਼ੂਰ ਰਹਿ ਕੇ ਸੇਵਾ ਨਿਭਾਈ ਤੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਦੇ ਵੇਲੇ ਵੀ ਸਿੱਖ ਮੁਹਿੰਮਾਂ ਵਿੱਚ ਯੋਗਦਾਨ ਪਾਇਆ ਸੀ।
ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਜਥੇਦਾਰੀ ਵਿੱਚ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਛਕ ਕੇ ਸਿੰਘ ਸਜੇ ਸਨ। ਉਹ 'ਵਾਂ' ਪਿੰਡ ਨਾਲ ਲੱਗਦੇ ਆਪਣੇ ਖੇਤਾਂ ਵਿਚ ਵਾੜਾ ਬਣਾ ਕੇ ਨਿਵਾਸ ਕਰਦੇ ਸਨ। ਉਨ੍ਹਾਂ ਆਪਣਾ ਵਾੜਾ ਏਨਾ ਉੱਚਾ ਵਲਿਆ ਸੀ ਕਿ ਊਠ 'ਤੇ ਸਵਾਰ ਬੰਦਾ ਵੀ ਅੰਦਰ ਝਾਤ ਨਹੀਂ ਸੀ ਮਾਰ ਸਕਦਾ।
ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਬਹਾਦਰ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਬਾਅਦ ਸਿੱਖਾਂ ਨੇ ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਦੌਰਾਨ ਮੁਗ਼ਲਾਂ ਨਾਲ ਗੁਰੀਲਾ ਯੁੱਧ ਨੀਤੀ ਅਪਣਾਈ। ਇਸ ਨੀਤੀ ਤਹਿਤ ਸਿੰਘ ਦਿਨੇ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿੱਚ ਸਮਾਂ ਬਤੀਤ ਕਰਦੇ ਪਰ ਜਿਉਂ ਹੀ ਰਾਤ ਹੁੰਦੀ ਬਾਹਰ ਨਿਕਲ ਕੇ ਨਿੱਕੀਆਂ-ਮੋਟੀਆਂ ਝੜਪਾਂ ਕਰਦੇ।
ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੇ ਮੋਮਨ ਖ਼ਾਨ ਨੂੰ 2200 ਘੋੜਸਵਾਰ ਤੇ ਹੋਰ ਜੰਗੀ ਸਮਾਨ ਦੇ ਕੇ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ 'ਤੇ ਚੜ੍ਹਾਈ ਕਰਨ ਦੀ ਤਾਕੀਦ ਕੀਤੀ। ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਨੇ ਸਾਥੀ ਸਿੰਘਾਂ ਨਾਲ ਮਸ਼ਵਰਾ ਕੀਤਾ ਕਿ ਸ਼ਾਹੀ ਫ਼ੌਜ ਦਾ ਟਾਕਰਾ ਕਰਨ ਲਈ ਸਾਨੂੰ ਵੀ ਤਿਆਰੀ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ।
ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਨੂੰ ਸੁੱਝੀ ਕਿ ਸਾਨੂੰ ਇਉਂ ਕਾਇਰਾਂ ਵਾਂਗ ਨਹੀਂ ਭੱਜਣਾ ਚਾਹੀਦਾ। ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਖਜ਼ਾਨੇ ਵਿੱਚੋਂ ਦਸ ਗ੍ਰੰਥੀ ਕੱਢੀ ਤੇ ਗੁਰਬਾਣੀ ਦੀ ਓਟ ਲੈਣ ਲਈ 'ਗੁਰਬਾਣੀ ਵਾਕ' ਲਿਆ: "ਜੋ ਕਹੂੰ ਕਾਲ ਤੇ ਭਾਜ ਕੇ ਬਾਚੀਅਤ ਤੋ ਕਿਹ ਕੁੰਟ ਕਹੋ ਭਜਿ ਜਈਯੈ॥"
ਉਕਤ 'ਗੁਰਬਾਣੀ ਵਾਕ' ਨੇ ਭਾਈ ਸਾਹਿਬ 'ਤੇ ਗਹਿਰਾ ਅਸਰ ਕੀਤਾ ਤੇ ਉਨ੍ਹਾਂ ਨੇ ਮਾਲਵੇ ਵੱਲ ਨੂੰ ਨਿਕਲਣ ਦਾ ਇਰਾਦਾ ਤਿਆਗ ਦਿੱਤਾ। ਉਹ ਸਿੰਘਾਂ ਦੇ ਜਥੇ ਸਮੇਤ ਸਤਲੁਜ ਦੇ ਪੱਤਣ ਬਹਾਦਰ ਨਗਰ ਤੋਂ ਵਾਪਸ ਪਰਤ ਆਏ ਤੇ ਵਾੜੇ ਵਿੱਚ ਆ ਡਟੇ।
ਲਾਹੌਰ ਤੋਂ ਚੱਲਿਆ ਮੋਮਨ ਖ਼ਾਨ ਪੈਂਡਾ ਤੈਅ ਕਰਦਾ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਦੇ ਵਾੜੇ ਕੋਲ ਆ ਪਹੁੰਚਿਆ। ਸਿੰਘ ਗੁਰੂ ਦੇ ਹੁਕਮ ਨੂੰ ਕਬੂਲਦੇ ਹੋਏ ਸ਼ਹੀਦੀਆਂ ਪਾਉਣ ਲਈ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਸਨ। ਸਿੰਘਾਂ ਨੇ ਧੌਂਸੇ 'ਤੇ ਚੋਟ ਲਾਈ, ਅੰਮ੍ਰਿਤ ਵੇਲੇ ਗੂੰਜ ਏਨੀ ਹੋਈ ਕਿ ਸ਼ਾਹੀ ਫ਼ੌਜ ਇੱਕ ਵਾਰ ਤਾਂ ਭੈ-ਭੀਤ ਹੋ ਗਈ।
ਸਿੰਘ ਗਿਣਤੀ ਦੇ ਸਿਰਫ਼ 22 ਕੁ ਸਨ ਤੇ ਸ਼ਾਹੀ ਫ਼ੌਜ ਕਿਤੇ ਵੱਧ ਸੀ। ਸਿੰਘਾਂ ਨੇ ਮੁਗ਼ਲਾਂ ਦਾ ਡਟ ਕੇ ਮੁਕਾਬਲਾ ਕੀਤਾ। ਇਸ ਜੰਗ ਦੌਰਾਨ ਸਿੰਘਾਂ ਨੇ ਮੁਗ਼ਲ ਸੈਨਾ ਦਾ ਭਾਰੀ ਨੁਕਸਾਨ ਕਰ ਦਿੱਤਾ। ਆਖ਼ਰ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਵੀ ਮੁਗ਼ਲਾਂ ਨਾਲ ਲੋਹਾ ਲੈਂਦੇ ਹੋਏ ਸ਼ਹੀਦੀ ਪਾ ਗਏ। ਇਹ ਸਾਕਾ ਸੰਨ 1725-26 ਦੇ ਆਸਪਾਸ ਦਾ ਹੈ।
ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਸਿੰਘਾਂ ਨੇ ਸ਼ਬਦ-ਗੁਰੂ ਦੀ ਓਟ ਸਦਕਾ 'ਗੁਰਬਾਣੀ ਵਾਕ' 'ਤੇ ਚੱਲਦਿਆਂ ਰਣਤੱਤੇ ਨੂੰ ਛੱਡ ਕੇ ਭੱਜਣ ਨਾਲੋਂ ਜੂਝ ਕੇ ਸ਼ਹੀਦੀ ਪਾਉਣ ਨੂੰ ਤਰਜੀਹ ਦਿੱਤੀ। ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਤੇ ਸਾਥੀ ਸ਼ਹੀਦ ਸਿੰਘਾਂ ਦਾ 'ਸ਼ਹੀਦ ਗੰਜ' ਪਿੰਡ 'ਵਾਂ' ਵਿੱਚ ਸੁਸ਼ੋਭਿਤ ਹੈ।`,
    artist: "Parm Singh",
    medium: "Canvas Print",
  },
  "09-chawinde-walian-bibian.jpg": {
    title: "Battle of Kaurs at Chavinda",
    titlePa: "ਚਵਿੰਡੇ ਵਾਲੀਆਂ ਬੀਬੀਆਂ ਦੀ ਜੰਗ",
    descriptionPa: `1726 'ਚ ਇਕ ਜਾਫਰ ਬੇਗ ਨਾਂ ਦਾ ਤੁਰਕ ਸਾਹਿਬ ਰਾਏ ਨਾ ਦੇ ਇਕ ਸਰਕਾਰੀ ਝੋਲੀ ਚੁੱਕ ਮਗਰ ਲੱਗ ਕੇ ਨੌਸਹਿਰੇ 'ਚ ਸਿੰਘਾਂ ਨਾਲ ਲੜਿਆ ਸੀ ਤੇ ਥੋੜ੍ਹੇ ਜਿਹੇ ਸਿੰਘਾਂ ਤੋਂ ਬੁਰੀ ਤਰਾਂ ਹਾਰ ਖਾ ਕੇ ਅੰਮ੍ਰਿਤਸਰ ਵੱਲ ਨੂੰ ਭੱਜ ਆਇਆ ਸੀ। ਹਾਰ ਦੀ ਨਮੋਸ਼ੀ ਤੋਂ ਨਿਜਾਤ ਪਾਉਣ ਲਈ ਉਹ ਕੋਈ ਬਹਾਨਾ ਲੱਭ ਰਿਹਾ ਸੀ ਤੇ ਉਸ ਨੂੰ ਚਵਿੰਡੇ 'ਚ ਸਰਦਾਰ ਬਹਾਦਰ ਸਿੰਘ ਦੇ ਸਪੁੱਤਰ ਦੇ ਵਿਆਹ ਦਾ ਪਤਾ ਲੱਗਾ, ਜਿਸ ਵਿੱਚ ਕਾਫ਼ੀ ਸਿੰਘ-ਸਿੰਘਣੀਆਂ ਨੇ ਸ਼ਾਮੂਲੀਅਤ ਕੀਤੀ ਹੋਈ ਸੀ।
ਜਾਫਰ ਬੇਗ ਨੇ ਆਪਣੀ ਹਾਰੀ ਹੋਈ ਫੌਜ ਨੂੰ ਨਾਲ ਲੈ ਕੇ ਚਵਿੰਡੇ ਪਿੰਡ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ। ਸਿੰਘਾਂ ਨੂੰ ਵੀ ਇਸਦੀ ਖ਼ਬਰ ਮਿਲ ਗਈ ਪਰ ਉਹ ਅਨੰਦ ਕਾਰਜ ਦੀ ਮਰਿਯਾਦਾ ਨਿਰਵਿਘਨ ਨਿਭਾਉਂਦੇ ਰਹੇ। ਪ੍ਰਸ਼ਾਦਾ ਪਾਣੀ ਛਕ ਕੇ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਖਾਲਸਾ ਘੋੜਿਆਂ ਤੇ ਸਵਾਰ ਹੋਇਆ ਤੇ ਫੌਜ ਦੇ ਘੇਰੇ ਉੱਤੇ ਇਕ ਪਾਸੇ ਹਮਲਾ ਕਰ ਕੇ ਬਹੁਤਿਆਂ ਨੂੰ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰ ਚੀਰਦਾ ਹੋਇਆ ਨਿਕਲ ਗਿਆ।
ਪਹਿਲਾਂ ਨੌਸ਼ਹਿਰੇ 'ਚ ਤੇ ਹੁਣ ਇੱਥੇ ਵੀ ਸਿੰਘ ਕਾਬੂ ਨਾ ਆਏ ਤਾਂ ਜਾਫਰ ਬੇਗ ਬਹੁਤ ਕਲ਼ਪਿਆ ਤੇ ਕਮੀਨਗੀ 'ਤੇ ਉੱਤਰ ਆਇਆ। ਉਹ ਵਿਆਹ ਵਾਲੇ ਘਰ 'ਚ ਬੀਬੀਆਂ ਉੱਤੇ ਹਮਲਾ ਕਰਨ ਲਈ ਪਿੰਡ 'ਚ ਜਾ ਵੜਿਆ। ਘਰ ਵਿੱਚ 20 ਸਿੰਘਣੀਆਂ ਸਨ।
ਇੱਥੇ ਜਾਫਰ ਬੇਗ ਨਾਲ ਉਹ ਹੋਈ ਜੋ ਪਹਿਲੀਆਂ ਦੋ ਹਾਰਾਂ ਵਿੱਚ ਵੀ ਨਾ ਹੋਈ ਸੀ। ਉਸ ਦੇ ਪਿੰਡ ਵਿੱਚ ਆ ਵੜਨ ਦੀ ਖ਼ਬਰ ਸੁਣਦਿਆਂ ਹੀ ਬੀਬੀਆਂ ਨੇ ਘਰ ਵਿੱਚ ਕਿਲੇ ਵਰਗੀ ਮੋਰਚੇਬੰਦੀ ਕਰ ਲਈ। ਘਰ ਦਾ ਦਰਵਾਜ਼ਾ ਢੋ ਕੇ ਦੋ ਸ਼ੀਂਹਣੀਆਂ ਉਸਦੇ ਕੋਲ ਖੜ੍ਹ ਗਈਆਂ। ਦੋ ਇਸ ਦੇਖ-ਰੇਖ 'ਚ ਲੱਗ ਗਈਆਂ ਕਿ ਕਿਤੋਂ ਵੈਰੀ ਰਾਹ ਬਣਾ ਕੇ ਅੰਦਰ ਨਾ ਆ ਵੜੇ, ਦੋ ਜਣੀਆਂ ਲੋੜ ਅਨੁਸਾਰ ਸਭ ਨੂੰ ਚੀਜ਼ਾਂ ਪਹੁੰਚਾਣ ਲਈ ਖੜੀਆਂ ਕੀਤੀਆਂ ਗਈਆਂ ਤੇ 14 ਜਣੀਆਂ ਬੰਦੂਕਾਂ ਤੇ ਤੀਰ ਕਮਾਨ ਸਾਂਭ ਕੇ ਵੈਰੀ ਦੀ ਉਡੀਕ ਕਰਨ ਲੱਗੀਆਂ।
ਇਸ ਅਨੋਖੀ ਲੜਾਈ ਦੇ ਸ਼ੁਰੂ ਹੋਣ ਦਾ ਛਿਣ ਆ ਗਿਆ। ਫ਼ੌਜਦਾਰ ਜਾਫਰ ਬੇਗ ਨੇ ਆਪਣੀ ਪਹਿਲੀ ਫ਼ੌਜੀ ਟੁਕੜੀ ਨੂੰ ਅੱਗੇ ਵਧਣ ਦਾ ਇਸ਼ਾਰਾ ਕੀਤਾ ਹੀ ਸੀ ਕਿ ਅੱਗਿਓਂ ਗੋਲ਼ੀਆਂ ਤੇ ਤੀਰਾਂ ਦਾ ਮੀਂਹ ਵਰ੍ਹਨ ਲੱਗਾ। ਬਿਲਕੁਲ ਨਿਸ਼ਾਨੇ 'ਤੇ ਲੱਗਦੀਆਂ ਗੋਲ਼ੀਆਂ ਤੇ ਤੀਰਾਂ ਨੇ ਫੌਜ ਬੌਂਦਲਾ ਦਿੱਤੀ।
ਜਾਫਰ ਬੇਗ ਨੂੰ ਅਜਿਹੇ ਟਕਰਾਅ ਦਾ ਬਿਲਕੁਲ ਵੀ ਅੰਦਾਜ਼ਾ ਨਾ ਸੀ। ਫੌਜ ਦੀ ਅੱਗੇ ਵਧਣ ਦੀ ਰਫ਼ਤਾਰ ਮੱਧਮ ਪੈ ਗਈ। ਬੀਬੀਆਂ ਕੋਲ਼ ਜਿੰਨਾਂ ਕੁ ਗੋਲੀ-ਸਿੱਕਾ ਸੀ ਉਨ੍ਹਾਂ ਸਾਰਾ ਚਲਾ ਦਿੱਤਾ ਤੇ ਇਹ ਮੁੱਕਣ ਤੋਂ ਬਾਅਦ ਤੀਰਾਂ ਦੀ ਵਾਛੜ ਜਾਰੀ ਰਹੀ।
ਜਾਫਰ ਬੇਗ ਹੰਭਲਾ ਮਾਰ ਕੇ ੫੦ ਸਿਪਾਹੀਆਂ ਦੀ ਟੁਕੜੀ ਲੈ ਕੇ ਘਰ ਦੀਆਂ ਕੰਧਾਂ ਕੋਲ ਆ ਪਹੁੰਚਿਆ। ਇਹ ਦੇਖ ਬੀਬੀਆਂ ਨੇ ਕਿਰਪਾਨਾਂ ਧੂਹ ਲਈਆਂ। ਆਹਮੋਂ-ਸਾਹਮਣੇ ਹੁੰਦੀ ਇਸ ਲੜਾਈ 'ਚ ਬੀਬੀਆਂ ਵੱਲੋਂ ਬਿਜਲੀ ਵਾਂਗ ਚਲਦੀ ਕਿਰਪਾਨ ਨੂੰ ਦੇਖ ਵੈਰੀ ਦਾ ਦਿਲ ਬਹਿ ਗਿਆ ਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜਿੱਤ ਕੇ ਤੇ ਬਚ ਕੇ ਨਿਕਲਣਾ ਮੁਸ਼ਕਲ ਜਾਪਣ ਲੱਗਾ।
ਇਸ ਭੇੜ ਵਿੱਚ ਬੀਬੀ ਧਰਮ ਕੌਰ ਜਿਸਦਾ 2 ਕੁ ਘੰਟੇ ਪਹਿਲਾਂ ਹੀ ਵਿਆਹ ਹੋਇਆ ਸੀ, ਦੀ ਤੇਗ ਤੁਰਕਾਂ ਨੂੰ ਕਾਲ ਰੂਪ ਹੀ ਜਾਪ ਰਹੀ ਸੀ। ਉਹ ਬਹੁਤਿਆਂ ਨੂੰ ਜ਼ਿੰਦਗੀ ਦੇ ਤਾਣੇ-ਬਾਣੇ ਤੋਂ ਮੁਕਤ ਕਰਦੀ ਹੋਈ, ਲੜਦੀ-ਲੜਦੀ ਬੁਰੀ ਤਰਾਂ ਜਖਮੀ ਹੋ ਗਈ ਤੇ ਜ਼ਮੀਨ ਉੱਤੇ ਡਿਗ ਪਈ।
ਜਾਫਰ ਬੇਗ ਨੂੰ ਜਾਪਿਆ ਕਿ ਇਸ ਬੁਰੀ ਤਰਾਂ ਹੋਈ ਹਾਰ ਵਿੱਚ ਵੀ ਜੇ ਉਹ ਧਰਮ ਕੌਰ ਨੂੰ ਅਗਵਾ ਕਰ ਕੇ ਲੈ ਜਾਵੇ ਤਾਂ ਕੁੱਝ ਨਾ ਕੁੱਝ ਤਾਂ ਕਹਿਣ ਲਈ ਬਚ ਜਾਵੇਗਾ। ਅਜਿਹੀ ਮਨਸ਼ਾ ਨਾਲ ਉਸ ਨੇ ਬੀਬੀ ਧਰਮ ਕੌਰ ਵੱਲ ਹੱਥ ਵਧਾਇਆ। ਜਾਫਰ ਬੇਗ ਦਾ ਆਪਣੇ ਵੱਲ ਆਉਂਦਾ ਹੱਥ ਦੇਖ ਡਿਗੀ ਪਈ ਧਰਮ ਕੌਰ ਨੇ ਅਸਮਾਨੀ ਬਿਜਲੀ ਦੀ ਤੇਜ਼ੀ ਨਾਲ ਆਪਣੀ ਤੇਗ ਦਾ ਵਾਰ ਕੀਤਾ ਤੇ ਜਾਫਰ ਬੇਗ ਦੀ ਬਾਂਹ ਵੱਢ ਦਿੱਤੀ। ਉਹ ਬੁਰੀ ਤਰਾਂ ਕੁਰਲਾ ਉੱਠਿਆ ਤੇ ਇਕਦੱਮ ਪਿੱਛੇ ਨੂੰ ਭੱਜਿਆ, ਮਗਰੇ ਫੌਜ ਭੱਜ ਨਿਕਲੀ।
ਇਸ ਬੇ-ਮੇਲ਼ ਲੜਾਈ 'ਚ ਬੱਸ ਚਾਰ ਬੀਬੀਆਂ ਜਖਮੀ ਹੋਈਆ ਤੇ ਇਨ੍ਹਾਂ ਬਹਾਦਰ ਕੌਰਾਂ ਨੇ ਦੁਨੀਆਂ ਨੂੰ ਦੱਸ ਦਿੱਤਾ ਕਿ ਕਿਵੇਂ ਦਸਮ ਪਿਤਾ ਦਾ ਖੰਡੇ-ਬਾਟੇ ਦਾ ਅੰਮ੍ਰਿਤ ਚਿੜੀਆਂ ਵਿੱਚ ਬਾਜ ਨੂੰ ਝਪੱਟਣ ਦੀ ਤਾਕਤ ਭਰ ਦਿੰਦਾ ਹੈ।`,
    artist: "Parm Singh",
    medium: "Oil Painting",
  },
  "10-bhai-mani-singh.jpg": {
    titlePa: "ਭਾਈ ਮਨੀ ਸਿੰਘ ਸ਼ਹਾਦਤ",
    descriptionPa: `ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਤੇ ਮਾਤਾ ਮਧਰੀ ਬਾਈ ਜੀ ਦੇ ਘਰ 1644ਈ. ਨੂੰ ਪਿੰਡ ਅਲੀਪੁਰ (ਹੁਣਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ। ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਦੇ ਬਾਰਾਂ ਸਪੁੱਤਰ ਸਨ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਭਾਈ ਦਿਆਲਾ ਜੀ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀਨਾਲ ਚਾਂਦਨੀ ਚੌਂਕ ਦਿੱਲੀ ਵਿਖੇ ਸ਼ਹੀਦ ਹੋਏ ਸਨ।
ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਵਿਆਹ ਬੀਬੀ ਸੀਤੋ ਜੀ ਨਾਲ ਹੋਇਆ, ਜਿਨ੍ਹਾ ਦੀ ਕੁੱਖ ਤੋਂ ਪੰਜ ਸਪੁੱਤਰਾਂ ਉਦੈ ਸਿੰਘ, ਅਜਬ ਸਿੰਘ ਅਜਾਇਬ ਸਿੰਘ, ਅਨਕ ਸਿੰਘ, ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੇ ਸਪੁੱਤਰ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਕਿਲਾ ਲੋਹਗੜ੍ਹ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਸਮੇਂ ਨਾਗਣੀ ਬਰਛੇ ਨਾਲ ਹਾਥੀ ਦਾ ਸਿਰ ਵਿੰਨਿਆ ਸੀ।
ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਤੇਰਾਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਕੀਰਤਪਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ ਸਨ। ਆਪ ਰੋਜ਼ਾਨਾ ਲੰਗਰ ਵਿੱਚ ਸੇਵਾ ਕਰਦੇ ਅਤੇ ਭਜਨ ਬੰਦਗੀ 'ਚ ਲੀਨ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਵੀ ਰਹੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਗੁਰਮਤਿ ਦੇ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਲਈ ਦਿੱਲੀ ਵੀ ਗਏ।
ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੇ ਸਮੇਂ ਆਪ ਅਨੇਕ ਸੇਵਾਵਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹੇ ਸਨ। ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਗੁਰਿਆਈ ਕਾਲ ਤੱਕ ਆਪ ਜੀ ਯੁੱਧਕਲਾ, ਗੁਰਬਾਣੀ ਦੀਆਂ ਪੋਥੀਆਂ ਲਿਖਣ, ਕਥਾ ਕਰਨ ਆਦਿ ਵਿੱਚ ਪ੍ਰਬੀਨਤਾ ਹਾਸਿਲ ਕਰ ਚੁੱਕੇ ਸਨ। ਉਨ੍ਹਾਂ ਦੇ ਨੇਕ-ਮਿੱਠ ਬੋਲੜੇ ਸੁਭਾਅ, ਆਗਿਆਕਾਰੀ ਭਾਵਨਾ, ਸਿੱਖੀ ਸਿਦਕ ਵਿੱਚ ਨਿਸ਼ਠਤਾ ਆਦਿ ਗੁਣਾ ਕਰਕੇ ਗੁਰ-ਦਰਬਾਰ ਵਿੱਚ ਹਰ ਕੋਈ ਬਹੁਤ ਸਤਿਕਾਰ ਕਰਦਾ ਸੀ।
ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਸਵੇਂ ਪਾਤਸ਼ਾਹ ਦੇ ਸਮੇਂ ਮੁਖੀ ਸਿੱਖਾਂ ਵਿੱਚੋਂ ਸਨ। ਆਪ ਗੁਰੂ ਸਾਹਿਬ ਨਾਲ ਭੰਗਾਣੀ, ਨਦੌਣ, ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦੀਆਂ ਜੰਗਾਂ ਸਮੇਂ ਬਹਾਦਰੀ ਨਾਲ ਲੜੇ। ਆਪ ਦੀ ਬਹਾਦਰੀ-ਵਿਦਵਤਾ ਗੁਣਾਂ ਕਰਕੇ ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਆਪ ਨੂੰ 'ਦੀਵਾਨ' ਦੀ ਉਪਾਧੀ ਨਾਲ ਨਿਵਾਜਿਆ। ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਸਮੇਂ ਆਪ ਨੇ ਆਪਣੇ ਪੰਜਾਂ ਸਪੁੱਤਰਾਂ ਸਮੇਤ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੀ ਸੰਗਤ ਵੱਲੋਂ ਬੇਨਤੀ ਕਰਨ 'ਤੇ ਆਪ ਜੀ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦਾ ਗ੍ਰੰਥੀ ਅਤੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦਾ ਜਥੇਦਾਰ ਨਿਯੁਕਤ ਕਰਕੇ ਭੇਜਿਆ।
ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਦੀ ਸ਼ਹੀਦੀ ਉਪਰੰਤ ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕੀਤਾ। ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟਾਉਣ ਦਾ ਤਹੱਈਆ ਕੀਤਾ। ਹਕੂਮਤ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੀਵਾਲੀ-ਵੈਸਾਖੀ ਇਕੱਠਾਂ 'ਤੇ ਪੂਰਨ ਪਾਬੰਦੀ ਲਾ ਦਿੱਤੀ। ਖ਼ਾਲਸਾ ਜੰਗਲ, ਬੇਲਿਆਂ, ਪਹਾੜਾਂ 'ਚ ਪਨਾਹ ਲਈ ਬੈਠਾ ਸੀ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਖ਼ਾਲਸੇ ਦੀ ਤਾਕਤ ਨੂੰ ਇਕੱਤਰ ਕਰਨ ਅਤੇ ਭਵਿੱਖਮੁਖੀ ਯੋਜਨਾਵਾਂ ਨੂੰ ਉਲੀਕਣ ਲਈ ਲਾਹੌਰ ਦੇ ਸੂਬੇ ਕੋਲੋਂ ਦੀਵਾਲੀ ਮੌਕੇ ਅੰਮ੍ਰਿਤਸਰ ਇਕੱਠ ਕਰਨ ਦੀ ਆਗਿਆ ਮੰਗੀ।
ਲਾਹੌਰ ਦਰਬਾਰ ਨੇ ਪੰਜ ਹਜ਼ਾਰ ਕਰ (ਟੈਕਸ) ਦੇਣ ਦੀ ਸ਼ਰਤ 'ਤੇ ਮਨਜ਼ੂਰੀ ਦਿੱਤੀ। ਹਕੂਮਤ ਦੀ ਮਨਸ਼ਾ ਸੀ ਕਿ ਜਦੋਂ ਸਿੱਖ ਇਕੱਤਰ ਹੋਣ ਤਾਂ ਉਨ੍ਹਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕੀਤਾ ਜਾਵੇ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਹਕੂਮਤ ਦੇ ਇਰਾਦਿਆ ਨੂੰ ਭਾਂਪਦਿਆ ਸਿੱਖਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਨਾ ਆਉਣ ਦੇ ਸੁਨੇਹੇ ਭੇਜ ਦਿੱਤੇ।
ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਦੀਵਾਲੀ ਉਪਰੰਤ ਜਦੋਂ ਕਰ ਮੰਗਿਆ ਤਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਕਰ ਦੇਣ ਤੋਂ ਸਪੱਸ਼ਟ ਨਾਂਹ ਕਰ ਦਿੱਤੀ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਲਿਜਾਇਆ ਗਿਆ, ਜਿਥੇ ਉਨ੍ਹਾਂ ਨੂੰ ਧਰਮ ਬਦਲਣ ਦੇ ਅਨੇਕ ਲਾਲਚ ਦਿੱਤੇ ਗਏ, ਪਰ ਭਾਈ ਸਾਹਿਬ ਗੁਰੂ ਭਾਣੇ ਵਿੱਚ ਅਡੋਲ ਰਹੇ। ਅੰਤ ਜਲਾਦਾਂ ਨੇ 25 ਹਾੜ 1734ਈ. ਨੂੰ ਉਨ੍ਹਾਂ ਦਾ ਬੰਦ-ਬੰਦ ਕੱਟ ਕੇ ਨਖ਼ਾਸ ਚੌਂਕ ਲਾਹੌਰ ਵਿਖੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ।
ਇਸ ਤਰ੍ਹਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਖ਼ਸੀਅਤ ਸਿਦਕਵਾਨ ਗੁਰਸਿੱਖ, ਪ੍ਰਚਾਰਕ ਅਤੇ ਯੁੱਧ ਕਲਾ ਵਿੱਚ ਨਿਪੁੰਨ ਵਜੋਂ ਉਭਰ ਕੇ ਸਾਹਮਣੇ ਆਉਂਦੀ ਹੈ। ਆਪ ਨੇ ਕਥਾ ਵਾਰਤਾ ਰਾਹੀਂ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਅਤੇ ਪਰੰਪਰਾਵਾਂ ਨੂੰ ਸਿੱਖ ਜਗਤ ਅੰਦਰ ਦ੍ਰਿੜ ਕਰਵਾਇਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ ਨੇ ਜਿਥੇ ਸਿੱਖ ਕੌਮ ਅੰਦਰ ਜੋਸ਼-ਜ਼ਜਬਾ ਭਰਿਆ ਉਥੇ ਮੁਗਲ ਹਕੂਮਤ ਵਿਰੁੱਧ ਸਿੱਖ ਸੰਘਰਸ਼ ਨੂੰ ਹੋਰ ਪ੍ਰਚੰਡ ਕੀਤਾ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },
  "11-bhai-garja-singh-bota-singh.jpg": {
    titlePa: "ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਬੋਤਾ ਸਿੰਘ",
    descriptionPa: `ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਜੀ ਮਾਝੇ ਇਲਾਕੇ ਦੇ ਭੜਾਣੇ (ਭਢਾਣੇ) ਨਗਰ ਦੇ ਵਸਨੀਕ ਸੂਰਬੀਰ ਯੋਧੇ ਸਨ। ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਰੰਗਰੇਟੇ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਕਿਸਾਨ ਪਰਿਵਾਰ ਨਾਲ ਸੰਬੰਧਿਤ ਸਨ। ਜਿਸ ਸਮੇਂ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਬਣਿਆ ਤਾਂ ਉਸ ਨੇ ਸਿੰਘਾਂ ਤੇ ਕਰੜਾਈ ਵਰਤੀ। ਸਿੰਘਾਂ ਦੇ ਸਿਰਾਂ ਦੇ ਮੁੱਲ ਰੱਖ ਦਿੱਤੇ ਗਏ। ਸਿੰਘਾਂ ਨੇ ਜੰਗਲ ਬੇਲਿਆਂ ਨੂੰ ਆਪਣੀ ਠਾਹਰ ਬਣਾਇਆ ਤੇ ਬਹੁਤੇ ਸਿੰਘ ਸਤਲੁਜ ਤੋਂ ਪਾਰ ਨਿਕਲ ਗਏ।
ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਮਾਝੇ ਇਲਾਕੇ ਵਿੱਚ ਹੀ ਰਹੇ ਤੇ ਹੋਰ ਸਿੰਘਾਂ ਵਾਂਗ ਲੁਕ-ਛਿਪ ਕੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਤੇ ਸ੍ਰੀ ਤਰਨ ਤਾਰਨ ਸਾਹਿਬ ਦੇ ਦਰਸ਼ਨ ਇਸ਼ਨਾਨ ਕਰ ਆਉਂਦੇ ਸਨ। ਇਸੇ ਤਰ੍ਹਾਂ ਇੱਕ ਦਿਨ ਦੋਵੇਂ ਸਿੰਘ ਇਸ਼ਨਾਨ ਕਰਕੇ ਵਾਪਸ ਪਰਤ ਰਹੇ ਸਨ ਕਿ ਤਰਨ ਤਾਰਨ ਦੇ ਨਜ਼ਦੀਕ ਨੂਰਦੀਨ ਦੀ ਸਰਾਂ ਦੇ ਕੋਲ ਉਨ੍ਹਾਂ ਦੇ ਕੰਨੀ ਦੋ ਰਾਹੀਆਂ ਦੀ ਆਵਾਜ਼ ਪਈ ਜੋ ਆਪਸ ਵਿੱਚ ਗੱਲਬਾਤ ਕਰ ਰਹੇ ਸਨ।
ਦੋਵੇਂ ਰਾਹੀ ਜੋ ਗੱਲਬਾਤ ਕਰ ਰਹੇ ਸਨ ਉਨ੍ਹਾਂ 'ਚੋਂ ਇੱਕ ਬੋਲਿਆ ਇਹ ਝਾੜੀਆਂ ਪਿੱਛੇ ਸਿੰਘ ਜਾਪਦੇ ਹਨ। ਦੂਜਾ ਬੋਲਿਆ ਨਹੀਂ ਉਹ ਸਿੰਘ ਨਹੀਂ ਹੋ ਸਕਦੇ ਕਿਉਂਕਿ ਸਿੰਘ ਲੁਕਦੇ ਨਹੀਂ। ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੇ ਇਹ ਢੰਡੋਰਾ ਵੀ ਪਿਟਵਾਇਆ ਹੈ ਕਿ ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟ ਗਿਆ ਹੈ। ਇਹ ਕੋਈ ਚੋਰ-ਉਚੱਕਾ ਜਾਂ ਕੋਈ ਕਾਇਰ ਹੋਵੇਗਾ।
ਉਨ੍ਹਾਂ ਰਾਹੀਆਂ ਦੀ ਬੋਲੀ ਨੇ ਸਿੰਘਾਂ ਦੇ ਮਨ ਤੇ ਗਹਿਰਾ ਅਸਰ ਕੀਤਾ। ਦੋਵੇਂ ਸਿੰਘਾਂ ਨੇ ਮਤਾ ਕੀਤਾ ਕਿ ਅਜਿਹੀ ਯੋਜਨਾ ਬਣਾਈ ਜਾਵੇ ਜਿਸ ਨਾਲ ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਨੂੰ ਕੰਨ ਹੋ ਜਾਣ ਕਿ ਖ਼ਾਲਸਾ ਅਜੇ ਖ਼ਤਮ ਨਹੀਂ ਹੋਇਆ। ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਨੇ ਆਪਣੀਆਂ ਕਿਰਪਾਨਾਂ ਨਾਲ ਬੇਰੀ ਦੇ ਦੋ ਮਜਬੂਤ ਡੰਡੇ ਬਣਾ ਕੇ ਫੜ ਲਏ।
ਸਿੰਘਾਂ ਨੇ ਨੂਰਦੀਨ ਦੀ ਸਰਾਂ ਦੇ ਨਜ਼ਦੀਕ ਦਿੱਲੀ ਤੋਂ ਲਾਹੌਰ ਜਾਂਦੇ ਸ਼ਾਹੀ ਮਾਰਗ ਤੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੁੰਗੀ ਸਥਾਪਿਤ ਕਰਕੇ ਸੜਕ ਤੋਂ ਗੁਜ਼ਰਨ ਵਾਲਿਆਂ ਤੋਂ ਮਹਿਸੂਲ ਉਗਰਾਹੁਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ। ਗੱਡੇ ਨੂੰ ਇੱਕ ਆਨਾ ਅਤੇ ਖੋਤੇ ਨੂੰ ਇੱਕ ਪੈਸਾ ਮਹਿਸੂਸ ਲਾਇਆ ਗਿਆ। ਸੜਕ ਤੋਂ ਗੁਜ਼ਰਨ ਵਾਲੇ ਰਾਹੀ ਸਿੰਘਾਂ ਨੂੰ ਚੁੱਪ-ਚਾਪ ਮਹਿਸੂਲ ਦਿੰਦੇ ਤੇ ਅੱਗੇ ਵਧ ਜਾਂਦੇ। ਜੇਕਰ ਕੋਈ ਪੁੱਛਦਾ ਤਾਂ ਉਸ ਨੂੰ ਦੱਸਦੇ ਕਿ ਇਹ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੁੰਗੀ ਹੈ।
ਸਿੰਘਾਂ ਦਾ ਜਨਤਾ ਪਾਸੋਂ ਮਹਿਸੂਲ ਉਗਰਾਹੁਣ ਦਾ ਮਨਸੂਬਾ ਇਹ ਸੀ ਕਿ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੂੰ ਪਤਾ ਲੱਗ ਜਾਵੇ ਕਿ ਖ਼ਾਲਸਾ ਅਜੇ ਖ਼ਤਮ ਨਹੀਂ ਹੋਇਆ। ਪਰ ਕਿਸੇ ਵੀ ਰਾਹੀ ਨੇ ਸਿੰਘਾਂ ਦੀ ਇਸ ਗੱਲ ਨੂੰ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਕੋਲ ਨਾ ਪਹੁੰਚਾਇਆ। ਇਸੇ ਤਰ੍ਹਾਂ ਕਈ ਦਿਨ ਬਤੀਤ ਹੋ ਗਏ। ਮੁਗ਼ਲ ਹਕੂਮਤ ਵੱਲੋਂ ਕੋਈ ਹਿਲਜੁਲ ਨਾ ਹੋਈ ਤਾਂ ਸਿੰਘਾਂ ਨੇ ਇੱਕ ਰਾਹੀ ਹੱਥ ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਨੂੰ ਚਿੱਠੀ ਲਿਖ ਕੇ ਭੇਜੀ ਜਿਸ ਦੀ ਇਬਾਰਤ ਇਸ ਪ੍ਰਕਾਰ ਸੀ:
"ਚਿੱਠੀ ਲਿਖੈ ਯੌਂ ਸਿੰਘ ਬੋਤਾ। ਹਥ ਹੈ ਸੋਟਾ ਵਿਚ ਰਾਹ ਖੜੋਤਾ। ਆਨਾ ਲਾਯਾ ਗੱਡੇ ਨੂੰ ਪੈਸਾ ਲਾਯਾ ਖੋਤਾ। ਆਖੋ ਭਾਬੀ ਖਾਨੋਂ ਨੂੰ ਯੌਂ ਆਖੈ ਸਿੰਘ ਬੋਤਾ।"
ਜਿਸ ਸਮੇਂ ਰਾਹਗੀਰ ਨੇ ਚਿੱਠੀ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਪਾਸ ਪਹੁੰਚਾਈ ਤਾਂ ਚਿੱਠੀ ਪੜ੍ਹ ਕੇ ਉਹ ਅੱਗ ਬਬੂਲਾ ਹੋ ਗਿਆ। ਉਸ ਨੇ ਆਪਣੇ ਫ਼ੌਜਦਾਰ ਜਲਾਲੁੱਦੀਨ ਨਾਲ ਸੌ ਤਿਆਰ ਬਰ ਤਿਆਰ ਸਿਪਾਹੀ ਭੇਜ ਕੇ ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਤੇ ਚੜ੍ਹਾਈ ਕਰਨ ਦਾ ਹੁਕਮ ਜਾਰੀ ਕੀਤਾ।
ਜਲਾਲੁੱਦੀਨ ਸਿਪਾਹੀਆਂ ਸਮੇਤ ਨੂਰਦੀਨ ਦੀ ਸਰਾਂ ਕੋਲ ਪਹੁੰਚ ਕੇ ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਨੂੰ ਆ ਘੇਰਾ ਪਾਇਆ। ਸਿੰਘ ਪਹਿਲਾਂ ਹੀ ਇਹ ਚਾਹੁੰਦੇ ਸਨ ਕਿ ਸਾਡੀ ਹੋਂਦ ਦਾ ਮੁਗ਼ਲਾਂ ਨੂੰ ਪਤਾ ਲੱਗੇ। ਦੋਵੇਂ ਸਿੰਘ ਗੁਰੂ ਦੇ ਆਸਰੇ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਹੋ ਕੇ ਮੁਗ਼ਲਾਂ ਅੱਗੇ ਡਟ ਗਏ।
ਦੋਵੇਂ ਸਿੰਘਾਂ ਨੇ ਪਿੱਠ ਨਾਲ ਪਿੱਠ ਜੋੜ ਲਈ ਤੇ ਗੁਰੂ ਸਾਹਿਬ ਦਾ ਧਿਆਨ ਧਰ ਕੇ ਰਣਤੱਤੇ ਵਿੱਚ ਜੂਝ ਪਏ। ਮੁਗ਼ਲਾਂ ਨੇ ਤਲਵਾਰਾਂ ਤੇ ਤੀਰਾਂ ਨਾਲ ਸਿੰਘਾਂ ਤੇ ਹੱਲਾ ਕੀਤਾ ਪਰ ਸਿੰਘ ਹਰ ਹੱਲੇ ਦਾ ਵਾਰ ਸੰਭਾਲਦੇ ਰਹੇ। ਫ਼ੌਜਦਾਰ ਨੇ ਵੇਖਿਆ ਕਿ ਸਿੰਘ ਸਾਡੇ ਕਾਬੂ ਵਿੱਚ ਨਹੀਂ ਆ ਰਹੇ।
ਆਖ਼ਰ ਜਲਾਲੁੱਦੀਨ ਨੇ ਬੰਦੂਕਾਂ ਦੀਆਂ ਗੋਲੀਆਂ ਦਾਗਣ ਦਾ ਹੁਕਮ ਕੀਤਾ। ਸਿਪਾਹੀਆਂ ਨੇ ਗੋਲੀਆਂ ਦਾਗਣੀਆਂ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀਆਂ ਜਿਸ ਨਾਲ ਸਿੰਘਾਂ ਨੂੰ ਗੰਭੀਰ ਫੱਟ ਲੱਗੇ ਪਰ ਉਹ ਜਿੰਨੀ ਜੋਗੇ ਸਨ ਹਿੰਮਤ ਰੱਖ ਕੇ ਰਣਤੱਤੇ ਵਿੱਚ ਡਟੇ ਰਹੇ। ਮੁਗ਼ਲਾਂ ਦੀਆਂ ਗੋਲੀਆਂ ਨਾਲ ਆਖ਼ਰ ਸਿੰਘ ਨਿਢਾਲ ਹੋ ਕੇ ਧਰਤੀ 'ਤੇ ਡਿੱਗ ਗਏ।
ਇਸ ਪ੍ਰਕਾਰ ਰਾਹੀਆਂ ਦੀ ਬੋਲੀ 'ਤੇ ਸਿੰਘਾਂ ਨੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੁੰਗੀ ਸਥਾਪਿਤ ਕਰਕੇ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੂੰ ਦੱਸ ਦਿੱਤਾ ਕਿ ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਦਾ ਥਾਪਿਆ ਹੋਇਆ ਖ਼ਾਲਸਾ ਸਦੀਵ ਤੇ ਅਮਰ ਹੈ। ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ 18ਵੀਂ ਸਦੀ ਦੀ ਇੱਕ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ ਸੀ ਜਿਸ ਨੇ ਸਿੱਖ ਸੰਘਰਸ਼ ਨੂੰ ਬਲ ਦਿੱਤਾ। ਇਹ ਘਟਨਾ ਸੰਨ 1739 ਈ. ਦੀ ਮੰਨੀ ਜਾਂਦੀ ਹੈ।`,
    artist: "ਮਨਿੰਦਰ ਸਿੰਘ",
    medium: "Oil Painting Replica",
  },

  "12-chhota-ghallughara.jpg": {
    titlePa: "ਛੋਟਾ ਘੱਲੂਘਾਰਾ",
    descriptionPa: `‘ਘੱਲੂਘਾਰਾ’ ਸ਼ਬਦ ਦਾ ਅਰਥ ਸਰਬਨਾਸ਼, ਤਬਾਹੀ ਜਾਂ ਬਰਬਾਦੀ ਆਦਿ ਹੈ—ਉਹ ਤਬਾਹੀ ਜਾਂ ਬਰਬਾਦੀ ਜੋ ਕਿਸੇ ਹਾਕਮ ਜਾਂ ਤਾਨਾਸ਼ਾਹ ਵੱਲੋਂ ਕੀਤੀ ਗਈ ਹੋਵੇ। ਅੰਗਰੇਜ਼ੀ ਭਾਸ਼ਾ ਵਿੱਚ ‘ਘੱਲੂਘਾਰਾ’ ਲਈ Holocaust ਸ਼ਬਦ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਜਿਸ ਦਾ ਅਰਥ ਅੱਗ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਤਬਾਹੀ ਹੈ।

18ਵੀਂ ਸਦੀ ਦੌਰਾਨ ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਸਿੱਖਾਂ ਦੀ ਨਸ਼ਲਕੁਸ਼ੀ ਕਰਨ ਲਈ ਦੋ ਘੱਲੂਘਾਰਿਆਂ ਨੂੰ ਅੰਜ਼ਾਮ ਦਿੱਤਾ ਸੀ। ਪਹਿਲਾ ਘੱਲੂਘਾਰਾ ਮਈ 1746 ਈ. ਵਿੱਚ ਕਾਹਨੂੰਵਾਨ ਅਤੇ ਦੂਜਾ ਘੱਲੂਘਾਰਾ 1762 ਈ. ਵਿੱਚ ਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ ‘ਤੇ ਵਾਪਰਿਆ। ਦੂਜੇ ਘੱਲੂਘਾਰੇ ਦੇ ਮੁਕਾਬਲੇ ਪਹਿਲੇ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਘੱਟ ਹੋਇਆ ਸੀ। ਇਸ ਲਈ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇਨ੍ਹਾਂ ਦੋ ਸਾਕਿਆਂ ਨੂੰ ‘ਛੋਟਾ ਘੱਲੂਘਾਰਾ’ ਅਤੇ ‘ਵੱਡਾ ਘੱਲੂਘਾਰਾ’ ਦੇ ਨਾਮ ਨਾਲ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

ਜ਼ਕਰੀਆ ਖਾਂ ਦੀ ਮੌਤ ਉਪਰੰਤ ਉਸ ਦਾ ਪੁੱਤਰ ਯਹੀਆ ਖਾਂ ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਬਣਿਆ। ਉਹ ਵੀ ਆਪਣੇ ਪਿਤਾ ਵਾਂਗ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ ਦੁਸ਼ਮਣ ਸੀ ਅਤੇ ਸਿੱਖਾਂ ਦਾ ਨਾਮੋ-ਨਿਸ਼ਾਨ ਪੰਜਾਬ ਦੀ ਸਰ-ਜ਼ਮੀਨ ਤੋਂ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ। ਯਹੀਆ ਖਾਂ ਨੇ ਲਖਪਤਿ ਰਾਇ ਨੂੰ ਦੀਵਾਨ ਨਿਯੁਕਤ ਕੀਤਾ ਸੀ। ਲਖਪਤਿ ਰਾਇ ਦਾ ਭਰਾ ਜਸਪਤਿ ਰਾਇ ਐਮਨਾਬਾਦ ਦਾ ਫੌਜਦਾਰ ਸੀ।

ਸਿੱਖ ਹਾਕਮ ਧਿਰ ਦੀਆਂ ਸਖ਼ਤੀਆਂ ਕਾਰਨ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿੱਚ ਜਗ੍ਹਾ-ਜਗ੍ਹਾ ਭਟਕਦਿਆਂ ਹਕੂਮਤ ਨਾਲ ਜੂਝ ਰਹੇ ਸਨ। ਸਿੱਖਾਂ ਦਾ ਇਕ ਵੱਡਾ ਜਥਾ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਮਾੜੀ ਕੰਬੋਕੀ ਆਦਿ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਐਮਨਾਬਾਦ ਦੇ ਆਸ-ਪਾਸ ਜੰਗਲ ‘ਚ ਵਿਚਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਜਥੇ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਪਾਵਨ ਅਸਥਾਨ ਗੁ. ਰੋੜੀ ਸਾਹਿਬ ਵਿਖੇ ਠਹਿਰਾਉ ਕੀਤਾ।

ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਨੇ ਜਸਪਤਿ ਰਾਇ ਨੂੰ ਸਿੱਖਾਂ ‘ਤੇ ਹਮਲਾ ਕਰਨ ਲਈ ਸੁਨੇਹਾ ਭੇਜਿਆ। ਸਿੱਖਾਂ ਤੇ ਜਸਪਤਿ ਰਾਇ ਦੀਆਂ ਫੌਜਾਂ ਵਿਚਾਲੇ ਹੋਈ ਲੜਾਈ ਵਿੱਚ ਭਾਈ ਨਿਬਾਹੂ ਸਿੰਘ ਨੇ ਜਸਪਤਿ ਰਾਇ ਦਾ ਸਿਰ ਵੱਢ ਕੇ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ। ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਆਪਣੇ ਭਰਾ ਦੀ ਮੌਤ ਦੀ ਖ਼ਬਰ ਸੁਣ ਕੇ ਆਪੇ ਤੋਂ ਬਾਹਰ ਹੋ ਗਿਆ। ਉਸ ਨੇ ਯਹੀਆ ਖਾਂ ਦੇ ਭਰੇ ਦਰਬਾਰ ਵਿੱਚ ਪੱਗੜੀ ਉਤਾਰ ਕੇ ਸਹੁੰ ਖਾਧੀ ਕਿ “ਉਹ ਉਦੋਂ ਤੱਕ ਪੱਗੜੀ ਧਾਰਨ ਨਹੀਂ ਕਰੇਗਾ ਜਦੋਂ ਤੱਕ ਉਹ ਆਪਣੇ ਭਰਾ ਦੀ ਮੌਤ ਦਾ ਬਦਲਾ ਸਿੱਖਾਂ ਤੋਂ ਨਹੀਂ ਲੈ ਲੈਂਦਾ। ਸਿੱਖ ਧਰਮ ਇੱਕ ਖੱਤਰੀ ਨੇ ਸ਼ੁਰੂ ਕੀਤਾ ਸੀ, ਇਸ ਦਾ ਅੰਤ ਵੀ ਇਕ ਖੱਤਰੀ ਕਰੂਗਾ।” ਯਹੀਆ ਖਾਂ ਨੇ ਲਖਪਤਿ ਰਾਇ ਨੂੰ ਹਰ ਪ੍ਰਕਾਰ ਦੀ ਮਦਦ ਦੇਣ ਦਾ ਭਰੋਸਾ ਦਿੱਤਾ।

ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਨੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਲਾਹੌਰ ਦੇ ਵਸਨੀਕ ਸਿੱਖਾਂ ਨੂੰ ਸ਼ਹੀਦ ਕੀਤਾ। ਉਸ ਨੇ ਸਿੱਖ ਧਰਮ ਦੇ ਸਤਿਕਾਰਤ ਸ਼ਬਦ ਗੁਰ, ਗ੍ਰੰਥ ਆਦਿ ਸ਼ਬਦ ਬੋਲਣ ‘ਤੇ ਵੀ ਪਾਬੰਦੀ ਲਾ ਦਿੱਤੀ ਸੀ। ਗੁੜ ਨੂੰ ਰੋੜੀ ਜਾਂ ਭੇਲੀ ਅਤੇ ਗ੍ਰੰਥ ਨੂੰ ਪੋਥੀ ਕਹਿਣ ਦਾ ਹੁਕਮ ਜਾਰੀ ਕੀਤਾ ਗਿਆ ਸੀ। ਉਸ ਨੇ ਇਸ ਸਮੇਂ ਕਈ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਬੇਹੁਰਮਤੀ ਵੀ ਕੀਤੀ ਸੀ।

ਲਖਪਤਿ ਰਾਇ (ਲਿਖਤ ਵਿੱਚ ਕਈ ਥਾਵਾਂ ‘ਤੇ ਜਸਪਤਿ ਰਾਇ ਲਿਖਿਆ ਮਿਲਦਾ ਹੈ) ਸਿੱਖਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਲਈ ਜੰਗਲਾਂ ਵੱਲ ਵਧਿਆ। ਉਸ ਨੂੰ ਖ਼ਬਰ ਮਿਲੀ ਕਿ ਸਿੱਖ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਕਾਹਨੂੰਵਾਨ ਦੀ ਛੰਭ ਵਿੱਚ ਇਕੱਠੇ ਹੋਏ ਹਨ। ਸਿੱਖਾਂ ਦੀ ਗਿਣਤੀ ਬੀਬੀਆਂ, ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਸਮੇਤ 15–20 ਹਜ਼ਾਰ ਸੀ। ਕਾਹਨੂੰਵਾਨ ਦੇ ਸੰਘਣੇ ਜੰਗਲ ‘ਚ ਤੋਪਾਂ ਨਹੀਂ ਜਾ ਸਕਦੀਆਂ ਸਨ, ਇਸ ਲਈ ਮੁਗਲ ਫੌਜ ਨੇ ਪਹਿਲਾਂ ਰੁੱਖ-ਝਾੜੀਆਂ ਨੂੰ ਵੱਢ ਕੇ ਰਸਤਾ ਬਣਾਇਆ। ਲਖਪਤਿ ਰਾਇ ਦੇ ਹਮਲਿਆਂ ਦਾ ਸਿੱਖਾਂ ਨੇ ਬਰਾਬਰੀ ਦਾ ਜਵਾਬ ਦਿੱਤਾ।

ਮੁਗਲ ਫੌਜ ਨੇ ਤੋਪਾਂ ਅਤੇ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਫੌਜ ਦੀ ਸਹਾਇਤਾ ਨਾਲ ਸਿੱਖਾਂ ਨੂੰ ਪੜੋਲ ਅਤੇ ਕਠੂਆ ਦੇ ਇਲਾਕੇ ਵੱਲ ਧੱਕ ਦਿੱਤਾ ਸੀ। ਸਿੱਖਾਂ ਕੋਲ ਜਮ੍ਹਾਂ ਰਸਦ-ਪਾਣੀ ਵੀ ਖਤਮ ਹੋ ਰਿਹਾ ਸੀ। ਸਿੱਖਾਂ ਦੇ ਇਕ ਪਾਸੇ ਰਾਵੀ ਦਰਿਆ, ਇਕ ਪਾਸੇ ਉੱਚੇ ਪਹਾੜ ਅਤੇ ਇਕ ਪਾਸੇ ਮੈਦਾਨੀ ਇਲਾਕੇ ਵਿੱਚ ਮੁਗਲ ਫੌਜ ਦਾ ਲਸ਼ਕਰ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਵਿਚਾਰ ਕੀਤੀ ਕਿ ਜਿਹੜੇ ਸਿੱਖ ਪੈਦਲ ਹਨ ਉਹ ਪਹਾੜ ਚੜ੍ਹ ਜਾਣ, ਜੋ ਰਾਵੀ ਦਰਿਆ ਨੂੰ ਪਾਰ ਕਰ ਸਕਦੇ ਹਨ ਉਹ ਪਾਰ ਕਰ ਜਾਣ ਅਤੇ ਜੋ ਘੋੜਸਵਾਰ ਹਨ ਉਹ ਲਖਪਤਿ ਰਾਇ ਨਾਲ ਮੁਕਾਬਲਾ ਕਰਦੇ ਹੋਏ ਵੱਖ-ਵੱਖ ਮੈਦਾਨੀ ਇਲਾਕਿਆਂ ਨੂੰ ਨਿਕਲ ਜਾਣ।

ਲਾਹੌਰ ਹਕੂਮਤ ਦਾ ਸੁਨੇਹਾ ਮਿਲਣ ‘ਤੇ ਪਹਾੜੀਆਂ ਨੇ ਵੀ ਸਿੱਖਾਂ ਨਾਲ ਭਲੀ ਨਾ ਕੀਤੀ। ਜੋ ਸਿੱਖ ਪਹਾੜੀਆਂ ਹੱਥੋਂ ਬਚ ਨਿਕਲੇ ਉਹ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਦੇ ਸਥਾਨ ‘ਤੇ ਸਿੱਖ ਜਥਿਆਂ ਨਾਲ ਜਾ ਰਲੇ ਸਨ। ਰਾਵੀ ਦਰਿਆ ਦਾ ਤੇਜ਼ ਵਹਾਅ ਹੋਣ ਕਰਕੇ ਪਾਰ ਨਿਕਲਣਾ ਔਖਾ ਸੀ। ਭਾਈ ਹਰਿਦਿਆਲ ਸਿੰਘ ਡੱਲੇਵਾਲ ਅਤੇ ਉਸ ਦਾ ਭਰਾ ਰਾਵੀ ਦਰਿਆ ਦੇ ਤੇਜ਼ ਵਹਾਅ ਵਿੱਚ ਵਹਿ ਗਏ ਸਨ।

ਸਿੱਖ ਲਖਪਤਿ ਰਾਇ ਦੀ ਫੌਜ ਨਾਲ ਟਾਕਰਾ ਕਰਦੇ ਬਿਆਸ ਦਰਿਆ ਵੱਲ ਵੱਧਣ ਲੱਗੇ। ਸ੍ਰੀ ਹਰਿਗੋਬਿੰਦਪੁਰ ਸਾਹਿਬ ਦੇ ਪੱਤਣ ਤੋਂ ਬਿਆਸ ਦਰਿਆ ਪਾਰ ਕਰਦਿਆਂ ਸਿੰਘਾਂ ਦਾ ਟਾਕਰਾ ਅਦੀਨਾ ਬੇਗ ਨਾਲ ਹੋਇਆ। ਲਖਪਤਿ ਰਾਇ ਵੀ ਸਿੱਖਾਂ ਦਾ ਪਿੱਛਾ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਅਦੀਨਾ ਬੇਗ ਨਾਲ ਜੂਝਦਿਆਂ ਮਾਲਵੇ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਵਿੱਚ ਖਿਲਰ ਗਏ ਸਨ। ਮਾਲਵੇ ਵਿੱਚ ਜ਼ਖਮੀ ਸਿੰਘਾਂ ਦੀ ਮਲਮ-ਪੱਟੀ ਕੀਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਸਿਹਤਯਾਬ ਹੋਏ ਸਨ।

ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦਾ ਸਾਕਾ ਫਰਵਰੀ ਤੋਂ ਮਈ 1746 ਤੱਕ ਵਾਪਰਿਆ ਸੀ। ਇਸ ਸਾਕੇ ਵਿੱਚ ਸੱਤ ਤੋਂ ਦਸ ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਦੀਆਂ ਸ਼ਹੀਦੀਆਂ ਹੋਈਆਂ। ਲਖਪਤਿ ਰਾਇ ਕਰੀਬ ਤਿੰਨ ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਨੂੰ ਬੰਦੀ ਬਣਾ ਕੇ ਲਾਹੌਰ ਲੈ ਗਿਆ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਨਖ਼ਾਸ ਚੌਂਕ ਵਿਖੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਲਖਪਤਿ ਰਾਇ ਦਾ ਪੁੱਤਰ ਹਰਭਜ ਰਾਇ, ਯਹੀਆ ਖਾਂ ਦਾ ਪੁੱਤਰ ਨਾਹਰ ਖਾਂ, ਫੌਜਦਾਰ ਕਰਮ ਬਖਸ਼ ਸਮੇਤ ਕਈ ਫੌਜਦਾਰ ਵੀ ਮਾਰੇ ਗਏ ਸਨ। ਖ਼ਾਲਸਾ ਪੰਥ ਹਰ ਸਾਲ 3 ਜੇਠ ਨੂੰ ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦੇ ਸ਼ਹੀਦ-ਸਿੰਘਾਂ ਨੂੰ ਯਾਦ ਕਰਦਾ ਹੈ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Canvas Print",
  },

  "13-bhai-taru-singh.jpg": {
    titlePa: "ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਸ਼ਹਾਦਤ",
    descriptionPa: `ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨਾਮ ਅਭਿਆਸੀ, ਪਰਉਪਕਾਰੀ ਅਤੇ ਆਦਰਸ਼ਵਾਦੀ ਜੀਵਨ-ਜਾਚ ਵਾਲੇ ਗੁਰਸਿੱਖ ਸਨ। ਆਪ ਦਾ ਜਨਮ ਭਾਈ ਜੋਧ ਸਿੰਘ ਦੇ ਗ੍ਰਿਹ 1720 ਈ. ਵਿੱਚ ਨਗਰ ਪੂਹਲਾ, ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ ਵਿਖੇ ਕਿਸਾਨੀ ਕਿੱਤੇ ਨਾਲ ਸਬੰਧ ਰੱਖਣ ਵਾਲੇ ਪਰਿਵਾਰ ‘ਚ ਹੋਇਆ।

ਮਾਤਾ ਜੀ ਨੇ ਆਪ ਨੂੰ ਬਚਪਨ ਤੋਂ ਹੀ ਗੁਰਬਾਣੀ ਅਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦੀ ਅਜਿਹੀ ਗੁੜ੍ਹਤੀ ਦਿੱਤੀ ਕਿ ਆਪ ਦੇ ਮਨ ਵਿੱਚ ਸਿੱਖੀ ਪ੍ਰਤੀ ਅਟੁੱਟ ਸ਼ਰਧਾ ਅਤੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨ ਦਾ ਚਾਉ ਪੈਦਾ ਹੋ ਗਿਆ। ਆਪ ਖੇਤੀਬਾੜੀ ਦਾ ਧੰਦਾ ਕਰਦੇ ਹੋਏ ਦਸਾਂ-ਨੂੰਹਾਂ ਦੀ ਕਿਰਤ ਕਮਾਈ ਵਿੱਚੋਂ ਲੋੜਵੰਦਾਂ ਦੀ ਮਦਦ ਕਰਦੇ ਅਤੇ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਰਹਿੰਦੇ ਸਨ।

ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਜਕਰੀਆਂ ਖਾਨ ਸਿੱਖਾਂ ‘ਤੇ ਬਹੁਤ ਜਾਨੀ ਜ਼ੁਲਮ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਕੁਝ ਸਮੇਂ ਲਈ ਜੰਗਲ-ਪਹਾੜਾਂ ਵੱਲ ਨਿਕਲ ਜਾਂਦੇ ਅਤੇ ਜਥੇਬੰਦਕ ਹੋ ਕੇ ਫਿਰ ਜ਼ੁਲਮੀ ਹਕੂਮਤ ਵਿਰੁੱਧ ਜੂਝਦੇ ਸਨ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦਾ ਨਗਰ ਲਾਹੌਰ-ਪੱਟੀ ਸੜਕ ‘ਤੇ ਸਥਿਤ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਆਉਂਦੇ-ਜਾਂਦੇ ਯਾਤਰੀ ਦੀ ਬਿਨਾ ਭੇਦਭਾਵ ਪ੍ਰਸ਼ਾਦੇ, ਜਲ-ਪਾਣੀ ਨਾਲ ਸੇਵਾ ਕਰਦੇ ਸਨ।

ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਹੁਰਮਤੀ ਕਰਨ ਵਾਲੇ ਮੱਸਾ ਰੰਘੜ ਨੂੰ ਜਦੋਂ ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਅਤੇ ਭਾਈ ਮਹਿਤਾਬ ਸਿੰਘ ਨੇ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ ਤਾਂ ਜ਼ਕਰੀਆਂ ਖਾਨ ਬਹੁਤ ਕ੍ਰੋਧਿਤ ਹੋਇਆ। ਜ਼ਾਬਰ ਹਕੂਮਤ ਨਾਲ ਜੂਝਣ ਵਾਲੇ ਸਿੰਘਾਂ ਦਾ ਅਉਣ-ਜਾਣ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਕੋਲ ਲੱਗਾ ਰਹਿੰਦਾ ਸੀ।

ਮਾਝੇ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਅਨੇਕ ਮੁਖ਼ਬਰ ਲਾਹੌਰ ਦਰਬਾਰ ਲਈ ਕੰਮ ਕਰਦੇ ਸਨ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਜੰਡਿਆਲਾ ਦੇ ਹਰਿਭਗਤ ਨਿਰੰਜਨੀਏ ਦੀ ਸੂਹ ‘ਤੇ (ਸਿੰਘਾਂ ਦੀ ਮਦਦ ਕਰਨ ਦੇ ਦੋਸ਼ਾਂ ਤਹਿਤ) ਮੋਮਨ ਖਾਂ ਨੇ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਜ਼ਕਰੀਆ ਖਾਨ ਦੀ ਕਚਹਿਰੀ ‘ਚ ਪੇਸ਼ ਕੀਤਾ।

ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਇਸਲਾਮ ਧਰਮ ਕਬੂਲਣ ਲਈ ਕਿਹਾ ਗਿਆ, ਅਨੇਕ ਲਾਲਚ-ਡਰਾਵੇ ਦਿੱਤੇ ਗਏ, ਪਰ ਆਪ ਆਪਣੇ ਅਕੀਦੇ ਅਤੇ ਗੁਰਮਤਿ ਆਦਰਸ਼ ਤੋਂ ਨਾ ਡੋਲੇ। ਆਪ ਜੀ ਨੇ ਸਿੱਖੀ ਕੇਸਾਂ-ਸੁਆਸਾਂ ਸੰਗ ਨਿਭਣ ਅਤੇ ਚੜਦੀ ਕਲਾ ਦੀ ਅਰਦਾਸ ਕੀਤੀ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸਿੱਖ ਧਰਮ ਪ੍ਰਤੀ ਦ੍ਰਿੜਤਾ ਨੂੰ ਦੇਖ ਕੇ ਕਾਜ਼ੀ ਨੇ ਭਾਈ ਸਾਹਿਬ ਦੇ ਕੇਸ ਕਤਲ ਕਰਨ ਦਾ ਫੁਰਮਾਨ ਜਾਰੀ ਕਰ ਦਿੱਤਾ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਪੱਸ਼ਟ ਕਹਿ ਦਿੱਤਾ ਕਿ ਉਹ ਕੇਸਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀਂ ਹੋਣ ਦੇਣਗੇ।

ਨਖ਼ਾਸ ਚੌਂਕ (ਲਾਹੌਰ) ਵਿਖੇ ਜ਼ਲਾਦ ਨੇ ਰੰਬੀ ਨਾਲ ਭਾਈ ਸਾਹਿਬ ਦੀ ਕੇਸਾਂ ਸਮੇਤ ਖੋਪਰੀ ਉਤਾਰ ਦਿੱਤੀ। ਭਾਈ ਸਾਹਿਬ ਵਾਹਿਗੁਰੂ ਦੇ ਰੰਗ ਵਿੱਚ ਅਡੋਲ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਸਨ।

ਵਾਹਿਗੁਰੂ ਦੀ ਰਜ਼ਾ ਐਸੀ ਹੋਈ ਕਿ ਜ਼ਕਰੀਆ ਖਾਨ ਨੂੰ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਪੈ ਗਿਆ। ਹਕੀਮਾਂ ਦੇ ਦਵਾ-ਦਾਰੂ ਨਾਲ ਵੀ ਕੋਈ ਫ਼ਰਕ ਨਹੀਂ ਪਿਆ। ਜ਼ਕਰੀਆ ਖਾਨ ਸਿੱਖਾਂ ‘ਤੇ ਕੀਤੇ ਜ਼ੁਲਮਾਂ ਦਾ ਪਸ਼ਚਾਤਾਪ ਕਰਨ ਲੱਗਾ। ਜ਼ਕਰੀਆਂ ਖਾਨ ਨੇ ਆਪਣੀ ਸਿਹਤਯਾਬੀ ਲਈ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੂੰ ਪੰਜ ਹਜ਼ਾਰ ਰੁਪਏ ਦੀ ਭੇਟ ਦੇ ਕੇ ਕਾਹਨੂੰਵਾਨ ਛੰਭ ਵਿੱਚ ਸਿੰਘਾਂ ਪਾਸ ਭੇਜਿਆ।

ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਸਿੰਘਾਂ ਨਾਲ ਵਿਚਾਰ-ਚਰਚਾ ਕਰਕੇ ਕਿਹਾ, “ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਦੀ ਜੁੱਤੀ ਜੇ ਜ਼ਕਰੀਆ ਖਾਨ ਦੇ ਸਿਰ ਵਿੱਚ ਮਾਰੀ ਜਾਵੇ ਤਾਂ ਉਸਦਾ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਖੁਲ੍ਹ ਸਕਦਾ ਹੈ।” ਜ਼ਕਰੀਆ ਖਾਨ ਦੇ ਸਿਰ ਵਿੱਚ ਜੁੱਤੀਆਂ ਵੱਜਣ ਨਾਲ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਤਾਂ ਟੁੱਟ ਗਿਆ ਪਰ ਉਹ ਚਾਰ ਕੁ ਦਿਨ ਹੀ ਜਿਉਂਦਾ ਰਿਹਾ।

ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਖੋਪਰੀ ਉਤਰਨ ਉਪਰੰਤ 22 ਦਿਨ ਜੀਵਤ ਰਹੇ ਅਤੇ 1 ਸਾਵਣ 1745 ਈ. ਨੂੰ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਮੁਗਲ ਹਕੂਮਤ ਦੀ ਈਨ ਨਾ ਮੰਨਦਿਆਂ ਅਨੇਕਾਂ ਕਸ਼ਟ ਸਰੀਰ ‘ਤੇ ਸਹਾਰ ਲਏ ਪਰ ਆਪਣੇ ਅਕੀਦੇ ਤੋਂ ਨਾ ਡੋਲੇ। ਉਨ੍ਹਾਂ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਜਗਤ ਨੂੰ ਸੁਨੇਹਾ ਦੇ ਦਿੱਤਾ ਕਿ ਸਿੱਖ ਲਈ ਉਸਦੇ ਕੇਸ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਤੋਂ ਵੀ ਬਹੁਮੁੱਲੇ ਹਨ। ਸਿੱਖ ਜਾਨ ਤਾਂ ਦੇ ਸਕਦਾ ਹੈ ਪਰ ਆਪਣੇ ਰੋਮਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀਂ ਸਹਿ ਸਕਦਾ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਪ੍ਰੇਰਨਾ ਲੈਂਦਿਆਂ ਸਾਨੂੰ ਆਪਣੇ ਕੇਸ਼ਾਂ ਦੀ ਸੰਭਾਲ ਅਤੇ ਸਤਿਕਾਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ। ਕੇਸ ਗੁਰੂ ਦੀ ਮੋਹਰ ਹਨ।`,
    artist: "ਜਗਵਿੰਦਰ ਸਿੰਘ",
    medium: "Low Relief",
  },

  "14-dal-khalsa.jpg": {
    titlePa: "ਦਲ ਖ਼ਾਲਸਾ ਦਾ ਗਠਨ",
    descriptionPa: `ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਵੱਲੋਂ ਖੜ੍ਹੀਆਂ ਕੀਤੀਆਂ ਫੌਜਾਂ ਦੇ ਖੇਰੂੰ-ਖੇਰੂੰ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਸਿੱਖ ਯੋਧੇ ਛੋਟੇ-ਛੋਟੇ ਜੱਥਿਆਂ ਦੇ ਰੂਪ ਵਿੱਚ ਮੁਗ਼ਲ ਤਾਕਤ ਨੂੰ ਚੁਣੌਤੀ ਦਿੰਦੇ ਰਹੇ। ਇਹ ਜੱਥੇ ਹਥਿਆਰਬੰਦ ਸਨ ਅਤੇ ਅਤਿ ਗਤੀਸ਼ੀਲ ਗੁਰੀਲਾ ਯੁੱਧ ਦੇ ਮਾਹਰ ਸਨ, ਜੋ ਲੋੜ ਪੈਣ ‘ਤੇ ਇਕੱਠੇ ਹੋ ਜਾਂਦੇ ਸਨ। ਦੀਵਾਨ ਦਰਬਾਰਾ ਸਿੰਘ ਦੀ ਅਗਵਾਈ ਹੇਠ, ਇਹ ਜੱਥੇ ਵਿਸਾਖੀ ਅਤੇ ਦਿਵਾਲੀ ਮੌਕੇ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਇਕੱਠੇ ਹੁੰਦੇ ਸਨ।

1733 ਵਿੱਚ ਲਾਹੌਰ ਦੇ ਮੁਗ਼ਲ ਗਵਰਨਰ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਦਬਾਉਣ ਵਿੱਚ ਅਸਫਲ ਰਹਿਣ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨਾਲ ਸਮਝੌਤਾ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ। ਇਸ ਦੌਰਾਨ ਇਕ ਜਥੇ ਦੇ ਜਥੇਦਾਰ ਭਾਈ ਕਪੂਰ ਸਿੰਘ ਨੂੰ ਸਿੱਖਾਂ ਨੇ ਆਪਣਾ ਆਗੂ ਮੰਨਿਆ ਅਤੇ ਨਵਾਬ ਦਾ ਖਿਤਾਬ ਦਿੱਤਾ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਪ੍ਰਬੰਧਕੀ ਸਹੂਲਤ ਲਈ ਸਮੁੱਚੀ ਫੌਜ ਨੂੰ ਦੋ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਿਆ: ਬੁੱਢਾ ਦਲ (ਬਜ਼ੁਰਗਾਂ ਦਾ ਸਮੂਹ) ਅਤੇ ਤਰਨਾ ਦਲ (ਨੌਜਵਾਨਾਂ ਦਾ ਸਮੂਹ, ਜਿਸ ਨੂੰ ਅੱਗੇ ਪੰਜ ਜੱਥਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ)।

1735 ਵਿੱਚ ਸਮਝੌਤਾ ਟੁੱਟਣ ਅਤੇ ਮੁੜ ਜ਼ੁਲਮ ਸ਼ੁਰੂ ਹੋਣ ਕਾਰਨ ਖ਼ਾਲਸਾ ਫਿਰ ਛੋਟੇ ਸਮੂਹਾਂ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ। 1747 ਵਿੱਚ ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ ਦੇ ਹਮਲੇ ਤੋਂ ਬਾਅਦ, ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ 29 ਮਾਰਚ 1748 ਦੀ ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਸਾਰੇ ਜੱਥਿਆਂ ਦੀ ਏਕਤਾ ਦੀ ਲੋੜ ‘ਤੇ ਜ਼ੋਰ ਦਿੱਤਾ।

ਗੁਰਮਤੇ ਰਾਹੀਂ, ਖ਼ਾਲਸੇ ਦੀ ਸਮੁੱਚੀ ਲੜਾਕੂ ਸ਼ਕਤੀ ਨੂੰ ਦਲ ਖ਼ਾਲਸਾ ਸੰਗਠਨ ਵਿੱਚ ਇੱਕਜੁੱਟ ਕੀਤਾ ਗਿਆ, ਜਿਸ ਦੀ ਜਥੇਦਾਰੀ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ਸੌਂਪੀ ਗਈ। ਉਸ ਸਮੇਂ ਦੇ 65 ਜੱਥਿਆਂ ਨੂੰ 11 ਜਥੇ (ਮਿਸਲਾਂ) ਵਿੱਚ ਇੱਕਠੇ ਦਿੱਤਾ ਗਿਆ, ਹਰ ਇੱਕ ਦਾ ਆਪਣਾ ਝੰਡਾ ਅਤੇ ਨਾਮ ਸੀ। ਇਹ ਮੁੱਖ ਤੌਰ ‘ਤੇ ਘੋੜਸਵਾਰ ਫੌਜ ਸੀ।

ਮਿਸਲਾਂ ਦੇ ਨਾਮ ਤੇ ਜਥੇਦਾਰ:
ਆਹਲੂਵਾਲੀਆ ਮਿਸਲ - ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ
ਫੈਜਲਪੁਰੀਆ ਮਿਸਲ - ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ
ਸ਼ੁਕਰਚੱਕੀਆ ਮਿਸਲ - ਸ੍ਰ. ਨੌਧ ਸਿੰਘ
ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ - ਸ੍ਰ. ਦਸੌਂਦਾ ਸਿੰਘ
ਭੰਗੀ ਮਿਸਲ - ਸ੍ਰ. ਹਰੀ ਸਿੰਘ
ਕਨੱਈਆ ਮਿਸਲ - ਸ੍ਰ. ਜੈ ਸਿੰਘ
ਕਾਨ੍ਹਾਂ ਨਕੱਈ ਮਿਸਲ - ਸ੍ਰ. ਹੀਰਾ ਸਿੰਘ
ਡੱਲੇਵਾਲੀਆ ਮਿਸਲ - ਸ੍ਰ. ਗੁਲਾਬ ਸਿੰਘ
ਸ਼ਹੀਦੀ ਮਿਸਲ - ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ
ਕਰੋੜ ਸਿੰਘੀਆ ਮਿਸਲ - ਸ੍ਰ. ਕਰੋੜਾ ਸਿੰਘ
ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ - ਸ੍ਰ. ਨੰਦ ਸਿੰਘ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ

ਇਹ 11 ਮਿਸਲਾਂ ਅੱਗੇ ਬੁੱਢਾ ਦਲ ਤੇ ਤਰਨਾ ਦਲ ਵਿਚ ਵੰਡੀਆਂ ਹੋਈਆਂ ਸਨ। ਦਲ ਖ਼ਾਲਸਾ ਦੀਆਂ ਸਾਂਝੀਆਂ ਮੁਹਿੰਮਾਂ ਉੱਤੇ ਮਿਸਲ ਨਿਸ਼ਾਨਾਂਵਾਲੀ ਦਲ ਦਾ ਨਿਸ਼ਾਨ ਲੈ ਕੇ ਅੱਗੇ ਚੱਲਦੀ ਸੀ।

ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਥੋੜ੍ਹੇ ਹੀ ਸਮੇਂ ਵਿੱਚ ਜ਼ਿਆਦਾਤਰ ਪੰਜਾਬ ਖੇਤਰ ‘ਤੇ ਆਪਣਾ ਅਧਿਕਾਰ ਸਥਾਪਿਤ ਕਰ ਲਿਆ। 1755 ਤੱਕ ਪਹੁੰਚਦਿਆਂ ਸਿੰਘਾਂ ਨੇ ਰਾਖੀ ਪ੍ਰਬੰਧ ਰਾਹੀਂ ਪੰਜਾਬ ਦੇ ਵੱਡੇ ਹਿੱਸੇ ਉੱਤੇ ਆਪਣਾ ਦਾਅਵਾ ਕਾਇਮ ਕਰ ਲਿਆ ਸੀ।

ਫਰਬਰੀ 1762 ‘ਚ ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਵਾਪਰਿਆ। ਉਸ ਤੋਂ ਕੁਝ ਮਹੀਨਿਆਂ ਬਾਅਦ ਹੀ ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ ਦੇ ਗਵਰਨਰ ਅਤੇ ਖੁਦ ਸ਼ਾਹ ਨੂੰ ਹਰਾਇਆ। ਇਸ ਤੋਂ ਕੁਝ ਸਮੇਂ ਬਾਅਦ ਹੀ ਜਨਵਰੀ 1764 ਤੋਂ ਮਈ 1765 ਤੱਕ ਸਿੰਘਾਂ ਨੇ ਸਰਹਿੰਦ, ਮੁਲਤਾਨ ਤੇ ਲਾਹੌਰ ‘ਤੇ ਕਬਜ਼ੇ ਜਮਾ ਲਏ ਸਨ।

ਅਠਾਰਵੀਂ ਸਦੀ ‘ਚ 1708 ਤੋਂ ਲੈ ਕੇ ਤਕਰੀਬਨ 1769 ਤੱਕ ਲਗਾਤਾਰ ਹਥਿਆਰਬੱਧ ਸੰਘਰਸ਼ ਚੱਲਦਾ ਰਿਹਾ, ਜਿਸਦੇ ਸਦਕਾ ਪੰਜਾਬ ਵਿਚ ਸਿੰਘਾਂ ਨੇ ਉਸ ਸਮੇਂ ਦੀਆਂ ਤਿੰਨੋਂ ਵੱਡੀਆਂ ਤਾਕਤਾਂ—ਦੁਰਾਨੀ, ਮੁਗ਼ਲ ਤੇ ਮਰਹੱਟਿਆਂ—ਨੂੰ ਮਾਤ ਦੇ ਕੇ ਆਪਣਾ ਸੁਤੰਤਰ ਰਾਜ ਕਾਇਮ ਕੀਤਾ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "15-baba-deep-singh-battle.jpg": {
    titlePa: "ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਦਾ ਜੰਗ",
    descriptionPa: `ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ 14 ਮਾਘ 1682 ਈ. ਵਿੱਚ ਭਾਈ ਭਗਤਾ ਜੀ ਤੇ ਮਾਤਾ ਜਿਉਣੀ ਜੀ ਦੇ ਘਰ ਪਿੰਡ ਪਹੂਵਿੰਡ (ਤਰਨ ਤਾਰਨ) ਵਿਖੇ ਹੋਇਆ। ਬਾਬਾ ਜੀ ਦਾ ਪਰਿਵਾਰ ਗੁਰੂ ਘਰ ਦਾ ਅਨਿੰਨ ਸੇਵਕ ਸੀ। ਬਾਬਾ ਜੀ ਨੂੰ ਗੁਰਮਤਿ ਦੀ ਸਿੱਖਿਆ ਘਰ ਵਿਚੋਂ ਹੀ ਪ੍ਰਾਪਤ ਹੋਈ। ਬਾਬਾ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਖੇਤੀਬਾੜੀ ਦੇ ਕੰਮ ਵਿੱਚ ਮਦਦ ਕਰਾਉਂਦੇ ਸਨ।

ਆਪ ਜੀ ਨੂੰ ਬਚਪਨ ਤੋਂ ਨੇਜ਼ਾਬਾਜੀ, ਘੋੜਸਵਾਰੀ ਆਦਿ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕਰਨ ਦਾ ਸੌਂਕ ਸੀ। ਆਪ ਜੀ ਕੱਦ-ਕਾਠ ਦੇ ਰਿਸ਼ਟ-ਪੁਸ਼ਟ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸ਼ਖ਼ਸੀਅਤ ਦੇ ਮਾਲਕ ਸਨ। ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਜਦੋਂ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਕੀਤੀ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਪਰਿਵਾਰ ਸਮੇਤ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਪਹੁੰਚ ਕੇ ਗੁਰੂ ਸਾਹਿਬ ਕੋਲੋਂ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ।

ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਹੀ ਰਹਿਣ ਲਈ ਕਿਹਾ। ਆਪ ਜੀ ਗੁਰੂ-ਘਰ ਰਹਿੰਦਿਆਂ ਨਿਤਾਪ੍ਰਤੀ ਲੰਗਰ ਦੀ ਸੇਵਾ ਨਾਲ ਬੱਚਿਆਂ ਨੂੰ ਗੁਰਬਾਣੀ ਪੜ੍ਹਾਉਣ ਤੇ ਅਰਥ ਸਮਝਾਉਣ ਦੀ ਸੇਵਾ ਕਰਦੇ ਸਨ। ਬਾਬਾ ਜੀ ਗੁਰਬਾਣੀ ਦੀਆਂ ਹੱਥ-ਲਿਖਤ ਪੋਥੀਆਂ ਵੀ ਲਿਖਦੇ ਸਨ। ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਮੁਖੀ, ਅਰਬੀ, ਫ਼ਾਰਸੀ ਭਾਸ਼ਾਵਾਂ ਦਾ ਗਹਿਰਾ ਅਧਿਐਨ ਕੀਤਾ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਕੋਲੋਂ ਆਪ ਨੇ ਗੁਰਬਾਣੀ ਦਾ ਗਿਆਨ ਅਤੇ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ।

ਦਸਮ ਪਾਤਸ਼ਾਹ ਨੇ ਜਦੋਂ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਿਆ ਸੀ, ਉਦੋਂ ਆਪ ਆਪਣੇ ਨਗਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਇਲਾਕੇ ਵਿੱਚ ਗੁਰਮਤਿ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰ ਰਹੇ ਸਨ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਜਦੋਂ ਤਲਵੰਡੀ ਸਾਬੋ ਟਿਕਾਉ ਕੀਤਾ ਤਾਂ ਆਪ ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ। ਤਲਵੰਡੀ ਸਾਬੋ ਵਿਖੇ ਜਦੋਂ ਦਸਮ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਮੁੜ ਸੰਪਾਦਨਾ ਕੀਤੀ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਕਲਮਾਂ ਘੜਨ ਤੇ ਲਿਆਉਣ ਦੀ ਸੇਵਾ ਕਰਿਆ ਕਰਦੇ ਸਨ।

ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਦੱਖਣ ਦੀ ਯਾਤਰਾ ‘ਤੇ ਕੂਚ ਕਰਨ ਤੋਂ ਪਹਿਲਾ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ਤਖ਼ਤ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ (ਤਲਵੰਡੀ ਸਾਬੋ) ਦਾ ਜਥੇਦਾਰ ਸਥਾਪਿਤ ਕਰਦਿਆਂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਵਿਦਿਆ ਪੜ੍ਹਾਉਣ, ਗੁਰਮਤਿ ਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰਨ, ਸਿੱਖ ਮਰਯਾਦਾ ਨੂੰ ਦ੍ਰਿੜ ਕਰਾਉਣ, ਪੰਥ ਨੂੰ ਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕਰਨ ਆਦਿ ਹੁਕਮ ਕੀਤੇ।

ਦਸਮ ਪਾਤਸ਼ਾਹ ਦੇ ਜੋਤੀ-ਜੋਤਿ ਸਮਾਉਣ ਉਪਰੰਤ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਸਿੱਖਾਂ ਨੂੰ ਗੁਰਬਾਣੀ ਅਰਥਾਂ ਸਹਿਤ ਪੜ੍ਹਾਉਣ ਦਾ ਕਾਰਜ ਆਰੰਭਿਆ ਅਤੇ ਜੁਝਾਰੂ ਸਿੰਘਾਂ ਨੂੰ ਸ਼ਸਤਰ ਵਿਦਿਆ ਵਿੱਚ ਨਿਪੁੰਨ ਕਰਨ ਲਈ ਸਿਖਲਾਈ ਪ੍ਰਦਾਨ ਕੀਤੀ। ਬਾਬਾ ਜੀ ਨੇ ਸਿੱਖ ਸੰਘਰਸ਼ ਦੇ ਬਿਖੜੇ ਪੈਂਡਿਆਂ ਦੌਰਾਨ ਪੰਥ ਨੂੰ ਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕੀਤੀ।

ਖ਼ਾਲਸਾ ਪੰਥ ਨੇ 1748 ਈ. ਵਿੱਚ ਜਦੋਂ ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੀ ਸਥਾਪਨਾ ਕਰਦਿਆਂ ਸਿੱਖ ਜਥਿਆਂ ਨੂੰ 12 ਮਿਸਲਾਂ ਵਿੱਚ ਵੰਡਿਆ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ‘ਸ਼ਹੀਦ ਮਿਸਲ’ ਦਾ ਜਥੇਦਾਰ ਥਾਪਿਆ ਗਿਆ। ਇਸ ਮਿਸਲ ਦਾ ਮੁਖ ਦਫ਼ਤਰ ‘ਤਲਵੰਡੀ ਸਾਬੋ’ ਬਣਾਇਆ ਗਿਆ।

1756 ਈ. ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਨੇ ਭਾਰਤ ‘ਤੇ ਚੌਥਾ ਹਮਲਾ ਕੀਤਾ। ਹਮਲੇ ਉਪਰੰਤ ਵਾਪਸੀ ਸਮੇਂ ਪੰਜਾਬ ਲੰਘਦਿਆਂ ਅਬਦਾਲੀ ਦੀ ਸਿੱਖ ਜਥਿਆਂ ਨੇ ਭਾਰੀ ਦੁਰਗਤੀ ਕੀਤੀ ਅਤੇ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਕਾਫੀ ਹਿੱਸਾ ਖੋਹ ਲਿਆ। ਅਬਦਾਲੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ ਆਪਣੇ ਪੁੱਤਰ ਤੈਮੂਰ ਸ਼ਾਹ ਨੂੰ ਲਾਹੌਰ ਦਾ ਗਵਰਨਰ ਨਿਯੁਕਤ ਕੀਤਾ। ਉਸ ਨੇ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ ਨੁਕਸਾਨ ਅਤੇ ਗੁਰ-ਅਸਥਾਨਾਂ ਨੂੰ ਢਹਿ-ਢੇਰੀ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ। ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਕਰਦਿਆਂ ਸਰੋਵਰ ਨੂੰ ਪੂਰ ਦਿੱਤਾ ਗਿਆ।

ਇਸ ਵਰਤਾਰੇ ਦੀ ਖ਼ਬਰ ਜਦੋਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਪਾਸ ਪਹੁੰਚੀ ਤਾਂ ਉਹ ਗੁਰਧਾਮਾਂ ਦੀ ਬੇਅਦਬੀ ਦਾ ਬਦਲਾ ਅਤੇ ਪ੍ਰਬੰਧ ਨੂੰ ਆਪਣੇ ਹੱਥਾਂ ਵਿੱਚ ਲੈਣ ਲਈ 500 ਸਿੰਘਾਂ ਦੇ ਜਥੇ ਸਮੇਤ ਅੰਮ੍ਰਿਤਸਰ ਚੱਲ ਪਏ। ਤਰਨ ਤਾਰਨ ਪਹੁੰਚਦਿਆਂ ਇਹ ਜਥਾ 5000 ਸਿੰਘਾਂ ਦਾ ਹੋ ਗਿਆ। ਬਾਬਾ ਜੀ ਨੇ ਸਮੁੱਚੇ ਜਥੇ ਨੂੰ ਬੇਨਤੀ ਕੀਤੀ ਕਿ “ਇਸ ਤੋਂ ਅੱਗੇ ਸਾਡੇ ਨਾਲ ਉਹੀ ਚੱਲੇ ਜਿਸ ਨੂੰ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਨਾਲੋਂ ਗੁਰਧਾਮਾਂ ਦੀ ਮਰਯਾਦਾ ਅਤੇ ਪ੍ਰਬੰਧ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਕਰਨ ਦੀ ਅਭਿਲਾਖਾ ਹੈ।”

ਗੋਹਲਵੜ ਦੇ ਸਥਾਨ ‘ਤੇ ਸਿੱਖਾਂ ਦਾ ਮੁਕਾਬਲਾ ਜ਼ਹਾਨ ਖਾਂ ਦੀ ਫ਼ੌਜ ਨਾਲ ਹੁੰਦਾ ਹੈ। ਇਸ ਜੰਗ ਵਿੱਚ ਸਿੱਖਾਂ ਅਤੇ ਅਫਗਾਨ ਫ਼ੌਜ ਦਾ ਭਾਰੀ ਜਾਨੀ ਨੁਕਸਾਨ ਹੁੰਦਾ ਹੈ। ਸਿੱਖ ਫ਼ੌਜ ਨੇ ਬਹਾਦਰੀ ਦੇ ਜ਼ੌਹਰ ਦਿਖਾਉਂਦਿਆਂ ਅੰਮ੍ਰਿਤਸਰ ਵੱਲ ਨੂੰ ਵੱਧਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ।

ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਸਖ਼ਤ ਜਖ਼ਮੀ ਹੋ ਗਏ। ਉਨ੍ਹਾਂ ਨੇ ਅਰਦਾਸ ਕੀਤੀ ਸੀ ਕਿ ਮੈਂ ਆਪਣਾ ਸੀਸ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਭੇਟ ਕਰਾਂਗਾ। ਇਸ ਪ੍ਰਣ ਨੂੰ ਪੂਰਾ ਕਰਦਿਆਂ ਉਹ ਵਿਰੋਧੀ ਫ਼ੌਜ ਨਾਲ ਜੂਝਦਿਆਂ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਪਹੁੰਚ ਕੇ ਆਪਣਾ ਸੀਸ ਪਾਤਸ਼ਾਹ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਭੇਟ ਕਰਕੇ 30 ਕੱਤਕ 1757 ਈ. ਨੂੰ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕਰ ਗਏ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "16-vadda-ghallughara.jpg": {
    titlePa: "ਵੱਡਾ ਘੱਲੂਘਾਰਾ",
    descriptionPa: `ਅਠਾਰਵੀਂ ਸਦੀ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਘਟਨਾਵਾਂ ਵਿੱਚੋਂ ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਅਹਿਮ ਘਟਨਾ ਹੈ। ਇਸ ਘੱਲੂਘਾਰੇ ‘ਚ ਕਾਹਨੂੰਵਾਨ ਵਿਖੇ 1746 ਈ. ਵਿੱਚ ਵਾਪਰੇ ਘੱਲੂਘਾਰੇ ਦੇ ਮੁਕਾਬਲੇ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਹੋਇਆ ਸੀ, ਜਿਸ ਕਰਕੇ ਇਸ ਸਾਕੇ ਨੂੰ ‘ਵੱਡੇ ਘੱਲੂਘਾਰੇ’ ਦਾ ਨਾਮ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ। ਇਹ ਸਾਕਾ ਅਬਦਾਲੀ ਦੁਆਰਾ ਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ ‘ਤੇ ਵਰਤਾਇਆ ਗਿਆ ਸੀ।

ਅਬਦਾਲੀ ਨੇ 1747 ਈ. ਤੋਂ 1767 ਈ. ਤੱਕ ਹਿੰਦੁਸਤਾਨ ‘ਤੇ ਅੱਠ ਹਮਲੇ ਕੀਤੇ। ਅਬਦਾਲੀ ਦੇ ਪਹਿਲੇ ਚਾਰ ਹਮਲਿਆਂ ਨੇ ਮੁਗਲ ਸਾਮਰਾਜ ਨੂੰ ਖੇਰੂੰ-ਖੇਰੂੰ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਪੰਜਵੇਂ ਹਮਲੇ ਦੌਰਾਨ ਮਰਾਠਿਆਂ ਨੂੰ ਮਾਤ ਦਿੱਤੀ ਅਤੇ ਆਪਣੇ ਅੰਤਲੇ ਤਿੰਨ ਹਮਲਿਆਂ (1762, 1764, 1767 ਈ.) ਦੌਰਾਨ ਸਿੱਖਾਂ ਨੂੰ ਕੁਚਲਣ ਦੀ ਨਾਕਾਮ ਕੋਸ਼ਿਸ ਕੀਤੀ।

ਅਬਦਾਲੀ ਨੇ ਲਾਹੌਰ, ਸਰਹਿੰਦ, ਮਲੇਰਕੋਟਲਾ, ਜਲੰਧਰ-ਦੁਆਬ ਆਦਿ ਇਲਾਕਿਆਂ ‘ਚ ਆਪਣੇ ਅਹਿਲਕਾਰ ਨਿਯੁਕਤ ਕਰ ਦਿੱਤੇ ਸਨ। ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਸਥਾਪਨਾ ਨੇ ਸਿੱਖ ਸੈਨਿਕ ਤਾਕਤ ਨੂੰ ਪੰਜਾਬ ਅੰਦਰ ਬਹੁਤ ਮਜ਼ਬੂਤ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਦੇ ਹਰ ਹਮਲੇ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਉਸ ਨੂੰ ਸਖ਼ਤ ਚੁਣੌਤੀ ਦਿੱਤੀ। ਸਿੱਖ ਅਬਦਾਲੀ ਦੁਆਰਾ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਵੱਡਾ ਹਿੱਸਾ ਖੋਹ ਲੈਂਦੇ ਸਨ।

ਅਬਦਾਲੀ ਨੇ ਪੰਜਵੇਂ ਹਮਲੇ ਦੌਰਾਨ ਮਰਾਠਿਆਂ ਨੂੰ ਪਾਣੀਪਤ ਦੇ ਸਥਾਨ ‘ਤੇ ਬੁਰੀ ਤਰ੍ਹਾਂ ਹਰਾਇਆ ਸੀ। ਅਬਦਾਲੀ ਦੇ ਵਾਪਸ ਲਾਹੌਰ ਰਾਹੀਂ ਅਫਗਾਨਿਸਤਾਨ ਜਾਂਦਿਆਂ ਸਿੱਖਾਂ ਨੇ ਅਬਦਾਲੀ ਨੂੰ ਗੁਰੀਲਾ ਯੁੱਧ ਨੀਤੀ ਤਹਿਤ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਕੀਤਾ। ਮੁਗਲ-ਮਰਾਠਿਆਂ ਨੂੰ ਹਰਾਉਣ ਉਪਰੰਤ ਹਿੰਦੁਸਤਾਨ ਵਿੱਚ ਸਿੱਖ ਹੀ ਉਸ ਲਈ ਚੁਣੌਤੀ ਬਣੇ ਹੋਏ ਸਨ। ਸਿੱਖਾਂ ਦੀਆਂ ਕਾਰਵਾਈਆਂ ਤੋਂ ਪ੍ਰੇਸ਼ਾਨ ਅਬਦਾਲੀ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ।

ਅਬਦਾਲੀ ਅਜੇ ਵਾਪਸ ਕਾਬਲ ਵੀ ਨਹੀਂ ਪਹੁੰਚਿਆ ਸੀ ਕਿ ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਸਰਹਿੰਦ ਦੇ ਸੂਬੇਦਾਰ ਜੈਨ ਖਾਂ, ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਉਬੈਦ ਖਾਂ, ਜਲੰਧਰ-ਦੁਆਬ, ਮਲੇਰਕੋਟਲਾ ਆਦਿ ਅਬਦਾਲੀ ਦੇ ਅਹਿਲਕਾਰਾਂ ਨੂੰ ਮਾਤ ਦੇ ਕੇ ਪੰਜਾਬ ਦੇ ਵੱਡੇ ਹਿੱਸੇ ‘ਤੇ ਰਾਜ ਸਥਾਪਿਤ ਕਰ ਲਿਆ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਅਫਗਾਨ ਹਕੂਮਤ ਦੀ ਮਦਦ ਕਰਦੇ ਜਾਂ ਸਿੱਖ ਵਿਰੋਧੀ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਵਿਅਕਤੀਆਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ।

ਸਿੱਖਾਂ ਨੇ ਜੰਡਿਆਲਾ ਦੇ ਨਿਰੰਜਨੀਏ ਮਹੰਤ ਆਕਲਦਾਸ ਨੂੰ ਆਪਣੀਆਂ ਹਰਕਤਾਂ ਤੋਂ ਬਾਜ਼ ਆਉਣ ਦੀ ਹਿਦਾਇਤ ਕੀਤੀ ਸੀ। ਆਕਲਦਾਸ ਅਬਦਾਲੀ ਦੇ ਲਗਾਤਾਰ ਸੰਪਰਕ ਵਿੱਚ ਸੀ ਅਤੇ ਹਮੇਸ਼ਾ ਸਿੱਖ ਵਿਰੋਧੀ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹਿੰਦਾ ਸੀ। ਆਕਲਦਾਸ ਨੇ ਅਬਦਾਲੀ ਨੂੰ ਮਦਦ ਲਈ ਸੁਨੇਹਾ ਭੇਜਿਆ।

ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਪੰਜਾਬ ਵਿੱਚ ਚੱਲ ਰਹੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀਆਂ ਖ਼ਬਰਾਂ ਅਬਦਾਲੀ ਤੱਕ ਪਹਿਲਾਂ ਹੀ ਪਹੁੰਚ ਰਹੀਆਂ ਸਨ। ਉਹ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ ਕਾਬਲ ਤੋਂ ਵੱਡੀ ਫੌਜ ਸਮੇਤ ਰਵਾਨਾ ਹੋ ਗਿਆ। ਸਿੱਖਾਂ ਨੂੰ ਅਬਦਾਲੀ ਦੇ ਹਮਲੇ ਦੀ ਖ਼ਬਰ ਮਿਲ ਚੁੱਕੀ ਸੀ। ਸਿੱਖਾਂ ਦੀ ਅਗਵਾਈ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ, ਸ੍ਰ. ਹਰੀ ਸਿੰਘ ਭੰਗੀ, ਸ੍ਰ. ਜੈ ਸਿੰਘ ਕਨੱਈਆ, ਸ੍ਰ. ਚੜਤ ਸਿੰਘ ਸ਼ੁਕਰਚੱਕੀਆ ਆਦਿ ਸਰਦਾਰ ਕਰ ਰਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸਾਰਾ ਧਿਆਨ ਸਿੱਖਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਥਾਂ ‘ਤੇ ਪਹੁੰਚਾਉਣ ਵੱਲ ਲਾਇਆ ਸੀ।

ਸਿੱਖ ਅਬਾਦੀ ਦੀ ਕੁਲ ਵਸੋਂ ਦਾ ਵੱਡਾ ਹਿੱਸਾ ਮਲੇਰਕੋਟਲੇ ਦੇ ਸਥਾਨ ‘ਤੇ ਇਕੱਤਰ ਹੋ ਗਿਆ ਸੀ। ਇਸ ਇਕੱਠ ਵਿੱਚ ਬੀਬੀਆਂ, ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਸਮੇਤ ਗਿਣਤੀ 50 ਕੁ ਹਜ਼ਾਰ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਜੈਨ ਖਾਂ, ਭੀਖਣ ਸ਼ਾਹ, ਮੁਰਤਜਾ ਖਾਂ ਆਦਿ ਪੰਜਾਬ ਸਥਿਤ ਹਾਕਮਾਂ ਨੂੰ ਫੌਜ ਸਮੇਤ ਮਲੇਰਕੋਟਲੇ ਪਹੁੰਚਣ ਦੇ ਹੁਕਮ ਕੀਤੇ ਸਨ।

ਅਬਦਾਲੀ ਨੇ ਫਰਵਰੀ 1762 ਈ. ‘ਚ ਕੁੱਪ ਰਹੀੜੇ ਦੇ ਸਥਾਨ ‘ਤੇ ਵੱਡੀ ਫੌਜ ਸਮੇਤ ਸਿੱਖਾਂ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ ਸੀ। ਉਹ ਸਿੱਖਾਂ ਦੀ ਨਸ਼ਲਕੁਸ਼ੀ ਕਰਕੇ ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ। ਸਿੱਖ ਸੈਨਿਕਾਂ ਨੇ ਵਹੀਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਮਨੁੱਖੀ ਵਾੜ ਬਣਾ ਕੇ ਮਾਲਵੇ ਵੱਲ ਨੂੰ ਵਧਣ ਦਾ ਯਤਨ ਕੀਤਾ। ਸਿੱਖ ਫੌਜ ਨੇ ਅਬਦਾਲੀ ਦੇ ਹਰ ਹੱਲੇ ਦਾ ਡਟਵਾਂ ਮੁਕਾਬਲਾ ਕੀਤਾ।

ਸਿੱਖ ਸਰਦਾਰਾਂ ਨੇ ਵਹੀਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਜੋ ਮਨੁੱਖੀ ਵਾੜ ਬਣਾਈ ਸੀ, ਉਹ ਅਬਦਾਲੀ ਦੇ ਹਮਲਿਆਂ ਨਾਲ ਟੁੱਟਣੀ ਸ਼ੁਰੂ ਹੋ ਗਈ। ਅਬਦਾਲੀ ਦੀ ਫੌਜ ਨੇ ਹਜ਼ਾਰਾਂ ਬੀਬੀਆਂ, ਬਜ਼ੁਰਗਾਂ, ਬੱਚਿਆਂ ਨੂੰ ਬੇਰਹਿਮੀ ਨਾਲ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰ ਦਿੱਤਾ। ਇਹ ਘੱਲੂਘਾਰਾ 27 ਮਾਘ 1762 ਈ. ਨੂੰ ਵਾਪਰਿਆ ਜਿਸ ਵਿੱਚ ਲਗਭਗ 30 ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਦੀਆਂ ਸ਼ਹੀਦੀਆਂ ਹੋਈਆਂ।

ਸਿੱਖ ਨਸ਼ਲਕੁਸ਼ੀ ਨੂੰ ਅੰਜਾਮ ਦਿੰਦਿਆਂ ਵਾਪਸ ਲਾਹੌਰ ਜਾਂਦਿਆਂ ਅਬਦਾਲੀ ਨੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਨੂੰ ਢਹਿ ਢੇਰੀ ਕਰ ਅੰਮ੍ਰਿਤਸਰ ਸਰੋਵਰ ਨੂੰ ਪੂਰ ਦਿੱਤਾ ਸੀ। ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਹੋਇਆ। ਸਿੱਖ ਕੌਮ ਉਪਰ ਇਹ ਘੱਲੂਘਾਰਾ ਨਾ ਮਿਟਣ ਵਾਲਾ ਜਖ਼ਮ ਸੀ, ਪਰ ਸਿੰਘਾਂ ਵਿੱਚ ਉਹੀ ਉਤਸ਼ਾਹ ਤੇ ਜ਼ਜਬਾ ਬਰਕਰਾਰ ਸੀ ਜੋ ਇਸ ਸਾਕੇ ਤੋਂ ਪਹਿਲਾਂ ਸੀ।

ਅਬਦਾਲੀ ਨੂੰ ਭਰਮ ਸੀ ਕਿ ਸਿੱਖ ਇਸ ਲੜਾਈ ਤੋਂ ਬਾਅਦ ਛੇਤੀ ਪੰਜਾਬ ਵਿੱਚ ਸਿਰ ਨਹੀਂ ਚੁੱਕ ਸਕਣਗੇ। ਪਰ ਅਬਦਾਲੀ ਦਾ ਇਹ ਭਰਮ ਪੰਜ-ਛੇ ਮਹੀਨਿਆਂ ਬਾਅਦ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਹਾਰ ਖਾਣ ਉਪਰੰਤ ਹੀ ਲਹਿ ਗਿਆ ਸੀ। ਖ਼ਾਲਸਾ ਪੰਥ ਹਰ ਸਾਲ 27 ਮਾਘ ਨੂੰ ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਦੇ ਸ਼ਹੀਦ-ਸਿੰਘਾਂ ਨੂੰ ਯਾਦ ਕਰਦਾ ਹੈ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Canvas Print",
  },

  "17-akali-timeless.jpg": {
    titlePa: "ਅਕਾਲੀ",
    descriptionPa: `ਅਕਾਲੀ ਪਰੰਪਰਾ
ਹਮ ਅਕਾਲੀ ਸਭ ਕੇ ਵਾਲੀ ਹਮਰਾ ਪੰਥ ਨਿਆਰਾ ਹੈ॥
ਦੀਨ ਮਜਬ ਦਾ ਜੁਧ ਜੁ ਕੀਨਾ ਖੰਡਾ ਫੜਿਆ ਦੁਧਾਰਾ ਹੈ॥

ਮੀਰੀ ਪੀਰੀ ਦੇ ਮਾਲਕ ਛੇਵੇਂ ਪਾਤਿਸਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਵੱਲੋਂ ਜਦੋਂ ਤਖਤ ਸ੍ਰੀ ਅਕਾਲ ਬੁੰਗਾ ਪਰਗਟ ਕੀਤਾ ਗਿਆ ਉਸੇ ਸਮੇਂ ਵਿਚ ਸੱਚੇ ਪਾਤਿਸਾਹ ਨੇ ਅਕਾਲੀ ਫੌਜ ਦਾ ਮੁੱਢ ਬੰਨਿਆ। ਖਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਤੋਂ ਬਾਅਦ ਅਕਾਲੀ ਪਰੰਪਰਾ ਨੇ ਬੁਲੰਦੀ ਹਾਸਲ ਕੀਤੀ। ਬੁੱਢਾ ਦਲ, ਮਿਸਲ ਸ਼ਹੀਦਾਂ ਅਤੇ ਬਾਬਾ ਬੀਰ ਸਿੰਘ ਨੌਰੰਗਾਬਾਦੀ ਅਠਾਰਵੀਂ ਸਦੀ ਵਿਚ ਗੁਰੂ ਖਾਲਸਾ ਪੰਥ ਵਿਚ ਪੰਥ ਅਕਾਲੀ ਪਰੰਪਰਾ ਨੂੰ ਨਿਭਾਉਣ ਵਾਲੇ ਸਿਰਮੌਰ ਜਥੇ ਸਨ।

ਫਿਰੰਗੀ ਦੇ ਪੰਜਾਬ ਵਿਚ ਕਬਜ਼ੇ ਤੋਂ ਬਾਅਦ ਅਕਾਲੀ ਸਿੰਘਾਂ ਨੂੰ ਹਕੂਮਤੀ ਜ਼ਬਰ ਨਾਲ ਖਤਮ ਕਰਨ ਦਾ ਯਤਨ ਕੀਤਾ ਗਿਆ ਤੇ ਸਿੱਖ ਸੰਸਥਾਵਾਂ ਦੇ ਨਿਜ਼ਾਮ ਵਿਚ ਵਿਗਾੜ ਆਏ। ੧੯੨੦ ਵਿਚ ਨਵੀਂ ਕਿਸਮ ਦਾ ਅਕਾਲੀ ਦਲ ਬਣਿਆ। ਸ਼ੁਰੂ ਦੇ ਪੰਜ ਸਾਲ ਨਵੇਂ ਅਕਾਲੀ ਦਲ ਨੇ ਅਹਿਮ ਯੋਗਦਾਨ ਪਾਇਆ, ਪਰ ਨਵੇਂ ਅਕਾਲੀ ਦਲ ਦੀ ਨੀਂਹ ਅਸਲ ਅਕਾਲੀ ਪਰੰਪਰਾ ਉਤੇ ਨਾ ਟਿਕੀ ਹੋਣ ਕਾਰਨ ੧੯੨੫ ਤੋਂ ਬਾਅਦ ਥਿੜਕਣੀ ਸ਼ੁਰੂ ਹੋ ਗਈ ਤੇ ਸਦੀ ਦੇ ਅੰਤ ਤੱਕ ਪਹੁੰਚਦਿਆਂ ਕਈ ਮਾੜੇ ਲੋਕ ‘ਅਕਾਲੀ’ ਨਾਮ ਦੀ ਆੜ ਲੈ ਕੇ ਲੁੱਟ-ਮਾਰ ਕਰਨ ਵਾਲੇ ਪੈਦਾ ਹੋ ਗਏ ਅਤੇ ਵਰਤਮਾਨ ਸਮੇਂ ਵਿਚ ਅਕਾਲੀ ਦਲ ਵਿਚ ਅਕਾਲੀ ਪਰੰਪਰਾ ਬਿਲਕੁਲ ਹੀ ਅਲੋਪ ਹੋ ਗਈ ਹੈ।

ਅੱਜ ਦੇ ਸਮੇਂ ਵਿਚ ਅਤਿ ਜਰੂਰੀ ਹੋ ਗਿਆ ਹੈ ਕਿ ਗੁਰਸੰਗਤ ਅਤੇ ਖਾਸ ਕਰਕੇ ਹੁਣ ਦੇ ‘ਨਵੀਨ ਅਕਾਲੀ’ ਕਹਾਉਣ ਵਾਲਿਆਂ ਵਿਚ ਅਕਾਲੀ ਪਰੰਪਰਾ ਦੇ ਪੁਰਾਤਨ ਸਖਸ਼ੀ ਅਤੇ ਸੰਗਤੀ ਉੱਚੇ ਆਦਰਸ਼ ਦਾ ਪ੍ਰਚਾਰ ਕੀਤਾ ਜਾਏ।

ਬੁਨਿਆਦੀ ਗੁਣ:
ਅਕਾਲੀ ਉਹ, ਜੋ ਇਕ ਅਕਾਲ ਉਤੇ ਟੇਕ ਰੱਖੇ।
ਅਕਾਲੀ ਉਹ, ਜੋ ਆਪ ਨਾਮ ਬਾਣੀ ਦਾ ਪ੍ਰੇਮੀ ਹੋਵੇ ਅਤੇ ਗੁਰ-ਸੰਗਤ ਲਈ ਨਾਮ, ਗੁਰਬਾਣੀ ਤੇ ਕੀਰਤਨ ਦਾ ਅਖੰਡ ਪਰਵਾਹ ਚਲਾਵੇ ਤੇ ਗੁਰ-ਸੰਗਤ ਨੂੰ ਤੱਤ ਗੁਰਮਤਿ ਦੇ ਮਾਰਗ ਉਤੇ ਤੋਰੇ।
ਅਕਾਲੀ ਉਹ ਜੋ ਪੂਰਨ ਤਿਆਗ, ਵੈਰਾਗ ਦੀ ਨਿਰਲੇਪ ਬਿਰਤੀ ਰੱਖਦਾ ਹੋਵੇ।

ਅਕਾਲੀ ਸਿੰਘ ਪੰਥਕ ਸੇਵਾ ਤੇ ਸੰਗਰਾਮ ਦੀਆਂ ਕਰੜੀਆਂ ਘਾਲਾਂ ਘਾਲਦੇ ਹੋਏ ਭੀ ਦਿਸ਼੍ਰਟਮਾਨ ਜੀਵਨ ਅਹੁਦਿਆਂ ਤੇ ਪਦਵੀਆਂ ਤੋਂ ਨਿਰਲੇਪ ਹੁੰਦਾ ਹੈ—ਭਾਵ ਮਾਨ ਰਹਿਤ ਤੇ ਹੰਕਾਰ ਰਹਿਤ।
ਅਕਾਲੀ ਆਪਣੇ ਹੱਥ ਆਏ ਪਦਾਰਥ, ਮਕਾਨ ਤੇ ਜਮੀਨ ਨੂੰ ਆਪਣੀ ਮਲਕੀਅਤ ਕਰ ਨਹੀਂ ਜਾਣਦੇ, ਸਗੋਂ ਅਕਾਲ ਪੁਰਖ ਦੀ ਦਾਤ ਕਰ ਜਾਣਦੇ ਹਨ।

ਅਕਾਲੀ ਸਿੰਘਾਂ ਦਾ ਪਵਿਤ੍ਰ ਜੀਵਨ—ਭਾਵ ਰਹਿਤ ਦੀ ਪਰਪਕਤਾ, ਨਾਮ ਦੀ ਸਤ੍ਹਾ, ਬੇਗਰਜ ਸੇਵਾ, ਸੰਗਰਾਮ ਤੇ ਧਰਮ ਪਰਚਾਰ—ਐਸੇ ਗੁਣ ਸਨ ਕਿ ਜਿਸ ਕਾਰਨ ਪੰਥ ਦੇ ਸਾਰੇ ਸਰਦਾਰ ਅਤੇ ਗੁਰਸੰਗਤਿ ਅਕਾਲੀ ਸਿੰਘ ਨੂੰ ਸਿਰਮੌਰ ਮੰਨਦੇ ਸਨ।

ਅਕਾਲੀ ਸਿੰਘ ਲਈ ਪੰਥ ਸੇਵਾ ਦਾ ਕੋਈ ਕਾਲ (ਸ਼ਾਮ, ਸਵੇਰਾ ਜਾਂ ਰੈਣ) ਬੱਧਾ ਹੋਇਆ ਨਹੀਂ—ਹਰ ਸਮੇਂ, ਹਰ ਥਾਂ ਤੇ ਹਰ ਪ੍ਰਕਾਰ ਦੀ ਪੰਥ ਸੇਵਾ ਲਈ ਸਦਾ ਤਤਪਰ।
ਅਕਾਲੀ ਗੁਰੂ ਖਾਲਸਾ ਪੰਥ ਦੀ ਸੇਵਾ-ਭੂਮੀ ਵਿਚ ਜਨਮ ਤੇ ਮਰਨ ਤੋਂ ਨਿਰਭਉ ਅਤੇ ਵੈਰ ਵਿਰੋਧ ਨੂੰ ਜਿੱਤ ਚੁਕਿਆ ਨਿਰਵੈਰ ਸੂਰਮਾ ਹੁੰਦਾ ਹੈ। ਇਸੇ ਕਾਰਨ ਅਕਾਲੀ ਹੱਦ ਦਰਜੇ ਦੇ ਦਲੇਰ ਹੁੰਦੇ ਹਨ ਅਤੇ ਸੁਤੰਤਰ ਵਿਚਰਦੇ ਹਨ।
ਅਕਾਲੀ ਸਿੰਘ ਮਰਨ ਦੇ ਡਰ ਤੋਂ ਨਿਡਰ ਹੋ ਚੁੱਕਾ ਜੀਂਵਦਾ ਸ਼ਹੀਦ ਹੁੰਦਾ ਹੈ।

ਪੁਰਾਤਨ ਸਮੇਂ ਅਕਾਲੀ ਸਿੰਘਾਂ ਦਾ ਵਜੂਦ ਆਪਣੇ ਆਪ ਵਿਚ ਰੂਹਾਨੀ ਖਿੱਚ ਦਾ ਕੇਂਦਰ ਹੁੰਦਾ ਸੀ। ਤਦੋਂ ਲੈਕਚਰ ਤੇ ਉਪਦੇਸ਼ਕਾਂ ਦੇ ਵਖਿਆਨ ਨਹੀਂ ਸੇ ਹੁੰਦੇ; ਬਸ ਤਖਤ ਸ੍ਰੀ ਅਕਾਲ ਬੁੰਗੇ ਆਓ—ਨਾਮ ਰਸ ਰੱਤੇ, ਸ਼ਾਂਤਿ-ਸਰੋਵਰ ਅਕਾਲੀਆਂ ਦੇ ਦਰਸ਼ਨ ਮੇਲੇ ਮਿਕਨਾਤੀਸੀ ਅਸਰ ਪਾ ਕੇ ਗੁਰੂ ਚਰਨਾਂ ਵੱਲ ਖਿੱਚ ਲੈਂਦੇ ਸੀ।

ਅਕਾਲੀ ਜਬਰ-ਧੱਕਾ ਕਦੇ ਨਹੀਂ ਕਰਦੇ। ਜਬਰ ਸਹਿਣਾ, ਜਬਰ ਕਰਨਾ—ਦੁਇ ਗੱਲਾਂ ਤੋਂ ਉਚੇਰੇ ਹੁੰਦੇ ਹਨ। ਪੁਰਾਤਨ ਸਮੇਂ ਤੋਂ ਅਕਾਲੀ ਜਾਂ ਨਿਹੰਗ ਸਿੰਘ ਇਕੋ ਅਰਥ ਵਾਲਾ ਪਦ ਹੈ।`,
    artist: "ਮਨਜੀਤ ਕੌਰ",
    medium: "Miniature Painting Replica",
  },

  "18-jassa-singh-ramgarhia.jpg": {
    titlePa: "ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ",
    descriptionPa: `ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਮਹਾਨ ਸਿੱਖ ਜਰਨੈਲ ਅਤੇ ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ ਦੇ ਬਾਨੀ ਸਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 5 ਮਈ 1723 ਈ. ਨੂੰ ਲਾਹੌਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਇਛੋਗਿਲ ਵਿਖੇ ਗਿਆਨੀ ਭਗਵਾਨ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਉਹਨਾਂ ਦਾ ਪਰਿਵਾਰ ਸ਼ਸਤਰ ਬਣਾਉਣ ਦੀ ਕਿਰਤ ਕਰਦਾ ਸੀ ਅਤੇ ਗੁਰੂ ਘਰ ਵਿੱਚ ਡੂੰਘੀ ਸ਼ਰਧਾ ਰੱਖਦਾ ਸੀ।

ਉਹਨਾਂ ਦੇ ਦਾਦਾ ਭਾਈ ਹਰਦਾਸ ਸਿੰਘ ਨੇ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਤੋਂ ਅੰਮ੍ਰਿਤ ਛਕਿਆ ਸੀ ਅਤੇ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਦੀਆਂ ਲੜਾਈਆਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ ਸੀ। ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਨਾਦਰ ਸ਼ਾਹ ਦੇ ਹਮਲੇ ਦੌਰਾਨ ਉਹਨਾਂ ਦੇ ਪਿਤਾ ਸ਼ਹੀਦ ਹੋ ਗਏ, ਜਿਸ ਤੋਂ ਬਾਅਦ ਜੱਸਾ ਸਿੰਘ ਨੇ ਨੰਦ ਸਿੰਘ ਸੰਘਣੀਆ ਦੇ ਜਥੇ ਵਿੱਚ ਸ਼ਮੂਲੀਅਤ ਕੀਤੀ ਅਤੇ ਜੰਗੀ ਵਿੱਦਿਆ ਵਿੱਚ ਨਿਪੁੰਨਤਾ ਹਾਸਲ ਕੀਤੀ।

ਹਾਲਾਤਾਂ ਕਰਕੇ, ਉਹਨਾਂ ਨੇ ਇੱਕ ਸਮੇਂ ਜਲੰਧਰ-ਦੁਆਬ ਦੇ ਫ਼ੌਜਦਾਰ ਅਦੀਨਾ ਬੇਗ ਦੀ ਨੌਕਰੀ ਵੀ ਕੀਤੀ, ਜਿਸ ਕਾਰਨ ਉਹਨਾਂ ਨੂੰ ਕੁਝ ਸਮੇਂ ਲਈ ਪੰਥ ਤੋਂ ਅਲੱਗ ਵੀ ਸਮਝਿਆ ਗਿਆ। ਪਰ ਜਦੋਂ ਅਕਤੂਬਰ 1748 ਈ. ਵਿੱਚ ਮੀਰ ਮੰਨੂ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਸਿੱਖਾਂ ਨੂੰ ਘੇਰ ਲਿਆ ਅਤੇ 500 ਸਿੰਘਾਂ ਨੇ ਨਵੀਂ ਬਣੀ ਕੱਚੀ ਗੜ੍ਹੀ ‘ਰਾਮ ਰੌਣੀ’ ਵਿੱਚ ਸ਼ਰਨ ਲਈ ਤਾਂ ਜੱਸਾ ਸਿੰਘ ਨੇ ਅਦੀਨਾ ਬੇਗ ਦੀ ਨੌਕਰੀ ਛੱਡ ਕੇ ਦੀਵਾਨ ਕੌੜਾ ਮੱਲ ਰਾਹੀਂ ਘੇਰਾ ਹਟਵਾਇਆ ਅਤੇ ਪੰਥ ਤੋਂ ਮੁਆਫ਼ੀ ਮੰਗ ਕੇ ਦੁਬਾਰਾ ਜਥੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ।

ਸੰਨ 1753 ਈ. ਵਿੱਚ ਮੀਰ ਮੰਨੂ ਦੀ ਮੌਤ ਤੋਂ ਬਾਅਦ ਪੰਜਾਬ ਵਿੱਚ ਅਰਾਜਕਤਾ ਫੈਲ ਗਈ। ਸਿੱਖਾਂ ਨੇ ਆਪਣੀ ਸ਼ਕਤੀ ਸੰਗਠਿਤ ਕਰਨੀ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ। ‘ਰਾਮ ਰੌਣੀ’ ਗੜ੍ਹੀ ਨੂੰ ਦੁਬਾਰਾ ਬਣਾਉਣ ਦਾ ਕੰਮ ਜੱਸਾ ਸਿੰਘ ਨੂੰ ਸੌਂਪਿਆ ਗਿਆ। ਉਹਨਾਂ ਨੇ ਇਸ ਗੜ੍ਹੀ ਦਾ ਨਿਰਮਾਣ ਕਰਵਾ ਕੇ ਇਸਦਾ ਨਾਂ ‘ਰਾਮਗੜ੍ਹ’ ਰੱਖਿਆ। ਇਸ ਦਿਨ ਤੋਂ ਉਹ ‘ਰਾਮਗੜ੍ਹੀਆ’ ਵਜੋਂ ਜਾਣੇ ਜਾਣ ਲੱਗੇ ਅਤੇ ਉਹਨਾਂ ਦੀ ਮਿਸਲ ‘ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ’ ਕਹਿਲਾਈ।

ਉਹਨਾਂ ਨੇ ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ ਨਾਲ ਕਈ ਲੜਾਈਆਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਇੱਕ ਬਹਾਦਰ ਯੋਧਾ ਹੋਣ ਦੇ ਨਾਲ-ਨਾਲ ਇੱਕ ਨੀਤੀਵਾਨ ਜਰਨੈਲ ਅਤੇ ਵਧੀਆ ਪ੍ਰਬੰਧਕ ਵੀ ਸਨ। ਉਹਨਾਂ ਨੇ ਕਾਂਗੜਾ, ਹੁਸ਼ਿਆਰਪੁਰ ਅਤੇ ਰਾਵੀ ਤੇ ਬਿਆਸ ਦਰਿਆਵਾਂ ਦੇ ਵਿਚਕਾਰਲੇ ਖੇਤਰਾਂ ਉੱਤੇ ਅਧਿਕਾਰ ਜਮਾਇਆ ਅਤੇ ਸ੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਨੂੰ ਆਪਣੀ ਰਾਜਧਾਨੀ ਬਣਾਇਆ।

ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਦੀ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਪ੍ਰਾਪਤੀਆਂ ਵਿੱਚੋਂ ਇੱਕ 1783 ਈ. ਵਿੱਚ ਦਿੱਲੀ ਫ਼ਤਿਹ ਕਰਨਾ ਸੀ, ਜਿੱਥੇ ਉਹਨਾਂ ਨੇ ਹੋਰ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨਾਲ ਮਿਲ ਕੇ ਮੁਗਲ ਬਾਦਸ਼ਾਹ ਸ਼ਾਹ ਆਲਮ ਦੂਜੇ ਨੂੰ ਹਰਾਇਆ। ਦਿੱਲੀ ਤੋਂ ਉਹ ਮੁਗਲਾਂ ਦੀ ਤਾਜਪੋਸ਼ੀ ਵਾਲੀ ਪੱਥਰ ਦੀ ਸਿਲ ਲੈ ਕੇ ਆਏ ਜੋ ਅੱਜ ਵੀ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ, ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਰਾਮਗੜ੍ਹੀਆ ਬੁੰਗੇ ਵਿੱਚ ਮੌਜੂਦ ਹੈ।

ਅਖੀਰ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ 80 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ 1803 ਈ. ਵਿੱਚ ਆਪਣੀ ਰਾਜਧਾਨੀ ਸ੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਵਿਖੇ ਅੰਤਿਮ ਸਾਹ ਲਿਆ।`,
    artist: "ਮਨਜੀਤ ਕੌਰ",
    medium: "Miniature Painting Replica",
  },

  "19-18th-century-singh.jpg": {
    titlePa: "੧੮ਵੀਂ ਸਦੀ ਦਾ ਸਿੰਘ",
    descriptionPa: `੧੮ਵੀਂ ਸਦੀ ਦਾ ਸਿੰਘ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਪੜਾਅ ਸੀ। ਇਸ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਆਪਣੀ ਸ਼ਕਤੀ ਨੂੰ ਸੰਗਠਿਤ ਕੀਤਾ ਸੀ। ਇਸ ਸਦੀ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਕਈ ਮਹੱਤਵਪੂਰਨ ਲੜਾਈਆਂ ਲੜੀਆਂ ਅਤੇ ਆਪਣਾ ਰਾਜ ਸਥਾਪਿਤ ਕੀਤਾ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "20-jain-khaan-victory-over-sirhind.jpg": {
    titlePa: "ਜੈਨ ਖਾਨ ਦੀ ਮੌਤ ਤੇ ਸਰਹਿੰਦ ਉੱਤੇ ਕਬਜ਼ਾ",
    descriptionPa: `ਜ਼ੈਨ ਖ਼ਾਨ ਪੰਜਾਬ ਦੇ ਸੂਬੇ ਸਰਹਿੰਦ ਦਾ ਫ਼ੌਜਦਾਰ ਸੀ। ਸੰਨ 1759 ਈਸਵੀ ਵਿੱਚ ਜਦੋਂ ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਨੇ ਕਰੀਮ ਖ਼ਾਨ ਦਾਦ ਨੂੰ ਪੰਜਾਬ ਦਾ ਸੂਬੇਦਾਰ ਥਾਪਿਆ ਤਾਂ ਜ਼ੈਨ ਖ਼ਾਨ ਸਿਆਲਕੋਟ, ਗੁਜਰਾਤ, ਪਸਰੂਰ ਅਤੇ ਔਰੰਗਾਬਾਦ ਚਾਰ ਖੇਤਰਾਂ ਦਾ ਫ਼ੌਜਦਾਰ ਬਣਿਆ। ਇਸ ਤੋਂ ਬਾਅਦ ਜ਼ੈਨ ਖ਼ਾਨ ਸੰਨ 1761 ਈ. ਵਿੱਚ ਸਰਹਿੰਦ ਦਾ ਫ਼ੌਜਦਾਰ (ਕੁਝ ਕੁ ਨੇ ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਸਰਹਿੰਦ ਦਾ ਸੂਬੇਦਾਰ ਦੱਸਿਆ ਹੈ) ਬਣਿਆ। ਇਸ ਨੇ ਸਿੱਖਾਂ ਦੀ ਹੋਂਦ ਖ਼ਤਮ ਕਰਨ ਲਈ 1762 ਈ. ਵਿੱਚ ਕੁੱਪ ਰਹੀੜੇ ਦੇ ਮੁਕਾਮ ‘ਤੇ ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਦੌਰਾਨ ਵਧ-ਚੜ੍ਹ ਕੇ ਹਿੱਸਾ ਲਿਆ।

ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਤੋਂ ਬਾਅਦ ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਅਤੇ ਪਾਵਨ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤ ਸਰੋਵਰ ਦੀ ਬੇਅਦਬੀ ਕਰਦਾ ਹੋਇਆ ਅਫ਼ਗ਼ਾਨਿਸਤਾਨ ਨੂੰ ਵਾਪਸ ਪਰਤ ਗਿਆ। ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਅਤੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਤੋਂ ਬਾਅਦ ਸਿੰਘਾਂ ਨੇ ਦੀਵਾਲੀ ‘ਤੇ ਸਰਬੱਤ ਖ਼ਾਲਸਾ ਕਰਕੇ ਗੁਰਮਤਾ ਕੀਤਾ ਅਤੇ 5 ਨਵੰਬਰ 1763 ਈ. ਨੂੰ ‘ਖ਼ਾਲਸਾ ਜੀ’ ਨੇ ਸਰਹਿੰਦ ਨੂੰ ਕੂਚ ਕੀਤਾ।

ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਰਾਮਗੜ੍ਹੀਆ, ਭੰਗੀ, ਸੁਕਰਚੱਕੀਆ, ਕਨ੍ਹਈਆ ਆਦਿ ਸਿੱਖ ਮਿਸਲਦਾਰਾਂ ਜਨਵਰੀ 1764 ਈ. ਵਿੱਚ ਦੁਆਬਾ ਖੇਤਰ ਤੋਂ ਹੁੰਦੇ ਹੋਏ ਰੋਪੜ ਦੇ ਪੱਤਣ ਤੋਂ ਸਤਲੁਜ ਦਰਿਆ ਨੂੰ ਪਾਰ ਕੀਤਾ। ਸਿੰਘ ਪੰਧ ਮੁਕਾਉਂਦੇ ਹੋਏ ਰੋਪੜ ਤੋਂ ਅੱਗੇ ਥੋੜ੍ਹੀ ਦੂਰੀ ‘ਤੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਅਤੇ ਚਾਲੀ ਸਿੰਘਾਂ ਦੇ ਸ਼ਹੀਦੀ ਅਸਥਾਨ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਜਾ ਇਕੱਤਰ ਹੋਏ।

ਇੱਥੋਂ ਥੋੜ੍ਹੀ ਦੂਰ ਮੋਰਿੰਡਾ ਨਗਰ ਸੀ ਜਿੱਥੋਂ ਦੇ ਰੰਘੜਾਂ ਨੇ ਮਾਤਾ ਜੀ ਅਤੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਦੀ ਮੁਖ਼ਬਰੀ ਕਰਕੇ ਸਰਹਿੰਦ ਦੇ ਸੂਬੇਦਾਰ ਪਾਸ ਗ੍ਰਿਫ਼ਤਾਰੀ ਕਰਵਾਈ ਸੀ। ਓਥੋਂ ਦੇ ਵਸਨੀਕ ਰੰਘੜਾਂ ਨੂੰ ਸੋਧਦੇ ਹੋਏ ਸਿੰਘ ਸਰਹਿੰਦ ਵੱਲ ਨੂੰ ਵਧੇ। 13 ਜਨਵਰੀ 1764 ਈ. ਨੂੰ ਸਿੰਘ ਸਰਹਿੰਦ ਦੇ ਨਜ਼ਦੀਕ ਪਹੁੰਚ ਗਏ।

ਇਸ ਮੌਕੇ ਜ਼ੈਨ ਖ਼ਾਨ ਫ਼ੌਜੀ ਟੁਕੜੀ ਨਾਲ ਚੜ੍ਹਦੇ ਵੱਲ ਉਗਰਾਹੀ ਲਈ ਗਿਆ ਹੋਇਆ ਸੀ। ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਅਤੇ ਹੋਰ ਸਰਦਾਰਾਂ ਨੇ ਵਿਉਂਤ ਬਣਾਈ ਕਿ ਇਸ ਨੂੰ ਸਰਹਿੰਦ ਤੋਂ ਬਾਹਰ ਹੀ ਘੇਰ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ ਤਾਂ ਕਿ ਸਰਹਿੰਦ ‘ਤੇ ਛੇਤੀ ਤੋਂ ਛੇਤੀ ਫ਼ਤਿਹ ਪਾਈ ਜਾ ਸਕੇ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਰੋਕਣ ਲਈ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਬੁੱਢਾ ਦਲ ਅੱਗੇ ਵਧਿਆ ਤੇ ਬੱਸੀ ਨਗਰ ਤੋਂ ਚੜ੍ਹਦੇ ਵੱਲ ਭਾਗਨਪੁਰ ਜਾ ਡੇਰਾ ਲਾਇਆ। ਤਰਨਾ ਦਲ ਦੇ ਨੌਜੁਆਨ ਸਿੰਘਾਂ ਨੇ ਮਨਹੇੜੇ ਜਾ ਪਹਿਰਾ ਦਿੱਤਾ। ਸਿੰਘ ਸਾਰੀ ਰਾਤ ਘੋੜਿਆਂ ‘ਤੇ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਸੁਚੇਤ ਪਹਿਰਾ ਦਿੰਦੇ ਰਹੇ।

14 ਜਨਵਰੀ ਨੂੰ ਜ਼ੈਨ ਖ਼ਾਨ ਨੇ ਮਨਹੇੜੇ ਵੱਲੋਂ ਚੁੱਪ ਚਾਪ ਫ਼ੌਜ ਦੀ ਇੱਕ ਟੁਕੜੀ ਨਾਲ ਸਰਹਿੰਦ ਵੜਨ ਦੀ ਵਿਉਂਤ ਬਣਾਈ। ਉਸ ਨੇ ਬਾਕੀ ਵਹੀਰ ਨੂੰ ਤੋਪ, ਜੰਬੂਰੇ, ਰਹਿਗਲੇ, ਧੌਂਸਾ ਆਦਿ ਦੇ ਕੇ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋਣ ਦਾ ਹੁਕਮ ਕੀਤਾ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੇ ਯੋਜਨਾ ਬਣਾਈ ਕਿ ਜਿਸ ਸਮੇਂ ਉਹ ਮਨਹੇੜੇ ਵੱਲੋਂ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋਵੇਗਾ ਤਾਂ ਉਸੇ ਵੇਲੇ ਵਹੀਰ ਧੌਂਸਾ ਵਜਾ ਦੇਵੇ ਤਾਂ ਜੋ ਸਿੰਘਾਂ ਨੂੰ ਲੱਗੇ ਕਿ ਜ਼ੈਨ ਖ਼ਾਨ ਵਹੀਰ ਨਾਲ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋ ਰਿਹਾ ਹੈ।

ਸਿੰਘ ਅੱਧੀ ਸਦੀ ਤੋਂ ਮੁਗ਼ਲਾਂ ਦੀਆਂ ਚਤੁਰ-ਚਲਾਕੀਆਂ ਤੋਂ ਸੁਚੇਤ ਸਨ। ਵਹੀਰ ਵੱਲੋਂ ਵਜਾਏ ਧੌਂਸੇ ਦੀ ਆਵਾਜ਼ ਸੁਣ ਕੇ ਕੁਝ ਤਰਨਾ ਦਲ ਦੇ ਸਿੰਘ ਅੱਗੇ ਵਧੇ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੇ ਕੁਝ ਸਿਪਾਹੀਆਂ ਨੂੰ ਸਿੰਘਾਂ ਦੁਆਲੇ ਕਰ ਦਿੱਤਾ ਤੇ ਆਪ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋਣ ਲਈ ਅੱਗੇ ਵਧਿਆ। ਅੱਗੇ ਸਿੰਘ ਉਸ ਦੀ ਚਾਲ ਨੂੰ ਭਾਂਪਦਿਆਂ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਖੜ੍ਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਜ਼ੈਨ ਖ਼ਾਨ ‘ਤੇ ਬੰਦੂਕ ਦੀਆਂ ਗੋਲੀਆਂ ਨਾਲ ਵਾਰ ਕਰ ਦਿੱਤਾ ਜਿਸ ਦੌਰਾਨ ਉਹ ਘੋੜੇ ਤੋਂ ਧਰਤੀ ‘ਤੇ ਡਿੱਗ ਪਿਆ।

ਇਸੇ ਦੌਰਾਨ ਹੀ ਮਾੜੀ ਵਾਲੇ ਤਾਰਾ ਸਿੰਘ ਨੇ ਡਿੱਗੇ ਹੋਏ ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਘੇਰ ਲਿਆ ਤੇ ਉਸ ਦਾ ਸਿਰ ਧੜ ਤੋਂ ਅਲੱਗ ਕਰ ਦਿੱਤਾ। ਜ਼ੈਨ ਖ਼ਾਨ ਦੀ ਮੌਤ ਹੋਣ ਦੀ ਹੀ ਦੇਰ ਸੀ ਕਿ ਉਸ ਦੀ ਫ਼ੌਜ ਵਿੱਚ ਭਾਜੜ ਮੱਚ ਗਈ ਤੇ ਉਹ ਸਾਰੇ ਮੈਦਾਨ ਛੱਡ ਕੇ ਭੱਜ ਗਏ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਪਾਰ ਬੁਲਾ ਕੇ ਸਿੰਘ ਸਰਹਿੰਦ ਵੱਲ ਵਧੇ ਅਤੇ ਫ਼ਤਿਹ ਹਾਸਲ ਕੀਤੀ।

ਇਹ ਵੀ ਜ਼ਿਕਰ ਮਿਲਦਾ ਹੈ ਕਿ ਸਿੰਘਾਂ ਨੇ ਸਰਹਿੰਦ ਨੂੰ ਫ਼ਤਿਹ ਕਰਨ ਤੋਂ ਬਾਅਦ ਖੋਤਿਆਂ ਦੇ ਨਾਲ ਵਾਹਿਆ ਸੀ। ਸਿੰਘਾਂ ਦੇ ਹੱਥ ਜੋ ਸ਼ਾਹੀ ਖ਼ਜ਼ਾਨਾ ਆਇਆ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਅਧੀਨ ਕਰ ਲਿਆ ਅਤੇ ਸਰਹਿੰਦ ਦੇ ਆਸਪਾਸ ਦੇ ਇਲਾਕਿਆਂ ‘ਤੇ ਵੀ ਕਬਜ਼ਾ ਕਰ ਲਿਆ। ਇਸ ਪ੍ਰਕਾਰ ਜ਼ੈਨ ਖ਼ਾਨ ਦੀ ਮੌਤ ਅਤੇ ਸਰਹਿੰਦ ਦੀ ਫ਼ਤਿਹ 18ਵੀਂ ਸਦੀ ‘ਚ ਸਿੰਘਾਂ ਦੀ ਵੱਡੀ ਪ੍ਰਾਪਤੀ ਸੀ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "21-patshahi-badshahi.JPG": {
    titlePa: "ਪਾਤਸ਼ਾਹੀ - ਬਾਦਸ਼ਾਹੀ",
    descriptionPa: `ਗੁਰੂ ਖਾਲਸਾ ਪੰਥ ਅਕਾਲ ਪੁਰਖ ਦੀ ਮੌਜ ਨਾਲ ਪ੍ਰਗਟ ਹੋਇਆ ਤੇ ਆਪਣਾ ਮਾਲਕ ਸਿਰਫ਼ ਅਕਾਲ ਪੁਰਖ ਨੂੰ ਮੰਨਦਾ ਹੈ। ਖਾਲਸੇ ਵਲੋਂ ਇਸ ਧਰਤੀ ਦੀ ਅਗਵਾਈ ਦਾ ਕੇਂਦਰ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਹੈ ਤੇ ਉਸਦੀ ਸਲਤਨਤ ਦਾ ਘੇਰਾ ਅਸੀਮ ਹੈ। ਖਾਲਸੇ ਦੀ ਛਤਰ ਛਾਇਆ ਹੇਠ ਦੁਨਿਆਵੀ ਬਾਦਸ਼ਾਹੀਆਂ ਇਕ ਤਵਾਜਨ ਵਿਚ ਵਿਚਰਦੀਆਂ ਰਹੀਆਂ ਨੇ ਤੇ ਅੱਗੋਂ ਵਿਚਰਦੀਆਂ ਰਹਿਣਗੀਆਂ।

ਮਾਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਨੂੰ ਵਜ਼ੀਰ ਨੇ ਬੇਨਤੀ ਕੀਤੀ, “ਪਾਤਿਸ਼ਾਹ, ਆਪ ਸਾਡੇ ਸ਼ਹਿਨਸ਼ਾਹ ਹੋ, ਲੱਕ ਨੂੰ ਪਟਕਾ ਤਾਂ ਸਾਨੂੰ, ਆਪ ਦੇ ਸੇਵਕਾਂ ਨੂੰ ਬੰਨ੍ਹਣਾ ਚਾਹੀਦਾ ਹੈ, ਆਪ ਸ਼ਹਿਨਸ਼ਾਹ ਹੋ ਕੇ ਪਟਕਾ ਕਿਉਂ ਬੰਨਦੇ ਹੋ?”

ਮਹਾਰਾਜੇ ਨੇ ਉੱਤਰ ਦਿੱਤਾ, “ਧਿਆਨ ਸਿੰਘ, ਸਿੱਕਾ ਕਿਸ ਦਾ ਹੈ?”
ਧਿਆਨ ਸਿੰਘ, “ਸਿੱਕਾ ਤਾਂ ਸਰਕਾਰ ਨੇ ਨਾਨਕ-ਸ਼ਾਹੀ ਚਲਾਇਆ ਹੋਇਆ ਹੈ।”
ਸ਼ੇਰਿ-ਪੰਜਾਬ ਹੱਸ ਕੇ ਬੋਲੇ, “ਭਲਿਆ ਲੋਕਾ! ਜਿਸ ਦਾ ਸਿੱਕਾ ਹੋਵੇ ਉਹੋ ਪਾਤਸ਼ਾਹ ਹੁੰਦਾ ਹੈ, ਮੈਂ ਤਾਂ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਦਾ ਅਧਮ ਸੇਵਕ ਹਾਂ ਤੇ ਹਰ ਵੇਲੇ ਉਨ੍ਹਾਂ ਦੇ ਹੁਕਮ ਵਿੱਚ ਲੱਕ ਬੰਨ੍ਹੀ ਹਾਜ਼ਰ ਰਹਿੰਦਾ ਹਾਂ। ਗੁਰੂ ਮਹਾਰਾਜ ਦੀ ਅਪਾਰ ਕਿਰਪਾਲਤਾ ਹੈ ਕਿ ਉਹ ਮੈਥੋਂ ਪੰਥ ਦੀ ਸੇਵਾ ਕਰਵਾ ਰਹੇ ਹਨ। ਮੈਂ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਦੇ ਦਰ ਦਾ ਕੂਕਰ ਹਾਂ, ਪਾਤਸ਼ਾਹ ਸਤਿਗੁਰੂ ਆਪ ਹਨ।”

ਸਰੋਤ: ਬਹੁ-ਮੁੱਲੇ ਇਤਿਹਾਸਕ ਲੇਖ`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "23-darbar-maharaja-ranjit-singh.jpg": {
    titlePa: "ਦਰਬਾਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ",
    descriptionPa: `ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦਾ ਦਰਬਾਰ, ਜਿਸ ਨੂੰ ‘ਦਰਬਾਰ-ਏ-ਖਾਲਸਾ’ ਜਾਂ ‘ਸਰਕਾਰ-ਏ-ਖਾਲਸਾ’ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਸੀ, ਇੱਕ ਅਦਭੁਤ ਅਤੇ ਬਹੁ-ਰੰਗੀ ਕੇਂਦਰ ਸੀ ਜੋ ਉਸ ਦੇ ਵਿਸ਼ਾਲ ਸਿੱਖ ਸਾਮਰਾਜ ਦੀ ਪ੍ਰਤੀਨਿਧਤਾ ਕਰਦਾ ਸੀ। ਲਾਹੌਰ ਕਿਲ੍ਹੇ ਦੇ ਦੀਵਾਨ-ਏ-ਆਮ ਅਤੇ ਖਾਸ ਕਰਕੇ ਸੰਮਨ ਬੁਰਜ ਵਿੱਚ ਲੱਗਣ ਵਾਲਾ ਇਹ ਦਰਬਾਰ, ਉਸ ਸਮੇਂ ਦੇ ਸਭ ਤੋਂ ਖੁਸ਼ਹਾਲ ਅਤੇ ਵਿਵਸਥਿਤ ਦਰਬਾਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਮੰਨਿਆ ਜਾਂਦਾ ਸੀ।

ਮਹਾਰਾਜੇ ਦੇ ਦਰਬਾਰ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਵਿਸ਼ੇਸ਼ਤਾ ਇਸ ਦਾ ਸਾਂਝੀਵਾਲਤਾ ਵਾਲਾ ਰੂਪ ਸੀ, ਜਿਸ ਵਿਚ ਸਿੱਖ ਜਰਨੈਲ (ਹਰੀ ਸਿੰਘ ਨਲਵਾ, ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ), ਹਿੰਦੂ ਡੋਗਰਾ ਵਜ਼ੀਰ (ਧਿਆਨ ਸਿੰਘ, ਗੁਲਾਬ ਸਿੰਘ), ਮੁਸਲਿਮ ਅਧਿਕਾਰੀ (ਫ਼ਕੀਰ ਅਜ਼ੀਜ਼-ਉਦ-ਦੀਨ, ਫ਼ਕੀਰ ਨੂਰ-ਉਦ-ਦੀਨ) ਅਤੇ ਯੂਰਪੀਅਨ ਸੈਨਿਕ ਜਰਨੈਲ (ਜਨਰਲ ਵੈਨਤੂਰਾ, ਜਨਰਲ ਅਲਾਰਡ) ਦਰਬਾਰ ਦੀ ਸ਼ੋਭਾ ਵਧਾਉਂਦੇ ਸਨ। ਇਸ ਵਿਭਿੰਨਤਾ ਨੇ ਦਰਬਾਰ ਨੂੰ ਇੱਕ ਅੰਤਰਰਾਸ਼ਟਰੀ ਅਹਿਮੀਅਤ ਦਿੱਤੀ।

ਮਹਾਰਾਜਾ ਰੋਜ਼ਾਨਾ ਸਵੇਰੇ ਦਰਬਾਰ ਵਿੱਚ ਆਉਂਦੇ ਸਨ। ਦਰਬਾਰ ਦੀ ਕਾਰਵਾਈ ਅਕਸਰ ਸਧਾਰਨ ਅਤੇ ਵਿਹਾਰਕ ਹੁੰਦੀ ਸੀ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਰਿਆਸਤ ਦੇ ਵੱਖ-ਵੱਖ ਹਿੱਸਿਆਂ ਤੋਂ ਆਏ ਅਖ਼ਬਾਰੀ (ਨਿਊਜ਼ਲੈਟਰ) ਸੁਣੇ ਜਾਂਦੇ ਸਨ। ਇਸ ਤੋਂ ਬਾਅਦ ਰਾਜਸੀ ਮਾਮਲੇ, ਫੌਜੀ ਮਸਲੇ, ਮਾਲੀਆ ਰਿਪੋਰਟਾਂ ਅਤੇ ਨਿਆਂ ਨਾਲ ਸਬੰਧਤ ਮੁੱਦੇ ਨਿਪਟਾਏ ਜਾਂਦੇ ਸਨ। ਮਹਾਰਾਜਾ, ਜੋ ਖੁਦ ਅਨਪੜ੍ਹ ਸਨ, ਆਪਣੀ ਤੇਜ਼ ਬੁੱਧੀ ਅਤੇ ਯਾਦ ਸ਼ਕਤੀ ਨਾਲ ਵੱਡੇ-ਵੱਡੇ ਫੈਸਲੇ ਤੁਰੰਤ ਲੈਂਦੇ ਸਨ।

ਭਾਵੇਂ ਮਹਾਰਾਜਾ ਇੱਕ ਤਾਕਤਵਰ ਸ਼ਾਸਕ ਸਨ, ਪਰ ਉਹ ਖੁਦ ਨੂੰ ‘ਸਰਕਾਰ-ਏ-ਖਾਲਸਾ’ ਦਾ ਸੇਵਾਦਾਰ ਮੰਨਦੇ ਸਨ। ਉਹ ਇੱਕ ਸਾਦੀ ਕੁਰਸੀ ‘ਤੇ ਬੈਠਦੇ ਸਨ, ਨਾ ਕਿ ਕਿਸੇ ਸ਼ਾਨਦਾਰ ਤਖ਼ਤ ‘ਤੇ। ਉਹ ਦਰਬਾਰ ਵਿੱਚ ਆਉਣ ਵਾਲੇ ਹਰ ਸ਼ਖਸ ਦਾ ਸਨਮਾਨ ਕਰਦੇ ਸਨ।

ਮਹਾਰਾਜੇ ਦਾ ਦਰਬਾਰ ਸਿਰਫ਼ ਇੱਕ ਰਾਜਨੀਤਿਕ ਅਖਾੜਾ ਹੀ ਨਹੀਂ, ਸਗੋਂ ਕਲਾ, ਸਾਹਿਤ ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਗਤੀਵਿਧੀਆਂ ਦਾ ਕੇਂਦਰ ਵੀ ਸੀ, ਜਿੱਥੇ ਵਿਦਵਾਨਾਂ ਅਤੇ ਕਵੀਆਂ ਨੂੰ ਪੂਰਾ ਸਨਮਾਨ ਮਿਲਦਾ ਸੀ।

ਇਸ ਚਿੱਤਰ ਵਿਚ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੂੰ ਲਾਹੌਰ ਕਿਲ੍ਹੇ ਦੇ ਸੰਮਨ ਬੁਰਜ (ਅੱਠ-ਕੋਣੀ ਬੁਰਜ) ਵਿੱਚ ਸ਼ੀਸ਼ ਮਹਿਲ ਦੇ ਪਵੇਲੀਅਨਾਂ ਦੇ ਬਾਹਰ ਸਥਿਤ ਅੱਠ-ਦਰਾ ਨਾਮਕ ਸੰਗਮਰਮਰ ਦੇ ਪਵੇਲੀਅਨ ਵਿੱਚ ਨਜ਼ਰਾਨਾ (ਭੇਟ) ਪ੍ਰਾਪਤ ਕਰਦੇ ਹੋਏ ਦਿਖਾਇਆ ਗਿਆ ਹੈ। ਸ਼ਾਹੀ ਪਰਿਵਾਰ ਦੇ ਮੈਂਬਰ ਅਤੇ ਦਰਬਾਰੀ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਯੂਰਪੀ ਫੌਜੀ ਅਧਿਕਾਰੀਆਂ ਸਮੇਤ ਰਾਜ ਦੇ ਉੱਚ ਅਧਿਕਾਰੀ ਵੀ ਸ਼ਾਮਲ ਹਨ, ਸਾਰੇ ਮੌਜੂਦ ਹਨ।

ਇਹ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਚਿੱਤਰ, ਹੰਗਰੀ ਦੇ ਕਲਾਕਾਰ ਅਗਸਤ ਸ਼ੋਇਫ਼ਟ (August Schoefft) ਦੀ ਸ਼ਾਹਕਾਰ ਰਚਨਾ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਇਹ ਚਿੱਤਰ 1841 ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਉਸ ਦੁਆਰਾ ਬਣਾਏ ਗਏ ਖਰੜਿਆਂ ਅਤੇ ਡਰਾਇੰਗਾਂ ‘ਤੇ ਅਧਾਰਤ ਹੈ। ਇਸ ਨੂੰ ਉਸਦੇ ਘਰ ਸਟੂਡੀਓ ਵਿੱਚ 1845–1855 ਦੇ ਵਿਚਕਾਰ ਪੂਰਾ ਕੀਤਾ ਗਿਆ ਸੀ।`,
    artist: "ਜਗਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "24-akali-phoola-singh-ji.jpg": {
    titlePa: "ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੇ ਨਿਧੜਕ ਜਥੇਦਾਰ ਅਤੇ 18ਵੀਂ ਸਦੀ ਦੇ ਮਹਾਨ ਸੂਰਬੀਰ ਸਿੱਖ ਜਰਨੈਲ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਪਿਛੋਕੜ ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ ਨਾਲ ਸੰਬੰਧ ਰੱਖਦਾ ਸੀ।

ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ ਦੇ ਸੂਰਬੀਰ ਯੋਧੇ ਸ. ਈਸ਼ਰ ਸਿੰਘ ਅਤੇ ਮਾਤਾ ਹਰਿ ਕੌਰ ਦੇ ਗ੍ਰਿਹ ਦੇਹਲਾ ਸੀਹਾਂ, ਥਾਣਾ ਮੂਣਕ, ਤਹਿਸੀਲ ਸੁਨਾਮ ਜ਼ਿਲ੍ਹਾ ਸੰਗਰੂਰ ਵਿਖੇ ਜਨਵਰੀ 1761 ਈ. ਨੂੰ ਹੋਇਆ।

ਸ. ਈਸ਼ਰ ਸਿੰਘ ਅਬਦਾਲੀ ਦੇ ਛੇਵੇਂ ਹਮਲੇ ਸਮੇਂ ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਦੁਸ਼ਮਣ ਫ਼ੌਜਾਂ ਨਾਲ ਲੋਹਾ ਲੈਂਦੇ ਹੋਏ ਸਖ਼ਤ ਜ਼ਖ਼ਮੀ ਹੋ ਗਏ। ਸਰਦਾਰ ਨੇ ਆਪਣਾ ਅੰਤਿਮ ਸਮਾਂ ਨੇੜੇ ਜਾਣ ‘ਤੇ ਆਪਣੇ ਇੱਕ ਸਾਲ ਦੇ ਸਪੁੱਤਰ ਫੂਲਾ ਸਿੰਘ ਦੀ ਪਰਵਰਿਸ਼ ਸੰਬੰਧੀ ਬਾਬਾ ਨੈਣਾ ਸਿੰਘ ਜੀ ਨੂੰ ਬੇਨਤੀ ਕੀਤੀ ਕਿ ਬਾਲਕ ‘ਤੇ ਰਹਿਮ ਭਰਿਆ ਹੱਥ ਰੱਖ ਕੇ ਸਿੱਖ ਧਰਮ ਦੀ ਸੇਵਾ ਵਾਸਤੇ ਤਿਆਰ ਕਰਨਾ।

ਸ. ਈਸ਼ਰ ਸਿੰਘ ਦੇ ਸ਼ਹੀਦ ਹੋਣ ਪਿੱਛੋਂ ਬਾਬਾ ਨੈਣਾ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਦੇਖ-ਰੇਖ ਵਿੱਚ ਬਾਲਕ ਫੂਲਾ ਸਿੰਘ ਦਾ ਪਾਲਣ-ਪੋਸ਼ਣ ਕੀਤਾ। ਜਥੇਦਾਰ ਬਾਬਾ ਨੈਣਾ ਸਿੰਘ ਜੀ ਦੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਜਥੇ ਦੇ ਸਿੰਘਾਂ ਨੇ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨੂੰ ਸਰਬਸੰਮਤੀ ਨਾਲ ਜਥੇਦਾਰ ਨੀਯਤ ਕਰ ਦਿੱਤਾ। ਜਥੇ ਦੇ ਮੁਖੀ ਵਜੋਂ ਸੇਵਾਵਾਂ ਦੇ ਨਾਲ-ਨਾਲ ਪੰਥ ਨੇ ਆਪ ਨੂੰ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦਾ ਜਥੇਦਾਰ ਵੀ ਥਾਪਿਆ। ਇਸ ਤੋਂ ਇਲਾਵਾ ਆਪ ਜੀ ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਤੇ ਤਲਵੰਡੀ ਸਾਬ੍ਹੋ ਦੇ ਪਵਿੱਤਰ ਅਸਥਾਨਾਂ ਦੀਆਂ ਸੇਵਾਵਾਂ ਵੀ ਕਰਵਾਉਂਦੇ ਰਹੇ।

ਸੰਨ 1800 ਈ. ਵਿੱਚ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੇ ਜਥੇ ਸਮੇਤ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਨਗਰੀ ਵਿੱਚ ਬੁਰਜ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਵਾਲੇ ਅਸਥਾਨ ‘ਤੇ ਆ ਡੇਰਾ ਕੀਤਾ। ਇਸ ਨਗਰੀ ਵਿਖੇ ਭੰਗੀਆਂ ਤੇ ਰਾਮਗੜ੍ਹੀਏ ਸਰਦਾਰਾਂ ਦਾ ਰਾਜ ਸੀ। ਇਸ ਨੂੰ ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਆਪਣੇ ਰਾਜ ਅਧੀਨ ਕਰਨਾ ਚਾਹੁੰਦਾ ਸੀ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "25-sardar-hari-singh-nalwa.jpg": {
    titlePa: "ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲਵਾ",
    descriptionPa: `ਖ਼ਾਲਸਾ ਰਾਜ ਦਾ ਮਹਾਨ ਜਰਨੈਲ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲਵਾ ਬਲਧਾਰੀ ਬਹਾਦਰ ਯੋਧਾ ਸੀ। ਸ਼ੇਰ ਨੂੰ ਮਾਰਨ ਕਰਕੇ ‘ਨਲਵਾ’ ਵਿਸ਼ੇਸ਼ਣ ਉਨ੍ਹਾਂ ਦੇ ਨਾਮ ਨਾਲ ਜੁੜਦਾ ਹੈ। ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਦਾ ਜਨਮ 1791 ਈ. ਨੂੰ ਗੁੱਜਰਾਂਵਾਲਾ (ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਪਿਤਾ ਸ. ਗੁਰਦਿਆਲ ਸਿੰਘ ਅਤੇ ਮਾਤਾ ਧਰਮ ਕੌਰ ਦੇ ਗ੍ਰਹਿ ਹੋਇਆ। ਸ. ਗੁਰਦਿਆਲ ਸਿੰਘ ਸੁਕਰਚੱਕੀਆ ਮਿਸਲ ਦੇ ਕੁਮੇਦਾਨ ਸਨ।

ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨੇ ਤੀਖਣ ਬੁੱਧੀ ਤੇ ਸੂਝ ਦੁਆਰਾ ਸਮੇਂ ਦੀਆਂ ਭਾਸ਼ਾਵਾਂ ਪੰਜਾਬੀ, ਫ਼ਾਰਸੀ ਤੇ ਪਸ਼ਤੋਂ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਿੱਖ ਲਈਆਂ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਸਰੀਰ ਸੁਡੌਲ, ਕੱਦ ਖ਼ਾਸਾ ਉੱਚਾ, ਫੁਰਤੀਲਾ, ਨਾ ਬਹੁਤਾ ਪਤਲਾ ਤੇ ਨਾ ਬਹੁਤਾ ਭਾਰੀ ਸੀ। ਬੁੱਧੀ ਪੱਖੋਂ ਉਹ ਠਰ੍ਹੰਮੇ ਤੇ ਦੂਰ ਅੰਦੇਸ਼ੀ ਵਾਲੇ ਸਨ। ਆਪ ਕਿਸੇ ‘ਤੇ ਪਹਿਲਾਂ ਵਾਰ ਨਹੀਂ ਸਨ ਕਰਦੇ ਤੇ ਜੋ ਉਨ੍ਹਾਂ ‘ਤੇ ਵਾਰ ਕਰਦਾ ਸੀ ਉਸ ਨੂੰ ਬਖ਼ਸ਼ਦੇ ਨਾ।

ਸੰਨ 1805 ਈਸਵੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿਖੇ ਬਸੰਤ ਪੰਚਮੀ ਦੌਰਾਨ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਵੱਲੋਂ ਕਰਵਾਏ ਜੰਗਜੂ ਕਰਤੱਵਾਂ ‘ਚ ਸ. ਹਰੀ ਸਿੰਘ ਨੇ ਜੌਹਰ ਵਿਖਾਏ। ਮਹਾਰਾਜਾ ਨੌਜਵਾਨ ਹਰੀ ਸਿੰਘ ਦੇ ਜੌਹਰ ਵੇਖ ਕੇ ਇੰਨਾ ਪ੍ਰਸੰਨ ਹੋਏ ਕਿ ਉਸ ਨੂੰ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਵਿੱਚ ਭਰਤੀ ਕਰ ਲਿਆ। ਸ. ਹਰੀ ਸਿੰਘ ਨਲਵਾ ਮਹਾਰਾਜਾ ਦੀ ਫ਼ੌਜ ਵਿੱਚ ਛੋਟੇ ਦਰਜੇ ਤੋਂ ਵਧਦੇ ਹੋਏ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਸਭ ਤੋਂ ਵੱਡੇ ਰੁਤਬੇ ਕਮਾਂਡਰ ਇਨ-ਚੀਫ ਤੇ ਗਵਰਨਰ ਦੇ ਅਹੁਦੇ ਤੱਕ ਪਹੁੰਚੇ।

ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲਵਾ ਨੇ ਸੰਨ 1822 ਈ. ਦੇ ਆਸਪਾਸ ਪਠਾਣਾਂ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ ‘ਹਰੀਪੁਰ’ ਨਾਮ ਦਾ ਨਗਰ ਵਸਾਇਆ ਸੀ, ਇਹ ਨਗਰ ਪਾਕਿਸਤਾਨ ਦੇ ਹਜ਼ਾਰਾ ਜ਼ਿਲ੍ਹੇ ਵਿੱਚ ਸੀ ਜੋ ਹੁਣ ਐਬਟਾਬਾਦ, ਮਾਨਸੇਹਰਾ ਅਤੇ ਹਰੀਪੁਰ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਜਾ ਚੁੱਕਾ ਹੈ। ਪਿਸ਼ਾਵਰ ਦੀ ਜਿੱਤ ਤੋਂ ਬਾਅਦ ਸ. ਹਰੀ ਸਿੰਘ ਨੇ ਅਕਤੂਬਰ 1836 ਈ. ਵਿੱਚ ਜਮਰੌਦ ਦਾ ਕਿਲ੍ਹਾ ਤਿਆਰ ਕਰਵਾਇਆ ਜਿਸ ਨੂੰ ‘ਕਿਲ੍ਹਾ ਫ਼ਤਿਹਗੜ੍ਹ’ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਸੀ।

ਸ. ਹਰੀ ਸਿੰਘ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਤੋਂ ਕਾਬਲ ਦਾ ਹਾਕਮ ਅਮੀਰ ਦੋਸਤ ਮੁਹੰਮਦ ਖ਼ਾਨ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਸੀ। ਉਸ ਨੂੰ ਕਾਬਲ ਉੱਤੇ ਖ਼ਤਰੇ ਦੇ ਬੱਦਲ ਦਿਸ ਰਹੇ ਸਨ ਜਿਸ ਕਾਰਨ ਉਸ ਨੇ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਵਿਰੁੱਧ ਲਾਮਬੰਦੀ ਦੀਆਂ ਤਿਆਰੀਆਂ ਆਰੰਭ ਕਰ ਲਈਆਂ ਸਨ। ਦੋਸਤ ਮੁਹੰਮਦ ਖ਼ਾਨ ਨੇ ਤਿਆਰੀਆਂ ਤੋਂ ਬਾਅਦ ਅਫ਼ਗ਼ਾਨਿਸਤਾਨ ਦੇ ਚੰਗੇ ਪ੍ਰਬੰਧਕ ਮਿਰਜ਼ਾ ਮੀ ਖਾਨ ਨੂੰ ਆਪਣੇ ਲਸ਼ਕਰ ਦਾ ਆਗੂ ਥਾਪਿਆ ‘ਤੇ ਅਪ੍ਰੈਲ 1837 ਈ. ਵਿੱਚ ਜਮਰੌਦ ਦੇ ਕਿਲ੍ਹੇ ‘ਤੇ ਚੜ੍ਹਾਈ ਕਰ ਦਿੱਤੀ।

ਸ. ਹਰੀ ਸਿੰਘ ਆਪਣੀ ਸਿਹਤ ਦਾ ਖ਼ਿਆਲ ਨਾ ਕਰਦੇ ਹੋਏ ਪਿਸ਼ਾਵਰ ਵੱਲ ਨੂੰ ਵਧੇ। ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਨੂੰ ਤਿੰਨ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡ ਲਿਆ। ਇਕ ਹਿੱਸਾ ਆਪਣੇ ਅਧੀਨ ਕਰਕੇ ਦੂਜਾ ਸ. ਨਿਧਾਨ ਸਿੰਘ ਪੰਜਹੱਥਾ ਤੇ ਤੀਜਾ ਸ. ਅਮਰ ਸਿੰਘ ਮਜੀਠੀਆ ਦੇ ਸਪੁਰਦ ਕਰਕੇ ਜਾ ਵੈਰੀ ਦਲ ‘ਤੇ ਹੱਲਾ ਬੋਲਿਆ। ਉਨ੍ਹਾਂ ਨੇ ਹਮਲਾ ਏਨੀ ਫੁਰਤੀ ਨਾਲ ਕੀਤਾ ਕਿ ਅਫ਼ਗ਼ਾਨ ਫ਼ੌਜ ਦੀਆਂ ਸਫ਼ਾਂ ਚੀਰਦੇ ਹੋਏ ਸਿਰੇ ਤੱਕ ਪਹੁੰਚ ਗਏ। ਇਹ ਵੇਖ ਅਫ਼ਗ਼ਾਨ ਘਬਰਾ ਕੇ ਦਰਾ ਖ਼ੈਬਰ ਵੱਲ ਨਿਕਲ ਗਏ ਤੇ ਖ਼ਾਲਸੇ ਦੀ ਜਿੱਤ ਹੋਈ।

ਜ਼ਿਕਰ ਮਿਲਦਾ ਹੈ ਕਿ ਇਸੇ ਦੌਰਾਨ ਹੀ ਸ. ਹਰੀ ਸਿੰਘ ਨੂੰ ਲੁਕੇ ਹੋਏ ਗਾਜੀਆਂ ਨੇ ਦੋ ਗੋਲੀਆਂ ਨਾਲ ਗੰਭੀਰ ਜ਼ਖ਼ਮੀ ਕਰ ਦਿੱਤਾ। ਆਪ ਸ. ਅਮਰ ਸਿੰਘ ਨੂੰ ਨਿਧਾਨ ਸਿੰਘ ਦੀ ਮਦਦ ਦਾ ਆਦੇਸ਼ ਕਰ ਕੇ ਜਮਰੌਦ ਦੇ ਕਿਲ੍ਹਾ ਅੰਦਰ ਆ ਗਏ ਜਿੱਥੇ 30 ਅਪ੍ਰੈਲ 1837 ਈ. ਨੂੰ ਹੀ ਆਪ ਸ਼ਹੀਦੀ ਪਾ ਗਏ। ਸਰਦਾਰ ਦੀ ਸ਼ਹੀਦੀ ਦੀ ਖ਼ਬਰ ਕਿਲ੍ਹੇ ਤੋਂ ਬਾਹਰ ਨਾ ਕੱਢੀ ਗਈ।

ਜਦ ਉਨ੍ਹਾਂ ਦੀ ਸ਼ਹੀਦੀ ਦੀ ਖ਼ਬਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੂੰ ਮਿਲੀ ਤਾਂ ਉਹ ਡਾਢਾ ਦੁਖੀ ਹੋਏ। ਮਹਾਰਾਜਾ ਨੇ ਬੋਲ ਕਹੇ ਕਿ “ਅੱਜ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਕਿਲ੍ਹੇ ਦਾ ਭਾਰੀ ਬੁਰਜ ਢਹਿ ਗਿਆ ਹੈ, ਮੇਰੇ ਬਹਾਦਰ ਤੇ ਸੁਘੜ ਸਿਆਣੇ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਦਾ ਵਿਛੋੜਾ ਮੇਰੇ ਲਈ ਅਸਹਿ ਹੈ।”`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "26-maharani-jind-kaur.jpg": {
    titlePa: "ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ",
    descriptionPa: `ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਪਤਨੀ ਅਤੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਆਖ਼ਰੀ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਦੀ ਮਾਂ ਸੀ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨਾਲ ਵਿਆਹ ਤੋਂ ਪਹਿਲਾਂ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਜੀਵਨ ਸਮਾਚਾਰ ਬਹੁਤੇ ਨਹੀਂ ਮਿਲਦੇ।

‘ਗੁਰਸ਼ਬਦ ਰਤਨਾਕਰ ਮਹਾਨ ਕੋਸ਼’ ਵਿੱਚ ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ ਨੇ ਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਜੀਵਨ ਕਾਲ ‘ਤੇ ਝਾਤ ਪਾਉਂਦਿਆਂ ਲਿਖਿਆ ਹੈ ਕਿ “ਜਿੰਦ ਕੌਰ ਪਿੰਡ ਚਾੜ ਜ਼ਿਲ੍ਹਾ ਸਿਆਲਕੋਟ, ਤਹਿਸੀਲ ਜ਼ਫਰਵਾਲ ਦੇ ਨਿਵਾਸੀ ਸ. ਮੰਨਾ ਸਿੰਘ ਦੀ ਪੁੱਤਰੀ ਸੀ” ਜਿਸ ਦਾ ਜਨਮ 1817 ਈ. ਨੂੰ ਹੋਇਆ।

ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦਾ ਜੀਜਾ ਜਵਾਲਾ ਸਿੰਘ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਫ਼ੌਜ ਵਿੱਚ ਅਹਿਲਕਾਰ ਸੀ। ਉਸ ਨੇ ਹੀ ਉਸ ਦਾ ਰਿਸ਼ਤਾ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨਾਲ ਕਰਵਾਇਆ ਸੀ। ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦਾ ਵਿਆਹ 1835 ਈ. ਵਿੱਚ ਹੋਇਆ। 6 ਸਤੰਬਰ 1838 ਈ. ਨੂੰ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੀ ਕੁੱਖੋਂ ਦਲੀਪ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ। ਜੂਨ 1839 ਈ. ‘ਚ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਵਫ਼ਾਤ ਪਾ ਗਏ। ਖ਼ਾਲਸਾ ਦਰਬਾਰ ‘ਚ ਡੋਗਰਿਆਂ ਨੇ ਸਾਜ਼ਿਸ਼ਾਂ ਦਾ ਜਾਲ ਵਿਛਾ ਦਿੱਤਾ।

ਅਖੀਰ 18 ਸਤੰਬਰ 1843 ਈ. ਨੂੰ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੀ ਸਰਪ੍ਰਸਤੀ ਹੇਠ ਕੰਵਰ ਦਲੀਪ ਸਿੰਘ ਪੰਜਾਬ ਦਾ ਮਹਾਰਾਜਾ ਬਣਿਆ। ਡੋਗਰਿਆਂ ਦੀਆਂ ਸਾਜ਼ਿਸ਼ਾਂ ਨਾਲ ਨਜਿੱਠਣ ਲਈ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੇ ਮੰਤਰੀ ਮੰਡਲ ਵਿੱਚ ਕਈ ਅਦਲਾ-ਬਦਲੀਆਂ ਕੀਤੀਆਂ। ਉਸ ਨੇ ਆਪਣੇ ਭਰਾ ਜਵਾਹਰ ਸਿੰਘ ਤੇ ਰਾਜਾ ਗੁਲਾਬ ਸਿੰਘ ਨੂੰ ਵਜ਼ੀਰ ਬਣਾਇਆ। ਖ਼ਾਲਸਾ ਦਰਬਾਰ ਵਿੱਚ ਦੇਸ਼ ਧ੍ਰੋਹੀਆਂ ਤੇ ਗ਼ਦਾਰਾਂ ਦੀ ਗਿਣਤੀ ਬਹੁਤ ਵੱਧ ਗਈ ਸੀ, ਇਸ ਕਾਰਨ ਅੰਗਰੇਜ਼ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਤਾਕ ਵਿੱਚ ਯੁੱਧ ਲਈ ਤਿਆਰ ਬੈਠੇ ਸਨ।

ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਰਾਜ ਪ੍ਰਬੰਧਾਂ ਨੂੰ ਵੇਖ ਕੇ ਅੰਗਰੇਜ਼ਾਂ ਨੇ ਅਨੁਮਾਨ ਲਗਾ ਲਿਆ ਕਿ ਮਹਾਰਾਣੀ ਦੇ ਹੁੰਦਿਆਂ ਪੰਜਾਬ ‘ਤੇ ਕਬਜ਼ਾ ਕਰਨਾ ਮੁਸ਼ਕਿਲ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਪਹਿਲਾਂ ਰਾਜਸੀ ਤੌਰ ‘ਤੇ ਮਹਾਰਾਣੀ ਨੂੰ ਕਮਜ਼ੋਰ ਕਰਨਾ ਸ਼ੁਰੂ ਕੀਤਾ। ਪਰ ਮਹਾਰਾਣੀ ਹਰ ਹੀਲੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੜ੍ਹਦੀ ਕਲਾ ਵੇਖਣੀ ਚਾਹੁੰਦੀ ਸੀ। ਸਭਰਾਵਾਂ ਦੀ ਜੰਗ ਦੌਰਾਨ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਕਹਿਣ ‘ਤੇ ਸ. ਸ਼ਾਮ ਸਿੰਘ ਅਟਾਰੀ ਵਾਲੇ ਨੇ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਦੀ ਅਗਵਾਈ ਕੀਤੀ।

ਆਖੀਰ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੂੰ 19 ਅਗਸਤ 1847 ਈ. ‘ਚ ਲਾਹੌਰ ਤੋਂ ਸ਼ੇਖ਼ੂਪੁਰਾ ਭੇਜ ਦਿੱਤਾ ਤੇ ਫਿਰ ਮਈ 1848 ਨੂੰ ਬਨਾਰਸ ਭੇਜਿਆ ਗਿਆ। ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੂੰ ਕੈਦ ਵਿੱਚ ਵੀ ਬੇਇੱਜ਼ਤ ਕੀਤਾ ਜਾਣ ਲੱਗਾ। ਬਨਾਰਸ ਦੇ ਕਿਲ੍ਹੇ ਤੋਂ ਮਹਾਰਾਣੀ ਨੂੰ ਚਿਨਾਰ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚ ਭੇਜ ਦਿੱਤਾ ਗਿਆ। 18 ਅਪ੍ਰੈਲ 1849 ਈ. ਨੂੰ ਮਹਾਰਾਣੀ ਅੱਧੀ ਰਾਤ ਵੇਲੇ ਭੇਟ ਵਟਾ ਕੇ ਚਿਨਾਰ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚੋਂ ਅਜ਼ਾਦ ਹੋ ਗਈ। ਉਹ ਭਟਕਦੀ ਹੋਈ ਨੇਪਾਲ ਦੇ ਰਾਣਾ ਜੰਗ ਬਹਾਦਰ ਕੋਲ ਪਹੁੰਚੀ।

ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੇਪਾਲ ਵਿੱਚ ਰਹਿੰਦੀ ਹੋਈ ਵੀ ਪੰਜਾਬ ਤੇ ਭਾਰਤ ਦੇ ਦੂਜੇ ਹਿੱਸਿਆਂ ਵਿੱਚ ਅੰਗਰੇਜ਼ਾਂ ਵਿਰੁੱਧ ਬਗ਼ਾਵਤ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ ਹੱਲਾਸ਼ੇਰੀ ਦਿੰਦੀ ਰਹੀ। ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨੂੰ ਯਕੀਨ ਹੋ ਗਿਆ ਕਿ ਮਹਾਰਾਣੀ ਨੂੰ ਬਾਗ਼ੀ ਕਾਰਵਾਈਆਂ ਤੋਂ ਰੋਕਣ ਦਾ ਇਕੋ-ਇਕ ਤਰੀਕਾ ਹੈ ਕਿ ਉਸ ਦਾ ਧਿਆਨ ਦੇਸ ਪੰਜਾਬ ਵੱਲੋਂ ਹਟਾ ਲਿਆ ਜਾਵੇ। ਇਸੇ ਕਰਕੇ ਸੰਨ 1860 ਈ. ਵਿੱਚ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਆਗਿਆ ਕੀਤੀ ਕਿ ਆਪਣੀ ਮਾਤਾ ਨਾਲ ਚਿੱਠੀ ਪੱਤਰ ਕਰਕੇ ਉਸ ਨੂੰ ਇੰਗਲੈਂਡ ਲੈ ਆਵੇ।

ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੀ ਆਖ਼ਰੀ ਸਫਲਤਾ ਇਹੋ ਸੀ ਕਿ ਉਸ ਨੇ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਸਿੱਖੀ ਸਿਦਕ ਦ੍ਰਿੜ੍ਹ ਕਰਵਾਇਆ। ਮਹਾਰਾਣੀ ਦਾ ਪ੍ਰਭਾਵ ਤੇ ਮਹਾਨ ਸ਼ਖ਼ਸੀਅਤ ਹੀ ਸੀ ਜਿਸ ਨੇ ਆਪਣੇ ਸਪੁੱਤਰ ਨੂੰ ਆਪਣਾ ਫ਼ਰਜ਼ ਪਛਾਣਨ ਲਈ ਰਾਜ਼ੀ ਕਰ ਲਿਆ ਸੀ।

ਇਤਿਹਾਸ ਵਿੱਚ ਉਸ ਦਾ ਵਿਸ਼ੇਸ਼ ਵਰਣਨ ਇਸ ਕਰਕੇ ਵੀ ਹੋਇਆ ਕਿ ਉਹ ਪੰਜਾਬ ‘ਤੇ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਕਬਜ਼ੇ ਵਿਰੁੱਧ ਸੰਘਰਸ਼ ਕਰਦੀ ਰਹੀ। ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਹਰ ਜ਼ੁਲਮ, ਧੱਕੇ ਤੇ ਬੇਇਨਸਾਫ਼ੀ ਵਿਰੁੱਧ ਆਵਾਜ਼ ਉਠਾਉਂਦੀ ਰਹੀ ਤੇ ਜੇ ਉਸ ‘ਤੇ ਇਸ ਸੁਭਾਅ ਕਰਕੇ ਮੁਸੀਬਤਾਂ ਦੇ ਪਹਾੜ ਟੁੱਟੇ ਤਾਂ ਉਸ ਨੇ ਬਰਦਾਸ਼ਤ ਕੀਤੇ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "27-kunwar-nau-nihal-singh.jpg": {
    titlePa: "ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ",
    descriptionPa: `ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦਾ ਜਨਮ 1821 ਈ. ਵਿੱਚ ਮਹਾਰਾਜਾ ਖੜਕ ਸਿੰਘ ਦੇ ਘਰ ਮਹਾਰਾਣੀ ਚੰਦ ਕੌਰ ਦੀ ਕੁਖੋਂ ਹੋਇਆ। ਮਹਾਰਾਜਾ ਖੜਕ ਸਿੰਘ ਸ਼ੇਰੇ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਵੱਡੇ ਸਪੁੱਤਰ ਸਨ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਆਪਣੇ ਪੋਤਰੇ ਦੀ ਪਾਲਣਾ-ਪੋਸ਼ਣਾ ਆਪਣੀ ਨਿਗਰਾਨੀ ਵਿੱਚ ਕਰਵਾਈ।

ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਨੇ ਗੁਰਮੁਖੀ, ਫਾਰਸ਼ੀ ਭਸ਼ਾਵਾਂ ਤੇ ਸਿੱਖ ਇਤਿਹਾਸ ਅਤੇ ਮਰਯਾਦਾ ਸਬੰਧੀ ਤਾਲੀਮ ਗਿਆਨੀ ਸੰਤ ਸਿੰਘ ਅਤੇ ਸ਼ਸ਼ਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਸ੍ਰ. ਹਰੀ ਸਿੰਘ ਨਲਵਾ, ਸ੍ਰ. ਲਹਿਣਾ ਸਿੰਘ ਮਜੀਠੀਆ, ਜਨਰਲ ਵੈਤੂਰਾ ਮਹਾਨ ਜਰਨੈਲਾਂ ਪਾਸੋਂ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ।

ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਆਪਣੇ ਪੋਤਰੇ ਦੇ ਫੁਰਤੀਲੇ ਅਤੇ ਸ਼ਸ਼ਤਰ ਵਿਦਿਆ ਦੇ ਅਭਿਆਸ ਵਿੱਚ ਪ੍ਰਪੱਕਤਾ ਨੂੰ ਵੇਖ ਕੇ ਸਿੱਖ ਸੈਨਾ ਵਿੱਚ ‘ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ’ ਨਾਮ ਦੀ ਟੁਕੜੀ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ। ਇਸ ਸੈਨਾ ਵਿੱਚ ਪੰਜਾਬ ਦੇ ਚੋਣਵੇਂ ਨੌਜਵਾਨਾਂ ਨੂੰ ਭਰਤੀ ਕਰਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸਿੱਖ ਰਾਜ ਦੀ ਰੱਖਿਆ ਲਈ ਵਿਸ਼ੇਸ਼ ਸਿਖਲਾਈ ਦਿੱਤੀ ਜਾਂਦੀ ਸੀ।

ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਨੂੰ ਛੋਟੀ ਉਮਰੇ ਹੀ ਜੰਗੀ ਮੁਹਿੰਮਾਂ ‘ਤੇ ਭੇਜਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ ਸੀ। ਆਪ ਨੂੰ 1834 ਈ. ਵਿੱਚ ਪਿਸ਼ਾਵਰ ਦੀ ਜੰਗ ਵਿੱਚ ਭੇਜਿਆ ਅਤੇ ਪਿਸ਼ਾਵਰ ਤੇ ਅਟਕ ਦਾ ਮੁੱਖ ਪ੍ਰਬੰਧਕ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ।

ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਜਿਥੇ ਰਾਜ ਪ੍ਰਬੰਧਕੀ ਤੌਰ ‘ਤੇ ਯੋਗ ਕਾਰਜ ਕਰ ਰਿਹਾ ਸੀ ਉਥੇ ਆਪ ਹਮੇਸ਼ਾ ਗੁਰਧਾਮਾਂ ਤੇ ਧਾਰਮਿਕ ਅਸਥਾਨਾਂ ਦੀ ਸੇਵਾ ਲਈ ਤਤਪਰ ਤੇ ਯਤਨਸ਼ੀਲ ਰਹਿੰਦੇ ਸਨ। ਜਦੋਂ ਆਪ 1834 ਈ. ਵਿੱਚ ਪਿਸ਼ਾਵਰ ਦਾ ਗਵਰਨਰ ਬਣਨ ਉਪਰੰਤ ਪਹਿਲੀ ਵਾਰ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਦੀ ਸਮਾਧ ‘ਤੇ ਗਏ ਤਾਂ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੁਆਰਾ ਲਗਾਈ ਜਾਗੀਰ ਨੂੰ ਦੁੱਗਣਾ ਕਰ ਦਿੱਤਾ। 1839 ਈ. ਵਿੱਚ ਕਾਬਲ ਦੀ ਮੁਹਿੰਮ ‘ਤੇ ਜਾਣ ਤੋਂ ਪਹਿਲਾ ਤਰਨ ਤਾਰਨ ਸਰੋਵਰ ਦੀਆਂ ਚਾਰੇ ਨੁਕਰਾਂ ਵਿੱਚ ਉੱਚੇ ਮੀਨਾਰ ਬਣਾਏ ਸਨ। ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ (ਪ੍ਰਕਰਮਾ) ਪੱਥਰ ਬਗਾਉਣ ਦੀ ਸੇਵਾ ਕਰਵਾਈ।

ਕੰਵਰ ਅਜੇ ਬਾਲਕ ਹੀ ਸੀ ਕਿ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਅਚਨਚੇਤ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦਾ ਪਿਤਾ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਰਾਜਗੱਦੀ ‘ਤੇ ਬੈਠਾ। ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਨੇ ਰਾਜ ਭਾਗ ਨੂੰ ਸੁਚੱਜੇ ਢੰਗ ਨਾਲ ਚਲਾਉਣ ਲਈ ਆਪਣੇ ਪਿਤਾ ਦੀ ਹਰ ਯੋਗ ਮਦਦ ਕੀਤੀ।

ਸ੍ਰ. ਚੇਤ ਸਿੰਘ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਦਾ ਪ੍ਰਮੁੱਖ ਮੰਤਰੀ ਸੀ। ਡੋਗਰਾ ਧਿਆਨ ਸਿੰਘ ਨੂੰ ਰਾਜਗੱਦੀ ਦਾ ਲਾਲਚ ਸੀ। ਇਸ ਲਈ ਉਹ ਸ੍ਰ. ਚੇਤ ਸਿੰਘ ਅਤੇ ਕੰਵਰ ਜੀ ਦੀ ਸਿੱਖ ਦਰਬਾਰ ਵਿੱਚ ਪਹੁੰਚ ਨੂੰ ਬਰਦਾਸਤ ਨਹੀਂ ਸੀ ਕਰ ਪਾ ਰਿਹਾ।

ਸ੍ਰ. ਚੇਤ ਸਿੰਘ ‘ਤੇ ਬੇਬੁਨਿਆਦ ਇਲਜ਼ਾਮ ਲਾਉਂਦਿਆਂ ਉਸ ਨੂੰ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਦੇ ਸਾਹਮਣੇ ਹੀ ਕਤਲ ਕਰ ਦਿੱਤਾ। ਧਿਆਨ ਸਿੰਘ ਨੇ ਕੰਵਰ ਦੇ ਕੰਨ ਭਰਦਿਆਂ ਆਖਿਆ ਕਿ “ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਲਾਹੌਰ ਦਾ ਰਾਜ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਹਵਾਲੇ ਕਰ ਦੇਣਾ ਚਾਹੁੰਦਾ ਹੈ।” ਇਨ੍ਹਾਂ ਗੱਲਾਂ ਨੇ ਪਿਤਾ-ਪੁੱਤਰ ਵਿੱਚ ਫਿੱਕ ਪਾ ਦਿੱਤੀ।

ਕੰਵਰ ਨੇ ਆਪਣੇ ਪਿਤਾ ਨੂੰ ਨਜ਼ਰਬੰਦ ਕਰਕੇ ਰਾਜ ਭਾਗ ਦਾ ਕੰਮ ਸੰਭਾਲ ਲਿਆ। 5 ਨਵੰਬਰ 1840 ਈ. ਨੂੰ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ।

ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਆਪਣੇ ਪਿਤਾ ਦਾ ਸਸਕਾਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਸਮਾਧ ਕੋਲ ਕਰਕੇ ਅਜੇ ਕਿਲ੍ਹੇ ਨੂੰ ਵਾਪਸ ਆ ਹੀ ਰਹੇ ਸਨ ਕਿ ਹਜ਼ੂਰੀ ਬਾਗ ਦੇ ਉਤਰੀ ਦਰਵਾਜੇ ਦਾ ਸੱਜਾ (ਸਾਜ਼ਿਸ਼ ਅਧੀਨ ਸੁੱਟਿਆ) ਕੰਵਰ ‘ਤੇ ਡਿਗਿਆ। ਕੰਵਰ ਜੀ ਨੂੰ ਮਾਮੂਲੀ ਸੱਟਾਂ ਹੀ ਲੱਗੀਆਂ ਸਨ ਪਰ ਧਿਆਨ ਸਿੰਘ ਨੇ ਆਪਣੇ ਬੰਦਿਆਂ ਰਾਹੀਂ ਕੰਵਰ ਜੀ ਦਾ ਕਤਲ ਕਰਵਾ ਦਿੱਤਾ। ਇਹ ਵਰਤਾਰਾ 8 ਨਵੰਬਰ 1840 ਈ. ਵਾਪਰਿਆ।

ਇਸ ਤਰ੍ਹਾਂ ਇਕ ਯੋਗ ਰਾਜਾ ਡੋਗਰਿਆਂ ਨੇ ਸਾਜ਼ਿਸ਼ ਅਧੀਨ ਆਪਣੀਆਂ ਲਾਲਸਾਵਾਂ ਦੀ ਪੂਰਤੀ ਲਈ ਖ਼ਾਲਸਾ ਪੰਥ ਕੋਲੋਂ ਖੋਹ ਲਿਆ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "28-maharaj-duleep-singh.jpg": {
    titlePa: "ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ",
    descriptionPa: `ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਸੱਤ ਪੁੱਤਰ ਸਨ; ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਸਭ ਤੋਂ ਛੋਟੇ ਸਨ। ਆਪ ਦਾ ਜਨਮ 5 ਫਰਵਰੀ 1837 ਈ. ਵਿੱਚ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਜੀ ਦੀ ਕੁੱਖੋਂ ਹੋਇਆ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਅਕਾਲ ਚਲਾਣੇ ਸਮੇਂ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਅਜੇ ਇੱਕ ਸਾਲ ਦੇ ਵੀ ਨਹੀਂ ਸਨ।

ਮਹਾਰਾਜਾ ਖੜਕ ਸਿੰਘ ਤੇ ਕੰਵਰ ਨੌ ਨਿਹਾਲ ਸਿੰਘ ਦੀ ਮੌਤ ਪਿੱਛੋਂ ਮਹਾਰਾਜਾ ਸ਼ੇਰ ਸਿੰਘ ਤਖ਼ਤ ‘ਤੇ ਬੈਠਾ ਪਰ ਥੋੜੇ ਦਿਨਾਂ ਵਿੱਚ ਮਹਾਰਾਜਾ ਸ਼ੇਰ ਸਿੰਘ, ਕੰਵਰ ਪ੍ਰਤਾਪ ਸਿੰਘ, ਅਜੀਤ ਸਿੰਘ ਸੰਧਾਵਾਲੀਆ ਆਦਿ ਨੂੰ ਹੀਰਾ ਸਿੰਘ ਡੋਗਰੇ ਨੇ ਕਤਲ ਕਰ ਦਿੱਤਾ।

ਹੀਰਾ ਸਿੰਘ ਡੋਗਰੇ ਨੇ ਲਾਹੌਰ ਦਰਬਾਰ ਨੂੰ ਆਪਣੇ ਹੱਥ ਵਿੱਚ ਲੈਂਦਿਆਂ ਬਾਲਕ ਦਲੀਪ ਸਿੰਘ ਨੂੰ (ਜਿਸ ਦੀ ਉਮਰ ਮਹਿਜ ਪੰਜ ਕੁ ਸਾਲ ਦੀ ਸੀ) 16 ਦਸੰਬਰ 1843 ਨੂੰ ਆਪਣੇ ਖੂਨ ਦਾ ਤਿਲਕ ਲਾ ਕੇ ਰਾਜਗੱਦੀ ‘ਤੇ ਬਿਠਾ ਕੇ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੂੰ ਸਰਬਰਾਹ ਤੇ ਆਪਣੇ ਆਪ ਨੂੰ ਵਜ਼ੀਰ ਹੋਣ ਦਾ ਐਲਾਨ ਕਰ ਦਿੱਤਾ। ਹੀਰਾ ਸਿੰਘ ਨੇ ਬੜੀ ਚਲਾਕੀ ਨਾਲ ਆਪਣੇ ਰਾਹ ਵਿੱਚ ਅੜਨ ਵਾਲੇ ਹਰ ਉਸ ਸਿੱਖ ਸਰਦਾਰ ਦਾ ਕਤਲ ਕਰਵਾਇਆ, ਜਿਸ ਤੋਂ ਉਸ ਨੂੰ ਖਤਰਾ ਮਹਿਸੂਸ ਹੁੰਦਾ। 2 ਦਸੰਬਰ 1844 ਈ. ਨੂੰ ਹੀਰਾ ਸਿੰਘ ਡੋਗਰਾ ਸਿੱਖ ਫੌਜ ਹੱਥੋਂ ਮਾਰਿਆ ਗਿਆ ਅਤੇ ਸਾਰੀ ਤਾਕਤ ਮਿਸਰ ਲਾਲ ਸਿੰਘ ਦੇ ਹੱਥ ਵਿੱਚ ਆ ਗਈ।

ਪੰਜਾਬ ਵਿੱਚ ਰਾਜਨੀਤਕ ਤੌਰ ‘ਤੇ ਭਾਰੀ ਉਥਲ-ਪੋਥਲ ਚੱਲ ਰਹੀ ਸੀ। ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਪੰਜਾਬ ਦੀ ਰਾਜਨੀਤੀ ‘ਤੇ ਗਹਿਰੀ ਨਿਗਾਹ ਰੱਖ ਰਹੀ ਸੀ। ਉਹ ਤਾਂ ਪਹਿਲਾਂ ਹੀ ‘ਪਾੜੋ ਤੇ ਰਾਜ ਕਰੋ’ ਨੀਤੀ ‘ਤੇ ਚੱਲ ਰਹੀ ਸੀ। ਲਾਹੌਰ ਦਰਬਾਰ ਦੀ ਆਪਸੀ ਖਾਨਾਜੰਗੀ ਅਤੇ ਸਿੱਖ ਗਦਾਰਾਂ ਨੇ ਸਿੱਖ ਰਾਜ ਸਕਤੀ ਨੂੰ ਕਾਫੀ ਹੱਦ ਤੱਕ ਕਮਜ਼ੋਰ ਕਰ ਦਿੱਤਾ। ਸਿੱਖ ਫੌਜ ਵੀ ਕਈ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡੀ ਹੋਈ ਸੀ।

ਸਭਰਾਵਾਂ ਦੀ ਜੰਗ ਪਿੱਛੋਂ ਲਾਹੌਰ ਦਰਬਾਰ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਵਿਚਕਾਰ ‘ਭਰੋਵਾਲ ਦੀ ਸੰਧੀ’ ਹੋਈ, ਜਿਸ ਅਨੁਸਾਰ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਦੇ ਅਧਿਕਾਰੀ ਬਾਲਕ ਦਲੀਪ ਸਿੰਘ ਦੀ ਰੱਖਿਆ ਅਤੇ ਪੰਜਾਬ ਵਿੱਚ ਮਾਹੌਲ ਨੂੰ ਸਾਜਗਾਰ ਬਣਾਉਣਗੇ। ਪਰ ਅਧਿਕਾਰੀਆਂ ਨੇ ਹੌਲੀ-ਹੌਲੀ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਤੇ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਵਿੱਚ ਫਿੱਕ ਪਾ ਕੇ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ‘ਤੇ ਝੂਠੇ ਇਲਜ਼ਾਮ ਲਾ ਕੇ ਸੇਖੂਪੁਰੇ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚ ਕੈਦ ਕਰ ਦਿੱਤਾ।

ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਪੰਜਾਬ ਦੀ ਸਰਜ਼ਮੀਨ ਤੋਂ ਦੂਰ ਫਤਿਹਗੜ੍ਹ (ਯੂ.ਪੀ.) ਲੈ ਗਏ, ਜਿੱਥੇ ਉਸ ਨੂੰ ਈਸਾਈ ਧਰਮ ਗ੍ਰਹਿਣ ਕਰਨ ਲਈ ਤਿਆਰ ਕੀਤਾ ਜਾਣ ਲੱਗਾ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਪਿਤਾ-ਪੁਰਖੀ ਧਰਮ ਅਤੇ ਮਹਾਨ ਸਿੱਖ ਰਿਆਸਤ ਤੋਂ ਵਾਂਝਿਆਂ ਕਰਕੇ 1854 ਈ. ਵਿੱਚ ਇੰਗਲੈਂਡ ਭੇਜ ਦਿੱਤਾ।

13 ਵਰਹਿਆਂ ਬਾਅਦ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਤੇ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਦਾ ਮਿਲਾਪ ਕਲਕੱਤੇ ਵਿਖੇ ਹੋਇਆ। ਉਸ ਨੂੰ ਪੰਜਾਬ ਪ੍ਰਵੇਸ਼ ਕਰਨ ਦੀ ਆਗਿਆ ਨਾ ਮਿਲੀ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਮਹਾਰਾਣੀ ਨੂੰ ਆਪਣੇ ਨਾਲ ਇੰਗਲੈਂਡ ਲੈ ਗਿਆ। ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੇ ਸਿੱਖੀ ਪ੍ਰਤੀ ਚਿਣਗ ਮੁੜ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਦੇ ਹਿਰਦੇ ਵਿੱਚ ਬਾਲ ਦਿੱਤੀ।

ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੇ ਸ. ਠਾਕੁਰ ਸਿੰਘ ਸੰਧਾਵਾਲੀਆ ਨੂੰ 1884 ਈ. ਵਿੱਚ ਲੰਡਨ ਬੁਲਾਇਆ ਅਤੇ ਸਿੱਖ ਧਰਮ ਦੇ ਇਤਿਹਾਸ ਤੇ ਮਰਿਆਦਾ ਦੀ ਸਿੱਖਿਆ ਗ੍ਰਹਿਣ ਕੀਤੀ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਅੰਮ੍ਰਿਤ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਕਰਨ ਅਤੇ ਸਿੱਖ ਰਾਜ ਪ੍ਰਤੀ ਹੋਰ ਵਿਚਾਰਾਂ ਲਈ ਮਾਰਚ 1886 ਈ. ਵਿੱਚ ਹਿੰਦੁਸਤਾਨ ਨੂੰ ਰਵਾਨਾ ਹੋਇਆ ਪਰ ਸਰਕਾਰ ਨੇ ਅਦਨ ਵਿਖੇ ਨਜ਼ਰਬੰਦ ਕਰ ਦਿੱਤਾ। ਸ. ਠਾਕੁਰ ਸਿੰਘ ਸੰਧਾਵਾਲੀਆ ਨੇ ਅਦਨ ਹੀ ਅੰਮ੍ਰਿਤ ਛਕਾਉਣ ਦਾ ਪ੍ਰਬੰਧ ਕੀਤਾ। ਜੂਨ 1886 ਈ. ਵਿੱਚ ਮਹਾਰਾਜਾ ਇੱਥੋਂ ਹੀ ਪੈਰਸ ਚਲਾ ਗਿਆ।

ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਪੰਜਾਬ ਵਾਪਸ ਆਉਣ ਲਈ ਹਮੇਸ਼ਾ ਹੀ ਯਤਨਸ਼ੀਲ ਸੀ ਪਰ ਹਿੰਦ ਸਰਕਾਰ ਦੀਆਂ ਰੋਕਾਂ ਨੇ ਉਸ ਦੇ ਆਦੇਸ਼ ਦੀ ਪੂਰਤੀ ਨਾ ਹੋਣ ਦਿੱਤੀ। ਮਲਕਾ ਵਿਕਟੋਰੀਆ ਨੇ ਉਸ ਦੀ ਪੈਨਸ਼ਨ ਬੰਦ ਕਰ ਦਿੱਤੀ, ਜਿਸ ਕਰਕੇ ਉਸ ਨੂੰ ਕਾਫੀ ਮਾਇਕ ਔਕੜਾਂ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ ਪਿਆ। 22 ਅਕਤੂਬਰ 1893 ਈ. ਨੂੰ ਮਹਾਰਾਜਾ ਪੈਰਿਸ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਿਆ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "29-anglo-sikh-war.jpg": {
    titlePa: "ਐਂਗਲੋ - ਸਿੱਖ ਜੰਗਾਂ - ਮੁੱਦਕੀ ਦੀ ਜੰਗ",
    descriptionPa: `ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗਾਂ (1845-1849) ਭਾਰਤੀ ਇਤਿਹਾਸ ਦੇ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਅਤੇ ਦੁਖਦਾਈ ਅਧਿਆਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਮਿਸਲਾਂ ਅਤੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੁਆਰਾ ਸਥਾਪਿਤ ਸ਼ਕਤੀਸ਼ਾਲੀ ਸਿੱਖ ਸਾਮਰਾਜ ਦਾ ਅੰਤ ਕਰ ਦਿੱਤਾ ਅਤੇ ਪੰਜਾਬ ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਈਸਟ ਇੰਡੀਆ ਕੰਪਨੀ ਦੇ ਅਧੀਨ ਕਰ ਦਿੱਤਾ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਮੌਤ (1839) ਤੋਂ ਬਾਅਦ ਪੰਜਾਬ ਅੰਦਰੂਨੀ ਕਲੇਸ਼ ਅਤੇ ਅਸਥਿਰਤਾ ਦਾ ਸ਼ਿਕਾਰ ਹੋ ਗਿਆ ਸੀ।

ਪਹਿਲੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ 1845 ਤੋਂ 1846 ਦੇ ਸਮੇਂ ਦਰਮਿਆਨ ਚੱਲੀ ਅਤੇ ਇਸ ਵਿਚ ਕੁਲ ਪੰਜ ਜੰਗਾਂ ਹੋਈਆਂ।

18 ਦਸੰਬਰ 1845 ਨੂੰ ਪਹਿਲੀ ਲੜਾਈ ਮੁਦਕੀ ਦੇ ਸਥਾਨ ‘ਤੇ ਹੋਈ। ਇਹ ਜੰਗ ਦਾ ਪਹਿਲਾ ਵੱਡਾ ਟਕਰਾਅ ਸੀ। ਸਿੱਖ ਫੌਜਾਂ ਨੇ ਬਹਾਦਰੀ ਨਾਲ ਲੜਾਈ ਕੀਤੀ, ਪਰ ਸਿੱਖ ਸੈਨਾਪਤੀ ਲਾਲ ਸਿੰਘ ਦੀ ਗੱਦਾਰੀ ਨੇ ਅੰਗਰੇਜ਼ਾਂ ਨੂੰ ਬਚਾ ਲਿਆ। ਇਸ ਲੜਾਈ ਵਿੱਚ ਅੰਗਰੇਜ਼ਾਂ ਦਾ ਭਾਰੀ ਨੁਕਸਾਨ ਹੋਇਆ, ਪਰ ਉਹ ਜਿੱਤਣ ਵਿੱਚ ਕਾਮਯਾਬ ਰਹੇ।

ਦੂਜੀ ਫਿਰੋਜ਼ਸ਼ਾਹ ਦੀ ਲੜਾਈ 21-22 ਦਸੰਬਰ 1845 ਨੂੰ ਹੋਈ। ਇਸ ਨੂੰ ਪਹਿਲੀ ਜੰਗ ਦੀ ਸਭ ਤੋਂ ਭਿਆਨਕ ਲੜਾਈ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਸਿੱਖ ਫੌਜ ਨੇ ਜ਼ਬਰਦਸਤ ਟੱਕਰ ਦਿੱਤੀ, ਜਿਸ ਨਾਲ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਦੀ ਹਾਰ ਨਿਸ਼ਚਿਤ ਲੱਗ ਰਹੀ ਸੀ। ਗਵਰਨਰ-ਜਨਰਲ ਲਾਰਡ ਹਾਰਡਿੰਗ ਨੇ ਲੜਾਈ ਦੇ ਮੈਦਾਨ ਤੋਂ ਭੱਜਣ ਦੀ ਤਿਆਰੀ ਕਰ ਲਈ ਸੀ। ਪਰ ਲਾਲ ਸਿੰਘ ਅਤੇ ਤੇਜਾ ਸਿੰਘ ਦੀ ਗੱਦਾਰੀ ਕਾਰਨ, ਜੋ ਰਾਤ ਨੂੰ ਆਪਣੀਆਂ ਫੌਜਾਂ ਨੂੰ ਛੱਡ ਕੇ ਭੱਜ ਗਏ, ਸਿੱਖਾਂ ਦੀ ਜਿੱਤ ਹਾਰ ਵਿੱਚ ਬਦਲ ਗਈ।

ਤੀਜੀ ਲੜਾਈ ਬੱਦੋਵਾਲ ਵਿਖੇ 21 ਜਨਵਰੀ 1846 ਨੂੰ ਹੋਈ। ਰਣਜੋਧ ਸਿੰਘ ਮਜੀਠੀਆ ਦੀ ਅਗਵਾਈ ਹੇਠ ਸਿੱਖ ਫੌਜਾਂ ਨੇ ਲੁਧਿਆਣਾ ਦੇ ਨੇੜੇ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਦੇ ਇੱਕ ਹਿੱਸੇ ਨੂੰ ਘੇਰ ਲਿਆ ਅਤੇ ਬਰਤਾਨਵੀ ਸਾਮਾਨ ਦੇ ਕਾਫ਼ੀ ਹਿੱਸੇ ਨੂੰ ਸਾੜ ਦਿੱਤਾ। ਇਸਨੂੰ ਸਿੱਖਾਂ ਲਈ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਜਿੱਤ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ।

ਚੌਥੀ ਲੜਾਈ ਅਲੀਵਾਲ ਵਿਖੇ 28 ਜਨਵਰੀ 1846 ਨੂੰ ਹੈ। ਹੈਰੀ ਸਮਿੱਥ ਦੀ ਅਗਵਾਈ ਹੇਠ ਅੰਗਰੇਜ਼ਾਂ ਨੇ ਬੱਦੋਵਾਲ ਦਾ ਬਦਲਾ ਲਿਆ ਅਤੇ ਰਣਜੋਧ ਸਿੰਘ ਮਜੀਠੀਆ ਦੀਆਂ ਫੌਜਾਂ ਨੂੰ ਹਰਾਇਆ।

ਪੰਜਵੀ ਲੜਾਈ ਸਭਰਾਓਂ ਵਿਚ 10 ਫਰਵਰੀ 1846 ਨੂੰ ਹੈ। ਇਹ ਪਹਿਲੀ ਜੰਗ ਦੀ ਨਿਰਣਾਇਕ ਲੜਾਈ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਸਤਲੁਜ ਦੇ ਕੰਢੇ ਮਜ਼ਬੂਤ ਮੋਰਚੇ ਬਣਾਏ ਹੋਏ ਸਨ। ਇਸ ਲੜਾਈ ਵਿੱਚ ਸ਼ਾਮ ਸਿੰਘ ਅਟਾਰੀਵਾਲਾ ਵਰਗੇ ਮਹਾਨ ਜਰਨੈਲ ਨੇ ਅਦੁੱਤੀ ਬਹਾਦਰੀ ਦਿਖਾਈ ਅਤੇ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ। ਪਰ ਤੇਜਾ ਸਿੰਘ ਨੇ ਦੁਬਾਰਾ ਗੱਦਾਰੀ ਕੀਤੀ ਅਤੇ ਸਤਲੁਜ ‘ਤੇ ਬਣਿਆ ਬੇੜੀਆਂ ਦਾ ਪੁਲ ਤੋੜ ਦਿੱਤਾ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਫੌਜਾਂ ਦਾ ਪਿੱਛੇ ਹਟਣ ਦਾ ਰਾਹ ਬੰਦ ਹੋ ਗਿਆ।

ਦੂਜੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ 1848 ਤੋਂ 1849 ਦਰਮਿਆਨ ਹੋਈ। ਭੈਰੋਵਾਲ ਦੀ ਸੰਧੀ (1846) ਤੋਂ ਬਾਅਦ ਅੰਗਰੇਜ਼ੀ ਰੈਜ਼ੀਡੈਂਟ ਹੈਨਰੀ ਲਾਰੰਸ ਨੂੰ ਪੰਜਾਬ ਦੇ ਪ੍ਰਸ਼ਾਸਨ ‘ਤੇ ਪੂਰਾ ਕੰਟਰੋਲ ਮਿਲ ਗਿਆ। ਇਸ ਕੰਟਰੋਲ, ਰਾਣੀ ਜਿੰਦਾਂ ਨੂੰ ਦੇਸ਼ ਨਿਕਾਲਾ ਦੇਣ ਅਤੇ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਜਾਗੀਰਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਦੇ ਫੈਸਲਿਆਂ ਨੇ ਸਿੱਖਾਂ ਵਿੱਚ ਗੁੱਸਾ ਭਰ ਦਿੱਤਾ।

ਚਿੱਲਿਆਂਵਾਲਾ ਦੀ ਲੜਾਈ (13 ਜਨਵਰੀ 1849) ਦੂਜੀ ਸਭ ਤੋਂ ਜ਼ਿਆਦਾ ਖੂਨੀ ਲੜਾਈ ਸੀ। ਸਿੱਖ ਫੌਜ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਦੀ ਅਗਵਾਈ ਕਰ ਰਹੇ ਜਨਰਲ ਹਿਊਗ ਗਫ ਨੂੰ ਭਾਰੀ ਨੁਕਸਾਨ ਪਹੁੰਚਾਇਆ। ਦੋਵਾਂ ਪਾਸਿਆਂ ਨੇ ਭਾਰੀ ਜਾਨੀ ਨੁਕਸਾਨ ਝੱਲਿਆ, ਪਰ ਰਣਨੀਤਕ ਤੌਰ ‘ਤੇ ਇਹ ਸਿੱਖਾਂ ਦੀ ਜਿੱਤ ਸੀ।

ਗੁਜਰਾਤ ਦੀ ਲੜਾਈ 21 ਫਰਵਰੀ 1849 ਨੂੰ ਲੜੀ ਗਈ। ਇਸਨੂੰ ਤੋਪਾਂ ਦੀ ਲੜਾਈ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਚਨਾਬ ਦਰਿਆ ਦੇ ਨੇੜੇ ਗੁਜਰਾਤ ਵਿੱਚ ਹੋਈ ਇਹ ਜੰਗ ਨਿਰਣਾਇਕ ਸਾਬਤ ਹੋਈ। ਅੰਗਰੇਜ਼ਾਂ ਨੇ ਆਪਣੀ ਉੱਨਤ ਅਤੇ ਮਜ਼ਬੂਤ ਤੋਪਖਾਨੇ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਿੱਖ ਫੌਜ ਨੂੰ ਬੁਰੀ ਤਰ੍ਹਾਂ ਕੁਚਲ ਦਿੱਤਾ। ਇਸ ਹਾਰ ਤੋਂ ਬਾਅਦ ਸਿੱਖ ਫੌਜ ਨੂੰ ਆਤਮ-ਸਮਰਪਣ ਕਰਨਾ ਪਿਆ।

ਦੂਜੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ ਦੀ ਸਮਾਪਤੀ 12 ਮਾਰਚ 1849 ਨੂੰ ਹੋਈ। ਇਸ ਤੋਂ ਬਾਅਦ ਗਵਰਨਰ-ਜਨਰਲ ਲਾਰਡ ਡਲਹੌਜ਼ੀ ਨੇ 29 ਮਾਰਚ 1849 ਨੂੰ ਰਸਮੀ ਤੌਰ ‘ਤੇ ਪੰਜਾਬ ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਭਾਰਤ ਵਿੱਚ ਮਿਲਾ ਲਿਆ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਗੱਦੀ ਤੋਂ ਉਤਾਰ ਦਿੱਤਾ ਗਿਆ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਇੰਗਲੈਂਡ ਭੇਜ ਦਿੱਤਾ ਗਿਆ। ਪ੍ਰਸਿੱਧ ਕੋਹਿਨੂਰ ਹੀਰਾ ਮਹਾਰਾਜਾ ਤੋਂ ਲੈ ਕੇ ਮਹਾਰਾਣੀ ਵਿਕਟੋਰੀਆ ਨੂੰ ਭੇਜ ਦਿੱਤਾ ਗਿਆ।`,
    artist: "ਗੁਰਰਾਜ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "30-kooka-lehar.jpg": {
    titlePa: "ਕੂਕਾ ਲਹਿਰ",
    descriptionPa: `ਨਾਮਧਾਰੀ ਲਹਿਰ ਸਿੱਖਾਂ ਦੀ ਦੂਜੀ ਸੁਧਾਰਕ ਲਹਿਰ ਸੀ। ਇਸ ਦਾ ਆਰੰਭ ਨਿਰੰਕਾਰੀ ਲਹਿਰ ਦੌਰਾਨ ਹੀ ਹੋ ਗਿਆ ਸੀ। ਇਸ ਲਹਿਰ ਦਾ ਕਾਰਜ ਖੇਤਰ ਨਾ ਕੇਵਲ ਧਾਰਮਿਕ ਸੀ ਬਲਕਿ ਇਸ ਲਹਿਰ ਨੇ ਸਮਾਜਿਕ ਅਤੇ ਧਾਰਮਿਕ ਖੇਤਰ ਵਿੱਚ ਵੀ ਅਹਿਮ ਭੂਮਿਕਾ ਨਿਭਾਈ। ਇਸ ਲਹਿਰ ਦਾ ਆਰੰਭ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਹੋ ਚੁੱਕੀਆਂ ਗੁਰਮਤਿ ਵਿਰੋਧੀ ਰੀਤੀਆਂ ਨੂੰ ਦੂਰ ਕਰਨ ਲਈ ਹੋਇਆ। ਪਰ ਸਮੇਂ ਦੀਆਂ ਪ੍ਰਸਥਿਤੀਆਂ ਮੁਤਾਬਕ ਇਸ ਲਹਿਰ ਦੇ ਆਗੂਆਂ ਨੇ ਰਾਜਨਿਤਕ ਖੇਤਰ ਵਿੱਚ ਵੀ ਚੰਗਾ ਕਾਰਜ ਕੀਤਾ।

ਇਸ ਅੰਦੋਲਨ ਦੇ ਪ੍ਰਚਾਰਕ ਈਸ਼ਵਰ ਦਾ ਨਾਮ ਜਪਣ ਉੱਤੇ ਬਹੁਤ ਜ਼ੋਰ ਦਿੰਦੇ ਸਨ। ਇਸ ਲਈ ਇਸ ਦੇ ਅਨੁਯਾਈਆਂ ਨੂੰ ਜਾਂ ਇਸ ਲਹਿਰ ਨੂੰ ਲੋਕ ਨਾਮਧਾਰੀ ਨਾਮ ਨਾਲ ਪੁਕਾਰਨ ਲੱਗੇ। ਨਾਮਧਾਰੀਆਂ ਨੂੰ ਕੂਕੇ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਨਾਮਧਾਰੀਏ ਨਾਮ-ਬਾਣੀ ਦੇ ਦ੍ਰਿੜ ਅਭਿਆਸੀ ਹੋਣ ਕਰਕੇ ਸ਼ਬਦ ਪੜ੍ਹਦੇ ਹੋਏ ਸੂਫ਼ੀਆਂ ਵਾਂਗ ਨੱਚਣ ਲੱਗ ਪੈਂਦੇ ਸਨ ਅਤੇ ਨਾਲ ਹੀ ਇਸ ਦੀ ਲੋਰ ਵਿਚ ਆ ਕੇ ਕੂਕਾਂ ਵੀ ਮਾਰਦੇ ਸਨ। ਇਸ ਲਈ ਉਹਨਾਂ ਨੂੰ ਕੂਕੇ ਕਿਹਾ ਜਾਣ ਲੱਗਾ।

ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਮਗਰੋਂ ਚੱਲ ਕੇ ਕੂਕਾ ਲਹਿਰ ਜਾਂ ਅੰਦੋਲਨ ਦੇ ਮੋਢੀ ਬਣਦੇ ਹਨ। ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਦਾ ਜਨਮ 1780 ਈ. ਵਿੱਚ ਅਟਕ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਸਰਵਾਲਾ ਵਿੱਚ ਹੋਇਆ। ਆਪ ਦੇ ਪਿਤਾ ਦਿਆਲ ਸਿੰਘ ਅਰੋੜਾ ਜਾਤੀ ਨਾਲ ਸੰਬੰਧਿਤ ਸਨ। ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਜੀ ਨੇ ਸਿੱਖਾਂ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਚੁੱਕੀਆਂ ਬੁਰਾਈਆਂ ਵਿਰੁੱਧ ਪ੍ਰਚਾਰ ਕੀਤਾ। ਉਹ ਨਾਮ ਸਿਮਰਣ ਉੱਤੇ ਵਿਸ਼ੇਸ਼ ਜ਼ੋਰ ਦਿੰਦੇ ਸਨ। ਜਿਸ ਕਰਕੇ ਉਹਨਾਂ ਦੇ ਅਨੁਯਾਈਆਂ ਨੂੰ ਨਾਮਧਾਰੀ ਕਿਹਾ ਜਾਣ ਲੱਗਾ। ਆਪ ਨੇ ਹਜ਼ਰੋਂ (ਅਟਕ) ਵਿਖੇ ਆਪਣੇ ਉਦੇਸ਼ਾਂ ਦਾ ਪ੍ਰਚਾਰ ਕੀਤਾ।

1841 ਈ. ਵਿੱਚ ਭਾਈ ਰਾਮ ਸਿੰਘ, ਜੋ ਉਸ ਸਮੇਂ ਰਾਜਕੁਮਾਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦੀ ਸੈਨਾ ਵਿੱਚ ਸਨ, ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਦੀ ਸੰਗਤ ਵਿੱਚ ਆਏ ਅਤੇ ਮਗਰੋਂ ਜਾ ਕੇ ਨਾਮਧਾਰੀ ਲਹਿਰ ਦੇ ਉਤਰਾਧਿਕਾਰੀ ਬਣੇ। ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਨੇ ਸਿੱਖਾਂ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਹੋ ਚੁੱਕੀਆਂ ਗੁਰਮਤਿ ਵਿਰੋਧੀ ਰੀਤੀਆਂ ਨੂੰ ਰੋਕਣ ਅਤੇ ਸਿੱਖਾਂ ਨੂੰ ਗੁਰਮਤਿ ਦੇ ਧਾਰਨੀ ਬਣਾਉਣ ਲਈ 1 ਵਿਸਾਖ 1857 ਈ. ਨੂੰ ਪਿੰਡ ਭੈਣੀ ਰਾਈਆਂ ਵਿੱਚ ਪੰਜ ਸਿੱਖਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤ ਛਕਾ ਕੇ ਇਕ ਨਵੀਂ ਜਥੇਬੰਦੀ ਦੀ ਨੀਂਹ ਰੱਖੀ, ਜਿਸ ਦਾ ਨਾਮ ਉਹਨਾਂ ਨੇ ਨਾਮਧਾਰੀ ਰੱਖਿਆ।

ਇਸ ਲਹਿਰ ਨੇ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਆ ਰਹੇ ਨਿਘਾਰ ਨੂੰ ਰੋਕਣ ਵਿੱਚ ਅਹਿਮ ਯੋਗਦਾਨ ਪਾਇਆ। ਉਸ ਸਮੇਂ ਲੋਕ ਵਹਿਮਾਂ, ਭਰਮਾਂ, ਮੜ੍ਹੀਆਂ, ਮਕਬਰਿਆਂ, ਮੂਰਤੀਆਂ ਆਦਿਕ ਦੀ ਪੂਜਾ ਦੇ ਚੱਕਰਾਂ ਵਿਚ ਪੈ ਕੇ ਸਿੱਖ ਧਰਮ ਤੋਂ ਟੁੱਟਦੇ ਜਾ ਰਹੇ ਸਨ। ਨਾਮਧਾਰੀਆਂ ਨੇ ਲੋਕਾਂ ਦਾ ਵਿਸ਼ਵਾਸ ਮੁੜ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਵਿੱਚ ਪੈਦਾ ਕੀਤਾ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਗੁਰੂ ਦੀ ਬਾਣੀ ਨਾਲ ਜੋੜਿਆ। ਪਰੰਤੂ ਕੂਕਿਆਂ ਦੇ ਕੁਝ ਸਿਧਾਂਤ ਅਜਿਹੇ ਵੀ ਸਨ ਜੋ ਗੁਰਮਤਿ ਦੇ ਵਿਰੋਧੀ ਸਨ—ਜਿਵੇਂ ਚਿੱਟੇ ਬਸਤਰ, ਚਿੱਟੀ ਮਾਲਾ, ਅਤੇ ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਅਤੇ ਭਾਈ ਰਾਮ ਸਿੰਘ ਨੂੰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਤੋਂ ਬਾਅਦ ਅਗਲੇ ਗੁਰੂ ਮੰਨਣਾ। ਇਸ ਕਾਰਨ ਬਹੁਤ ਸਾਰੇ ਸਿੱਖਾਂ ਨੇ ਇਹਨਾਂ ਦੇ ਸਿਧਾਂਤਾਂ ਨੂੰ ਨਾ ਅਪਣਾਇਆ ਕਿਉਂਕਿ ਹੁਕਮ ਅਨੁਸਾਰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਤੋਂ ਬਾਅਦ ਕੇਵਲ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਨੂੰ ਹੀ ਗੁਰੂ ਮੰਨਿਆ ਜਾ ਸਕਦਾ ਹੈ।

ਨਾਮਧਾਰੀ ਲਹਿਰ ਨੇ ਜਾਤ-ਪਾਤ, ਊਚ-ਨੀਚ ਆਦਿ ਬੁਰਾਈਆਂ ਨੂੰ ਠੱਲ ਪਾਉਂਦਿਆਂ ਭਰਾਤਰੀ ਭਾਵ ਦਾ ਪ੍ਰਸਾਰ ਕੀਤਾ। ਨਾਮਧਾਰੀਆਂ ਦੀ ਹਰੇਕ ਧਰਮਸ਼ਾਲਾ ਵਿੱਚ ਪ੍ਰਤੀਦਿਨ ਲੰਗਰ ਚਲਦਾ, ਜਿਥੇ ਹਰ ਵਿਅਕਤੀ ਬਿਨਾਂ ਵਿਤਕਰੇ ਤੋਂ ਪ੍ਰਸ਼ਾਦਾ ਛਕਦਾ ਸੀ। ਇਹਨਾਂ ਨੇ ਪੁਰਸ਼ ਅਤੇ ਇਸਤਰੀ ਦੀ ਬਰਾਬਰਤਾ ਉੱਤੇ ਜ਼ੋਰ ਦਿੱਤਾ ਅਤੇ ਬਾਲ ਵਿਆਹ, ਕੰਨਿਆ ਹੱਤਿਆ, ਦਾਜ ਪ੍ਰਥਾ, ਪਰਦਾ ਪ੍ਰਥਾ ਆਦਿ ਬੁਰਾਈਆਂ ਦਾ ਡੱਟ ਕੇ ਵਿਰੋਧ ਕੀਤਾ। ਵਿਧਵਾ ਵਿਆਹ ਦਾ ਸਮਰਥਨ ਇਸ ਲਹਿਰ ਦਾ ਇਕ ਕ੍ਰਾਂਤੀਕਾਰੀ ਕਦਮ ਸੀ।

ਨਾਮਧਾਰੀ ਲਹਿਰ ਦਾ ਇਕ ਵੱਡਾ ਯੋਗਦਾਨ ਭਾਰਤ ਦੇ ਅਜ਼ਾਦੀ ਸੰਘਰਸ਼ ਵਿੱਚ ਵੀ ਦੇਖਣ ਨੂੰ ਮਿਲਦਾ ਹੈ। ਗਾਂਧੀ ਤੋਂ ਬਹੁਤ ਪਹਿਲਾਂ ਨਾਮਧਾਰੀਆਂ ਨੇ ਪੰਜਾਬ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਲਈ ਅਸਹਿਯੋਗ ਅਪਣਾਇਆ ਅਤੇ ਸਵਦੇਸ਼ੀ ਲਹਿਰ ਪ੍ਰਚਲਿਤ ਕੀਤੀ। ਉਹਨਾਂ ਨੇ ਸਰਕਾਰੀ ਨੌਕਰੀਆਂ, ਸਰਕਾਰੀ ਸਿਖਿਆ ਸੰਸਥਾਵਾਂ, ਅਦਾਲਤਾਂ, ਡਾਕਖਾਨਿਆਂ ਅਤੇ ਵਿਦੇਸ਼ੀ ਕੱਪੜਿਆਂ ਦਾ ਬਾਈਕਾਟ ਕੀਤਾ। ਨਾਮਧਾਰੀਆਂ ਨੇ ਆਪਣੀ ਡਾਕ ਦਾ ਵੱਖਰਾ ਪ੍ਰਬੰਧ ਸਥਾਪਿਤ ਕਰ ਲਿਆ ਜੋ 1947 ਈ. ਤੱਕ ਕਾਇਮ ਰਿਹਾ।

ਕੂਕਿਆਂ ਨੇ ਗਊ ਹੱਤਿਆ ਦੇ ਵਿਰੋਧ ਵਿਚ ਜ਼ੋਰ-ਸ਼ੋਰ ਨਾਲ ਅੰਦੋਲਨ ਚਲਾਇਆ ਅਤੇ 1871 ਈ. ਵਿਚ ਅੰਮ੍ਰਿਤਸਰ ਅਤੇ ਲੁਧਿਆਣਾ ਦੇ ਕਈ ਬੁੱਚੜਖਾਨਿਆਂ ਉਪਰ ਹਮਲੇ ਕੀਤੇ। ਇਸ ਉਪਰੰਤ 66 ਕੂਕਿਆਂ ਨੂੰ ਸਰਕਾਰ ਦੁਆਰਾ ਤੋਪਾਂ ਨਾਲ ਉਡਾ ਕੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।

ਭਾਈ ਰਾਮ ਸਿੰਘ ਜੀ ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਤੋਂ ਮਗਰੋਂ ਇਸ ਸੰਪਰਦਾ ਦੀ ਵਾਗਡੋਰ ਸੰਭਾਲਣ ਵਾਲੇ ਦੂਜੇ ਮੁਖੀ ਸਨ। ਆਪ ਨੇ ਇਸ ਸੰਪਰਦਾ ਨੂੰ ਧਾਰਮਿਕ ਦੇ ਨਾਲ-ਨਾਲ ਸਮਾਜਿਕ, ਰਾਜਨੀਤਿਕ ਅਤੇ ਅਜ਼ਾਦੀ ਸੰਘਰਸ਼ ਦੀ ਵੱਡੀ ਲਹਿਰ ਵਜੋਂ ਸਥਾਪਿਤ ਕੀਤਾ। ਭਾਈ ਰਾਮ ਸਿੰਘ ਦਾ ਜਨਮ 3 ਫਰਵਰੀ 1815 ਈ. ਨੂੰ ਬਸੰਤ ਪੰਚਮੀ ਦੀ ਰਾਤ ਨੂੰ ਲੁਧਿਆਣਾ ਜ਼ਿਲ੍ਹਾ ਵਿਖੇ ਪਿੰਡ ਭੈਣੀ ਰਾਈਆਂ ਵਿਖੇ ਹੋਇਆ। ਆਪ ਦੇ ਪਿਤਾ ਜੱਸਾ ਸਿੰਘ ਤਰਖਾਣ ਸਨ ਅਤੇ ਮਾਤਾ ਦਾ ਨਾਮ ਸਦਾ ਕੌਰ ਸੀ।

1841 ਈ ਵਿਚ ਹਜ਼ਰੋ ਵਿਖੇ ਆਪ ਦੀ ਮੁਲਾਕਾਤ ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਨਾਲ ਹੋਈ। ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਉਹਨਾਂ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋਏ ਅਤੇ ਸ਼ਿਸ਼ ਬਣ ਗਏ। ਧਰਮ ਪ੍ਰਚਾਰ ਲਈ ਉਹਨਾਂ ਨੇ ਪੰਜਾਬ ਦੇ ਵੱਖ-ਵੱਖ ਇਲਾਕਿਆਂ ਵਿਚ 22 ਪ੍ਰਚਾਰ ਕੇਂਦਰ ਸਥਾਪਿਤ ਕੀਤੇ। ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਲਈ ਉਹਨਾਂ ਦਾ ਵੱਧਦਾ ਪ੍ਰਭਾਵ ਭੈ ਦਾ ਕਾਰਨ ਬਣਿਆ ਅਤੇ ਅੰਤ 1872 ਈ ਵਿੱਚ ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਨੂੰ ਦੇਸ਼ ਨਿਕਾਲਾ ਦੇ ਕੇ ਰੰਗੂਣ ਭੇਜ ਦਿੱਤਾ ਗਿਆ, ਜਿੱਥੇ 1885 ਈ ਵਿੱਚ ਆਪ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ।

ਇਸ ਪ੍ਰਕਾਰ ਕੂਕਾ ਲਹਿਰ ਨੇ ਸਮਾਜਿਕ-ਧਾਰਮਿਕ ਖੇਤਰਾਂ ਵਿੱਚ ਅਤੇ ਅਜ਼ਾਦੀ ਦੇ ਸੰਘਰਸ਼ ਵਿੱਚ ਵੀ ਵਿਸ਼ੇਸ਼ ਯੋਗਦਾਨ ਪਾਇਆ।`,
    artist: "ਜਸਪ੍ਰੀਤ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "31-ghadar-movement.jpg": {
    titlePa: "ਗਦਰ ਲਹਿਰ",
    descriptionPa: `ਗ਼ਦਰ ਪਾਰਟੀ, ਜਿਸਨੂੰ ਗ਼ਦਰ ਲਹਿਰ ਵਜੋਂ ਵੀ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ, ਦੀ ਸਥਾਪਨਾ 1913 ਵਿੱਚ ਸੈਨ ਫਰਾਂਸਿਸਕੋ, ਅਮਰੀਕਾ ਵਿਖੇ ਭਾਰਤੀ ਪ੍ਰਵਾਸੀਆਂ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਸੀ। ਇਸਦਾ ਮੁੱਖ ਉਦੇਸ਼ ਹਥਿਆਰਬੰਦ ਵਿਦਰੋਹ ਰਾਹੀਂ ਭਾਰਤ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਨੂੰ ਉਖਾੜ ਸੁੱਟਣਾ ਅਤੇ ਇੱਕ ਸੁਤੰਤਰ, ਪ੍ਰਭੂਸੱਤਾ ਸੰਪੰਨ ਅਤੇ ਧਰਮ ਨਿਰਪੱਖ ਰਾਸ਼ਟਰ ਦੀ ਸਥਾਪਨਾ ਕਰਨਾ ਸੀ। ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਜ਼ਿਆਦਾਤਰ ਮੈਂਬਰ ਪੰਜਾਬੀ ਪ੍ਰਵਾਸੀ ਸਨ।

ਇਸਦੇ ਪ੍ਰਮੁੱਖ ਆਗੂਆਂ ਵਿਚ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ (ਸੰਸਥਾਪਕ ਅਤੇ ਪਹਿਲੇ ਪ੍ਰਧਾਨ), ਲਾਲਾ ਹਰ ਦਿਆਲ (ਜਨਰਲ ਸਕੱਤਰ ਅਤੇ ਹਫ਼ਤਾਵਾਰੀ ਅਖ਼ਬਾਰ ‘ਗ਼ਦਰ’ ਦੇ ਸੰਪਾਦਕ), ਪੰਡਿਤ ਕਾਂਸ਼ੀ ਰਾਮ ਮੋਰਾਲੀ (ਖਜ਼ਾਨਚੀ), ਭਾਈ ਪਰਮਾਨੰਦ ਅਤੇ ਹਰਨਾਮ ਸਿੰਘ ਟੁੰਡੀਲਾਟ ਸ਼ਾਮਲ ਸਨ।

ਪਾਰਟੀ ਦੇ ਮੁੱਖ ਉਦੇਸ਼ਾਂ ਵਿੱਚ ਹਥਿਆਰਬੰਦ ਕ੍ਰਾਂਤੀ ਰਾਹੀਂ ਬ੍ਰਿਟਿਸ਼ ਬਸਤੀਵਾਦੀ ਸ਼ਕਤੀ ਨੂੰ ਉਖਾੜ ਸੁੱਟਣਾ, ਸਾਰੇ ਧਰਮਾਂ ਨੂੰ ਅਪਣਾਉਣ ਵਾਲਾ ਧਰਮ ਨਿਰਪੱਖ ਰਾਜ ਸਥਾਪਤ ਕਰਨਾ ਅਤੇ ਗਰੀਬਾਂ ਅਤੇ ਕਿਰਤੀ ਵਰਗ ਦੀਆਂ ਹਾਲਤਾਂ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨਾ ਆਦਿ ਸ਼ਾਮਲ ਸਨ।

ਗ਼ਦਰ ਪਾਰਟੀ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਨੂੰ ਚੁਣੌਤੀ ਦੇਣ ਲਈ ਕਈ ਇਨਕਲਾਬੀ ਗਤੀਵਿਧੀਆਂ ਕੀਤੀਆਂ। ਨਵੰਬਰ 1913 ਵਿੱਚ ‘ਗ਼ਦਰ’ ਨਾਮਕ ਇੱਕ ਹਫ਼ਤਾਵਾਰੀ ਅਖ਼ਬਾਰ ਸ਼ੁਰੂ ਕੀਤਾ ਗਿਆ, ਜਿਸਦਾ ਪਹਿਲਾ ਐਡੀਸ਼ਨ ਉਰਦੂ ਵਿੱਚ ਅਤੇ ਇੱਕ ਮਹੀਨੇ ਬਾਅਦ ਗੁਰਮੁਖੀ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਇਆ। ਇਸਦਾ ਮੁੱਖ ਨਾਅਰਾ ਸੀ: “ਅੰਗਰੇਜ਼ੀ ਰਾਜ ਕਾ ਦੁਸ਼ਮਨ”।

ਕਾਮਾਗਾਟਾ ਮਾਰੂ ਘਟਨਾ ਦੌਰਾਨ ਜਹਾਜ਼ ਨੂੰ ਕੈਨੇਡਾ ਵਿੱਚ ਦਾਖਲ ਹੋਣ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ ਗਿਆ, ਜਿਸ ਕਾਰਨ ਭਾਰਤੀ ਯਾਤਰੀਆਂ ਵਿੱਚ ਭਾਰੀ ਗੁੱਸਾ ਪੈਦਾ ਹੋਇਆ। ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਕਾਰਕੁਨਾਂ ਨੇ ਜਹਾਜ਼ ‘ਤੇ ਜਾ ਕੇ ਭਾਸ਼ਣ ਦਿੱਤੇ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੋਧੀ ਸਾਹਿਤ ਵੰਡਿਆ। ਕਲਕੱਤਾ ਪਹੁੰਚਣ ‘ਤੇ ਬੱਜ-ਬੱਜ ਘਾਟ ‘ਤੇ ਹੋਏ ਹਿੰਸਕ ਟਕਰਾਅ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੋਧੀ ਭਾਵਨਾਵਾਂ ਨੂੰ ਹੋਰ ਭੜਕਾਇਆ।

ਪਹਿਲੇ ਵਿਸ਼ਵ ਯੁੱਧ ਦੀ ਸ਼ੁਰੂਆਤ ਦੇ ਨਾਲ, ਗ਼ਦਰੀ ਆਗੂਆਂ ਨੇ ਇਸ ਨੂੰ ਬਗਾਵਤ ਦਾ ਮੌਕਾ ਸਮਝਿਆ। ‘ਦਿ ਗ਼ਦਰ’ ਅਖ਼ਬਾਰ ਦੇ 5 ਅਗਸਤ 1914 ਦੇ ਅੰਕ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੁੱਧ ਜੰਗ ਦੇ ਐਲਾਨ ਦਾ ਫੈਸਲਾ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ। ਉਨ੍ਹਾਂ ਨੇ ਵਿਦੇਸ਼ਾਂ ਵਿੱਚ ਵਸਦੇ ਭਾਰਤੀਆਂ ਨੂੰ ਵਾਪਸ ਆ ਕੇ ਸੰਘਰਸ਼ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਦੀ ਅਪੀਲ ਕੀਤੀ, ਹਥਿਆਰਾਂ ਦੀ ਸਪਲਾਈ ਕੀਤੀ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਵਿੱਚ ਭਾਰਤੀ ਸਿਪਾਹੀਆਂ ਨੂੰ ਬਗਾਵਤ (ਫਰਵਰੀ 1915) ਲਈ ਉਕਸਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ।

ਇਸ ਬਗਾਵਤ ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਅਧਿਕਾਰੀਆਂ ਦੁਆਰਾ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਤਹਿਤ ਸਖ਼ਤੀ ਨਾਲ ਕੁਚਲ ਦਿੱਤਾ ਗਿਆ ਅਤੇ 42 ਮੈਂਬਰਾਂ ਨੂੰ ਫਾਂਸੀ ਦਿੱਤੀ ਗਈ। ਗ਼ਦਰ ਲਹਿਰ ਨੇ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਸੰਘਰਸ਼ ਵਿੱਚ ਅਹਿਮ ਯੋਗਦਾਨ ਪਾਇਆ ਅਤੇ ਇਹ ਭਾਰਤੀ ਰਾਸ਼ਟਰਵਾਦੀ ਲਹਿਰ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਅੰਗ ਬਣ ਗਈ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "32-baba-sohan-singh-bhakna.jpg": {
    titlePa: "ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ",
    descriptionPa: `ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ ਇੱਕ ਇਨਕਲਾਬੀ ਅਤੇ ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਬਾਨੀ ਪ੍ਰਧਾਨ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਜਨਵਰੀ 1870 ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਨੇੜੇ ਪੈਂਦੇ ਪਿੰਡ ਖੁਤ੍ਰਲ ਖੁਰਦ ਵਿੱਚ ਇੱਕ ਕਿਸਾਨ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ। ਪੰਜਾਬ ਵਿੱਚ ਸਿਆਸੀ ਮੁਸੀਬਤਾਂ ਦੇ ਚਲਦਿਆਂ, ਸੋਹਣ ਸਿੰਘ 1907 ਵਿੱਚ ਕੈਲੀਫੋਰਨੀਆ ਚਲੇ ਗਏ।

ਸੰਯੁਕਤ ਰਾਜ ਅਮਰੀਕਾ ਵਿੱਚ ਬਾਬਾ ਭਕਨਾ ਨੇ ਲਾਲਾ ਹਰਦਿਆਲ, ਪੰਡਿਤ ਕਾਂਸ਼ੀ ਰਾਮ ਅਤੇ ਕੁਝ ਹੋਰਾਂ ਦੇ ਨਾਲ ਮਿਲ ਕੇ ਪੈਸੀਫਿਕ ਕੋਸਟ ਹਿੰਦੀ ਐਸੋਸੀਏਸ਼ਨ ਦੀ ਸਥਾਪਨਾ ਕਰਨ ਵਿੱਚ ਅਹਿਮ ਭੂਮਿਕਾ ਨਿਭਾਈ, ਜਿਸ ਦੇ ਸੋਹਨ ਸਿੰਘ ਪਹਿਲੇ ਪ੍ਰਧਾਨ ਚੁਣੇ ਗਏ। ਇਸ ਐਸੋਸੀਏਸ਼ਨ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਗ਼ਦਰ ਪਾਰਟੀ ਵਜੋਂ ਜਾਣਿਆ ਜਾਣ ਲੱਗਾ।

ਪਹਿਲੇ ਵਿਸ਼ਵ ਯੁੱਧ ਦੌਰਾਨ ਗ਼ਦਰ ਪਾਰਟੀ ਹਿੰਦੂ-ਜਰਮਨ ਸਾਜ਼ਿਸ਼ ਵਿੱਚ ਮੁੱਖ ਭਾਗੀਦਾਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸੀ, ਜਿਸਦਾ ਉਦੇਸ਼ ਬ੍ਰਿਟਿਸ਼ ਭਾਰਤੀ ਫ਼ੌਜ ਵਿੱਚ ਬਗ਼ਾਵਤ ਸ਼ੁਰੂ ਕਰਨਾ ਸੀ। ਸੋਹਨ ਸਿੰਘ ਨੇ ਜੰਗ ਸ਼ੁਰੂ ਹੋਣ ‘ਤੇ, ਕਾਮਾਗਾਟਾ ਮਾਰੂ ਘਟਨਾ ਦੇ ਮੱਦੇਨਜ਼ਰ, ਭਾਰਤ ਦੇ ਅੰਦਰ ਬਗ਼ਾਵਤ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨ ਅਤੇ ਨਿਰਦੇਸ਼ਿਤ ਕਰਨ ਲਈ ਵਾਪਸ ਆ ਕੇ ਯਤਨ ਕੀਤੇ।

ਹਾਲਾਂਕਿ, ਭਾਰਤ ਵਾਪਸ ਆਉਣ ‘ਤੇ ਸੋਹਣ ਸਿੰਘ ਨੂੰ ਅਕਤੂਬਰ 1914 ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਵਿੱਚ ਮੁਕੱਦਮਾ ਚਲਾਇਆ ਗਿਆ ਅਤੇ ਮੌਤ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ। ਮੌਤ ਦੀ ਸਜ਼ਾ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਉਮਰ ਕੈਦ ਵਿੱਚ ਬਦਲ ਦਿੱਤਾ ਗਿਆ। ਰਿਹਾਅ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਉਨ੍ਹਾਂ ਨੇ ਸੋਲਾਂ ਸਾਲ ਜੇਲ੍ਹ ਵਿੱਚ ਕੱਟੇ ਅਤੇ 1931 ਵਿੱਚ ਰਿਹਾਅ ਹੋਏ।

1929 ਵਿੱਚ, ਜਦੋਂ ਉਹ ਅਜੇ ਵੀ ਕੈਦ ਵਿੱਚ ਸਨ, ਸੋਹਨ ਸਿੰਘ ਨੇ ਭਗਤ ਸਿੰਘ ਦੇ ਸਮਰਥਨ ਵਿੱਚ ਇੱਕ ਚੰਗੀ ਤਰ੍ਹਾਂ ਪ੍ਰਚਾਰਿਤ ਭੁੱਖ ਹੜਤਾਲ ਸ਼ੁਰੂ ਕੀਤੀ।

ਰਿਹਾਈ ਤੋਂ ਬਾਅਦ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ ਕਮਿਊਨਿਸਟ ਪਾਰਟੀ ਆਫ਼ ਇੰਡੀਆ (CPI) ਦੇ ਕੰਮਾਂ ਨਾਲ ਨੇੜਿਓਂ ਜੁੜੇ ਰਹੇ ਅਤੇ ਕੈਦ ਵਿੱਚ ਬੰਦ ਗ਼ਦਰੀਆਂ ਦੀ ਰਿਹਾਈ ਨੂੰ ਵੀ ਆਪਣੇ ਸਿਆਸੀ ਕੰਮ ਦਾ ਮੁੱਖ ਹਿੱਸਾ ਬਣਾਇਆ।

1947 ਵਿੱਚ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੇ ਕਿਸਾਨ ਸਭਾ ਅਤੇ ਸੀ.ਪੀ.ਆਈ. ਨਾਲ ਮਿਲ ਕੇ ਕੰਮ ਕੀਤਾ। ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ ਗ਼ਦਰ ਲਹਿਰ ਦੇ ਮਹਾਨ ਨੇਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ ਅਤੇ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਉਨ੍ਹਾਂ ਦਾ ਯੋਗਦਾਨ ਅਤਿਅੰਤ ਮਹੱਤਵਪੂਰਨ ਹੈ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "33-kartar-singh-sarabha.jpg": {
    titlePa: "ਸ਼ਹੀਦ ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ",
    descriptionPa: `ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਭਾਰਤੀ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮ ਦੇ ਮਹਾਨ ਇਨਕਲਾਬੀ ਅਤੇ ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਸਭ ਤੋਂ ਪ੍ਰਮੁੱਖ ਤੇ ਜੋਸ਼ੀਲੇ ਮੈਂਬਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 1896 ਵਿੱਚ ਜ਼ਿਲ੍ਹਾ ਲੁਧਿਆਣਾ ਦੇ ਪਿੰਡ ਸਰਾਭਾ ਵਿਖੇ ਹੋਇਆ। 1911 ਵਿੱਚ ਹਾਈ ਸਕੂਲ ਦੀ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਉਹ ਇੰਜੀਨੀਅਰਿੰਗ ਦੀ ਪੜ੍ਹਾਈ ਜਾਰੀ ਰੱਖਣ ਲਈ 1912 ਵਿੱਚ ਕੈਲੀਫੋਰਨੀਆ ਯੂਨੀਵਰਸਿਟੀ ਬਰਕਲੇ ਪਹੁੰਚੇ।

ਸੈਨ ਫਰਾਂਸਿਸਕੋ ਬੰਦਰਗਾਹ ‘ਤੇ ਉਨ੍ਹਾਂ ਨੇ ਦੇਖਿਆ ਕਿ ਭਾਰਤੀ ਪ੍ਰਵਾਸੀਆਂ ਨਾਲ ਕਿਵੇਂ ਬਦਸਲੂਕੀ ਕੀਤੀ ਜਾਂਦੀ ਸੀ, ਜਿਸ ਦਾ ਕਾਰਨ ਉਨ੍ਹਾਂ ਨੂੰ ‘ਗ਼ੁਲਾਮ ਦੇਸ਼ ਦੇ ਨਾਗਰਿਕ’ ਹੋਣਾ ਦੱਸਿਆ ਗਿਆ। ਇਸ ਘਟਨਾ ਨੇ ਉਨ੍ਹਾਂ ਦੇ ਮਨ ‘ਤੇ ਡੂੰਘਾ ਪ੍ਰਭਾਵ ਪਾਇਆ। 1913 ਵਿੱਚ ਉਹ ਗ਼ਦਰ ਪਾਰਟੀ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ, ਜਿਸਦਾ ਉਦੇਸ਼ ਹਥਿਆਰਬੰਦ ਸੰਘਰਸ਼ ਰਾਹੀਂ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਤੋਂ ਭਾਰਤ ਨੂੰ ਆਜ਼ਾਦ ਕਰਵਾਉਣਾ ਅਤੇ ਇੱਕ ਰਾਸ਼ਟਰੀ ਲੋਕਤੰਤਰੀ ਸਰਕਾਰ ਸਥਾਪਤ ਕਰਨਾ ਸੀ।

1 ਨਵੰਬਰ 1913 ਨੂੰ ਗ਼ਦਰ ਪਾਰਟੀ ਨੇ ‘ਗ਼ਦਰ’ ਨਾਮ ਦਾ ਅਖ਼ਬਾਰ ਛਾਪਣਾ ਸ਼ੁਰੂ ਕੀਤਾ ਜੋ ਕਈ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਹੁੰਦਾ ਸੀ। ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਨੇ ਇਸ ਅਖ਼ਬਾਰ ਲਈ ਕਾਫੀ ਕੰਮ ਕੀਤਾ। ਇਸ ਦਾ ਮਕਸਦ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਦੀ ਸੱਚਾਈ ਨੂੰ ਬੇਨਕਾਬ ਕਰਨਾ, ਫ਼ੌਜੀ ਸਿਖਲਾਈ ਦੇਣਾ ਅਤੇ ਹਥਿਆਰ ਬਣਾਉਣ ਅਤੇ ਵਰਤਣ ਦੇ ਤਰੀਕੇ ਸਮਝਾਉਣਾ ਸੀ।

ਪਹਿਲੇ ਵਿਸ਼ਵ ਯੁੱਧ ਦੀ ਸ਼ੁਰੂਆਤ ਦੇ ਨਾਲ, ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਆਗੂਆਂ ਨੇ ਇਸ ਨੂੰ ਮੌਕਾ ਸਮਝਿਆ। ‘ਦਿ ਗ਼ਦਰ’ ਅਖ਼ਬਾਰ ਦੇ 5 ਅਗਸਤ 1914 ਦੇ ਅੰਕ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੁੱਧ ਜੰਗ ਦੇ ਐਲਾਨ ਦਾ ਫੈਸਲਾ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ। ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਦੋ ਹੋਰ ਗ਼ਦਰੀ ਆਗੂਆਂ, ਸਤਿਅਨ ਸੇਨ ਅਤੇ ਵਿਸ਼ਨੂੰ ਗਣੇਸ਼ ਪਿੰਗਲੇ ਦੇ ਨਾਲ ਨਵੰਬਰ 1914 ਵਿੱਚ ਭਾਰਤ ਵਾਪਸ ਆਏ।

ਉਨ੍ਹਾਂ ਨੇ ਰਾਸ ਬਿਹਾਰੀ ਬੋਸ ਨਾਲ ਮੁਲਾਕਾਤ ਕੀਤੀ ਅਤੇ 21 ਫਰਵਰੀ 1915 ਨੂੰ ਦੇਸ਼ ਵਿਆਪੀ ਬਗ਼ਾਵਤ ਸ਼ੁਰੂ ਕਰਨ ਦੀ ਯੋਜਨਾ ਬਣਾਈ। ਬਦਕਿਸਮਤੀ ਨਾਲ ਪਾਰਟੀ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੇ ਗਏ ਕਿਰਪਾਲ ਸਿੰਘ ਨਾਮਕ ਇੱਕ ਪੁਲਿਸ ਮੁਖ਼ਬਰ ਨੇ ਸਰਕਾਰ ਨੂੰ ਇਸ ਯੋਜਨਾ ਬਾਰੇ ਸੂਚਿਤ ਕਰ ਦਿੱਤਾ। ਇਸ ਗੱਦਾਰੀ ਕਾਰਨ ਬਗ਼ਾਵਤ ਅਸਫਲ ਹੋ ਗਈ ਅਤੇ 19 ਫਰਵਰੀ ਨੂੰ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਗ਼ਦਰੀ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਏ ਗਏ।

2 ਮਾਰਚ 1915 ਨੂੰ ਕਰਤਾਰ ਸਿੰਘ ਨੂੰ ਉਨ੍ਹਾਂ ਦੇ ਸਾਥੀਆਂ ਸਮੇਤ ਜ਼ਿਲ੍ਹਾ ਲਾਇਲਪੁਰ ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ। 13 ਸਤੰਬਰ 1915 ਨੂੰ ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਮੁਕੱਦਮੇ ਦਾ ਫੈਸਲਾ ਸੁਣਾਇਆ ਗਿਆ। ਅਦਾਲਤ ਨੇ ਕਰਤਾਰ ਸਿੰਘ ਨੂੰ ਸਭ ਤੋਂ ਖ਼ਤਰਨਾਕ ਬਾਗ਼ੀ ਕਰਾਰ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ ਕਿ ਉਹ ਰਹਿਮ ਦੇ ਹੱਕਦਾਰ ਨਹੀਂ ਹਨ। 16 ਨਵੰਬਰ 1915 ਨੂੰ ਸਿਰਫ਼ 18 ਸਾਲ ਦੀ ਛੋਟੀ ਉਮਰ ਵਿੱਚ, ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਨੂੰ ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ।`,
    artist: "ਗੁਰਸ਼ਰਨ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "34-bibi-gulab-kaur.jpg": {
    titlePa: "ਬੀਬੀ ਗੁਲਾਬ ਕੌਰ",
    descriptionPa: `ਬੀਬੀ ਗੁਲਾਬ ਕੌਰ ਫਿਲੀਪੀਨਜ਼ ਦੇ ਮਨੀਲਾ ਵਿੱਚ ਗ਼ਦਰ ਪਾਰਟੀ ਦੀ ਆਗੂ ਸੀ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 1890 ਵਿੱਚ ਪੰਜਾਬ ਦੇ ਸੰਗਰੂਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਇੱਕ ਛੋਟੇ ਜਿਹੇ ਪਿੰਡ ਵਿੱਚ ਇੱਕ ਗਰੀਬ ਕਿਸਾਨ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦਾ ਵਿਆਹ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਮਾਨ ਸਿੰਘ ਨਾਲ ਹੋ ਗਿਆ ਸੀ। ਬ੍ਰਿਟਿਸ਼ ਨੀਤੀਆਂ ਦੁਆਰਾ ਆਪਣੀਆਂ ਜ਼ਮੀਨਾਂ ਤੋਂ ਉਜਾੜੇ ਗਏ ਬਹੁਤ ਸਾਰੇ ਪੰਜਾਬੀ ਕਿਸਾਨਾਂ ਵਾਂਗ, ਉਹ ਵੀ ਰੋਜ਼ੀ-ਰੋਟੀ ਦੀ ਭਾਲ ਵਿੱਚ ਮਨੀਲਾ ਆ ਗਏ।

ਮਨੀਲਾ ਵਿੱਚ ਉਹ ਬਾਬਾ ਹਾਫਿਜ਼ ਅਬਦੁੱਲਾ (ਫੱਜਾ), ਬਾਬਾ ਬੰਤਾ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਹਰਨਾਮ ਸਿੰਘ (ਤੁੰਡੀਲਾਟ) ਜੋ ਕਿ ਮਨੀਲਾ ਵਿੱਚ ਗ਼ਦਰ ਪਾਰਟੀ ਦੀ ਸ਼ਾਖਾ ਦੇ ਆਗੂ ਸਨ, ਦੇ ਸੰਪਰਕ ਵਿੱਚ ਆਈ। ਗੁਲਾਬ ਕੌਰ ਭਾਰਤ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਸ਼ਾਸਨ ਨੂੰ ਉਖਾੜ ਸੁੱਟਣ ਦੀ ਲਹਿਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਈ ਅਤੇ ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਮੁੱਖ ਸੰਗਠਨ ਕਰਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਬਣ ਗਈ।

ਉਨ੍ਹਾਂ ਨੇ ਭਾਰਤੀ ਵਸਨੀਕਾਂ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨ ਲਈ ਪੂਰੇ ਫਿਲੀਪੀਨਜ਼ ਵਿੱਚ ਯਾਤਰਾ ਕੀਤੀ ਅਤੇ ਪਾਰਟੀ ਲਈ ਹਥਿਆਰ ਅਤੇ ਪੈਸਾ ਵੀ ਇਕੱਠਾ ਕੀਤਾ।

ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਸੱਦੇ ਦਾ ਜਵਾਬ ਦਿੰਦਿਆਂ, ਉਹ ਭਾਰਤ ਵਾਪਸ ਆ ਗਈ ਅਤੇ ਪੰਜਾਬ ਵਿੱਚ ਆਪਣਾ ਇਨਕਲਾਬੀ ਕੰਮ ਜਾਰੀ ਰੱਖਿਆ। ਇਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ ਦੋ ਸਾਲਾਂ ਤੱਕ ਬਦਨਾਮ ਲਾਹੌਰ ਕਿਲ੍ਹੇ ਵਿੱਚ ਰੱਖ ਕੇ ਤਸੀਹੇ ਦਿੱਤੇ ਗਏ।

ਉਹ ਇਸ ਨਾਲ ਘਬਰਾਈ ਨਹੀਂ ਅਤੇ ਉਨ੍ਹਾਂ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਹਿਯੋਗੀਆਂ ਦੇ ਵਿਰੁੱਧ ਲੋਕਾਂ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨਾ ਜਾਰੀ ਰੱਖਿਆ। ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ 1941 ਵਿੱਚ ਹੋ ਗਈ।

ਇਹ ਭਾਰਤ ਦੇ ਲੋਕਾਂ ਦੀ ਬਦਕਿਸਮਤੀ ਹੈ ਕਿ ਇਤਿਹਾਸਕਾਰਾਂ ਨੇ ਭਾਰਤ ਵਿੱਚ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਸਹਿਯੋਗੀਆਂ ਬਾਰੇ ਕਿਤਾਬਾਂ ਲਿਖਦੇ ਸਮੇਂ, ਬੀਬੀ ਗੁਲਾਬ ਕੌਰ ਵਰਗੀਆਂ ਔਰਤਾਂ ਦੇ ਯੋਗਦਾਨ ਨੂੰ ਅਣਗੌਲਿਆ ਕਰ ਦਿੱਤਾ ਹੈ।`,
    artist: "ਡੇਨੀਅਲ",
    medium: "Oil Painting",
  },

  "35-babbar-akali-movement.jpg": {
    titlePa: "ਬਬਰ ਅਕਾਲੀ ਲਹਿਰ",
    descriptionPa: `ਬਬਰ ਅਕਾਲੀ ਲਹਿਰ 1920 ਦੇ ਦਹਾਕੇ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਈ ਚੱਲੀ ਅਕਾਲੀ ਲਹਿਰ ਦੀ ਇੱਕ ਹਥਿਆਰਬੰਦ ਸ਼ਾਖਾ ਸੀ। ਅਕਾਲੀ ਲਹਿਰ ਭਾਵੇਂ ਸ਼ਾਂਤਮਈ ਸੀ, ਪਰ 1921 ਵਿੱਚ ਤਰਨ ਤਾਰਨ ਅਤੇ ਖਾਸ ਕਰਕੇ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦੇ ਖੂਨੀ ਸਾਕਿਆਂ ਨੇ ਸਿੱਖਾਂ ਦੀ ਇੱਕ ਧਿਰ ਨੂੰ ਸ਼ਾਸਤਰ ਚੁੱਕਣ ਲਈ ਮਜਬੂਰ ਕਰ ਦਿੱਤਾ ਸੀ। ਬਬਰ ਅਕਾਲੀ ਉਹ ਸੂਰਵੀਰ ਯੋਧੇ ਸਨ ਜਿਨ੍ਹਾਂ ਨੇ ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਦੀ ਜੜ੍ਹ ਪੁੱਟਣ ਲਈ ਸ਼ਸਤਰਧਾਰੀ ਹੋ ਮੁਕਾਬਲਾ ਕੀਤਾ ਅਤੇ ਫਾਸੀਆਂ ਦੇ ਰੱਸੇ ਚੁਮਦਿਆਂ ਜੇਲ੍ਹਾਂ ਦੀਆਂ ਕਾਲ ਕੋਠੜੀਆਂ ਵਿੱਚ ਆਪਣੇ ਸਬਰ ਅਤੇ ਪ੍ਰਪੱਕ ਸਿਦਕ ਨਾਲ ਅਡੋਲ ਰਹਿ ਉਮਰ ਕੈਦਾ ਕੱਟੀਆਂ ਅਤੇ ਸਾਕਿਆਂ ਵਿੱਚ ਪੁਲਿਸ ਦਾ ਮੁਕਾਬਲਾ ਕਰਦਿਆਂ ਆਪਣੇ ਸੱਚੇ ਅਤੇ ਉੱਚੇ ਇਖਲਾਕ ਦੇ ਦਰਸ਼ਨ ਕਰਵਾਏ।

ਇਹ ਲਹਿਰ ਦੁਆਬੇ ਦੀ ਧਰਤੀ ਵਿਚ ਸ਼ੁਰੂ ਹੋਈ ਸੀ। ਸਿੱਖ ਲੰਬਾ ਸਮਾਂ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਜਬਰ ਦਾ ਮੁਕਾਬਲਾ ਸਬਰ ਨਾਲ ਕਰਦੇ ਰਹੇ। ਸਿੱਖਾਂ ਵਲੋਂ ਜਾਲਮ ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਨੂੰ ਹੋੜਨ ਲਈ ਦਲੀਲ ਤੋਂ ਸ਼ੁਰੂ ਕਰਦਿਆਂ ਅਪੀਲ ਕਰਨ ਤੱਕ ਹਰੇਕ ਕਿਸਮ ਦਾ ਰਾਸਤਾ ਅਖਤਿਆਰ ਕੀਤਾ। ਇਸ ਦਰਮਿਆਨ ਸਿੱਖਾਂ ਵਲੋਂ ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਹਿਰ ਚਲਾਈ ਗਈ ਜਿਸਦੀ ਰੂਪ ਰੇਖਾ ਬਿਲਕੁਲ ਸ਼ਾਂਤਮਈ ਸੀ। ਪਰ ਜਾਬਰ ਹਕੂਮਤ ਉਨ੍ਹਾਂ ਹੀ ਹੋਰ ਸਿਰ ਚੜਦੀ ਗਈ ਅਤੇ ਅੰਗਰੇਜ਼ਾਂ ਵਲੋਂ ਤਸ਼ੱਦਦ ਦੀ ਧਾਰ ਹੋਰ ਜਿਆਦਾ ਤੇਜ਼ ਕਰ ਦਿੱਤੀ। ਸੋ ਅਖੀਰ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦਾ ਸਾਕਾ ਅਤੇ ਗੁਰੂ ਕੇ ਬਾਗ ਦੇ ਮੋਰਚੇ ਦਰਮਿਆਨ ਹਕੂਮਤ ਵਲੋਂ ਕੀਤਾ ਤਸ਼ੱਦਦ ਸਿੱਖਾਂ ਲਈ ਅਸਹਿਣਸ਼ੀਲ ਸੀ।

ਇਨ੍ਹਾਂ ਘਟਨਾਵਾਂ ਨੇ ਪ੍ਰਤੱਖ ਕਰ ਦਿੱਤਾ ਸੀ ਕਿ ਹਕੂਮਤ ਪੂਰੀ ਤਰ੍ਹਾਂ ਜਰਵਾਣੇ ਦਾ ਰੂਪ ਧਾਰ ਚੁੱਕੀ ਹੈ; ਸੋ ਹੁਣ ਇਸ ਦਾ ਮੁਕਾਬਲਾ ਕਰਨ ਲਈ ਸ਼ਾਂਤਮਈ ਮਾਰਗ ਉਚਿਤ ਨਹੀਂ ਹੈ ਅਤੇ ਗੁਰੂ ਦੇ ਹੁਕਮ ਅਨੁਸਾਰ ਅਤੇ ਸਿੱਖ ਇਤਿਹਾਸ ਤੋਂ ਪ੍ਰੇਰਣਾ ਲੈਂਦਿਆਂ ਜਰਵਾਣੇ ਦੀ ਭੱਖਿਆ ਕਰਨ ਲਈ ਹਥਿਆਰਬੰਦ ਹੋਣਾ ਅਤਿ ਜਰੂਰੀ ਹੈ। ਇਸ ਤਰ੍ਹਾਂ ਕੁਝ ਨੌਜਵਾਨ ਹਕੂਮਤ ਖਿਲਾਫ ਹਥਿਆਰਬੰਦ ਸੰਘਰਸ਼ ਕਰਨ ਨਿੱਤਰੇ।

ਬਬਰ ਅਕਾਲੀਆਂ ਦਾ ਮੁੱਖ ਉਦੇਸ਼—ਬਬਰ ਅਕਾਲੀਆਂ ਦੇ ਮੁਕੱਦਮਿਆਂ ਦੀ ਜੱਜਮੈਂਟ ਦੇਣ ਸਮੇਂ ਸ਼ੈਸ਼ਨ ਜੱਜ ਮਿਸਟਰ ਜੇ. ਕੇ. ਟਪ ਨੇ ਸਪਸ਼ਟ ਕੀਤਾ—ਭਾਰਤ ਨੂੰ ਅਜ਼ਾਦ ਕਰਾ ਕੇ ਪੰਜਾਬ ਵਿੱਚ ਸਿੱਖ ਰਾਜ ਦੀ ਸਥਾਪਨਾ ਤੇ ਭਾਰਤ ਵਿਚ ਸਵਰਾਜ ਕਾਇਮ ਕਰਨਾ ਸੀ। ਦੂਜਾ ਉਦੇਸ਼ ਬ੍ਰਿਟਿਸ਼ ਅਫਸਰਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਝੋਲੀਚੁੱਕਾਂ (ਭਾਰਤੀ ਮੁਖਬਰ ਅਤੇ ਗੱਦਾਰ) ਦਾ ‘ਸੋਧਾ’ ਲਗਾਉਣਾ ਸੀ।

ਮਾਰਚ 1921 ਵਿੱਚ ਹੁਸ਼ਿਆਰਪੁਰ ਦੀ ਸਿੱਖ ਵਿੱਦਿਅਕ ਕਾਨਫਰੰਸ ਦੌਰਾਨ ਮਾਸਟਰ ਮੋਤਾ ਸਿੰਘ ਅਤੇ ਫੌਜ ਦੇ ਸਾਬਕਾ ਹੌਲਦਾਰ ਮੇਜਰ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕੱਟੜਪੰਥੀਆਂ ਨੇ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦੇ ਕਤਲਾਂ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਲੋਕਾਂ ਤੋਂ ਬਦਲਾ ਲੈਣ ਦੀ ਗੁਪਤ ਯੋਜਨਾ ਬਣਾਈ। ਨਵੰਬਰ 1921 ਵਿੱਚ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਨੇ ‘ਚੱਕਰਵਰਤੀ ਜੱਥਾ’ ਬਣਾਇਆ ਅਤੇ ਦੋਆਬੇ ਦੇ ਕਿਸਾਨਾਂ ਅਤੇ ਫੌਜੀਆਂ ਵਿੱਚ ਪ੍ਰਚਾਰ ਸ਼ੁਰੂ ਕੀਤਾ।

ਅਗਸਤ 1922 ਦੇ ਅੰਤ ਵਿੱਚ ਦੋਵਾਂ ਜੱਥਿਆਂ ਨੂੰ ਮਿਲਾ ਕੇ ਬਬਰ ਅਕਾਲੀ ਜੱਥਾ ਬਣਾਇਆ ਗਿਆ। ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਨੂੰ ਜਥੇਦਾਰ ਚੁਣਿਆ ਗਿਆ। ਇਸ ਜੱਥੇ ਨੇ ‘ਬਬਰ ਅਕਾਲੀ ਦੋਆਬਾ’ ਨਾਂ ਦਾ ਇੱਕ ਗੁਪਤ ਅਖ਼ਬਾਰ ਵੀ ਚਲਾਇਆ। ਬਬਰ ਅਕਾਲੀ ਸਿੱਖੀ ਮਰਿਆਦਾ ਦੇ ਬਹੁਤ ਪੱਕੇ ਸਨ—ਨਿਤਨੇਮ, ਔਰਤਾਂ ਦੀ ਇੱਜ਼ਤ, ਅਤੇ ਨਿੱਜੀ ਰੰਜਿਸ਼ ਤੋਂ ਪਰਹੇਜ਼ ਵਰਗੇ ਨਿਯਮ ਬਣਾਏ।

ਇਹ ਲਹਿਰ 1922 ਦੇ ਅੱਧ ਤੋਂ 1923 ਦੇ ਅੰਤ ਤੱਕ ਬਹੁਤ ਸਰਗਰਮ ਰਹੀ। ਸਰਕਾਰ ਨੇ ਅਪ੍ਰੈਲ 1923 ਵਿੱਚ ਜੱਥੇ ਨੂੰ ਗੈਰ-ਕਾਨੂੰਨੀ ਐਲਾਨ ਦਿੱਤਾ। ਬਬਰਾਂ ਨੂੰ ਫੜਨ ਲਈ ਇਨਾਮ ਰੱਖੇ ਗਏ। ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਫੜੇ ਗਏ ਬਬਰਾਂ ਦਾ ਮੁਕੱਦਮਾ 15 ਅਗਸਤ 1923 ਨੂੰ ਸ਼ੁਰੂ ਹੋਇਆ। 28 ਫਰਵਰੀ 1925 ਨੂੰ ਫੈਸਲਾ ਸੁਣਾਇਆ ਗਿਆ: 91 ਮੁਲਜ਼ਮਾਂ ਵਿੱਚੋਂ 34 ਨੂੰ ਬਰੀ ਕੀਤਾ ਗਿਆ ਅਤੇ 6 ਨੂੰ ਮੌਤ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ; 49 ਨੂੰ ਵੱਖ-ਵੱਖ ਮਿਆਦ ਦੀਆਂ ਸਜ਼ਾਵਾਂ ਦਿੱਤੀਆਂ ਗਈਆਂ। 27 ਫਰਵਰੀ 1926 ਨੂੰ ਛੇ ਬਬਰਾਂ ਨੂੰ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "36-babar-karm-singh-rakkad.jpg": {
    titlePa: "ਬਬਰ ਕਰਮ ਸਿੰਘ",
    descriptionPa: `ਬਬਰ ਕਰਮ ਸਿੰਘ ਦਾ ਜਨਮ 20-3-1880 ਨੂੰ ਨੱਥਾ ਸਿੰਘ ਥਾਂਦੀ ਦੇ ਘਰ ਪਿੰਡ ਦੌਲਤਪੁਰ ਵਿਖੇ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਦੀ ਮਾਤਾ ਦਾ ਨਾਂ ਦੁੱਲੀ ਸੀ। ਕਰਮ ਸਿੰਘ ਦਾ ਪਹਿਲਾ ਨਾਂ ਨਰੈਣ ਸਿੰਘ ਸੀ। ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਛਕਣ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦਾ ਨਾਂ ਕਰਮ ਸਿੰਘ ਰੱਖਿਆ ਗਿਆ।

ਬਬਰ ਕਰਮ ਸਿੰਘ ਨੇ 8 ਸਾਲ ਫ਼ੌਜ ਦੀ ਨੌਕਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ ਆਪਣੇ ਪਿੰਡ ਦੌਲਤਪੁਰ ਆ ਗਏ ਤੇ ਸੰਤ ਕਰਮ ਸਿੰਘ ਹੋਤੀ ਮਰਦਾਨ ਦੇ ਅਨੁਯਾਈ ਬਣ ਗਏ।

ਅੰਤ ਵਿੱਚ ਭੋਰਾ ਖੋਦ ਕੇ ਇੱਕ ਲੋਹੇ ਦੇ ਪਿੰਜਰੇ ਵਿੱਚ ਬਬਰ ਕਰਮ ਸਿੰਘ ਨਾਮ ਸਿਮਰਨ ਵਿੱਚ ਲੀਨ ਹੋ ਗਏ। ਇਸ ਭੋਰੇ ਨੂੰ ‘ਉਡਾਰੂ ਪ੍ਰੈਸ’ ਦੇ ਤੌਰ ‘ਤੇ ਵਰਤਿਆ ਗਿਆ ਜਿੱਥੋਂ ਕਿ ਬਬਰ ਅਕਾਲੀ ਦੋਆਬਾ ਅਖਬਾਰ ਨਿੱਕਲਦਾ ਸੀ। ਜਿਸ ਦੇ ਬਬਰ ਕਰਮ ਸਿੰਘ ਐਡੀਟਰ ਸਨ। ਅੱਜ ਕੱਲ ਉਨ੍ਹਾਂ ਦੀ ਯਾਦ ਵਿੱਚ ਉਸ ਥਾਂ ਬਬਰ ਕਰਮ ਸਿੰਘ ਮੈਮੋਰੀਅਲ ਸਕੂਲ ਹੈ, ਇਸਨੂੰ ਅਜਾਇਬ ਘਰ ਦੇ ਤੌਰ ‘ਤੇ ਵੀ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਜਿੱਥੇ ਸਮੂਹ ਬਬਰਾਂ ਤੇ ਅਜ਼ਾਦੀ ਘੁਲਾਟੀਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਹਨ।

ਬਬਰ ਦੇ ਚਾਚਾ ਵਰਿਆਮ ਸਿੰਘ ਨੂੰ ਜਦੋਂ ਬਬਰ ਕਰਮ ਸਿੰਘ ਦੇ ਸੰਤ ਸੁਭਾਅ ਬਾਰੇ ਪਤਾ ਲੱਗਾ ਤਾਂ ਉਨ੍ਹਾਂ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਕਨੇਡਾ ਸੱਦ ਲਿਆ। ਕਨੇਡਾ ਪੁੱਜ ਕੇ ਵੀ ਕਰਮ ਸਿੰਘ ਇਕ ਜੋਗੀ ਦਾ ਜੀਵਨ ਬਿਤਾਉਣ ਲੱਗੇ।

ਇਸ ਸਮੇਂ ਗਦਰ ਲਹਿਰ ਦਾ ਆਰੰਭ ਹੋਇਆ ਹੀ ਸੀ ਅਤੇ ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਦੇ ਦਿਨੋ-ਦਿਨ ਵੱਧ ਰਹੇ ਧੱਕੇ ਕਾਰਨ ਕਰਮ ਸਿੰਘ ਦਾ ਮਨ ਗਰਮਾ ਉੱਠਿਆ ਅਤੇ ਇਸ ਤਰ੍ਹਾਂ ਉਹ ਗਦਰ ਲਹਿਰ ਵਿੱਚ ਹਿੱਸਾ ਲੈਣ ਲੱਗ ਪਏ ਤੇ ਕਨੇਡਾ ਛੱਡ ਕੇ ਵਾਪਸ ਭਾਰਤ ਆ ਗਏ।

ਭਾਰਤ ਨੂੰ ਆਜ਼ਾਦ ਕਰਵਾਉਣ ਦੀ ਲਗਨ ਨਾਲ ਉਹਨਾਂ ਨੇ ਬਬਰ ਅਕਾਲੀ ਚੱਕਰਵਰਤੀ ਜਥਾ ਬਣਾਇਆ, ਜਿਸ ਦੇ ਉਹ ਜਥੇਦਾਰ ਬਣੇ। ਇਸ ਤੋਂ ਬਾਅਦ ਕਿਸ਼ਨ ਸਿੰਘ ਗੜਗੱਜ ਨਾਲ ਮਿਲ ਕੇ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨਾਲ ਮਰਨ-ਮਾਰਨ ਦੀ ਬਾਜ਼ੀ ਲਾ ਕੇ ਮੈਦਾਨ ਵਿੱਚ ਉੱਤਰ ਆਏ।

ਜਥੇਦਾਰ ਕਰਮ ਸਿੰਘ ਦੌਲਤਪੁਰ ਪੂਰਨ ਗੁਰਸਿੱਖ, ਅਣਥੱਕ ਅਤੇ ਅਣਖੀਲਾ ਕ੍ਰਾਂਤੀਕਾਰੀ ਸੀ। ਲੋਕਾਂ ਲਈ ਹਰਮਨ ਪਿਆਰਾ, ਧਰਮ ਤੇ ਪੱਖਪਾਤ ਤੋਂ ਉੱਚਾ ਛੂਤਛਾਤ ਦਾ ਵੈਰੀ ਸੀ।

ਉਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿੱਚ ਇੱਕ ਗੱਲ ਜੰਮ ਗਈ ਸੀ ਕਿ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨੂੰ ਮਾਰਨ ਦੀ ਥਾਂ ਘਰ ਦੇ ਭੇਤੀ ਝੋਲੀਚੁੱਕ ਮਾਰੋ ਜੋ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੀਆਂ ਜੜਾਂ ਪੇਂਡੂ ਇਲਾਕਿਆਂ ਵਿੱਚ ਪੱਕੀਆਂ ਕਰ ਬੈਠੇ ਹਨ। ਇਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਨੇ ਅਨੇਕਾਂ ਝੋਲੀਚੁੱਕਾਂ ਨੂੰ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ।

1 ਸਤੰਬਰ 1923 ਦੀ ਸਵੇਰ ਨੂੰ ਵਾਅਦਾ ਮੁਆਫ਼ ਗਵਾਹ ਤੇ ਮਿੱਤਰਮਾਰ ਅਨੂਪ ਸਿੰਘ ਮਾਣੋਕੇ ਨੇ ਪਿੰਡ ਬਬੇਲੀ ਵਿੱਚ ਪੁਲਿਸ ਨੂੰ ਸੂਹ ਦੇ ਕੇ 2000 ਹਥਿਆਰਬੰਦ ਪੁਲਿਸ ਦੀ ਟੱਕਰ ਵਿੱਚ ਚੌਂਤਾ ਸਾਹਿਬ ਚੋਅ ਦੇ ਕੰਡੇ ‘ਤੇ ਸ਼ਹੀਦ ਕਰਵਾਇਆ। ਇਸ ਸਾਕੇ ਵਿੱਚ ਬਬਰ ਕਰਮ ਸਿੰਘ, ਬਬਰ ਉਦੈ ਸਿੰਘ, ਬਬਰ ਮਹਿੰਦਰ ਸਿੰਘ (ਪੰਡੋਰੀ ਗੰਗਾ ਸਿੰਘ), ਅਤੇ ਬਬਰ ਬਿਸ਼ਨ ਸਿੰਘ ਮਾਂਗਟ ਸ਼ਹੀਦ ਹੋ ਗਏ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "37-babar-ratan-singh.jpg": {
    titlePa: "ਬਬਰ ਰਤਨ ਸਿੰਘ",
    descriptionPa: `ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਸਪੁੱਤਰ ਸ. ਜਵਾਹਰ ਸਿੰਘ ਰੱਕੜ ਲੰਬੜਦਾਰ ਪਿੰਡ ਰੱਕੜਾਂ ਬੇਟ ਦਾ ਰਹਿਣ ਵਾਲਾ ਸੀ। ਉਹਨਾਂ ਦੀ ਮਾਤਾ ਦਾ ਨਾਂ ਗੋਖੀ ਸੀ। ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਦਾ ਵਿਆਹ ਪ੍ਰੇਮ ਕੌਰ ਪਿੰਡ ਸਿਆਣਾ ਨਾਲ ਹੋਇਆ। ਉਹਨਾਂ ਨੇ ਦਸਵੀਂ ਜਮਾਤ ਰਾਹਾਂ ਤੋਂ ਕੀਤੀ। ਉਹ 1908 ਵਿੱਚ ਫੌਜ ਵਿੱਚ ਭਰਤੀ ਹੋਏ ਤੇ ਦਫਾਦਾਰ ਬਣ ਗਏ।

ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਫੌਜ ਵਿੱਚੋਂ ਡਿਸਚਾਰਜ ਲੈ ਕੇ ਆਪਣੇ ਪਿੰਡ ਆ ਕੇ ਖੇਤੀ ਕਰਨ ਲੱਗ ਪਏ। ਉਹ ਦੁਬਾਰਾ ਫਿਰ ਫੌਜ ਵਿੱਚ ਭਰਤੀ ਹੋਏ। ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੁਆਰਾ ਹੁੰਦੇ ਅਸਹਿ ਅੱਤਿਆਚਾਰ ਦੇਖ ਕੇ ਉਨ੍ਹਾਂ ਨੇ ਦੁਬਾਰਾ ਡਿਸਚਾਰਜ ਲੈ ਲਿਆ ਤੇ ਅਕਾਲੀ ਜਥੇ ਦੇ ਮੈਂਬਰ ਬਣ ਗਏ।

ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੂੰ ਜਦੋਂ ਉਹ ਆਪਣੇ ਰਿਸ਼ਤੇਦਾਰ ਕਰੋੜਾ ਸਿੰਘ ਦੀ ਸ਼ਾਦੀ ‘ਤੇ ਗਿਆ ਸੀ, ਉੱਥੇ ਕਰੋੜਾ ਸਿੰਘ ਸਮੇਤ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ। ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਤਿੰਨ ਸਾਲ ਕੈਦ ਕੱਟਣ ਉਪਰੰਤ 1929 ਵਿੱਚ ਰਿਹਾਅ ਹੋਇਆ ਤੇ ਬਬਰ ਲਹਿਰ ਵਿੱਚ ਹੋਰ ਵੀ ਵੱਧ ਚੜ੍ਹ ਕੇ ਹਿੱਸਾ ਲੈਣ ਲੱਗ ਪਿਆ।

ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਖਿਲਾਫ ਇਸ਼ਤਿਹਾਰ ਜਾਰੀ ਹੋ ਗਏ ਕਿ ਬਬਰ ਨੂੰ ਗ੍ਰਿਫਤਾਰ ਕਰਾਉਣ ਵਾਲੇ ਨੂੰ ਇੱਕ ਮੁਰੱਬਾ ਜਮੀਨ ਤੇ ਹੋਰ ਭਾਰੀ ਇਨਾਮ ਦਿੱਤੇ ਜਾਣਗੇ। ਉਸ ‘ਤੇ ਇਹ ਤਿੰਨ ਦੋਸ਼ ਲਗਾਏ ਗਏ: (1) ਨਜਾਇਜ਼ ਹਥਿਆਰ ਤੇ ਦਾਰੂ-ਸਿੱਕਾ ਰੱਖਣਾ (2) ਪੁਲਿਸ ਨੂੰ ਧਮਕੀਆਂ ਦੇਣਾ (3) ਬੇਅਮਨੀ ਫੈਲਾਉਣਾ ਤੇ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਵਿਰੁੱਧ ਬਗਾਵਤ ਕਰਨੀ।

ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੂੰ ਮੁਕੱਦਮੇ ਉਪਰੰਤ ਸਖਤ ਸਜ਼ਾ ਹੋਈ। ਕੈਦ ਵਿੱਚੋਂ ਦੌੜਨ ਉਪਰੰਤ ਉਸ ਨੂੰ ਫੜਿਆ ਗਿਆ ਤੇ ਉਸਨੂੰ ਅੰਡੇਮਾਨ ਜੇਲ ਵਿੱਚ ਭੇਜਿਆ ਗਿਆ। ਫਿਰ ਸੈਂਟਰ ਜੇਲ ਲਾਹੌਰ ਵਿੱਚ ਰੱਖਿਆ ਗਿਆ। ਉਹ ਮੁੜ ਸਿਪਾਹੀਆਂ ਦਾ ਅਸਲਾ ਖੋਹ ਕੇ ਆਪਣੇ ਪਿੰਡ ਸਹੀ ਸਲਾਮਤ ਪੁੱਜਾ।

ਪੁਲਿਸ ਦਿਨ ਰਾਤ ਭਾਲ ਕਰਦੀ ਰਹੀ। ਰੁੜਕੀ ਖਾਸ ਦੇ ਲੋਕਾਂ ਨੇ ਆਪਣੇ ਘਰਾਂ ਵਿੱਚ ਬਬਰ ਨੂੰ ਸ਼ਰਨ ਦਿੱਤੀ। 24 ਮਈ 1923 ਨੂੰ ਪਿੰਡ ਸਿੰਬਲੀ ਵਿੱਚ ਖੂਫੀਆ ਮੀਟਿੰਗ ਦੇਸ਼ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਜੱਦੋ-ਜਹਿਦ ਕਰਨ ਲਈ ਬੁਲਾਈ ਗਈ ਸੀ ਜਿਸ ਵਿੱਚ ਅਨੇਕਾਂ ਬਬਰਾਂ ਨੇ ਭਾਗ ਲਿਆ। ਇਸ ਮੀਟਿੰਗ ਵਿੱਚ ਦੇਸ਼ ਭਗਤਾਂ ਨੇ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਦੇ ਹੌਸਲੇ, ਕੁਰਬਾਨੀ ਤੇ ਉਤਸ਼ਾਹ ਦੀ ਸ਼ਲਾਘਾ ਕੀਤੀ।

ਰੁੜਕੀ ਖਾਸ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮੀਆਂ ਤੇ ਜੁਝਾਰੂਆਂ ਦਾ ਕਿਲ੍ਹਾ ਸੀ। 15 ਜੁਲਾਈ 1932 ਨੂੰ ਪਿੰਡ ਸਿੰਬਲੀ ਵਿੱਚ ਮਿੱਤਰਮਾਰ ਰਾਹੀਂ ਛਾਪਾ ਮਰਵਾ ਕੇ ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੂੰ ਸ਼ਹੀਦ ਕਰਵਾ ਦਿੱਤਾ ਗਿਆ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "38-babar-kishan-singh-gadgajj.jpg": {
    titlePa: "ਬਬਰ ਕਿਸ਼ਨ ਸਿੰਘ ਗੜਗੱਜ",
    descriptionPa: `ਬਬਰ ਕਿਸ਼ਨ ਸਿੰਘ ਗੜਗੱਜ ਬਬਰ ਅਕਾਲੀ ਲਹਿਰ ਦੇ ਮੋਢੀਆਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ ਜਲੰਧਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਬੀਰਿੰਗ ਵਿਖੇ ਸਰਦਾਰ ਫਤਿਹ ਸਿੰਘ ਦੇ ਘਰ 1886 ਨੂੰ ਹੋਇਆ ਸੀ। ‘ਗੜਗੱਜ’ ਤਖ਼ੱਲਸ ਉਹਨਾਂ ਨੂੰ ਜੋਸ਼ੀਲੇ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਭਾਸ਼ਣ ਦੇਣ ਕਾਰਨ ਲੋਕਾਂ ਵੱਲੋਂ ਦਿੱਤਾ ਗਿਆ ਸੀ।

ਕਿਸ਼ਨ ਸਿੰਘ ਨੇ ਲਗਭਗ ਪੰਦਰਾਂ ਸਾਲ ਫੌਜ ਵਿੱਚ ਨੌਕਰੀ ਕੀਤੀ, ਜਿੱਥੇ ਉਹ ਹੌਲਦਾਰ ਮੇਜਰ ਦੇ ਅਹੁਦੇ ਤੱਕ ਪਹੁੰਚੇ। ਫੌਜ ਵਿੱਚ ਰਹਿੰਦਿਆਂ ਹੀ ਉਹਨਾਂ ਦੇ ਮਨ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੋਧੀ ਵਿਚਾਰ ਪੈਦਾ ਹੋਣੇ ਸ਼ੁਰੂ ਹੋ ਗਏ ਸਨ ਅਤੇ ਇੱਕ ਵਾਰ ਤਾਂ ਉਹਨਾਂ ਨੂੰ ਅੰਗਰੇਜ਼ ਵਿਰੋਧੀ ਟਿੱਪਣੀਆਂ ਕਾਰਨ 28 ਦਿਨਾਂ ਦੀ ਹਿਰਾਸਤ ਵੀ ਝੱਲਣੀ ਪਈ ਸੀ।

ਫੌਜ ਤੋਂ ਅਸਤੀਫ਼ਾ ਦੇਣ ਤੋਂ ਬਾਅਦ ਉਹ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ ਅਤੇ ਜਨਰਲ ਸਕੱਤਰ ਬਣੇ। ਪਰ ਉਹ ਅਕਾਲੀਆਂ ਦੀ ਅਹਿੰਸਕ ਕਾਰਜ ਪ੍ਰਣਾਲੀ ਦੀ ਬਜਾਏ ਹਥਿਆਰਬੰਦ ਸੰਘਰਸ਼ ਨੂੰ ਤਰਜੀਹ ਦਿੰਦੇ ਸਨ। ਹੁਸ਼ਿਆਰਪੁਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰੀ ਦੇ ਵਾਰੰਟ ਜਾਰੀ ਹੋਣ ‘ਤੇ ਉਹ ਭਗੌੜੇ ਹੋ ਗਏ ਅਤੇ ਜ਼ਮੀਨਦੋਜ ਹੋ ਕੇ ਕੰਮ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ।

ਪਹਿਲਾ ਉਹਨਾਂ ਨੇ ਇਕ ‘ਚੱਕਰਵਰਤੀ ਜੱਥਾ’ ਬਣਾਇਆ, ਜਿਸ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਬਬਰ ਅਕਾਲੀ ਨਾਂ ਦਿੱਤਾ ਗਿਆ। 1922 ਵਿੱਚ ਉਹ ਇਸ ਜਥੇ ਦੇ ਪ੍ਰਧਾਨ ਚੁਣੇ ਗਏ। ਬਬਰ ਅਕਾਲੀ ਦਲ ਦਾ ਮੁੱਖ ਮਕਸਦ ਹਥਿਆਰਾਂ ਦੀ ਵਰਤੋਂ ਰਾਹੀਂ ਅੰਗਰੇਜ਼ੀ ਹਕੂਮਤ ਅਤੇ ਉਸ ਦੇ ਝੋਲੀਚੁੱਕਾਂ (ਜਿਵੇਂ ਜਮਾਂਦਾਰਾਂ, ਕੋਤਵਾਲਾਂ, ਜ਼ੈਲਦਾਰਾਂ) ਵਿੱਚ ਦਹਿਸ਼ਤ ਪੈਦਾ ਕਰਨਾ ਸੀ। ਉਹਨਾਂ ਨੇ ਆਪਣਾ ਕ੍ਰਾਂਤੀਕਾਰੀ ਅਖ਼ਬਾਰ ‘ਉਡਾਰੂ ਪ੍ਰੈਸ’ ਰਾਹੀਂ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨਾ ਸ਼ੁਰੂ ਕੀਤਾ।

ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਨੇ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਦੇ ਸਿਰ ‘ਤੇ ਦੋ ਹਜ਼ਾਰ ਰੁਪਏ ਦਾ ਇਨਾਮ ਰੱਖਿਆ। 26 ਫਰਵਰੀ 1923 ਨੂੰ ਪਿੰਡ ਪੰਡੋਰੀ ਮਹੱਲ ਵਿਖੇ ਆਪਣੇ ਹੀ ਪਿੰਡ ਦੇ ਇੱਕ ਵਿਅਕਤੀ ਕਾਬਲ ਸਿੰਘ ਦੀ ਗੱਦਾਰੀ ਕਾਰਨ ਉਹ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਏ ਗਏ। ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਉਹਨਾਂ ਉੱਤੇ ਮੁਕੱਦਮਾ ਚਲਾਇਆ ਗਿਆ।

ਮੁਕੱਦਮੇ ਦੌਰਾਨ ਉਹਨਾਂ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਦੀ ਜ਼ੁਲਮੀ ਪ੍ਰਸ਼ਾਸਨ ਵਿਰੁੱਧ 125 ਪੰਨਿਆਂ ਦਾ ਲੰਮਾ ਬਿਆਨ ਦਿੱਤਾ ਜੋ ਕਿ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਦਸਤਾਵੇਜ਼ ਹੈ। ਆਖਰਕਾਰ ਉਹਨਾਂ ਨੂੰ ਮੌਤ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ ਅਤੇ 27 ਫਰਵਰੀ 1926 ਨੂੰ 40 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਉਹਨਾਂ ਨੂੰ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ।`,
    artist: "ਕੁਲਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "39-babar-dhanna-singh-behbalpur.jpg": {
    titlePa: "ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਬਹਿਬਲ ਕਲਾਂ",
    descriptionPa: `ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਬਹਿਬਲਪੁਰੀ ਪੁੱਤਰ ਸ. ਇੰਦਰ ਸਿੰਘ ਦਾ ਮਨ ਵੀ ਬਾਕੀ ਦੇ ਬਬਰ ਅਕਾਲੀਆਂ ਅਤੇ ਸਿੱਖਾਂ ਵਾਂਗ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੀਆਂ ਬਦਸਲੂਕੀਆਂ ਅਤੇ ਅੱਤਿਆਚਾਰ ਕਾਰਨ ਕੁਰਲਾ ਉਠਿਆ। ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਵਲੋਂ ਵੱਖ-ਵੱਖ ਮੋਰਚਿਆਂ ਵਿੱਚ ਸਿੱਖਾਂ ਨੂੰ ਬੁਰੀ ਤਰ੍ਹਾਂ ਕੁੱਟਿਆ-ਮਾਰਿਆ ਤੇ ਅਪਮਾਨਿਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਸੀ। ਇਸ ਦੌਰਾਨ ਹਜ਼ਾਰਾਂ ਬੇਕਸੂਰ ਸਿੱਖਾਂ ਨੂੰ ਜੇਲ੍ਹਾਂ ਵਿੱਚ ਸੁੱਟਿਆ ਗਿਆ।

ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਅਣਖ ਖਾਤਿਰ ਮਰ ਮਿਟਣ ਵਾਲੇ ਬਬਰ ਅਕਾਲੀਆਂ ਦੇ ਜੱਥੇ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹੋ ਗਿਆ। ਉਹ ਝੋਲੀਚੁੱਕਾਂ ਦਾ ਸਖਤ ਵਿਰੋਧੀ ਸੀ। ਹਰ ਬੰਦੇ ਦੇ ਦੁੱਖ ਅਤੇ ਹਰ ਇੱਕ ਧੀ ਦੀ ਇੱਜਤ ਦਾ ਸਾਂਝੀ ਸੀ। ਉਹ ਲੋਕਾਂ ਵਿੱਚ ਹਰਮਨ ਪਿਆਰਾ ਸੀ ਅਤੇ ਬਬਰ ਲਹਿਰ ਦੇ ਮੁਖੀਆਂ ਵਿੱਚੋਂ ਇੱਕ ਸੀ।

ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਨੇ ਆਪਣਾ ਮਨ ਬਣਾ ਲਿਆ ਸੀ ਕਿ ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਤੋਂ ਆਜ਼ਾਦੀ ਲੈਣ ਲਈ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੇ ਝੋਲੀਚੁੱਕਾਂ (ਸਫੈਦਪੋਸ਼ ਜ਼ੈਲਦਾਰ, ਲੰਬੜਦਾਰ ਅਤੇ ਪਟਵਾਰੀਆਂ) ਨੂੰ ਮਾਰ ਮੁਕਾਇਆ ਜਾਵੇ ਤਾਂ ਕਿ ਇਹਨਾਂ ਦੀਆਂ ਜੜ੍ਹਾਂ ਨੂੰ ਖਤਮ ਕੀਤਾ ਜਾ ਸਕੇ।

25 ਅਕਤੂਬਰ 1923 ਨੂੰ ਪਿੰਡ ਮੰਨਣਹਾਨੇ ਦੇ ਗਦਾਰ ਜਵਾਲਾ ਸਿੰਘ ਜਿਆਣ ਤੇ ਕਰਮ ਸਿੰਘ ਪੁੱਤਰ ਬਰੜੂ ਪਿੰਡ ਮੰਨਣਹਾਨੇ ਦੇ ਘਰ ਵਿੱਚ ਧੰਨਾ ਸਿੰਘ ਬਹਿਬਲਪੁਰੀ ਨਾਲ ਮਿੱਤਰਮਾਰ ਕਰਕੇ ਜਦੋਂ ਬਬਰ ਸੁੱਤਾ ਪਿਆ ਸੀ ਤਾਂ ਉਸ ਦੇ ਹਥਿਆਰ ਬੰਬ ਤੇ ਰਿਵਾਲਵਰ ਉਸ ਤੋਂ ਦੂਰ ਕਰ ਦਿੱਤੇ ਤੇ ਉਸ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰਵਾਉਣ ਲਈ ਪੁਲਿਸ ਨੂੰ ਸੂਚਨਾ ਦਿੱਤੀ। ਜਵਾਲਾ ਸਿੰਘ ਨੇ ਦਲੀਪ ਸਿੰਘ ਦਲੀਪਾ ਦੀ ਵੀ ਗ੍ਰਿਫਤਾਰੀ ਕਰਵਾਈ ਸੀ।

ਜਦੋਂ ਪੁਲਿਸ ਨੇ ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ ਤਾਂ ਹਮੇਸ਼ਾ ਦੀ ਤਰ੍ਹਾਂ ਆਪਣੇ ਸਰੀਰ ਨਾਲ ਬੰਨਿਆ ਹੋਇਆ ਬੰਬ ਚਲਾ ਦਿੱਤਾ ਜਿਸ ਨਾਲ ਸੱਤ ਪੁਲਿਸ ਵਾਲਿਆਂ ਦੀ ਲਾਸ਼ ਦੇ ਟੁਕੜੇ ਹੋ ਗਏ ਤੇ ਬਬਰ ਆਪ ਸ਼ਹੀਦ ਹੋ ਗਿਆ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "41-bhai-veer-singh-ji.jpg": {
    titlePa: "ਭਾਈ ਵੀਰ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਭਾਈ ਵੀਰ ਸਿੰਘ ਇੱਕ ਕਵੀ ਅਤੇ ਵਿਦਵਾਨ ਸਨ ਜੋ ਪੰਜਾਬੀ ਸਾਹਿਤ ਅਤੇ ਗੁਰਮਤਿ ਦੀ ਵਿਆਖਿਆ ਦੇ ਖੇਤਰ ਵਿਚ ਇਕ ਪ੍ਰਮੁੱਖ ਹਸਤੀ ਸਨ। ਆਧੁਨਿਕ ਪੰਜਾਬੀ ਸਾਹਿਤ ਦੇ ਮੋਢੀ ਮੰਨੇ ਜਾਣ ਵਾਲੇ ਭਾਈ ਵੀਰ ਸਿੰਘ ਨੇ ਸਿੱਖ ਇਤਿਹਾਸ, ਗੁਰਬਾਣੀ ਅਤੇ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਦੀ ਸਮਝ ਨਾਲ ਸਬੰਧਤ ਬਹੁਤ ਸਾਰੀਆਂ ਕਿਤਾਬਾਂ ਲਿਖੀਆਂ।

ਉਨ੍ਹਾਂ ਦੀਆਂ ਸ਼ਾਹਕਾਰ ਰਚਨਾਵਾਂ ਵਿੱਚ ਸੁੰਦਰੀ, ਸਤਵੰਤ ਕੌਰ, ਬਿਜੈ ਸਿੰਘ ਵਰਗੇ ਪ੍ਰਸਿੱਧ ਨਾਵਲ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਚਮਤਕਾਰ, ਸ੍ਰੀ ਅਸ਼ਟ ਗੁਰੂ ਚਮਤਕਾਰ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਕਲਗੀਧਰ ਚਮਤਕਾਰ ਵਰਗੇ ਇਤਿਹਾਸਕ ਸੰਗ੍ਰਹਿ ਸ਼ਾਮਲ ਹਨ।

ਭਾਈ ਵੀਰ ਸਿੰਘ ਦਾ ਜਨਮ 5 ਦਸੰਬਰ 1872 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਡਾ. ਚਰਨ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਦੋਹਰੀ ਵਿਰਾਸਤ ਦੇ ਮਾਲਕ ਸਨ। ਉਨ੍ਹਾਂ ਦੇ ਦਾਦਾ ਜੀ ਬਾਬਾ ਕਾਨ੍ਹ ਸਿੰਘ ਧਾਰਮਿਕ ਬਿਰਤੀ ਵਾਲੇ ਪੁਰਸ਼ ਸਨ ਅਤੇ ਬਾਬਾ ਕਾਨ੍ਹ ਸਿੰਘ ਸੰਸਕ੍ਰਿਤ ਅਤੇ ਬ੍ਰਿਜ ਭਾਸ਼ਾ ਦੇ ਮਾਹਰ ਸਨ। ਦੂਜੇ ਪਾਸੇ ਉੱਨਾਂ ਦੇ ਨਾਨਾ ਜੀ ਗਿਆਨੀ ਹਜਾਰਾ ਸਿੰਘ ਜੀ ਵੀ ਉੱਚ ਕੋਟੀ ਦੇ ਵਿਦਵਾਨ ਸਨ। ਉਨ੍ਹਾ ਨੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀਆਂ ਵਾਰਾਂ ਦਾ ਟੀਕਾ ਵੀ ਕੀਤਾ ਸੀ।

ਇੱਕ ਸਕੂਲੀ ਵਿਦਿਆਰਥੀ ਦੇ ਰੂਪ ਵਿੱਚ, ਭਾਈ ਵੀਰ ਸਿੰਘ ਆਪਣਾ ਬਹੁਤਾ ਸਮਾਂ ਗਿਆਨੀ ਹਜ਼ਾਰਾ ਸਿੰਘ ਦੀ ਸੰਗਤ ਵਿੱਚ ਹੀ ਬਿਤਾਉਂਦੇ ਸਨ ਜਿਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਉਨ੍ਹਾਂ ਨੇ ਸੰਸਕ੍ਰਿਤ, ਫਾਰਸੀ ਅਤੇ ਬ੍ਰਿਜ ਆਦਿ ਭਾਸ਼ਾਵਾਂ ਸਿੱਖੀਆਂ। 1891 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਚਰਚ ਮਿਸ਼ਨ ਸਕੂਲ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ ਦਸਵੀਂ ਦੀ ਪ੍ਰੀਖਿਆ ਪਾਸ ਕੀਤੀ। ਸਕੂਲ ਵਿੱਚ ਕੁਝ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਈਸਾਈ ਧਰਮ ਵਿੱਚ ਪਰਿਵਰਤਨ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਅਨੁਭਵ ਦਿੱਤਾ।

ਦਸਵੀਂ ਦੀ ਪ੍ਰੀਖਿਆ ਪਾਸ ਕਰਨ ਤੋਂ ਇੱਕ ਸਾਲ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਪਿਤਾ ਦੇ ਦੋਸਤ ਭਾਈ ਵਜ਼ੀਰ ਸਿੰਘ ਨਾਲ ਮਿਲ ਕੇ ‘ਵਜ਼ੀਰ ਹਿੰਦ’ ਪ੍ਰੈਸ ਸਥਾਪਤ ਕੀਤਾ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਨੇ ਸਿੰਘ ਸਭਾ ਦੇ ਕਾਰਜਾਂ ਵਿੱਚ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲੈਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ ਸੀ ਅਤੇ ਇਸਦੇ ਉਦੇਸ਼ਾਂ ਨੂੰ ਅੱਗੇ ਵਧਾਉਣ ਲਈ ਉਨ੍ਹਾਂ ਨੇ 1894 ਵਿਚ ‘ਖਾਲਸਾ ਟ੍ਰੈਕਟ ਸੁਸਾਇਟੀ’ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਅਤੇ ਕੁਝ ਸਾਲਾਂ ਬਾਅਦ ਹਫ਼ਤਾਵਾਰੀ ਅਖ਼ਬਾਰ ‘ਖਾਲਸਾ ਸਮਾਚਾਰ’ 1899 ਸ਼ੁਰੂ ਕੀਤਾ।

ਖਾਲਸਾ ਟ੍ਰੈਕਟ ਅਤੇ ਖਾਲਸਾ ਸਮਾਚਾਰ ਦੇ ਪ੍ਰਚਾਰ ਰਾਹੀਂ ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖੀ ਦੇ ਨਿਆਰੇਪਨ ਨੂੰ ਉਜਾਗਰ ਕਰਨ ਦਾ ਕੰਮ ਕੀਤਾ ਅਤੇ ਪੰਜਾਬੀ ਸਾਹਿਤ ਨੂੰ ਇੱਕ ਨਵੀਂ ਦਿਸ਼ਾ ਦਿੱਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਅੰਗਰੇਜਾਂ ਅਤੇ ਆਰੀਆ ਸਮਾਜੀਆਂ ਦੇ ਸਮਾਨਾਂਤਰ ਸਿੱਖ ਗਿਆਨ ਪ੍ਰਬੰਧ ਨੂੰ ਪ੍ਰਚਾਰਨਾ ਅਤੇ ਪ੍ਰਸਾਰਨ ਸ਼ੁਰੂ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਵਿਦਵਤਾ ਭਰਪੂਰ ਰਚਨਾ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਦੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ ‘ਤੇ ਉਨ੍ਹਾਂ ਦਾ ਟੀਕਾ ਸੀ ਜੋ ਚੌਦਾਂ ਜਿਲਦਾਂ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਇਆ।

ਇਸ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ‘ਤੇ ਵਿਸਤ੍ਰਿਤ ਟੀਕਾ ਲਿਖਣ ਦਾ ਕਾਰਜ ਸ਼ੁਰੂ ਕੀਤਾ। ਲੰਬੇ ਸਮੇਂ ਦੀ ਸਖ਼ਤ ਮਿਹਨਤ ਅਤੇ ਵਧਦੀ ਉਮਰ ਦੇ ਕਾਰਨ ਇਹ ਕਾਰਜ ਅਧੂਰਾ ਰਿਹਾ, ਪਰ ਉਨ੍ਹਾਂ ਦੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਪੂਰਾ ਹੋਇਆ ਹਿੱਸਾ (ਲਗਭਗ ਅੱਧਾ) ਸੱਤ ਵੱਡੀਆਂ ਜਿਲਦਾਂ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ।

ਭਾਈ ਵੀਰ ਸਿੰਘ ਜੀ 10 ਜੂਨ 1957 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਉਨ੍ਹਾਂ ਦਾ ਜੀਵਨ ਇੱਕ ਅਜਿਹੇ ਯੁੱਗ ਪੁਰਸ਼ ਦਾ ਪ੍ਰਤੀਕ ਹੈ ਜਿਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਛੋਟੇ ਜੀਵਨ ਵਿਚ ਇਕ ਯੁੱਗ ਜਿਨ੍ਹਾਂ ਗਿਆਨ ਪੈਦਾ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਜਾਬੀ ਸਾਹਿਤ ਵਿੱਚ ਯੋਗਦਾਨ ਲਈ ਸਾਹਿਤ ਅਕਾਦਮੀ ਪੁਰਸਕਾਰ ਅਤੇ ਪਦਮ ਭੂਸ਼ਣ ਨਾਲ ਵੀ ਸਨਮਾਨਿਤ ਕੀਤਾ ਗਿਆ।`,
    artist: "ਅਣਪਛਾਤਾ",
    medium: "Unknown",
  },

  "42-prof-pooran-singh.jpg": {
    titlePa: "ਪ੍ਰੋ ਪੂਰਨ ਸਿੰਘ",
    descriptionPa: `ਪ੍ਰੋ ਪੂਰਨ ਸਿੰਘ ਇੱਕ ਬਹੁਪੱਖੀ ਸ਼ਖ਼ਸੀਅਤ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਇੱਕੋ ਸਮੇਂ ਬਾਇਓਕੈਮਿਸਟ ਅਤੇ ਇੱਕ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸਿੱਖ ਕਵੀ ਵਜੋਂ ਮਹੱਤਵਪੂਰਨ ਪ੍ਰਾਪਤੀਆਂ ਕੀਤੀਆਂ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 17 ਫਰਵਰੀ 1881 ਨੂੰ ਜ਼ਿਲ੍ਹਾ ਐਬਟਾਬਾਦ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਦੇ ਪਿੰਡ ਸਲਹੱਦ ਵਿਖੇ ਵਿੱਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦੇ ਜੀਵਨ ਦਾ ਬਹੁਤਾ ਹਿੱਸਾ ਲਿਖਣ ਅਤੇ ਖੋਜ ਕਾਰਜਾਂ ਵਿੱਚ ਬੀਤਿਆ।

ਪੂਰਨ ਸਿੰਘ ਨੇ 1897 ਵਿੱਚ ਰਾਵਲਪਿੰਡੀ ਤੋਂ ਹਾਈ ਸਕੂਲ ਅਤੇ 1899 ਵਿੱਚ ਲਾਹੌਰ ਦੇ ਡੀ.ਏ.ਵੀ. ਕਾਲਜ ਤੋਂ ਇੰਟਰਮੀਡੀਏਟ ਦੀ ਪ੍ਰੀਖਿਆ ਪਾਸ ਕੀਤੀ। 1900 ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੂੰ ਉਦਯੋਗਿਕ ਰਸਾਇਣ ਵਿਗਿਆਨ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ਤਾ ਹਾਸਲ ਕਰਨ ਲਈ ਜਾਪਾਨ ਜਾਣ ਲਈ ਸਕਾਲਰਸ਼ਿਪ ਮਿਲੀ, ਜਿੱਥੇ ਉਹ ਟੋਕੀਓ ਯੂਨੀਵਰਸਿਟੀ ਵਿੱਚ ਦਾਖ਼ਲ ਹੋਏ।

ਜਾਪਾਨ ਵਿੱਚ, ਉਹ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਦੀ ਆਲੋਚਨਾ ਕਰਦੇ ਹੋਏ ਜਨਤਕ ਭਾਸ਼ਣ ਦਿੰਦੇ ਸਨ ਅਤੇ ‘ਥੰਡਰਿੰਗ ਡਾਨ’ ਨਾਮਕ ਇੱਕ ਅੰਗਰੇਜ਼ੀ ਮਾਸਿਕ ਪੱਤਰ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਦੇ ਸਨ। ਪ੍ਰੋ ਪੂਰਨ ਸਿੰਘ ਦੇ ਜੀਵਨ ਵਿੱਚ ਜਪਾਨੀ ਸੱਭਿਆਚਾਰ, ਸਵਾਮੀ ਰਾਮ ਤੀਰਥ, ਅਤੇ ਭਾਈ ਵੀਰ ਸਿੰਘ ਦਾ ਵਿਸ਼ੇਸ਼ ਪ੍ਰਭਾਵ ਸੀ। ਜਪਾਨ ਵਿੱਚ ਰਹਿੰਦੀਆਂ ਆਪਣੀ ਪੜਾਈ ਦੌਰਾਨ ਉਹ ਜਪਾਨੀ ਕਲਚਰ ਦੇ ਬਹੁਤ ਪ੍ਰਭਾਵ ਵਿੱਚ ਸਨ। ਜਾਪਾਨ ਵਿੱਚ ਹੀ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਸਵਾਮੀ ਰਾਮ ਤੀਰਥ ਨਾਲ ਹੋਈ। ਸਵਾਮੀ ਜੀ ਦੇ ਪ੍ਰਭਾਵ ਸਦਕਾ ਉਹ ਸੰਨਿਆਸੀ ਬਣ ਗਏ।

ਹਾਲਾਂਕਿ, ਬਾਅਦ ਵਿੱਚ ਜਦੋਂ ਉਹ ਭਾਰਤ ਆਏ ਤਾਂ ਆਪਣੀ ਭੈਣ ਦੇ ਕਹਿਣ ‘ਤੇ ਉਨ੍ਹਾਂ ਮਾਇਆ ਦੇਵੀ ਨਾਲ ਵਿਆਹ ਕਰਵਾ ਲਿਆ। ਪਰ ਸੰਨਿਆਸ ਦਾ ਇਹ ਗਹਿਰਾ ਅਨੁਭਵ ਉਨ੍ਹਾਂ ਦੀ ਚੇਤਨਾ ਵਿੱਚ ਹਮੇਸ਼ਾ ਮੌਜੂਦ ਰਿਹਾ।

ਉਪਰੰਤ 1912 ਵਿੱਚ ਸਿਆਲਕੋਟ ਵਿਖੇ ਇਕ ਕਾਨਫਰੰਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਭਾਈ ਵੀਰ ਸਿੰਘ ਨਾਲ ਹੋਈ ਅਤੇ ਇਹ ਮੁਲਾਕਾਤ ਫਿਰ ਪੂਰਨ ਸਿੰਘ ਦੇ ਜੀਵਨ ਵਿੱਚ ਨਿਰਣਾਇਕ ਮੋੜ ਸਾਬਤ ਹੋਈ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਉਨ੍ਹਾਂ ਨੂੰ ਸਿੱਖੀ ਵਿੱਚ ਗੁਆਚੀ ਹੋਈ ਆਸਥਾ ਮੁੜ ਬਹਾਲ ਕਰਨ ਵਿੱਚ ਜਰੀਆ ਬਣੇ।

ਪੂਰਨ ਸਿੰਘ ਨੇ ਵਿਗਿਆਨਕ ਪ੍ਰਯੋਗਾਂ ਅਤੇ ਸਾਹਿਤਕ ਰਚਨਾਵਾਂ ਵਿਚਕਾਰ ਅਸਾਨੀ ਨਾਲ ਸੰਤੁਲਨ ਬਣਾਇਆ। ਦਸੰਬਰ 1904 ਵਿੱਚ, ਉਹ ਲਾਹੌਰ ਦੇ ਵਿਕਟੋਰੀਆ ਡਾਇਮੰਡ ਜੁਬਲੀ ਹਿੰਦੂ ਟੈਕਨੀਕਲ ਇੰਸਟੀਚਿਊਟ ਦੇ ਪ੍ਰਿੰਸੀਪਲ ਬਣੇ। ਨਵੰਬਰ 1906 ਵਿੱਚ ਅਸਤੀਫ਼ਾ ਦੇਣ ਤੋਂ ਬਾਅਦ, ਉਹ ਦੇਹਰਾਦੂਨ ਨੇੜੇ ਡੋਈਵਾਲਾ ਵਿੱਚ ਸਾਬਣ ਬਣਾਉਣ ਦੀ ਫੈਕਟਰੀ ਸਥਾਪਤ ਕਰਨ ਲਈ ਚਲੇ ਗਏ।

ਅਪ੍ਰੈਲ 1907 ਵਿੱਚ, ਉਹ ਦੇਹਰਾਦੂਨ ਵਿੱਚ ਫੋਰੈਸਟ ਰਿਸਰਚ ਇੰਸਟੀਚਿਊਟ ਵਿੱਚ ਫੋਰੈਸਟ ਕੈਮਿਸਟ ਵਜੋਂ ਸ਼ਾਮਲ ਹੋਏ ਅਤੇ 1918 ਵਿੱਚ ਰਿਟਾਇਰ ਹੋ ਗਏ। ਉਨ੍ਹਾਂ ਨੇ ਪਟਿਆਲਾ ਅਤੇ ਗਵਾਲੀਅਰ ਦੀਆਂ ਰਿਆਸਤਾਂ ਵਿੱਚ ਵੀ ਕੰਮ ਕੀਤਾ। ਗਵਾਲੀਅਰ (1919-23) ਵਿਖੇ, ਉਨ੍ਹਾਂ ਨੇ ਬੰਜਰ ਜ਼ਮੀਨਾਂ ‘ਤੇ ਰੋਸ਼ਾ ਘਾਹ ਅਤੇ ਯੂਕਲਿਪਟਸ ਉਗਾ ਕੇ ਨਖਲਿਸਤਾਨ ਬਣਾਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਸਿਰ ਸੁੰਦਰ ਸਿੰਘ ਮਜੀਠੀਆ ਦੀ ਚੀਨੀ ਫੈਕਟਰੀ ਵਿੱਚ ਵੀ ਕੰਮ ਕੀਤਾ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਹੱਡੀਆਂ ਦੀ ਚੂਰੀ ਦੀ ਵਰਤੋਂ ਕੀਤੇ ਬਿਨਾਂ ਖੰਡ ਨੂੰ ਸ਼ੁੱਧ ਕਰਨ ਦਾ ਤਰੀਕਾ ਖੋਜਿਆ।

ਪੂਰਨ ਸਿੰਘ ਸੁਭਾਅ ਦੇ ਕਵੀ ਸਨ। ਉਨ੍ਹਾਂ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਰਚਨਾਵਾਂ ਵਿੱਚ ਦੀ ਵੀਨਾ ਪਲੇਅਰਜ਼, ਅਨਸਟਰੰਗ ਬੀਡਜ਼ (1923) ਅਤੇ ਦੀ ਸਿਸਟਰਜ਼ ਆਫ਼ ਦਾ ਸਪਿਨਿੰਗ ਵ੍ਹੀਲ (1921), ਸਪਿਰਿਟ ਆਫ਼ ਦੀ ਸਿੱਖਸ, ਖੁਲ੍ਹੇ ਮੈਦਾਨ, ਖੁਲ੍ਹੇ ਘੁੰਡ (1923), ਖੁਲ੍ਹੇ ਅਸਮਾਨ ਰੰਗ (1927), ਅਤੇ ਖੁਲ੍ਹੇ ਲੇਖ (1929), ਦੀ ਬੁੱਕ ਆਫ਼ ਟੈਨ ਮਾਸਟਰਜ਼, ਦੀ ਸਪਿਰਿਟ ਆਫ਼ ਓਰੀਐਂਟਲ ਪੋਇਟਰੀ (1926), ਸਟੋਰੀ ਆਫ਼ ਸਵਾਮੀ ਰਾਮ, ਅਤੇ ਵਿਜ਼ਨ ਆਫ਼ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਸ਼ਾਮਲ ਹਨ।

ਆਪਣੇ ਜੀਵਨ ਦੇ ਅੰਤਿਮ ਦਹਾਕੇ ਦੌਰਾਨ, ਉਨ੍ਹਾਂ ਨੇ ਵੱਡੀ ਮਾਤਰਾ ਵਿੱਚ ਅੰਗਰੇਜ਼ੀ ਦੇ ਨਾਲ-ਨਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਵਾਰਤਕ ਅਤੇ ਕਵਿਤਾ ਲਿਖੀ, ਜਿਸ ਨੂੰ ਪੰਜਾਬੀ ਸਾਹਿਤ ਵਿੱਚ ਕਲਾਸਿਕ ਦਾ ਦਰਜਾ ਹਾਸਲ ਹੈ। ਬਦਕਿਸਮਤੀ ਨਾਲ, ਉਹ 1920 ਦੇ ਦਹਾਕੇ ਦੇ ਅੰਤ ਵਿੱਚ ਤਪਦਿਕ (ਟੀ.ਬੀ.) ਦੀ ਬਿਮਾਰੀ ਕਾਰਨ 31 ਮਾਰਚ 1931 ਨੂੰ ਦੇਹਰਾਦੂਨ ਵਿਖੇ ਆਪਣੇ ਸਵਾਸਾਂ ਦੀ ਪੂੰਜੀ ਨੂੰ ਪੂਰਾ ਕਰਦਿਆਂ ਹੋਇਆ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ।`,
    artist: "ਡੇਨੀਅਲ",
    medium: "Oil Painting",
  },

  "43-giyani-ditt-singh.jpg": {
    titlePa: "ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ",
    descriptionPa: `ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਇੱਕ ਉੱਘੇ ਵਿਦਵਾਨ, ਕਵੀ, ਸੰਪਾਦਕ ਅਤੇ ਸਿੰਘ ਸਭਾ ਲਹਿਰ ਦੇ ਮੋਹਰੀ ਸੁਧਾਰਕ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 21 ਅਪ੍ਰੈਲ, 1850 (ਕੁਝ ਸਰੋਤਾਂ ਅਨੁਸਾਰ 1853) ਨੂੰ ਪੰਜਾਬ ਦੇ ਫਤਹਿਗੜ੍ਹ ਸਾਹਿਬ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਕਲੌਰ ਵਿਖੇ ਹੋਇਆ।

ਗਿਆਨੀ ਜੀ ਇੱਕ ਪ੍ਰਸਿੱਧ ਲੇਖਕ ਸਨ, ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਸਿਧਾਂਤ ‘ਤੇ ਲਗਭਗ 71 ਕਿਤਾਬਾਂ ਲਿਖੀਆਂ। ਗਿਆਨੀ ਜੀ ਨੂੰ ਮੁੱਢਲੀ ਸਿੱਖਿਆ ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਦੀਵਾਨ ਸਿੰਘ ਤੋਂ ਮਿਲੀ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਨਿਆਏ ਅਤੇ ਵੇਦਾਂਤ ਦਰਸ਼ਨਾਂ ਦਾ ਗਿਆਨ ਸੀ। 8-9 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਅੰਬਾਲਾ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਟਿਊਰ ਵਿਖੇ ਭਾਈ ਗੁਰਬਖਸ਼ ਸਿੰਘ ਅਤੇ ਲਾਲਾ ਦਯਾਨੰਦ ਪਾਸ ਭੇਜਿਆ ਗਿਆ। ਇੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਗੁਰਮੁਖੀ, ਉਰਦੂ, ਫ਼ਾਰਸੀ, ਛੰਦ-ਸ਼ਾਸਤਰ, ਨੀਤੀ ਸ਼ਾਸਤਰ, ਅਤੇ ਵੇਦਾਂਤ ਦਾ ਅਧਿਐਨ ਕੀਤਾ।

ਲਗਭਗ 16 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ, ਉਹ ਗੁਲਾਬਦਾਸੀ ਸੰਪਰਦਾ ਦੇ ਕੇਂਦਰ, ਚੱਠਿਆਂ ਵਾਲਾ (ਲਾਹੌਰ ਨੇੜੇ), ਚਲੇ ਗਏ ਅਤੇ ਸੰਤ ਦੇਸਾ ਸਿੰਘ ਤੋਂ ਰਸਮੀ ਤੌਰ ‘ਤੇ ਦੀਖਿਆ ਲੈ ਕੇ ਗੁਲਾਬਦਾਸੀ ਪ੍ਰਚਾਰਕ ਬਣ ਗਏ।

ਸੰਨ 1877 ਵਿਚ ਲਾਹੌਰ ਵਿਖੇ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਆਰੀਆ ਸਮਾਜ ਦੇ ਸੰਸਥਾਪਕ ਸਵਾਮੀ ਦਯਾਨੰਦ ਨਾਲ ਹੋਈ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਸ਼ੁਰੂ-ਸ਼ੁਰੂ ਵਿੱਚ ਆਰਿਆਂ ਸਮਾਜ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋਏ। ਕਿਉਂਕਿ ਆਰੀਆ ਸਮਾਜੀ ਵੀ ਜਾਤ-ਪਾਤ ਅਤੇ ਕਰਮਕਾਂਡ ਦੇ ਬਹੁਤ ਸਖਤ ਖਿਲਾਫ ਸਨ। ਪਰ ਜਲਦੀ ਹੀ ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਨੂੰ ਅਹਿਸਾਸ ਹੋਇਆ ਕਿ ਸਵਾਮੀ ਦਯਾਨੰਦ ਦਾ ਵੇਦਾਂ ਦੀ ਸਰਵਉੱਚਤਾ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਅਤੇ ਹਿੰਦੂ ਧਰਮ ਤੋਂ ਇਲਾਵਾ ਕਿਸੇ ਹੋਰ ਧਰਮ ਦੀ ਹੋਂਦ ਨੂੰ ਨਾ ਮੰਨਣਾ ਇੱਕ ਸੰਕੀਰਨ ਪਹੁੰਚ ਸੀ।

1877 ਵਿੱਚ ਲਾਹੌਰ ਵਿਖੇ ਇੱਕ ਧਾਰਮਿਕ ਇਕੱਠ ਦੌਰਾਨ, ਗਿਆਨੀ ਜੀ ਨੇ ਸਵਾਮੀ ਦਯਾਨੰਦ ਨਾਲ ਤਿੰਨ ਡੂੰਘੇ ਧਾਰਮਿਕ ਸੰਵਾਦ ਕੀਤੇ, ਜਿਸ ਦਾ ਵੇਰਵਾ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀ ਪੁਸਤਕ “ਸਾਧੂ ਦਯਾ ਨੰਦ ਨਾਲ ਮੇਰਾ ਸੰਬਾਦ” ਵਿੱਚ ਦਰਜ ਕੀਤਾ। ਇਨ੍ਹਾਂ ਚਰਚਾਵਾਂ ਨੇ ਸਵਾਮੀ ਦਯਾਨੰਦ ਦੇ ਗਿਆਨ ਦੀ ਕਮਜ਼ੋਰੀ ਨੂੰ ਜ਼ਾਹਰ ਕੀਤਾ ਅਤੇ ਗਿਆਨੀ ਜੀ ਦੀ ਪ੍ਰਸਿੱਧੀ ਸਿੱਖਾਂ ਵਿੱਚ ਬਹੁਤ ਵਧ ਗਈ।

ਆਰੀਆ ਸਮਾਜ ਦੀ ਸਿੱਖ ਗੁਰੂਆਂ ਬਾਰੇ ਨਿਰਾਦਰਪੂਰਨ ਟਿੱਪਣੀਆਂ ਕਾਰਨ, ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਅਤੇ ਭਾਈ ਜਵਾਹਰ ਸਿੰਘ ਨੇ 25 ਨਵੰਬਰ 1888 ਨੂੰ ਆਰੀਆ ਸਮਾਜ ਨਾਲੋਂ ਸਾਰੇ ਸੰਬੰਧ ਤੋੜ ਲਏ।

ਇਸ ਤੋਂ ਬਾਅਦ ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਦੇ ਪ੍ਰਭਾਵ ਹੇਠ ਸਿੱਖ ਧਰਮ ਨਾਲ ਜੁੜ ਗਏ ਅਤੇ ਲਾਹੌਰ ਸਿੰਘ ਸਭਾ ਦੇ ਸੰਸਥਾਪਕ ਮੈਂਬਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਬਣੇ।

1886 ਵਿੱਚ ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਨੇ ਖਾਲਸਾ ਅਖ਼ਬਾਰ ਨਾਮਕ ਇੱਕ ਹਫ਼ਤਾਵਾਰ ਅਖ਼ਬਾਰ ਸ਼ੁਰੂ ਕੀਤਾ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਇਸਦੇ ਮੁੱਖ ਯੋਗਦਾਨੀ ਸਨ ਅਤੇ ਜਲਦੀ ਹੀ ਸੰਪਾਦਕ ਬਣ ਗਏ। ਅੰਮ੍ਰਿਤਸਰ ਖਾਲਸਾ ਦੀਵਾਨ ਵੱਲੋਂ ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਮੋਹਰ ਹੇਠ ਬੇਦਖ਼ਲ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਨੇ 16 ਅਪ੍ਰੈਲ 1887 ਨੂੰ “ਸਵਪਨ ਨਾਟਕ” ਨਾਮਕ ਇੱਕ ਵਿਅੰਗਮਈ ਲੇਖ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ। ਇਸ ਕਾਰਨ ਉਨ੍ਹਾਂ ‘ਤੇ ਮਾਣਹਾਨੀ ਦਾ ਮੁਕੱਦਮਾ ਦਰਜ ਹੋਇਆ, ਜਿਸ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਪਹਿਲਾਂ ਜੁਰਮਾਨਾ ਹੋਇਆ, ਪਰ ਬਾਅਦ ਵਿੱਚ ਅਪੀਲ ‘ਤੇ ਬਰੀ ਕਰ ਦਿੱਤਾ ਗਿਆ।

ਗਿਆਨੀ ਜੀ ਨੇ ਸਿੱਖ ਫਲਸਫੇ ਦੀ ਵਿਲੱਖਣਤਾ ਨੂੰ ਸਥਾਪਤ ਕਰਨ ਲਈ ਬਹੁਤ ਸਾਰੀਆਂ ਪੁਸਤਕਾਂ ਲਿਖੀਆਂ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਦੀ ਸਥਾਪਨਾ ਵਿੱਚ ਵੀ ਸਹਾਇਤਾ ਕੀਤੀ ਅਤੇ ਕਾਲਜ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਪਾਠ ਪੁਸਤਕਾਂ ਲਿਖੀਆਂ।

ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਆਪਣੀ ਬੇਟੀ ਨੂੰ ਬਹੁਤ ਪਿਆਰ ਕਰਦੇ ਸਨ, ਜਿਸ ਦੀ ਮੌਤ 17 ਜੂਨ 1901 ਨੂੰ ਹੋ ਗਈ। ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਦੀ ਮੌਤ (1898) ਤੋਂ ਬਾਅਦ ਲਗਾਤਾਰ ਭਾਰੀ ਕੰਮ ਦੇ ਬੋਝ ਅਤੇ ਧੀ ਦੀ ਮੌਤ ਦੇ ਸਦਮੇ ਕਾਰਨ ਉਨ੍ਹਾਂ ਦੀ ਸਿਹਤ ਤੇਜ਼ੀ ਨਾਲ ਵਿਗੜ ਗਈ। 6 ਸਤੰਬਰ 1901 ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਉਨ੍ਹਾਂ ਦਾ ਦੇਹਾਂਤ ਹੋ ਗਿਆ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "44-bhai-randhir-singh-ji.jpg": {
    titlePa: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਭਾਈ ਸਾਹਿਬ ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਵੀਹਵੀਂ ਸਦੀ ਦੀ ਇੱਕ ਅਜਿਹੀ ਮਹਾਨ ਸ਼ਖ਼ਸੀਅਤ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਇੱਕੋ ਸਮੇਂ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮੀ, ਧਰਮ ਸੁਧਾਰਕ, ਅਤੇ ਅਡੋਲ ਗੁਰਸਿੱਖ ਵਜੋਂ ਜੀਵਨ ਬਤੀਤ ਕੀਤਾ। ਉਹ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਦੇ ਮੁੱਖ ਨਾਇਕਾਂ ਵਿੱਚੋਂ ਸਨ ਅਤੇ ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਹਿਰ ਦੇ ਪਹਿਲੇ ਕੈਦੀ ਵਜੋਂ ਜਾਣੇ ਜਾਂਦੇ ਹਨ।

ਭਾਈ ਸਾਹਿਬ ਦਾ ਜਨਮ 7 ਜੁਲਾਈ 1878 ਨੂੰ ਲੁਧਿਆਣਾ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਨਾਰੰਗਵਾਲ ਵਿੱਚ ਇੱਕ ਅਮੀਰ ਵਿਦਵਾਨ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਸ. ਨੱਥਾ ਸਿੰਘ ਨਾਭਾ ਰਿਆਸਤ ਵਿੱਚ ਜੱਜ ਸਨ, ਜਦੋਂ ਕਿ ਮਾਤਾ ਸਰਦਾਰਨੀ ਪੰਜਾਬ ਕੌਰ ਪ੍ਰਸਿੱਧ ਗੁਰਸਿੱਖ ਭਾਈ ਭਗਤੂ ਜੀ ਦੇ ਸੱਤਵੀਂ ਪੀੜ੍ਹੀ ਦੇ ਵੰਸ਼ਜ ਸਨ।

ਲਾਹੌਰ ਦੇ ਵਕਾਰੀ ਕਾਲਜਾਂ ਤੋਂ ਉੱਚ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲੇ ਭਾਈ ਸਾਹਿਬ ਬੁੱਧੀਮਾਨ ਵਿਦਿਆਰਥੀ ਹੋਣ ਦੇ ਨਾਲ-ਨਾਲ ਇੱਕ ਚੰਗੇ ਖਿਡਾਰੀ ਵੀ ਸਨ।

ਭਾਈ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ਆਤਮਿਕ ਬਲ ਨੂੰ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਾਂ ਵਿੱਚ ਸੁਧਾਰ ਲਿਆਉਣ ਅਤੇ ਦੇਸ਼ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਲਗਾ ਦਿੱਤਾ। ਉਨ੍ਹਾਂ ਨੇ ਗੁਰਦੁਆਰਾ ਫਤਹਿਗੜ੍ਹ ਸਾਹਿਬ ਅਤੇ ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਬੰਧਕਾਂ ਦੀਆਂ ਗ਼ਲਤ ਰਸਮਾਂ ਅਤੇ ਅਨੈਤਿਕ ਗਤੀਵਿਧੀਆਂ ਵਿਰੁੱਧ ਜਾਨ ਦੀ ਪ੍ਰਵਾਹ ਨਾ ਕਰਦਿਆਂ ਸੰਘਰਸ਼ ਕੀਤਾ।

1914 ਵਿੱਚ ਜਦੋਂ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਨੇ ਗੁਰਦੁਆਰਾ ਰਕਾਬ ਗੰਜ ਸਾਹਿਬ ਦੀ ਕੰਧ ਢਾਹੀ ਤਾਂ ਭਾਈ ਸਾਹਿਬ ਜੀ ਇਸ ਦਾ ਜਨਤਕ ਵਿਰੋਧ ਕਰਨ ਵਾਲੇ ਅਤੇ ਕੰਧ ਦੀ ਬਹਾਲੀ ਲਈ ਅੰਦੋਲਨ ਦੀ ਅਗਵਾਈ ਕਰਨ ਦਾ ਐਲਾਨ ਕਰਨ ਵਾਲੇ ਪਹਿਲੇ ਸਿੱਖ ਆਗੂ ਸਨ।

ਉਹ ਅਮਰੀਕਾ ਅਤੇ ਕੈਨੇਡਾ ਤੋਂ ਆਏ ਗ਼ਦਰੀਆਂ ਦੇ ਨਾਲ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਵਿਰੁੱਧ ਹਥਿਆਰਬੰਦ ਬਗ਼ਾਵਤ ਵਿੱਚ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਪੰਜਾਬ ਵਿੱਚ ਇਸ ਬਗ਼ਾਵਤ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਵਾਲੇ ਕੁਝ ਚੋਣਵੇਂ ਆਗੂਆਂ ਵਿੱਚੋਂ ਸਨ।

9 ਮਈ 1915 ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਹੋਏ ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਦੂਜੇ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਵਿੱਚ ਉਮਰ ਕੈਦ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ। ਉਨ੍ਹਾਂ ਨੇ 15 ਸਾਲ ਤੋਂ ਵੱਧ ਕੈਦ ਦੌਰਾਨ ਅਥਾਹ ਤਸੀਹੇ ਝੱਲੇ। ਮੁਲਤਾਨ ਜੇਲ੍ਹ ਵਰਗੀਆਂ ਗਰਮ ਥਾਵਾਂ ‘ਤੇ, ਖ਼ਾਲਸਾ ਰਹਿਤ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹੋਏ, ਉਨ੍ਹਾਂ ਨੇ 40 ਦਿਨਾਂ ਤੱਕ ਭੋਜਨ ਅਤੇ ਪਾਣੀ ਤੋਂ ਬਿਨਾਂ ਰਹਿਣਾ ਪ੍ਰਵਾਨ ਕੀਤਾ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤਧਾਰੀ ਹੱਥਾਂ ਦਾ ਤਿਆਰ ਕੀਤਾ ਭੋਜਨ ਨਹੀਂ ਦਿੱਤਾ ਜਾਂਦਾ ਸੀ।

ਉਨ੍ਹਾਂ ਨੂੰ ਕਈ ਦਿਨਾਂ ਤੱਕ ਲੋਹੇ ਦੀਆਂ ਜ਼ੰਜੀਰਾਂ ਨਾਲ ਬੰਨ੍ਹ ਕੇ ਧੁੱਪ ਵਿੱਚ ਖੁੱਲ੍ਹੇ ਆਸਮਾਨ ਹੇਠ ਰੱਖਿਆ ਜਾਂਦਾ ਸੀ। ਇਨ੍ਹਾਂ ਸਰੀਰਕ ਅਤੇ ਮਾਨਸਿਕ ਤਸੀਹਿਆਂ ਦੇ ਬਾਵਜੂਦ ਉਹ ਆਪਣੇ ਵਿਸ਼ਵਾਸ ਅਤੇ ਸਿਧਾਂਤਾਂ ‘ਤੇ ਅਡੋਲ ਰਹੇ।

ਅਕਤੂਬਰ 1930 ਵਿੱਚ ਜੇਲ੍ਹ ਤੋਂ ਰਿਹਾਈ ਤੋਂ ਪਹਿਲਾਂ, ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਭਗਤ ਸਿੰਘ ਨਾਲ ਹੋਈ, ਜੋ ਉਸੇ ਜੇਲ੍ਹ ਵਿੱਚ ਫਾਂਸੀ ਦੀ ਸਜ਼ਾ ਦਾ ਇੰਤਜ਼ਾਰ ਕਰ ਰਹੇ ਸਨ। ਸ਼ੁਰੂ ਵਿੱਚ ਭਾਈ ਸਾਹਿਬ ਨੇ ਭਗਤ ਸਿੰਘ ਨੂੰ ਮਿਲਣ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਕੇਸ ਕਟਵਾ ਲਏ ਸਨ ਅਤੇ ਸਿੱਖੀ ਦੀ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਨਹੀਂ ਕੀਤੀ ਸੀ।

ਭਗਤ ਸਿੰਘ ਨੇ ਨਿਮਰਤਾ ਨਾਲ ਆਪਣੀ ਗਲਤੀ ਸਵੀਕਾਰ ਕੀਤੀ ਅਤੇ ਦੱਸਿਆ ਕਿ ਉਨ੍ਹਾਂ ਨੇ ਇਹ ਕਦਮ ਰਾਜਨੀਤਿਕ ਪ੍ਰਸਿੱਧੀ ਅਤੇ ਹਿੰਦੂ ਕਾਮਰੇਡਾਂ ਦੀ ਹਮਦਰਦੀ ਲਈ ਚੁੱਕਿਆ ਸੀ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਵਰਗੇ ਗ਼ਦਰੀ ਸਿੱਖਾਂ ਨੂੰ ਪ੍ਰੈੱਸ ਵਿੱਚ ਥਾਂ ਨਹੀਂ ਮਿਲਦੀ ਸੀ।

ਭਾਈ ਸਾਹਿਬ ਨੇ ਭਗਤ ਸਿੰਘ ਨੂੰ ਚੇਤਾਵਨੀ ਦਿੱਤੀ ਕਿ ਨਿੱਜੀ ਪ੍ਰਸਿੱਧੀ ਲਈ ਗੁਰੂ ਦੀ ਬਖਸ਼ਿਸ ਨੂੰ ਤਿਆਗਣਾ ਇੱਕ ਸੱਚੇ ਦੇਸ਼ ਭਗਤ ਦਾ ਆਦਰਸ਼ ਨਹੀਂ ਹੈ।

ਅਖੀਰ 15 ਸਾਲ ਤੋਂ ਵੱਧ ਸਮੇਂ ਦੀ ਕੈਦ ਭੋਗਣ ਅਤੇ ਖ਼ਾਲਸਾ ਰਹਿਤ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਲਈ ਅਕਹਿ ਤਸੀਹੇ ਝੱਲਣ ਮਗਰੋਂ ਅਕਤੂਬਰ 1930 ਨੂੰ ਭਾਈ ਸਾਹਿਬ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਨੂੰ ਰਿਹਾਅ ਕੀਤਾ ਗਿਆ। ਜੇਲ੍ਹ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ ਸੰਘਰਸ਼ ਸਦਕਾ ਜੇਲ੍ਹ ਮੈਨੂਅਲ ਵਿੱਚ ਸੋਧ ਕੀਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਕੈਦੀਆਂ ਨੂੰ ਦਸਤਾਰ, ਕਛਹਿਰਾ ਅਤੇ ਕੜਾ ਪਹਿਨਣ ਦਾ ਹੱਕ ਮਿਲਿਆ।

ਰਿਹਾਈ ਤੋਂ ਬਾਅਦ ਤੀਹ ਸਾਲ ਤੱਕ ਉਨ੍ਹਾਂ ਨੇ ਦੇਸ਼ ਭਰ ਵਿੱਚ ਗੁਰਮਤਿ ਦਾ ਪ੍ਰਚਾਰ ਕੀਤਾ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਪ੍ਰੇਰਨਾ ਨਾਲ ਅਖੰਡ ਕੀਰਤਨੀ ਜਥਾ ਹੋਂਦ ਵਿੱਚ ਆਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਧਰਮ ਸ਼ਾਸਤਰ ‘ਤੇ ਲਗਭਗ ਦੋ ਦਰਜਨ ਪੁਸਤਕਾਂ ਲਿਖੀਆਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੀ ਆਤਮ-ਕਥਾ ਅਤੇ ਰਹੱਸਵਾਦੀ ਅਨੁਭਵਾਂ ‘ਤੇ ਆਧਾਰਿਤ ਰਚਨਾਵਾਂ ਸ਼ਾਮਲ ਹਨ।

ਅਖੀਰ 13 ਅਪ੍ਰੈਲ 1961 ਨੂੰ ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ।`,
    artist: "ਗੁਰਰਾਜ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "45-master-tara-singh.jpg": {
    titlePa: "ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ",
    descriptionPa: `ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ, ਇੱਕ ਬਜ਼ੁਰਗ ਅਕਾਲੀ ਆਗੂ ਅਤੇ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮੀ, ਚਾਲੀ ਸਾਲਾਂ ਤੋਂ ਵੱਧ ਸਮੇਂ ਤੱਕ ਸਿੱਖ ਰਾਜਨੀਤੀ ਵਿੱਚ ਇੱਕ ਪ੍ਰਮੁੱਖ ਹਸਤੀ ਰਹੇ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 24 ਜੂਨ, 1885 ਨੂੰ ਪਿੰਡ ਹਰਿਆਲ, ਤਹਿਸੀਲ ਗੁਜਰਖ਼ਾਨ, ਜ਼ਿਲ੍ਹਾ ਰਾਵਲਪਿੰਡੀ (ਹੁਣ ਪਾਕਿਸਤਾਨ ਵਿੱਚ) ਵਿਖੇ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦਾ ਪਹਿਲਾ ਨਾਮ ਨਾਨਕ ਚੰਦ ਸੀ।

ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਬਖਸ਼ੀ ਗੋਪੀ ਚੰਦ ਇੱਕ ਪਿੰਡ ਦੇ ਪਟਵਾਰੀ ਸਨ ਅਤੇ ਇੱਕ ਸਹਿਜਧਾਰੀ ਸਿੱਖ (ਹਿੰਦੂ) ਪਰਿਵਾਰ ਨਾਲ ਸੰਬੰਧਤ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸੋਲਾਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਸੰਤ ਅਤਰ ਸਿੰਘ ਤੋਂ ਅੰਮ੍ਰਿਤ ਛਕਿਆ, ਜਿਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ ਤਾਰਾ ਸਿੰਘ ਰੱਖਿਆ ਗਿਆ ਅਤੇ ਉਹ ਆਪਣੇ ਪਰਿਵਾਰ ਵਿੱਚ ਸਿੱਖੀ ਧਾਰਨ ਕਰਨ ਵਾਲੇ ਪਹਿਲੇ ਵਿਅਕਤੀ ਬਣੇ।

ਉਨ੍ਹਾਂ ਦੀ ਮੁੱਢਲੀ ਸਿੱਖਿਆ ਪਿੰਡ ਦੇ ਸਕੂਲ ਵਿੱਚ ਹੋਈ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਰਾਵਲਪਿੰਡੀ ਦੇ ਮਿਸ਼ਨ ਸਕੂਲ ਵਿੱਚ। ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ ਗ੍ਰੈਜੂਏਸ਼ਨ ਕੀਤੀ। ਉਹ ਆਪਣੇ ਕਾਲਜ ਦੀ ਹਾਕੀ ਅਤੇ ਫੁੱਟਬਾਲ ਟੀਮਾਂ ਦੇ ਕਪਤਾਨ ਰਹੇ ਅਤੇ ‘ਪੱਥਰ’ (ਚੱਟਾਨ ਵਰਗੇ) ਵਜੋਂ ਜਾਣੇ ਜਾਂਦੇ ਸਨ।

ਇੱਕ ਵਾਰ ਰਾਇਲ ਇੰਡੀਅਨ ਆਰਮੀ ਦੇ ਕਮਾਂਡਰ-ਇਨ-ਚੀਫ਼ ਨੇ ਖੇਡ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸਿੱਧੀ ਕਮਿਸ਼ਨ ਦੀ ਪੇਸ਼ਕਸ਼ ਕੀਤੀ, ਜਿਸ ਨੂੰ ਉਨ੍ਹਾਂ ਨੇ ਠੁਕਰਾ ਦਿੱਤਾ ਕਿਉਂਕਿ ਉਹ ਇੱਕ ਸਿੱਖਿਆ ਸ਼ਾਸਤਰੀ ਬਣਨਾ ਚਾਹੁੰਦੇ ਸਨ।

ਲਾਹੌਰ ਦੇ ਸਰਕਾਰੀ ਸਿਖਲਾਈ ਕਾਲਜ ਤੋਂ ਅਧਿਆਪਕ ਦੀ ਸਿਖਲਾਈ ਲੈਣ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਲਾਇਲਪੁਰ ਦੇ ਖ਼ਾਲਸਾ ਹਾਈ ਸਕੂਲ ਦੇ ਹੈੱਡਮਾਸਟਰ ਵਜੋਂ ਆਪਣਾ ਕਰੀਅਰ ਸ਼ੁਰੂ ਕੀਤਾ, ਜਿੱਥੇ ਉਹ 150 ਰੁਪਏ ਦੀ ਤਨਖਾਹ ਵਿੱਚੋਂ ਸਿਰਫ਼ 15 ਰੁਪਏ ਪ੍ਰਤੀ ਮਹੀਨਾ ਲੈਂਦੇ ਸਨ ਅਤੇ ਬਾਕੀ ਸਕੂਲ ਫੰਡਾਂ ਲਈ ਦਾਨ ਕਰ ਦਿੰਦੇ ਸਨ।

ਇੱਕ ਵਿਦਿਆਰਥੀ ਦੇ ਰੂਪ ਵਿੱਚ ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਗਰੀਬ ਰਹਿਣ ਅਤੇ ਆਪਣਾ ਜੀਵਨ ਆਪਣੇ ਲੋਕਾਂ ਦੀ ਸੇਵਾ ਲਈ ਸਮਰਪਿਤ ਕਰਨ ਦਾ ਮਨ ਬਣਾ ਲਿਆ ਸੀ। ਪੈਸੇ ਅਤੇ ਅਹੁਦੇ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਕਦੇ ਲੁਭਾਇਆ ਨਹੀਂ ਅਤੇ ਖ਼ਾਲਸਾ ਪੰਥ ਪ੍ਰਤੀ ਉਨ੍ਹਾਂ ਦਾ ਸਮਰਪਣ ਬਿਨਾਂ ਸ਼ਰਤ ਸੀ।

ਉਹ ਮੂਲ ਰੂਪ ਵਿੱਚ ਇੱਕ ਧਾਰਮਿਕ ਵਿਅਕਤੀ ਸਨ ਪਰ ਹਾਲਾਤਾਂ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸਰਗਰਮ ਰਾਜਨੀਤਿਕ ਜੀਵਨ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰ ਲਿਆ। ਉਨ੍ਹਾਂ ਦੀ ਸੱਚਾਈ, ਇਮਾਨਦਾਰੀ, ਅਖੰਡਤਾ ਅਤੇ ਚਰਿੱਤਰ ਦੀ ਸ਼ੁੱਧਤਾ ਹਮੇਸ਼ਾ ਬੇਦਾਗ਼ ਰਹੀ।

ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧ ਸੁਧਾਰ ਲਹਿਰ ਦੀ ਸ਼ੁਰੂਆਤ ਤੋਂ ਹੀ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲਿਆ, ਪਰ 1921 ਵਿੱਚ ਨਨਕਾਣਾ ਸਾਹਿਬ ਸਾਕੇ ਤੋਂ ਬਾਅਦ, ਜਿੱਥੇ 200 ਤੋਂ ਵੱਧ ਸਿੱਖ ਮਾਰੇ ਗਏ ਸਨ, ਉਨ੍ਹਾਂ ਨੇ ਆਪਣਾ ਅਧਿਆਪਨ ਦਾ ਪੇਸ਼ਾ ਛੱਡ ਦਿੱਤਾ ਅਤੇ ਪੂਰੇ ਸਮੇਂ ਲਈ ਲੋਕ ਸੇਵਕ ਬਣ ਗਏ।

ਉਹ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਦੇ ਪਹਿਲੇ ਜਨਰਲ ਸਕੱਤਰ ਸਨ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਮਿਆਦਾਂ ਲਈ ਇਸਦੇ ਪ੍ਰਧਾਨ ਰਹੇ।

ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧ ਸੁਧਾਰ ਲਹਿਰ ਦੇ ਸਫਲ ਅੰਤ ਤੋਂ ਬਾਅਦ, ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਐਲਾਨ ਕੀਤਾ, “ਹੁਣ ਸਾਡਾ ਫ਼ਰਜ਼ ਹੈ ਕਿ ਅਸੀਂ ਆਪਣੇ ਸਭ ਤੋਂ ਵੱਡੇ ਗੁਰਦੁਆਰੇ, ਸਾਡੇ ਦੇਸ਼ ਨੂੰ, ਬ੍ਰਿਟਿਸ਼ ਸਾਮਰਾਜ ਦੇ ਚੁੰਗਲ ਵਿੱਚੋਂ ਆਜ਼ਾਦ ਕਰਵਾਉਣ ਲਈ ਸੰਘਰਸ਼ ਕਰੀਏ।”

ਉਨ੍ਹਾਂ ਨੇ 1930 ਦੇ ਨਾ-ਮਿਲਵਰਤਣ ਅੰਦੋਲਨ ਵਿੱਚ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲਿਆ। ਇਸ ਅੰਦੋਲਨ ਦੌਰਾਨ ਪੇਸ਼ਾਵਰ ਵਿੱਚ ਪਠਾਣਾਂ (ਲਾਲ ਕੁਰਤੀ) ‘ਤੇ ਪੁਲਿਸ ਨੇ ਗੋਲੀਬਾਰੀ ਕੀਤੀ। ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਵਿਰੋਧ ਵਜੋਂ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ 101 ਸਿੱਖ ਸੱਤਿਆਗ੍ਰਹੀਆਂ ਦਾ ਇੱਕ ਜਥਾ ਪੇਸ਼ਾਵਰ ਲਿਆਂਦਾ। ਉਨ੍ਹਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ 1931 ਦੇ ਗਾਂਧੀ-ਇਰਵਿਨ ਸਮਝੌਤੇ ਤੋਂ ਬਾਅਦ ਰਿਹਾਅ ਕੀਤਾ ਗਿਆ।

ਉਹ ਹੋਰ ਅਕਾਲੀਆਂ ਸਮੇਤ 1940 ਤੱਕ ਇੰਡੀਅਨ ਨੈਸ਼ਨਲ ਕਾਂਗਰਸ ਦੇ ਮੈਂਬਰ ਰਹੇ, ਜਿਨ੍ਹਾਂ ਕੋਲ ਅਕਾਲੀ ਦਲ ਅਤੇ ਕਾਂਗਰਸ ਦੀ ਦੋਹਰੀ ਮੈਂਬਰਸ਼ਿਪ ਸੀ। ਬਾਅਦ ਵਿੱਚ, ਉਹ ਅਕਾਲੀ ਪਾਰਟੀ ਦੇ ਆਗੂ ਵਜੋਂ ਕੌਮੀ ਆਜ਼ਾਦੀ ਅੰਦੋਲਨ ਵਿੱਚ ਹਿੱਸਾ ਲੈਂਦੇ ਰਹੇ।

1947 ਵਿੱਚ, ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਅਤੇ ਅਕਾਲੀ ਦਲ ਨੇ ਪਾਕਿਸਤਾਨ ਦੇ ਗਠਨ ਦਾ ਵਿਰੋਧ ਕੀਤਾ। ਉਹ ਪਾਕਿਸਤਾਨ-ਪੱਖੀ ਭੀੜ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਪੰਜਾਬ ਅਸੈਂਬਲੀ ਦੇ ਬਾਹਰ ‘ਪਾਕਿਸਤਾਨ ਮੁਰਦਾਬਾਦ’ ਦਾ ਨਾਅਰਾ ਲਗਾਉਣ ਵਾਲੇ ਪਹਿਲੇ ਵਿਅਕਤੀ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਮੁਸਲਿਮ ਲੀਗ ਵੱਲੋਂ ਪਾਕਿਸਤਾਨ ਦੀਆਂ ਰਾਜਨੀਤਿਕ ਹੱਦਾਂ ਦੇ ਅੰਦਰ ਇੱਕ ਖ਼ੁਦਮੁਖ਼ਤਾਰ ਸਿੱਖ ਰਾਜ ਦੀ ਪੇਸ਼ਕਸ਼ ਤੋਂ ਲੁਭਾਇਆ ਜਾਣਾ ਵੀ ਠੁਕਰਾ ਦਿੱਤਾ।

ਆਜ਼ਾਦੀ ਤੋਂ ਬਾਅਦ, ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਭਾਸ਼ਾਈ ਆਧਾਰ ‘ਤੇ ਪੰਜਾਬ ਦੀ ਹੱਦਬੰਦੀ ਮੁੜ ਕਰਨ ਦੀ ਮੰਗ ਉਠਾਈ। ਇਸ ਸੰਘਰਸ਼ ਦੌਰਾਨ ਉਹ 1949, 1953, 1955 ਅਤੇ 1960 ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰ ਹੋਏ। ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ 22 ਨਵੰਬਰ, 1967 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਹੋਈ।`,
    artist: "ਗੁਰਰਾਜ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "46-doctor-gandha-singh.jpg": {
    titlePa: "ਡਾ ਗੰਡਾ ਸਿੰਘ",
    descriptionPa: `ਡਾ. ਗੰਡਾ ਸਿੰਘ ਜੀ ਇੱਕ ਮਹਾਨ ਇਤਿਹਾਸਕਾਰ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਇਤਿਹਾਸਕ ਖੋਜ ਦੇ ਖੇਤਰ ਵਿੱਚ ਆਪਣੇ ਨਿਰੰਤਰ ਅਤੇ ਮੋਢੀ ਕਾਰਜਾਂ ਦੁਆਰਾ ਸਿੱਖ ਇਤਿਹਾਸਕਾਰੀ ਵਿੱਚ ਨਵੇਂ ਰੁਝਾਨ ਸਥਾਪਤ ਕੀਤੇ।

ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 15 ਨਵੰਬਰ 1900 ਨੂੰ ਪੰਜਾਬ ਦੇ ਹੁਸ਼ਿਆਰਪੁਰ ਸ਼ਹਿਰ ਦੇ ਨੇੜੇ ਪੈਂਦੇ ਪੁਰਾਣੇ ਕਸਬੇ ਹਰਿਆਣਾ ਵਿਖੇ ਜਵਾਲਾ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀ ਮੁਢਲੀ ਸਿੱਖਿਆ ਪਿੰਡ ਦੀ ਮਸਜਿਦ ਅਤੇ ਪ੍ਰਾਇਮਰੀ ਸਕੂਲ ਤੋਂ ਸ਼ੁਰੂ ਕੀਤੀ, ਅਤੇ ਸਰਕਾਰੀ ਹਾਈ ਸਕੂਲ, ਹੁਸ਼ਿਆਰਪੁਰ ਤੋਂ ਮੈਟ੍ਰਿਕ ਕੀਤੀ।

ਉਨ੍ਹਾਂ ਨੇ ਲਾਹੌਰ ਦੇ ਫਾਰਮਨ ਕ੍ਰਿਸ਼ਚੀਅਨ ਕਾਲਜ ਵਿੱਚ ਦਾਖਲਾ ਲਿਆ, ਪਰ ਜਲਦੀ ਹੀ ਫ਼ੌਜ ਵਿੱਚ ਭਰਤੀ ਹੋਣ ਲਈ ਛੱਡ ਦਿੱਤਾ। ਉਨ੍ਹਾਂ ਨੇ ਪਹਿਲਾਂ ਰਾਵਲਪਿੰਡੀ ਅਤੇ ਪੇਸ਼ਾਵਰ ਵਿਖੇ ਸਪਲਾਈ ਅਤੇ ਟਰਾਂਸਪੋਰਟ ਕੋਰ ਬੇਸ ਡਿਪੂ ਵਿੱਚ ਸੇਵਾ ਕੀਤੀ। 1920 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਮੈਸੋਪੋਟਾਮੀਆ ਐਕਸਪੀਡੀਸ਼ਨਰੀ ਫੋਰਸ, ਬਸਰਾ ਨਾਲ ਅਤੇ ਬਾਅਦ ਵਿੱਚ 1921 ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਰਾਇਲ ਆਰਮੀ ਪੇਅ ਕੋਰ, ਬਸਰਾ ਨਾਲ ਜੋੜਿਆ ਗਿਆ। ਬਸਰਾ ਵਿਖੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜੰਗ ਦੌਰਾਨ ਗੋਲੀ ਲੱਗ ਗਈ। ਠੀਕ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਉਹ ਭਾਰਤ ਵਾਪਸ ਆਏ।

ਭਾਰਤ ਵਿੱਚ ਜ਼ਿਆਦਾ ਨਾ ਰੁਕਦਿਆਂ, ਉਹ ਵਾਪਸ ਮੈਸੋਪੋਟਾਮੀਆ (ਇਰਾਕ) ਅਤੇ ਫਿਰ ਈਰਾਨ ਚਲੇ ਗਏ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਆਬਾਦਾਨ ਵਿਖੇ ਐਂਗਲੋ-ਪਰਸ਼ੀਅਨ ਆਇਲ ਕੰਪਨੀ ਵਿੱਚ ਅਕਾਊਂਟਸ ਅਫ਼ਸਰ ਵਜੋਂ ਕੰਮ ਕੀਤਾ।

ਇੱਥੇ ਉਹ ਬ੍ਰਿਟਿਸ਼ ਵਿਦਵਾਨ ਸਰ ਅਰਨੋਲਡ ਵਿਲਸਨ ਦੇ ਪ੍ਰਭਾਵ ਹੇਠ ਆਏ, ਜਿਨ੍ਹਾਂ ਦੀ ਪ੍ਰੇਰਨਾ ਨਾਲ ਨੌਜਵਾਨ ਗੰਡਾ ਸਿੰਘ ਨੇ ਆਪਣੇ ਮੂਲ ਪ੍ਰਾਂਤ ਪੰਜਾਬ ਦੀ ਇੱਕ ਵਿਆਪਕ ਕਿਤਾਬਸੂਚੀ (Bibliography) ਤਿਆਰ ਕਰਨ ਦਾ ਸੰਕਲਪ ਲਿਆ।

1930 ਦੇ ਅਖੀਰ ਵਿੱਚ ਪੰਜਾਬ ਵਾਪਸ ਆਉਣ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਪਹਿਲਾਂ ਲਾਹੌਰ ਤੋਂ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਣ ਵਾਲੇ ਪੰਜਾਬੀ ਮਾਸਿਕ ‘ਫੁਲਵਾੜੀ’ ਦੇ ਸੰਪਾਦਕੀ ਬੋਰਡ ਵਿੱਚ ਕੰਮ ਕੀਤਾ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਦੀ ਭਗਤ ਲਛਮਣ ਸਿੰਘ ਨਾਲ ਲੰਮੀ ਦੋਸਤੀ ਹੋਈ।

ਉਸਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੂੰ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਨਵੇਂ ਬਣੇ ਸਿੱਖ ਇਤਿਹਾਸ ਖੋਜ ਵਿਭਾਗ ਦਾ ਇੰਚਾਰਜ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ। ਇਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਇਤਿਹਾਸਕ ਸਮੱਗਰੀ ਦੀ ਭਾਲ ਵਿੱਚ ਭਾਰਤ ਭਰ ਦੀਆਂ ਲਾਇਬ੍ਰੇਰੀਆਂ ਅਤੇ ਪੁਰਾਲੇਖਾਂ ਵਿੱਚ ਵਿਆਪਕ ਯਾਤਰਾ ਕੀਤੀ।

1949 ਵਿੱਚ ਉਹ ਪੈਪਸੂ ਸਰਕਾਰ ਅਧੀਨ ਆਰਕਾਈਵਜ਼ ਦੇ ਡਾਇਰੈਕਟਰ ਅਤੇ ਅਜਾਇਬ ਘਰ ਦੇ ਕਿਊਰੇਟਰ ਨਿਯੁਕਤ ਹੋਏ। 1950 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਜਾਬੀ ਵਿਭਾਗ ਦੇ ਡਾਇਰੈਕਟਰ ਦਾ ਵਾਧੂ ਚਾਰਜ ਮਿਲਿਆ।

1954 ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ ‘ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ’ ‘ਤੇ ਲਿਖੇ ਥੀਸਿਸ ਲਈ ਪੰਜਾਬ ਯੂਨੀਵਰਸਿਟੀ, ਚੰਡੀਗੜ੍ਹ ਤੋਂ ਡਾਕਟਰ ਆਫ਼ ਫਿਲਾਸਫੀ (Ph.D.) ਦੀ ਡਿਗਰੀ ਪ੍ਰਾਪਤ ਹੋਈ। ਉਹ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਪਟਿਆਲਾ ਦੇ ਪ੍ਰਿੰਸੀਪਲ ਰਹੇ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਜਾਬੀ ਯੂਨੀਵਰਸਿਟੀ, ਪਟਿਆਲਾ ਵੱਲੋਂ ਪੰਜਾਬ ਹਿਸਟੋਰੀਕਲ ਸਟੱਡੀਜ਼ ਵਿਭਾਗ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨ ਲਈ ਬੁਲਾਇਆ ਗਿਆ।

ਉਨ੍ਹਾਂ ਨੇ 1965 ਵਿੱਚ ਪੰਜਾਬ ਹਿਸਟਰੀ ਕਾਨਫਰੰਸ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਅਤੇ 1967 ਵਿੱਚ ਯੂਨੀਵਰਸਿਟੀ ਦਾ ਪ੍ਰਸਿੱਧ ਜਰਨਲ, ‘ਦੀ ਪੰਜਾਬ ਪਾਸਟ ਐਂਡ ਪ੍ਰੈਜ਼ੈਂਟ’ ਸ਼ੁਰੂ ਕੀਤਾ, ਜਿਸਦੇ ਉਹ ਖੁਦ ਸੰਪਾਦਕ ਸਨ।

ਡਾ. ਗੰਡਾ ਸਿੰਘ ਇੱਕ ਬਹੁ-ਪੱਖੀ ਲੇਖਕ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਖੋਜ ਪੱਤਰਾਂ, ਕਿਤਾਬਚਿਆਂ ਤੋਂ ਇਲਾਵਾ ਦੋ ਦਰਜਨ ਤੋਂ ਵੱਧ ਉੱਚ ਇਤਿਹਾਸਕ ਮਹੱਤਵ ਵਾਲੀਆਂ ਪੁਸਤਕਾਂ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤੀਆਂ। ਉਨ੍ਹਾਂ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਰਚਨਾਵਾਂ ਵਿੱਚ ‘ਲਾਈਫ ਆਫ਼ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ’ (1935), ‘ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ’ (1939), ‘ਏ ਸ਼ਾਰਟ ਹਿਸਟਰੀ ਆਫ਼ ਦੀ ਸਿੱਖਸ’ (ਤੇਜਾ ਸਿੰਘ ਨਾਲ ਸਹਿਯੋਗ, 1950), ਅਤੇ ‘ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ’ (1959) ਸ਼ਾਮਲ ਹਨ।

ਉਨ੍ਹਾਂ ਦੇ ਮਹਾਨ ਕਾਰਜਾਂ ਨੂੰ ਵਿਆਪਕ ਤੌਰ ‘ਤੇ ਸਵੀਕਾਰ ਕੀਤਾ ਗਿਆ। ਉਨ੍ਹਾਂ ਨੂੰ 1963 ਵਿੱਚ ਪੰਜਾਬ ਸਰਕਾਰ ਦਾ ਸਾਹਿਤ ਪੁਰਸਕਾਰ, 1964 ਵਿੱਚ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਵੱਲੋਂ ਸਨਮਾਨ ਅਤੇ ਅਲੀਗੜ੍ਹ ਮੁਸਲਿਮ ਯੂਨੀਵਰਸਿਟੀ ਵੱਲੋਂ ਡੀ. ਲਿਟ. ਦੀ ਆਨਰੇਰੀ ਡਿਗਰੀ ਮਿਲੀ। 1983 ਵਿੱਚ ਭਾਰਤ ਸਰਕਾਰ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਪਦਮ ਭੂਸ਼ਣ ਦੇ ਪੁਰਸਕਾਰ ਨਾਲ ਸਨਮਾਨਿਤ ਕੀਤਾ।

ਡਾ. ਗੰਡਾ ਸਿੰਘ ਨੇ ਦੁਰਲੱਭ ਕਿਤਾਬਾਂ, ਨਕਸ਼ਿਆਂ, ਦਸਤਾਵੇਜ਼ਾਂ ਅਤੇ ਹੱਥ-ਲਿਖਤਾਂ ਦਾ ਇੱਕ ਵਿਸ਼ਾਲ ਨਿੱਜੀ ਸੰਗ੍ਰਹਿ ਤਿਆਰ ਕੀਤਾ, ਜੋ ਉਨ੍ਹਾਂ ਨੇ ਬਾਅਦ ਵਿੱਚ ਪੰਜਾਬੀ ਯੂਨੀਵਰਸਿਟੀ, ਪਟਿਆਲਾ ਨੂੰ ਦਾਨ ਕਰ ਦਿੱਤਾ।

27 ਦਸੰਬਰ 1987 ਨੂੰ ਉਨ੍ਹਾਂ ਦਾ ਦੇਹਾਂਤ ਪਟਿਆਲਾ ਵਿਖੇ ਹੋ ਗਿਆ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "47-karm-singh-historian.jpg": {
    titlePa: "ਕਰਮ ਸਿੰਘ ਹਿਸਟੋਰੀਅਨ",
    descriptionPa: `ਸਰਦਾਰ ਕਰਮ ਸਿੰਘ ਦਾ ਜਨਮ 1884 (ਬਿਕਰਮੀ ਸੰਮਤ) ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਤਰਨਤਾਰਨ ਸਥਿਤ ਝਬਾਲ ਪਿੰਡ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਦੀ ਇੱਕ ਲੱਤ ਨੂੰ ਪੋਲੀਓ ਸੀ ਅਤੇ ਕਿਹਾ ਜਾਂਦਾ ਹੈ ਕਿ ਇੱਕ ਦਿਨ ਇਲਾਕੇ ਦੇ ਇੱਕ ਹੱਡ-ਜੋੜਨ ਵਾਲੇ ਨੇ ਕਿਹਾ ਕਿ ਲੱਤ ਦਾ ਇਲਾਜ ਸਿਰਫ਼ ਪੰਜ ਰੁਪਏ ਨਾਲ ਹੋ ਸਕਦਾ ਹੈ। ਪਿੰਡ ਦੇ ਇੱਕ ਬਜ਼ੁਰਗ ਨੇ ਵਿਅੰਗਮਈ ਢੰਗ ਨਾਲ ਕਿਹਾ ਕਿ “ਮੁੰਡੇ (ਕਰਮ ਸਿੰਘ) ਦੀ ਕੁੱਲ ਕੀਮਤ ਉਸ ਰਕਮ ਤੋਂ ਵੀ ਘੱਟ ਹੈ।” ਉਸ ਬਜ਼ੁਰਗ ਨੂੰ ਸ਼ਾਇਦ ਪਤਾ ਨਹੀਂ ਸੀ ਕਿ ਇਹੀ ਮੁੰਡਾ ਇਸ ਖੇਤਰ ਲਈ ਨਾਮਣਾ ਖੱਟੇਗਾ।

ਤਰਨਤਾਰਨ ਤੋਂ ਆਪਣੀ ਸਕੂਲੀ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਕਰਮ ਸਿੰਘ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਖ਼ਾਲਸਾ ਸਕੂਲ ਵਿੱਚ ਐੱਫ.ਏ. ਵਿੱਚ ਦਾਖਲਾ ਲਿਆ। ਹਾਲਾਂਕਿ, ਉਨ੍ਹਾਂ ਨੇ ਖੋਜ ਦੇ ਖਾਤਰ ਉੱਚ ਸਿੱਖਿਆ ਦਾ ਵਿਚਾਰ ਛੱਡ ਦਿੱਤਾ।

ਉਹ ਜਾਣਦੇ ਸਨ ਕਿ ਬਹੁਤ ਸਾਰੇ ਬਜ਼ੁਰਗ, ਜੋ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਚਸ਼ਮਦੀਦ ਗਵਾਹ ਸਨ, ਪਲੇਗ ਕਾਰਨ ਮਰ ਰਹੇ ਸਨ ਅਤੇ ਇਹ ਸਮੇਂ ਦੀ ਲੋੜ ਸੀ ਕਿ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀਆਂ ਯਾਦਾਂ ਅਤੇ ਬਿਰਤਾਂਤਾਂ ਨੂੰ ਰਿਕਾਰਡ ਕੀਤਾ ਜਾਵੇ, ਜੋ ਇਨ੍ਹਾਂ ਲੋਕਾਂ ਦੀ ਮੌਤ ਦੇ ਨਾਲ ਖ਼ਤਮ ਹੋ ਜਾਣਗੇ।

ਸ. ਕਰਮ ਸਿੰਘ ਦੀਆਂ ਸੇਵਾਵਾਂ ਨੂੰ ਸਿੱਖ ਪੰਥ ਦੁਆਰਾ ਸਮੇਂ-ਸਮੇਂ ‘ਤੇ ਮਾਨਤਾ ਦਿੱਤੀ ਗਈ ਹੈ। ਉਹ ਖ਼ਾਲਸਾ ਕਾਲਜ ਵਿਖੇ ਸਿੱਖ ਹਿਸਟਰੀ ਰਿਸਰਚ ਡਿਪਾਰਟਮੈਂਟ (SHRD) ਦੀ ਸਥਾਪਨਾ ਪਿੱਛੇ ਪ੍ਰੇਰਨਾ ਸਰੋਤ ਸਨ, ਹਾਲਾਂਕਿ ਇਹ ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ ਤੋਂ ਬਾਅਦ ਹੋਂਦ ਵਿੱਚ ਆਇਆ।

ਇਸ ਇਤਿਹਾਸਕ ਵਿਭਾਗ ਦੀ ਸਥਾਪਨਾ ਤੋਂ ਇੱਕ ਸਾਲ ਪਹਿਲਾਂ, 22 ਦਸੰਬਰ, 1929 ਨੂੰ ਅਕਾਲ ਤਖ਼ਤ ਵਿਖੇ ਇੱਕ ਮੀਟਿੰਗ ਬੁਲਾਈ ਗਈ ਸੀ, ਅਤੇ ਇੱਕ ਸੋਸਾਇਟੀ ਦਾ ਗਠਨ ਕੀਤਾ ਗਿਆ ਸੀ। ਕਰਮ ਸਿੰਘ ਨੂੰ ਇਸਦਾ ਪਹਿਲਾ ਸਕੱਤਰ ਨਾਮਜ਼ਦ ਕੀਤਾ ਗਿਆ ਸੀ।

ਭਾਵੇਂ ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ 30 ਸਤੰਬਰ, 1930 ਨੂੰ ਹੋ ਗਈ, ਪਰ ਖ਼ਾਲਸਾ ਕਾਲਜ ਨੇ ਇਸ ਪ੍ਰਸਤਾਵ ਨੂੰ ਨਹੀਂ ਛੱਡਿਆ ਅਤੇ ਉਸੇ ਸਾਲ ਮਹਾਨ ਸਿੱਖ ਇਤਿਹਾਸਕਾਰ ਦੇ ਸ਼ਰਧਾਂਜਲੀ ਸਮਾਰੋਹ ਨੂੰ ਮਨਾਉਣ ਲਈ ਗੁਰੂ ਕਾ ਬਾਗ਼ (ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ) ਵਿਖੇ ਹੋਈ ਇੱਕ ਮੀਟਿੰਗ ਵਿੱਚ ਵਿਭਾਗ ਦੀ ਸਥਾਪਨਾ ਦਾ ਐਲਾਨ ਕੀਤਾ।

ਸਿੱਖ ਹਿਸਟਰੀ ਰਿਸਰਚ ਡਿਪਾਰਟਮੈਂਟ, ਜੋ ਕਿ 1930 ਵਿੱਚ ਸਥਾਪਿਤ ਕੀਤਾ ਗਿਆ ਸੀ, ਕੋਲ ਸਿੱਖ ਰਾਜ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਯੁੱਗ ਦੀਆਂ ਦੁਰਲੱਭ ਪੇਂਟਿੰਗਾਂ, ਪੁਰਾਣੇ ਅਖ਼ਬਾਰਾਂ, ਰਸਾਲਿਆਂ ਦਾ ਸੰਗ੍ਰਹਿ ਹੈ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਅਜਾਇਬ ਘਰ ਵਿੱਚ ਨਿਪੁੰਨਤਾ ਨਾਲ ਵਿਵਸਥਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਵਿਭਾਗ ਵਿੱਚ 17ਵੀਂ ਅਤੇ 18ਵੀਂ ਸਦੀ ਦੇ ਦੁਰਲੱਭ ਸਿੱਕੇ ਅਤੇ ਹਥਿਆਰ (ਤੋੜੇਦਾਰ ਬੰਦੂਕ, ਢਾਲ, ਕਟਾਰ, ਚੱਕਰ, ਕਮਾਨਾਂ ਅਤੇ ਕਿਰਪਾਨਾਂ) ਵੀ ਮੌਜੂਦ ਹਨ।`,
    artist: "ਗੁਰਸ਼ਰਨ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "48-bibi-harnam-kaur.jpg": {
    titlePa: "ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ",
    descriptionPa: `ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਪੰਜਾਬ ਵਿੱਚ ਔਰਤਾਂ ਦੀ ਸਿੱਖਿਆ ਦੇ ਖੇਤਰ ਵਿੱਚ ਇੱਕ ਪ੍ਰਮੁੱਖ ਅਤੇ ਮੋਹਰੀ ਸ਼ਖ਼ਸੀਅਤ ਸਨ। ਭਾਵੇਂ ਉਨ੍ਹਾਂ ਦਾ ਜੀਵਨ ਕਾਲ ਬਹੁਤ ਛੋਟਾ ਸੀ, ਪਰ ਸਿੱਖਿਆ ਪ੍ਰਤੀ ਉਨ੍ਹਾਂ ਦਾ ਸਮਰਪਣ ਅਤੇ ਦ੍ਰਿੜ੍ਹਤਾ ਅੱਜ ਵੀ ਯਾਦ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।

ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਜੀ ਦਾ ਜਨਮ 10 ਅਪ੍ਰੈਲ 1882 ਨੂੰ ਪੰਜਾਬ ਦੇ ਫਿਰੋਜ਼ਪੁਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਚੰਦ ਪੁਰਾਣਾ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਦਾ ਅਸਲ ਨਾਮ ਜਿਉਣੀ ਸੀ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਭਗਵਾਨ ਦਾਸ ਧਾਰਮਿਕ ਬਿਰਤੀ ਵਾਲੇ ਪੁਰਸ਼ ਸਨ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਇੱਕ ਉਦਾਸੀ ਸਾਧੂ ਦੇ ਡੇਰੇ ਦੇ ਮੁਖੀ ਬਣ ਗਏ, ਜਿੱਥੇ ਜਿਉਣੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਮਾਤਾ ਰਾਮ ਦੇਈ ਉਨ੍ਹਾਂ ਨਾਲ ਜੁੜ ਗਏ।

ਜਿਉਣੀ ਨੇ ਬਹੁਤ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਸ਼ਾਨਦਾਰ ਵਿਦਵਤਾ ਦਾ ਪ੍ਰਮਾਣ ਦਿੱਤਾ। ਛੇ ਸਾਲ ਦੀ ਉਮਰ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਉਨ੍ਹਾਂ ਨੇ ਪੰਜ ਗ੍ਰੰਥ, ਦਸਮ ਗ੍ਰੰਥ, ਅਤੇ ਹਨੂਮਾਨ ਨਾਟਕ ਵਰਗੇ ਧਾਰਮਿਕ ਗ੍ਰੰਥ ਪੜ੍ਹ ਲਏ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸਥਾਨਕ ਆਰੀਆ ਪਾਠਸ਼ਾਲਾ ਵਿੱਚ ਹਿੰਦੀ ਦੀ ਸਿੱਖਿਆ ਲਈ ਦਾਖਲਾ ਲਿਆ, ਪਰ ਛੇ ਮਹੀਨਿਆਂ ਬਾਅਦ ਇਸਨੂੰ ਛੱਡ ਦਿੱਤਾ ਕਿਉਂਕਿ ਉੱਥੇ ਗੁਰਮੁਖੀ ਪੜ੍ਹਾਉਣ ਦੀ ਕੋਈ ਸਹੂਲਤ ਨਹੀਂ ਸੀ। ਬਾਅਦ ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੂੰ ਦੌਧਰ ਪਿੰਡ ਭੇਜਿਆ ਗਿਆ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਕਈ ਸਾਲ ਭਾਈ ਦੁਲਾ ਸਿੰਘ ਤੋਂ ਪੜ੍ਹਾਈ ਕੀਤੀ।

ਜਿਉਣੀ ਦੇ ਜੀਵਨ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਮੋੜ ਉਦੋਂ ਆਇਆ ਜਦੋਂ ਭਾਈ ਤਖ਼ਤ ਸਿੰਘ, ਜਿਨ੍ਹਾਂ ਨੇ ਸਿੰਘ ਸਭਾ ਦੀ ਸਰਪ੍ਰਸਤੀ ਹੇਠ ਇੱਕ ਗੁਰਮੁਖੀ ਸਕੂਲ ਸ਼ੁਰੂ ਕੀਤਾ ਸੀ, ਨੇ ਸਿਰਫ਼ ਕੁੜੀਆਂ ਲਈ ਇੱਕ ਸਕੂਲ ਖੋਲ੍ਹਣ ਦੀ ਇੱਛਾ ਜ਼ਾਹਰ ਕੀਤੀ। ਸਿੰਘ ਸਭਾ ਇਸ ਪ੍ਰਸਤਾਵ ਨਾਲ ਸਹਿਮਤ ਸੀ ਪਰ ਉਹ ਇੱਕ ਕੁਆਰੀ ਕੁੜੀ ਵਲੋਂ ਇਸਨੂੰ ਚਲਾਉਣ ਦੇ ਵਿਚਾਰ ਤੋਂ ਝਿਜਕਦੇ ਸਨ। ਇਸ ਸਮੱਸਿਆ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਜਿਉਣੀ ਦੇ ਮਾਪਿਆਂ ਨੇ ਤਖ਼ਤ ਸਿੰਘ ਨਾਲ ਉਨ੍ਹਾਂ ਦੀ ਧੀ ਦਾ ਵਿਆਹ ਕਰਨ ਦਾ ਵਾਅਦਾ ਕੀਤਾ। ਜਿਉਣੀ ਦੀ ਮੰਗਣੀ 11 ਅਕਤੂਬਰ 1893 ਨੂੰ ਹੋਈ ਅਤੇ ਵਿਆਹ 8 ਮਈ 1894 ਨੂੰ ਹੋਇਆ।

15 ਜੁਲਾਈ 1901 ਨੂੰ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਲੈਣ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੂੰ ਹਰਨਾਮ ਕੌਰ ਦਾ ਨਾਮ ਪ੍ਰਾਪਤ ਹੋਇਆ। 5 ਨਵੰਬਰ 1902 ਨੂੰ ਫਿਰੋਜ਼ਪੁਰ ਵਿੱਚ ਕੰਨਿਆ ਪਾਠਸ਼ਾਲਾ ਖੋਲ੍ਹਿਆ ਗਿਆ, ਅਤੇ ਹਰਨਾਮ ਕੌਰ ਇੱਕ ਕਰਮਚਾਰੀ ਵਜੋਂ ਸਿੱਖਣ ਅਤੇ ਪੜ੍ਹਾਉਣ ਲਈ ਇਸ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਈ। ਇਸ ਜੋੜੇ ਨੇ ਆਪਣੇ ਆਪ ਨੂੰ ਇਸ ਕਾਰਜ ਲਈ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤਾ, ਜਿੱਥੇ ਹਰਨਾਮ ਕੌਰ ਦੀ ਮਾਸਿਕ ਤਨਖਾਹ 6 ਰੁਪਏ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਪਤੀ ਦੀ 8 ਰੁਪਏ ਸੀ।

ਸਿੰਘ ਸਭਾ ਦੇ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਅੰਦਰੂਨੀ ਮਤਭੇਦਾਂ ਤੋਂ ਤੰਗ ਆ ਕੇ ਦੋਨਾਂ ਨੇ 1 ਸਤੰਬਰ 1900 ਨੂੰ ਇਸ ਦੀ ਸੇਵਾ ਛੱਡ ਦਿੱਤੀ ਪਰ ਨਿੱਜੀ ਤੌਰ ‘ਤੇ ਸਿੱਖਿਆ ਦੇ ਕਾਰਜ ਨੂੰ ਜਾਰੀ ਰੱਖਿਆ।

ਸਾਲ 1903 ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਨੇ ਆਪਣੇ ਪਤੀ ਨੂੰ ਫਿਰੋਜ਼ਪੁਰ ਵਿੱਚ ਕੁੜੀਆਂ ਲਈ ਇੱਕ ਬੋਰਡਿੰਗ ਸਕੂਲ ਖੋਲ੍ਹਣ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ। ਕਈ ਮਾਪਿਆਂ ਦੇ ਸਮਰਥਨ ਨਾਲ, ਇਸ ਸੁਪਨੇ ਨੂੰ ਹਕੀਕਤ ਵਿੱਚ ਬਦਲਿਆ ਗਿਆ ਅਤੇ ਇਸ ਬੋਰਡਿੰਗ ਸਕੂਲ ਦਾ ਨਾਮ ‘ਸਿੱਖ ਕੰਨਿਆ ਮਹਾਂ ਵਿਦਿਆਲਾ’ ਰੱਖਿਆ ਗਿਆ, ਜਿਸ ਨੇ ਮਾਰਚ 1905 ਤੋਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ।

ਹਰਨਾਮ ਕੌਰ ਨੇ ਇਸ ਵਿਦਿਆਲਾ ਦੀ ਸਫਲਤਾ ਲਈ ਸਖ਼ਤ ਮਿਹਨਤ ਕੀਤੀ। ਉਹ ਨਾ ਸਿਰਫ਼ ਪੜ੍ਹਾਉਣ ਵਿੱਚ ਆਪਣੇ ਪਤੀ ਦੀ ਮਦਦ ਕਰਦੀ ਸੀ, ਬਲਕਿ ਵਿਦਿਆਰਥਣਾਂ ਲਈ ਖਾਣ-ਪੀਣ ਅਤੇ ਰਹਿਣ-ਸਹਿਣ ਦੇ ਪ੍ਰਬੰਧਾਂ ਦੀ ਵੀ ਦੇਖਭਾਲ ਕਰਦੀ ਸੀ।

ਉਨ੍ਹਾਂ ਨੇ ਧਾਰਮਿਕ ਅਤੇ ਸਮਾਜਿਕ ਸੁਧਾਰਾਂ ਲਈ ਵੀ ਕੰਮ ਕੀਤਾ, ਜਿਸ ਵਿੱਚ ਇਸਤਰੀ ਸਤਿਸੰਗ (ਮਹਿਲਾ ਧਾਰਮਿਕ ਸਮਾਜ) ਅਤੇ ਇੱਕ ਪ੍ਰਚਾਰਕ ਜਥਾ (ਮਿਸ਼ਨਰੀ ਸਮੂਹ) ਦੀ ਸਥਾਪਨਾ ਸ਼ਾਮਲ ਹੈ।

ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਜੀ ਨੇ ਜਿਸ ਮਹਾਨ ਉਦੇਸ਼ ਲਈ ਆਪਣੇ ਆਪ ਨੂੰ ਸਮਰਪਿਤ ਕੀਤਾ ਸੀ, ਉਸ ਦੀ ਸੇਵਾ ਲਈ ਉਹ ਜ਼ਿਆਦਾ ਦੇਰ ਤੱਕ ਜੀਵਤ ਨਹੀਂ ਰਹਿ ਸਕੇ। 1 ਅਕਤੂਬਰ 1906 ਨੂੰ ਬਹੁਤ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦਾ ਦੇਹਾਂਤ ਹੋ ਗਿਆ। ਇਸ ਤਰ੍ਹਾਂ ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਵਲੋਂ ਥੋੜ੍ਹੇ ਜਿਹੇ ਸਮੇਂ ਵਿੱਚ ਪੰਜਾਬ ਵਿੱਚ ਔਰਤਾਂ ਦੀ ਸਿੱਖਿਆ ਲਈ ਪਾਇਆ ਯੋਗਦਾਨ ਮੀਲ ਪੱਥਰ ਸਾਬਿਤ ਹੋਇਆ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "49-bhai-kaahn-singh-nabha.jpg": {
    titlePa: "ਭਾਈ ਕਾਹਨ ਸਿੰਘ ਨਾਭਾ",
    descriptionPa: `ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ ਇੱਕ ਮਹਾਨ ਵਿਦਵਾਨ, ਐਨਸਾਈਕਲੋਪੀਡੀਆ ਲੇਖਕ ਅਤੇ ਸਿੱਖੀ ਦੇ ਪ੍ਰਮੁੱਖ ਵਿਆਖਿਆਕਾਰ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 30 ਅਗਸਤ 1861 ਨੂੰ ਸਬਜ਼ ਬਨੇਰਾ (ਨਾਭਾ ਦੇ ਨੇੜੇ) ਵਿਖੇ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਨਰਾਇਣ ਸਿੰਘ ਜੀ ਸੰਤ ਸੁਭਾਅ ਵਾਲੇ ਸਨ।

ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਜੀ ਨੇ ਕੋਈ ਰਸਮੀ ਸਕੂਲੀ ਜਾਂ ਕਾਲਜ ਦੀ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤੀ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਨੇ ਨਾਭਾ ਦੇ ਆਸ-ਪਾਸ ਦੇ ਪੰਡਿਤਾਂ ਤੋਂ ਉਨ੍ਹਾਂ ਨੂੰ ਹਿੰਦੀ, ਬ੍ਰਿਜ ਭਾਸ਼ਾ ਅਤੇ ਸੰਸਕ੍ਰਿਤ ਦੀ ਸਿੱਖਿਆ ਦਾ ਪ੍ਰਬੰਧ ਕੀਤਾ ਹੋਇਆ ਸੀ।

10 ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ, ਉਹ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅਤੇ ਦਸਮ ਗ੍ਰੰਥ ਦਾ ਪਾਠ ਕਰਨ ਦੇ ਯੋਗ ਹੋ ਗਏ ਸਨ। 20 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਦਿੱਲੀ ਜਾ ਕੇ ਮੌਲਵੀਆਂ ਤੋਂ ਫ਼ਾਰਸੀ ਭਾਸ਼ਾ ਸਿੱਖੀ।

1887 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਨਾਭਾ ਰਿਆਸਤ ਦੇ ਵਾਰਸ ਟਿੱਕਾ ਰਿਪੁਦਮਨ ਸਿੰਘ ਦਾ ਟਿਊਟਰ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ। ਉਨ੍ਹਾਂ ਨੇ ਰਿਆਸਤ ਵਿੱਚ ਮਹਾਰਾਜਾ ਦੇ ਪ੍ਰਾਈਵੇਟ ਸਕੱਤਰ ਤੋਂ ਲੈ ਕੇ ਹਾਈ ਕੋਰਟ ਦੇ ਜੱਜ ਤੱਕ ਕਈ ਅਹੁਦਿਆਂ ‘ਤੇ ਜਿੰਮੇਵਾਰੀ ਨਿਭਾਈ ਅਤੇ 1915-17 ਤੱਕ ਪਟਿਆਲਾ ਰਿਆਸਤ ਵਿੱਚ ਵੀ ਸੇਵਾ ਨਿਭਾਈ।

1885 ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਮੈਕਸ ਆਰਥਰ ਮੈਕਾਲਿਫ ਨਾਲ ਹੋਈ, ਜੋ ਜੀਵਨ ਭਰ ਦੀ ਦੋਸਤੀ ਵਿੱਚ ਬਦਲ ਗਈ। ਮੈਕਾਲਿਫ ਆਪਣੀ ਛੇ ਜਿਲਦਾਂ ਵਾਲੀ ਕਿਤਾਬ ‘ਦਿ ਸਿੱਖ ਰਿਲੀਜਨ’ ਦੇ ਕੰਮ ਵਿੱਚ ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਦੀ ਸਲਾਹ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ ‘ਤੇ ਬਹੁਤ ਨਿਰਭਰ ਸੀ ਅਤੇ ਇੱਥੋਂ ਤੱਕ ਕਿ ਇਸ ਕਿਤਾਬ ਦਾ ਕਾਪੀਰਾਈਟ ਵੀ ਉਨ੍ਹਾਂ ਦੇ ਨਾਮ ਕਰ ਦਿੱਤਾ।

ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਜੀ ਦੀਆਂ ਰਚਨਾਵਾਂ ਵਿੱਚੋਂ, ਗੁਰੂਸ਼ਬਦ ਰਤਨਾਕਰ ਮਹਾਨ ਕੋਸ਼ ਸਿੱਖ ਸਾਹਿਤ ਦਾ ਇੱਕ ਵਿਸ਼ਵਕੋਸ਼ ਹੈ ਜੋ ਕਿ ਉਨ੍ਹਾਂ ਦੀ ਅਦੁੱਤੀ ਮਿਹਨਤ ਅਤੇ ਵਿਦਵਤਾ ਦਾ ਸਦੀਵੀ ਪ੍ਰਮਾਣ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਇਹ ਕੋਸ਼ ਲਿਖਣ ਵਿੱਚ 14 ਸਾਲ ਲਗਾਏ। ਇਹ ਕੋਸ਼ ਪਟਿਆਲਾ ਦੇ ਮਹਾਰਾਜਾ ਭੁਪਿੰਦਰ ਸਿੰਘ ਦੀ ਸਰਪ੍ਰਸਤੀ ਹੇਠ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਇਆ ਅਤੇ ਅੱਜ ਵੀ ਇਹ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਦੀ ਪ੍ਰਮਾਣਿਕ ਵਿਆਖਿਆ ਵਜੋਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ।

ਇਸ ਕਾਰਜ ਤੋਂ ਬਿਨ੍ਹਾਂ ‘ਹਮ ਹਿੰਦੂ ਨਹੀਂ’, ‘ਗੁਰਮਤਿ ਪ੍ਰਭਾਕਰ’ ਅਤੇ ‘ਗੁਰਮਤਿ ਸੁਧਾਕਰ’ ਉਨ੍ਹਾਂ ਦੇ ਪ੍ਰਮੁੱਖ ਕਾਰਜ ਹਨ।

ਉਨ੍ਹਾਂ ਨੂੰ 1932 ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਦੁਆਰਾ “ਸਰਦਾਰ ਬਹਾਦਰ” ਦਾ ਖ਼ਿਤਾਬ ਦਿੱਤਾ ਗਿਆ। 1933 ਵਿੱਚ ਅਫ਼ਗਾਨਿਸਤਾਨ ਦੇ ਬਾਦਸ਼ਾਹ ਨਾਦਿਰ ਸ਼ਾਹ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਇੱਕ ਤਲਵਾਰ ਵੀ ਭੇਟ ਕੀਤੀ।

ਅਖੀਰ 24 ਨਵੰਬਰ 1938 ਨੂੰ ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਹਨ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "50-sikhs-in-world-wars.jpg": {
    titlePa: "ਵਿਸ਼ਵ ਜੰਗਾਂ",
    descriptionPa: `ਵਿਸ਼ਵ ਜੰਗਾਂ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਪੜਾਅ ਸੀ। ਇਸ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਵਿਸ਼ਵ ਪੱਧਰ ‘ਤੇ ਆਪਣੀ ਭੂਮਿਕਾ ਨਿਭਾਈ ਸੀ।

ਵਿਸ਼ਵ ਜੰਗਾਂ ਵਿੱਚ ਸਿੱਖਾਂ ਦੀ ਭਾਗੀਦਾਰੀ ਉਨ੍ਹਾਂ ਦੀ ਸੈਨਿਕ ਸ਼ਕਤੀ ਅਤੇ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਮਾਣ ਹੈ।`,
    artist: "ਜਗਦੀਪ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "51-partition-of-1947.jpg": {
    titlePa: "੧੯੪੭ ਦੀ ਵੰਡ",
    descriptionPa: `ਸੰਨ 1947 ਵਿੱਚ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਦੇ ਨਾਲ ਹੀ ਪੰਜਾਬ ਨੂੰ ਇੱਕ ਨਾ ਪੂਰਾ ਹੋਣ ਵਾਲਾ ਦੁਖਾਂਤ ਝੱਲਣਾ ਪਿਆ। ਹੱਸਦਾ ਵਸਦਾ ਪੰਜਾਬ ਦੋ ਹਿੱਸਿਆਂ ਵਿਚ ਚੜ੍ਹਦਾ ਪੰਜਾਬ ਅਤੇ ਲਹਿੰਦਾ ਪੰਜਾਬ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ। ਵੰਡ ਦਾ ਆਧਾਰ ਬ੍ਰਿਟਿਸ਼ ਵਕੀਲ ਸਿਰਿਲ ਰੈੱਡਕਲਿਫ ਦੀ ਅਗਵਾਈ ਹੇਠ ਬਣੇ ਸੀਮਾ ਕਮਿਸ਼ਨ ਨੇ ਧਾਰਮਿਕ ਬਹੁਗਿਣਤੀ ਨੂੰ ਬਣਾਇਆ। ਜਿਹੜੇ ਜ਼ਿਲ੍ਹੇ ਮੁਸਲਿਮ ਬਹੁਗਿਣਤੀ ਵਾਲੇ ਸਨ (ਜਿਵੇਂ ਲਾਹੌਰ, ਰਾਵਲਪਿੰਡੀ, ਮੁਲਤਾਨ), ਉਹ ਲਹਿੰਦੇ ਪੰਜਾਬ (ਪਾਕਿਸਤਾਨ) ਦਾ ਹਿੱਸਾ ਬਣੇ। ਇਸ ਦੇ ਉਲਟ, ਹਿੰਦੂ ਅਤੇ ਸਿੱਖ ਬਹੁਗਿਣਤੀ ਵਾਲੇ ਜ਼ਿਲ੍ਹੇ (ਜਿਵੇਂ ਅੰਮ੍ਰਿਤਸਰ, ਜਲੰਧਰ, ਲੁਧਿਆਣਾ) ਚੜ੍ਹਦੇ ਪੰਜਾਬ (ਭਾਰਤ) ਦੇ ਹਿੱਸੇ ਆਏ।

ਰੈੱਡਕਲਿਫ ਲਾਈਨ ਨੇ ਪੰਜਾਬ ਨੂੰ ਪੰਜ ਦਰਿਆਵਾਂ, ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨਾਂ, ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਕੇਂਦਰਾਂ ਸਮੇਤ ਵੰਡ ਦਿੱਤਾ। ਸਿੱਖਾਂ ਲਈ ਇਹ ਵੰਡ ਖਾਸ ਤੌਰ ‘ਤੇ ਦੁਖਦਾਈ ਸੀ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਦੇ ਕਈ ਪਵਿੱਤਰ ਅਸਥਾਨ (ਜਿਵੇਂ ਕਿ ਨਨਕਾਣਾ ਸਾਹਿਬ) ਅਤੇ ਖੁਸ਼ਹਾਲ ਜ਼ਮੀਨਾਂ ਲਹਿੰਦੇ ਪੰਜਾਬ ਵਿੱਚ ਚਲੀਆਂ ਗਈਆਂ।

ਵੰਡ ਦਾ ਐਲਾਨ ਹੁੰਦੇ ਸਾਰ ਹੀ ਦੋਵਾਂ ਪਾਸਿਆਂ ‘ਤੇ ਭਿਆਨਕ ਫਿਰਕੂ ਹਿੰਸਾ ਭੜਕ ਉੱਠੀ। ਲੱਖਾਂ ਹਿੰਦੂਆਂ ਅਤੇ ਸਿੱਖਾਂ ਨੂੰ ਲਹਿੰਦੇ ਪੰਜਾਬ ਤੋਂ ਚੜ੍ਹਦੇ ਪੰਜਾਬ ਵੱਲ ਅਤੇ ਲੱਖਾਂ ਮੁਸਲਮਾਨਾਂ ਨੂੰ ਉਲਟ ਦਿਸ਼ਾ ਵਿੱਚ ਪੈਦਲ ਜਾਂ ਰੇਲ ਗੱਡੀਆਂ ਰਾਹੀਂ ਹਿਜਰਤ ਕਰਨੀ ਪਈ।

ਇਹ ਮਨੁੱਖੀ ਇਤਿਹਾਸ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਅਤੇ ਖੂਨੀ ਹਿਜਰਤ ਸੀ, ਜਿਸ ਵਿੱਚ ਲਗਭਗ 10 ਲੱਖ ਲੋਕ ਮਾਰੇ ਗਏ ਅਤੇ ਕਰੋੜਾਂ ਉਜਾੜੇ ਗਏ। ਚੜ੍ਹਦੇ ਅਤੇ ਲਹਿੰਦੇ ਪੰਜਾਬ ਦੀ ਵੰਡ ਸਿਰਫ਼ ਜ਼ਮੀਨ ਦੀ ਵੰਡ ਨਹੀਂ ਸੀ, ਸਗੋਂ ਇਸ ਨੇ ਪੰਜਾਬੀਅਤ ਦੀ ਰੂਹ ਨੂੰ ਡੂੰਘਾ ਜ਼ਖ਼ਮ ਦਿੱਤਾ, ਜਿਸ ਦੇ ਦਰਦ ਦੀ ਗੂੰਜ ਅੱਜ ਵੀ ਸੁਣਾਈ ਦਿੰਦੀ ਹੈ।`,
    artist: "ਰਵਿੰਦਰ ਸਿੰਘ",
    medium: "Canvas Print",
  },

  "52-bhai-fauja-singh-saka-1978.jpg": {
    titlePa: "ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ 17 ਮਈ 1936 ਨੂੰ ਜ਼ਿਲ੍ਹਾ ਗੁਰਦਾਸਪੁਰ ਵਿੱਚ ਹੋਇਆ। ਪਿਤਾ ਸਰਦਾਰ ਸੁਰੈਣ ਸਿੰਘ ਇੱਕ ਮੱਧਵਰਗੀ ਕਿਸਾਨ ਸਨ। ਭਾਵੇਂ ਉਹਨਾਂ ਨੇ ਦਸਵੀਂ ਕਲਾਸ ਵਿੱਚ ਅੰਮ੍ਰਿਤ ਛਕ ਲਿਆ ਸੀ, ਪਰ ਅਧਿਆਤਮਕ ਭੁੱਖ ਨੂੰ ਸ਼ਾਂਤ ਕਰਨ ਲਈ ਉਹਨਾਂ ਦਾ ਮਨ ਭਟਕਦਾ ਰਿਹਾ ਅਤੇ ਉਹ ਸੰਤਾਂ-ਸਾਧਾਂ ਦੇ ਡੇਰਿਆਂ ‘ਤੇ ਦੋ ਸਾਲ ਤੱਕ ਘਰੋਂ ਦੂਰ ਰਹੇ।

ਅੰਤ ਵਿੱਚ, 1964 ਵਿੱਚ ਅਖੰਡ ਕੀਰਤਨੀ ਜਥੇ ਦੇ ਸਮਾਗਮ ਦੌਰਾਨ ਅੰਮ੍ਰਿਤ ਛਕ ਕੇ, ਉਹਨਾਂ ਨੂੰ ਨਾਮ ਰਸ ਦੀ ਪ੍ਰਾਪਤੀ ਹੋਈ, ਜਿਸ ਨਾਲ ਉਹਨਾਂ ਦੀ ਅਧਿਆਤਮਕ ਖੋਜ ਪੂਰੀ ਹੋਈ।

ਭਾਈ ਸਾਹਿਬ ਜੀ ਬੀਰ ਰਸ ਅਤੇ ਨਾਮ ਰਸ ਨਾਲ ਭਰਪੂਰ ਸਨ। ਉਹਨਾਂ ਨੇ ਗੱਤਕਾ ਸਿੱਖਿਆ ਅਤੇ ਹੋਰ ਨੌਜਵਾਨਾਂ ਨੂੰ ਵੀ ਸਿਖਾਇਆ, ਅਤੇ ਛੇਤੀ ਹੀ ਉਹ ਇਲਾਕੇ ਦੇ ਬਿਹਤਰੀਨ ਗੱਤਕਾ ਖਿਡਾਰੀ ਬਣ ਗਏ।

1970 ਤੋਂ ਬਾਅਦ, ਉਹਨਾਂ ਨੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨੀ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ। ਉਹ ਅਤੇ ਉਹਨਾਂ ਦੀ ਪਤਨੀ ਬੀਬੀ ਅਮਰਜੀਤ ਕੌਰ, ਆਪਣੀ ਸਾਰੀ ਕਮਾਈ ਸੇਵਾ ‘ਤੇ ਖਰਚ ਕਰ ਦਿੰਦੇ ਸਨ।

ਭਾਈ ਸਾਹਿਬ ਅਕਸਰ ਕਹਿੰਦੇ ਸਨ, “ਖ਼ਾਲਸਾ ਪੰਥ ਦਾ ਪੌਦਾ ਜਦੋਂ ਸੁੱਕਣ ਲੱਗਦਾ ਹੈ, ਤਾਂ ਉਸ ਨੂੰ ਹੋਰ ਖੂਨ ਚਾਹੀਦਾ ਹੁੰਦਾ ਹੈ,” ਅਤੇ ਇਹ ਚੱਕਰ ਲਗਭਗ ਹਰ 50 ਸਾਲ ਬਾਅਦ ਆਉਂਦਾ ਹੈ।

ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਅਨੁਸਾਰ, ਖ਼ਾਲਸਾ ਪੰਥ ਦਾ ਪੌਦਾ ਸੁੱਕ ਰਿਹਾ ਸੀ ਅਤੇ ਉਹ ਬੇਇਨਸਾਫ਼ੀ ਤੇ ਧਰਮ ਦੀ ਬੇਅਦਬੀ ਨੂੰ ਬਰਦਾਸ਼ਤ ਨਹੀਂ ਕਰ ਸਕਦੇ ਸਨ। 1972 ਵਿੱਚ ਮਿਸਰੀ ਬਾਜ਼ਾਰ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਹੋਈ ਬੇਅਦਬੀ ਦੇ ਮਾਮਲੇ ਵਿੱਚ, ਜਿੱਥੇ ਪੁਲਿਸ ਵੀ ਦੋਸ਼ੀਆਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰਨ ਤੋਂ ਡਰਦੀ ਸੀ, ਉੱਥੇ ਭਾਈ ਸਾਹਿਬ ਨੇ ਖੁਦ ਦਖਲ ਦੇ ਕੇ ਅਪਰਾਧੀਆਂ ਨੂੰ ਸਜ਼ਾ ਦਿੱਤੀ।

ਵਿਸਾਖੀ 13 ਅਪ੍ਰੈਲ 1978 ਨੂੰ, ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਨਕਲੀ ਨਿਰੰਕਾਰੀ ਆਗੂ ਗੁਰਬਚਨ ਸਿੰਘ ਦੇ ਜਲੂਸ ਵਿਰੁੱਧ ਸ਼ਾਂਤਮਈ ਰੋਸ ਪ੍ਰਦਰਸ਼ਨ ਕਰਨ ਲਈ, ਭਾਈ ਸਾਹਿਬ ਲਗਭਗ 125 ਸਿੰਘਾਂ ਨਾਲ ਨੰਗੇ ਪੈਰੀਂ ਗਏ। ਨਕਲੀ ਨਿਰੰਕਾਰੀ ਫੌਜ ਨੇ ਨਿਹੱਥੇ ਸਿੰਘਾਂ ‘ਤੇ ਗੋਲੀਆਂ ਚਲਾ ਦਿੱਤੀਆਂ, ਜਿਸ ਵਿੱਚ ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਸਮੇਤ 13 ਸਿੰਘ ਸ਼ਹੀਦ ਹੋ ਗਏ।

ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਇੱਕ ਮਹਾਨ ਯੋਧੇ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਬੇਗਰਜ਼ੀ ਅਤੇ ਖੁਸ਼ੀ ਨਾਲ ਆਪਣਾ ਜੀਵਨ ਜ਼ੁਲਮ ਵਿਰੁੱਧ ਲੜਨ ਅਤੇ ਸੱਚ ਦੀ ਰਾਖੀ ਲਈ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤਾ। ਉਹਨਾਂ ਦੀ ਸ਼ਹੀਦੀ ਨੇ ਸੁੱਤੇ ਪਏ ਪੰਥ ਨੂੰ ਜਗਾਇਆ ਅਤੇ ਆਉਣ ਵਾਲੇ ਸੰਘਰਸ਼ਾਂ ਲਈ ਰਾਹ ਤਿਆਰ ਕੀਤਾ।`,
    artist: "ਜਸਪ੍ਰੀਤ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "53-martyrdom-sant-jarnail-singh-ji.jpg": {
    titlePa: "ਸੰਤਾਂ ਦੀ ਸ਼ਹਾਦਤ",
    descriptionPa: `ਸ਼ਹਾਦਤ ਗੁਰੂ ਸਾਹਿਬ ਵਲੋਂ ਦਿੱਤੀਆਂ ਬਖਸ਼ਿਸ਼ਾਂ ਵਿਚੋਂ ਇਕ ਵੱਡੀ ਬਖਸ਼ਿਸ਼ ਹੈ। ਇਹ ਸਿਲਸਿਲਾ ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸਾਹਿਬ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਆਪ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਸ਼ੁਰੂ ਕੀਤਾ। ਸਹਾਦਤ ਲਈ ਮਿਲਣ ਵਾਲੀ ਸਬਰ ਤੇ ਸਿਦਕ ਦੀ ਤਾਕਤ ਦਾ ਸੋਮਾ ਇਕ ਹੀ ਹੈ ਭਾਵੇਂ ਸ਼ਹਾਦਤ ਸ਼ਾਂਤਮਈ ਹੋਵੇ ਤੇ ਭਾਵੇਂ ਮੈਦਾਨ-ਏ-ਜੰਗ ‘ਚ ਜੂਝਦਿਆਂ ਹੋਵੇ।

ਸ਼ਹੀਦ ਆਪਣਾ ਆਪਾ ਕੁਰਬਾਨ ਕਰ ਜ਼ਾਲਮ ਹਕੂਮਤਾਂ ਦੇ ਜ਼ੁਲਮ ਨੂੰ ਠੱਲ ਕੇ ਨਿਆਂ ਦੀ ਬਹਾਲੀ ਕਰਦਾ ਹੈ ਤੇ ਕੁਦਰਤੀ ਜੀਵਨ ਜਿਓਣ ਵਾਲਾ ਮਾਹੌਲ ਸਿਰਜਦੀਆਂ ਹਨ। ਸ਼ਹਾਦਤਾਂ ਦੀ ਇਸ ਲੜੀ ਨੂੰ ਅੱਗੇ ਤੋਰਦਿਆਂ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਤੇ ਹੋਰ ਸਿੰਘ ਸਿੰਘਣੀਆਂ ਨੇ ਸ਼ਹਾਦਤਾਂ ਦੇ ਕੇ ਸਾਡੇ ਸਮੇਂ ਨੂੰ ਰੌਸ਼ਨ ਕੀਤਾ ਹੈ ਤੇ ਇਸ ਰੌਸ਼ਨੀ ਵਿਚ ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਟੇਕ ਲੈ ਕੇ ਨਿਆਂ ਲਈ ਲੜੀ ਜਾਣ ਵਾਲੀ ਇਹ ਜੰਗ ਅੱਜ ਵੀ ਜਾਰੀ ਹੈ।

Shahadat (martyrdom) is one of the greatest blessings bestowed by Guru Sahib. This tradition began with the shahadat of the Fifth Patshah (Sovereign), Sri Guru Arjan Dev jee. Regardless of whether shahadat is bestowed in times of peace or on the battlefield, the source of sabar (patience/perseverance) and sidak (steadfast faith) remains the same. By sacrificing their very being, a shaheed resists the transgressions of oppressive regimes by restoring justice and the natural order of life.

Furthering this tradition, Sant Jarnail Singh jee and countless other Singh Singhniyan attained shahadat and lit our path into the future. With this guidance and the support of the Guru, this battle for justice continues.`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Canvas Print",
  },

  "54-akal-takhat-sahib-model.jpg": {
    titlePa: "ਤੀਜਾ ਘੱਲੂਘਰਾ - ਜੂਨ 1984 (ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਮਾਡਲ)",
    descriptionPa: `ਜੂਨ 1984 ਵਿੱਚ ਭਾਰਤੀ ਫੌਜ ਦੁਆਰਾ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਅਤੇ ਸ਼੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ‘ਤੇ ਹਮਲਾ ਕੀਤਾ ਗਿਆ। ਸਰਕਾਰ ਵਲੋਂ ਇਸ ਘੱਲੂਘਾਰੇ ਨੂੰ ‘ਆਪ੍ਰੇਸ਼ਨ ਬਲੂ ਸਟਾਰ’ ਦਾ ਨਾਮ ਦਿੱਤਾ ਗਿਆ ਸੀ, ਪਰ ਇਸ ਹਮਲੇ ਨੂੰ ਘੱਲੂਘਾਰਾ ਜੂਨ 1984 ਵਜੋਂ ਯਾਦ ਕਰਦੇ ਹਨ। ਇਹ ਹਮਲਾ ਤਤਕਾਲੀਨ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਇੰਦਰਾ ਗਾਂਧੀ ਦੇ ਹੁਕਮਾਂ ‘ਤੇ ਹੋਇਆ, ਜਦੋਂ ਕਿ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਖ਼ਾਲਸਾ ਭਿੰਡਰਾਂਵਾਲੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਵਿਖੇ ਮੌਜੂਦ ਸਨ।

ਹਮਲੇ ਤੋਂ ਪਹਿਲਾਂ, ਜਨਰਲ ਰਣਜੀਤ ਦਿਆਲ, ਕ੍ਰਿਸ਼ਨਸਵਾਮੀ ਸੁੰਦਰਜੀ ਅਤੇ ਕੁਲਦੀਪ ਬਰਾੜ ਨੇ ਦੋ-ਪੱਖੀ ਯੋਜਨਾ ਬਣਾਈ। 1 ਜੂਨ 1984 ਤੋਂ ਹੀ ਗੋਲੀਬਾਰੀ ਸ਼ੁਰੂ ਹੋ ਗਈ। ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਦੀਆਂ ਬਾਹਰੀ ਰੱਖਿਆ ਪੋਸਟਾਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਬਾਬਾ ਅਟੱਲ ਰਾਏ ਦਾ ਗੁਰਦੁਆਰਾ ਅਤੇ ਰਾਮਗੜ੍ਹੀਆ ਬੁਰਜ ਵਰਗੇ ਉੱਚੇ ਟਾਵਰ ਸ਼ਾਮਲ ਸਨ, ਨੂੰ ਤੋਪਖਾਨੇ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਨਸ਼ਟ ਕਰ ਦਿੱਤਾ ਗਿਆ।

5 ਜੂਨ ਦੀ ਰਾਤ ਨੂੰ ਕਮਾਂਡੋਜ਼ ਨੂੰ ਪਰਿਕਰਮਾ ਵੱਲ ਜਾਣ ਦਾ ਹੁਕਮ ਦਿੱਤਾ ਗਿਆ। ਪਰ ਪਰਿਕਰਮਾ ਦੀਆਂ ਪੌੜੀਆਂ ‘ਤੇ ਤਾਇਨਾਤ ਸਿੰਘਾਂ ਨੇ LMG ਦੀ ਅੱਗ ਨਾਲ ਮਿੰਟਾਂ ਵਿੱਚ ਲਗਭਗ 40 ਕਮਾਂਡੋਜ਼ ਨੂੰ ਢੇਰ ਕਰ ਦਿੱਤਾ। ਹਮਲਾਵਰਾਂ ਨੂੰ ਭਾਰੀ ਨੁਕਸਾਨ ਝੱਲਣਾ ਪਿਆ। ਸਿੰਘਾਂ ਨੇ ਗੋਡਿਆਂ ਦੇ ਪੱਧਰ ‘ਤੇ ਗੋਲੀਬਾਰੀ ਕਰਨਾ ਸਿੱਖਿਆ ਸੀ ਤਾਂ ਜੋ ਹਮਲਾਵਰ ਰੀਂਗਣ ਲਈ ਮਜਬੂਰ ਹੋਣ।

ਜਦੋਂ ਫੌਜ ਨੂੰ ਪਰਿਕਰਮਾ ‘ਤੇ 20 ਪ੍ਰਤੀਸ਼ਤ ਦੇ ਕਰੀਬ ਨੁਕਸਾਨ ਹੋਇਆ ਅਤੇ ਉਹ ਅੱਗੇ ਨਾ ਵਧ ਸਕੀ, ਤਾਂ ਜਨਰਲ ਕੁਲਦੀਪ ਬਰਾੜ ਨੇ ਟੈਂਕਾਂ ਦੀ ਮੰਗ ਕੀਤੀ। ਅੰਤ ਵਿੱਚ ਟੈਂਕਾਂ ਨੂੰ ਪਰਿਕਰਮਾ ਵਿੱਚ ਲਿਆਂਦਾ ਗਿਆ, ਜਿਸ ਨਾਲ ਸੰਗਮਰਮਰ ਨੂੰ ਕੁਚਲਿਆ ਗਿਆ। ਜਨਰਲ ਬਰਾੜ ਦੇ ਹੁਕਮਾਂ ‘ਤੇ, ਟੈਂਕਾਂ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ‘ਤੇ ਗੋਲਾਬਾਰੀ ਕੀਤੀ ਗਈ ਅਤੇ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਨੂੰ ਬੁਰੀ ਤਰਾਂ ਨਾਲ ਢਾਹ ਦਿੱਤਾ ਗਿਆ।

ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਢਹਿਣ ਤੋਂ ਬਾਅਦ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਆਪਣੇ 30-40 ਸਿੰਘਾਂ ਨਾਲ ਬਾਹਰ ਆਏ ਅਤੇ ਲੜਦੇ ਹੋਏ ਮੀਰੀ-ਪੀਰੀ ਨਿਸ਼ਾਨ ਸਾਹਿਬ ਨੇੜੇ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।`,
    artist: "ਜਗਵਿੰਦਰ ਸਿੰਘ",
    medium: "Model",
  },

  "55-sant-jarnail-singh-ji.jpg": {
    titlePa: "ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦਮਦਮੀ ਟਕਸਾਲ ਦੇ 14ਵੇਂ ਮੁਖੀ ਸਨ। ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਦਾ ਜਨਮ 2 ਜੂਨ 1947 ਨੂੰ ਬਾਬਾ ਜੋਗਿੰਦਰ ਸਿੰਘ ਦੇ ਘਰ ਮਾਤਾ ਨਿਹਾਲ ਕੌਰ ਦੀ ਕੁੱਖੋਂ ਫ਼ਰੀਦਕੋਟ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਰੋਡੇ ਵਿਖੇ ਹੋਇਆ ਸੀ। ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਸਕੂਲੀ ਵਿਦਿਆ ਪੰਜਵੀਂ ਜਮਾਤ ਤੱਕ ਪੜੇ ਸਨ।

1964 ਵਿੱਚ ਸੰਤ ਜੀ ਮਹਿਤਾ ਚੌਕ ਵਿਖੇ ਦਮਦਮੀ ਟਕਸਾਲ (ਜਿਸ ਦੇ ਪਹਿਲੇ ਜਥੇਦਾਰ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸਨ) ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ ਅਤੇ ਧਾਰਮਿਕ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕੀਤੀ।

ਸੰਨ 1977 ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਦੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੀ ਦਮਦਮੀ ਟਕਸਾਲ ਦੇ 14ਵੇਂ ਮੁਖੀ ਵਜੋਂ ਦਸਤਾਰ ਬੰਦੀ ਹੋਈ।

ਉਪਰੰਤ ਉਹ ਪਿੰਡ-ਪਿੰਡ ਜਾ ਕੇ ਸਿੱਖੀ ਦੇ ਮੂਲ ਸਿਧਾਂਤਾਂ ਦਾ ਪ੍ਰਚਾਰ ਕਰਦੇ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤ ਛਕਣ, ਨਸ਼ੇ ਤਿਆਗਣ ਅਤੇ ਸਿੱਖ ਰਹਿਤ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕਰਦੇ।

13 ਅਪ੍ਰੈਲ 1978 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਨਿਰੰਕਾਰੀਆਂ ਨਾਲ ਹੋਏ ਟਕਰਾਅ ਵਿੱਚ 13 ਅੰਮ੍ਰਿਤਧਾਰੀ ਸਿੱਖ ਸ਼ਹੀਦ ਹੋ ਗਏ। ਇਸ ਤੋਂ ਬਾਅਦ, ਉਹ ਨਿਰੰਕਾਰੀ ਮੁਖੀ ਗੁਰਬਚਨ ਸਿੰਘ ਅਤੇ ਲਾਲਾ ਜਗਤ ਨਾਰਾਇਣ ਦੇ ਕਤਲਾਂ ਵਿੱਚ ਸ਼ੱਕੀ ਵਜੋਂ ਸ਼ਾਮਲ ਰਹੇ, ਹਾਲਾਂਕਿ ਸਬੂਤਾਂ ਦੀ ਘਾਟ ਕਾਰਨ ਰਿਹਾਅ ਹੋ ਗਏ।

ਸੰਤ ਭਿੰਡਰਾਂਵਾਲੇ ਨੇ ਸਿੱਖਾਂ ਦੀ ਖੇਤਰੀ ਖੁਦਮੁਖਤਿਆਰੀ (ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਮਤਾ) ਲਈ ਅਕਾਲੀ ਦਲ ਨਾਲ ਮਿਲ ਕੇ ‘ਧਰਮ ਯੁੱਧ ਮੋਰਚਾ’ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਇਸ ਦੌਰਾਨ 1983-84 ਤੱਕ ਉਹ ਸਿੱਖਾਂ ਵਿੱਚ ਇੰਨੇ ਪ੍ਰਸਿੱਧ ਹੋ ਚੁੱਕੇ ਸਨ ਕਿ ਲੋਕ ਨਿਆਂ ਲਈ ਉਨ੍ਹਾਂ ਕੋਲ ਆਉਂਦੇ ਸਨ, ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਸਿਆਸੀ ਤਾਕਤ ਬਹੁਤ ਵੱਧ ਗਈ ਸੀ।

ਜੂਨ 1984 ਵਿੱਚ ਭਾਰਤੀ ਫੌਜ ਦੁਆਰਾ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਤੇ ਕੀਤੇ ਹਮਲੇ ਦੇ ਜਵਾਬ ਵਿਚ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਨੇ ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਅਤੇ ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਸਮੇਤ ਹੋਰ ਸਿੱਖ ਯੋਧਿਆਂ ਨਾਲ ਮਿਲ ਕੇ ਮੁਕਾਬਲਾ ਕੀਤਾ। ਦਿੱਲੀ ਤਖ਼ਤ ਦੇ ਹੁਕਮ ਹੇਠ ਲੜ ਰਹੀ ਇੰਡੀਅਨ ਫੌਜ ਅਤੇ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਅਤੇ ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਦੀ ਅਗਵਾਈ ਵਿਚ ਲੜ ਰਹੇ ਮੁਠੀ ਭਰ ਸਿੰਘਾਂ ਵਲੋਂ ਲੜੀ ਜਾ ਰਹੀ ਇਹ ਜੰਗ ਲਾਮਿਸਾਲ ਸੀ।

ਅਖੀਰ 6 ਜੂਨ 1984 ਨੂੰ ਸੰਤ ਜੀ ਅਤੇ ਸਮੂਹ ਸਿੰਘ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੀ ਅਜਮਤ ਦੀ ਰਾਖੀ ਕਰਦੇ ਹੋਏ ਅਤੇ ਭਾਰਤੀ ਫੌਜ ਦਾ ਡਟ ਕੇ ਮੁਕਾਬਲਾ ਕਰਦੇ ਹੋਏ ਸ਼ਹੀਦ ਹੋ ਗਏ।`,
    artist: "ਗੁਰਰਾਜ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "56-bhai-amrik-singh-ji.jpg": {
    titlePa: "ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ 1977 ਤੋਂ 1984 ਤੱਕ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੇ ਪ੍ਰਧਾਨ ਰਹੇ। ਉਹ 6 ਜੂਨ 1984 ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਭਾਰਤੀ ਫੌਜ ਨਾਲ ਜੂਝਦਿਆਂ ਸ਼ਹੀਦ ਹੋ ਗਏ ਸਨ।

ਉਨ੍ਹਾਂ ਨੇ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦੀ ਮਦਦ ਨਾਲ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਨੂੰ ਨਵਾਂ ਜੀਵਨ ਦਿੱਤਾ।

ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਸੰਤ ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਖ਼ਾਲਸਾ ਭਿੰਡਰਾਂਵਾਲੇ, ਜੋ ਕਿ ਭਿੰਡਰਾਂਵਾਲਾ ਮਹਿਤਾ ਚੌਂਕ ਸੰਪਰਦਾ ਜਥੇ ਦੇ ਮੁਖੀ ਸਨ, ਦੇ ਸਪੁੱਤਰ ਸਨ।

ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ ਪੰਜਾਬੀ ਵਿੱਚ ਐੱਮ.ਏ. ਕੀਤੀ ਸੀ। ਇਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀ ਪੀਐਚ.ਡੀ. ਦੀ ਖੋਜ ਦਾ ਕੰਮ ਸ਼ੁਰੂ ਕੀਤਾ। ਉਹ ਗੁਰਬਾਣੀ ਅਤੇ ਸਿੱਖ ਸਾਹਿਤ ਵਿੱਚ ਚੰਗੀ ਤਰ੍ਹਾਂ ਨਿਪੁੰਨ ਸਨ।

ਉਨ੍ਹਾਂ ਨੇ ਆਪਣਾ ਸਾਰਾ ਜੀਵਨ ਸਿੱਖ ਮਿਸ਼ਨਰੀ ਗਤੀਵਿਧੀਆਂ ਲਈ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤਾ। ਭਾਈ ਸਾਹਿਬ ਜੀ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੇ ਨਜ਼ਦੀਕੀ ਸਾਥੀ ਸਨ। ਉਹ 2 ਜੁਲਾਈ, 1978 ਨੂੰ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੇ ਪ੍ਰਧਾਨ ਚੁਣੇ ਗਏ ਸਨ।

1979 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਬਿਆਸ ਹਲਕੇ ਤੋਂ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਦੀ ਚੋਣ ਲੜੀ। ਪੰਜਾਬ ਸਰਕਾਰ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਹਰਾਉਣ ਲਈ ਹਰ ਨਾਜਾਇਜ਼ ਤਰੀਕਾ ਵਰਤਿਆ। 1982 ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੂੰ ਝੂਠੇ ਦੋਸ਼ਾਂ ਤਹਿਤ ਗ੍ਰਿਫ਼ਤਾਰ ਕੀਤਾ ਗਿਆ ਪਰ 1984 ਵਿੱਚ ਰਿਹਾਅ ਕਰ ਦਿੱਤਾ ਗਿਆ।

4 ਜੂਨ 1984 ਨੂੰ, ਜਦੋਂ ਭਾਰਤੀ ਫੌਜ ਨੇ ਦਰਬਾਰ ਸਾਹਿਬ ਉੱਤੇ ਹਮਲਾ ਕੀਤਾ, ਤਾਂ ਉਹ ਬਹਾਦਰੀ ਨਾਲ ਲੜੇ ਅਤੇ 6 ਜੂਨ 1984 ਨੂੰ ਬਹਾਦਰੀ ਨਾਲ ਲੜਦਿਆਂ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "57-general-subegh-singh-ji.jpg": {
    titlePa: "ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਇੰਡੀਆ ਦੇ ਮਹਾਨ ਜਰਨੈਲਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ, ਜੋ ਪਿੰਡ ਖਿਆਲਾ (ਅੰਮ੍ਰਿਤਸਰ ਨੇੜੇ) ਨਾਲ ਸੰਬੰਧ ਰੱਖਦੇ ਸਨ। ਉਹ ਸਿੱਖ ਯੋਧੇ ਭਾਈ ਮਹਿਤਾਬ ਸਿੰਘ ਦੇ ਵੰਸ਼ ਵਿੱਚੋਂ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ 1740 ਵਿੱਚ ਮੱਸਾ ਰੰਘੜ ਨੂੰ ਸੋਧ ਕੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਦਾ ਬਦਲਾ ਲਿਆ ਸੀ।

ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਅਤੇ ਲਾਹੌਰ ਦੇ ਸਰਕਾਰੀ ਕਾਲਜ ਤੋਂ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕੀਤੀ। 18 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੇ ਫ਼ੌਜ ਵਿੱਚ ਜਾਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ। 1940 ਵਿੱਚ ਉਹ ਦੂਜੀ ਪੰਜਾਬ ਰੈਜੀਮੈਂਟ ਵਿੱਚ ਸੈਕਿੰਡ ਲੈਫਟੀਨੈਂਟ ਵਜੋਂ ਕਮਿਸ਼ਨ ਹੋਏ।

ਉਨ੍ਹਾਂ ਨੇ ਦੂਜੇ ਵਿਸ਼ਵ ਯੁੱਧ (ਬਰਮਾ ਵਿੱਚ ਜਾਪਾਨੀਆਂ ਵਿਰੁੱਧ), 1947 ਦੀ ਭਾਰਤ-ਪਾਕ ਜੰਗ (ਜੰਮੂ-ਕਸ਼ਮੀਰ), 1962 ਦੀ ਭਾਰਤ-ਚੀਨ ਜੰਗ ਅਤੇ 1965 ਦੀ ਭਾਰਤ-ਪਾਕ ਜੰਗ (ਹਾਜੀ ਪੀਰ ਸੈਕਟਰ) ਸਮੇਤ ਇੰਡੀਆ ਦੀ ਹਰ ਜੰਗ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ।

ਬ੍ਰਿਗੇਡੀਅਰ ਵਜੋਂ ਉਹ 1971 ਵਿੱਚ ਮੁਕਤੀ ਬਾਹਿਨੀ ਨੂੰ ਸਿਖਲਾਈ ਦੇਣ, ਸੰਗਠਿਤ ਕਰਨ ਅਤੇ ਨਿਰਦੇਸ਼ਿਤ ਕਰਨ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ ‘ਤੇ ਚੁਣੇ ਗਏ ਸਨ। ਪੂਰਬੀ ਪਾਕਿਸਤਾਨ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੀਆਂ ਗੁਪਤ ਕਾਰਵਾਈਆਂ ਨੇ ਪਾਕਿਸਤਾਨੀ ਫ਼ੌਜ ਨੂੰ ਅੰਦਰੋਂ ਕਮਜ਼ੋਰ ਕਰ ਦਿੱਤਾ, ਜਿਸ ਕਾਰਨ ਭਾਰਤੀ ਫ਼ੌਜ ਲਈ ਢਾਕਾ ਤੱਕ ਪਹੁੰਚਣਾ ਆਸਾਨ ਹੋ ਗਿਆ।

ਭਾਰਤ ਸਰਕਾਰ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਮੇਜਰ ਜਨਰਲ ਵਜੋਂ ਤਰੱਕੀ ਦਿੱਤੀ ਅਤੇ ਪਰਮ ਵਿਸ਼ਿਸ਼ਟ ਸੇਵਾ ਮੈਡਲ (PVSM) ਨਾਲ ਸਨਮਾਨਿਤ ਕੀਤਾ।

ਮੇਜਰ ਜਨਰਲ ਬਣਨ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੂੰ ਕਾਂਗਰਸ ਸਰਕਾਰ ਦੁਆਰਾ ਜੈ ਪ੍ਰਕਾਸ਼ ਨਾਰਾਇਣ ਦੇ ਅੰਦੋਲਨ ਨੂੰ ਦਬਾਉਣ ਲਈ ਫ਼ੌਜ ਦੀ ਵਰਤੋਂ ਕਰਨ ਦੇ ਹੁਕਮ ਨੂੰ ਮੰਨਣ ਤੋਂ ਇਨਕਾਰ ਕਰਨ ਕਾਰਨ ਸੀ.ਬੀ.ਆਈ. ਜਾਂਚ ਰਾਹੀਂ ਤੰਗ ਕੀਤਾ ਗਿਆ।

30 ਅਪ੍ਰੈਲ 1976 ਨੂੰ, ਉਨ੍ਹਾਂ ਦੀ ਸੇਵਾਮੁਕਤੀ ਤੋਂ ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ, ਉਨ੍ਹਾਂ ਨੂੰ ਝੂਠੇ ਅਤੇ ਤੁੱਛ ਦੋਸ਼ਾਂ ਤਹਿਤ ਫ਼ੌਜ ਤੋਂ ਬਰਖਾਸਤ ਕਰ ਦਿੱਤਾ ਗਿਆ। ਇਹ ਇੱਕ ਸਨਮਾਨਿਤ ਅਤੇ ਮਿਹਨਤੀ ਜਰਨੈਲ ਨਾਲ ਕੀਤਾ ਗਿਆ ਅਨਿਆਂ ਸੀ।

1983 ਵਿੱਚ, ਜਨਰਲ ਸਾਹਿਬ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦੀ ਨਿਡਰਤਾ, ਸਪੱਸ਼ਟਤਾ ਅਤੇ ਖ਼ਾਲਸਾ ਪੰਥ ਪ੍ਰਤੀ ਸਮਰਪਣ ਤੋਂ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਹੋਏ। ਉਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ, ਉਨ੍ਹਾਂ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਨੂੰ ਸਰਕਾਰੀ ਹਮਲੇ ਤੋਂ ਬਚਾਉਣ ਲਈ ਰੱਖਿਆ ਪ੍ਰਣਾਲੀ ਸਥਾਪਤ ਕਰਨ ਦੀ ਯੋਜਨਾ ਬਣਾਈ।

ਤੀਜਾ ਘੱਲੂਘਾਰਾ ਜੂਨ 1984 ਦੌਰਾਨ, ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਅਤੇ ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਦੇ ਨਾਲ, ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਲੜਦੇ ਹੋਏ ਸ਼ਹੀਦ ਹੋ ਗਏ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "58-baba-thahra-singh-ji.jpg": {
    titlePa: "ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ",
    descriptionPa: `ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਦਾ ਜਨਮ 1924 ਵਿੱਚ ਔਰੰਗਾਬਾਦ, ਮਹਾਰਾਸ਼ਟਰ ਵਿਖੇ ਹੋਇਆ ਸੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦਾ ਪਹਿਲਾ ਨਾਮ ਧਿਆਨ ਸਿੰਘ ਸੀ। ਔਰੰਗਾਬਾਦ ਵਿੱਚ ਬਾਬਾ ਗੁਰਬਚਨ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਦੀ ਕਥਾ ਸੁਣ ਕੇ ਉਹ ਪ੍ਰਭਾਵਿਤ ਹੋਏ ਅਤੇ ਅੰਮ੍ਰਿਤ ਛਕ ਕੇ ਸਿੰਘ ਸਜ ਗਏ, ਜਿਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦਾ ਨਾਂ ਅਵਤਾਰ ਸਿੰਘ ਰੱਖਿਆ ਗਿਆ।

ਉਹ ਛੇਤੀ ਹੀ ਦਮਦਮੀ ਟਕਸਾਲ ਨਾਲ ਜੁੜ ਗਏ ਅਤੇ ਸੰਤ ਬਾਬਾ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਦੇ ਕਰੀਬੀ ਬਣ ਗਏ। ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ, ਮੁੰਬਈ ਨੇੜੇ ਰਹਿੰਦੇ ਇੱਕ ਹੋਰ ਮਹਾਪੁਰਖ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਦੇ ਜੀਵਨ ਤੋਂ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਸਨ, ਅਤੇ ਅਵਤਾਰ ਸਿੰਘ ਜੀ ਨੂੰ ਅਕਸਰ ‘ਠਾਹਰਾ ਸਿੰਘ’ ਕਹਿ ਕੇ ਬੁਲਾਉਂਦੇ ਸਨ। ਇਸ ਤਰ੍ਹਾਂ ਉਹ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਵਜੋਂ ਜਾਣੇ ਜਾਣ ਲੱਗੇ।

1977 ਵਿੱਚ ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਦੇ ਸੁਰਗਵਾਸ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਨੇ ਬਾਬਾ ਠਾਕੁਰ ਸਿੰਘ ਅਤੇ ਹੋਰ ਸੀਨੀਅਰ ਸਿੰਘਾਂ ਨਾਲ ਮਿਲ ਕੇ ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਦੇ ਆਦੇਸ਼ ਅਨੁਸਾਰ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਨੂੰ ਦਮਦਮੀ ਟਕਸਾਲ ਦਾ ਅਗਲਾ ਜਥੇਦਾਰ ਨਿਯੁਕਤ ਕੀਤਾ।

ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੇ ਪੰਜਾਬ ਅਤੇ ਭਾਰਤ ਵਿੱਚ ਪ੍ਰਚਾਰ ਦੌਰਾਨ, ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਨੂੰ ਚੌਂਕ ਮਹਿਤਾ ਸਥਿਤ ਗੁਰਦੁਆਰਾ ਗੁਰਦਰਸ਼ਨ ਪ੍ਰਕਾਸ਼ (ਟਕਸਾਲ ਹੈੱਡਕੁਆਰਟਰ) ਦੀ ਸੇਵਾ, ਸੰਥਿਆ ਅਤੇ ਪ੍ਰਬੰਧਕੀ ਜ਼ਿੰਮੇਵਾਰੀ ਸੌਂਪੀ ਗਈ। ਉਹ ਟਕਸਾਲ ਦੇ ਯੋਧੇ ਗਰੁੱਪ, ਜਿਸ ਵਿੱਚ ਬਾਬਾ ਗੁਰਬਚਨ ਸਿੰਘ ਮਨੋਚਾਹਲ ਅਤੇ ਭਾਈ ਗੁਰਦੇਵ ਸਿੰਘ ਉਸਮਾਨਵਾਲਾ ਵਰਗੇ ਸਿੰਘ ਸ਼ਾਮਲ ਸਨ, ਦੇ ਮਾਰਗਦਰਸ਼ਕ ਵੀ ਸਨ।

1982 ਵਿੱਚ, ਜਦੋਂ ਸੰਤ ਜੀ ਪ੍ਰਚਾਰ ਕਰ ਰਹੇ ਸਨ, ਤਾਂ ਉਨ੍ਹਾਂ ਨੇ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਨੂੰ ਟਕਸਾਲ ਦੇ ਕਾਰਜਾਂ ਦਾ ਇੰਚਾਰਜ ਨਿਯੁਕਤ ਕੀਤਾ। ਜਦੋਂ ਕੁਝ ਟਕਸਾਲੀ ਸਿੰਘਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕੀਤਾ ਗਿਆ, ਤਾਂ ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਉਨ੍ਹਾਂ ਦੀ ਪੈਰਵੀ ਲਈ ਅਦਾਲਤ ਪਹੁੰਚੇ, ਪਰ ਉਨ੍ਹਾਂ ਨੂੰ ਵੀ ਬਿਨਾਂ ਕਿਸੇ ਦੋਸ਼ ਦੇ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ।

ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ, ਸੰਤ ਜੀ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਲਈ ਤਿਆਰੀਆਂ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀਆਂ। ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਨੂੰ ਲੰਗਰ ਹਾਲ ਦੀ ਛੱਤ ਅਤੇ ਰਾਮਗੜ੍ਹੀਆ ਬੁੰਗੇ ਦੀਆਂ ਪੁਜ਼ੀਸ਼ਨਾਂ ਦੀ ਕਮਾਂਡ ਸੌਂਪੀ ਗਈ, ਜਿੱਥੇ ਲਗਭਗ 60-65 ਸਿੰਘ ਤਾਇਨਾਤ ਸਨ।

4 ਜੂਨ 1984 ਦੀ ਸਵੇਰ ਨੂੰ, ਜਦੋਂ ਭਾਰਤੀ ਫੌਜ ਨੇ ਲੰਗਰ ਹਾਲ ਵਾਲੇ ਪਾਸਿਓਂ ਹਮਲਾ ਕੀਤਾ, ਤਾਂ ਬਾਬਾ ਜੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਾਥੀਆਂ ਨੇ ਭਾਰੀ ਟਾਕਰਾ ਕੀਤਾ ਅਤੇ ਕਈ ਹਮਲਿਆਂ ਨੂੰ ਪਛਾੜ ਦਿੱਤਾ। 4-5 ਜੂਨ ਦੀ ਰਾਤ ਨੂੰ, ਜਦੋਂ ਹਮਲਾ ਤੇਜ਼ ਹੋ ਗਿਆ, ਤਾਂ ਉਹ ਜ਼ਖਮੀ ਹੋਣ ਦੇ ਬਾਵਜੂਦ ਦੁੱਖ ਭੰਜਨੀ ਬੇਰੀ ਨੇੜੇ ਪਰਿਕਰਮਾ ਵਿੱਚ ਆਪਣੀ ਪੁਜ਼ੀਸ਼ਨ ‘ਤੇ ਡਟੇ ਰਹੇ।

6 ਜੂਨ ਨੂੰ ਦੁਪਹਿਰ 12 ਵਜੇ ਤੱਕ, ਗੋਲੀ-ਸਿੱਕਾ ਖਤਮ ਹੋ ਜਾਣ ਅਤੇ ਕੋਈ ਮਦਦ ਨਾ ਮਿਲਣ ਕਾਰਨ, ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਅਤੇ 5-6 ਹੋਰ ਬਜ਼ੁਰਗ ਸਿੰਘਾਂ ਨੇ ਦੁੱਖ ਭੰਜਨੀ ਬੇਰੀ ਨੇੜੇ ਬੰਕਰ ਤੋਂ ਬਾਹਰ ਆ ਕੇ ਬਹਾਦਰੀ ਨਾਲ ਲੜਦੇ ਹੋਏ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "59-bibi-upkar-kaur-ji.jpg": {
    titlePa: "ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ",
    descriptionPa: `ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਦਾ ਜਨਮ ਮਾਤਾ ਬਖਸ਼ੀਸ਼ ਕੌਰ ਅਤੇ ਸਰਦਾਰ ਮੀਤਪਾਲ ਸਿੰਘ ਦੇ ਘਰ 1962 ਵਿਚ ਹਰਿਆਣਾ ਦੇ ਕਰਨਾਲ ਜਿਲ੍ਹੇ ਵਿਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਕਾਲਜ ਦੇ ਦਿਨਾਂ ਦੌਰਾਨ ਆਲ-ਇੰਡੀਆ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਵਿੱਚ ਸ਼ਮੂਲੀਅਤ ਕੀਤੀ ਅਤੇ ਪੰਜਾਬ ਵਿੱਚ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੇ ਮਹਿਲਾ ਵਿੰਗ ਦੀ ਆਗੂ ਨਿਯੁਕਤ ਕੀਤੇ ਗਏ।

ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਇੱਕ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਬੁਲਾਰੇ, ਲੇਖਕ ਅਤੇ ਪ੍ਰਬੰਧਕ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ 20 ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ ਪੰਜਾਬ ਭਰ ਵਿੱਚ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੀਆਂ ਕਈ ਮਹਿਲਾ ਇਕਾਈਆਂ ਸਥਾਪਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕੀਤੀ।

ਬੀਬੀ ਜੀ ਨੇ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦੇ ਉਦਾਹਰਣਾਂ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹੋਏ, ਲੋਕਾਂ ਨੂੰ ਸਰਕਾਰੀ ਜ਼ੁਲਮ ਦੀਆਂ ਅਸਲੀਅਤਾਂ ਤੋਂ ਜਗਾਉਣ ਲਈ ਧਰਮ ਯੁੱਧ ਮੋਰਚੇ ਦੌਰਾਨ ਇੱਕ ਸਰਗਰਮ ਭੂਮਿਕਾ ਨਿਭਾਈ। ਉਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਹਜ਼ਾਰਾਂ ਔਰਤਾਂ ਜਥੇਬੰਦੀ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਈਆਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਈਆਂ ਨੇ ਅੰਦੋਲਨ ਦੌਰਾਨ ਗ੍ਰਿਫ਼ਤਾਰੀ ਦਿੱਤੀ।

ਜਦੋਂ ਜੂਨ 1984 ਵਿੱਚ ਭਾਰਤੀ ਫੌਜ ਨੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ‘ਤੇ ਹਮਲਾ ਕੀਤਾ, ਤਾਂ ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਨੂੰ ਬਾਬਾ ਅਟੱਲ ਰਾਏ ਗੁਰਦੁਆਰੇ ਦੀਆਂ ਪਵਿੱਤਰ ਦੀਵਾਰਾਂ ਦੇ ਅੰਦਰ ਹਮਲੇ ਦਾ ਬਚਾਅ ਕਰਨ ਲਈ ਤਾਇਨਾਤ ਕੀਤਾ ਗਿਆ ਸੀ।

ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਨੇ ਆਪਣੇ ਆਖਰੀ ਸਾਹ ਤੱਕ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਕਰਦੇ ਹੋਏ ਸ਼ਹੀਦ ਹੋਣ ਦਾ ਪ੍ਰਣ ਲਿਆ ਸੀ। ਜਿਵੇਂ-ਜਿਵੇਂ ਲੜਾਈ ਵਧਦੀ ਗਈ, ਜ਼ੁਲਮ ਵਿਰੁੱਧ ਲੜਾਈ ਨੂੰ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ‘ਤੇ ਹਮਲੇ ਤੋਂ ਬਾਹਰ ਵੀ ਜਾਰੀ ਰੱਖਣ ਲਈ ਰਣਨੀਤਕ ਕਦਮ ਚੁੱਕੇ ਗਏ।

ਹਾਲਾਂਕਿ, ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਉਨ੍ਹਾਂ ਲੋਕਾਂ ਵਿੱਚੋਂ ਸਨ ਜੋ ਆਪਣੇ ਆਖਰੀ ਸਾਹ ਤੱਕ ਲੜਨ ਲਈ ਦ੍ਰਿੜ੍ਹ ਸਨ। ਅਖੀਰ ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਨੇ 5 ਅਤੇ 6 ਜੂਨ ਦੀ ਰਾਤ ਨੂੰ, ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਦਰਬਾਰ ਸਾਹਿਬ ਦੇ ਪਵਿੱਤਰ ਲੜਾਈ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਹਮਲਾਵਰਾਂ ਨਾਲ ਲੜਦੇ ਹੋਏ, ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "60-bhai-mehnga-singh-babbar.jpg": {
    titlePa: "ਭਾਈ ਮਹਿੰਗਾ ਸਿੰਘ ਬਬਰ",
    descriptionPa: `ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਬਬਰ ਉਰਫ਼ ਭਾਈ ਮਹਿੰਗਾ ਸਿੰਘ ਦਾ ਜਨਮ 1957 ਵਿੱਚ ਯਮੁਨਾਨਗਰ (ਜਗਾਧਰੀ) ਦੇ ਵਿਸ਼ਵਕਰਮਾ ਨਗਰ ਵਿਖੇ ਸਰਦਾਰ ਪ੍ਰਤਾਪ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਵਿਸਾਖੀ 1978 ਨੂੰ ਨਕਲੀ ਨਿਰੰਕਾਰੀਆਂ ਦੁਆਰਾ ਨਿਹੱਥੇ ਸਿੰਘਾਂ ‘ਤੇ ਗੋਲੀਆਂ ਚਲਾਏ ਜਾਣ ਅਤੇ 13 ਸ਼ਹੀਦਾਂ ਦੇ ਖੂਨ ਨੇ ਭਾਈ ਸਾਹਿਬ ਦੇ ਦਿਲ ‘ਤੇ ਡੂੰਘਾ ਅਸਰ ਕੀਤਾ।

ਇਸ ਤੋਂ ਬਾਅਦ ਉਹ ਰਾਤ-ਦਿਨ ਅੰਮ੍ਰਿਤ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਕਰਨ ਦੀ ਤਾਂਘ ਰੱਖਦੇ। ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਉਨ੍ਹਾਂ ਨੇ 1979 ਦੇ ਅਖੰਡ ਕੀਰਤਨੀ ਜਥੇ ਦੇ ਹੋਲਾ ਮਹੱਲਾ ਸਮਾਗਮ ਦੌਰਾਨ ਅੰਮ੍ਰਿਤ ਛਕਿਆ।

ਸੰਨ 1979 ਵਿੱਚ ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਨੇ ਘਰ ਛੱਡ ਦਿੱਤਾ ਅਤੇ ਸ਼ਹੀਦ ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਦੀ ਪਤਨੀ ਬੀਬੀ ਅਮਰਜੀਤ ਕੌਰ ਕੋਲ ਅੰਮ੍ਰਿਤਸਰ ਆ ਗਏ।

ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖੀ ਦੀ ਸੇਵਾ ਅਤੇ ਜ਼ਾਲਮਾਂ ਨੂੰ ਸਜ਼ਾ ਦੇਣ ਦੀ ਇੱਛਾ ਨਾਲ ਹਥਿਆਰਾਂ ਦੀ ਸਿਖਲਾਈ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਇਸ ਦੌਰਾਨ ਉਹ ਭਾਈ ਸੁਖਦੇਵ ਸਿੰਘ, ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਨਾਗੋਕੇ ਅਤੇ ਹੋਰ ਸਿੰਘਾਂ ਨੂੰ ਮਿਲੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨੇ ਮਿਲ ਕੇ ਬਬਰ ਖਾਲਸਾ ਜਥੇਬੰਦੀ ਦੀ ਨੀਂਹ ਰੱਖੀ।

ਭਾਈ ਸਾਹਿਬ ਸਰਕਾਰੀ ਅਦਾਲਤਾਂ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਨਹੀਂ ਰੱਖਦੇ ਸਨ ਇਸੇ ਕਰਕੇ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਖਿਲਾਫ ਦਰਜ ਮਾਮਲਿਆਂ ਦੀ ਪੈਰਵੀ ਕਰਨ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ।

ਰੂਪੋਸ਼ ਰਹਿਣ ਦੇ ਬਾਵਜੂਦ ਉਹ ਨਿੱਤ ਅੰਮ੍ਰਿਤ ਵੇਲੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਸਰੋਵਰ ਵਿੱਚ ਇਸ਼ਨਾਨ ਕਰਨ ਅਤੇ ਆਸਾ ਦੀ ਵਾਰ ਦਾ ਕੀਰਤਨ ਸੁਣਨ ਲਈ ਜਾਂਦੇ ਸਨ।

1 ਜੂਨ 1984 ਨੂੰ ਜਦੋਂ ਸੀ.ਆਰ.ਪੀ.ਐੱਫ. ਅਤੇ ਬੀ.ਐੱਸ.ਐੱਫ. ਨੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਸਮੂਹ ‘ਤੇ ਗੋਲੀਆਂ ਦੀ ਵਰਖਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ, ਤਾਂ ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਬਬਰ ਨੂੰ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ‘ਤੇ ਹੋਏ ਹਮਲੇ ਵਿੱਚ ਸ਼ਹੀਦ ਹੋਣ ਵਾਲੇ ਪਹਿਲੇ ਸਿੰਘ ਹੋਣ ਦਾ ਮਾਣ ਪ੍ਰਾਪਤ ਹੋਇਆ।

ਭਾਈ ਸਾਹਿਬ ਬਾਬਾ ਅਟੱਲ ਸਾਹਿਬ ਵਿਖੇ ਮੋਰਚਾ ਸੰਭਾਲ ਰਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸ਼ੁਰੂ ਵਿੱਚ ਤਿੰਨ ਹਮਲਾਵਰ ਸਿਪਾਹੀਆਂ ਨੂੰ ਮਾਰ ਮੁਕਾਇਆ ਅਤੇ ਫਿਰ ਬਾਬਾ ਅਟੱਲ ਦੀ ਉੱਪਰਲੀ ਮੰਜ਼ਿਲ ‘ਤੇ ਚਲੇ ਗਏ। ਉੱਥੇ ਇੱਕ ਸਨਾਈਪਰ ਦੀ ਗੋਲੀ ਉਨ੍ਹਾਂ ਦੀ ਮੱਥੇ ਵਿੱਚ ਲੱਗੀ ਅਤੇ ਇਸ ਤਰਾਂ ਉਹ ਸ਼ਹੀਦ ਹੋ ਗਏ।`,
    artist: "ਸੁਯਸ਼",
    medium: "Oil Painting",
  },

  "61-november-1984.jpg": {
    titlePa: "ਨਵੰਬਰ ੧੯੮੪",
    descriptionPa: `ਨਵੰਬਰ ੧੯੮੪ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਦੁਖਦਾਈ ਘਟਨਾ ਸੀ। ਇਸ ਮਹੀਨੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦੇ ਵਿਰੁੱਧ ਹਿੰਸਾ ਕੀਤੀ ਗਈ ਸੀ।

ਇਹ ਘਟਨਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਦੁਖਦਾਈ ਅਧਿਆਇ ਹੈ ਅਤੇ ਇਸ ਨੇ ਸਿੱਖ ਕੌਮ ਨੂੰ ਗਹਿਰਾ ਸਦਮਾ ਪਹੁੰਚਾਇਆ ਸੀ।`,
    artist: "ਜਸਪ੍ਰੀਤ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "62-old-home-model.jpg": {
    titlePa: "ਪੰਜਾਬ ਦਾ ਪੁਰਾਣਾ ਘਰ",
    descriptionPa: `ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਅਤੇ ਮੁੱਲਾਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਜਗਦੀਪ ਸਿੰਘ",
    medium: "Miniature Model",
  },
  "62-old-home-model-2.jpg": {
    titlePa: "ਪੰਜਾਬ ਦਾ ਪੁਰਾਣਾ ਘਰ",
    descriptionPa: `ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਅਤੇ ਮੁੱਲਾਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਜਗਦੀਪ ਸਿੰਘ",
    medium: "Miniature Model",
  },
  "62-old-home-model-3.jpg": {
    titlePa: "ਪੰਜਾਬ ਦਾ ਪੁਰਾਣਾ ਘਰ",
    descriptionPa: `ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਅਤੇ ਮੁੱਲਾਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਜਗਦੀਪ ਸਿੰਘ",
    medium: "Miniature Model",
  },
  "62-old-home-model-4.jpg": {
    titlePa: "ਪੰਜਾਬ ਦਾ ਪੁਰਾਣਾ ਘਰ",
    descriptionPa: `ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਅਤੇ ਮੁੱਲਾਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਜਗਦੀਪ ਸਿੰਘ",
    medium: "Miniature Model",
  },

  "63-stapoo.jpg": {
    titlePa: "ਸਟੈਪੂ - ਪੰਜਾਬ ਦੀਆਂ ਲੋਕ ਖੇਡਾਂ",
    descriptionPa: `ਸਟੈਪੂ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਸਟੈਪੂ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਸੁਖਪ੍ਰੀਤ ਸਿੰਘ ਆਰਟਿਸਟ",
    medium: "Oil Painting",
  },

  "64-mothers-creation.jpg": {
    titlePa: "ਮਾਂ ਦੀ ਕਲਾ",
    descriptionPa: `ਮਾਂ ਦੀ ਕਲਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਮਾਵਾਂ ਦੀ ਕਲਾਤਮਕਤਾ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਮਾਂ ਦੀ ਕਲਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਜਸਪ੍ਰੀਤ ਸਿੰਘ",
    medium: "Oil Painting",
  },

  "65-dadi-pota.jpg": {
    titlePa: "ਦਾਦੀ ਪੋਤਾ",
    descriptionPa: `ਦਾਦੀ ਪੋਤਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਦਾਦੀ ਪੋਤਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।`,
    artist: "ਪਰਮ ਸਿੰਘ",
    medium: "Canvas Print",
  },

  "67-kirtan-sculpture.jpg": {
    titlePa: "ਕੀਰਤਨ",
    description: `The Kirtan section explores the devotional music tradition of Sikhism. Kirtan is a form of musical worship that involves singing hymns from the Guru Granth Sahib.

Kirtan plays a central role in Sikh worship and community gatherings. This section provides information about the history, significance, and practice of Kirtan in Sikh tradition.`,
    artist: "ਜਗਵਿੰਦਰ ਸਿੰਘ",
    medium: "Sculpture",
  },
};

function titleFromFilename(filename: string) {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutPrefix = withoutExt.replace(/^\d+-/, "");
  const words = withoutPrefix.replace(/-/g, " ").trim().split(/\s+/);

  const smallWords = new Set(["of", "in", "over", "the", "and", "to"]);

  return words
    .map((raw, idx) => {
      const lower = raw.toLowerCase();
      if (lower === "ji") return "Ji";
      if (lower === "sahib") return "Sahib";
      if (/\d/.test(raw)) return raw; // keep numeric tokens (e.g. 18th, 1947)
      if (idx > 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function defaultDescription(title: string) {
  return `Explore ${title} in the museum collection.`;
}

/**
 * Keeps paragraphs but removes accidental extra whitespace/blank lines, including
 * invisible paste artifacts (e.g. U+FFFC object replacement chars).
 */
function normalizeDescription(text: string) {
  return text
    .replace(/\uFFFC/g, "") // "￼" (object replacement character) from some copy/pastes
    .replace(/\u2028|\u2029/g, "\n") // line/paragraph separators -> newline
    .replace(/\r\n/g, "\n") // CRLF -> LF
    .replace(/[ \t]+\n/g, "\n") // trim trailing spaces per line
    .replace(/\n[ \t]*\n/g, "\n\n") // blank line with spaces -> blank line
    .replace(/\n{3,}/g, "\n\n") // 3+ newlines -> single blank line
    .trim();
}

export const MUSEUM_SLIDES: MuseumSlide[] = MUSEUM_FILENAMES.map((filename) => {
  const derivedTitle = titleFromFilename(filename);
  const override = MUSEUM_COPY_OVERRIDES[filename];

  const title = override?.title ?? derivedTitle;
  const description = normalizeDescription(
    override?.description ?? defaultDescription(title),
  );
  const titlePa = override?.titlePa;
  const descriptionPa = override?.descriptionPa
    ? normalizeDescription(override.descriptionPa)
    : undefined;
  const artist = override?.artist;
  const medium = override?.medium;
  const alt = override?.alt ?? title;

  return {
    filename,
    src: `/images/museumpaintings/${filename}`,
    alt,
    title,
    description,
    titlePa,
    descriptionPa,
    artist,
    medium,
  };
});


