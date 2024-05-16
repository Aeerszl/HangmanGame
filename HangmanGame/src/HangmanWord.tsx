type HangmanWordProps = {
  guessedLetters: string[]; // Tahmin edilen harfleri içeren dizi
  wordToGuess: string; // Tahmin edilmesi gereken kelime
  reveal?: boolean; // Kelimenin tamamının görünüp görünmeyeceğini belirten bir bayrak (varsayılan: false)
};

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".15em",
        fontSize: "4rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          {/* Her harf için bir konteyner */}
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden", // Harfin görünürlüğü, tahmin edilmişse veya tüm kelimeyi gösterme modundayken true ise
              color: !guessedLetters.includes(letter) && reveal ? "red" : "black", // Harfin rengi, yanlış tahmin edilmişse ve tüm kelimeyi gösterme modundayken true ise kırmızı
            }}
          >
            {letter} {/* Harf */}
          </span>
        </span>
      ))}
    </div>
  );
}
