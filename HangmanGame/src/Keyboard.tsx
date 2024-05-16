import styles from "./Keyboard.module.css";

// Klavyedeki tüm harfler
const KEYS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

type KeyboardProps = {
  disabled?: boolean; // Klavyenin devre dışı bırakılıp bırakılmadığını belirtir (varsayılan: false)
  activeLetters: string[]; // Doğru tahmin edilmiş harfleri içeren dizi
  inactiveLetters: string[]; // Yanlış tahmin edilmiş harfleri içeren dizi
  addGuessedLetter: (letter: string) => void; // Tahmin edilen bir harfi eklemek için bir fonksiyon
};

export function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".25rem",
      }}
    >
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key); // Harf doğru tahmin edilmişse true
        const isInactive = inactiveLetters.includes(key); // Harf yanlış tahmin edilmişse true
        return (
          <button
            onClick={() => addGuessedLetter(key)} // Harf butonuna tıklandığında, tahmin edilen harfi ekleyen fonksiyonu çağırır
            className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} // Butonun stili, durumuna göre belirlenir
            disabled={isInactive || isActive || disabled} // Buton devre dışı bırakılır: yanlış tahmin edilmişse, doğru tahmin edilmişse veya klavye devre dışı bırakılmışsa
            key={key}
          >
            {key} {/* Harf butonunun içeriği */}
          </button>
        );
      })}
    </div>
  );
}
