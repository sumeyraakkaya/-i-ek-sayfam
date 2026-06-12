# 🌸 Floriografi Butik — Profesyonel Çiçek Satış ve Anlamları Kataloğu

Floriografi Butik, çiçeklerin asırlardır taşıdığı gizli dilleri, anlamları ve duyguları modern web teknolojileriyle buluşturan, tam kapsamlı ve responsive bir **E-Ticaret / Katalog yönetim sistemidir**. 

Bu proje, **Web Tasarım** dersi dönem ödevi kapsamında, belirlenen tüm zorunlu teknik isterleri ve ekstra puan getiren özellikleri eksiksiz karşılayacak şekilde modüler (HTML, CSS, JS ayrı) mimariyle geliştirilmiştir.

---

## Proje Öne Çıkan Özellikleri

* **Zarif ve Kurumsal UI/UX:** Gözü yormayan sıcak duvar tonları (`#f7f1eb`) ve kurumsal footer (alt bilgi) alanı ile modern bir e-ticaret simülasyonu.
* **Akıllı Sol Sidebar (Menü):** Arama, sıralama ve çiçek ekleme formunu tek bir dinamik çubukta toplayan, kullanıcı dostu yerleşim.
* **Üç Nokta (`⋮`) Aksiyon Menüsü:** Tasarım ritmini bozmamak adına CRUD (Düzenle/Sil) butonları kartların sağ üstündeki açılır menüye gizlenmiştir.
* **Kırılmayan Görsel Altyapı:** Kataloğu oluşturan **21 özel çiçeğin** her birine özel, internet bağlantısından bağımsız çalışan yüksek çözünürlüklü dev semboller (emojiler) entegre edilmiştir.
* **Ritmik Yaprak Efekti (Canvas):** Fare sayfa üzerinde hareket ettikçe, arka planda akıcı bir şekilde pembe çiçek yaprakları dökülür. Tarayıcıyı yormaması için *25ms throttle* mekanizması kullanılmıştır.

---

## Teknik İsterlerin Karşılanma Durumu


### 🔹 Zorunlu Yapılar
1. **Fetch API & Async / Await:** `script.js` içerisinde asenkron mimari kullanılarak `JSONPlaceholder API` entegrasyonu simüle edilmiş, veriler asenkron akışla çekilmiştir.
2. **DOM Manipulation:** Tüm çiçek listesi, dinamik form güncellemeleri ve tema geçişleri tamamen JavaScript DOM metotları ile yönetilmektedir.
3. **Event Listeners:** `mousemove` (yaprak efekti), `submit` (form yönetimi), `input` (anlık arama) ve `click` (3 nokta menüsü) gibi birçok olay dinleyici aktif olarak kullanılmıştır.
4. **CRUD Operasyonları:** * **Create (Ekleme):** Sidebar üzerinden yeni çiçek, anlam ve fiyat eklenebilir.
   * **Read (Listeleme):** 21 çiçek ve anlamları başlangıçta listelenir.
   * **Update (Güncelleme):** 3 nokta menüsünden "Düzenle" seçilerek bilgiler güncellenebilir.
   * **Delete (Silme):** Katalogdaki herhangi bir çiçek sistemden güvenli onay penceresiyle silinebilir.
5. **Responsive Tasarım:** Grid sistemi ve esnek yapısı sayesinde mobil, tablet ve masaüstü cihazlarla tam uyumludur (CSS Media Queries).

* **[X] Anlık Arama Sistemi:** Çiçek adına veya anlamına göre harf duyarlı canlı filtreleme.
* **[X] Fiyat Filtreleme (Sıralama):** Fiyata göre "Düşükten Yükseğe" veya "Yüksekten Düşüğe" sıralama ritmi.
* **[X] LocalStorage Entegrasyonu:** Sayfa yenilense bile eklenen, silinen veya düzenlenen çiçekler hafızada saklanır, veri kaybolmaz.
* **[X] Dark Mode (Gece Modu):** Tek tıkla gözü yormayan koyu mürdüm temasına geçiş imkanı ve tema tercihinin hafızada tutulması.
* **[X] Loading Animasyonu:** Veriler sahte API'den çekilirken ekranda ritmik olarak yanıp sönen yükleniyor bildirimi.
* **[X] Toast Mesajları:** CRUD işlemleri başarıyla tamamlandığında sağ alttan kayarak gelen şık bildirim pencereleri.

---

## 📂 Klasör Yapısı

Dosyaların tarayıcı ve GitHub Pages tarafından doğru ritimle okunabilmesi için proje şu şekilde yapılandırılmıştır:

```text
cicek-sitesi/
│
├── index.html      --> Yapısal Katman (İskelet)
├── style.css       --> Görsel Katman (Stil, Animasyonlar ve Temalar)
├── script.js       --> Fonksiyonel Katman (Asenkron API, CRUD, Canvas)
└── README.md       --> Proje Tanıtım ve Rapor Dosyası
