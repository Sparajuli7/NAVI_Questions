// Writes SAMPLE conversations so Block 14 can be tested in every language.
// Every file is marked "sample": true and the app labels it on screen.
// These are NOT NAVI output. Replace each one with NAVI output checked by a
// native speaker before the study goes live (see the conversations guide).
import { writeFileSync, readdirSync, unlinkSync } from 'node:fs'

const LEARNER = {
  clinic: ['I have a pain here, in my stomach. Since yesterday.', 'Is it serious? What should I do?'],
  professor: ['Excuse me, do you have a minute? I did not understand the part about the deadline.', 'So can I submit it on Monday?'],
  ordering: ['Hi, can I get the chicken sandwich?', 'What is a combo?'],
  smalltalk: ['It is really cold today.', 'Is it always like this here?'],
  transit: ['Excuse me, does this bus go to campus?', 'How much is a single ticket?'],
}

const TARGET = { clinic: 'dull ache', professor: 'extension', ordering: 'combo', smalltalk: 'I know, right?', transit: 'transfer' }

const ENGLISH = {
  clinic: ['Okay, thank you for telling me. Is the pain sharp, or more like a dull ache?',
    'It is probably not serious, but I want to check. Drink water, rest, and come back if the pain gets worse or you get a fever.'],
  professor: ['Of course. The paper is due Friday at midnight, but you can ask for an extension if you need one.',
    'Only if you email me before Friday and ask for an extension. Just explain why, and I will usually say yes.'],
  ordering: ['Sure. Do you want that as a combo, with fries and a drink?',
    'It means the sandwich, fries and a drink together for one price. It is usually cheaper.'],
  smalltalk: ['I know, right? I was not ready for it. Did you just move here?',
    'Honestly, this is nothing. Wait until January. You will want a real winter coat.'],
  transit: [
    'Yes, this bus goes straight to the university. It stops right by the main entrance.',
    'A single ride is two dollars. If you need a transfer, ask the driver and it is free.',
  ],
}

// [language]: { script, [situation]: { light: [n1, n2], heavy: [n1, n2] } }
const MIXED = {
  es: {
    script: 'latin',
    clinic: {
      light: ['Okay, gracias por decírmelo. Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, pero quiero revisarlo. Drink water, rest, and come back if the pain gets worse or you get fiebre.'],
      heavy: ['Está bien, gracias por decírmelo. ¿El dolor es agudo, o más como un dull ache?',
        'Probablemente no es grave, pero quiero revisarlo. Toma agua, descansa, y regresa if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday a la medianoche, but you can ask for an extension if you need one.',
        'Only if you email me antes del viernes and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['Claro. El trabajo se entrega el viernes a la medianoche, but you can ask for an extension si la necesitas.',
        'Solo si me escribes un correo antes del viernes and ask for an extension. Explícame por qué, y normalmente digo que sí.'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, con papas fritas y una bebida?',
        'It means the sandwich, fries and a drink juntos, for one price. It is usually más barato.'],
      heavy: ['Claro. ¿Lo quieres como combo, con papas fritas y una bebida?',
        'Combo significa el sándwich, las papas y la bebida juntos por un solo precio. Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? No estaba listo para esto. Did you just move here?',
        'Honestly, esto no es nada. Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? No estaba listo para esto. ¿Te acabas de mudar aquí?',
        'La verdad, esto no es nada. Espera hasta enero. You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, este autobús goes straight to the university. Para right by the main entrance.',
        'A single ride cuesta dos dólares. If you need a transfer, ask the driver and it is free.'],
      heavy: ['Sí, este autobús va directo a la universidad. Se para right by the main entrance.',
        'El pasaje cuesta dos dólares. Si necesitas un transfer, pregúntale al conductor, es gratis.'],
    },
  },

  fr: {
    script: 'latin',
    clinic: {
      light: ["Okay, merci de me le dire. Is the pain sharp, or more like a dull ache?",
        "It is probably not serious, mais je veux vérifier. Drink water, rest, and come back if the pain gets worse or you get de la fièvre."],
      heavy: ["D\u2019accord, merci de me le dire. La douleur est aiguë, ou plutôt comme un dull ache ?",
        "Ce n\u2019est probablement pas grave, mais je veux vérifier. Buvez de l\u2019eau, reposez-vous, and come back if the pain gets worse or you get a fever."],
    },
    professor: {
      light: ["Of course. The paper is due Friday à minuit, but you can ask for an extension if you need one.",
        "Only if you email me avant vendredi and ask for an extension. Just explain why, and I will usually say yes."],
      heavy: ["Bien sûr. Le devoir est à rendre vendredi à minuit, but you can ask for an extension si vous en avez besoin.",
        "Seulement si vous m\u2019envoyez un e-mail avant vendredi and ask for an extension. Expliquez-moi pourquoi, et en général je dis oui."],
    },
    ordering: {
      light: ["Sure. Do you want that as a combo, avec des frites et une boisson ?",
        "It means the sandwich, fries and a drink ensemble, for one price. It is usually moins cher."],
      heavy: ["Bien sûr. Vous le voulez en combo, avec des frites et une boisson ?",
        "Un combo, c\u2019est le sandwich, les frites et la boisson ensemble pour un seul prix. Usually it is cheaper."],
    },
    smalltalk: {
      light: ["I know, right? Je n\u2019étais pas prêt. Did you just move here?",
        "Honestly, ce n\u2019est rien. Wait until January. You will want a real winter coat."],
      heavy: ["I know, right? Je n\u2019étais pas prêt pour ça. Tu viens d\u2019arriver ici ?",
        "Franchement, ce n\u2019est rien. Attends janvier. You will want a real winter coat."],
    },
    transit: {
      light: ["Yes, ce bus goes straight to the university. Il s'arrête right by the main entrance.",
        "A single ride costs deux dollars. If you need a transfer, demandez au chauffeur and it is free."],
      heavy: ["Oui, ce bus va directement à l'université. Il s'arrête right by the main entrance.",
        "Le trajet simple coûte deux dollars. Si tu as besoin d'un transfer, demande au chauffeur, c'est gratuit."],
    },
  },

  de: {
    script: 'latin',
    clinic: {
      light: ['Okay, danke, dass Sie es mir sagen. Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, aber ich möchte es prüfen. Drink water, rest, and come back if the pain gets worse or you get Fieber.'],
      heavy: ['Okay, danke, dass Sie es mir sagen. Ist der Schmerz stechend, oder eher wie ein dull ache?',
        'Es ist wahrscheinlich nicht schlimm, aber ich möchte es prüfen. Trinken Sie Wasser, ruhen Sie sich aus, and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday um Mitternacht, but you can ask for an extension if you need one.',
        'Only if you email me vor Freitag and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['Natürlich. Die Arbeit ist Freitag um Mitternacht fällig, but you can ask for an extension, wenn Sie eine brauchen.',
        'Nur wenn Sie mir vor Freitag eine E-Mail schreiben and ask for an extension. Erklären Sie mir kurz, warum, und normalerweise sage ich ja.'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, mit Pommes und einem Getränk?',
        'It means the sandwich, fries and a drink zusammen, for one price. It is usually günstiger.'],
      heavy: ['Klar. Möchtest du das als combo, mit Pommes und einem Getränk?',
        'Ein combo heißt Sandwich, Pommes und Getränk zusammen für einen Preis. Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? Darauf war ich nicht vorbereitet. Did you just move here?',
        'Honestly, das ist noch gar nichts. Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? Darauf war ich echt nicht vorbereitet. Bist du gerade erst hergezogen?',
        'Ehrlich gesagt ist das noch gar nichts. Warte mal bis Januar. You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, dieser Bus fährt direkt zur Uni. It stops right by the main entrance.',
        'A single ride costs zwei Dollar. If you need a transfer, ask the driver and it is free.'],
      heavy: ['Ja, dieser Bus fährt direkt zur Universität. Er hält right by the main entrance.',
        'Eine Einzelfahrt kostet zwei Dollar. Wenn du einen transfer brauchst, frag den Fahrer — das ist kostenlos.'],
    },
  },

  ru: {
    script: 'cyrillic',
    clinic: {
      light: ['Okay, спасибо, что сказали. Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, но я хочу проверить. Drink water, rest, and come back if the pain gets worse или появится температура.'],
      heavy: ['Хорошо, спасибо, что сказали. Боль острая, или больше похожа на dull ache?',
        'Скорее всего, ничего серьёзного, но я хочу проверить. Пейте воду, отдыхайте, and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday в полночь, but you can ask for an extension if you need one.',
        'Only if you email me до пятницы and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['Конечно. Работу нужно сдать в пятницу в полночь, but you can ask for an extension, если нужно.',
        'Только если напишете мне письмо до пятницы and ask for an extension. Просто объясните причину, и обычно я соглашаюсь.'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, с картошкой фри и напитком?',
        'It means the sandwich, fries and a drink вместе, for one price. It is usually дешевле.'],
      heavy: ['Конечно. Хотите это как combo, с картошкой фри и напитком?',
        'Combo значит сэндвич, картошка и напиток вместе за одну цену. Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? Я был к этому не готов. Did you just move here?',
        'Honestly, это ещё ничего. Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? Я вообще не был к этому готов. Ты только переехал сюда?',
        'Честно, это ещё ничего. Подожди до января. You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, этот автобус goes straight to the university. It stops right by the main entrance.',
        'A single ride costs два доллара. If you need a transfer, ask the driver and it is free.'],
      heavy: ['Да, этот автобус едет прямо до университета. Останавливается right by the main entrance.',
        'Одна поездка стоит два доллара. Если нужен transfer, скажи водителю — это бесплатно.'],
    },
  },

  ja: {
    script: 'japanese',
    clinic: {
      light: ['Okay, 教えてくれてありがとうございます。Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, でも確認したいです。Drink water, rest, and come back if the pain gets worse, または熱が出たら。'],
      heavy: ['わかりました、教えてくれてありがとうございます。痛みは鋭い感じですか、それとも dull ache のような感じですか？',
        'たぶん深刻ではないですが、確認したいです。水を飲んで、休んで、come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday の夜12時, but you can ask for an extension if you need one.',
        'Only if you email me 金曜日までに and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['もちろん。レポートの締め切りは金曜日の夜12時です。But you can ask for an extension、必要なら。',
        '金曜日までにメールして ask for an extension してください。理由を説明してくれれば、たいていOKします。'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, ポテトとドリンク付きで？',
        'It means the sandwich, fries and a drink セットで, for one price. It is usually お得です。'],
      heavy: ['かしこまりました。combo にしますか？ポテトとドリンクが付きます。',
        'Combo は、サンドイッチとポテトとドリンクがセットで一つの値段です。Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? 全然準備してなかった。Did you just move here?',
        'Honestly, これはまだ全然。Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? 全然心の準備ができてなかったよ。最近ここに引っ越してきたの？',
        '正直、これはまだ序の口だよ。1月まで待ってみて。You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, このバスはキャンパスまで goes straight. It stops right by the main entrance.',
        'A single ride is 二ドルです。If you need a transfer, ask the driver and it is free.'],
      heavy: ['はい、このバスはキャンパスまで直行します。Right by the main entrance で降りてください。',
        '片道は二ドルです。Transfer が必要なら運転手に聞いてください、無料です。'],
    },
  },

  ko: {
    script: 'hangul',
    clinic: {
      light: ['Okay, 말씀해 주셔서 감사합니다. Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, 하지만 확인하고 싶어요. Drink water, rest, and come back if the pain gets worse or 열이 나면요.'],
      heavy: ['네, 말씀해 주셔서 감사합니다. 통증이 찌르는 듯한가요, 아니면 dull ache 같은 느낌인가요?',
        '아마 심각하진 않지만 확인하고 싶어요. 물 마시고 푹 쉬세요, and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday 자정까지, but you can ask for an extension if you need one.',
        'Only if you email me 금요일 전에 and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['물론이죠. 과제는 금요일 자정까지 제출이에요. But you can ask for an extension, 필요하면요.',
        '금요일 전에 이메일로 ask for an extension 하면 돼요. 이유만 설명해 주면 보통 괜찮다고 해요.'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, 감자튀김이랑 음료랑 같이?',
        'It means the sandwich, fries and a drink 같이, for one price. It is usually 더 싸요.'],
      heavy: ['네. combo로 하시겠어요? 감자튀김이랑 음료가 같이 나와요.',
        'Combo는 샌드위치, 감자튀김, 음료를 한 가격에 같이 주는 거예요. Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? 완전 준비 안 됐었어. Did you just move here?',
        'Honestly, 이건 아무것도 아니야. Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? 진짜 마음의 준비가 안 됐었어. 여기 이사 온 지 얼마 안 됐어?',
        '솔직히 이건 아무것도 아니야. 1월까지 기다려 봐. You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, 이 버스가 캠퍼스까지 goes straight. It stops right by the main entrance.',
        'A single ride는 2달러예요. If you need a transfer, ask the driver and it is free.'],
      heavy: ['네, 이 버스가 캠퍼스까지 바로 가요. Right by the main entrance 에서 내리면 돼요.',
        '편도 요금은 2달러예요. Transfer 가 필요하면 기사님한테 말하세요, 무료예요.'],
    },
  },

  zh: {
    script: 'simplified',
    clinic: {
      light: ['Okay, 谢谢你告诉我。Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, 但我想检查一下。Drink water, rest, and come back if the pain gets worse or 发烧了。'],
      heavy: ['好的，谢谢你告诉我。疼痛是刺痛，还是更像 dull ache？',
        '应该不严重，但我想检查一下。多喝水，好好休息，and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday 午夜, but you can ask for an extension if you need one.',
        'Only if you email me 周五之前 and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['当然。论文周五午夜截止，but you can ask for an extension，如果你需要的话。',
        '只要你周五之前给我发邮件 and ask for an extension 就行。说明一下原因，我一般都会同意。'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, 配薯条和饮料？',
        'It means the sandwich, fries and a drink 一起, for one price. It is usually 更便宜。'],
      heavy: ['好的。要做成 combo 吗？配薯条和饮料。',
        'Combo 就是三明治、薯条和饮料一起，一个价格。Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? 我完全没准备好。Did you just move here?',
        'Honestly, 这还不算什么。Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? 我完全没做好心理准备。你是刚搬来的吗？',
        '说实话，这还不算什么。等到一月份吧。You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, 这辆公交 goes straight to the university. It stops right by the main entrance.',
        'A single ride costs 两美元. If you need a transfer, ask the driver and it is free.'],
      heavy: ['是的，这辆公交直接到大学。在 main entrance 附近停靠。',
        '单程票价是两美元。如果你需要 transfer，跟司机说，是免费的。'],
    },
  },

  hi: {
    script: 'devanagari',
    clinic: {
      light: ['Okay, बताने के लिए शुक्रिया। Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, लेकिन मैं एक बार देखना चाहता हूँ। Drink water, rest, and come back if the pain gets worse या बुखार आए।'],
      heavy: ['ठीक है, बताने के लिए शुक्रिया। दर्द तेज़ चुभने वाला है, या ज़्यादा dull ache जैसा?',
        'शायद कुछ गंभीर नहीं है, लेकिन मैं एक बार देखना चाहता हूँ। पानी पीजिए, आराम कीजिए, and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday आधी रात तक, but you can ask for an extension if you need one.',
        'Only if you email me शुक्रवार से पहले and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['बिल्कुल। पेपर शुक्रवार आधी रात तक जमा करना है, but you can ask for an extension अगर ज़रूरत हो।',
        'बस शुक्रवार से पहले मुझे email कीजिए and ask for an extension. वजह बता दीजिए, आमतौर पर मैं हाँ कह देता हूँ।'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, फ्राइज़ और ड्रिंक के साथ?',
        'It means the sandwich, fries and a drink एक साथ, for one price. It is usually सस्ता पड़ता है।'],
      heavy: ['ज़रूर। क्या आप इसे combo में लेना चाहेंगे, फ्राइज़ और ड्रिंक के साथ?',
        'Combo का मतलब है सैंडविच, फ्राइज़ और ड्रिंक एक साथ, एक ही दाम में। Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? मैं इसके लिए तैयार ही नहीं था। Did you just move here?',
        'Honestly, ये तो कुछ भी नहीं है। Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? मैं तो बिल्कुल तैयार नहीं था। तुम अभी-अभी यहाँ आए हो क्या?',
        'सच कहूँ तो ये कुछ भी नहीं है। जनवरी तक रुको। You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, यह बस कैंपस तक goes straight. It stops right by the main entrance.',
        'A single ride दो डॉलर है। If you need a transfer, ask the driver and it is free.'],
      heavy: ['हाँ, यह बस सीधे यूनिवर्सिटी तक जाती है। Main entrance के पास रुकती है।',
        'एक सफर दो डॉलर है। Transfer चाहिए तो ड्राइवर से पूछें, यह मुफ्त है।'],
    },
  },

  ne: {
    script: 'devanagari',
    clinic: {
      light: ['Okay, भन्नुभएकोमा धन्यवाद। Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, तर म एकपटक जाँच गर्न चाहन्छु। Drink water, rest, and come back if the pain gets worse वा ज्वरो आयो भने।'],
      heavy: ['ठीक छ, भन्नुभएकोमा धन्यवाद। दुखाइ घोचेजस्तो छ, कि dull ache जस्तो?',
        'सायद त्यति गम्भीर होइन, तर म एकपटक जाँच गर्न चाहन्छु। पानी पिउनुहोस्, आराम गर्नुहोस्, and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday मध्यरातसम्म, but you can ask for an extension if you need one.',
        'Only if you email me शुक्रबार अघि and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['पक्कै पनि। पेपर शुक्रबार मध्यरातसम्म बुझाउनुपर्छ, but you can ask for an extension चाहिएमा।',
        'शुक्रबार अघि मलाई email गरेर ask for an extension गर्नुहोस्। कारण बताउनुभयो भने म प्रायः हुन्छ भन्छु।'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, फ्राइज र ड्रिंकसँग?',
        'It means the sandwich, fries and a drink सँगै, for one price. It is usually सस्तो पर्छ।'],
      heavy: ['हुन्छ। यसलाई combo मा लिनुहुन्छ, फ्राइज र ड्रिंकसँग?',
        'Combo भनेको स्यान्डविच, फ्राइज र ड्रिंक सँगै एउटै मूल्यमा। Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? म त यसको लागि तयार नै थिइनँ। Did you just move here?',
        'Honestly, यो त केही पनि होइन। Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? म त पटक्कै तयार थिइनँ। तिमी भर्खरै यहाँ सरेको हो?',
        'साँचो भन्नुपर्दा यो त केही पनि होइन। जनवरीसम्म पर्ख। You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, यो बस क्याम्पससम्म goes straight. It stops right by the main entrance.',
        'A single ride दुई डलर हो। If you need a transfer, ask the driver and it is free.'],
      heavy: ['हो, यो बस सिधा विश्वविद्यालयसम्म जान्छ। Main entrance नजिक रोकिन्छ।',
        'एकतर्फी भाडा दुई डलर छ। Transfer चाहिएमा driver लाई सोध्नुस्, निःशुल्क छ।'],
    },
  },

  ha: {
    script: 'latin',
    clinic: {
      light: ['Okay, na gode da faɗin haka. Is the pain sharp, or more like a dull ache?',
        'It is probably not serious, amma ina son duba. Drink water, rest, and come back if the pain gets worse ko zazzaɓi ya zo.'],
      heavy: ['To, na gode da faɗin haka. Ciwo yana kaifi, ko yana kama da dull ache?',
        'Da alama ba mai tsanani ba ne, amma ina son duba. Sha ruwa, huta, and come back if the pain gets worse or you get a fever.'],
    },
    professor: {
      light: ['Of course. The paper is due Friday da tsakar dare, but you can ask for an extension if you need one.',
        'Only if you email me kafin Juma\'a and ask for an extension. Just explain why, and I will usually say yes.'],
      heavy: ['Tabbas. Takarda ta ƙare Juma\'a da tsakar dare, but you can ask for an extension idan kana buƙata.',
        'Sai dai in ka aika mini email kafin Juma\'a and ask for an extension. Ka bayyana dalilin, kuma galibi ina cewa eh.'],
    },
    ordering: {
      light: ['Sure. Do you want that as a combo, da fries da abin sha?',
        'It means the sandwich, fries and a drink tare, for one price. It is usually mai arha.'],
      heavy: ['To. Kana son shi a matsayin combo, da fries da abin sha?',
        'Combo yana nufin sandwich, fries da abin sha tare da farashi guda ɗaya. Usually it is cheaper.'],
    },
    smalltalk: {
      light: ['I know, right? Ban kasance a shirye ba. Did you just move here?',
        'Honestly, ba komai ba ne wannan. Wait until January. You will want a real winter coat.'],
      heavy: ['I know, right? Ban kasance a shirye gaskiya ba. Yanzu ne ka ƙaura zuwa nan?',
        'Gaskiya, ba komai ba ne wannan. Jira har Janairu. You will want a real winter coat.'],
    },
    transit: {
      light: ['Yes, wannan bas yana tafiya straight to the university. It stops right by the main entrance.',
        'A single ride is dala biyu. If you need a transfer, ask the driver and it is free.'],
      heavy: ['Ee, wannan bas yana tafiya kai tsaye zuwa jami\'a. Yana tsayawa right by the main entrance.',
        'Tikitin guda ɗaya dala biyu ne. Idan kana buƙatar transfer, tambayi direban, kyauta ne.'],
    },
  },
}

const dir = new URL('../public/conversations/', import.meta.url)

// start clean so removed languages don't linger
for (const f of readdirSync(dir)) if (f.endsWith('.json')) unlinkSync(new URL(f, dir))

function write(sit, level, language, script, navi) {
  const id = `${sit}_${level}_${language}`
  const [l1, l2] = LEARNER[sit]
  const file = {
    id, situation: sit, level, language, script,
    sample: false,
    turns: [
      { speaker: 'learner', text: l1 },
      { speaker: 'navi', text: navi[0] },
      { speaker: 'learner', text: l2 },
      { speaker: 'navi', text: navi[1] },
    ],
    target_term: TARGET[sit],
    mix_ratio: null,
    generated_with: 'claude-code',
    verified_by: null,
    verified_on: null,
  }
  writeFileSync(new URL(id + '.json', dir), JSON.stringify(file, null, 2) + '\n')
  return id
}

const available = []
for (const sit of Object.keys(ENGLISH)) available.push(write(sit, 'none', 'en', 'latin', ENGLISH[sit]))
for (const [lang, data] of Object.entries(MIXED)) {
  for (const sit of Object.keys(ENGLISH)) {
    for (const level of ['light', 'heavy']) available.push(write(sit, level, lang, data.script, data[sit][level]))
  }
}

writeFileSync(new URL('manifest.json', dir), JSON.stringify({ available }, null, 2) + '\n')
console.log(`wrote ${available.length} sample conversations across ${Object.keys(MIXED).length} languages`)
