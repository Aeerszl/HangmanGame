const HEAD = (
    // Kafa bileşeni: Kafanın dairesel bir şekli, kırmızı bir sınırı ve belirli bir konumu vardır.
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid red",
        position: "absolute",
        top: "50px",
        right: "-30px",
      }}
    />
  );
  
  const BODY = (
    // Vücut bileşeni: Dikdörtgen şeklinde, siyah bir arka plana ve belirli bir konuma sahip.
    <div
      style={{
        width: "10px",
        height: "70px",
        background: "black",
        position: "absolute",
        top: "120px",
        right: 0,
      }}
    />
  );
  
  const RIGHT_ARM = (
    // Sağ kol bileşeni: Dikdörtgen şeklinde, siyah bir arka plana, belirli bir konuma ve dönüş açısına sahip.
    <div
      style={{
        width: "60px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "-60px",
        rotate: "-30deg",
        transformOrigin: "left bottom",
      }}
    />
  );
  
  const LEFT_ARM = (
    // Sol kol bileşeni: Dikdörtgen şeklinde, siyah bir arka plana, belirli bir konuma ve dönüş açısına sahip.
    <div
      style={{
        width: "60px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "10px",
        rotate: "30deg",
        transformOrigin: "right bottom",
      }}
    />
  );
  
  const RIGHT_LEG = (
    // Sağ bacak bileşeni: Dikdörtgen şeklinde, siyah bir arka plana, belirli bir konuma ve dönüş açısına sahip.
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "180px",
        right: "-90px",
        rotate: "60deg",
        transformOrigin: "left bottom",
      }}
    />
  );
  
  const LEFT_LEG = (
    // Sol bacak bileşeni: Dikdörtgen şeklinde, siyah bir arka plana, belirli bir konuma ve dönüş açısına sahip.
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "180px",
        right: 0,
        rotate: "-60deg",
        transformOrigin: "right bottom",
      }}
    />
  );
  
  // Tüm vücut parçalarını içeren dizi.
  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
  
  // HangmanDrawing bileşeni: Sayfa üzerindeki asma adam figürünü oluşturan bileşen.
  type HangmanDrawingProps = {
    numberOfGuesses: number; // Tahmin sayısını alır.
  };
  
  export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
      <div style={{ position: "relative", width: "250px" }}>
        {/* Asma adamın üst direği */}
        <div
          style={{
            height: "50px",
            width: "10px",
            background: "black",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        {/* Asma adamın orta direği */}
        <div
          style={{
            height: "6px",
            width: "120px",
            background: "black",
            marginLeft: "120px",
          }}
        />
        {/* Asma adamın alt direği */}
        <div
          style={{
            height: "400px",
            width: "10px",
            background: "black",
            marginLeft: "120px",
          }}
        />
        {/* Asma adamın tabanı */}
        <div style={{ height: "10px", width: "250px", background: "black" }} />
        {/* Tahmin edilen hatalı harfleri içeren vücut parçalarını ekler */}
        {BODY_PARTS.slice(0, numberOfGuesses)}
      </div>
    );
  }
  