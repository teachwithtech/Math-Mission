const state = {

  studentName: "",
  studentClass: "VI A",
  avatar: "👦",

  currentScreen: "homeScreen",

  pretestIndex: 0,
  pretestScore: 0,

  shapeIndex: 0,
  shapeLevel: 1,
  shapeScore: 0,

  attempts: 0,

  firstTryCorrect: 0,
  correctedCount: 0,

  errors: [],

  currentQuestion: null,
  currentWrongAnswer: null,

  selectedError: null,

  reflection: {}

};

const pretestQuestions = [
  {q:"Sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Berapa luasnya?", opts:["13 cm²","26 cm²","40 cm²","80 cm²"], a:2},
  {q:"Sebuah persegi memiliki sisi 7 m. Berapa kelilingnya?", opts:["14 m","21 m","28 m","49 m"], a:2},
  {q:"Jika panjang 12 m dan lebar 4 m, operasi yang tepat untuk mencari luas adalah...", opts:["12 + 4","12 - 4","12 × 4","12 ÷ 4"], a:2},
  {q:"Sebuah taman memiliki luas 60 m² dan panjang 10 m. Lebarnya adalah...", opts:["5 m","6 m","12 m","20 m"], a:1},
  {q:"Dua taman memiliki luas sama. Apakah kelilingnya pasti sama?", opts:["Selalu sama","Belum tentu sama","Pasti berbeda","Tidak dapat dihitung"], a:1}
];

const shapeQuestions = [

  // =====================================
  // LEVEL 1 — UNDERSTANDING
  // =====================================

  {
    id: 1,
    level: 1,
    levelName: "UNDERSTANDING",

    q: "Taman berbentuk persegi panjang. Panjangnya 20 m dan lebarnya 12 m. Berapa luas taman?",

    diagram: true,

    opts: [
      "32 m²",
      "64 m²",
      "240 m²",
      "384 m²"
    ],

    a: 2,

    errorMap: {
      0: "E1",
      1: "E2",
      3: "E4"
    },

    hint: "Untuk mencari luas persegi panjang, perhatikan hubungan panjang dan lebar."
  },


  {
    id: 2,
    level: 1,
    levelName: "UNDERSTANDING",

    q: "Sebuah taman berukuran 15 m × 8 m. Berapa luasnya?",

    opts: [
      "23 m²",
      "46 m²",
      "120 m²",
      "240 m²"
    ],

    a: 2,

    errorMap: {
      0: "E1",
      1: "E2",
      3: "E4"
    },

    hint: "Luas persegi panjang dapat ditemukan dengan mengalikan panjang dan lebar."
  },


  {
    id: 3,
    level: 1,
    levelName: "UNDERSTANDING",

    q: "Sebuah taman berbentuk persegi memiliki panjang sisi 9 m. Berapa keliling taman?",

    opts: [
      "18 m",
      "27 m",
      "36 m",
      "81 m"
    ],

    a: 2,

    errorMap: {
      0: "E2",
      1: "E3",
      3: "E4"
    },

    hint: "Keliling adalah panjang seluruh sisi yang mengelilingi bangun."
  },


  {
    id: 4,
    level: 1,
    levelName: "UNDERSTANDING",

    q: "Persegi panjang memiliki panjang 18 m dan lebar 7 m. Berapa kelilingnya?",

    opts: [
      "25 m",
      "50 m",
      "126 m",
      "144 m"
    ],

    a: 1,

    errorMap: {
      0: "E2",
      2: "E4",
      3: "E4"
    },

    hint: "Keliling = 2 × (panjang + lebar)."
  },


  // =====================================
  // LEVEL 2 — APPLICATION
  // =====================================

  {
    id: 5,
    level: 2,
    levelName: "APPLICATION",

    q: "Taman A berukuran 20 × 12 m dan Taman B berukuran 24 × 10 m. Pernyataan yang tepat adalah...",

    opts: [
      "Taman A lebih luas",
      "Taman B lebih luas",
      "Luas keduanya sama",
      "Tidak dapat dibandingkan"
    ],

    a: 2,

    errorMap: {
      0: "E1",
      1: "E4",
      3: "E2"
    },

    hint: "Hitung luas masing-masing taman terlebih dahulu."
  },


  {
    id: 6,
    level: 2,
    levelName: "APPLICATION",

    q: "Sebuah taman memiliki luas 240 m². Jika panjangnya 20 m, berapa lebarnya?",

    opts: [
      "10 m",
      "12 m",
      "15 m",
      "20 m"
    ],

    a: 1,

    errorMap: {
      0: "E2",
      2: "E4",
      3: "E4"
    },

    hint: "Gunakan hubungan luas = panjang × lebar."
  },


  {
    id: 7,
    level: 2,
    levelName: "APPLICATION",

    q: "Taman sekolah berukuran 20 m × 12 m akan dipagari seluruh sisinya. Berapa meter pagar yang dibutuhkan?",

    opts: [
      "32 m",
      "64 m",
      "120 m",
      "240 m"
    ],

    a: 1,

    errorMap: {
      0: "E1",
      2: "E4",
      3: "E1"
    },

    hint: "Karena pagar mengelilingi taman, kamu perlu mencari keliling."
  },


  {
    id: 8,
    level: 2,
    levelName: "APPLICATION",

    q: "Pagar taman membutuhkan 64 m pagar. Harga pagar adalah Rp25.000 per meter. Berapa biaya yang diperlukan?",

    opts: [
      "Rp640.000",
      "Rp1.200.000",
      "Rp1.600.000",
      "Rp2.500.000"
    ],

    a: 2,

    errorMap: {
      0: "E4",
      1: "E4",
      3: "E2"
    },

    hint: "Biaya total = panjang pagar × harga setiap meter."
  },


  // =====================================
  // LEVEL 3 — ANALYSIS
  // =====================================

  {
    id: 9,
    level: 3,
    levelName: "ANALYSIS",

    q: "Taman A berukuran 20 m × 12 m. Taman B berukuran 15 m × 16 m. Pernyataan yang benar adalah...",

    opts: [
      "Luas A lebih besar daripada B",
      "Luas B lebih besar daripada A",
      "Luas keduanya sama, tetapi kelilingnya berbeda",
      "Luas dan keliling keduanya sama"
    ],

    a: 2,

    errorMap: {
      0: "E2",
      1: "E4",
      3: "E1"
    },

    hint: "Jangan hanya membandingkan luas. Periksa juga keliling kedua taman."
  },


  {
    id: 10,
    level: 3,
    levelName: "ANALYSIS",

    q: "Beni menghitung luas taman 20 m × 12 m seperti ini: 20 + 12 = 32 m². Apa kesalahan Beni?",

    opts: [
      "Salah menghitung panjang",
      "Salah menghitung lebar",
      "Salah memilih rumus luas",
      "Salah menuliskan satuan panjang"
    ],

    a: 2,

    errorMap: {
      0: "E3",
      1: "E3",
      3: "E5"
    },

    hint: "Pikirkan kembali rumus luas persegi panjang."
  },


  {
    id: 11,
    level: 3,
    levelName: "ANALYSIS",

    q: "Siti menghitung keliling taman 20 m × 12 m dengan 20 × 12 = 240 m. Apa yang perlu diperbaiki?",

    opts: [
      "Rumus keliling",
      "Ukuran panjang",
      "Ukuran lebar",
      "Satuan luas"
    ],

    a: 0,

    errorMap: {
      1: "E5",
      2: "E5",
      3: "E5"
    },

    hint: "Apakah perkalian panjang × lebar digunakan untuk mencari keliling?"
  },


  {
    id: 12,
    level: 3,
    levelName: "ANALYSIS",

    q: "Taman A dan B sama-sama memiliki luas 240 m². Apakah keliling kedua taman pasti sama?",

    opts: [
      "Ya, karena luasnya sama",
      "Ya, karena keduanya berbentuk persegi panjang",
      "Tidak, karena panjang dan lebarnya dapat berbeda",
      "Tidak, karena luas tidak dapat digunakan"
    ],

    a: 2,

    errorMap: {
      0: "E1",
      1: "E1",
      3: "E2"
    },

    hint: "Coba bayangkan dua persegi panjang dengan bentuk yang berbeda tetapi luas sama."
  },


  // =====================================
  // LEVEL 4 — HOTS
  // =====================================

  {
    id: 13,
    level: 4,
    levelName: "HOTS",

    q: "Buatlah taman berbentuk persegi panjang dengan luas tepat 240 m². Manakah ukuran yang menghasilkan keliling paling kecil?",

    opts: [
      "10 m × 24 m",
      "12 m × 20 m",
      "15 m × 16 m",
      "8 m × 30 m"
    ],

    a: 2,

    errorMap: {
      0: "E2",
      1: "E2",
      3: "E2"
    },

    hint: "Semua pilihan memiliki luas 240 m². Bandingkan kelilingnya."
  },


  {
    id: 14,
    level: 4,
    levelName: "HOTS",

    q: "Lahan sekolah maksimal berukuran 30 m × 20 m. Sekolah ingin membuat taman dengan luas minimal 240 m² dan pagar sesedikit mungkin. Ukuran yang paling efisien adalah...",

    opts: [
      "8 m × 30 m",
      "10 m × 24 m",
      "12 m × 20 m",
      "15 m × 16 m"
    ],

    a: 3,

    errorMap: {
      0: "E2",
      1: "E2",
      2: "E2"
    },

    hint: "Cari ukuran yang memenuhi luas minimal 240 m², lalu bandingkan kelilingnya."
  },


  {
    id: 15,
    level: 4,
    levelName: "BOSS CHALLENGE",

    q: "Taman A berukuran 20 m × 12 m dan Taman B berukuran 15 m × 16 m. Harga pagar Rp25.000 per meter. Pernyataan yang benar adalah...",

    opts: [
      "Taman A lebih luas dan biaya pagarnya lebih mahal",
      "Taman B lebih luas dan biaya pagarnya lebih murah",
      "Keduanya sama luas, tetapi Taman B membutuhkan biaya pagar lebih sedikit",
      "Keduanya sama luas dan biaya pagarnya sama"
    ],

    a: 2,

    errorMap: {
      0: "E1",
      1: "E2",
      3: "E4"
    },

    hint: "Hitung luas, keliling, lalu biaya pagar untuk kedua taman."
  }

];
const coachScripts = {

  E1: {
    name: "Concept Error",
    icon: "🧠",
    color: "blue",

    title: "Mari periksa konsepnya.",

    steps: [
      "Kamu sedang mencari <strong>luas</strong> atau <strong>keliling</strong>?",
      "Luas menunjukkan bagian yang berada <strong>di dalam</strong> bangun. Keliling menunjukkan panjang garis yang <strong>mengelilingi</strong> bangun.",
      "Untuk persegi panjang, luas dihitung dengan <strong>panjang × lebar</strong>."
    ],

    finalPrompt:
      "Sekarang coba gunakan konsep yang tepat untuk menjawab soal."
  },


  E2: {
    name: "Strategy Error",
    icon: "🧭",
    color: "yellow",

    title: "Mari cari strategi yang lebih tepat.",

    steps: [
      "Jangan langsung menghitung. Baca kembali informasi penting dalam soal.",
      "Apa yang diketahui? Panjang, lebar, luas, keliling, atau harga?",
      "Sekarang tentukan operasi yang menghubungkan informasi tersebut."
    ],

    finalPrompt:
      "Pilih strategi yang paling sesuai, lalu coba lagi."
  },


  E3: {
    name: "Procedure Error",
    icon: "🔢",
    color: "orange",

    title: "Mari periksa urutan langkahmu.",

    steps: [
      "Konsepmu mungkin sudah benar. Sekarang kita periksa langkahnya.",
      "Apa yang harus dilakukan terlebih dahulu?",
      "Setelah mendapatkan hasil pertama, langkah apa yang harus dilakukan berikutnya?"
    ],

    finalPrompt:
      "Coba ulangi langkahnya satu per satu dengan lebih teliti."
  },


  E4: {
    name: "Calculation Error",
    icon: "🧮",
    color: "red",

    title: "Strategimu sudah mengarah benar. Mari cek hitungannya.",

    steps: [
      "Coba hitung kembali dengan lebih pelan.",
      "Pisahkan angka menjadi puluhan dan satuan jika diperlukan.",
      "Bandingkan hasilmu dengan perkiraan. Apakah hasilnya masuk akal?"
    ],

    finalPrompt:
      "Periksa kembali operasi hitungmu sebelum memilih jawaban."
  },


  E5: {
    name: "Interpretation Error",
    icon: "🔎",
    color: "purple",

    title: "Mari baca kembali makna soalnya.",

    steps: [
      "Apa sebenarnya yang ditanyakan dalam soal?",
      "Tuliskan informasi yang diketahui: panjang, lebar, luas, keliling, atau harga.",
      "Perhatikan juga satuannya. Apakah yang dicari satuan panjang, luas, atau biaya?"
    ],

    finalPrompt:
      "Setelah memahami informasi soal, coba tentukan jawabannya kembali."
  }

};

function showScreen(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target =
    document.getElementById(id);

  if (!target) {

    console.error(
      "Screen tidak ditemukan:",
      id
    );

    return;
  }

  target.classList.add("active");

  state.currentScreen = id;
}

function updateProgress(id){
  const map = {
    homeScreen:0, profileScreen:5, pretestIntroScreen:8, pretestScreen:15,
    diagnosticScreen:25, mapScreen:30, shapeIntroScreen:35, shapeScreen:55,
    errorScreen:65, coachScreen:75, reflectionScreen:88, resultScreen:100
  };
  const value=map[id] ?? 0;
  document.getElementById("progressBar").style.width=value+"%";
  document.getElementById("progressText").textContent="Misi "+value+"%";
}

document.querySelectorAll(".avatar").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".avatar").forEach(x=>x.classList.remove("selected"));
    btn.classList.add("selected");
    state.avatar=btn.dataset.avatar;
  });
});

function startProfile(){
  const name=document.getElementById("studentName").value.trim();
  if(!name){toast("Tulis namamu terlebih dahulu 😊");return;}
  state.studentName=name;
  state.studentClass=document.getElementById("studentClass").value;
  showScreen("pretestIntroScreen");
}

function startPretest(){
  state.pretestIndex=0;state.pretestScore=0;
  renderPretest();
  showScreen("pretestScreen");
}

function renderPretest(){
  const q=pretestQuestions[state.pretestIndex];
  document.getElementById("pretestCounter").textContent=`Soal ${state.pretestIndex+1}/${pretestQuestions.length}`;
  document.getElementById("pretestQuestion").innerHTML=`<h2 style="font-size:26px">${q.q}</h2>`;
  const box=document.getElementById("pretestOptions");box.innerHTML="";
  q.opts.forEach((opt,i)=>{
    const b=document.createElement("button");b.className="option-btn";b.textContent=String.fromCharCode(65+i)+". "+opt;
    b.onclick=()=>answerPretest(i);box.appendChild(b);
  });
}

function answerPretest(i){
  const q=pretestQuestions[state.pretestIndex];
  if(i===q.a) state.pretestScore++;
  state.pretestIndex++;
  if(state.pretestIndex<pretestQuestions.length){renderPretest();}
  else {renderDiagnostic();showScreen("diagnosticScreen");}
}

function renderDiagnostic(){
  const pct=Math.round(state.pretestScore/pretestQuestions.length*100);
  document.getElementById("diagnosticTitle").textContent=`Bagus, ${state.studentName}! Ini titik awalmu.`;
  const metrics=[
    ["Pemahaman Konsep",Math.max(35,pct)],
    ["Strategi",Math.max(30,pct-5)],
    ["Penalaran",Math.max(25,pct-10)]
  ];
  document.getElementById("diagnosticBars").innerHTML=metrics.map(m=>`
    <div class="metric-row"><span>${m[0]}</span><div class="metric-track"><div class="metric-fill" style="width:${m[1]}%"></div></div><b>${m[1]}%</b></div>`).join("");
}

function startShapeLab(){

  state.shapeIndex = 0;
  state.shapeLevel = 1;

  state.shapeScore = 0;
  state.attempts = 0;
  state.errors = [];

  state.currentWrongAnswer = null;
  state.selectedError = null;

  renderShapeQuestion();

  showScreen("shapeScreen");
  updateProgress("shapeScreen");
}

function renderShapeQuestion(){

  // ==========================================
  // AMBIL SOAL SESUAI LEVEL
  // ==========================================

  const levelQuestions =
    shapeQuestions.filter(
      q => q.level === state.shapeLevel
    );


  // Cari soal berdasarkan ID/index di level
  const q =
    levelQuestions.find(
      item => item.id === state.shapeIndex
    );


  if(!q){

    console.error(
      "Soal tidak ditemukan:",
      state.shapeIndex,
      "Level:",
      state.shapeLevel
    );

    return;
  }


  // Simpan soal aktif
  state.currentQuestion = q;


  // ==========================================
  // COUNTER LEVEL
  // ==========================================

  document.getElementById("shapeCounter").textContent =
    `Level ${state.shapeLevel} · Soal ${
      levelQuestions.indexOf(q) + 1
    }/${levelQuestions.length}`;


  // ==========================================
  // MODE TRY AGAIN / THINK
  // ==========================================

  let modeText = "";


  if(state.currentWrongAnswer){

    modeText = `
      <div class="retry-banner">
        🔄 <strong>TRY AGAIN</strong>
        <br>
        Periksa kembali cara berpikirmu.
      </div>
    `;

  }else{

    modeText = `
      <div class="think-banner">
        🧠 <strong>THINK BEFORE CHECK</strong>
        <br>
        Pikirkan strategimu sebelum memilih jawaban.
      </div>
    `;

  }


  // ==========================================
  // TAMPILKAN SOAL
  // ==========================================

  let html = `

    ${modeText}

    <div class="level-label">
      LEVEL ${q.level} · ${q.levelName}
    </div>

    <h2 style="font-size:27px">
      ${q.q}
    </h2>

  `;


  // ==========================================
  // DIAGRAM
  // ==========================================

  if(q.diagram){

    html += `

      <div class="shape-box">

        <div class="rect-diagram">

          <span>
            🌳 TAMAN 🌳
          </span>

        </div>

      </div>

    `;

  }


  document.getElementById("shapeQuestion")
    .innerHTML = html;


  // ==========================================
  // PILIHAN JAWABAN
  // ==========================================

  const box =
    document.getElementById("shapeOptions");

  box.innerHTML = "";


  document.getElementById("feedbackArea")
    .innerHTML = "";


  q.opts.forEach((opt,i)=>{

    const b =
      document.createElement("button");

    b.className = "option-btn";

    b.textContent =
      String.fromCharCode(65+i) +
      ". " +
      opt;

    b.onclick =
      () => answerShape(i);

    box.appendChild(b);

  });

}

// ============================================
// JAWAB SOAL SHAPE
// ============================================

function answerShape(i) {

  const q = state.currentQuestion;

  if (!q) {
    console.error("currentQuestion tidak ditemukan");
    return;
  }

  state.attempts++;

  const selectedAnswer = q.opts[i];

  // ==========================================
  // JAWABAN BENAR
  // ==========================================

  if (i === q.a) {

    state.shapeScore++;

    // Jika sebelumnya salah, berarti berhasil memperbaiki
    if (state.currentWrongAnswer !== null) {

      state.correctedCount =
        (state.correctedCount || 0) + 1;

      toast(
        "🎉 Hebat! Kamu berhasil memperbaiki jawabanmu."
      );

    } else {

      // Benar pada percobaan pertama
      state.firstTryCorrect =
        (state.firstTryCorrect || 0) + 1;

      toast(
        "⭐ Mantap! Jawabanmu tepat."
      );
    }

    state.currentWrongAnswer = null;
    state.selectedError = null;

    setTimeout(() => {
      nextShape();
    }, 900);

    return;
  }


  // ==========================================
  // JAWABAN SALAH
  // ==========================================

  state.currentWrongAnswer = selectedAnswer;

  const predictedError =
    q.errorMap && q.errorMap[i]
      ? q.errorMap[i]
      : "E1";


  // Simpan kesalahan
  state.errors.push({

    questionId: q.id,

    question: q.q,

    wrongAnswer: selectedAnswer,

    predictedError: predictedError,

    selectedByStudent: null,

    attempt: state.attempts

  });


  // ==========================================
  // ISI MISTAKE LAB
  // ==========================================

  const wrongQuestion =
    document.getElementById("wrongQuestion");

  const wrongAnswerBox =
    document.getElementById("wrongAnswerBox");


  if (wrongQuestion) {
    wrongQuestion.textContent = q.q;
  }


  if (wrongAnswerBox) {
    wrongAnswerBox.textContent =
      selectedAnswer;
  }


  // Pindah ke Mistake Lab
  showScreen("errorScreen");

  updateProgress("errorScreen");

}


// ============================================
// PILIH JENIS KESALAHAN
// ============================================

function chooseError(type) {

  state.selectedError = type;


  // Simpan pilihan siswa
  if (state.errors.length > 0) {

    const lastError =
      state.errors[state.errors.length - 1];

    lastError.selectedByStudent = type;

  }


  // Tampilkan Mathi Coach
  showCoach(type);

}


// ============================================
// MATHI COACH
// ============================================

function showCoach(type) {

  const coachContent =
    document.getElementById("coachContent");


  const coachScripts = {

    E1: {
      title: "🧠 Periksa Konsepmu",

      message:
        "Coba ingat kembali konsep yang digunakan dalam soal ini.",

      prompt:
        "Apa yang sebenarnya sedang dicari oleh soal?"
    },


    E2: {
      title: "🧭 Periksa Strategimu",

      message:
        "Strategi yang kamu pilih mungkin belum sesuai dengan informasi soal.",

      prompt:
        "Operasi atau cara apa yang paling sesuai untuk menyelesaikan soal ini?"
    },


    E3: {
      title: "🔢 Periksa Langkahmu",

      message:
        "Coba periksa pekerjaanmu langkah demi langkah.",

      prompt:
        "Pada langkah mana kamu mulai mendapatkan hasil yang berbeda?"
    },


    E4: {
      title: "🧮 Periksa Hitunganmu",

      message:
        "Konsepmu mungkin sudah benar. Sekarang periksa kembali perhitungannya.",

      prompt:
        "Apakah setiap angka dan operasi hitungmu sudah tepat?"
    },


    E5: {
      title: "🔎 Baca Kembali Soal",

      message:
        "Mungkin ada informasi dalam soal yang terlewat.",

      prompt:
        "Apa yang diketahui dan apa yang sebenarnya ditanyakan?"
    }

  };


  const coach =
    coachScripts[type] || coachScripts.E1;


  // ==========================================
  // TAMPILKAN PESAN MATHI
  // ==========================================

  if (coachContent) {

    coachContent.innerHTML = `

      <div class="coach-message">

        <div class="coach-bubble">

          <h3>${coach.title}</h3>

          <p>
            ${coach.message}
          </p>

          <div class="coach-prompt">

            💡 <strong>Coba pikirkan:</strong>

            <br>

            ${coach.prompt}

          </div>

        </div>

      </div>

    `;

  }


  // ==========================================
  // PINDAH KE COACH
  // ==========================================

  showScreen("coachScreen");

  updateProgress("coachScreen");

}
// ============================================
// COBA LAGI
// ============================================

function retryShape() {

  // Pastikan soal yang sama tetap digunakan
  if (!state.currentQuestion) {

    console.error(
      "currentQuestion tidak ditemukan."
    );

    return;
  }

  renderShapeQuestion();

  showScreen("shapeScreen");

  updateProgress("shapeScreen");
}

function nextShape(){

  // ==========================================
  // SOAL DALAM LEVEL SAAT INI
  // ==========================================

  const levelQuestions =
    shapeQuestions.filter(
      q => q.level === state.shapeLevel
    );


  const currentPosition =
    levelQuestions.findIndex(
      q => q.id === state.shapeIndex
    );


  // ==========================================
  // MASIH ADA SOAL DI LEVEL YANG SAMA
  // ==========================================

  if(
    currentPosition <
    levelQuestions.length - 1
  ){

    state.shapeIndex =
      levelQuestions[currentPosition + 1].id;

    state.currentWrongAnswer = null;
    state.selectedError = null;

    renderShapeQuestion();

    return;
  }


  // ==========================================
  // LEVEL SELESAI
  // ==========================================

  if(state.shapeLevel < 4){

    state.shapeLevel++;

    // Ambil soal pertama pada level berikutnya
    const nextLevelQuestions =
      shapeQuestions.filter(
        q => q.level === state.shapeLevel
      );

    state.shapeIndex =
      nextLevelQuestions[0].id;

    state.currentWrongAnswer = null;
    state.selectedError = null;

    renderShapeQuestion();

    toast(
      `🎉 Level ${state.shapeLevel - 1} selesai! Sekarang masuk Level ${state.shapeLevel}.`
    );

    return;
  }


  // ==========================================
  // SEMUA LEVEL SELESAI
  // ==========================================

  showScreen("reflectionScreen");

  updateProgress("reflectionScreen");

}
