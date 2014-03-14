'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Thing = mongoose.model('Thing'),
    Template = mongoose.model('Template'),
    EgitimCategories = mongoose.model('EgitimCategories'),
    Egitimler = mongoose.model('Egitimler');
/**
 * Populate database with sample application data
 */
//Clear old things, then add things in
// Thing.find({})
//     .remove(function () {
//         Thing.create({
//             name: 'HTML5 Boilerplate',
//             info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
//             awesomeness: 10
//         }, {
//             name: 'AngularJS',
//             info: 'AngularJS is a toolset for building the framework most suited to your application development.',
//             awesomeness: 10
//         }, {
//             name: 'Karma',
//             info: 'Spectacular Test Runner for JavaScript.',
//             awesomeness: 10
//         }, {
//             name: 'Express',
//             info: 'Flexible and minimalist web application framework for node.js.',
//             awesomeness: 10
//         }, {
//             name: 'MongoDB + Mongoose',
//             info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
//             awesomeness: 10
//         }, function () {
//             console.log('finished populating things');
//         });
//     });
// Egitimler.find({})
//     .remove(function () {

//         Egitimler.create({
//             "name": "Corel Kursu",
//             "url": "corel-kursu",
//             "description": "Grafik Programı Corel",
//             "visual": {
//                 "type": "video",
//                 "srcs": [{
//                     "src": ".avi"
//                 }, {
//                     "src": ".webm"
//                 }]
//             },
//             "text": "Click Academy  Corel Kursu, Grafik ve tasarımcıların logo, bilboard, katolog, broşür, baskı, afiş Vektörel bir grafik tasarım işlerini yapmaların sağlama amacını taşır Click Academy  Türkiye de Corel eğitimi verme yetkili, \"COREL TRAINING PARTNER\" unvanına sahip tek kuruluştur.\
// Corel firmasının ürettiği Corel Draw yazılımı, Adobe Illustrator ve MacroMedia Freehand in alternatifidir ve genel olarak Windows ortamında tercih edilir. Türkiye de çoğunlukla etiket, bayrak, kartvizit, davetiye gibi baskılı işleri vb. üreten firmalarca kullanılır.",
//             "dersler": ["Click Academy  Corel Kursu Eğitim İçeriği",
//                 "Vektörel yaprak çizimi,Pixel yaprak resmi",
//                 "Corel programının kullanım alanları"
//             ],
//             "keywords": ["corel", "grafik", "tasarım", "coreldraw",
//                 "vektor",
//             ]
//         }, {
//             "name": "Illustrator Kursu",
//             "url": "illustrator-kursu",
//             "description": "Illustrator",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "Adobe Illustrator (AI), Adobe firmasının geliştirdiği vektörel çizim programıdır. Grafik Tasarımcıların ihtiyaç duyduğu genelde reklam sektöründe çalışan ve web tasarımcılarının ihtiyaç duyduğu bir programdır. Ankara Doruk Illustrator Kursu, grafik tasarım, web tasarım ve reklam sektörüne eleman yetiştirmeyi amaçlamaktadır.\
// Adobe Illustrator Nedir?\
// Adobe Illustrator (AI), Adobe firmasının geliştirdiği vektörel çizim programıdır. Gelişmiş vektörel grafik çizim özellikleri ile öne çıkan bir yazılım olan Illustrator, QuarkXPress in de olduğu gibi endüstri standardıdır. En güçlü rakibi Macromedia firmasınca geliştirilmiş olan Freehand adlı programdır. Ancak Macromedianın 2005 yılında Adobe tarafından satın alınmasıyla ve Adobe firmasının Freehand programını geliştirmeyi sürdürmeyeceği yolundaki genel kanı\, profesyonelleri Illustrator programına yönlendirmeye başlamıştır. Hem Mac OS, hem de Windows sürümleri bulunmakta olup, Adobe Creative Suite paketiyle sunulmaktadır. Paket içinde bulunan Photoshop, InDesign ve Acrobat Professional ile mükemmel bir uyum içindedir.",
//             "dersler": ["Renk paletlerinin kullanımı",
//                 "Mevcut çalışma sayfasını kaydetme",
//                 "Bir katalog örneği"
//             ],
//             "keywords": ["corel", "grafik", "tasarım", "coreldraw",
//                 "vektor"
//             ],
//         }, {
//             "name": "Photoshop Egitimi",
//             "url": "photoshop-egitimi",
//             "description": "Photoshop",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "Photoshop Kursu\
// Click Academy Photoshop Eğitiminin amacı, kursiyerleri profesyonel grafik tasarım işlerini yapabilme kabiliyetini kazandırmaktır.\
// Photoshop Nedir?",
//             "dersler": ["Photoshop programının temelleri",
//                 "Photoshop programının tanımı, temel özellik ve işlevleri",
//                 "Photoshop ile ilgili temel tanımlar."
//             ],
//             "keywords": ["corel", "grafik", "tasarım", "coreldraw",
//                 "vektor"
//             ],
//         }, {
//             "name": "Java Eğitimi",
//             "url": "Java-Egitimi",
//             "description": "Java",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "Henüz üniversite eğitimine yeni başlayan ve okulda aldıkları java derslerine destek olması amacıyla kurumumuza gelen öğrenciler için oluşan gruplar:\
// Bu tarzda oluşan gruplarda dersler, öğrencilerin okulda aldıkları konulara paralel işlenmekte, proje ve ödevlerini nasıl yapacakları konusunda destek verilmektedir. Bu gruplara çoğunlukla Java Basic & OOP eğitimi yeterli olmaktadır. Kurumumuz bu anlamda , Bilkent, Başkent, Atılım, Çankaya, Hacettepe, ODTÜ , Gazi Üniversitelerinde okuyan yüzlerde öğrenciye destek vermiştir.",
//             "dersler": ["Dizin yaratma", "Dizinler arası hereket ",
//                 "Dizin silmek", "Komut sisteminde dosya çalıştırma",
//                 "Jokerler"
//             ],
//             "keywords": ["java", "programlama", "masa üstü"],
//         }, {
//             "name": "C++ Eğitimi",
//             "url": "c++-egitimi",
//             "description": "C++",
//             "visual": {
//                 "type": "video",
//                 "srcs": [{
//                     "src": ".avi"
//                 }, {
//                     "src": ".webm"
//                 }]
//             },
//             "text": "1980'lerin başında Bjarne Stroustroup tarafından geliştirilen C'yi kapsayan ve nesne yönelimli programlamaya (Object Oriented Programming) olanak sağlayan sınıf tanımlarıyla ilerleten yaygın olarak kullanılan programlama dilidir. Genelde üniversitelerin bilgisayar, elektrik-elektronik, endüstri mühendisliği ve buna benzer bölümlerinde eğitim alan öğrencilerinin talep ettiği bir kurstur.\
// C++ Kursuna Katılmak İçin Önkoşullar Nelerdir?\
// Algoritma bilgisine sahip olmak gereklidir.",
//             "dersler": ["C++ Tarihçesi", "API Tanıtımı", "Dizin silmek",
//                 "İlk programın yazılıp derlenmesi ve çalıştırılması",
//                 "C++ Dil Özellikleri"
//             ],
//             "keywords": ["c++", "programlama", "masa üstü"],
//         }, {
//             "name": "Visual Basic Eğitimi",
//             "url": "visual-basic-egitimi",
//             "description": "Visual Basic ",
//             "visual": {
//                 "type": "video",
//                 "srcs": [{
//                     "src": ".avi"
//                 }, {
//                     "src": ".webm"
//                 }]
//             },
//             "text": "Visual Basic Kursu kursiyerlere, Visual Basic komutlarını uygulayarak yerel ağ ortamında çalışacak masaüstü görsel uygulamalar (Desktop Application) geliştirme yetisi sağlamayı amaçlamaktadır. Bu programı bitiren öğrencilerimiz Milli Eğitim Bakanlığı Programcılık Sertifikası Sınavında başarılı oldukları taktirde Milli Eğitim Bakanlığı Onaylı Programcılık Sertifikası almaya hak kazanırlar.",
//             "dersler": ["Visual Basic Programının kurulumu",
//                 "Visul Basic programına giriş, temel bilgiler",
//                 "Visual Basic ile Proje",
//                 "Visual Basic ile veritabanı uygulamaları",
//                 "listbox, line, mesaj kutularının kullanımı"
//             ],
//             "keywords": ["c++", "programlama", "masa üstü"],
//         }, {
//             "name": "İnternet Reklamcılığı Eğitimleri",
//             "url": "internet-reklamcılıgı-egitimleri",
//             "description": "İnternet Reklamcılığı Eğitimleri ",
//             "visual": {
//                 "type": "video",
//                 "srcs": [{
//                     "src": ".avi"
//                 }, {
//                     "src": ".webm"
//                 }]
//             },
//             "text": "Günümüz pazarlama dünyasında internet gerçeğinden habersiz, internetteki kitlelerle iletişimsiz olarak bir pazarlama etkinliğinin başarılı olması mümkün değildir. İnternet pazarı dünya çapında 2008 verilerine göre 286 Milyon adedin üzerine çıkan web sayfaları ve her geçen gün artan kullanıcı sayısı ile çığ gibi büyümeye devam ediyor. Tıpkı dünyada olduğu gibi ülkemizde de internet kullanımı ve yaygınlığı artmaya devam ediyor.",
//             "dersler": ["Google AdWords Temel Politikaları",
//                 "Google AdWords Reklamları oluşturma",
//                 " Anahtar Kelime Hedefleme", "Temel SEO İlkeleri",
//                 "Hesap Oluşturma "
//             ],
//             "keywords": ["SEO", "Google AdWords",
//                 "İnternet Reklamcılığı"
//             ],
//         }, {
//             "name": "Arama Motoru Optimizasyonu (SEO)",
//             "url": "arama-motoru-optimizasyonu-(SEO)",
//             "description": "SEO",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "SEO (Arama Motoru Optimizasyonu - Search Engine Optimization)\"SEO Teknikleri\"nde kavramları daha iyi anlamak için HTML konusunda kod uygulama mantığını bilmek gerekmektedir. \"SEO Eğitimi\"ne katılmak için, uzman bir web tasarımcı olmak ön koşul değildir. Seo eğitimi, bu alanda uzmanlaşmak isteyen katılımcılara yönelik bir eğitimdir.",
//             "dersler": ["SEO Nedir ",
//                 "SEO Kavramı ve Uygulama Alanları Nelerdir",
//                 " SEO uygulamaları için yardımcı kaynaklar",
//                 "Backurl kavramı", "Google pagerank nedir "
//             ],
//             "keywords": ["SEO", "Google AdWords",
//                 "İnternet Reklamcılığı"
//             ],
//         }, {
//             "name": "HTML Eğitimi",
//             "url": "HTML-egitimi",
//             "description": "HTML",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "HTML web sitelerinin işaretleme dilidir.",
//             "dersler": ["Html‘nin çalışma mantığı",
//                 "Html‘in temel kavramları", "Tag, özellik ve değer",
//                 "FONT tagı", "Renkler ve renk kodları"
//             ],
//             "keywords": ["HTML", "web", "İnternet sitesi"],
//         }, {
//             "name": "İşletmenlik",
//             "url": "isletmenlik",
//             "description": "İşletmenlik",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "1. Bilgisayar İşletmenlik Sertifika Programı\
// Click Academy  Bilgisayar Kursu, T.C. Milli Eğitim Bakanlığına bağlı özel bir kurumdur. Kurumumuzda eğitim alan kursiyerler, eğitimlerinin bitiminde Milli Eğitim Bakanlığı tarafından 2 ayda bir yapılan sertifika sınavında başarılı oldukları taktirde Milli Eğitimi Bakanlığı onaylı İşletmenlik Sertifikası almaya hak kazanırlar.",
//             "dersler": ["Bilgisayara Giriş", "Proje Çalışması",
//                 "Temel İnternet Eğitimi ", "Eğitim Araçları",
//                 "Bilgisayar Labaratuvarı"
//             ],
//             "keywords": ["işletmenlik", "bilgisayara giriş",
//                 "Temel Bilgisayar Eğitimi"
//             ],
//         }, {
//             "name": "MS Ofis Programları",
//             "url": "MS-ofis-programları",
//             "description": "MS Ofis",
//             "visual": {
//                 "type": "image",
//                 "src": ".jpg"
//             },
//             "text": "Ankara Doruk Bilgisayar Kursu, T.C. Milli Eğitim Bakanlığına bağlı özel bir kurumdur. Kurumumuzda eğitim alan kursiyerler, eğitimlerinin bitiminde Milli Eğitim Bakanlığı tarafından 2 ayda bir yapılan sertifika sınavında başarılı oldukları taktirde Milli Eğitimi Bakanlığı onaylı İşletmenlik Sertifikası almaya hak kazanırlar.",
//             "dersler": ["Windows işletim sistemi", "Bilgisayar kavramı",
//                 "Farenin kullanılması.", "Editör işlemleri",
//                 "Masa üstü kavramı"
//             ],
//             "keywords": ["işletmenlik", "MS ofis programları",
//                 "Temel Bilgisayar Eğitimi"
//             ],
//         }, {
//             "name": "İleri Seviye MS Ofis",
//             "url": "ileri-seviye-MS-ofis",
//             "description": "İleri Seviye MS Ofis",
//             "visual": {
//                 "type": "video",
//                 "srcs": [{
//                     "src": ".avi",
//                 }, {
//                     "src": ".webm"
//                 }],
//             },
//             "text": "Microsoft word günlük hayatta yapılan her türlü yazışmaların bilgisayar yardımıyla yazılmasını sağlayan programlara Kelime işlemci Programı adı verilir. Piyasada kullanılan birçok kelime işleme programı vardır. Bunlarda en yaygın kullanıma sahip olanı Word kelime işleme programıdır. Kullanıcıya sağladığı kolaylıklardan dolayı tercih edilen bir kelime işlem programıdır.",
//             "dersler": ["Klavye Üzerindeki Tuşlar ve Görevleri ",
//                 "Pencere Yapısı", "Standart Araç Çubuğu ",
//                 "Standart Araç Çubuğu "
//             ],
//             "keywords": ["işletmenlik", "MS ofis programları",
//                 "Temel Bilgisayar Eğitimi"
//             ],
//         }, function(){
//           console.log("finished population eğitimler");
//         });
//     });
Template.find({})
    .remove(function () {
        Template.create({
            file: 'dummy.html',
            name: 'Dummy'
        }, function () {
            console.log('finished populating templates');
        });
    });
// EgitimCategories.find({})
//     .remove(function () {
//         EgitimCategories.create({
//             url: 'grafik-ve-tasarim',
//             name: 'Grafşk ve Tasarım'
//         }, {
//             url: '3d',
//             name: '3D'
//         }, {
//             url: 'animasyon',
//             name: 'Animasyon'
//         }, function () {
//             console.log('finished populating egitimcategories');
//             console.log(arguments)
//         });
//     });
// Clear old users, then add a default user
User.find({})
    .remove(function () {
        User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, function () {
            console.log('finished populating users');
        });
    });