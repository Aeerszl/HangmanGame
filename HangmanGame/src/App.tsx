import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./worldList.json";

// Rastgele bir kelime seçmek için kullanılan fonksiyon
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  // State hook'ları kullanılarak bileşenin durumunu yönetme
  const [wordToGuess, setWordToGuess] = useState(getWord); // Tahmin edilecek kelime
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // Tahmin edilen harfler

  // Yanlış tahmin edilen harfleri filtreleme
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  // Kaybeden kontrolü
  const isLoser = incorrectLetters.length >= 6;

  // Kazanan kontrolü
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // Tahmin edilen bir harfi eklemek için kullanılan geri çağırma fonksiyonu
  const addGuessedLetter = useCallback(
    (letter: string) => {
      // Harf zaten tahmin edildiyse veya oyun kaybedilmişse veya kazanılmışsa işlem yapma
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      // Tahmin edilen harfleri güncelleme
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  // Klavye olayları için etkileşimli işlev
  useEffect(() => {
    // Klavye olay dinleyicisi ekleme
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      // Sadece küçük harfleri kabul etme
      if (!key.match(/^[a-z]$/)) return;

      // Klavye olayını durdurma
      e.preventDefault();
      // Tahmin edilen harfi ekleme
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    // Bileşen kaldırıldığında klavye olay dinleyicisini kaldırma
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  // Yeni kelime almak için Enter tuşuna basıldığında etkileşimli işlev
  useEffect(() => {
    // Klavye olay dinleyicisi ekleme
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      // Sadece Enter tuşunu kabul etme
      if (key !== "Enter") return;

      // Klavye olayını durdurma
      e.preventDefault();
      // Tahmin edilen harfleri sıfırlama ve yeni kelime alımı
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    // Bileşen kaldırıldığında klavye olay dinleyicisini kaldırma
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  // Sayfanın yenilenmesini sağlayacak fonksiyon
  const handleRefresh = () => {
    window.location.reload();
  };

  // Bileşenin JSX dönüşü
  return (
    <div
      style={{
        maxWidth: "850px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
        backgroundColor: "#F2D9D0", // Arka plan rengi
      }}
    >
      {/* Kazanan veya kaybeden duruma göre ileti */}
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      {/* Adam asmaca çizimi bileşeni */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      {/* Tahmin edilen kelime bileşeni */}
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      {/* Yenileme butonu */}
      <button
        onClick={handleRefresh}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "#a66253",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Refresh
      </button>
      {/* Klavye bileşeni */}
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      
    </div>
  );
}

export default App;
