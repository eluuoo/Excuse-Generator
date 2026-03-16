import { useEffect, useRef, useState, useCallback } from "react";

const excuseCategories = [
  { text: "Select an excuse type", value: "" },
  { text: "Family", value: "family" },
  { text: "Office", value: "office" },
  { text: "Children", value: "children" },
  { text: "College", value: "college" },
  { text: "Party", value: "party" },
  { text: "Funny", value: "funny" },
  { text: "Unbelievable", value: "unbelievable" },
  { text: "Developers", value: "developers" },
  { text: "Gaming", value: "gaming" },
];

const App = () => {
  // Core state
  const [excuse, setExcuse] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);
  const excuseTextRef = useRef<HTMLSpanElement>(null);

  // Animation state: Nose lengthens
  const [noseLength, setNoseLength] = useState<number>(1);
  const [eyeState, setEyeState] = useState<string>("normal");
  const [mouthState, setMouthState] = useState<string>("closed");

  const fetchExcuse = useCallback(async () => {
    if (!category) return;
    setIsLoading(true);
    setIsError(false);
    setIsTextCopied(false);
    
    // Loading... : The nose begins to lengthen
    setNoseLength(2.2);
    setEyeState("squint");
    setMouthState("open");

    try {
      const response = await fetch(`https://excuser-three.vercel.app/v1/excuse/${category}/`);
      if (!response.ok) throw new Error("Failed to fetch excuse");
      const data = await response.json();
      setExcuse(data[0].excuse);

      // Load completed: The nose changes in length according to the length of the excuse.
      const excuseLength = data[0].excuse.length;
      const newNoseLength = excuseLength > 150 ? 3.8 : excuseLength > 100 ? 2.8 : excuseLength > 50 ? 1.8 : 1.2;
      setNoseLength(newNoseLength);
      setEyeState("blink");
      setMouthState("smile");
    } catch (error) {
      setIsError(true);
      setExcuse("");
      // Failure: Resetting the nose
      setNoseLength(1);
      setEyeState("normal");
      setMouthState("closed");
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  // copy
  const copyExcuse = () => {
    if (!excuseTextRef.current || !excuse) return;
    navigator.clipboard.writeText(excuseTextRef.current.innerText);
    setIsTextCopied(true);
    // Move your nose slightly while copying.
    setNoseLength(noseLength + 0.6);
    setTimeout(() => setNoseLength(noseLength - 0.3), 150);
    setTimeout(() => setNoseLength(noseLength), 300);
    setTimeout(() => setIsTextCopied(false), 2000);
  };

  
  useEffect(() => {
    if (category) fetchExcuse();
  }, [category, fetchExcuse]);

  return (
    <div style={styles.wrapper}>
      {/* Dynamic background illustration elements*/}
      <div style={styles.bgIllustrations}>
        {/* Illustration of floating clouds*/}
        <div style={{...styles.cloud, left: "8%", top: "15%", animationDelay: "0s"}}></div>
        <div style={{...styles.cloud, left: "85%", top: "20%", animationDelay: "1s", transform: "scale(0.8)"}}></div>
        <div style={{...styles.cloud, left: "45%", top: "8%", animationDelay: "2s", transform: "scale(0.7)"}}></div>
        
        {/* Floating star illustration*/}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            style={{
              ...styles.star,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random() * 1})`,
            }}
          ></div>
        ))}
        
        {/* Illustration of a floating paper airplane */}
        <div style={styles.paperPlane}></div>
        
        {/* Floating bubble illustration */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            style={{
              ...styles.bubble,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.6 + Math.random() * 0.8})`,
            }}
          ></div>
        ))}
      </div>
      
      {/* container */}
      <div style={styles.container}>
        {/* left */}
        <div style={styles.visualSection}>
          <h1 style={styles.title}>🤥 Excuse Generator</h1>
          
          {/* pinocchio */}
          <div style={styles.pinocchioWrapper}>
            <div style={styles.face}>
              {/* forehead */}
              <div style={styles.foreheadDecor}></div>
              
              {/* eye */}
              <div style={{
                ...styles.eye,
                left: "150px",
                transform: eyeState === "squint" ? "skewX(5deg) scaleY(0.7)" : "none",
                animation: eyeState === "blink" ? "softBlink 0.8s infinite" : "gentleBlink 4s infinite",
              }}>
                <div style={styles.eyePupil}></div>
                <div style={styles.eyeHighlight}></div>
              </div>
              <div style={{
                ...styles.eye,
                right: "150px",
                transform: eyeState === "squint" ? "skewX(-5deg) scaleY(0.7)" : "none",
                animation: eyeState === "blink" ? "softBlink 0.8s infinite" : "gentleBlink 4s infinite",
              }}>
                <div style={styles.eyePupil}></div>
                <div style={styles.eyeHighlight}></div>
              </div>
              
              {/* nose */}
              <div style={{
                ...styles.nose,
                width: `${40 + (noseLength - 1) * 15}px`,
                height: `${80 + (noseLength - 1) * 35}px`,
                left: "50%",
                top: "210px",
              }}></div>
              
              {/* mouth */}
              <div style={{
                ...styles.mouth,
                height: mouthState === "open" ? "40px" : mouthState === "smile" ? "35px" : "10px",
                borderRadius: mouthState === "open" ? "50%" : "0 0 90% 90%",
              }}>
                <div style={styles.mouthTongue}></div>
              </div>
              
              {/* cheek */}
              <div style={{...styles.cheek, left: "100px"}}></div>
              <div style={{...styles.cheek, right: "100px"}}></div>
            </div>
            
            {/* base */}
            <div style={styles.baseDecor}></div>
          </div>
        </div>

        {/* right */}
        <div style={styles.functionalSection}>
          {/* select */}
          <div style={styles.selectWrapper}>
            <label style={styles.label}>Select an excuse type</label>
            <select
              style={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
            >
              {excuseCategories.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value} 
                  style={styles.option}
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          {/* excuse */}
          <div style={styles.excuseBox}>
            {isLoading ? (
              <div style={styles.loadingWrapper}>
                <span style={styles.loadingText}>🧠 Crafting your excuse...</span>
                <div style={styles.loadingSpinner}></div>
              </div>
            ) : isError ? (
              <span style={styles.errorText}>
                😵 Failed to load excuse! Try another category.
              </span>
            ) : (
              <span 
                ref={excuseTextRef} 
                style={styles.excuseText}
              >
                {excuse || "🤷 Select a category to generate an excuse!"}
              </span>
            )}
          </div>

          {/* button group */}
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.button,
                backgroundColor: isTextCopied ? "#26A69A" : "#01579B",
                boxShadow: isTextCopied ? "0 6px 0 #004D40" : "0 6px 0 #004080",
              }}
              onClick={copyExcuse}
              disabled={!excuse || isLoading}
            >
              {isTextCopied ? "✅ Copied!" : "📋 Copy Excuse"}
              <i className="fa-solid fa-copy"></i>
            </button>
            
            <button
              style={{
                ...styles.button,
                backgroundColor: "#F4511E",
                boxShadow: "0 6px 0 #BF360C",
              }}
              onClick={fetchExcuse}
              disabled={!category || isLoading}
            >
              🔄 New Excuse
              <i className="fa-solid fa-refresh"></i>
            </button>
          </div>

          {/* prompt */}
          <p style={styles.hint}>⚠️ For entertainment only!</p>
        </div>
      </div>

      {/* Global animation */}
      <style>{`
        /* wink */
        @keyframes gentleBlink {
          0%, 100% { height: 50px; border-radius: 50%; }
          50% { height: 12px; border-radius: 50% 50% 0 0; }
        }
        @keyframes softBlink {
          0%, 100% { height: 50px; }
          25% { height: 8px; }
          50% { height: 50px; }
          75% { height: 8px; }
        }
        
        /* background */
        @keyframes floatCloud {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(50px) translateY(-15px); }
        }
        
        @keyframes twinkleStar {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes flyPlane {
          0% { transform: translateX(-100%) translateY(30%) rotate(15deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(200%) translateY(-20%) rotate(15deg); opacity: 0; }
        }
        
        @keyframes riseBubble {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        /* face */
        .cheek {
          animation: softBlush 4s infinite ease-in-out;
        }
        @keyframes softBlush {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        /* loading */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};


const styles = {

  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: "2rem",
    boxSizing: "border-box" as const,
    background: "linear-gradient(135deg, #FFFAF0 0%, #FFE4E1 25%, #F0E68C 50%, #E6E6FA 75%, #F5DEB3 100%)",
    backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Nunito', 'Comic Sans MS', cursive",
    overflow: "hidden",
    position: "absolute" as const,
  },
  
  // background illustration
  bgIllustrations: {
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const, 
    zIndex: 0,
  },
  
  // cloud illustration
  cloud: {
    position: "absolute" as const,
    width: "180px",
    height: "60px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "30px",
    animation: "floatCloud 20s ease-in-out infinite",
    zIndex: 1,
  },
  
  // start illustration
  star: {
    position: "absolute" as const,
    width: "12px",
    height: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    animation: "twinkleStar 3s ease-in-out infinite",
    zIndex: 1,
  },
  
  // paperplane
  paperPlane: {
    position: "absolute" as const,
    width: "40px",
    height: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
    animation: "flyPlane 25s linear infinite",
    top: "40%",
    zIndex: 2,
  },
  
  // bubble
  bubble: {
    position: "absolute" as const,
    width: "20px",
    height: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    animation: "riseBubble 8s ease-in-out infinite",
    zIndex: 1,
  },
  
  
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "1600px",
    height: "85vh",
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "3rem",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    position: "relative" as const,
    zIndex: 1,
    backdropFilter: "blur(10px)",
  },
  
  // left visual
  visualSection: {
    flex: 7,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(45deg, #FFF8E6 0%, #FFECB3 100%)",
    backgroundImage: "url('https://www.transparenttextures.com/patterns/old-paper.png')",
    padding: "2rem",
    borderRight: "1px dashed rgba(251, 140, 0, 0.3)",
  },
  
  // title
  title: {
    fontSize: "4.2rem",
    color: "#E65100",
    textShadow: "2px 2px 0 rgba(255, 255, 255, 0.8), 4px 4px 0 rgba(230, 81, 0, 0.2)",
    textAlign: "center" as const,
    marginBottom: "1.5rem",
    letterSpacing: "1px",
    fontFamily: "'Pacifico', cursive",
  },
  
  //pinocchio wrapper
  pinocchioWrapper: {
    position: "relative" as const,
    width: "620px",
    height: "620px",
  },
  
  // face
  face: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFD7B5",
    borderRadius: "50%",
    border: "3px solid #E65100",
    position: "relative" as const,
    boxShadow: "inset 0 0 40px rgba(251, 140, 0, 0.15), 0 10px 30px rgba(230, 81, 0, 0.1)",
  },
  
  // forehead
  foreheadDecor: {
    position: "absolute" as const,
    top: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "20px",
    backgroundColor: "rgba(251, 140, 0, 0.2)",
    borderRadius: "50%",
  },
  
  // eye
  eye: {
    position: "absolute" as const,
    width: "60px",
    height: "50px",
    backgroundColor: "white",
    borderRadius: "50%",
    top: "180px",
    border: "2px solid #37474F",
    overflow: "hidden",
    transition: "all 0.4s ease",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.2)",
  },
  
  // eyepupil
  eyePupil: {
    width: "25px",
    height: "25px",
    backgroundColor: "#263238",
    borderRadius: "50%",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
  },
  
  // eye hihglight
  eyeHighlight: {
    width: "8px",
    height: "8px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute" as const,
    top: "20%",
    right: "20%",
  },
  
  // nose
  nose: {
    position: "absolute" as const,
    width: "40px",
    height: "80px",
    background: "linear-gradient(135deg, #FF9800 0%, #F57C00 50%, #E65100 100%)",
    border: "3px solid #E65100",
    borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
    transform: "translateX(-50%)",
    transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
    zIndex: 10,
    backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%)",
  },
  
  // mouth
  mouth: {
    position: "absolute" as const,
    width: "160px",
    backgroundColor: "#D32F2F",
    border: "3px solid #B71C1C",
    bottom: "150px",
    left: "50%",
    transform: "translateX(-50%)",
    transition: "all 0.6s ease",
    overflow: "hidden",
  },
  
  // tongue
  mouthTongue: {
    position: "absolute" as const,
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
    height: "70%",
    backgroundColor: "#F06292",
    borderRadius: "50%",
  },
  
  // cheek
  cheek: {
    position: "absolute" as const,
    width: "100px",
    height: "70px",
    background: "linear-gradient(45deg, #F48FB1 0%, #EC407A 100%)",
    borderRadius: "50%",
    top: "240px",
    opacity: 0.5,
    zIndex: 5,
    filter: "blur(8px)",
  },
  
  // base
  baseDecor: {
    position: "absolute" as const,
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "200px",
    height: "2px",
    backgroundColor: "#E65100",
    borderRadius: "50%",
  },
  
  // right
  functionalSection: {
    flex: 3,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    padding: "3rem",
    gap: "2.2rem",
    background: "linear-gradient(180deg, #F5F5F5 0%, #FAFAFA 100%)",
    backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
  },
  
 
  selectWrapper: {
    width: "100%",
  },
  
  // label
  label: {
    display: "block",
    color: "#424242",
    fontSize: "1.5rem",
    marginBottom: "1rem",
    letterSpacing: "0.5px",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
  },
  
  // select
  select: {
    width: "100%",
    padding: "1.3rem 1.8rem",
    borderRadius: "1rem",
    border: "2px solid #FF9800",
    backgroundColor: "white",
    color: "#424242",
    fontSize: "1.2rem",
    fontFamily: "'Nunito', sans-serif",
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 4px 0 rgba(255, 152, 0, 0.2)",
    transition: "all 0.3s ease",
  },
  
  // option
  option: {
    backgroundColor: "white",
    color: "#424242",
    fontSize: "1.1rem",
    padding: "1rem",
    fontFamily: "'Nunito', sans-serif",
  },
  
  // excuse box
  excuseBox: {
    width: "100%",
    minHeight: "260px",
    maxHeight: "310px",
    padding: "2.2rem",
    borderRadius: "1.5rem",
    backgroundColor: "white",
    border: "2px solid #FFCCBC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
    overflowY: "auto" as const,
  },
  
  // Loading wrapper
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
  },
  
  // lodading...
  loadingText: {
    color: "#E65100",
    fontSize: "1.4rem",
    letterSpacing: "0.5px",
    fontFamily: "'Nunito', sans-serif",
  },
  
  
  loadingSpinner: {
    width: "42px",
    height: "42px",
    border: "3px solid rgba(230, 81, 0, 0.2)",
    borderTop: "3px solid #FF9800",
    borderRadius: "50%",
    animation: "spin 1.2s linear infinite",
  },
  
  // error
  errorText: {
    color: "#D32F2F",
    fontSize: "1.3rem",
    textAlign: "center" as const,
    letterSpacing: "0.5px",
    fontFamily: "'Nunito', sans-serif",
  },
  
  // excuse word
  excuseText: {
    color: "#333333",
    fontSize: "1.5rem",
    lineHeight: "1.9",
    textAlign: "center" as const,
    letterSpacing: "0.3px",
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const,
    width: "100%",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 500,
  },
  
  // button group
  buttonGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.8rem",
    justifyContent: "center",
    width: "100%",
  },
  
  // button
  button: {
    padding: "1.3rem 2.8rem",
    borderRadius: "1rem",
    border: "none",
    fontSize: "1.4rem",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    transition: "all 0.3s ease",
    transform: "translateY(0)",
  },
  
  // prompt
  hint: {
    color: "#616161",
    fontSize: "1.2rem",
    textAlign: "center" as const,
    letterSpacing: "0.5px",
    marginTop: "1.2rem",
    fontStyle: "italic",
    fontFamily: "'Nunito', sans-serif",
  },
};

export default App;