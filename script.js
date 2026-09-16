const state = {
  studentName: "",
  studentClass: "VI A",
  avatar: "👦",
  currentScreen: "homeScreen",
  pretestIndex: 0,
  pretestScore: 0,
  shapeIndex: 0,
  shapeScore: 0,
  attempts: 0,
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
  {
    q:"Taman berbentuk persegi panjang. Panjangnya 20 m dan lebarnya 12 m. Berapa luas taman?",
    diagram:true,
    opts:["32 m²","64 m²","240 m²","384 m²"], a:2,
    errorMap:{0:"E1",1:"E2",3:"E4"},
    hint:"Untuk mencari luas persegi panjang, perhatikan hubungan panjang dan lebar."
  },
  {
    q:"Sebuah taman berukuran 15 m × 8 m. Berapa luasnya?",
    opts:["23 m²","46 m²","120 m²","240 m²"], a:2,
    errorMap:{0:"E1",1:"E2",3:"E4"},
    hint:"Coba ingat operasi yang digunakan untuk mencari banyaknya satuan persegi yang menutupi taman."
  },
  {
    q:"Persegi panjang memiliki panjang 18 m dan lebar 7 m. Berapa kelilingnya?",
    opts:["25 m","50 m","126 m","144 m"], a:1,
    errorMap:{0:"E1",2:"E4",3:"E4"},
    hint:"Keliling adalah jarak yang mengelilingi seluruh sisi. Ada dua pasang sisi yang sama panjang."
  },
  {
    q:"Taman memiliki luas 240 m². Jika panjangnya 20 m, berapa lebarnya?",
    opts:["10 m","12 m","15 m","20 m"], a:1,
    errorMap:{0:"E2",2:"E4",3:"E4"},
    hint:"Jika luas diketahui dan panjang diketahui, pikirkan hubungan luas = panjang × lebar."
  },
  {
    q:"Taman A berukuran 20 × 12 m dan Taman B berukuran 24 × 10 m. Pernyataan yang tepat adalah...",
    opts:["A lebih luas","B lebih luas","Luas keduanya sama","Tidak dapat dibandingkan"], a:2,
    errorMap:{0:"E1",1:"E4",3:"E2"},
    hint:"Bandingkan luas kedua taman dengan menghitung panjang × lebar."
  }
];

const coachScripts = {
  E1: [
    "Mari kita periksa konsepnya. Kamu sedang mencari luas atau keliling?",
    "Bagus. Sekarang bayangkan taman tertutup oleh kotak-kotak kecil. Apakah kita menghitung banyak kotak di dalam taman atau panjang garis di sekelilingnya?",
    "Untuk luas persegi panjang, kita menghubungkan panjang dan lebar dengan operasi perkalian. Sekarang coba kembali."
  ],
  E2: [
    "Jawabanmu menunjukkan bahwa kamu sudah mencoba sebuah strategi. Mari kita cek apakah strategi itu sesuai dengan yang ditanyakan.",
    "Apa informasi penting yang diberikan soal? Panjang, lebar, luas, atau keliling?",
    "Pilih operasi yang paling sesuai dengan hubungan informasi tersebut, lalu coba lagi."
  ],
  E3: [
    "Konsepmu mungkin sudah tepat. Sekarang kita periksa urutan langkahnya.",
    "Tulis langkah pertama yang menurutmu harus dilakukan. Setelah itu, cek apakah langkah berikutnya mengikuti aturan yang sama.",
    "Perbaiki satu langkah saja terlebih dahulu, kemudian hitung kembali."
  ],
  E4: [
    "Strategimu terlihat sudah mengarah benar. Mari kita periksa hitungannya.",
    "Coba hitung kembali dengan lebih pelan. Pisahkan puluhan dan satuannya jika perlu.",
    "Sekarang bandingkan hasil hitunganmu dengan perkiraan. Apakah hasilnya masuk akal?"
  ],
  E5: [
    "Tidak masalah jika kamu belum tahu. Kita mulai dari informasi yang paling mudah.",
    "Apa yang diketahui dari soal? Sebutkan panjang dan lebarnya.",
    "Sekarang tentukan: soal ini meminta luas atau keliling. Dari sana kita lanjutkan."
  ]
};

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  state.currentScreen=id;
  updateProgress(id);
  window.scrollTo({top:0,behavior:"smooth"});
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
  state.shapeIndex=0;state.shapeScore=0;state.attempts=0;state.errors=[];renderShapeQuestion();showScreen("shapeScreen");
}

function renderShapeQuestion(){
  const q=shapeQuestions[state.shapeIndex];state.currentQuestion=q;
  document.getElementById("shapeCounter").textContent=`Soal ${state.shapeIndex+1}/${shapeQuestions.length}`;
  let html=`<h2 style="font-size:27px">${q.q}</h2>`;
  if(q.diagram) html+=`<div class="shape-box"><div class="rect-diagram"><span style="font-weight:900;color:#1d4ed8">🌳 TAMAN 🌳</span></div></div>`;
  document.getElementById("shapeQuestion").innerHTML=html;
  const box=document.getElementById("shapeOptions");box.innerHTML="";
  document.getElementById("feedbackArea").innerHTML="";
  q.opts.forEach((opt,i)=>{
    const b=document.createElement("button");b.className="option-btn";b.textContent=String.fromCharCode(65+i)+". "+opt;
    b.onclick=()=>answerShape(i);box.appendChild(b);
  });
}

function answerShape(i){
  const q=state.currentQuestion;
  state.attempts++;
  if(i===q.a){
    state.shapeScore++;
    document.getElementById("feedbackArea").innerHTML=`<div class="feedback good">🎉 Benar! Sekarang jelaskan bagaimana kamu mendapatkan jawabanmu.</div>`;
    setTimeout(()=>nextShape(),650);
  }else{
    state.currentWrongAnswer=q.opts[i];
    state.errors.push(q.errorMap[i] || "E5");
    document.getElementById("feedbackArea").innerHTML=`<div class="feedback bad">Belum tepat. Jangan khawatir—kali ini kita selidiki cara berpikirmu.</div>`;
    setTimeout(()=>{document.getElementById("wrongAnswerBox").innerHTML=`Jawabanmu: ${q.opts[i]}<br><small>Soal: ${q.q}</small>`;showScreen("errorScreen");},650);
  }
}

function chooseError(type){
  state.selectedError=type;
  showCoach(type);
}

function showCoach(type){
  const scripts=coachScripts[type]||coachScripts.E5;
  const box=document.getElementById("coachContent");
  box.innerHTML=`
    <div class="chat-bubble mathi">🤖 <b>Mathi:</b> ${scripts[0]}</div>
    <div class="chat-bubble student">🧑 ${type==="E5"?"Aku akan mencoba memikirkannya lagi.":"Aku akan memeriksa cara berpikirku."}</div>
    <div class="chat-bubble mathi">🤖 ${scripts[1]}</div>
    <div class="chat-bubble mathi">🤖 ${scripts[2]}</div>
  `;
  showScreen("coachScreen");
}

function retryShape(){
  toast("Coba lagi dengan strategi yang baru! 💡");
  renderShapeQuestion();
  showScreen("shapeScreen");
}

function nextShape(){
  if(state.shapeIndex<shapeQuestions.length-1){
    state.shapeIndex++;renderShapeQuestion();
  }else{
    showScreen("reflectionScreen");
  }
}

function finishMission(){
  state.reflection={
    one:document.getElementById("reflect1").value.trim(),
    two:document.getElementById("reflect2").value.trim(),
    three:document.getElementById("reflect3").value.trim()
  };
  document.getElementById("resultTitle").textContent=`Hebat, ${state.studentName}! 🎉`;
  document.getElementById("resultStats").innerHTML=`
    <div class="stat"><b>${state.shapeScore}/${shapeQuestions.length}</b><small>Soal berhasil</small></div>
    <div class="stat"><b>${state.attempts}</b><small>Total percobaan</small></div>
    <div class="stat"><b>${state.errors.length}</b><small>Kesalahan yang diselidiki</small></div>
  `;
  showScreen("resultScreen");
  localStorage.setItem("aiMathMissionLast",JSON.stringify(state));
}

function toast(msg){
  const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1800);
}

updateProgress("homeScreen");
