// Topremit Elite Presentation Script
let currentSlide = 1;
const totalSlides = 22;
let notesVisible = true;

function updateSlide() {
    document.querySelectorAll('.slide').forEach(slide => slide.classList.remove('active'));
    document.querySelector(`[data-slide="${currentSlide}"]`).classList.add('active');
    document.getElementById('slideCounter').textContent = `${currentSlide} / ${totalSlides}`;
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 1) currentSlide = 1;
    if (currentSlide > totalSlides) currentSlide = totalSlides;
    updateSlide();
}

function toggleNotes() {
    notesVisible = !notesVisible;
    document.querySelectorAll('.speaker-notes').forEach(note => {
        note.classList.toggle('hidden', !notesVisible);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'n' || e.key === 'N') toggleNotes();
});

// PPTX Export Function
function exportToPPTX() {
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'CUSTOM', width: 13.33, height: 7.5 });
    pptx.layout = 'CUSTOM';
    
    const slideData = [
        { title: "Topremit Elite", subtitle: "Loyalty Program for Retention & Frequency", type: "cover" },
        { title: "Executive Summary", content: "Masalah: Ekosistem loyalitas transaksional satu arah, koin kecil menjadi frozen assets\n\nSolusi: Topremit Elite - tiered loyalty + Smart Redeem tanpa minimum\n\nImpact: Retention +15%, Tx Frequency 2x, CLV +25%" },
        { title: "Current Context", content: "Ekosistem Saat Ini:\n• TR Coins: Cashback poin per transaksi\n• Referral: Bonus Rp120.000\n• Affiliate: Komisi untuk partner\n\nCritical Issues:\n• Minimum withdrawal Rp10.000\n• User mudah switch ke kompetitor\n• Tidak ada pembeda user baru vs loyal" },
        { title: "Core User Pain Point", content: "\"Transactional Void\"\n\n\"Saya sudah 2 tahun kirim uang lewat Topremit, tapi perlakuannya sama saja dengan pengguna baru.\"\n\nPain Points:\n• Koin Pasif - koin kecil tidak bisa digunakan\n• No Recognition - tidak ada apresiasi\n• Low Attachment - mudah pindah kompetitor" },
        { title: "Why This Problem Matters", content: "Jika Tidak Diselesaikan:\n• Churn tinggi ke kompetitor\n• Frekuensi transaksi stagnan\n• CLV tetap rendah\n\nJika Diselesaikan:\n• Switching cost meningkat\n• Emotional attachment kuat\n• Revenue per user naik" },
        { title: "Competitive Benchmark", content: "GrabRewards: Tiering Member→Platinum | Gap: Tidak ada tier\n\nTraveloka Priority: CS cepat, kupon | Gap: Tidak ada prioritas\n\nFlip: Koin untuk produk digital | Gap: Koin terbatas\n\nOpportunity: Tiering + Instant Value + Recognition" },
        { title: "Product Goal & Success Definition", content: "Tujuan: Meningkatkan retention dan transaction frequency melalui loyalty program\n\nSuccess Metrics:\n• Retention Rate: 75% (+15%)\n• Avg Transaction: 2x/month\n• CLV: +25%" },
        { title: "Proposed Solution Overview", content: "1. Tiered Loyalty System\n   Explorer (0-2 tx) → Pro (3-5 tx) → Elite (6+ tx)\n\n2. Smart Redeem\n   Gunakan koin tanpa minimum di checkout\n\n3. Dynamic Multiplier\n   1x → 1.5x → 2x coins per tier\n\n4. Gamified Milestones\n   Bonus koin untuk pencapaian" },
        { title: "Solution Prioritization", content: "P0 (Quick Wins):\n• Smart Redeem - HIGH Impact, LOW Effort\n• Dynamic Multiplier - HIGH Impact, LOW Effort\n\nP0 (Strategic):\n• Tiering System - HIGH Impact, MEDIUM Effort\n\nP1: Gamified Milestones\nP2: Birthday Bonus" },
        { title: "Hypothesis", content: "Primary Hypothesis:\n\"Dengan Topremit Elite, retention rate meningkat 25% karena loss aversion\"\n\nSupporting:\n• H1: Elite user 2x lebih banyak transaksi\n• H2: Smart Redeem >40% adoption\n• H3: Tier naik → churn turun" },
        { title: "Feature: Elite Dashboard", content: "Priority: P0 - Must Have\n\nUser Story: Sebagai user, saya ingin melihat progres tier saya\n\nAcceptance Criteria:\n• Progress bar di menu Profil\n• Daftar benefit aktif sesuai tier\n• Notifikasi push saat hampir naik tier" },
        { title: "Feature: Smart Redeem", content: "Priority: P0 - Must Have\n\nUser Story: Gunakan koin untuk potong biaya admin langsung\n\nBefore: Koin Rp2.000 tidak bisa ditarik\nAfter: Admin Rp45.000 - Koin Rp2.000 = Bayar Rp43.000\n\nNo minimum requirement!" },
        { title: "Feature: Milestones & Gamification", content: "Priority: P1 - Should Have\n\nMilestones:\n• First Transaction: +5.000 coins\n• 5 Tx/Month: +10.000 coins\n• Birthday Month: +15.000 coins\n• Referral Success: +40.000 coins\n\nEmotional engagement melalui achievement popup" },
        { title: "Metrics & Analytics", content: "Primary Metrics:\n• Retention Rate: 75%\n• Avg Tx/Month: 2x\n• CLV: +25%\n• Redeem Rate: >35%\n\nTracking Plan:\n• Daily: Active users by tier\n• Weekly: Redemption rate, feature adoption\n• Monthly: Retention cohort, CLV calculation" },
        { title: "Rollout Plan", content: "Q1: Phase 1 - MVP\n• Elite Tiers Implementation\n• Smart Redeem Toggle\n• Elite Dashboard\n\nQ2: Business Loyalty\nQ3: Social Leaderboard\nQ4: Partner Exchange\n\nDependencies: Backend, Frontend, Analytics, CS" },
        { title: "Risk & Mitigation", content: "User Risk: Kebingungan tier system\nMitigation: Clear onboarding & in-app education\n\nBusiness Risk: High discount impact on revenue\nMitigation: Cap on max discount per user\n\nTechnical Risk: Tier calculation complexity\nMitigation: Phased rollout, beta testing" },
        { title: "Business Impact Summary", content: "Retention Rate: 60% → 75% (+15%)\nTx Frequency: 1.2x → 2x (+67%)\nCLV: +25%\n\nMengapa Layak Dibangun:\n• Mengurangi churn = mengurangi cost akuisisi\n• Meningkatkan revenue per user\n• Membangun competitive moat" },
        { title: "Next Iteration & Closing", content: "Future Scope (6-12 Months):\n• Business Loyalty\n• Social Leaderboard\n• Partner Exchange\n\n\"Turning Transactions into Relationships\"\n#KepodanPeka #TopremitElite\n\nTerima Kasih\nRidho Bintang Aulia" }
    ];
    
    slideData.forEach((data, index) => {
        const slide = pptx.addSlide();
        
        if (data.type === "cover") {
            slide.addText(data.title, { x: 0.5, y: 2.5, w: 12.33, h: 1, fontSize: 48, bold: true, color: '007FFF', align: 'center' });
            slide.addText(data.subtitle, { x: 0.5, y: 3.5, w: 12.33, h: 0.8, fontSize: 28, color: '00CED1', align: 'center' });
            slide.addText("Product Requirement Document Presentation", { x: 0.5, y: 4.5, w: 12.33, h: 0.5, fontSize: 18, color: '666666', align: 'center' });
            slide.addText("Ridho Bintang Aulia • 1 Januari 2026", { x: 0.5, y: 5.5, w: 12.33, h: 0.4, fontSize: 14, color: '999999', align: 'center' });
        } else {
            slide.addText(data.title, { x: 0.5, y: 0.3, w: 12.33, h: 0.8, fontSize: 32, bold: true, color: '007FFF' });
            slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1, w: 12.33, h: 0.03, fill: { color: '00CED1' } });
            slide.addText(data.content, { x: 0.5, y: 1.3, w: 12.33, h: 5.5, fontSize: 16, color: '333333', valign: 'top', breakLine: true });
        }
        
        slide.addText(`Slide ${index + 1} / ${slideData.length}`, { x: 11.5, y: 7, w: 1.5, h: 0.3, fontSize: 10, color: '999999', align: 'right' });
    });
    
    pptx.writeFile({ fileName: 'Topremit_Elite_PRD_Presentation.pptx' });
}

// Initialize
document.addEventListener('DOMContentLoaded', updateSlide);
