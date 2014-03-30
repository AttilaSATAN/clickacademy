"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EgitimlerSchema = new Schema({
    name: String,
    url: {type:String, unique: true},
    _categoryId: {type: Schema.Types.ObjectId, ref:'EgitimCategories'},
    description: String,
    keywords:[{type:String}],
    shortTag: String,
    _asset: {type: Schema.Types.ObjectId, ref:'Assets'},
});

mongoose.model('Egitimler', EgitimlerSchema);

// {
//     "_id": "kurs0",
//     "name": "Corel Kursu",
//     "link": "corel-kursu",
//     "_categoryId": "79784hbfc",
//     "description": "Grafik Programı Corel",
//     "visual": {
//         "type": "video",
//         "srcs": [{
//             "src": ".avi"
//         }, {
//             "src": ".webm"
//         }]
//     },
//     "text": "Click Academy  Corel Kursu, Grafik ve tasarımcıların logo, bilboard, katolog, broşür, baskı, afiş Vektörel bir grafik tasarım işlerini yapmaların sağlama amacını taşır Click Academy  Türkiye de Corel eğitimi verme yetkili, \"COREL TRAINING PARTNER\" unvanına sahip tek kuruluştur.\
// Corel firmasının ürettiği Corel Draw yazılımı, Adobe Illustrator ve MacroMedia Freehand in alternatifidir ve genel olarak Windows ortamında tercih edilir. Türkiye de çoğunlukla etiket, bayrak, kartvizit, davetiye gibi baskılı işleri vb. üreten firmalarca kullanılır.",
//     "dersler": ["Click Academy  Corel Kursu Eğitim İçeriği",
//         "Vektörel yaprak çizimi,Pixel yaprak resmi",
//         "Corel programının kullanım alanları"
//     ],
//     "keywords": ["corel", "grafik", "tasarım", "coreldraw", "vektor", ]
// }