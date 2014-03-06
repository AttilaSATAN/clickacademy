/*global angular:true */
var lupusshow = angular.module('lupusshow', ['ngAnimate', 'lupusshow.filters',
    'lupusshow.services', 'lupusshow.directives', 'lupusshow.controllers',
    'ngSanitize', 'google-maps', 'ui.router', 'lupus', 'ngTouch','ngResource'
]);
lupusshow.run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            "use strict";
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active="active }"> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.kurslar = [{
                "_id": "kurs0",
                "name": "Corel Kursu",
                "link": "corel-kursu",
                "_categoryId": "79784hbfc",
                "description": "Grafik Programı Corel",
                "visual": {
                    "type": "video",
                    "srcs": [{
                        "src": ".avi"
                    }, {
                        "src": ".webm"
                    }]
                },
                "text": "Click Academy  Corel Kursu, Grafik ve tasarımcıların logo, bilboard, katolog, broşür, baskı, afiş Vektörel bir grafik tasarım işlerini yapmaların sağlama amacını taşır Click Academy  Türkiye de Corel eğitimi verme yetkili, \"COREL TRAINING PARTNER\" unvanına sahip tek kuruluştur.\
Corel firmasının ürettiği Corel Draw yazılımı, Adobe Illustrator ve MacroMedia Freehand in alternatifidir ve genel olarak Windows ortamında tercih edilir. Türkiye de çoğunlukla etiket, bayrak, kartvizit, davetiye gibi baskılı işleri vb. üreten firmalarca kullanılır.",
                "dersler": ["Click Academy  Corel Kursu Eğitim İçeriği",
                    "Vektörel yaprak çizimi,Pixel yaprak resmi",
                    "Corel programının kullanım alanları"
                ],
                "keywords": ["corel", "grafik", "tasarım", "coreldraw",
                    "vektor",
                ]
            }, {
                "_id": "kurs1",
                "name": "Illustrator Kursu",
                "link": "illustrator-kursu",
                "_categoryId": "79784hbfc",
                "description": "Illustrator",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "Adobe Illustrator (AI), Adobe firmasının geliştirdiği vektörel çizim programıdır. Grafik Tasarımcıların ihtiyaç duyduğu genelde reklam sektöründe çalışan ve web tasarımcılarının ihtiyaç duyduğu bir programdır. Ankara Doruk Illustrator Kursu, grafik tasarım, web tasarım ve reklam sektörüne eleman yetiştirmeyi amaçlamaktadır.\
Adobe Illustrator Nedir?\
Adobe Illustrator (AI), Adobe firmasının geliştirdiği vektörel çizim programıdır. Gelişmiş vektörel grafik çizim özellikleri ile öne çıkan bir yazılım olan Illustrator, QuarkXPress in de olduğu gibi endüstri standardıdır. En güçlü rakibi Macromedia firmasınca geliştirilmiş olan Freehand adlı programdır. Ancak Macromedianın 2005 yılında Adobe tarafından satın alınmasıyla ve Adobe firmasının Freehand programını geliştirmeyi sürdürmeyeceği yolundaki genel kanı\, profesyonelleri Illustrator programına yönlendirmeye başlamıştır. Hem Mac OS, hem de Windows sürümleri bulunmakta olup, Adobe Creative Suite paketiyle sunulmaktadır. Paket içinde bulunan Photoshop, InDesign ve Acrobat Professional ile mükemmel bir uyum içindedir.",
                "dersler": ["Renk paletlerinin kullanımı",
                    "Mevcut çalışma sayfasını kaydetme",
                    "Bir katalog örneği"
                ],
                "keywords": ["corel", "grafik", "tasarım", "coreldraw",
                    "vektor"
                ],
            }, {
                "_id": "kurs2",
                "name": "Photoshop Egitimi",
                "link": "photoshop-egitimi",
                "_categoryId": "79784hbfc",
                "description": "Photoshop",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "Photoshop Kursu\
Click Academy Photoshop Eğitiminin amacı, kursiyerleri profesyonel grafik tasarım işlerini yapabilme kabiliyetini kazandırmaktır.\
Photoshop Nedir?",
                "dersler": ["Photoshop programının temelleri",
                    "Photoshop programının tanımı, temel özellik ve işlevleri",
                    "Photoshop ile ilgili temel tanımlar."
                ],
                "keywords": ["corel", "grafik", "tasarım", "coreldraw",
                    "vektor"
                ],
            }, {
                "_id": "kurs3",
                "name": "Java Eğitimi",
                "link": "Java-Egitimi",
                "_categoryId": "1357ab",
                "description": "Java",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "Henüz üniversite eğitimine yeni başlayan ve okulda aldıkları java derslerine destek olması amacıyla kurumumuza gelen öğrenciler için oluşan gruplar:\
Bu tarzda oluşan gruplarda dersler, öğrencilerin okulda aldıkları konulara paralel işlenmekte, proje ve ödevlerini nasıl yapacakları konusunda destek verilmektedir. Bu gruplara çoğunlukla Java Basic & OOP eğitimi yeterli olmaktadır. Kurumumuz bu anlamda , Bilkent, Başkent, Atılım, Çankaya, Hacettepe, ODTÜ , Gazi Üniversitelerinde okuyan yüzlerde öğrenciye destek vermiştir.",
                "dersler": ["Dizin yaratma", "Dizinler arası hereket ",
                    "Dizin silmek", "Komut sisteminde dosya çalıştırma",
                    "Jokerler"
                ],
                "keywords": ["java", "programlama", "masa üstü"],
            }, {
                "_id": "kurs4",
                "name": "C++ Eğitimi",
                "link": "c++-egitimi",
                "_categoryId": "1357ab",
                "description": "C++",
                "visual": {
                    "type": "video",
                    "srcs": [{
                        "src": ".avi"
                    }, {
                        "src": ".webm"
                    }]
                },
                "text": "1980'lerin başında Bjarne Stroustroup tarafından geliştirilen C'yi kapsayan ve nesne yönelimli programlamaya (Object Oriented Programming) olanak sağlayan sınıf tanımlarıyla ilerleten yaygın olarak kullanılan programlama dilidir. Genelde üniversitelerin bilgisayar, elektrik-elektronik, endüstri mühendisliği ve buna benzer bölümlerinde eğitim alan öğrencilerinin talep ettiği bir kurstur.\
C++ Kursuna Katılmak İçin Önkoşullar Nelerdir?\
Algoritma bilgisine sahip olmak gereklidir.",
                "dersler": ["C++ Tarihçesi", "API Tanıtımı", "Dizin silmek",
                    "İlk programın yazılıp derlenmesi ve çalıştırılması",
                    "C++ Dil Özellikleri"
                ],
                "keywords": ["c++", "programlama", "masa üstü"],
            }, {
                "_id": "kurs5",
                "name": "Visual Basic Eğitimi",
                "link": "visual-basic-egitimi",
                "_categoryId": "1357ab",
                "description": "Visual Basic ",
                "visual": {
                    "type": "video",
                    "srcs": [{
                        "src": ".avi"
                    }, {
                        "src": ".webm"
                    }]
                },
                "text": "Visual Basic Kursu kursiyerlere, Visual Basic komutlarını uygulayarak yerel ağ ortamında çalışacak masaüstü görsel uygulamalar (Desktop Application) geliştirme yetisi sağlamayı amaçlamaktadır. Bu programı bitiren öğrencilerimiz Milli Eğitim Bakanlığı Programcılık Sertifikası Sınavında başarılı oldukları taktirde Milli Eğitim Bakanlığı Onaylı Programcılık Sertifikası almaya hak kazanırlar.",
                "dersler": ["Visual Basic Programının kurulumu",
                    "Visul Basic programına giriş, temel bilgiler",
                    "Visual Basic ile Proje",
                    "Visual Basic ile veritabanı uygulamaları",
                    "listbox, line, mesaj kutularının kullanımı"
                ],
                "keywords": ["c++", "programlama", "masa üstü"],
            }, {
                "_id": "kurs6",
                "name": "İnternet Reklamcılığı Eğitimleri",
                "link": "internet-reklamcılıgı-egitimleri",
                "_categoryId": "1357ab",
                "description": "İnternet Reklamcılığı Eğitimleri ",
                "visual": {
                    "type": "video",
                    "srcs": [{
                        "src": ".avi"
                    }, {
                        "src": ".webm"
                    }]
                },
                "text": "Günümüz pazarlama dünyasında internet gerçeğinden habersiz, internetteki kitlelerle iletişimsiz olarak bir pazarlama etkinliğinin başarılı olması mümkün değildir. İnternet pazarı dünya çapında 2008 verilerine göre 286 Milyon adedin üzerine çıkan web sayfaları ve her geçen gün artan kullanıcı sayısı ile çığ gibi büyümeye devam ediyor. Tıpkı dünyada olduğu gibi ülkemizde de internet kullanımı ve yaygınlığı artmaya devam ediyor.",
                "dersler": ["Google AdWords Temel Politikaları",
                    "Google AdWords Reklamları oluşturma",
                    " Anahtar Kelime Hedefleme", "Temel SEO İlkeleri",
                    "Hesap Oluşturma "
                ],
                "keywords": ["SEO", "Google AdWords",
                    "İnternet Reklamcılığı"
                ],
            }, {
                "_id": "kurs7",
                "name": "Arama Motoru Optimizasyonu (SEO)",
                "link": "arama-motoru-optimizasyonu-(SEO)",
                "_categoryId": "1357ab",
                "description": "SEO",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "SEO (Arama Motoru Optimizasyonu - Search Engine Optimization)\"SEO Teknikleri\"nde kavramları daha iyi anlamak için HTML konusunda kod uygulama mantığını bilmek gerekmektedir. \"SEO Eğitimi\"ne katılmak için, uzman bir web tasarımcı olmak ön koşul değildir. Seo eğitimi, bu alanda uzmanlaşmak isteyen katılımcılara yönelik bir eğitimdir.",
                "dersler": ["SEO Nedir ",
                    "SEO Kavramı ve Uygulama Alanları Nelerdir",
                    " SEO uygulamaları için yardımcı kaynaklar",
                    "Backlink kavramı", "Google pagerank nedir "
                ],
                "keywords": ["SEO", "Google AdWords",
                    "İnternet Reklamcılığı"
                ],
            }, {
                "_id": "kurs8",
                "name": "HTML Eğitimi",
                "link": "HTML-egitimi",
                "_categoryId": "1357ab",
                "description": "HTML",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "HTML web sitelerinin işaretleme dilidir.",
                "dersler": ["Html‘nin çalışma mantığı",
                    "Html‘in temel kavramları", "Tag, özellik ve değer",
                    "FONT tagı", "Renkler ve renk kodları"
                ],
                "keywords": ["HTML", "web", "İnternet sitesi"],
            }, {
                "_id": "kurs9",
                "name": "İşletmenlik",
                "link": "isletmenlik",
                "_categoryId": "1357cb",
                "description": "İşletmenlik",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "1. Bilgisayar İşletmenlik Sertifika Programı\
Click Academy  Bilgisayar Kursu, T.C. Milli Eğitim Bakanlığına bağlı özel bir kurumdur. Kurumumuzda eğitim alan kursiyerler, eğitimlerinin bitiminde Milli Eğitim Bakanlığı tarafından 2 ayda bir yapılan sertifika sınavında başarılı oldukları taktirde Milli Eğitimi Bakanlığı onaylı İşletmenlik Sertifikası almaya hak kazanırlar.",
                "dersler": ["Bilgisayara Giriş", "Proje Çalışması",
                    "Temel İnternet Eğitimi ", "Eğitim Araçları",
                    "Bilgisayar Labaratuvarı"
                ],
                "keywords": ["işletmenlik", "bilgisayara giriş",
                    "Temel Bilgisayar Eğitimi"
                ],
            }, {
                "_id": "kurs10",
                "name": "MS Ofis Programları",
                "link": "MS-ofis-programları",
                "_categoryId": "1357cb",
                "description": "MS Ofis",
                "visual": {
                    "type": "image",
                    "src": ".jpg"
                },
                "text": "Ankara Doruk Bilgisayar Kursu, T.C. Milli Eğitim Bakanlığına bağlı özel bir kurumdur. Kurumumuzda eğitim alan kursiyerler, eğitimlerinin bitiminde Milli Eğitim Bakanlığı tarafından 2 ayda bir yapılan sertifika sınavında başarılı oldukları taktirde Milli Eğitimi Bakanlığı onaylı İşletmenlik Sertifikası almaya hak kazanırlar.",
                "dersler": ["Windows işletim sistemi", "Bilgisayar kavramı",
                    "Farenin kullanılması.", "Editör işlemleri",
                    "Masa üstü kavramı"
                ],
                "keywords": ["işletmenlik", "MS ofis programları",
                    "Temel Bilgisayar Eğitimi"
                ],
            }, {
                "_id": "kurs11",
                "name": "İleri Seviye MS Ofis",
                "link": "ileri-seviye-MS-ofis",
                "_categoryId": "1357cb",
                "description": "İleri Seviye MS Ofis",
                "visual": {
                    "type": "video",
                    "srcs": [{
                        "src": ".avi",
                    }, {
                        "src": ".webm"
                    }],
                },
                "text": "Microsoft word günlük hayatta yapılan her türlü yazışmaların bilgisayar yardımıyla yazılmasını sağlayan programlara Kelime işlemci Programı adı verilir. Piyasada kullanılan birçok kelime işleme programı vardır. Bunlarda en yaygın kullanıma sahip olanı Word kelime işleme programıdır. Kullanıcıya sağladığı kolaylıklardan dolayı tercih edilen bir kelime işlem programıdır.",
                "dersler": ["Klavye Üzerindeki Tuşlar ve Görevleri ",
                    "Pencere Yapısı", "Standart Araç Çubuğu ",
                    "Standart Araç Çubuğu "
                ],
                "keywords": ["işletmenlik", "MS ofis programları",
                    "Temel Bilgisayar Eğitimi"
                ],
            }];
            $rootScope.kategoriler = [{
                "name": "Bilişim Teknolojileri",
                "_id": "1357ab",
                "link": "bilisim-teknolojileri"
            }, {
                "name": "Görsel Bilişim",
                "_id": "79784hbfc",
                "link": "gorsel-bilisim"
            }, {
                "name": "Temel Bilgisayar Eğitimi",
                "_id": "1357cb",
                "link": "temel-bilgisayar-egitimi"
            }];
        }
    ]);